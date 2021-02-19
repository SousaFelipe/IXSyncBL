<?php
namespace App\Models\Financeiro;


use App\Traits\Grid;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ClienteContrato extends BaseModel
{
    use Grid;



    protected $table = 'cliente_contrato';
    protected $srcname = 'cliente_contrato';
}
