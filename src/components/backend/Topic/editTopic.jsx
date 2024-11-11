import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicService from '../../../services/TopicService';

const EditTopic = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [topicData, setTopicData] = useState({
    name: '',
    slug: '',
    sort_order: 1,
    description: '',
    status: 1,
  });

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await TopicService.show(id);
        setTopicData(response);
      } catch (error) {
        console.error('Failed to fetch topic:', error);
      }
    };

    fetchTopic();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await TopicService.update(topicData, id); 
        if (response.success) {
            alert('Topic updated successfully!');
            navigate('/admin/topic');
        } else {
            console.error('Failed to update topic:', response.message);
        }
    } catch (error) {
        console.error('Error updating topic:', error);
    }
};


  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Edit Topic</h2>
      <form onSubmit={handleUpdate}>

        <div className="mb-4">
          <label className="block mb-1">Tên Topic</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={topicData.name}
            onChange={(e) => setTopicData({ ...topicData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slug</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={topicData.slug}
            onChange={(e) => setTopicData({ ...topicData, slug: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sắp Xếp</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={topicData.sort_order}
            onChange={(e) => setTopicData({ ...topicData, sort_order: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mô Tả</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={topicData.description}
            onChange={(e) => setTopicData({ ...topicData, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Trạng Thái</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={topicData.status}
            onChange={(e) => setTopicData({ ...topicData, status: e.target.value })}
          >
            <option value="1">Xuất bản</option>
            <option value="0">Chưa xuất bản</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
       Cập nhật
        </button>
      </form>
      <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
    </div>
  );
};

export default EditTopic;
