<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Configuracion;
use App\Http\Requests\GuardarConfiguracionRequest;
use Illuminate\Http\Request;

class ConfiguracionController extends Controller
{
    public function agregarConfiguracion(GuardarConfiguracionRequest $request)
    {
        // Manejar la subida de la imagen
        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagen = $request->file('imagen');
            $imagen_name = $imagen->getClientOriginalName();

            $imagen_name = pathinfo($imagen_name, PATHINFO_FILENAME);
            $name_imagen = str_replace(" ", "_", $imagen_name);

            $extension = $imagen->getClientOriginalExtension();

            $picture = date('mdy') . '-' . $name_imagen . '.' . $extension;

            // Mover la imagen a la carpeta storage/app/public/imagenes
            $imagenPath = $imagen->storeAs('public/imagenes', $picture);

            // Guardar la ruta de la imagen en la base de datos
            $imagenPath = 'storage/imagenes/' . $picture;
        }

        // Crear una nueva configuración
        $configuracion = Configuracion::create([
            'titulo' => $request->titulo,
            'imagen' => $imagenPath,
        ]);

        return response()->json($configuracion, 201);
    }

    public function obtenerUltimaConfiguracion()
    {
        $ultimaConfiguracion = Configuracion::orderBy('id_configuracion', 'desc')->first();

        if ($ultimaConfiguracion) {
            return response()->json($ultimaConfiguracion, 200);
        } else {
            return response()->json(['message' => 'No se encontró ninguna configuración'], 404);
        }
    }
}
