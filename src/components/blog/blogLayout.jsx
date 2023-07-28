import React from 'react';

const BlogLayout = ({ title, des, src, date, org }) => {
  return (
    <div className="w-full p-4 xl:px-12 h-auto xl:py-10 rounded-lg shadow-md bg-[#e9e9e8] group hover:bg-[#8d8d8c] transition-colors duration-1000">
      <div className="w-full h-[80%] overflow-hidden rounded-lg">
        <img
          className="w-full h-60 object-cover group-hover:scale-110 duration-300 cursor-pointer"
          src={src}
          alt="src"
        />
      </div>
      <div className="w-full mt-5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">{date}</div>
          <div className="text-sm text-black">{org}</div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base uppercase text-[#142c0c] font-normal">
              {title}
            </h3>
          </div>
          <p className="text-sm tracking-wide mt-3 hover:text-gray-700 duration-300">
            {des}
          </p>
         
        </div>
      </div>
    </div>
    
  );
};

export default BlogLayout;