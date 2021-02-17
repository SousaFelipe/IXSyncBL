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

        $grid = [
            'TB' => 'fn_areceber.id_cliente',
            'OP' => '=',
            'P'  => $request->cliente
        ];

        $emAberto   = $recebimento->grid([ $grid, Recebimento::statusGrid('status', 'A') ])->orderBy('data_vencimento', 'desc')->in(1)->receive();
        $recebidos  = $recebimento->grid([ $grid, Recebimento::statusGrid('status', 'R') ])->orderBy('data_vencimento', 'desc')->in(1)->receive();
        $cancelados = $recebimento->grid([ $grid, Recebimento::statusGrid('status', 'C') ])->orderBy('data_vencimento', 'desc')->in(1)->receive();

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
