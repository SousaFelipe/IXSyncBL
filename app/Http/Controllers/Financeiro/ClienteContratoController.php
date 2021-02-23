<?php
namespace App\Http\Controllers\Financeiro;


use App\Models\Financeiro\ClienteContrato;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ClienteContratoController extends Controller
{
    public function listarPorCliente(Request $request)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $ccontrato = new ClienteContrato();

        $ccontratos = $ccontrato->grid($ccontrato->makeGrid('id_cliente', $request->cliente))
            ->orderBy('data_ativacao', 'desc')
            ->in(1)
            ->receive();

        $response = self::convertRecursively( ClienteContrato::filtrarCategoria($ccontratos) );

        return response()->json(count($response) > 0 ? $response : []);
    }
}
