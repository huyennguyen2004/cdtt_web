<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->string('site_name', 1000)->nullable(false); // 'site_name' with varchar(1000) and NOT NULL
            $table->string('email', 100)->nullable(false); // 'email' with varchar(100) and NOT NULL
            $table->string('address', 1000)->nullable(false); // 'address' with varchar(1000) and NOT NULL
            $table->string('hotline', 13)->nullable(false); // 'hotline' with varchar(13) and NOT NULL
            $table->string('phone', 13)->nullable(false); // 'phone' with varchar(13) and NOT NULL
            $table->string('author', 100)->nullable(false); // 'author' with varchar(100) and NOT NULL
            $table->unsignedTinyInteger('status')->nullable(); // 'status' with tinyint UNSIGNED
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('config');
    }
}
