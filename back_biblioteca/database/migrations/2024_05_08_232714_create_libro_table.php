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
            $table->integer('estado_libro');
            $table->string('imagen', 250);
            $table->integer('id_categoriaF')->index('id_categoriaF');
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
        Schema::dropIfExists('libro');
    }
};
