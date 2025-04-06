<?php

namespace App\Http\Controllers\funcionario;

use App\Http\Controllers\Controller;
use App\Models\Estabelecimento;
use App\Models\Funcionario;
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
    public function details(){
        //buscar o estabelecimento com os details 
        $estabelecimento = Estabelecimento::where('user_id', auth()->id())->pluck('id');
        dd($estabelecimento);
        //buscar os dados do usuario
        $funcionario = Funcionario::with(['user', 'estabelecimento'])
            ->whereIn('estabelecimento_id', $estabelecimento)
            ->get();


        //retornar os dados por api
        return response()->json([
            'sucess' => true,
            'data' => $funcionario
        ]);
    }
}
