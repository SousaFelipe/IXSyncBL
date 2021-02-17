<?php
namespace App\Http\Controllers\Financeiro;


use App\Models\Financeiro\ClienteContrato;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ClienteContratoController extends Controller
{
    public function listar(Request $request, ClienteContrato $ccontrato)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $grid1 = [
            'TB' => 'cliente_contrato.id_cliente',
            'OP' => '=',
            'P'  => $request->cliente
        ];

        $grid2 = [
            'TB' => 'cliente_contrato.status',
            'OP' => '=',
            'P'  => 'A'
        ];

        $ccontratos = $ccontrato->grid([ $grid1, $grid2 ])
            ->orderBy('data_ativacao', 'desc')
            ->in(1)
            ->receive();

        $response = self::convertRecursively($ccontratos);

        return response()->json([
            'contratos'  => $response,
            'quantidade' => count($response)
        ]);
    }
}
