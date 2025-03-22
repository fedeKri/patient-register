<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test33@example.com',
        ]);

        $this->call([
            PatientSeeder::class,
        ]);
    }
}
