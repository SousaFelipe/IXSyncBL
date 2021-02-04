<?php
namespace App\Models\Financeiro;


use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Baixa extends BaseModel
{
    protected $table = 'fn_areceber_baixas';
    protected $srcname = 'fn_areceber_baixas';
}
