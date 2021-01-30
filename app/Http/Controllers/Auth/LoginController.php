<?php
namespace App\Http\Controllers\Auth;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Inertia\Inertia;


class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }



    public function login(Request $request)
    {
        return view('auth/login', $request->only('errors'));
    }



    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = auth()->user();
            return redirect()->intended($user->getAccessRoute());
        }

        return redirect()->action(
            [LoginController::class, 'login'], [
                'errors' => [
                    'credentials' => 'The provided credentials do not match our records.',
                ]
            ]
        );
    }



    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
