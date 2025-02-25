<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;

class PedidoController extends Controller
{
    // Função para criar um pedido
    public function store(Request $request)
    {
        // Valida os dados enviados pelo usuário
        $validated = $request->validate([
            'mesa_id' => 'required|exists:mesas,id',
            'itens' => 'required|array'
        ]);

        // Cria o pedido no banco de dados
        $pedido = Pedido::create([
            'mesa_id' => $validated['mesa_id'],
            'itens' => json_encode($validated['itens']),
            'status' => 'pendente'
        ]);

        // Retorna uma mensagem de sucesso
        return response()->json(['message' => 'Pedido enviado com sucesso!']);
    }
}
