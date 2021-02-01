<?php
namespace App\Models;


use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];



    public function name()
    {
        return $this->name;
    }



    public function email()
    {
        return $this->email;
    }



    public function avatar()
    {
        $user    = ('images/avatars/' . $this->code . '.png');
        $default = ('images/avatars/default.png');

        return url(file_exists(public_path($user)) ? $user : $default);
    }



    public function firstName()
    {
        $name = explode(' ', $this->name);
        return $name[0];
    }


    public function firstAndLastName()
    {
        $first = $this->firstName();
        $expLast = explode(' ', $this->name);
        $last = $expLast[ count($expLast) - 1 ];
        return ($first . ' ' . $last);
    }



    public function isAdmin()
    {
        return ($this->access === 'AD');
    }



    public function isFinanceiro()
    {
        return ($this->access === 'FN');
    }



    public function isOperador()
    {
        return ($this->access === 'OP');
    }



    public function isCaixa()
    {
        return ($this->access === 'CX');
    }



    public function position()
    {
        if ($this->isAdmin()) {
            return 'Administrador';
        }
        else if ($this->isFinanceiro()) {
            return 'Financeiro';
        }
        else if ($this->isOperador()) {
            return 'Operacional';
        }
        else if ($this->isCaixa()) {
            return 'Caixa';
        }

        return 'Visitante';
    }



    public function getAccessRoute()
    {
        if ($this->isAdmin()) {
            return route('admin');
        }

        if ($this->isCaixa()) {
            return route('caixa');
        }

        if ($this->isFinanceiro()) {
            return route('financeiro');
        }

        if ($this->isOperacional()) {
            return route('operacional');
        }

        return null;
    }
}
