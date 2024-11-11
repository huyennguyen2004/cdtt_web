import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const Cart = ({ items = [], onRemoveItem, onCheckout, onUpdateItems }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const totalAmount = items.length > 0 
        ? items.reduce((total, item) => total + item.price * item.quantity, 0) 
        : 0;

    const handleRemoveItem = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            onRemoveItem(id);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedItems(prevSelected => 
            prevSelected.includes(id) 
                ? prevSelected.filter(itemId => itemId !== id)
                : [...prevSelected, id]
        );
    };

    const handleQuantityChange = (id, change) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                return { ...item, quantity: Math.max(newQuantity, 1) };
            }
            return item;
        });
       
        onUpdateItems(newItems); 
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 bg-slate-300">Giỏ hàng</h2>
            {items.length === 0 ? (
                <p className="text-center">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div>
                    <ul className="list-none">
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                className="flex items-center justify-between py-4 border rounded-lg bg-slate-50 shadow-md mb-4 max-w-xl mx-auto"
                            >
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                        className="mr-4"
                                    />
                                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover mr-4" />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <div className="flex items-center">
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, -1)} 
                                                className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, 1)} 
                                                className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-lg">{item.price.toLocaleString()} đ</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleRemoveItem(item.id)} 
                                    className="text-red-500 hover:text-red-700 font-semibold transition duration-200 flex items-center"
                                >
                                    <FaTrash className="mr-1" />
                                    Xóa
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h4 className="text-xl font-semibold mt-4">
                        Tổng số tiền: {totalAmount.toLocaleString()} đ
                    </h4>
                    <button 
                        onClick={onCheckout} 
                        className="mt-4 bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-700 transition duration-200"
                    >
                        Thanh toán
                    </button>
                </div>
            )}
        </div>
    );
};

const items = [
    {
        id: 1,
        name: 'Sản phẩm 1',
        image: '/imgs/giay1.jpeg', 
        quantity: 2,
        price: 100000,
    },
    {
        id: 2,
        name: 'Sản phẩm 2',
        image: '/imgs/giay1.jpeg', 
        quantity: 1,
        price: 150000,
    },
    {
        id: 3,
        name: 'Sản phẩm 3',
        image: '/imgs/giay1.jpeg',
        quantity: 3,
        price: 200000,
    },
];

const Carts = () => {
    const handleRemoveItem = (id) => {
        console.log(`Xóa sản phẩm có ID: ${id}`);
    };

    const handleCheckout = () => {
        console.log('Thanh toán giỏ hàng');
    };

    const handleUpdateItems = (updatedItems) => {
        console.log('Cập nhật giỏ hàng:', updatedItems);
    };

    return (
        <Cart 
            items={items} 
            onRemoveItem={handleRemoveItem} 
            onCheckout={handleCheckout} 
            onUpdateItems={handleUpdateItems} 
        />
    );
};

export default Carts;
