import images from './images'

export const eventData = [
    {
    eventKey:1,
    title:"Dulam Bayan",
    location:"Sentrong Pangkultura ng Biñan",
    date_time: "18 May  |  12:30 AM",
    genre1:"Music",
    genre2:"Concert",
    organization:"BCHATO",
    limit:"100",
    price:"Free",
    description:"The Sining Konsiyerto concert is a great way to celebrate the Filipino arts and culture. The concert is a fun and educational experience for people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert, people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert.",
    image:images.event3,
    Latitude: 14.3358574912,
    Longitude: 121.088680722,
    
    },

    {
    eventKey:2,
    title:"Sining Konsiyerto",
    location:"Sentrong Pangkultura ng Biñan",
    date_time: "18 May  |  12:30 AM",
    genre1:"Music",
    genre2:"Concert",
    organization:"BCPA",
    limit:"100",
    price:"Free",
    description:"The Sining Konsiyerto concert is a great way to celebrate the Filipino arts and culture. The concert is a fun and educational experience for people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert, people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert.",
    image:images.event1,
    Latitude: 14.3358574912,
    Longitude: 121.088680722,
    },

    {
    eventKey:3,
    title:"House 4 Rent",
    location:"Sentrong Pangkultura ng Biñan",
    date_time: "18 May  |  12:30 AM",
    genre1:"Music",
    genre2:"Concert",
    organization:"BCPA",
    limit:"100",
    price:"Free",
    description:"The Sining Konsiyerto concert is a great way to celebrate the Filipino arts and culture. The concert is a fun and educational experience for people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert, people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert.",
    image:images.event2,
    Latitude: 14.3358574912,
    Longitude: 121.088680722,
   
    },

    {
    eventKey:4,
    title:"BINGO",
    location:"Sentrong Pangkultura ng Biñan",
    date_time: "18 May  |  12:30 AM",
    genre1:"Music",
    genre2:"Concert",
    organization:"BCHATO",
    limit:"100",
    price:"Free",
    description:"The Sining Konsiyerto concert is a great way to celebrate the Filipino arts and culture. The concert is a fun and educational experience for people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert, people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert.",
    image:images.event4,
    Latitude: 14.3358574912,
    Longitude: 121.088680722,
   
    },

{
    eventKey:5,
    title:"BINGOmoto",
    location:"Sentrong Pangkultura ng Biñan",
    date_time: "18 May  |  12:30 AM",
    genre1:"Music",
    genre2:"Concert",
    organization:"BCHATO",
    limit:"100",
    price:"Free",
    description:"The Sining Konsiyerto concert is a great way to celebrate the Filipino arts and culture. The concert is a fun and educational experience for people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert, people of all ages. If you are looking for a way to experience the best of Filipino art, then you should definitely check out the Sining Konsiyerto concert.",
    image:images.event4,
    Latitude: 14.3358574912,
    Longitude: 121.088680722,
    },



];



export const AdminData = [
    {
        adKey: 1,
        eventsCreated: (
            <div>
                <h4 style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>20</h4>
                <p style={{ color: '#8c8c8c', fontFamily: 'Arial', fontSize: '20px' }}>Events Created</p>
            </div>
        )
    },
    {
        adKey: 2,
        userRegistration: (
            <div>
                <h4 style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>560</h4>
                <p style={{ color: '#8c8c8c', fontFamily: 'Arial', fontSize: '20px' }}>User Registrations</p>
            </div>
        )
    },
    {
        adKey: 3,
        ticketSales: (
            <div>
                <h4 style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>280</h4>
                <p style={{ color: '#8c8c8c', fontFamily: 'Arial', fontSize: '20px' }}>Ticket Sales</p>
            </div>
        
        )
    },
];


    export const sampleEvents = [
      {
        id_1: 1,
        title_1: 'Sining Konsiyerto',
        date_1: '2023-07-20',
        time_1: '8:00 A.M.',
        image_1: images.event1,
      },
      {
        id_1: 2,
        title_1: 'Dula, Dulaan',
        date_1: '2023-07-25',
        time_1: '8:00 A.M.',
        image_1: images.event2,
      },
      {
        id_1: 3,
        title_1: 'Bingo ng Binan',
        date_1: '2023-07-30',
        time_1: '8:00 A.M.',
        image_1: images.event3,
      },
      {
        id_1: 4,
        title_1: 'Kakahuyan',
        date_1: '2023-08-05',
        time_1: '8:00 A.M.',
        image_1: images.event4,
      },
      {
        id_1: 5,
        title_1: 'Sining Konsiyerto',
        date_1: '2023-08-10',
        time_1: '8:00 A.M.',
        image_1: images.event1,
      },
      {
        id_1: 6,
        title_1: 'Sing Binan',
        date_1: '2023-08-15',
        time_1: '8:00 A.M.',
        image_1: images.event1,
      },
    ];

export default eventData;