<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $table = 'estudiante'; 
    protected $primaryKey = 'id_estudiante';  

    //asignar campos
    protected $fillable = [
        'ci',
        'nombre_estudiante',
        'apellido_estudiante',
        'estado_estudiante'

    ];

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'id_estudianteF');
    }

    //si algun campo no queremos que se envie
    // protected $hidden = [
    //     
    //     'estado_estudiante'
    // ]

    public $timestamps = false; //no usar `updated_at`, `created_at`
}
