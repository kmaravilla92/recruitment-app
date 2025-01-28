<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admins
        User::factory()->create([
            'email' => 'kimluari+dev@gmail.com',
            'password' => 'sharedservices2025',
            'first_name' => 'Kim',
            'last_name' => 'Maravilla',
            'is_applicant' => 0,
        ]);

        User::factory()->create([
            'email' => 'christian.albeso27@gmail.com',
            'password' => 'sharedservices2025',
            'first_name' => 'Christian',
            'last_name' => 'Albeso',
            'is_applicant' => 0,
        ]);

        User::factory()->create([
            'email' => 'sharedservicesstaff@gmail.com',
            'password' => 'sharedservices2025',
            'first_name' => 'Shared Services',
            'last_name' => 'Staff',
            'is_applicant' => 0,
        ]);

        // Applicants
        User::factory()->count(5)->create();
    }
}
