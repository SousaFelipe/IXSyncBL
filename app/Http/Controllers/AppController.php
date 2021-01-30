<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;


class AppController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }



    public function admin(Request $request)
    {
        return view('admin.index');
    }



    public function caixa(Request $request)
    {
        return view('caixa.index');
    }



    public function financeiro(Request $request)
    {
        return view('financeiro.index');
    }



    public function operacional(Request $request)
    {
        return view('operacional.index');
    }
}
