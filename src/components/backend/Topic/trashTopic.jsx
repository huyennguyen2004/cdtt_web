import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTimes } from 'react-icons/fa';
import TopicService from '../../../services/TopicService';
import { useNavigate } from 'react-router-dom';


const TrashTopic = () => {
  const [trashedTopics, setTrashedTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrashedTopics = async () => {
      try {
        const response = await TopicService.trash();
        setTrashedTopics(response.topics);
      } catch (error) {
        console.error("Failed to fetch trashed topics:", error);
      }
    };
  
    fetchTrashedTopics();
  }, []);
  
  const handleDestroy = async (id) => {
    try {
      await TopicService.destroy(id);
      setTrashedTopics(trashedTopics.filter(topic => topic.id !== id));
    } catch (error) {
      console.error("Failed to permanently delete topic:", error);
    }
  };
  
  const handleRestore = async (id) => {
    try {
      await TopicService.restore(id);
      setTrashedTopics(trashedTopics.filter(topic => topic.id !== id)); 
    } catch (error) {
      console.error("Failed to restore topic:", error);
    }
  };
  
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Danh Sách</h2>
      <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tên Topic</th>
            <th className="p-2 border">Mô Tả</th>
            <th className="p-2 border">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {trashedTopics.map((topic) => (
            <tr key={topic.id} className="hover:bg-gray-100">
              <td className="p-2 border">{topic.id}</td>
              <td className="p-2 border">{topic.name}</td>
              <td className="p-2 border">{topic.description}</td>
              <td className="p-2 border flex space-x-2">
                <button className="text-green-500 hover:underline" onClick={() => handleRestore(topic.id)}>
                  <FaTrashRestore /> 
                </button>
                <button className="text-red-500 hover:underline" onClick={() => handleDestroy(topic.id)}>
                  <FaTimes /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrashTopic;
