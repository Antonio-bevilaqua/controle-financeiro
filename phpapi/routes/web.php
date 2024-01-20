<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ResetPasswordController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    abort(404);
});

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'authenticate']);
Route::post('/resend', [RegisterController::class, 'resendEmail']);
Route::post('/activate', [RegisterController::class, 'activateAccount']);
Route::prefix('password-reset')->group(function () {
    Route::post('/request', [ResetPasswordController::class, 'request']);
    Route::post('/change', [ResetPasswordController::class, 'changePassword']);
});
