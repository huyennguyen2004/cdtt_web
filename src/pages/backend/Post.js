import React, { useState,useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import PostService from '../../services/PostService';
import { useNavigate } from 'react-router-dom'; 

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.index(); 
        setPosts(response); 
      } catch (error) {
        console.error('Failed to fetch Posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleStatus = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, status: post.status === "Xuất bản" ? "Chưa xuất bản" : "Xuất bản" }
          : post
      )
    );
  };

  const handleShowPost = (id) => {
    navigate(`/admin/post/show/${id}`);
  };

  const handleAddPost = () => {
    navigate('/admin/post/store'); 
  };

  return (
    <div className="p-6 bg-gray-100">
  <span className="text-red-500 cursor-pointer flex justify-end">Thùng rác</span>

<div className="bg-white p-4 rounded-lg shadow-md">
<div className="flex justify-end">
  <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"onClick={() => handleAddPost()}>
    Thêm Post
  </button>
</div>
<h2 className="text-xl font-bold mb-2">Danh Sách Post</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tiêu Đề</th>
              <th className="p-2 border">Chủ Đề (Topic)</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Loại</th>
              <th className="p-2 border">Nội Dung</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-100">
                <td className="p-2 border">{post.id}</td>
                <td className="p-2 border">{post.title}</td>
                <td className="p-2 border">{post.topic}</td>
                <td className="p-2 border">{post.slug}</td>
                <td className="p-2 border">{post.type}</td>
                <td className="p-2 border">{post.content}</td>
                <td className="p-5 border flex space-x-2">
                  <button className="text-blue-500 hover:underline" onClick={() => handleShowPost(post.id)}>
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:underline">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:underline">
                    <FaTrash />
                  </button>
                  <button
                    className={`flex items-center ${post.status === "Xuất bản" ? 'text-green-500' : 'text-red-500'}`}
                    onClick={() => toggleStatus(post.id)}
                  >
                    {post.status === "Xuất bản" ? <FaToggleOn /> : <FaToggleOff />}
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

export default PostPage;
