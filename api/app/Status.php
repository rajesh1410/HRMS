<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = [
        'employee_id',
        'full_name',
        'family_name',
        'gender',
        'birth',
        'join',
        'position',
        'email_id',
        'phone_number',
        'official_email',
        'education_details',
        'skils',
        'img',
        'street_name',
        'city_town',
        'district',
        'pin_code',
        'account_number',
        'ifsc_code',
        'bank_name',
        'branch_name',
        'status'
    ];
}
