<?php

namespace App\Models;

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
        ];
    }

    public static function saveApplicationData($steps_data = [])
    {
        $steps_data = collect($steps_data);
        $data = $steps_data->collapse()->map(function ($item, $key) {
            if (is_array($item)) {
                return json_encode($item);
            }
            return $item;
        })->all();

        $data['name'] = "{$data['first_name']} {$data['middle_name']} {$data['last_name']}";
        $data['password'] = bcrypt("app" . date('Y'));

        static::updateOrCreate(
            ['email' => $data['email_address']],
            $data
        );
    }
}
