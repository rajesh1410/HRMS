<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable =[
        'project',
        'details',
        'assign',
        'status',
        'start',
        'end',
        'img'
    ];
}
