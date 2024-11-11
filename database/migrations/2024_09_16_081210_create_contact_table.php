<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->unsignedInteger('user_id')->nullable(false); // 'user_id' with INT and UNSIGNED
            $table->string('title', 1000)->nullable(false); // 'title' with varchar(1000) and NOT NULL
            $table->text('content')->nullable(false); // 'content' with TEXT and NOT NULL
            $table->unsignedInteger('reply_id')->default(0); // 'reply_id' with INT DEFAULT 0 and UNSIGNED
            $table->timestamps(); // 'created_at' and 'updated_at' with datetime and NOT NULL
            $table->unsignedInteger('created_by')->nullable(false); // 'created_by' with UNSIGNED and NOT NULL
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
        Schema::dropIfExists('contact');
    }
}
