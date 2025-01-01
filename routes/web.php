<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/applicants/register/{step?}', function ($step = 1) {
    return inertia('Applicants/Form', [
        'step' => $step,
    ]);
})->name('applicants.register.show');

Route::post('/applicants/register/{step?}', function ($step = 1) {
    $cur_step = $step + 1;
    return to_route('applicants.register.show', ['step' => $cur_step]);
})->name('applicants.register.post');

require __DIR__.'/auth.php';
