<?php
namespace App\Http\Controllers\Provedor;


use App\Models\Provedor\Login;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class LoginController extends Controller
{
    public function listar(Request $request, Login $login)
    {
        if ($this->csrfBroken($request)) {
            return $this->unauthorized();
        }

        $logins = $login->when('id_cliente', '=', $request->cliente)
            ->orderBy('ultima_conexao_inicial', 'desc')
            ->in(1)
            ->receive();

        $response = self::convertRecursively($logins);

        return response()->json([
            'logins' => $response
        ]);
    }
}
