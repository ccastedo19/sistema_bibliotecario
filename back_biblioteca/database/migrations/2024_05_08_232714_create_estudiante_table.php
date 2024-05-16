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
        Schema::create('estudiante', function (Blueprint $table) {
            $table->integer('id_estudiante', true);
            $table->integer('ci');
            $table->string('nombre_estudiante', 100);
            $table->string('apellido_estudiante', 100);
            $table->integer('estado_estudiante');
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
        Schema::dropIfExists('estudiante');
    }
};
