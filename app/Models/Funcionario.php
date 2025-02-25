<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasFactory;

    // Definir a tabela associada ao modelo (opcional, caso o nome da tabela seja padrão)
    protected $table = 'funcionarios';

    // Definir os campos que podem ser preenchidos (mass assignable)
    protected $fillable = [
        'user_id',
        'estabelecimento_id',
        'valor_venda_diaria',
    ];

    // Definir os relacionamentos
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function estabelecimento()
    {
        return $this->belongsTo(Estabelecimento::class);
    }
}
