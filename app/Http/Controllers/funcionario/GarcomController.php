<?php

namespace App\Http\Controllers\funcionario;

use App\Http\Controllers\Controller;
use App\Models\Estabelecimento;
use App\Models\Funcionario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function details(){

        $user = Auth::id();
        //pega o usuario
        $funcionarios = Funcionario::where('user_id', $user)->first();
        //pega o estabelecimento
        $estabelecimento = Estabelecimento::where('id', $funcionarios->estabelecimento_id)->first();

        $usuario = User::where('id', $funcionarios->user_id)->first();
        
        //retornar os dados por api
        return response()->json([
            'funcionario' => $funcionarios,
            'user' => $usuario,
            'estabelecimento' => $estabelecimento
        ]);
    }
}
