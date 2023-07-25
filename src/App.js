import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from "./components/context/authContext";
import { ShopContextProvider } from "./components/context/wishlistContext";
import { BookingContextProvider } from "./components/context/bookingContext";

import Header from "./constant/header";
import Footer from "./constant/footer"
import Home from "./components/home";
import Article from "./components/blog/blog";
import Event from "./components/events/event";
import ContactUs from "./components/contact-us/contact";
import Login from "./components/login-signup/login";
import SignUp from "./components/login-signup/signup";
import EventDetails from './components/events/eventDetails';
import BlogDetails from "./components/blog/blogDetails";
import UserProfile from "./components/user/userProfile";
import ProtectedRoute from "./components/context/protectedRoute";
import AdminHome from "./components/adminn/admin";
import Wishlist from "./components/events/wishlist";
import './index.css'
import AdminEvent from "./components/adminn/adminEvent"
import AdminBlog from "./components/adminn/adminBlog"
import AdminQuery from "./components/adminn/adminQuery"
import BookEvents from "./components/user/bookEvents";





function App() {
  return (
    <Router>
        
        <AuthContextProvider>
        <ShopContextProvider>
        <BookingContextProvider>
    

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/event" element={<Event />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/event/:eventKey" element={<EventDetails />} />
          <Route path="/article/:articleKey" element={<BlogDetails /> }/>
          <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/admin" element={ <ProtectedRoute><AdminHome/></ProtectedRoute>}  />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
          <Route path="/adminEvent" element={<AdminEvent />} />
          <Route path="/adminBlog" element={<AdminBlog />} />
          <Route path="/adminQuery" element={<AdminQuery />} />

          
          <Route path="/book-events" element={<BookEvents/>} />

     
        
         
          
        </Routes>

  
        </BookingContextProvider>
        </ShopContextProvider>
        </AuthContextProvider>
        
        
        <Footer />
      
    </Router>
  );
}

export default App;


//https://www.figma.com/file/C0uRkPaQZqDesCaNFZm6fY/Event-Reservation-System-team-library?type=design&node-id=0-1&t=YqNjQk08bYJbazGz-0//