<?php
use Illuminate\Support\Facades\Route;



Route::get('/', [App\Http\Controllers\Controller::class, 'index'])->name('index');


Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'login'])->name('login');
Route::post('/authenticate', [App\Http\Controllers\Auth\LoginController::class, 'authenticate'])->name('authenticate');
Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');


Route::middleware('auth')->group(function () {

    Route::prefix('/admin')->name('admin')->group(function () {
        Route::get('/', [App\Http\Controllers\AppController::class, 'admin']);
    });

    Route::prefix('/caixa')->name('caixa')->group(function () {
        Route::get('/', [App\Http\Controllers\AppController::class, 'caixa']);
    });

    Route::prefix('/financeiro')->name('financeiro')->group(function () {
        Route::get('/', [App\Http\Controllers\AppController::class, 'financeiro']);
    });

    Route::prefix('/operacional')->name('operacional')->group(function () {
        Route::get('/', [App\Http\Controllers\AppController::class, 'operacional']);
    });

});


Route::prefix('/clientes')->group(function () {

    Route::get('/buscar/{cliente}', [App\Http\Controllers\ClienteController::class, 'buscar']);
    Route::get('/listar/{vbusca}/{tbusca}', [App\Http\Controllers\ClienteController::class, 'listar']);

});


Route::prefix('/cre')->group(function () {

    Route::prefix('/recebimentos')->group(function () {
        Route::get('/listar/categorizados/{cliente}/{contrato}', [App\Http\Controllers\Financeiro\CreController::class, 'categorizados']);
        Route::get('/listar/status/{cliente}/{status}', [App\Http\Controllers\Financeiro\CreController::class, 'status']);
    });

    Route::prefix('/contratos')->group(function () {
        Route::get('/listar/{cliente}', [App\Http\Controllers\Financeiro\ClienteContratoController::class, 'listar']);
    });

});
