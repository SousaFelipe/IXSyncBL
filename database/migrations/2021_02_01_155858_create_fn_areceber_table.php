<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateFnAreceberTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fn_areceber', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_fn');
            $table->bigInteger('id_cliente');
            $table->bigInteger('id_conta');
            $table->bigInteger('filial_id');
            $table->string('documento', 50);
            $table->date('data_emissao');
            $table->date('data_vencimento');
            $table->double('valor', 8, 2);
            $table->enum('previsao', ['S', 'N', 'M']);
            $table->enum('tipo_recebimento', ['Boleto ', 'Cheque', 'Cartão', 'Dinheiro', 'Depósito', 'Gateway', 'Débito', 'Transferencia']);
            $table->bigInteger('id_carteira_cobranca');
            $table->string('obs', 191);
            $table->enum('status', ['A', 'R', 'P', 'C']);
            $table->double('valor_aberto', 8, 2);
            $table->double('valor_recebido', 8, 2);
            $table->double('pagamento_valor', 8, 2);
            $table->date('pagamento_data');
            $table->double('valor_cancelado', 8, 2);
            $table->date('data_cancelamento');
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
        Schema::dropIfExists('fn_areceber');
    }
}
