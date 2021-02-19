<?php
namespace App\Models\Financeiro;


use Carbon\Carbon;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Recebimento extends BaseModel
{
    protected $table = 'fn_areceber';
    protected $srcname = 'fn_areceber';



    public static function categorizados($recebimentos)
    {
        
    }



    /**
     * @param string    $recebimentos   A lista com todos os recebimentos
     * @param boolean   $vencidos       Filtra os recebimentos que ultrapassaram a data de pagamento
     * -------------
     * @return array
     */
    public static function filtrarEmAberto($recebimentos, $vencidos = false) {
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



    public static function grid($queryType, $queryValue)
    {
        return [
            'TB' => 'fn_areceber.' . $queryType,
            'OP' => '=',
            'P'  => $queryValue
        ];
    }
}
