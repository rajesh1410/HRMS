<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTraineesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trainees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Traineename');
            $table->string('Qualification');
            $table->string('Course');
            $table->string('Duration');
            $table->date('Start_date');
            $table->date('End_date');
            $table->string('Mobile_number');
            $table->string('Email');
            $table->string('Address');
            $table->string('Total_fees');
            $table->string('Paid_date');
            $table->string('paid_amount');
            $table->string('Remaining_amount');
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
        Schema::dropIfExists('trainees');
    }
}
