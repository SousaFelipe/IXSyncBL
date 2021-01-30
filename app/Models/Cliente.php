<?php
namespace App\Models;


use App\Models\BaseModel;


class Cliente extends BaseModel
{
    protected $table = 'clientes';
    protected $srcname = 'cliente';

    /*
    public $id;
    public $razao;
    public $tipo_assinante;
    public $tipo_pessoa;
    public $cnpj_cpf;
    public $ie_identidade;
    public $data_nascimento;
    public $ativo;
    public $cep;
    public $endereco;
    public $numero;
    public $complemento;
    public $bairro;
    public $cidade;
    public $contato;
    public $telefone_celular;
    public $whatsapp;
    public $obs;
    public $data_cadastro;
    public $data_cadastro_local;
    */



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
