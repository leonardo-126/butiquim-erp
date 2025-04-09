<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cardapio;
use Illuminate\Http\Request;

class CardapioController extends Controller
{
    //

    public function store(Request $request)
    {
        $request->validate([
            'estabelecimento_id' => 'required|exists:estabelecimentos,id',
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'required|numeric',
            'path' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        // Pega a imagem e gera um nome único
        $image = $request->file('path');
        $imageName = time() . '_' . $image->getClientOriginalName();

            // Move para public/assets
        $image->move(public_path('assets'), $imageName);

        // Criar o registro
        Cardapio::create([
            'estabelecimento_id' => $request->estabelecimento_id, //so para testes
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'preco' => $request->preco,
            'path' => $imageName,
        ]);

        return redirect()->back()->with('success', 'Item do cardápio criado com sucesso!');
    }
}
