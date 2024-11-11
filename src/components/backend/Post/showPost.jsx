import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostService from './../../../services/PostService';

const Showpost = () => {
  const { id } = useParams();
  const [post, setpost] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchpost = async () => {
        try {
            const response = await PostService.show(id);
            console.log(response); 
            if (response) { 
                setpost(response);
            } else {
                setError('post không tồn tại.');
            }
        } catch (error) {
            console.error('Failed to fetch post:', error);
            setError('Không thể tải post. Vui lòng thử lại sau.');
        }
    };
    fetchpost();
}, [id]);


  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!post) return <p className="text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chi tiết</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Thông Tin</th>
              <th className="border border-gray-300 p-4 text-left">Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4"><strong>chủ đề</strong></td>
              <td className="border border-gray-300 p-4">{post.topic_id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{post.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Title</strong></td>
              <td className="border border-gray-300 p-4">{post.title}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>slug</strong></td>
              <td className="border border-gray-300 p-4">{post.slug}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Description</strong></td>
              <td className="border border-gray-300 p-4">{post.description}</td>
            </tr> 
            <tr>
              <td className="border border-gray-300 p-4"><strong>type</strong></td>
              <td className="border border-gray-300 p-4">{post.type}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ảnh</strong></td>
              <td className="border border-gray-300 p-4">
              <img src={`http://localhost:8000/${post.thumbnail}`} alt={post.name} className="w-24 h-16 object-cover" />
                  </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>content</strong></td>
              <td className="border border-gray-300 p-4">{post.content}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>reply id</strong></td>
              <td className="border border-gray-300 p-4">{post.reply_id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày tạo</strong></td>
              <td className="border border-gray-300 p-4">{post.created_at}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Trạng thái</strong></td>
              <td className="border border-gray-300 p-4">{post.status}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default Showpost;
