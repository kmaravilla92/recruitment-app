<?php

namespace App\Models;

use Carbon\Carbon;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'first_name',
        'middle_name',
        'last_name',
        'tin_number',
        'sss_number',
        'hdmf_number',
        'philhealth_number',
        'license_sbr_number',
        'lesp_expiry_date',
        'present_address',
        'home_address',
        'provincial_address',
        'uniform_detail',
        'educational_background_list',
        'emergency_contact_list',
        'father_detail',
        'mother_detail',
        'sibling_detail_list',
        'spouse_detail',
        'child_detail_list',
        'job_experience_list',
        'training_detail_list',
        'character_reference_list',
        'contact_number',
        'email_address',
        'date_of_birth',
        'place_of_birth',
        'height',
        'weight',
        'gender',
        'religion',
        'is_fully_vaccinated',
        'citizenship',
        'blood_type',
        'hair_color',
        'driver_license_number',
        'distinguishing_mark',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'present_address' => 'array',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'present_address' => 'array',
            'home_address' => 'array',
            'provincial_address' => 'array',
            'uniform_detail' => 'array',
            'educational_background_list' => 'array',
            'emergency_contact_list' => 'array',
            'father_detail' => 'array',
            'mother_detail' => 'array',
            'sibling_detail_list' => 'array',
            'spouse_detail' => 'array',
            'child_detail_list' => 'array',
            'job_experience_list' => 'array',
            'training_detail_list' => 'array',
            'character_reference_list' => 'array',
            'lesp_expiry_date' => 'date:Y-m-d',
            'date_of_birth' => 'date:Y-m-d',
        ];
    }

    public static function saveApplicationData($steps_data = [])
    {
        $data = collect($steps_data)->collapse()->all();
        $data['name'] = "{$data['first_name']} {$data['middle_name']} {$data['last_name']}";
        $data['password'] = bcrypt('applicant2025');

        static::updateOrCreate(
            ['email' => $data['email_address']],
            $data
        );
    }
}
