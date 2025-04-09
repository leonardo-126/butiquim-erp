<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cardapio extends Model
{
    use HasFactory;

    protected $fillable = [
        'estabelecimento_id',
        'nome',
        'descricao',
        'preco',
        'path',
    ];
    
    public function estabelecimento()
    {
        return $this->belongsTo(Estabelecimento::class);
    }
}
