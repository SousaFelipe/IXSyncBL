<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id'        => 1,
            'code'      => '2dPsQxPM',
            'access'    => 'CX',
            'name'      => 'Felipe Sousa',
            'email'     => 'suporte@agility.com.br',
            'password'  => bcrypt('marver1234'),
        ]);
    }
}
