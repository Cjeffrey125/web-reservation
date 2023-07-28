import React from 'react';

const EventLayout = ({ title, genre1, genre2, date_time, src }) => {
  return (
    <div className="w-full p-4 xl:px-30 h-auto xl:py-10 rounded-lg shadow-shadowOne bg-gradient-to-r from-bodyColor to-[#73d081] group hover:bg-gradient-to-b hover:from-green-200 hover:to-green-300 transition-colors duration-1000 ">
      
      <div className="relative h-60 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover transition-transform duration-300 cursor-pointer transform group-hover:scale-105"
          src={src}
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-opacity-40 bg-black text-white">
          <h3 className="text-base text-designColor font-normal">{title}</h3>
          <div className="text-sm text-white mt-2">{date_time}</div>
          <div className="flex gap-3 mt-2">
          <div className="text-xs px-2 py-1 rounded-full border border-white">{genre1}</div>
          <div className="text-xs px-2 py-1 rounded-full border border-white">{genre2}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLayout;