<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductstoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productstore', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->unsignedInteger('product_id')->nullable(false); // 'product_id' with NOT NULL and UNSIGNED
            $table->float('priceroot')->nullable(false); // 'priceroot' with NOT NULL
            $table->unsignedInteger('qty')->nullable(false); // 'qty' with NOT NULL and UNSIGNED
            $table->dateTime('dateimport')->nullable(false); // 'dateimport' with NOT NULL
            $table->dateTime('created_at')->nullable(false); // 'created_at' with NOT NULL
            $table->unsignedInteger('created_by')->nullable(false); // 'created_by' with NOT NULL
            $table->dateTime('updated_at')->nullable(); // 'updated_at' can be NULL
            $table->unsignedInteger('updated_by')->nullable(); // 'updated_by' can be NULL
            $table->tinyInteger('status')->unsigned()->nullable(); // 'status' with UNSIGNED
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productstore');
    }
}
