<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'reserva'; 
    protected $primaryKey = 'id_reserva';  

    //asignar campos
    protected $fillable = [
        'fecha_inicio',
        'fecha_fin',
        'cantidad',
        'estado_reserva',
        'id_libroF',
        'id_estudianteF',
        'id_usuarioF'

    ];

    //si algun campo no queremos que se envie
    // protected $hidden = [
    //     
    //     'estado_estudiante'
    // ]

    public $timestamps = false; //no usar `updated_at`, `created_at`

    /**
     * Relación con el modelo libro
     */
    public function libro()
    {
        return $this->belongsTo(Libro::class, 'id_libroF');
    }

    /**
     * Relación con el modelo estudiante
     */
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'id_estudianteF');
    }

    /**
     * Relación con el modelo Usuario
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuarioF');
    }
}
