<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        // Validación de los datos
        $request->validate([
            'nombre_usuario' => 'required',
            'email' => 'required|email|unique:usuario,email',
            'password' => 'required',
            'estado_usuario' => 'required',
            'id_rolF' => 'required'
        ]);

        // Alta de usuario
        $user = new User();
        $user->nombre_usuario = $request->nombre_usuario;
        $user->email = $request->email;
        $user->password = Hash::make($request->password); 
        $user->estado_usuario = $request->estado_usuario;
        $user->id_rolF = $request->id_rolF;
        $user->save();

        // Respuesta
        // return response()->json([
        //     "message" => "Metodo Register OK"
        // ]);

        return response()->json(['message' => 'Usuario registrado con éxito!'], 201);
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
    
            if ($user->estado_usuario != 1) {
                Auth::logout(); 
                return response()->json(['message' => 'Cuenta sin Autorización'], Response::HTTP_FORBIDDEN);
            }
            $token = $user->createToken('token')->plainTextToken;
            return response()->json(["token" => $token], Response::HTTP_OK);
        } else {
            return response()->json(['message' => 'Cuenta no válida'], Response::HTTP_UNAUTHORIZED);
        }
    }
    
        
    public function userProfile(Request $request){
        return response()->json([
            "message" => "UserProfil ok",
            "userData" => auth()->user()
        ], Response::HTTP_OK);
    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
    
        return response()->json(["message" => "Cierre de sesión OK"], 200);
    }
    
    public function allUsers() {
        $users = User::orderBy('id_usuario', 'desc')->get();
        return response()->json($users, 200);
    }
    

    public function deleteUser($id_usuario)
    {
        $user = User::find((int) $id_usuario); 
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }

    public function updateEstado($id_usuario) {
        $user = User::find((int) $id_usuario);
    
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        $estadoActual = $user->estado_usuario;
        $user->estado_usuario = $estadoActual == 1 ? 0 : 1;
        $user->save();

        return response()->json([
            'message' => 'Estado del usuario actualizado correctamente',
            'estadoNuevo' => $user->estado_usuario
        ], 200);
    }

    public function updateUser(Request $request, $id_usuario){
        $user = User::find((int) $id_usuario);
    
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        $validatedData = $request->validate([
            'nombre_usuario' => 'required|string|max:255',
            'email' => 'required|email|unique:usuario,email,' . $id_usuario . ',id_usuario',
        ]);
    
        // Actualizar el usuario con los datos validados
        $user->nombre_usuario = $validatedData['nombre_usuario'];
        $user->email = $validatedData['email'];
        $user->save();
    
        return response()->json(['message' => 'Usuario actualizado correctamente', 'user' => $user], 200);
    }
    
    

    public function counterUser() {
        $contador_users = User::count();  
        return response()->json(['total_users' => $contador_users], 200);  
    }
    


}
