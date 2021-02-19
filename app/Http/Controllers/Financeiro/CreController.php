<?php
namespace App\Http\Controllers\Financeiro;


use App\Models\Financeiro\Recebimento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class CreController extends Controller
{
    public function fnPorCliente(Request $request, Recebimento $recebimento)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }
    }



    public function fnPorClienteContrato(Request $request, Recebimento $recebimento)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $grid = [
            Recebimento::grid('id_cliente', $request->cliente),
            Recebimento::grid('id_contrato', $request->contrato)
        ];

        $emAberto   = $recebimento->grid($grid, Recebimento::grid('status', 'A'))->orderBy('data_vencimento', 'desc')->in(1)->receive();
        $recebidos  = $recebimento->grid($grid, Recebimento::grid('status', 'R'))->orderBy('data_vencimento', 'desc')->in(1)->receive();
        $cancelados = $recebimento->grid($grid, Recebimento::grid('status', 'C'))->orderBy('data_vencimento', 'desc')->in(1)->receive();

        $vencidos = Recebimento::filtrarEmAberto($emAberto, true);
        $emAberto = Recebimento::filtrarEmAberto($emAberto, false);

        $response = self::convertRecursively([
            'vencidos'  => $vencidos,
            'em_aberto' => $emAberto,
            'recebidos' => $recebidos,
            'cancelados'=> $cancelados
        ]);

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
