<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarEstudiante extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; //cambir a true
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "ci" => "required|unique:estudiante,ci",
            "nombre_estudiante" => "required",
            "apellido_estudiante" => "required",
            "estado_estudiante" => "required"
        ];
    }
}
