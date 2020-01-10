<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class hrmsuser extends Model
{
    protected $fillable = [
    	'EmployeeId',
    	'UserName',
    	'Position',
    	'Password',
    	'ConformPassword'
    ];
}
