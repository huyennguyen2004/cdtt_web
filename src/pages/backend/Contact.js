import React, { useState,useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import ContactService from '../../services/ContactService';
import { useNavigate } from 'react-router-dom'; 


const ContactPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await ContactService.index(); 
        setContacts(response); 
      } catch (error) {
        console.error('Failed to fetch Contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const handleShowContact = (id) => {
    navigate(`/admin/contact/show/${id}`);
  };

  const toggleStatus = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, status: contact.status === "Xuất bản" ? "Chưa xuất bản" : "Xuất bản" }
          : contact
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh Sách Liên Hệ</h2>
        <span className="text-red-500 cursor-pointer">Thùng rác</span>
      </div>

   
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tiêu Đề</th>
              <th className="p-2 border">Nội Dung</th>
              <th className="p-2 border">Reply (ID)</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-100">
                <td className="p-2 border">{contact.id}</td>
                <td className="p-2 border">{contact.title}</td>
                <td className="p-2 border">{contact.content}</td>
                <td className="p-2 border">{contact.reply_id}</td>
                <td className="p-5 border flex space-x-2">
                  <button className="text-blue-500 hover:underline"  onClick={() => handleShowContact(contact.id)}>
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:underline">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(contact.id)}>
                    <FaTrash />
                  </button>
                  <button 
                    className={`flex items-center ${contact.status === "Xuất bản" ? 'text-green-500' : 'text-red-500'}`}
                    onClick={() => toggleStatus(contact.id)}
                  >
                    {contact.status === "Xuất bản" ? <FaToggleOn /> : <FaToggleOff />}
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

export default ContactPage;
