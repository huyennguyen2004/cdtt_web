<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topic', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->string('name', 1000)->nullable(false); // 'name' with varchar(1000) and NOT NULL
            $table->string('slug', 1000)->nullable(false); // 'slug' with varchar(1000) and NOT NULL
            $table->unsignedInteger('sort_order')->default(0); // 'sort_order' with INT and default 0, UNSIGNED
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
        Schema::dropIfExists('topic');
    }
}
