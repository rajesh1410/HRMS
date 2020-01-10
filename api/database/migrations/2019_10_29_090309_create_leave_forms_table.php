<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeaveFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leave_forms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('employee_name');
            $table->string('leave_type');
            $table->string('from_date')->nullable()->default(NULL);
            $table->string('to_date')->nullable()->default(NULL);
            $table->string('permission_date')->nullable()->default(NULL);
            $table->string('from_time')->nullable()->default(NULL);
            $table->string('to_time')->nullable()->default(NULL);
            $table->string('totaldays');
            $table->string('leave_reason');
            $table->string('status')->nullable()->default(NULL);
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
        Schema::dropIfExists('leave_forms');
    }
}
