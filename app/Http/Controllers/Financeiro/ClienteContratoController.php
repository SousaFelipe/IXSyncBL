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

        $ccontratos = $ccontrato->when('id_cliente', '=', $request->cliente)
            ->orderBy('data_ativacao', 'desc')
            ->in(1)
            ->receive();

        $response = self::convertRecursively($ccontratos);

        return response()->json((count($response) > 0) ? $response : []);
    }
}
