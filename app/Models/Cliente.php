<?php
namespace App\Models;


use App\Models\BaseModel;


class Cliente extends BaseModel
{
    protected $table = 'clientes';
    protected $srcname = 'cliente';



    public function razao($upper = true)
    {
        return $this->shouldBeUpper($this->razao, $upper);
    }



    public function endereco($full = true, $upper = true)
    {
        $endereco = $full ? "$this->endereco, $this->numero, $this->complemento" : $this->endereco;

        return $this->shouldBeUpper($endereco, $upper);
    }
}
