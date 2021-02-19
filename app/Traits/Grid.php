<?php
namespace App\Traits;


trait Grid {

    public function makeGrid($queryType, $queryValue, $oper = '=')
    {
        return [
            'TB' => $this->srcname . '.' . $queryType,
            'OP' => $oper,
            'P'  => $queryValue
        ];
    }
}
