<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role)
    {
        // Verifica se o usuário está autenticado e se a role está correta
        if (Auth::check()) {
            $userRole = Auth::user()->role;

            if ($userRole && $userRole === $role) {
                return $next($request);
            }
        }

        // Caso contrário, aborta com erro de autorização
        abort(403, 'Acesso não autorizado.');
    }
}
