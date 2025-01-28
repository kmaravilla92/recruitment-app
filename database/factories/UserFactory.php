<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'first_name' => fake()->firstName(),
            'middle_name' => fake()->lastName(),
            'last_name' => fake()->lastName(),
            'tin_number' => fake()->numberBetween(000000000000, 999999999999),
            'sss_number' => fake()->numberBetween(000000000000, 999999999999),
            'hdmf_number' => fake()->numberBetween(000000000000, 999999999999),
            'philhealth_number' => fake()->numberBetween(000000000000, 999999999999),
            'license_sbr_number' => fake()->numberBetween(000000000000, 999999999999),
            'lesp_expiry_date' => fake()->date('Y-m-d'),
            'present_address' => [
                'house_number' => fake()->numberBetween(111, 999),
                'street' => fake()->streetAddress(),
                'barangay' => fake()->barangay(),
                'city' => fake()->city(),
                'province' => fake()->province(),
                'region' => fake()->state(),
            ],
            'home_address' => [
                'house_number' => fake()->numberBetween(111, 999),
                'street' => fake()->streetAddress(),
                'barangay' => fake()->barangay(),
                'city' => fake()->city(),
                'province' => fake()->province(),
                'region' => fake()->state(),
            ],
            'provincial_address' => [
                'house_number' => fake()->numberBetween(111, 999),
                'street' => fake()->streetAddress(),
                'barangay' => fake()->barangay(),
                'city' => fake()->city(),
                'province' => fake()->province(),
                'region' => fake()->state(),
            ],
            'uniform_detail' => [
                'shoe_size' => fake()->numberBetween(111, 999),
                'waistline' => fake()->numberBetween(111, 999),
                'polo_shirt_size' => fake()->numberBetween(111, 999),
                'pershing_cap_size' => fake()->numberBetween(111, 999),
                'type_a_uniform_size' => fake()->numberBetween(111, 999),
            ],
            'educational_background_list' => [
                'tertiary' => [
                    'educational_status' => fake()->words(3, true),
                    'school' => fake()->words(3, true),
                    'period_covered' => fake()->randomElement(range(1900, 2025)),
                    'degree_course' => fake()->words(3, true),
                ],
                'vocational' => [
                    'educational_status' => fake()->words(3, true),
                    'school' => fake()->words(3, true),
                    'period_covered' => fake()->randomElement(range(1900, 2025)),
                    'degree_course' => fake()->words(3, true),
                ],
                'secondary' => [
                    'educational_status' => fake()->words(3, true),
                    'school' => fake()->words(3, true),
                    'period_covered' => fake()->randomElement(range(1900, 2025)),
                    'degree_course' => fake()->words(3, true),
                ],
                'primary' => [
                    'educational_status' => fake()->words(3, true),
                    'school' => fake()->words(3, true),
                    'period_covered' => fake()->randomElement(range(1900, 2025)),
                    'degree_course' => fake()->words(3, true),
                ],
            ],
            'emergency_contact_list' => [
                [
                    'name' => fake()->name(),
                    'address' => fake()->address(),
                    'relation' => fake()->randomElement(['Mother', 'Father', 'Siblings', 'Spouse', 'Husband']),
                    'contact_number' => fake()->mobileNumber(),
                ]
            ],
            'father_detail' => [
                'full_name' => fake()->name('male'),
                'occupation' => fake()->jobTitle(),
                'birthday' => fake()->date('Y-m-d'),
            ],
            'mother_detail' => [
                'full_name' => fake()->name('male'),
                'occupation' => fake()->jobTitle(),
                'birthday' => fake()->date('Y-m-d'),
            ],
            'sibling_detail_list' => [
                [
                    'full_name' => fake()->name(),
                    'contact_number' => fake()->mobileNumber(),
                    'birthday' => fake()->date('Y-m-d'),
                ],
                [
                    'full_name' => fake()->name(),
                    'contact_number' => fake()->mobileNumber(),
                    'birthday' => fake()->date('Y-m-d'),
                ],
            ],
            'spouse_detail' => [
                'full_name' => fake()->name(),
                'occupation' => fake()->jobTitle(),
                'birthday' => fake()->date('Y-m-d'),
            ],
            'child_detail_list' => [
                [
                    'full_name' => fake()->name(),
                    'contact_number' => fake()->mobileNumber(),
                    'birthday' => fake()->date('Y-m-d'),
                ],
                [
                    'full_name' => fake()->name(),
                    'contact_number' => fake()->mobileNumber(),
                    'birthday' => fake()->date('Y-m-d'),
                ],
            ],
            'job_experience_list' => [
                [
                    'company' => fake()->company(),
                    'employment_period' => fake()->numberBetween(1, 10) . ' years',
                    'reason_for_leaving' => fake()->words(3, true),
                    'position' => fake()->words(2, true),
                ],
            ],
            'training_detail_list' => [
                [
                    'trainings_seminars' => fake()->catchPhrase(),
                    'duration' => fake()->numberBetween(111, 999),
                    'total_hours' => fake()->numberBetween(111, 999),
                    'venue' => fake()->country(),
                    'facilitator' => fake()->name(),
                ],
                [
                    'trainings_seminars' => fake()->catchPhrase(),
                    'duration' => fake()->numberBetween(111, 999),
                    'total_hours' => fake()->numberBetween(111, 999),
                    'venue' => fake()->country(),
                    'facilitator' => fake()->name(),
                ],
                [
                    'trainings_seminars' => fake()->catchPhrase(),
                    'duration' => fake()->numberBetween(111, 999),
                    'total_hours' => fake()->numberBetween(111, 999),
                    'venue' => fake()->country(),
                    'facilitator' => fake()->name(),
                ]
            ],
            'character_reference_list' => [
                [
                    'full_name' => fake()->name(),
                    'occupation' => fake()->words(2, true),
                    'company' => fake()->company(),
                    'contact_number' => fake()->mobileNumber(),
                ],
                [
                    'full_name' => fake()->name(),
                    'occupation' => fake()->words(2, true),
                    'company' => fake()->company(),
                    'contact_number' => fake()->mobileNumber(),
                ],
                [
                    'full_name' => fake()->name(),
                    'occupation' => fake()->words(2, true),
                    'company' => fake()->company(),
                    'contact_number' => fake()->mobileNumber(),
                ]
            ],
            'contact_number' => fake()->unique()->mobileNumber(),
            'email' => fake()->unique()->safeEmail(),
            'date_of_birth' => fake()->date('Y-m-d'),
            'place_of_birth' => fake()->province(),
            'height' => fake()->numberBetween(1, 120),
            'weight' => fake()->numberBetween(1, 1000),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'religion' => fake()->randomElement(['Catholic', 'Christian', 'Muslim', 'N/A']),
            'is_fully_vaccinated' => fake()->boolean(),
            'citizenship' => 'Filipino',
            'blood_type' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-',]),
            'hair_color' => fake()->randomElement(['Black', 'Brown', 'White']),
            'driver_license_number' => fake()->numberBetween(000000000000, 999999999999),
            'distinguishing_mark' => 'N/A',
            'is_applicant' => true,
            'is_new' => fake()->boolean(),
            'is_processing' => fake()->boolean(),
            'is_rejected' => fake()->boolean(),
            'is_hired' => fake()->boolean(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
