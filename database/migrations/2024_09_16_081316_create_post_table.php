<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->string('title', 1000)->nullable(false); // 'title' with varchar(1000) and NOT NULL
            $table->unsignedInteger('topic_id')->nullable(); // 'topic_id' with INT and UNSIGNED
            $table->string('slug', 1000)->nullable(false); // 'slug' with varchar(1000) and NOT NULL
            $table->longText('content')->nullable(false); // 'content' with LONGTEXT and NOT NULL
            $table->string('thunbnail', 1000)->nullable(); // 'thunbnail' with varchar(1000) and NULL
            $table->enum('type', ['post', 'page'])->default('post'); // 'type' with ENUM and default 'post'
            $table->tinyText('description')->nullable(); // 'description' with TINYTEXT and NULL
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
        Schema::dropIfExists('post');
    }
}
