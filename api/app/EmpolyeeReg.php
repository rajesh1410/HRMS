<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmpolyeeReg extends Model
{
    protected $fillable = ['Empolyee_id','FullName','FamilyName','Gender','DOB','DOJ','Position','Email','Phone_no','Offical_Email','Education_Deatil','Skils','FilleName','StreetName','City','District','Pincode','AccountNumber','IFSC_code','BankName','BranchName'];
}
