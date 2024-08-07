<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActualizarEstudianteRequest;
use App\Http\Requests\GuardarEstudiante;
use App\Models\Estudiante;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function VerEstudiantes()
    {
        return estudiante::orderBy('id_estudiante', 'desc')->get();
    }

    public function VerEstudiantesActivos()
    {
        return estudiante::where('estado_estudiante', 1)
            ->orderBy('id_estudiante', 'desc')
            ->get();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function RegistrarEstudiante(GuardarEstudiante $request)
    {
        Estudiante::create($request ->all());
        return response()->json([
            'res' => true,
            'msg' => 'Estudiante Guardado Correctamente'
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function VerUnEstudiante(Estudiante $id_estudiante)
    {
        return response()->json([
            'res' => true,
            'estudiante' => $id_estudiante
        ], 200); 
    }

    public function CantidadEstudiantes()
    {
        $cantidad_estudiantes = Estudiante::count();
        return response()->json(['total' => $cantidad_estudiantes], 200);  
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function ActualizarEstudiante(ActualizarEstudianteRequest $request, $id_estudiante)
    {
        // Encontrar el estudiante y actualizarlo
        $estudiante = Estudiante::findOrFail($id_estudiante);
        $estudiante->update($request->validated());

        return response()->json([
            'res' => true,
            'mensaje' => 'Estudiante Actualizado Correctamente'
        ], 200);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function eliminarEstudiante(Estudiante $id_estudiante)
    {   
        $tieneReservaActiva = $id_estudiante->reservas()->where('estado_reserva', 1)->exists();

        if ($tieneReservaActiva) {
            return response()->json([
                'res' => false,
                'mensaje' => "No se puede eliminar el estudiante porque tiene libros reservados."
            ], 400);
        }

        // Eliminar el estudiante si no tiene reservas activas
        $id_estudiante->delete();

        return response()->json([
            'res' => true,
            'mensaje' => "Estudiante eliminado correctamente"
        ], 200);
    }


    public function actualizarEstadoEstudiante(Estudiante $id_estudiante) {
    
        $estadoActual = $id_estudiante->estado_estudiante;
        $id_estudiante->estado_estudiante = $estadoActual == 1 ? 0 : 1;
        $id_estudiante->save();

        return response()->json([
            'message' => 'Estado del estudiante actualizado correctamente',
            'estadoNuevo' => $id_estudiante->estado_estudiante
        ], 200);
    }
}

