<?php

namespace App\Http\Controllers\funcionario;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GarcomController extends Controller
{
    //dashboard
    public function Dashboard() {
        $dados = [
            'title' => 'Painel de Controle',
        ];

        return Inertia::render('Funcionario/DashboardFuncionario', $dados);
    }
}
