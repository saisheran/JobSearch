import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  const navbarRef = useRef(null);
  const heroRef = useRef(null);
  const categoryRef = useRef(null);
  const jobsRef = useRef(null);
  const footerRef = useRef(null);

  const [loadedSections, setLoadedSections] = useState({
    navbar: false,
    hero: false,
    category: false,
    jobs: false,
    footer: false,
  });

  const handleScroll = () => {
    const isInView = (ref) => {
      if (!ref.current) return false;
      const { top } = ref.current.getBoundingClientRect();
      return top <= window.innerHeight && top >= 0;
    };

    setLoadedSections(prevState => ({
      navbar: prevState.navbar || isInView(navbarRef),
      hero: prevState.hero || isInView(heroRef),
      category: prevState.category || isInView(categoryRef),
      jobs: prevState.jobs || isInView(jobsRef),
      footer: prevState.footer || isInView(footerRef),
    }));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check to trigger the first visible components
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <motion.div
        ref={navbarRef}
        initial="hidden"
        animate={loadedSections.navbar ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1 }}
      >
        <Navbar />
      </motion.div>
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={loadedSections.hero ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>
      <motion.div
        ref={categoryRef}
        initial="hidden"
        animate={loadedSections.category ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1 }}
      >
        <CategoryCarousel />
      </motion.div>
      <motion.div
        ref={jobsRef}
        initial="hidden"
        animate={loadedSections.jobs ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1 }}
      >
        <LatestJobs />
      </motion.div>
      <motion.div
        ref={footerRef}
        initial="hidden"
        animate={loadedSections.footer ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;