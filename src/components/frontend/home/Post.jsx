import React from 'react';

const Post = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img src="/1.png" alt="Post Thumbnail" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Tiêu đề bài viết</h2>
        <p className="text-gray-700 mb-4">
          Đây là nội dung ngắn gọn mô tả bài viết của bạn. Bạn có thể viết một vài câu để thu hút sự chú ý của độc giả.
        </p>
        <button className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-blue-700">
          Đọc thêm
        </button>
      </div>
    </div>
  );
};

export default Post;
