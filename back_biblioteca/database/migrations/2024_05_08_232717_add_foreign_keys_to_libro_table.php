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
        Schema::table('libro', function (Blueprint $table) {
            $table->foreign(['id_categoriaF'], 'libro_ibfk_1')->references(['id_categoria'])->on('categoria');
            $table->foreign(['id_usuarioF'], 'libro_ibfk_2')->references(['id_usuario'])->on('usuario');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('libro', function (Blueprint $table) {
            $table->dropForeign('libro_ibfk_1');
            $table->dropForeign('libro_ibfk_2');
        });
    }
};
