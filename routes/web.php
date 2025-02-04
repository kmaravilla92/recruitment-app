<?php

use App\Http\Controllers\ProfileController;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\SignInRequest;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Barryvdh\DomPDF\Facade\Pdf;

use iio\libmergepdf\Merger;
use iio\libmergepdf\Pages;

Route::get('/', function () {
    if (Auth::check()) {
        return to_route('admin.dashboard');
    }
    return inertia('Welcome');
})->name('welcome.show');

Route::post('/auth/login', function (SignInRequest $request) {
    $credentials = $request->safe()->only([
        'email',
        'password',
    ]);

    $remember_me = $request->input('remember_me');

    if (Auth::attempt($credentials, $remember_me)) {
        return to_route('admin.dashboard');
    } 

    return back()->withErrors([
        'xxx' => 'xxx'
    ]);
})->name('auth.login.post');

Route::get('/auth/logout', function () {
    Auth::logout();
    return to_route('welcome.show');
})->name('auth.logout');

Route::get('/applicants/qr-registration', function () {
    $qr_code = new QrCode(route('applicants.register.show'));
    $writer = new PngWriter();
    $result = $writer->write($qr_code);
    return response($result->getString())->header('Content-Type', $result->getMimeType());
});

Route::get('/applicants/register/review', function (Request $request) {
    $saved_data = $request->session()->get("data", []);
    return inertia('Applicants/Review', [
        'savedData' => $saved_data,
    ]);
})->name('applicants.register.review');

Route::post('/applicants/register/review', function (Request $request) {
    User::saveApplicationData($request->session()->get("data", []));
    return to_route('applicants.register.success');
})->name('applicants.register.review.post');

Route::get('/applicants/register/success', function (Request $request) {
    return inertia('Applicants/Success');
})->name('applicants.register.success');

Route::get('/applicants/register/{step?}', function (Request $request, $step = null) {
    $saved_data = $request->session()->get("data", []);
    $wrong_step = false;

    if ($step < 1) {
        $step = 1;
        $wrong_step = true;
    } else if ($step > 15) {
        $step = 15;
        $wrong_step = true;
    } else if (empty($step)) {
        $step = 1;
        $wrong_step = true;
    }

    if ($wrong_step) {
        return to_route('applicants.register.show', ['step' => $step]);
    }

    return inertia('Applicants/Form', [
        'step' => $step,
        'savedData' => $saved_data,
    ]);
})->name('applicants.register.show');

Route::post('/applicants/register/{step?}', function (StoreApplicationRequest $request, $step = 1) {
    $cur_step = $step + 1;
    $saved_data = $request->session()->get('data', []);
    $saved_data[$step] = $request->input();
    $request->session()->put("data", $saved_data);

    if (15 == $step) {
        return to_route('applicants.register.review');
    }

    return to_route('applicants.register.show', ['step' => $cur_step]);
})->name('applicants.register.post');

Route::prefix('/admin')->middleware('auth')->name('admin.')->group(function () {
    Route::get('/', function () {
        $stats = [
            [
                'title' => 'New Submissions',
                'stat' => User::applicant()->new()->count(),
                'icon' => 'SendIcon',
            ],
            [
                'title' => 'New Hires',
                'stat' => User::applicant()->hired()->count(),
                'icon' => 'ThumbUpIcon',
            ],
            [
                'title' => 'Processing Applications',
                'stat' => User::applicant()->processing()->count(),
                'icon' => 'GroupIcon',
            ],
            [
                'title' => 'Rejected Applications',
                'stat' => User::applicant()->rejected()->count(),
                'icon' => 'ThumbDownIcon',
            ],
        ];
    
        return inertia('Admin/Dashboard/Index', [
            'stats' => $stats,
        ]);
    })->name('dashboard');

    Route::get('/applicants', function () {
        $applicants = User::applicant()->get();
        return inertia('Admin/Applicants/Index', [
            'applicants' => $applicants,
        ]);
    })->name('users.list');

    Route::get('/print-personnel-data-form/{user}', function (Request $request, User $user) {
        $pdfs = collect()
            ->range(1, 3)
            ->map(function ($i) use($user) {
                return [
                    'pdf' => Pdf::loadView("docs.doc-{$i}", $user->toArray()),
                    'file_path' => "{$user->id}/doc-{$i}.pdf",
                ];
            })
            ->each(function ($pdf) use($user) {
                if (!Storage::exists($pdf['file_path'])) {
                    Storage::put($pdf['file_path'], $pdf['pdf']->output());
                }
            });

        $merger = new Merger();
        $merger->addIterator(
            $pdfs->map(fn($pdf) => storage_path("/app/private/{$pdf['file_path']}"))->all()
        );
        Storage::put("{$user->id}/doc-4.pdf", $merger->merge());
        return Storage::download("{$user->id}/doc-4.pdf", "personnel-data-form-{$user->id}.pdf");
    })->name('print-personnel-data-form');
});