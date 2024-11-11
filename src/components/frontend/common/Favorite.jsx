import React from 'react';

const Favorite = () => {
    const favoriteItems = [
        {
            id: 1,
            name: 'Sản phẩm 1',
            image: 'link-to-image-1.jpg',
            price: 100000,
        },
        {
            id: 2,
            name: 'Sản phẩm 2',
            image: 'link-to-image-2.jpg',
            price: 150000,
        },
        {
            id: 3,
            name: 'Sản phẩm 3',
            image: 'link-to-image-3.jpg',
            price: 200000,
        },
    ];

    const removeFavorite = (id) => {
        console.log(`Xóa sản phẩm có ID: ${id}`);
    };

    return (
        <div className="container mx-auto mt-5 p-4">
            <h2 className="text-2xl font-bold mb-4 bg-slate-300">Danh sách sản phẩm yêu thích</h2>
            <ul className="space-y-4">
                {favoriteItems.map(item => (
                    <li key={item.id} className="flex items-center border p-4 rounded shadow">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p className="text-gray-600">Giá: {item.price.toLocaleString()} VNĐ</p>
                        </div>
                        <button 
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                            onClick={() => removeFavorite(item.id)}
                        >
                            Xóa
                        </button>
                    </li>
                ))}
            </ul>
            {favoriteItems.length === 0 && (
                <p className="text-center text-gray-500">Bạn chưa có sản phẩm nào trong danh sách yêu thích.</p>
            )}
        </div>
    );
};

export default Favorite;
