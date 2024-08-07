<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuario'; 
    protected $primaryKey = 'id_usuario';  

    protected $fillable = [
        'nombre_usuario',
        'apellido_usuario',
        'email',
        'password',
        'estado_usuario',
        'id_rolF'
    ];

    protected $hidden = [
        'password',
    ];

    public $timestamps = false;

}
