import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicService from '../../../services/TopicService';


const Showtopic = () => {
  const { id } = useParams();
  const [topic, settopic] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchtopic = async () => {
        try {
            const response = await TopicService.show(id);
            console.log(response); 
            if (response) { 
                settopic(response);
            } else {
                setError('topic không tồn tại.');
            }
        } catch (error) {
            console.error('Failed to fetch topic:', error);
            setError('Không thể tải topic. Vui lòng thử lại sau.');
        }
    };
    fetchtopic();
}, [id]);


  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!topic) return <p className="text-center">Đang tải dữ liệu...</p>;

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
              <td className="border border-gray-300 p-4"><strong>tên</strong></td>
              <td className="border border-gray-300 p-4">{topic.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{topic.id}</td>
            </tr>
          
            <tr>
              <td className="border border-gray-300 p-4"><strong>slug</strong></td>
              <td className="border border-gray-300 p-4">{topic.slug}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Description</strong></td>
              <td className="border border-gray-300 p-4">{topic.description}</td>
            </tr> 
           <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày tạo</strong></td>
              <td className="border border-gray-300 p-4">{topic.created_at}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Trạng thái</strong></td>
              <td className="border border-gray-300 p-4">{topic.status}</td>
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

export default Showtopic;
