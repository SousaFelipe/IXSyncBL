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
        $record = $recebimento->when($request->id_cliente, '=', 'id_cliente', '1', '1', 'data_vencimento', 'asc')->getRecords();
        $response = self::convertRecursively($record);

        return response()->json((count($response) > 0) ? $response : []);
    }
}
