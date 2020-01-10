<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHrmsusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hrmsusers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('EmployeeId');
            $table->string('UserName');
            $table->string('Position');
            $table->string('Password');
            $table->string('ConformPassword');
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
        Schema::dropIfExists('hrmsusers');
    }
}
