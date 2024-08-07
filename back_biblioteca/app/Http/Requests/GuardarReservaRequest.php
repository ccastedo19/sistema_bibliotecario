<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarReservaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Cambiar a true para permitir la autorización
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'cantidad' => 'required|integer',
            'estado_reserva' => 'required',
            'id_libroF' => 'required|exists:libro,id_libro',
            'id_estudianteF' => 'required|exists:estudiante,id_estudiante',
            'id_usuarioF' => 'required|exists:usuario,id_usuario'
        ];
    }
}
