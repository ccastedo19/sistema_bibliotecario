<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarEstudianteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; //cambiar a true
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $idEstudiante = $this->route('id_estudiante');

        return [
            "ci" => "required|unique:estudiante,ci," . $idEstudiante . ",id_estudiante",
            "nombre_estudiante" => "required",
            "apellido_estudiante" => "required",
        ];
    }

}
