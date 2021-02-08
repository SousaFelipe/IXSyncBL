<?php
namespace App\Http\Controllers\Financeiro;


use App\Models\Financeiro\Recebimento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class CreController extends Controller
{
    public function areceber(Request $request)
    {
        $recebimento = new Recebimento();
        $record = $recebimento->when($request->id_cliente, '=', 'id_cliente', 1, 12, 'data_vencimento', 'desc')->getRecords();

        if (isset($request->status )&& $request->status != 'T') {
            $record = Recebimento::filtrarPorStatus($record, $request->status);
        }

        $response = self::convertRecursively($record);

        return response()->json((count($response) > 0) ? $response : []);
    }



    private function filtrarPorStatus($recebimentos, $status = 'T') {
        $filtrados = [];

        foreach ($recebimentos as $key => $recebimento) {
            if ($recebimento['status'] == $status) {
                $filtrados[] = $recebimento;
            }
        }

        return $filtrados;
    }
}
