

// export default Home;
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import HeroSlider from "../components/UI/HeroSlider";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";
import { FaCar, FaSearch, FaRegClock, FaRegStar } from "react-icons/fa";
import { CountUp } from "use-count-up";

const Home = () => {
  const OFFER_END = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(d.getHours() + 14);
    d.setMinutes(d.getMinutes() + 32);
    return d;
  }, []);

  const getTimeLeft = () => {
    const diff = Math.max(0, OFFER_END - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [offerEnds, setOfferEnds] = useState(getTimeLeft);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredCars, setFilteredCars] = useState(carData.slice(0, 6));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setOfferEnds(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [OFFER_END]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter cars by category when activeCategory changes
  useEffect(() => {
    if (activeCategory === "all") {
      // For "all" category, show first 6 cars
      setFilteredCars(carData.slice(0, 6));
    } else {
      // Filter cars by the selected category
      const categoryFiltered = carData.filter(car => car.category === activeCategory);
      setFilteredCars(categoryFiltered);
    }
  }, [activeCategory]);

  const categories = [
    { id: "all", name: "All Cars", icon: <FaCar /> },
    { id: "suv", name: "SUVs", icon: <FaCar /> },
    { id: "sedan", name: "Sedans", icon: <FaCar /> },
    { id: "luxury", name: "Luxury", icon: <FaCar /> }
  ];

  const statsData = [
    { number: 850, label: "Cars Available", icon: <FaCar /> },
    { number: 15000, label: "Happy Customers", icon: <FaRegStar /> },
    { number: 99, label: "Service Points", icon: <FaSearch /> }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Helmet title="Home">
      {/* ============= Enhanced Hero Section =========== */}
      <section className="p-0 hero__slider-section position-relative">
        <HeroSlider />
        
        {/* Overlay Stats */}
        <motion.div 
          className="hero-stats position-absolute w-100"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          style={{ bottom: "30px", zIndex: 50 }}
        >
          <Container>
            <Row className="bg-white bg-opacity-90 rounded-lg py-3 shadow-lg">
              {statsData.map((stat, index) => (
                <Col lg="4" md="4" key={index}>
                  <motion.div 
                    className="d-flex align-items-center justify-content-center gap-2 py-2"
                    variants={fadeInUp}
                  >
                    <div className="text-success fs-3">{stat.icon}</div>
                    <div>
                      <h3 className="mb-0 fw-bold">
                        <CountUp isCounting end={stat.number} duration={3.2} thousandsSeparator="," />
                      </h3>
                      <p className="mb-0 text-muted">{stat.label}</p>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </motion.div>

        <motion.div 
          className="hero__form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Container>
            <Row className="form__row rounded-lg shadow overflow-hidden">
              <Col lg="4" md="4" className="bg-success text-white p-4">
                <div className="find__cars-left d-flex flex-column justify-content-center h-100">
                  <h2 className="fw-bold mb-3">Find your perfect ride</h2>
                  <p className="mb-4">Choose from our vast collection of premium vehicles to suit your needs</p>
                  
                  {/* Countdown Timer */}
                  <div className="special-offer p-3 bg-white bg-opacity-10 rounded-3">
                    <p className="text-uppercase mb-2 fw-bold">Special Offer Ends In:</p>
                    <div className="d-flex gap-3 justify-content-center">
                      <div className="text-center">
                        <h3 className="mb-0">{offerEnds.days}</h3>
                        <small>Days</small>
                      </div>
                      <div className="text-center">
                        <h3 className="mb-0">{String(offerEnds.hours).padStart(2, "0")}</h3>
                        <small>Hours</small>
                      </div>
                      <div className="text-center">
                        <h3 className="mb-0">{String(offerEnds.minutes).padStart(2, "0")}</h3>
                        <small>Mins</small>
                      </div>
                      <div className="text-center">
                        <h3 className="mb-0">{String(offerEnds.seconds).padStart(2, "0")}</h3>
                        <small>Secs</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12" className="bg-light">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </motion.div>
      </section>

      {/* =========== About Section ================ */}
      <AboutSection />

      {/* ========== Enhanced Services Section ============ */}
      <section className="services__section py-5">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h6 className="section__subtitle">What We Offer</h6>
                <h2 className="section__title">Premium Services</h2>
              </motion.div>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>

      {/* =========== Enhanced Car Offer Section ============= */}
      <section className="car__offer-section py-5 bg-light">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h6 className="section__subtitle text-warning">Best Options</h6>
                <h2 className="section__title text-success">Featured Vehicles</h2>
              </motion.div>
            </Col>
            
            {/* Category Filters */}
            <Col lg="12" className="mb-4">
              <div className="d-flex justify-content-center flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    className={`btn ${activeCategory === category.id ? 'btn-success' : 'btn-outline-success'} 
                               rounded-pill d-flex align-items-center gap-2 px-4 py-2 mb-2`}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="car-icon me-1">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </Col>

            {/* Car Items with Animation */}
            {filteredCars.map((item, index) => (
              <Col lg="4" md="6" sm="12" key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CarItem item={item} />
                </motion.div>
              </Col>
            ))}
            
            <Col lg="12" className="text-center mt-4">
              <motion.button 
                className="btn btn-success btn-lg rounded-pill"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Cars
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* =========== Become a driver section ============ */}
      <BecomeDriverSection />

      {/* =========== Enhanced testimonial section =========== */}
      <section className="testimonial__section py-5">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h6 className="section__subtitle">Testimonials</h6>
                <h2 className="section__title">What Our Customers Say</h2>
              </motion.div>
            </Col>

            <Testimonial />
            
            <Col lg="12" className="text-center mt-4">
              <div className="customer-satisfaction d-flex justify-content-center gap-4 flex-wrap">
                <div className="rating-box text-center p-3 rounded bg-white shadow-sm">
                  <h3 className="text-success">4.8<small>/5</small></h3>
                  <div className="stars-display text-warning mb-2">★★★★★</div>
                  <p className="text-muted mb-0">Average Rating</p>
                </div>
                <div className="rating-box text-center p-3 rounded bg-white shadow-sm">
                  <h3 className="text-success">97<small>%</small></h3>
                  <div className="mb-2"><FaRegStar className="text-warning" /></div>
                  <p className="text-muted mb-0">Satisfaction Rate</p>
                </div>
                <div className="rating-box text-center p-3 rounded bg-white shadow-sm">
                  <h3 className="text-success">15K<small>+</small></h3>
                  <div className="mb-2"><FaRegClock className="text-warning" /></div>
                  <p className="text-muted mb-0">Successful Rentals</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* =============== Enhanced Blog Section =========== */}
      <section className="blog__section py-5 bg-light">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h6 className="section__subtitle">Latest Updates</h6>
                <h2 className="section__title">From Our Blog</h2>
              </motion.div>
            </Col>

            <BlogList />
            
            <Col lg="12" className="text-center mt-4">
              <motion.button 
                className="btn btn-outline-success rounded-pill"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Articles
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;