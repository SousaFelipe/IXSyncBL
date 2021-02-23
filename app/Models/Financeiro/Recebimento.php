<?php
namespace App\Models\Financeiro;


use Carbon\Carbon;
use App\Traits\Grid;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Recebimento extends BaseModel
{
    use Grid;



    protected $table = 'fn_areceber';
    protected $srcname = 'fn_areceber';



    /**
     * @param string    $recebimentos   A lista com todos os recebimentos
     * @param boolean   $vencidos       Filtra os recebimentos que ultrapassaram a data de pagamento
     * -------------
     * @return array
     */
    public static function filtrarVencidos($recebimentos, $vencidos = true) {
        $filtrados = [];

        foreach ($recebimentos as $key => $recebimento) {
            if ($recebimento['status'] == 'A') {
                if ($vencidos) {
                    if (Carbon::now()->gte(Carbon::parse($recebimento['data_vencimento']))) {
                        $filtrados[] = $recebimento;
                    }
                }
                else if (Carbon::parse($recebimento['data_vencimento'])->gte(Carbon::now())) {
                    $filtrados[] = $recebimento;
                }
            }
        }

        return $filtrados;
    }
}
