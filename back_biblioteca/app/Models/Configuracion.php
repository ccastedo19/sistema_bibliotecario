<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    use HasFactory;

    protected $table = 'configuracion';
    protected $primaryKey = 'id_configuracion';

    protected $fillable = [
        'titulo',
        'imagen'
    ];


    public $timestamps = false; //no usar `updated_at`, `created_at`
}
