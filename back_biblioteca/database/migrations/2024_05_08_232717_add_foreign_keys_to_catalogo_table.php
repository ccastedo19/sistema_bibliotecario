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
        Schema::table('catalogo', function (Blueprint $table) {
            $table->foreign(['id_categoriaF'], 'catalogo_ibfk_1')->references(['id_categoria'])->on('categoria');
            $table->foreign(['id_libroF'], 'catalogo_ibfk_2')->references(['id_libro'])->on('libro');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('catalogo', function (Blueprint $table) {
            $table->dropForeign('catalogo_ibfk_1');
            $table->dropForeign('catalogo_ibfk_2');
        });
    }
};
