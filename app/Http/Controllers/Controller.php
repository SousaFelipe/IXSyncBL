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



    public static function convertRecursively($dat)
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
