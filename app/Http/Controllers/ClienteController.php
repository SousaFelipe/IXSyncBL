<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Cliente;


class ClienteController extends Controller
{
    public function buscar(Request $request)
    {
        $cliente = new Cliente();
        $record = $cliente->when($request->id_cliente, '=', 'id', '1', '1', 'id', 'asc')->getRecords();
        $response = self::convertRecursively($record);

        return response()->json((count($response) > 0) ? $response[0] : []);
    }



    public function listar(Request $request)
    {
        $query = $request->vbusca;
        $qtype = $request->tbusca;

        $cliente = new Cliente();
        $clientes = $cliente->when($query, 'LE', $qtype, '1', '10', $qtype, 'asc')->getRecords();
        $response = self::convertRecursively($clientes);

        return response()->json(['clientes' => $response]);
    }
}

