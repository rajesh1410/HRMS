<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable =['Title','Description','Assignee_Empolyee','Status','Start_Date','End_Date','Image'];
}
