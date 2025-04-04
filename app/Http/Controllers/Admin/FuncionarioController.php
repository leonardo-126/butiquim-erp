<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Funcionario;
use App\Models\Estabelecimento;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FuncionarioController extends Controller
{
    // Exibe o formulário de criação do funcionário
    public function create()
    {
        // Passa os dados necessários para o formulário (estabelecimentos e usuários)
        $estabelecimentos = Estabelecimento::all();
        $usuarios = User::all();
        
        // Retorna o componente Inertia para a criação do funcionário
        return Inertia::render('Admin/Funcionarios/RegisterFuncionario', [
            'estabelecimentos' => $estabelecimentos,
            'usuarios' => $usuarios,
        ]);
    }

    // Processa o envio do formulário e cria o funcionário
    public function store(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'name' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'estabelecimento_id' => 'required|exists:estabelecimentos,id',
        ]);

        // Criação do usuário com a role de 'funcionario'
        $user = User::create([
            'role' => 'funcionario',
            'name' => $request->name,
            'telefone' => $request->telefone,
            'email' => $request->email,
            'password' => $request->password,
        ]);

         // Criação do registro na tabela funcionarios
        Funcionario::create([
            'user_id' => $user->id,
            'estabelecimento_id' => $request->estabelecimento_id,
            'valor_venda_diaria' => $request->valor_venda_diaria,
        ]);

        // Retorna uma resposta Inertia com sucesso
        return redirect()->route('admin.dashboard')->with('success', 'Funcionário criado com sucesso!');
    }

    public function index() {
        $funcionarios = Funcionario::where('user_id', auth()->id())->get();

        return Inertia::render('Admin/Estabelecimento/IndexFuncionarios', [
            'funcionarios' => $funcionarios,
        ]);
    }
    
    public function indexApi(){
        // Busca os estabelecimentos que pertencem ao usuário logado
        $estabelecimentos = Estabelecimento::where('user_id', auth()->id())->pluck('id');
    
        // Busca os funcionários desses estabelecimentos
        $funcionarios = Funcionario::with(['user', 'estabelecimento'])
            ->whereIn('estabelecimento_id', $estabelecimentos)
            ->get();
    
        return response()->json([
            'success' => true,
            'data' => $funcionarios
        ]);
    }
    
}
