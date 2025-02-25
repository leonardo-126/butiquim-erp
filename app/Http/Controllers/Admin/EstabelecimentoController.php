<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Estabelecimento;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class EstabelecimentoController extends Controller
{
    //exibe formulario para criacao 
    public function create()
    {
        $usuarios = User::all();  
        
        return Inertia::render('Admin/Estabelecimento/RegisterEstabelecimento', [
            'usuarios' => $usuarios,
        ]);
    }

    //envio do form

    public function store(Request $request)
    {
        //validacao dos dados

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nome' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'estado' => 'required|string|max:55',
            'cidade' => 'required|string|max:55',
            'numero' => 'required|string|max:11',
        ]);

        Estabelecimento::create([
            'user_id' => $request->user_id,
            'nome' => $request->nome,
            'telefone' => $request->telefone,
            'estado' => $request->estado,
            'cidade' => $request->cidade,
            'numero' => $request->numero,
        ]) ;

        //retorna resposta inertia com sucesso 
        return redirect()->route('admin.dashboard')->with('success', 'Estabelecimento criado com sucesso!');
    }

    //exibe os estabellecimentos pertencentes ao admim 
    public function index() {
         // Obter estabelecimentos gerenciados pelo administrador autenticado
        $estabelecimentos = Estabelecimento::where('user_id', auth()->id())->get();

        return Inertia::render('Admin/Estabelecimento/EstabelecimentoIndex', [
            'estabelecimentos' => $estabelecimentos,
        ]);
    }
    public function indexApi() {
        // Obter estabelecimentos gerenciados pelo administrador autenticado
       $estabelecimentos = Estabelecimento::where('user_id', auth()->id())->get();

       return response()->json([
           'success' => true,
           'data' => $estabelecimentos
       ]);
    }
    public function show($id) {
        // Recupera o estabelecimento por ID
        $estabelecimento = Estabelecimento::find($id);
        
        if (!$estabelecimento) {
            abort(404, 'Estabelecimento não encontrado');
        }
    
        // Retorna a resposta, você pode retornar uma view ou JSON
        return response()->json([
            'success' => true,
            'data' => $estabelecimento
        ]);
    }
}
