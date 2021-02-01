<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateFnAreceberBaixasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fn_areceber_baixas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_receber');
            $table->string('documento', 100);
            $table->date('data');
            $table->string('credito', 15);
            $table->string('historico', 100);
            $table->double('vdesconto', 8, 2);
            $table->double('vacrescimo', 8, 2);
            $table->double('valor_total_recebido', 8, 2);
            $table->enum('tipo_recebimento', ['D', 'H', 'C', 'CD', 'DP']);
            $table->bigInteger('filial_id');
            $table->bigInteger('conta_', 8, 2);
            $table->bigInteger('conta_', 8, 2);
            $table->boolean('upload')->default(false);
            $table->boolean('uploaded')->default(false);
            $table->date('created_at');
            $table->date('uploaded_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fn_areceber_baixas');
    }
}
