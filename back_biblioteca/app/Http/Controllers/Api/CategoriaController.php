<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Http\Requests\GuardarCategoriaRequest;
use App\Http\Requests\ActualizarCategoriaRequest;
use Illuminate\Http\Request;


class CategoriaController extends Controller
{
    
    public function VerCategorias()
    {
        return Categoria::orderBy('id_categoria', 'desc')->get();
    }

    public function VerUnaCategoria(Categoria $id_categoria)
    {
        return response()->json([
            'res' => true,
            'categoria' => $id_categoria
        ], 200); 
    }

    public function RegistrarCategoria(GuardarCategoriaRequest $request)
    {
        Categoria::create($request ->all());
        return response()->json([
            'res' => true,
            'msg' => 'Categoría Guardado Correctamente'
        ],200);
    }

    public function ActualizarCategoria(ActualizarCategoriaRequest $request, $id_categoria)
    {
        // Encontrar la categoria y actualizarlo
        $categoria = Categoria::findOrFail($id_categoria);
        $categoria->update($request->validated());

        return response()->json([
            'res' => true,
            'mensaje' => 'Categoria Actualizado Correctamente'
        ], 200);
    }


    public function EliminarCategoria(Categoria $categoria)
    {
        $categoria->delete();
        return response()->json([
            'res' => true,
            'mensaje' => "Categoría eliminada correctamente"
        ], 200);
    }

    public function counterCategorias() {
        $contador = Categoria::count();  
        return response()->json(['total' => $contador], 200);  
    }





}
