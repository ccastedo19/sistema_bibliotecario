<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\GuardarReservaRequest;
use App\Models\Reserva;
use App\Models\Libro;
use Illuminate\Http\Request;

class ReservaController extends Controller
{

    public function verReservas()
    {
        $reservas = Reserva::with(['libro', 'estudiante', 'usuario'])
                    ->orderBy('id_reserva', 'desc') // Ordenar por el campo 'id' de forma descendente
                    ->get();

        return response()->json($reservas);
    }

    
    public function GuardarReserva(GuardarReservaRequest $request)
    {
        // Obtener el libro por su ID
        $libro = Libro::find($request->id_libroF);

        if (!$libro) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }

        // Verificar que haya suficiente stock
        if ($libro->stock < $request->cantidad) {
            return response()->json(['message' => 'Stock insuficiente'], 400);
        }

        // Restar la cantidad del stock actual
        $libro->stock -= $request->cantidad;
        $libro->save(); 

        // Crear la reserva
        $reserva = Reserva::create([
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'cantidad' => $request->cantidad,
            'estado_reserva' => $request->estado_reserva,
            'id_libroF' => $request->id_libroF,
            'id_estudianteF' => $request->id_estudianteF,
            'id_usuarioF' => $request->id_usuarioF
        ]);

        return response()->json(['message' => 'Reserva guardada correctamente', 'reserva' => $reserva], 201);
    }



    public function actualizarEstadoReserva(Reserva $id_reserva) {
        // Obtener el estado actual de la reserva
        $estadoActual = $id_reserva->estado_reserva;
        
        // Cambiar el estado de la reserva
        $id_reserva->estado_reserva = $estadoActual == 1 ? 0 : 1;
        $id_reserva->save();
    
        // Si el estado se cambia a 0 (devuelto), actualizar el stock del libro
        if ($estadoActual == 1 && $id_reserva->estado_reserva == 0) {
            $libro = Libro::find($id_reserva->id_libroF);
            if ($libro) {
                $libro->stock += $id_reserva->cantidad;
                $libro->save();
            }
        }
    
        return response()->json([
            'message' => 'Estado del Reserva actualizado correctamente',
            'estadoNuevo' => $id_reserva->estado_reserva
        ], 200);
    }

    public function CantidadReservas()
    {
        $cantidad = Reserva::where('estado_reserva', 1)->count();
        return response()->json(['total' => $cantidad], 200);  
    }

    public function CantidadDevolucion()
    {
        $cantidad = Reserva::where('estado_reserva', 0)->count();
        return response()->json(['total' => $cantidad], 200);  
    }

    public function CantidadReservasAnuladas()
    {
        $cantidad = Reserva::where('estado_reserva', 2)->count();
        return response()->json(['total' => $cantidad], 200);  
    }


    public function reservaXestudiante($id_estudianteF)
    {

        $reservas = Reserva::with(['libro', 'usuario'])
                    ->where('id_estudianteF', $id_estudianteF)
                    ->orderBy('id_reserva', 'desc')
                    ->get();


        if ($reservas->isEmpty()) {
            return response()->json(['message' => 'No se encontraron reservas para el estudiante'], 404);
        }

        return response()->json($reservas, 200);
    }


    public function anularReserva(Reserva $id_reserva) {
        // Obtener el estado actual de la reserva
        $estadoActual = $id_reserva->estado_reserva;
        
        // Cambiar el estado de la reserva
        $id_reserva->estado_reserva = $estadoActual == 2 ? 0 : 2;
        $id_reserva->save();
    
        // Si el estado se cambia a 2 (devuelto), actualizar el stock del libro
        if ($estadoActual == 1 && $id_reserva->estado_reserva == 2) {
            $libro = Libro::find($id_reserva->id_libroF);
            if ($libro) {
                $libro->stock += $id_reserva->cantidad;
                $libro->save();
            }
        }
    
        return response()->json([
            'message' => 'Estado del Reserva actualizado correctamente',
            'estadoNuevo' => $id_reserva->estado_reserva
        ], 200);
    }

    public function eliminarReserva(Reserva $id_reserva){
        $id_reserva -> delete();
        return response()->json([
            "res" => true,
            "mensaje" => "Reserva eliminada correctamente"
        ]);
    }



}
