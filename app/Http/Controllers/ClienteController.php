<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Cliente;


class ClienteController extends Controller
{
    public function buscar(Request $request)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $cliente = new Cliente();
        $clientes = $cliente->when('id', '=', $request->cliente)
            ->max(1)
            ->receive();

        $response = self::convertRecursively($clientes);

        return response()->json((count($response) > 0) ? $response[0] : []);
    }



    public function listar(Request $request, Cliente $cliente)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }
        
        $query = $request->vbusca;
        $qtype = $request->tbusca;

        $clientes = $cliente->when($qtype, 'LE', $query)
            ->orderBy($qtype)
            ->max(10)
            ->receive();

        $response = self::convertRecursively($clientes);

        return response()->json(['clientes' => $response]);
    }
}

