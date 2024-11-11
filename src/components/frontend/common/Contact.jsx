import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ContactService from '../../../services/ContactService';


const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactData = { name, email, content };
        console.log('Sending contact data:', contactData); 
        try {
            await ContactService.create(contactData);
            alert('Thông tin liên hệ đã được gửi thành công.');
            setName('');
            setEmail('');
            setContent('');
        } catch (error) {
            alert('Có lỗi xảy ra khi gửi thông tin liên hệ.');
            console.error('Error:', error);
        }
    };
    

    const mapCenter = {
        lat: 21.0285,
        lng: 105.8042,
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Liên hệ với chúng tôi</h2>
            <div className="flex flex-col md:flex-row justify-center items-start">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Tên</label>
                        <input
                            type="text"
                            placeholder="Nhập tên của bạn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Tin nhắn</label>
                        <textarea
                            rows={3}
                            placeholder="Nhập tin nhắn của bạn"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Gửi
                    </button>
                </form>

                <div className="w-full md:w-1/2">
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                        <GoogleMap
                            mapContainerStyle={{ height: "400px", width: "100%" }}
                            center={mapCenter}
                            zoom={15}
                        >
                            <Marker position={mapCenter} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    );
};

export default Contact;
