<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trainee extends Model
{
    protected $fillable = ['Traineename','Qualification','Course','Duration','Start_date','End_date','Mobile_number','Email','Address','Total_fees','Paid_date','paid_amount','Remaining_amount'];
}
