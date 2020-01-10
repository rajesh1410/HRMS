<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->TIME('start_time');
            $table->TIME('end_time')->nullable()->default(NULL);
            $table->string('type');
            $table->string('total_hr')->nullable()->default(NULL);
            $table->unsignedBigInteger('attendance_id');
            $table->foreign('attendance_id')
                ->references('id')->on('attendances');
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
        Schema::dropIfExists('timers');
    }
}
