import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import UpcomingEvent from './upcomingLayout';
import Search from '../search-dropdown/search';
import Slider from 'react-slick';
import images from '../../constant/images';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../src/App.css';

const Event = () => {
  const [eventData, setEventData] =useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const data = querySnapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() }));
        setEventData(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    fetchEventData();
  }, []);

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
          {eventData.map((event) => (
            <Link to={`/event/${event.ID}`} key={event.ID}>
              <div className="card">
                <div className="card-top">
                  <img src={event.imagePath} alt={event.imagePath} />
                  <h1>{event.title}</h1>
                </div>
                <div className="card-bottom">
                  <h3>{event.price}</h3>
                  <span className="category">{event.organization}</span>
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
          <Link to={`/event/${event.ID}`} key={event.ID}>
            <UpcomingEvent
              title={event.title}
              date_time={event.date_time}
              genre1={event.genre1}
              genre2={event.genre2}
              org={event.organization}
              price={event.price}
              limit={event.limit}
              src={event.imagePath}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Event;
