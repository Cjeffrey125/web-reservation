import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventData } from '../../constant/eventData';
import UpcomingEvent from './upcomingLayout';
import Search from '../search-dropdown/search';
import eventdta from '../../constant/eventData';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../src/App.css';
import images from '../../constant/images';

const Event = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
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
    <section id="blog" className="w-full border-b-[1px] relative z-0">
      <div className="container mx-auto">

        <div className="facebook-cover">
          <img src={images.events} alt="Events Cover" className="w-full h-auto object-cover" />
        </div>
      </div>

      <div className="container mx-auto mt-15 text-center">
        <div style={{ color: '#142c0c' }}>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="text-5xl font-bold">FEATURED EVENTS</h1>
          <br></br>
          <br></br>
        </div>
      </div>

      <div className="App">
        <Slider {...settings}>
          {eventdta.map((item) => (
            <Link to={`/event/${item.eventKey}`} key={item.eventKey}>
              <div className="card">
                <div className="card-top">
                  <img src={item.image} alt={item.image} />
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
        <div className="container mx-auto mt-15 text-center">
        <div style={{ color: '#142c0c' }}>
        <br></br>
          <br></br>
          <br></br>
          <h1 className="text-5xl font-bold">UPCOMING EVENTS</h1>
          <br></br>
          <br></br>
        </div>
      </div>
        </div>
        <Search />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {eventData.map((event) => (
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
};

export default Event;
