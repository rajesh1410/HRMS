<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('employee_id');
            $table->string('full_name');
            $table->string('family_name');
            $table->string('gender');
            $table->date('birth');
            $table->date('join');
            $table->string('position');
            $table->string('email_id');
            $table->string('phone_number');
            $table->string('official_email')->nullable()->default(NULL);;
            $table->string('education_details')->nullable()->default(NULL);;
            $table->string('skils')->nullable()->default(NULL);;
            $table->string('img')->nullable()->default(NULL);;
            $table->string('street_name')->nullable()->default(NULL);;
            $table->string('city_town')->nullable()->default(NULL);;
            $table->string('district')->nullable()->default(NULL);;
            $table->string('pin_code')->nullable()->default(NULL);;
            $table->string('account_number')->nullable()->default(NULL);;
            $table->string('ifsc_code')->nullable()->default(NULL);;
            $table->string('bank_name')->nullable()->default(NULL);;
            $table->string('branch_name')->nullable()->default(NULL);;
            $table->boolean('status');
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
        Schema::dropIfExists('statuses');
    }
}
