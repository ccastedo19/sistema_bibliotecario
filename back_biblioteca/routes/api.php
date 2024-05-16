<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EstudianteController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//usuarios
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('usuarios', [AuthController::class, 'allUsers']);
Route::delete('usuarios/{id_usuario}', [AuthController::class, 'deleteUser']);
Route::put('estado_usuario/{id_usuario}', [AuthController::class, 'updateEstado']);
Route::get('contarUsuarios', [AuthController::class, 'counterUser']);
Route::patch('edit_usuario/{id_usuario}', [AuthController::class, 'updateUser']);

//estudiantes

Route::get('estudiantes', [EstudianteController::class, 'VerEstudiantes']);
Route::get('cantidad_estudiantes', [EstudianteController::class, 'CantidadEstudiantes']);
Route::post('registraEstudiante', [EstudianteController::class, 'RegistrarEstudiante']);
Route::get('estudiante/{id_estudiante}', [EstudianteController::class, 'VerUnEstudiante']);
Route::put('estudiante/{id_estudiante}', [EstudianteController::class, 'ActualizarEstudiante']);
Route::patch('estadoEstudiante/{id_estudiante}', [EstudianteController::class, 'actualizarEstadoEstudiante']);