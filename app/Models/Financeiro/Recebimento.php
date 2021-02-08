<?php
namespace App\Models\Financeiro;


use Carbon\Carbon;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Recebimento extends BaseModel
{
    protected $table = 'fn_areceber';
    protected $srcname = 'fn_areceber';



    /**
     * @param string $recebimentos  A lista com todos os recebimentos
     * @param string $status        O status dos recebimentos a serem filtrados
     * -------------
     * @return array
    */
    public static function filtrarPorStatus($recebimentos, $status = 'T') {
        $filtrados = [];

        if ($status == 'AV') {
            return self::filtrarVencidos($recebimentos);
        }

        foreach ($recebimentos as $key => $recebimento) {
            if ($recebimento['status'] == $status) {
                $filtrados[] = $recebimento;
            }
        }

        return $filtrados;
    }



    /**
     * @param string $recebimentos A lista com todos os recebimentos
     * -------------
     * @return array
     */
    public static function filtrarVencidos($recebimentos) {
        $filtrados = [];

        foreach ($recebimentos as $key => $recebimento) {
            if ($recebimento['status'] == 'A' && Carbon::now()->gte( Carbon::parse($recebimento['data_vencimento']) )) {
                $filtrados[] = $recebimento;
            }
        }

        return $filtrados;
    }
}
