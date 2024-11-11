<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->string('name', 1000)->nullable(false); // 'name' with NOT NULL
            $table->string('slug', 1000)->nullable(false); // 'slug' with NOT NULL
            $table->unsignedInteger('category_id')->nullable(false); // 'category_id' with NOT NULL and UNSIGNED
            $table->unsignedInteger('brand_id')->nullable(false); // 'brand_id' with NOT NULL and UNSIGNED
            $table->longText('content')->nullable(false); // 'content' with NOT NULL
            $table->tinyText('description')->nullable(); // 'description' can be NULL
            $table->float('pricebuy')->nullable(false); // 'pricebuy' with NOT NULL
            $table->timestamps(); // 'created_at' and 'updated_at' columns
            $table->unsignedInteger('created_by')->nullable(false); // 'created_by' with NOT NULL
            $table->unsignedInteger('updated_by')->nullable(); // 'updated_by' can be NULL
            $table->unsignedTinyInteger('status')->nullable(); // 'status' can be NULL
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
}
