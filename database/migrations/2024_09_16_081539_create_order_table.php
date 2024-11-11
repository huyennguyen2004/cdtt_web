<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->unsignedInteger('user_id')->nullable(false); // 'user_id' with NOT NULL
            $table->string('name', 1000)->nullable(); // 'name' with varchar(1000) and NULL
            $table->string('phone', 13)->nullable(); // 'phone' with varchar(13) and NULL
            $table->string('email', 100)->nullable(); // 'email' with varchar(100) and NULL
            $table->string('address', 1000)->nullable(); // 'address' with varchar(1000) and NULL
            $table->tinyText('note')->nullable(); // 'note' with TINYTEXT and NULL
            $table->timestamps(); // 'created_at' and 'updated_at' with datetime and NOT NULL
            $table->unsignedInteger('updated_by')->nullable(); // 'updated_by' with UNSIGNED and NULL
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
        Schema::dropIfExists('order');
    }
}
