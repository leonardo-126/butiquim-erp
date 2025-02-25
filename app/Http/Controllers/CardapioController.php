<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mesa;
use App\Models\Cardapio;

class CardapioController extends Controller
{
    // Função para exibir o cardápio de uma mesa
    public function show($id)
    {
        // Recupera a mesa pelo ID
        $mesa = Mesa::findOrFail($id);

        // Recupera o cardápio (ajuste conforme a estrutura do seu banco de dados)
        $cardapio = Cardapio::with('itens')->get();

        // Retorna os dados como JSON (ou para uma view, se preferir)
        return response()->json([
            'mesa' => $mesa,
            'cardapio' => $cardapio
        ]);
    }
}
