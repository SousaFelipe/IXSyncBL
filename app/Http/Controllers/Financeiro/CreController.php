<?php
namespace App\Http\Controllers\Financeiro;


use App\Models\Financeiro\Recebimento;
use App\Models\Financeiro\ClienteContrato;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class CreController extends Controller
{
    public function detalhesContratoFinanceiro(Request $request)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $recebimento = new Recebimento();
        $ccontrato = new ClienteContrato();

        $ccontratos = $ccontrato->grid($ccontrato->makeGrid('id_cliente', $request->cliente))
            ->orderBy('data_ativacao', 'desc')
            ->in(1)
            ->receive();

        $fnGrid = array(
            $recebimento->makeGrid('id_cliente', $request->cliente),
            $recebimento->makeGrid('id_contrato', $request->contrato)
        );

        $emAberto = $recebimento->grid($fnGrid[0], $recebimento->makeGrid('status', 'A'))->orderBy('data_vencimento', 'asc')->in(1)->receive();

        $financeiro = array(
            'vencidos'  => Recebimento::filtrarVencidos($emAberto, true),
            'em_aberto' => Recebimento::filtrarVencidos($emAberto, false),
            'recebidos' => $recebimento->grid($fnGrid[0], $fnGrid[1], $recebimento->makeGrid('status', 'R'))->orderBy('data_vencimento', 'asc')->in(1)->receive(),
            'cancelados'=> $recebimento->grid($fnGrid[0], $fnGrid[1], $recebimento->makeGrid('status', 'C'))->orderBy('data_vencimento', 'asc')->in(1)->receive()
        );

        $response = array(
            'contratos' => self::convertRecursively($ccontratos),
            'financeiro' => self::convertRecursively($financeiro)
        );

        return response()->json(count($response) > 0 ? $response : []);
    }



    public function fnPorClienteContrato(Request $request, Recebimento $recebimento)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $grid = [
            $recebimento->makeGrid('id_cliente', $request->cliente),
            $recebimento->makeGrid('id_contrato', $request->contrato)
        ];

        $emAberto   = $recebimento->grid($grid, $recebimento->makeGrid('status', 'A'))->orderBy('data_vencimento', 'desc')->in(1)->receive();
        $recebidos  = $recebimento->grid($grid, $recebimento->makeGrid('status', 'R'))->orderBy('data_vencimento', 'desc')->in(1)->receive();
        $cancelados = $recebimento->grid($grid, $recebimento->makeGrid('status', 'C'))->orderBy('data_vencimento', 'desc')->in(1)->receive();

        $vencidos = Recebimento::filtrarVencidos($emAberto, true);
        $emAberto = Recebimento::filtrarVencidos($emAberto, false);

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
