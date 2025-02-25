<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estabelecimento extends Model
{
    use HasFactory;
    /**
     * Os campos que podem ser preenchidos em massa (mass assignment).
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'nome',
        'telefone',
        'estado',
        'cidade',
        'numero',
    ];

    /**
     * Relacionamento com o modelo de usuário (se aplicável).
     */

     //belongsTo Define que o estabelecimento pertence a um usuário. 

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function funcionarios()
    {
        return $this->hasMany(Funcionario::class);
    }

    /**
     * Relacionamento com mesas.
     * Um estabelecimento pode ter várias mesas.
     */
    public function mesas()
    {
        return $this->hasMany(Mesa::class);
    }

    /**
     * Relacionamento com pedidos.
     * Um estabelecimento pode ter muitos pedidos.
     */
    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }

    /**
     * Define os casts para os atributos (opcional).
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
    ];
}
