<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderdetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderdetail', function (Blueprint $table) {
            $table->id(); // 'id' column with UNSIGNED and AUTO_INCREMENT
            $table->unsignedInteger('order_id')->nullable(false); // 'order_id' with NOT NULL
            $table->unsignedInteger('product_id')->nullable(false); // 'product_id' with NOT NULL and UNSIGNED (sử dụng unsignedInteger)
            $table->unsignedInteger('qty')->nullable(false); // 'qty' with NOT NULL and UNSIGNED
            $table->float('price')->nullable(false); // 'price' with NOT NULL
            $table->float('amount')->nullable(false); // 'amount' with NOT NULL
            $table->float('discount')->nullable(false); // 'discount' with NOT NULL
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orderdetail');
    }
}
