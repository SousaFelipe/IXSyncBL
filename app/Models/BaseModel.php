<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Utils\Collection;
use App\Utils\IXCClient;


class BaseModel extends Model
{
    protected $srcname;

    private $ixc = null;



    public function when($query = '0', $oper = '>', $qtype = '', $page = '1', $rp = '20', $sortname = '', $sortorder = 'asc')
    {
        $this->ixc = new IXCClient();

        $fullqtype    = $this->srcname . '.' . (($qtype == '')    ? 'id' : $qtype);
        $fullsortname = $this->srcname . '.' . (($sortname == '') ? 'id' : $sortname);
        $fulloper     = ($oper == '')  ? '=' : $oper;

        $where = array(
            'qtype'     => $fullqtype,
            'query'     => $query,
            'oper'      => $fulloper,
            'page'      => $page,
            'rp'        => $rp,
            'sortname'  => $fullsortname,
            'sortorder' => $sortorder
        );

        $this->ixc->get($this->srcname, $where);

        return $this;
    }



    public function getRecords()
    {
        $data = $this->ixc->getRespostaConteudo(true);
        return isset($data['registros']) ? $data['registros'] : [];
    }



    public function getObjects()
    {
        return Collection::create($this->getRecords(), get_class($this));
    }



    protected function shouldBeUpper(string $string, $upper)
    {
        return $upper ? strtoupper($string) : $string;
    }
}
