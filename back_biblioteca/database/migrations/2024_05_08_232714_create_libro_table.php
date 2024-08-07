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
        Schema::create('libro', function (Blueprint $table) {
            $table->integer('id_libro', true);
            $table->integer('codigo_libro');
            $table->string('titulo', 100);
            $table->string('autor', 100);
            $table->string('idioma', 100);
            $table->integer('stock');
            $table->integer('estado_libro');
            $table->string('imagen', 250);
            $table->unsignedBigInteger('id_categoriaF');
            $table->unsignedBigInteger('id_usuarioF');
    
            // Definir claves foráneas
            $table->foreign('id_categoriaF')->references('id_categoria')->on('categoria')->onDelete('cascade');
            $table->foreign('id_usuarioF')->references('id_usuario')->on('usuario')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('libro');
    }
};
