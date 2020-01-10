<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpolyeeRegsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empolyee_regs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Empolyee_id');
            $table->string('FullName');
            $table->string('FamilyName');
            $table->string('Gender');
            $table->string('DOB');
            $table->string('DOJ');
            $table->string('Position');
            $table->string('Email');
            $table->string('Phone_no');
            $table->string('Offical_Email');
            $table->string('Education_Deatil');
            $table->string('Skils');
            $table->string('FilleName');
            $table->string('StreetName');
            $table->string('City');
            $table->string('District');
            $table->string('Pincode');
            $table->string('AccountNumber');
            $table->string('IFSC_code');
            $table->string('BankName');
            $table->string('BranchName');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empolyee_regs');
    }
}
