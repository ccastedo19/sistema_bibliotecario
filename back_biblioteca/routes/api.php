<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EstudianteController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\LibroController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\ConfiguracionController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//usuarios
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);
});
Route::get('usuariosDesc', [AuthController::class, 'allUsers']);
Route::get('usuariosAsc', [AuthController::class, 'allUsersAsc']);
Route::delete('usuarios/{id_usuario}', [AuthController::class, 'deleteUser']);
Route::put('estado_usuario/{id_usuario}', [AuthController::class, 'updateEstado']);
Route::get('contarUsuarios', [AuthController::class, 'counterUser']);
Route::patch('edit_usuario/{id_usuario}', [AuthController::class, 'updateUser']);
Route::patch('edit_pass/{id_usuario}', [AuthController::class, 'updatePass']);
Route::get('usuario/{id_usuario}', [AuthController::class, 'verUnUsuario']);

//estudiantes
Route::get('estudiantes', [EstudianteController::class, 'VerEstudiantes']);
Route::get('estudiantesActivos', [EstudianteController::class, 'VerEstudiantesActivos']);
Route::get('cantidad_estudiantes', [EstudianteController::class, 'CantidadEstudiantes']);
Route::post('registraEstudiante', [EstudianteController::class, 'RegistrarEstudiante']);
Route::delete('eliminarEstudiante/{id_estudiante}', [EstudianteController::class, 'eliminarEstudiante']);
Route::get('estudiante/{id_estudiante}', [EstudianteController::class, 'VerUnEstudiante']);
Route::put('estudiante/{id_estudiante}', [EstudianteController::class, 'ActualizarEstudiante']);
Route::patch('estadoEstudiante/{id_estudiante}', [EstudianteController::class, 'actualizarEstadoEstudiante']);

//categorias
Route::get('categorias', [CategoriaController::class, 'VerCategorias']);
Route::get('categorias/{id_categoria}', [CategoriaController::class, 'VerUnaCategoria']);
Route::post('registraCategoria', [CategoriaController::class, 'RegistrarCategoria']);
Route::put('editarCategoria/{id_categoria}', [CategoriaController::class, 'ActualizarCategoria']);
Route::delete('eliminarCategoria/{categoria}', [CategoriaController::class, 'EliminarCategoria']);
Route::get('contarCategorias', [CategoriaController::class, 'counterCategorias']);


//libros
Route::controller(LibroController::class)->group(function ($route) {
    $route->get('libros', 'MostrarLibro');
    $route->get('verlibroActivo', 'MostrarLibroActivos');
    $route->get('verlibro/{id_libro}', 'MostrarUnLibro');
    $route->post('registrarLibro', 'GuardarLibro');
    $route->patch('cambiarEstadoLibro/{id_libro}', 'actualizarEstadoLibro');
    $route->delete('eliminarLibro/{id_libro}', 'eliminarLibro');
    $route->patch('libro/{id_libro}', 'actualizarLibro'); //editar libro
    $route->post('/imagen/{id_libro}', 'actualizarImagenLibro'); //editar la imagen
});
Route::get('cantidadLibros', [LibroController::class, 'CantidadLibros']);

//reserva
Route::get('reserva', [ReservaController::class, 'verReservas']);
Route::post('guardarReserva', [ReservaController::class, 'GuardarReserva']);
Route::put('actualizarEstadoReserva/{id_reserva}', [ReservaController::class, 'actualizarEstadoReserva']);
Route::get('cantidad_reserva', [ReservaController::class, 'CantidadReservas']);
Route::get('cantidad_devolucion', [ReservaController::class, 'CantidadDevolucion']);
Route::get('reserva_estudiante/{id_estudianteF}', [ReservaController::class, 'reservaXestudiante']);
Route::put('anularReserva/{id_reserva}', [ReservaController::class, 'anularReserva']);
Route::delete('eliminarReserva/{id_reserva}', [ReservaController::class, 'eliminarReserva']);
Route::get('reservasAnuladas', [ReservaController::class, 'CantidadReservasAnuladas']);

//configuracion
Route::post('configuracion', [ConfiguracionController::class, 'agregarConfiguracion']);
Route::get('verConfiguracion', [ConfiguracionController::class, 'obtenerUltimaConfiguracion']);