import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const UpcomingLayout = ({ title, date_time, genre1, genre2, org, price, transaction, limit, src }) => {
  return (
    <div className="w-full p-4 xl:px-12 h-[500px] xl:py-10 rounded-lg shadow-shadowOne bg-gradient-to-r from-bodyColor to-[#73d081] group hover:bg-gradient-to-b hover:from-green-200 hover:to-green-300 transition-colors duration-1000">
      <div className="relative h-60 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover transition-transform duration-300 cursor-pointer transform group-hover:scale-105"
          src={src}
          alt="Event Image"
        />
      </div>
      <div className="w-full mt-3 mb-3 flex flex-col gap-2">
        <div className="flex items-center justify-between text-black">
          <div className="text-base text-designColor font-normal">{title}</div>
        </div>
        <div className="text-sm mt-1">{date_time}</div>
        <div className="flex gap-3 mt-1">
          <div className="text-xs px-2 py-1 rounded-full border border-black">{genre1}</div>
          <div className="text-xs px-2 py-1 rounded-full border border-black">{genre2}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm mt-2 ">
            <FontAwesomeIcon icon={faCheckCircle} className="text-black" />
            {org}
          </div>
          <div className="text-sm mt-2">{price}</div>
        </div>

        <div className="flex justify-between">
          <button className="w-40 h-12 rounded-full shadow-shadowOne flex items-center justify-center 
            bg-gradient-to-r from-bodyColor to-[#73d081] group hover:bg-[#453352] hover:from-green-200 hover:to-green-300 
            transition-colors duration-1000 mx-auto text-black transition-bg-color duration-100">Book Now</button>
          <div className="text-sm mt-2">
            <FontAwesomeIcon icon={faUserGroup} />
            {limit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingLayout;