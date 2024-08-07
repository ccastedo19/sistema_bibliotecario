<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;

    protected $table = 'libro';
    protected $primaryKey = 'id_libro';

    // Asignar campos
    protected $fillable = [
        'titulo',
        'codigo_libro',
        'autor',
        'idioma',
        'stock',
        'estado_libro',
        'imagen',
        'id_categoriaF',
        'id_usuarioF'
    ];

    public $timestamps = false; // No usar `updated_at`, `created_at`

    /**
     * Relación con el modelo Categoria
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoriaF');
    }

    /**
     * Relación con el modelo Usuario
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuarioF');
    }
}
