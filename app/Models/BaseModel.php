<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Utils\Collection;
use App\Utils\IXCClient;


class BaseModel extends Model
{
    protected $srcname;

    private $ixc = null;
    private $where = null;



    public function when($query = '0', $oper = '>', $qtype = '', $page = '1', $rp = '20', $sortname = '', $sortorder = 'asc')
    {
        $this->ixc = new IXCClient();

        $fullqtype    = $this->srcname . '.' . (($qtype == '')    ? 'id' : $qtype);
        $fullsortname = $this->srcname . '.' . (($sortname == '') ? 'id' : $sortname);
        $fulloper     = ($oper == '')  ? '=' : $oper;

        $this->where = array(
            'qtype'     => $fullqtype,
            'query'     => $query,
            'oper'      => $fulloper,
            'page'      => $page,
            'rp'        => $rp,
            'sortname'  => $fullsortname,
            'sortorder' => $sortorder
        );

        return $this;
    }



    public function getRecords()
    {
        $this->ixc->get($this->srcname, $this->where);
        $data = $this->ixc->getRespostaConteudo(true);
        return isset($data['registros']) ? $data['registros'] : [];
    }



    public function sendRecords(array $post)
    {
        if (is_null($post) || count($post) <= 0) {
            return [];
        }

        $this->ixc->post('fn_areceber_baixas', $post);
        $data = $api->getRespostaConteudo(true);
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
