<?php

use App\Http\Controllers\ProfileController;
use App\Http\Requests\StoreApplicationRequest;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Dompdf\Dompdf;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('applicants/qr-registration', function () {
    $qr_code = new \Endroid\QrCode\QrCode(route('applicants.register'));
    $writer = new \Endroid\QrCode\Writer\PngWriter();
    $result = $writer->write($qr_code);
    return response($result->getString())->header('Content-Type', $result->getMimeType());
});

Route::get('/applicants/register/{step?}', function (Request $request, $step = null) {
    // $request->session()->flush();
    $saved_data = $request->session()->get("data", []);
    // unset($saved_data[8]);
    // $request->session()->put('data', $saved_data);
    // dd($saved_data);
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
    return to_route('applicants.register.show', ['step' => $cur_step]);
})->name('applicants.register.post');

Route::get('/test', function (Request $request) {
    $saved_data = $request->session()->get('data', []);
    $view_data = [];
    foreach ($saved_data as $fields) {
        foreach ($fields as $field => $value) {
            $view_data[$field] = $value;
        }
    }

    // dd($view_data);
    // return view('docs.doc-1', $view_data);
    return view('docs.doc-2', $view_data);
});

require __DIR__.'/auth.php';
