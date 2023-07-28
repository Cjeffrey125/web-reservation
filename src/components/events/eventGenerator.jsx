import React from 'react';
import EventList from './eventList';
import { Link } from 'react-router-dom';

export function getRandomUniqueEvents(data, count, excludeKey) {
  const events = [...data];
  const randomEvents = [];

  while (randomEvents.length < count && events.length > 1) {
    const randomIndex = Math.floor(Math.random() * events.length);
    const randomEvent = events[randomIndex];

    if (randomEvent.eventKey !== excludeKey) {
      randomEvents.push(randomEvent);
      events.splice(randomIndex, 1);
    }
  }

  return randomEvents;
}

const EventGenerator = ({ eventData, count, excludeKey }) => {
  const randomEvents = eventData ? getRandomUniqueEvents(eventData, count, excludeKey) : [];

  return (
    <div className='container mx-auto min-w-[400px]'>
    <h1 className="text-2xl font-bold ml-5">More Events</h1>
    <div className="items-center justify-center ml-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-12 mx-auto">
      {randomEvents.map(event => (
        <Link to={`/event/${event.eventKey}`} key={event.eventKey}>
          <EventList
            src={event.image}
            title={event.title}
            genre1={event.genre1}
            genre2={event.genre2}
            date_time={event.date_time}
            price={event.price}
            limit={event.limit}
          />
        </Link>
      ))}
    </div>
  </div>
  );
};

export default EventGenerator;