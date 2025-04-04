<?php

use App\Http\Controllers\admin\EstabelecimentoController;
use App\Http\Controllers\Admin\FuncionarioController;
use App\Http\Controllers\Admin\MesaController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CardapioController;
use App\Http\Controllers\funcionario\GarcomController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function Termwind\render;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Rotas do Administrador
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'Dashboard'])->name('admin.dashboard');
    Route::get('/admin/estabelecimento/list', [EstabelecimentoController::class, 'indexApi'])->name('api.admin.estabelecimento.index');
    Route::get('/admin/funcionarios/list', [FuncionarioController:: class, 'indexApi'])->name('api.admin.funcionarios.index');
    Route::resource('/admin/estabelecimento/funcionarios', FuncionarioController::class);
    Route::resource('/admin/estabelecimento', EstabelecimentoController::class);
    Route::resource('/admin/pedidos', PedidoController::class);
    Route::post('admin/estabelecimento/mesa/create', [MesaController::class, 'create'])->name('admin.mesa.create');
    Route::get('admin/estabelecimento/mesas', [MesaController::class, 'index'])->name('admin.estabelecimento.mesa');
    Route::get('/admin/estabelecimento/mesa/{id}', [MesaController::class, 'show'])->name('admin.mesa.show'); // Mostra detalhes de uma mesa
    Route::post('/admin/estabelecimento/mesa/{id}', [MesaController::class, 'destroy'])->name('admin.mesa.delete');
    Route::get('/admin/estabelecimento/mesa/{id}/qrcode', [MesaController::class, 'downloadQrCode'])->name('admin.mesa.download'); // Baixa o QR Code
    Route::get('admin/estabelecimento/mesas/list', [MesaController::class, 'indexApi'])->name('admin.mesa.indexApi');

});

// Rotas do Garçom
Route::middleware(['auth', 'role:funcionario'])->group(function () {
    Route::get('/funcionario', [GarcomController::class, 'dashboard'])->name('funcionario.dashboard');
    Route::post('/funcionario/pedido', [GarcomController::class, 'realizarPedido'])->name('funcionario.pedido');
});

// Rotas do Cliente (via QR Code)
Route::middleware('guest')->group(function () {
    Route::get('/pedido', [PedidoController::class, 'cardapio'])->name('pedido.cardapio'); // Exemplo: /pedido?mesa=5
    Route::post('/pedido', [PedidoController::class, 'realizarPedido'])->name('pedido.realizar');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
