<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reserva', function (Blueprint $table) {
            $table->foreign(['id_estudianteF'], 'reserva_ibfk_1')->references(['id_estudiante'])->on('estudiante');
            $table->foreign(['id_usuarioF'], 'reserva_ibfk_3')->references(['id_usuario'])->on('usuario');
            $table->foreign(['id_libroF'], 'reserva_ibfk_2')->references(['id_libro'])->on('libro');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reserva', function (Blueprint $table) {
            $table->dropForeign('reserva_ibfk_1');
            $table->dropForeign('reserva_ibfk_3');
            $table->dropForeign('reserva_ibfk_2');
        });
    }
};
