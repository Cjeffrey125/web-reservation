import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventData } from '../../constant/eventData';
import FeaturedEvent from './featuredLayout';
import UpcomingEvent from './upcomingLayout';
import Search from '../search-dropdown/search';
import eventdta from '../../constant/eventData'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../src/App.css';



const Event = () => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <section className="w-full py-20 border-b-[1px] relative z-0">
<div className='App'>
  <Slider {...settings}>
    {eventdta.map((item) => (
      <Link to={`/event/${item.eventKey}`} key={item.eventKey}>
        <div className="card">
          <div className="card-top">
            <img
              src={item.image}
              alt={item.image}
            />
            <h1>{item.title}</h1>
          </div>
          <div className="card-bottom">
            <h3>{item.price}</h3>
            <span className="category">{item.organization}</span>
          </div>
        </div>
      </Link>
    ))}
  </Slider>
</div>




      <div className="container mx-auto">
        <div className="mt-9 mb-9 ml-4">
          <h1 className="text-5xl font-bold text-left">Featured Event</h1>
        </div>
      </div>
      <div className = "px-10 grid-wrapper">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-4">
        {eventData.map(event => (
          <Link to={`/event/${event.eventKey}`} key={event.eventKey}>
            <FeaturedEvent
              title={event.title}
              genre1={event.genre1}
              genre2={event.genre2}
              date_time={event.date_time}
              src={event.image}
            />
          </Link>
        ))}
      </div>
      </div>
      
      <div className="container mx-auto relative z-10"> 
        <div className="mt-9 mb-9 ml-4">
          <h1 className="text-5xl font-bold text-left">Upcoming Event</h1>
        </div>
        <Search />
      </div>
          
  
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {eventData.map(event => (
          <Link to={`/event/${event.eventKey}`} key={event.eventKey}>
            <UpcomingEvent
              title={event.title}
              date_time={event.date_time}
              genre1={event.genre1}
              genre2={event.genre2}
              org={event.organization}
              price={event.price}
              transaction={event.transaction}
              limit={event.limit}
              src={event.image}
            />
          </Link>
        ))}
      </div>

    </section>
  );
}

export default Event;
