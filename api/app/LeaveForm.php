<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeaveForm extends Model
{
   protected $fillable = ['employee_name','leave_type','from_date','to_date', 'permission_date', 'from_time', 'to_time', 'totaldays','leave_reason','status'];
}
