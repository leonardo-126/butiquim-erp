<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Autentica o usuário
        $request->authenticate();

        // Obtém o usuário autenticado
        $user = Auth::user();

        // Verifica a role do usuário
        if ($user->role === 'funcionario') {
            // Redireciona para o dashboard do funcionário
            return redirect()->route('funcionario.dashboard');
        }

        // Se a role não for 'funcionario', verifica se é administrador ou outro tipo de role
        if ($user->role === 'admin') {
            // Redireciona para o dashboard do administrador
            return redirect()->route('admin.dashboard');
        }

        // Regenera a sessão para evitar fixação de sessão
        $request->session()->regenerate();

        // Redireciona para a página desejada após login (padrão para qualquer outro tipo de role)
        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
