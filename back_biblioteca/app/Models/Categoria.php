<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categoria'; 
    protected $primaryKey = 'id_categoria';  

    //asignar campos
    protected $fillable = [
        'codigo_categoria',
        'nombre_categoria'
        

    ];


    public $timestamps = false; //no usar `updated_at`, `created_at`
}
