<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Category extends Model
{
    use HasFactory;

    protected $table = 'category';
    public function subcategories()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }


}
