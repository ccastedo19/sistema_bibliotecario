<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarLibroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'titulo' => 'required|string|max:100',
            'codigo_libro' => 'required|integer|unique:libro,codigo_libro',
            'autor' => 'required|string|max:100',
            'idioma' => 'required|string|max:100',
            'stock' => 'required|integer',
            'estado_libro' => 'required|integer',
            'imagen' => 'nullable|image|max:2048', // Validación para la imagen
            'id_categoriaF' => 'required|integer|exists:categoria,id_categoria',
            'id_usuarioF' => 'required|integer|exists:usuario,id_usuario',
        ];
    }
}
