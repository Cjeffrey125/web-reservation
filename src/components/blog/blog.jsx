import React, { useState, useEffect, useRef } from 'react';
import BlogLayout from './blogLayout';
import { Link } from 'react-router-dom';
import { blogData } from '../../constant/blogData';
import images from '../../constant/images';

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideshowRef = useRef(null);

  useEffect(() => {
    const slideshowTimer = setTimeout(nextSlide, 2000);
    return () => clearTimeout(slideshowTimer);
  }, []);

  useEffect(() => {
    const updateSlideshowHeight = () => {
      const windowHeight = window.innerHeight;
      slideshowRef.current.style.height = `${windowHeight}px`;
    };
    updateSlideshowHeight();
    window.addEventListener('resize', updateSlideshowHeight);
    return () => window.removeEventListener('resize', updateSlideshowHeight);
  }, []);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const isLastSlide = currentIndex === blogData.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 500); 
  };

  return (
    <section id="blog" className="w-full border-b-[1px] relative z-0">
      <div className="container mx-auto">
        <div className="facebook-cover">
          <img src={images.blog} alt="Blog Cover" className="w-full h-auto object-cover" />
        </div>

      </div>

      <div className="max-w-[1400px] w-full m-auto py-12 px-4 relative">
        <div className="w-full h-[700px] rounded-2xl bg-center bg-cover duration-500" ref={slideshowRef}>
          <Link to={`/article/${blogData[currentIndex].articlekey}`} key={blogData[currentIndex].articlekey}>
            <div
              className={`w-full h-full rounded-2xl bg-center bg-cover duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ backgroundImage: `url(${blogData[currentIndex].image})` }}
            ></div>
          </Link>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
          {blogData.map((article) => (
            <Link to={`/article/${article.articlekey}`} key={article.articlekey}>
              <BlogLayout
                title={article.title}
                des={article.description}
                date={article.date}
                org={article.organization}
                src={article.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
