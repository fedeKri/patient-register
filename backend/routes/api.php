<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;
use App\Http\Middleware\CorsMiddleware;

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/paginated', [PatientController::class, 'paginated']);
    Route::post('/patients', [PatientController::class, 'store']);
});
