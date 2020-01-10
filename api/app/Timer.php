<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timer extends Model
{
    protected $fillable = ['start_time','end_time','type','total_hr','attendance_id'];
}
