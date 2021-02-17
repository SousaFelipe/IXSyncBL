<?php
namespace App\Http\Controllers\Financeiro;


use App\Models\Financeiro\Recebimento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class CreController extends Controller
{
    public function categorizados(Request $request, Recebimento $recebimento)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $grid1 = [
            'TB' => 'fn_areceber.id_cliente',
            'OP' => '=',
            'P'  => $request->cliente
        ];

        $grid2 = [
            'TB' => 'fn_areceber.id_contrato',
            'OP' => '=',
            'P'  => $request->contrato
        ];

        $recebimentos = $recebimento->grid([ $grid1, $grid2 ])
            ->orderBy('data_vencimento', 'desc')
            ->in(1)
            ->receive();

        $response = self::convertRecursively(Recebimento::categorizados($recebimentos));

        return response()->json((count($response) > 0) ? $response : []);
    }



    public function status(Request $request, Recebimento $recebimento)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $recebimentos = $recebimento->when('id_cliente', '=', $request->cliente)
            ->orderBy('data_vencimento', 'desc')
            ->in(1)
            ->receive();

        $recebimentos = Recebimento::filtrarPorStatus($recebimentos, $request->status);
        $response = self::convertRecursively($recebimentos);

        return response()->json((count($response) > 0) ? $response : []);
    }
}
