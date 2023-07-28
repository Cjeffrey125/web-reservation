import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../../constant/blogData';

const BlogDetails = () => {
  const { articleKey } = useParams();
  const parsedArticleKey = parseInt(articleKey);
  const articleInfo = blogData.find((article) => article.articlekey === parsedArticleKey);

  return (
    <div className="container mx-auto px-4 mt-10 mb-10"> 
      <section className="bg-white rounded-lg shadow-md py-4">
        <div className="mt-20 ml-8 grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
          <div>
            <h1 className="text-4xl font-bold text-[#142c0c]">{articleInfo.title}</h1>
            <div className="text-gray-600">
              <p>{articleInfo.date} | {articleInfo.organization}</p>
            </div>
            <div className="mt-8">
              <p>{articleInfo.description}</p>
            </div>
          </div>

          <div>
            <img
              className="w-full h-auto object-cover"
              src={articleInfo.image}
              alt="Article Image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;