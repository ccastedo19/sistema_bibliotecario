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
        Schema::create('reserva', function (Blueprint $table) {
            $table->integer('id_reserva', true);
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->integer('id_libroF')->index('id_libroF');
            $table->integer('id_estudianteF')->index('id_estudianteF');
            $table->integer('id_usuarioF')->index('id_usuarioF');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reserva');
    }
};
