import React from 'react';

const News = () => {
  const articles = [
    { id: 1, title: "Bài viết 1", image: "/1.png", description: "Mô tả bài viết 1" },
    { id: 2, title: "Bài viết 2", image: "/1.png", description: "Mô tả bài viết 2" },
    { id: 3, title: "Bài viết 3", image: "/1.png", description: "Mô tả bài viết 3" }
  ];

  return (
    <div className="p-4">
      <div className="mb-4 bg-slate-300">
        <h1 className="text-2xl font-bold text-black">TIN TỨC</h1>
      </div>

      <div className="flex justify-between space-x-4 mt-4">
        {articles.map((article) => (
          <div key={article.id} className="border p-4 rounded-md w-1/3 bg-gray-100">
            <img src={article.image} alt={article.title} className="mb-2 rounded" />
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
