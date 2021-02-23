<?php
namespace App\Models\Financeiro;


use App\Traits\Grid;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ClienteContrato extends BaseModel
{
    use Grid;



    protected $table = 'cliente_contrato';
    protected $srcname = 'cliente_contrato';



    public static function filtrarCategoria($ccontratos)
    {
        return array(
            'ativos'        => self::categoria($ccontratos, 'A'),
            'desativados'   => self::categoria($ccontratos, 'I'),
            'pre_contratos' => self::categoria($ccontratos, 'P'),
            'negativados'   => self::categoria($ccontratos, 'N'),
            'desistentes'   => self::categoria($ccontratos, 'D')
        );
    }



    public static function categoria($ccontratos, $categoria) {
        $filtrados = [];

        foreach ($ccontratos as $key => $contrato) {
            if ($contrato['status'] == $categoria) {
                $filtrados[] = $contrato;
            }
        }

        return $filtrados;
    }
}
