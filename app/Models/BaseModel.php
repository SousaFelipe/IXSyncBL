<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Utils\Collection;
use App\Utils\IXCClient;


class BaseModel extends Model
{
    protected $srcname;

    private $ixc        = null;
    private $when       = null;
    private $query      = null;
    private $qtype      = 'id';
    private $oper       = '=';
    private $in         = 1;
    private $max        = 100;
    private $orderBy    = false;
    private $order      = 'asc';


    /**
     * @param string $qtype  O nome do campo a ser comparado
     * @param string $oper   O tipo de busca que deve ser feita
     * @param string $query  O valor a ser comparado no banco de dados
     * -------------
     * @return $this
     */
    public function when($qtype, $oper, $query)
    {
        $this->qtype = $this->srcname . '.' . (($qtype == '') ? 'id' : $qtype);
        $this->oper  = $oper;
        $this->query = $query;
        return $this;
    }



    /**
     * @param integer $id O id do registro a ser encontrado
     */
    public function match($id)
    {
        $this->qtype = $this->srcname . '.id';
        $this->query = $id;
        return $this->max(1);
    }



    /**
     * @param string $orderBy O nome do campo para organizar a busca
     * @param string $order   A ordem de organização da busca
     * -------------
     * @return $this
     */
    public function orderBy(string $orderBy, string $order = 'asc')
    {
        $this->orderBy = $this->srcname . '.' . (($orderBy == '') ? 'id' : $orderBy);
        $this->order = $order;
        return $this;
    }



    /**
     * @param integer $in A página atual dos registros obtidos
     * -------------
     * @return $this
     */
    public function in($in)
    {
        $this->in = $in;
        return $this;
    }



    /**
     * @param integer $max A quantidade máxima de registros retornados
     * -------------
     * @return $this
     */
    public function max($max)
    {
        $this->max = $max;
        return $this;
    }



    public function prepare()
    {
        $this->ixc = new IXCClient();

        if ($this->orderBy === false) {
            $this->orderBy = $this->srcname . '.id';
        }

        $this->when = array(
            'qtype'     => $this->qtype,
            'query'     => $this->query,
            'oper'      => $this->oper,
            'page'      => $this->in,
            'rp'        => $this->max,
            'sortname'  => $this->orderBy,
            'sortorder' => $this->order
        );
    }



    public function receive()
    {
        $this->prepare();

        $this->ixc->get($this->srcname, $this->when);
        $data = $this->ixc->getRespostaConteudo(true);
        return isset($data['registros']) ? $data['registros'] : [];
    }



    public function send(array $post)
    {
        if (is_null($post) || count($post) <= 0) {
            return [];
        }

        $this->prepare();

        $this->ixc->post($this->srcname, $post);
        $data = $api->getRespostaConteudo(true);
        return isset($data['registros']) ? $data['registros'] : [];
    }



    public function getObjects()
    {
        return Collection::create($this->receive(), get_class($this));
    }



    protected function shouldBeUpper(string $string, $upper)
    {
        return $upper ? strtoupper($string) : $string;
    }
}
