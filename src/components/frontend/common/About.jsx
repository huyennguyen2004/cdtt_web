import React, { useState } from 'react';
import { FaStar, FaRegStar, FaCamera } from 'react-icons/fa';

const About = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Bình luận:", comment);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="mb-8">Thông tin về chúng tôi.</p>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Đánh giá</h2>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => handleRating(star)}>
              {star <= rating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-400" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Bình luận</h2>
        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="p-2 pr-10 border border-gray-300 rounded-md w-full" 
              placeholder="Viết bình luận của bạn..."
            />
    
            <FaCamera className="absolute top-2 right-2 text-gray-600" />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-900">
            Gửi bình luận
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;
