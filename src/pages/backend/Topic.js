import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import TopicService from '../../services/TopicService';
import { useNavigate } from 'react-router-dom'; 

const TopicPage = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [topicData, setTopicData] = useState({
    name: '',
    slug: '',
    sort_order: 1,
    description: '',
    status: 1,
  });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await TopicService.index(); 
        setTopics(response.topics); 
      } catch (error) {
        console.error('Failed to fetch Topics:', error);
      }
    };

    fetchTopics();
  }, []);

  
  const toggleStatus = async (id) => {
    try {
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === id
            ? { ...topic, status: topic.status === 1 ? 0 : 1 }
            : topic
        )
      );
      await TopicService.updateStatus(id); 
    } catch (error) {
      console.error("Error toggling topic status:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TopicService.store(topicData);
      if (response && response.message) {
        alert(response.message);
        const topicsResponse = await TopicService.index(); 
        setTopics(topicsResponse.topics); 
        setTopicData({ name: '', slug: '', sort_order: 1, description: '', status: 1 }); 
      } else {
        console.error('Response structure error:', response);
      }
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  const handleShowTopic = (id) => {
    navigate(`/admin/topic/show/${id}`);
  };

  const handleEditTopic = (id) => {
    navigate(`/admin/topic/edit/${id}`);
  };

  const handleTrashTopic = () => {
    navigate('/admin/topic/trash'); 
  };

  const handleDeleteTopic = async (id) => {
    try {
      await TopicService.delete(id); 
      setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id)); 
      alert("Topic đã được chuyển vào thùng rác");
      const response = await TopicService.index(); 
      setTopics(response.topics);  
    } catch (error) {
      console.error("Error moving topic to trash:", error);
    }
  };
  

  return (
    <div className="flex p-6 bg-gray-100">
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md mr-4">
        <h2 className="text-xl font-bold mb-4">Thêm Topic Mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Tên Topic</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập tên topic"
              value={topicData.name}
              onChange={(e) => setTopicData({ ...topicData, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Slug</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập slug"
              value={topicData.slug}
              onChange={(e) => setTopicData({ ...topicData, slug: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Sắp Xếp</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập thứ tự"
              value={topicData.sort_order}
              onChange={(e) => setTopicData({ ...topicData, sort_order: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Mô Tả</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập mô tả"
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
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Thêm mới
          </button>
        </form>
      </div>

      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh Sách Topic</h2>
          <button className="bg-red-400 hover:underline" onClick={handleTrashTopic}>
            Thùng rác
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên Topic</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Mô Tả</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.id} className="hover:bg-gray-100">
                <td className="p-2 border">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border">{topic.id}</td>
                <td className="p-2 border">{topic.name}</td>
                <td className="p-2 border">{topic.slug}</td>
                <td className="p-2 border">{topic.description}</td>
                <td className="p-5 border flex space-x-2">
                  <button className="text-blue-500 hover:underline" onClick={() => handleShowTopic(topic.id)}>
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:underline"onClick={() => handleEditTopic(topic.id)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDeleteTopic(topic.id)}>
                    <FaTrash />
                  </button>
                  <button
                    className={`flex items-center ${topic.status === 1 ? 'text-green-500' : 'text-red-500'}`}
                    onClick={() => toggleStatus(topic.id)}
                  >
                    {topic.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicPage;
