<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    //
    public function Dashboard()
    {
        // Você pode retornar dados para o componente, se necessário.
        $dados = [
            'title' => 'Painel do Administrador',
        ];

        return Inertia::render('Admin/Dashboard', $dados);
    }
}
