<?php

namespace App\Http\Controllers\API;

use App\Models\Libro;
use App\Http\Controllers\Controller;
use App\Http\Requests\GuardarLibroRequest;
use App\Http\Requests\ActualizarLibroRequest;
use App\Http\Requests\ActualizarImagenLibro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;



class LibroController extends Controller
{
    public function MostrarLibro()
{
    $libros = Libro::with(['categoria', 'usuario'])
                   ->orderBy('id_libro', 'desc')
                   ->get();

    return response()->json($libros);
}


    
    public function MostrarLibroActivos()
    {
        return Libro::where('estado_libro', 1)
            ->orderBy('id_libro', 'desc')
            ->get();
    }


    public function MostrarUnLibro(Libro $id_libro)
    {
        return response()->json([
            'res' => true,
            'libro' => $id_libro
        ], 200); 
    }

    public function GuardarLibro(GuardarLibroRequest $request)
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

        $libro = Libro::create([
            'titulo' => $request->titulo,
            'codigo_libro' => $request->codigo_libro,
            'autor' => $request->autor,
            'idioma' => $request->idioma,
            'stock' => $request->stock,
            'estado_libro' => $request->estado_libro,
            'imagen' => $imagenPath,
            'id_categoriaF' => $request->id_categoriaF,
            'id_usuarioF' => $request->id_usuarioF,
        ]);

        return response()->json($libro, 201);
    }


    public function actualizarEstadoLibro(Libro $id_libro) {
    
        $estadoActual = $id_libro->estado_libro;
        $id_libro->estado_libro = $estadoActual == 1 ? 0 : 1;
        $id_libro->save();

        return response()->json([
            'message' => 'Estado del libro actualizado correctamente',
            'estadoNuevo' => $id_libro->estado_libro
        ], 200);
    }

    public function eliminarLibro($id_libro)
    {
        $libro = Libro::findOrFail($id_libro);

        // Eliminar la imagen asociada si existe
        if ($libro->imagen) {
            Storage::delete('public/' . $libro->imagen);
        }

        // Eliminar el libro
        $libro->delete();

        return response()->json([
            'message' => 'Libro eliminado correctamente'
        ], 200);
    }


    public function actualizarLibro(ActualizarLibroRequest $request, $id_libro)
    {
        Log::info('Solicitud PATCH recibida', $request->all());

        try {
            $libro = Libro::findOrFail($id_libro);
            $libro->titulo = $request->titulo;
            $libro->codigo_libro = $request->codigo_libro;
            $libro->autor = $request->autor;
            $libro->idioma = $request->idioma;
            $libro->stock = $request->stock;
            $libro->id_categoriaF = $request->id_categoriaF;
            $libro->save();

            return response()->json(['message' => 'Libro actualizado correctamente', 'libro' => $libro], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function actualizarImagenLibro(ActualizarImagenLibro $request, $id_libro)
    {

        Log::info('Iniciando la actualización del libro con ID: ' . $id_libro);

        $libro = Libro::findOrFail($id_libro);
        Log::info('Libro encontrado: ' . $libro->titulo);

        // $libro->titulo = $request->input('titulo');
        // $libro->codigo_libro = $request->input('codigo_libro');
        // $libro->autor = $request->input('autor');
        // $libro->idioma = $request->input('idioma');
        // $libro->stock = $request->input('stock');
        // $libro->id_categoriaF = $request->input('id_categoriaF');

        $destination = public_path("storage\\" . $libro->imagen);
        Log::info('Ruta de destino para la imagen existente: ' . $destination);
        
        $file = $request->file('file');

        if ($file) {
            Log::info('Nueva imagen recibida para el libro.');

            if (File::exists($destination)) {
                Log::info('La imagen existente se encontró y será eliminada.');
                File::delete($destination);
            }
            // $file->getClientOriginalExtension();
            $filename = $file->store('public/imagenes');
            $filename = str_replace('public/', 'storage/', $filename);

            Log::info('Nueva imagen almacenada en: ' . $filename);

            $libro->imagen = $filename;
        } else {
            Log::info('No se recibió una nueva imagen, manteniendo la existente: ' . $libro->imagen);
        }

        $libro->save();

        Log::info('Libro actualizado correctamente.');

        return response()->json(['success' => true, 'message' => 'Libro actualizado correctamente']);
    }

    public function CantidadLibros()
    {
        $cantidad = Libro::count();
        return response()->json(['total' => $cantidad], 200);  
    }



}








