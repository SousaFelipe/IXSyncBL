<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Utils\Collection;
use App\Utils\IXCClient;


class BaseModel extends Model
{
    protected $srcname;

    private $ixc = null;
    private $when = null;



    /**
     * @param $query        string  O valor a ser comparado no banco de dados
     * @param $oper         string  O tipo de busca que deve ser feita
     * @param $qtype        string  A página dos itens retornados
     * @param $rp           string  A quantidade máxima de itens retornados
     * @param $sortname     string  O nome do campo para organizar a busca
     * @param $sortorder    string  A ordem de organização da busca
     */
    public function when($query = '0', $oper = '>', $qtype = '', $page = '1', $rp = '20', $sortname = '', $sortorder = 'asc')
    {
        $this->ixc = new IXCClient();

        $fullqtype    = $this->srcname . '.' . (($qtype == '')    ? 'id' : $qtype);
        $fullsortname = $this->srcname . '.' . (($sortname == '') ? 'id' : $sortname);
        $fulloper     = ($oper == '')  ? '=' : $oper;

        $this->when = array(
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
        $this->ixc->get($this->srcname, $this->when);
        $data = $this->ixc->getRespostaConteudo(true);
        return isset($data['registros']) ? $data['registros'] : [];
    }



    public function sendRecords(array $post)
    {
        if (is_null($post) || count($post) <= 0) {
            return [];
        }

        $this->ixc->post($this->srcname, $post);
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
