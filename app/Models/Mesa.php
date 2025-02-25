<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mesa extends Model
{
    use HasFactory;

    /**
     * A tabela associada ao modelo.
     *
     * @var string
     */
    protected $table = 'mesas';

    /**
     * Os atributos que podem ser atribuídos em massa.
     *
     * @var array
     */
    protected $fillable = [
        'estabelecimento_id',
        'numero',
        'qr_code_path', // Caminho do QR Code (opcional)
    ];

    /**
     * Relacionamento com o estabelecimento.
     */
    public function estabelecimento()
    {
        return $this->belongsTo(Estabelecimento::class);
    }
}
