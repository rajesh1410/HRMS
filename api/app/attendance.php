<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class attendance extends Model
{
    protected $fillable = ['employee_id','login_date','login_time','total_hrs'];
}
