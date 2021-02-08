<?php
namespace App\Http\Controllers;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;



    public function index()
    {
        return redirect()->route('login');
    }



    protected function csrfBroken($request)
    {
        $sessionToken = $request->session()->token();
        $headerToken = $request->header('X-CSRF-TOKEN');

        return (
            (is_null($sessionToken) || is_null($headerToken)) || ($sessionToken != $headerToken)
        );
    }



    protected function unauthorized($json = true)
    {
        return $json
            ? response()->json([ 401 => 'Unauthorized' ])
            : "View::";
    }



    protected static function convertRecursively($dat)
    {
        if (is_string($dat)) {
            return utf8_encode($dat);
        }
        elseif (is_array($dat)) {
            $ret = [];

            foreach ($dat as $i => $d) {
                $ret[ $i ] = self::convertRecursively($d);
            }

            return $ret;
        }
        elseif (is_object($dat)) {
            foreach ($dat as $i => $d) {
                $dat->$i = self::convertRecursively($d);
            }

            return $dat;
        }
        else {
            return $dat;
        }
    }
}
