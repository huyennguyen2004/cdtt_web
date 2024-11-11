<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->string('name', 1000)->nullable(false); // 'name' with varchar(1000) and NOT NULL
            $table->string('link', 1000)->nullable(false); // 'link' with varchar(1000) and NOT NULL
            $table->unsignedInteger('table_id')->nullable(); // 'table_id' with INT and UNSIGNED
            $table->string('type', 100)->nullable(false); // 'type' with varchar(100) and NOT NULL
            $table->enum('position', ['mainmenu', 'footermenu'])->default('mainmenu'); // 'position' with ENUM and default 'mainmenu'
            $table->unsignedInteger('parent_id')->default(0); // 'parent_id' with INT DEFAULT 0 and UNSIGNED
            $table->unsignedInteger('sort_order')->default(0); // 'sort_order' with INT DEFAULT 0 and UNSIGNED
            $table->tinyText('description')->nullable(); // 'description' with tinytext and NULL
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
        Schema::dropIfExists('menu');
    }
}
