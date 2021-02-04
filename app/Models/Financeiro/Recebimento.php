<?php
namespace App\Models\Financeiro;


use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Recebimento extends BaseModel
{
    protected $table = 'fn_areceber';
    protected $srcname = 'fn_areceber';
}
