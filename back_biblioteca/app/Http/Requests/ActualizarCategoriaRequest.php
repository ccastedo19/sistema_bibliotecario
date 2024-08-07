<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarCategoriaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; //cambiar
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $idCategoria = $this->route('id_categoria');

        return [
            "codigo_categoria" => "required|unique:categoria,codigo_categoria," . $idCategoria . ",id_categoria",
            "nombre_categoria" => "required",
        ];
    }
}
