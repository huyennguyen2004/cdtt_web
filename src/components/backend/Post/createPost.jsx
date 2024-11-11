import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import PostService from '../../../services/PostService';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [topic_id, setTopic_id] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState('post');
  const [status, setStatus] = useState(1); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const topicData = {
      title,
      topic_id: topic_id ? parseInt(topic_id) : null,  
      description,
      content,
      slug: '',  
      type,
      status
    };

    console.log("Dữ liệu gửi lên:", topicData); 

    try {
      setLoading(true);
      const response = await PostService.store(topicData);

      if (response && response.success) {
        alert(response.message); 
        navigate('/admin/post'); 
      } else {
        console.error('Cấu trúc phản hồi sai:', response);
        alert('Có lỗi xảy ra! Vui lòng thử lại.');
      }
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
      if (error.response && error.response.data) {
    
        console.error("Lỗi xác thực:", error.response.data.errors);
        alert('Đã có lỗi xảy ra khi tạo bài viết.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Thêm post mới</h2>
        <form onSubmit={handleSubmit}>
 
          <div className="mb-4">
            <label className="block mb-2">Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Topic_id</label>
            <input
              type="number"
              value={topic_id}
              onChange={(e) => setTopic_id(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Nội dung</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Loại</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded w-full p-2"
            >
              <option value="post">Post</option>
              <option value="page">Page</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded w-full p-2"
            >
              <option value="1">Xuất bản</option>
              <option value="0">Chưa xuất bản</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 mr-2"
            disabled={loading} 
          >
            {loading ? 'Đang tạo bài viết...' : 'Tạo bài post'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/post')}
            className="bg-gray-300 text-black rounded py-2 px-4"
          >
            Quay lại
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
