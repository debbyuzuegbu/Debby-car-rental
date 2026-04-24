// import React, { useEffect } from "react";

// import carData from "../assets/data/carData";
// import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import { useParams } from "react-router-dom";
// import BookingForm from "../components/UI/BookingForm";
// import PaymentMethod from "../components/UI/PaymentMethod";

// const CarDetails = () => {
//   const { slug } = useParams();

//   const singleCarItem = carData.find((item) => item.carName === slug);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [singleCarItem]);

//   return (
//     <Helmet title={singleCarItem.carName}>
//       <section>
//         <Container>
//           <Row>
//             <Col lg="6">
//               <img src={singleCarItem.imgUrl} alt="" className="w-100" />
//             </Col>

//             <Col lg="6">
//               <div className="car__info">
//                 <h2 className="section__title">{singleCarItem.carName}</h2>

//                 <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
//                   <h6 className="rent__price fw-bold fs-4">
//                     ${singleCarItem.price}.00 / Day
//                   </h6>

//                   <span className=" d-flex align-items-center gap-2">
//                     <span style={{ color: "#f9a826" }}>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                     </span>
//                     ({singleCarItem.rating} ratings)
//                   </span>
//                 </div>

//                 <p className="section__description">
//                   {singleCarItem.description}
//                 </p>

//                 <div
//                   className=" d-flex align-items-center mt-3"
//                   style={{ columnGap: "4rem" }}
//                 >
//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-roadster-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {singleCarItem.model}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-settings-2-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {singleCarItem.automatic}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-timer-flash-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {singleCarItem.speed}
//                   </span>
//                 </div>

//                 <div
//                   className=" d-flex align-items-center mt-3"
//                   style={{ columnGap: "2.8rem" }}
//                 >
//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
//                     {singleCarItem.gps}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-wheelchair-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {singleCarItem.seatType}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-building-2-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {singleCarItem.brand}
//                   </span>
//                 </div>
//               </div>
//             </Col>

//             <Col lg="7" className="mt-5">
//               <div className="booking-info mt-5">
//                 <h5 className="mb-4 fw-bold ">Booking Information</h5>
//                 <BookingForm />
//               </div>
//             </Col>

//             <Col lg="5" className="mt-5">
//               <div className="payment__info mt-5">
//                 <h5 className="mb-4 fw-bold ">Payment Information</h5>
//                 <PaymentMethod />
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default CarDetails;
import React, { useState, useEffect } from "react";
import carData from "../assets/data/carData";
import { Container, Row, Col, Badge, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, useNavigate, Link } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";

const CarDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const singleCarItem = carData.find((item) => item.carName === slug);

  const similarCars = singleCarItem
    ? carData
        .filter(
          (item) =>
            item.carName !== slug && item.category === singleCarItem.category
        )
        .slice(0, 3)
    : [];

  // Categories
  const categories = [
    { id: "all", name: "All Cars", icon: "ri-car-line" },
    { id: "suv", name: "SUVs", icon: "ri-jeep-line" },
    { id: "sedan", name: "Sedans", icon: "ri-taxi-line" },
    { id: "luxury", name: "Luxury", icon: "ri-vip-crown-line" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  if (!singleCarItem) {
    return (
      <section className="py-5 text-center">
        <Container>
          <h3 className="text-muted mb-3">Car not found</h3>
          <p className="text-muted mb-4">
            The car you're looking for doesn't exist or may have been removed.
          </p>
          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/cars")}
          >
            Browse All Cars
          </button>
        </Container>
      </section>
    );
  }

  const features = [
    { icon: "ri-roadster-line", label: "Model", value: singleCarItem.model },
    { icon: "ri-settings-2-line", label: "Transmission", value: singleCarItem.automatic },
    { icon: "ri-timer-flash-line", label: "Speed", value: singleCarItem.speed },
    { icon: "ri-map-pin-line", label: "GPS", value: singleCarItem.gps },
    { icon: "ri-wheelchair-line", label: "Seat Type", value: singleCarItem.seatType },
    { icon: "ri-building-2-line", label: "Brand", value: singleCarItem.brand },
    { icon: "ri-gas-station-line", label: "Fuel Type", value: singleCarItem.fuelType },
    { icon: "ri-bluetooth-line", label: "Bluetooth", value: "Available" }
  ];

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleCategoryFilter = (categoryId) => {
    setActiveCategory(categoryId);
    // Redirect to a filtered view or update state
    // navigate('/?category=' + categoryId);
  };

  return (
    <Helmet title={singleCarItem.carName}>
      <section className="car-details-section py-5">
        <Container>
          {/* Category Filters */}
          <div className="mb-5">
            <div className="d-flex justify-content-center flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn ${activeCategory === category.id ? 'btn-success' : 'btn-outline-success'} 
                             rounded-pill d-flex align-items-center gap-2 px-4 py-2 mb-2`}
                  onClick={() => handleCategoryFilter(category.id)}
                >
                  <i className={category.icon}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Car Info Card */}
          <div className="car-detail-card bg-white rounded-3 shadow-sm overflow-hidden mb-5">
            <div className="car-title-bar bg-success text-white p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{singleCarItem.carName}</h2>
                <div className="d-flex align-items-center">
                  <Badge color="light" className="text-success me-2 px-3 py-2 rounded-pill">
                    Available Now
                  </Badge>
                  {singleCarItem.category && (
                    <Badge color="light" className="text-success px-3 py-2 rounded-pill">
                      {singleCarItem.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Row className="g-0">
              {/* Car Image Section */}
              <Col lg="6" className="car-image-section border-end">
                <div 
                  className={`car-image-container position-relative ${isImageEnlarged ? 'enlarged' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsImageEnlarged(!isImageEnlarged)}
                >
                  <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <i className="ri-zoom-in-line text-white fs-1 opacity-0 hover-visible"></i>
                  </div>
                  <img 
                    src={singleCarItem.imgUrl} 
                    alt={singleCarItem.carName} 
                    className="w-100 transition-all" 
                    style={{ 
                      transform: isImageEnlarged ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>

                {/* Image Gallery Thumbnails */}
                <Row className="g-2 p-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Col key={item} xs="3">
                      <img 
                        src={singleCarItem.imgUrl} 
                        alt="" 
                        className="w-100 rounded cursor-pointer shadow-sm hover-effect"
                        style={{ opacity: item === 1 ? 1 : 0.6 }}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>

              {/* Car Information Section */}
              <Col lg="6" className="p-4">
                <div className="car-price-rating mb-3 d-flex justify-content-between align-items-center">
                  <h3 className="price-tag mb-0 text-success fw-bold">
                    ${singleCarItem.price}.00 <span className="fs-6 text-muted fw-normal">/ day</span>
                  </h3>
                  
                  <div className="rating-container">
                    <div className="stars d-flex align-items-center" style={{ color: "#f9a826" }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-s-fill"></i>
                      ))}
                      <span className="ms-2 text-dark">({singleCarItem.rating} ratings)</span>
                    </div>
                  </div>
                </div>

                {/* Car Description */}
                <div className="car-description mb-4">
                  <p className="text-muted">
                    {showMoreDescription 
                      ? singleCarItem.description + " Additional information about this amazing vehicle. This car offers superior handling, exceptional comfort, and state-of-the-art technology features."
                      : `${singleCarItem.description?.substring(0, 150) || "This exceptional vehicle offers a perfect blend of performance, comfort, and style. Ideal for both city drives and long journeys."}...`}
                  </p>
                  <button 
                    className="btn btn-link p-0 text-success"
                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                  >
                    {showMoreDescription ? 'Show Less' : 'Read More'}
                  </button>
                </div>

                {/* Quick Specs Summary */}
                <div className="quick-specs d-flex justify-content-between flex-wrap mb-4">
                  <div className="spec-item text-center mb-3 p-2 border rounded">
                    <i className="ri-dashboard-3-line text-success fs-4"></i>
                    <div className="spec-value fw-bold">{singleCarItem.speed}</div>
                    <div className="spec-label small text-muted">Top Speed</div>
                  </div>
                  <div className="spec-item text-center mb-3 p-2 border rounded">
                    <i className="ri-settings-2-line text-success fs-4"></i>
                    <div className="spec-value fw-bold">{singleCarItem.automatic}</div>
                    <div className="spec-label small text-muted">Transmission</div>
                  </div>
                  <div className="spec-item text-center mb-3 p-2 border rounded">
                    <i className="ri-roadster-line text-success fs-4"></i>
                    <div className="spec-value fw-bold">{singleCarItem.model}</div>
                    <div className="spec-label small text-muted">Model</div>
                  </div>
                  <div className="spec-item text-center mb-3 p-2 border rounded">
                    <i className="ri-wheelchair-line text-success fs-4"></i>
                    <div className="spec-value fw-bold">{singleCarItem.seatType}</div>
                    <div className="spec-label small text-muted">Seats</div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-between mt-4">
                  <button className="btn btn-success px-4 py-2">
                    <i className="ri-calendar-line me-2"></i> Reserve Now
                  </button>
                  <button className="btn btn-outline-success px-4 py-2">
                    <i className="ri-phone-line me-2"></i> Contact
                  </button>
                  <button className="btn btn-outline-success px-4 py-2">
                    <i className="ri-message-3-line me-2"></i> Quote
                  </button>
                </div>
              </Col>
            </Row>
          </div>

          {/* Car Specifications in Detail */}
          <div className="car-specs-detail bg-white rounded-3 shadow-sm p-4 mb-5">
            <h4 className="fw-bold mb-4 text-success border-bottom pb-2">Car Specifications</h4>
            <Row className="g-3">
              {features.map((feature, index) => (
                <Col key={index} xs="6" md="3">
                  <div className="spec-item d-flex flex-column p-3 text-center hover-effect rounded border">
                    <i className={`${feature.icon} fs-3 mb-2`} style={{ color: "#4CAF50" }}></i>
                    <div className="spec-label text-muted small">{feature.label}</div>
                    <div className="spec-value fw-medium">{feature.value}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Tabs for Booking, Payment, and Reviews */}
          <div className="booking-payment-section bg-white rounded-3 shadow-sm mb-5">
            <Nav tabs className="border-0 p-2 bg-light rounded-top">
              <NavItem>
                <NavLink
                  className={`${activeTab === "1" ? 'active bg-success text-white' : 'text-success'} fw-medium cursor-pointer rounded-pill px-4 me-2`}
                  onClick={() => toggleTab("1")}
                >
                  <i className="ri-calendar-check-line me-2"></i>
                  Make a Booking
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`${activeTab === "2" ? 'active bg-success text-white' : 'text-success'} fw-medium cursor-pointer rounded-pill px-4 me-2`}
                  onClick={() => toggleTab("2")}
                >
                  <i className="ri-bank-card-line me-2"></i>
                  Payment Options
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`${activeTab === "3" ? 'active bg-success text-white' : 'text-success'} fw-medium cursor-pointer rounded-pill px-4`}
                  onClick={() => toggleTab("3")}
                >
                  <i className="ri-star-line me-2"></i>
                  Reviews & Ratings
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="p-4">
              <TabPane tabId="1" className="pb-2">
                <h4 className="mb-4 fw-bold text-success">Booking Information</h4>
                <BookingForm />
              </TabPane>
              <TabPane tabId="2" className="pb-2">
                <h4 className="mb-4 fw-bold text-success">Payment Information</h4>
                <PaymentMethod />
              </TabPane>
              <TabPane tabId="3" className="pb-2">
                <h4 className="mb-4 fw-bold text-success">Customer Reviews</h4>
                <div className="reviews-container">
                  {/* Sample Reviews */}
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="review-item mb-4 pb-4 border-bottom">
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 50, height: 50 }}>
                          <span className="fw-bold fs-5">{String.fromCharCode(64 + item)}</span>
                        </div>
                        <div>
                          <h6 className="mb-0">Customer {item}</h6>
                          <div style={{ color: "#f9a826" }}>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="ri-star-s-fill small"></i>
                            ))}
                          </div>
                        </div>
                        <div className="text-muted small ms-auto">
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      <p className="review-text text-muted mb-0">
                        {item === 1 
                          ? "Great car! Smooth driving experience and excellent fuel efficiency."
                          : item === 2 
                            ? "The car was clean and well-maintained. Pickup and drop-off process was seamless."
                            : "Exceeded my expectations. Will definitely rent again on my next trip."}
                      </p>
                    </div>
                  ))}
                  
                  <button className="btn btn-outline-success d-block w-100 mt-4">
                    <i className="ri-add-line me-2"></i> Write a Review
                  </button>
                </div>
              </TabPane>
            </TabContent>
          </div>

          {/* Similar Cars Section */}
          {similarCars.length > 0 && (
            <div className="similar-cars-section bg-light rounded-3 p-4 mb-4">
              <h4 className="mb-4 fw-bold text-success border-bottom pb-2">You May Also Like</h4>
              <Row>
                {similarCars.map((car, index) => (
                  <Col key={index} md="4" className="mb-4">
                    <div className="similar-car card h-100 border-0 shadow-sm hover-effect">
                      <div className="car-img-container overflow-hidden">
                        <img src={car.imgUrl} className="card-img-top" alt={car.carName} style={{ height: '200px', objectFit: 'cover' }} />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-success">{car.carName}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-success fw-bold">${car.price}.00/day</span>
                          <div style={{ color: "#f9a826" }}>
                            <i className="ri-star-s-fill"></i>
                            <span className="ms-1">{car.rating}</span>
                          </div>
                        </div>
                        <Link to={`/cars/${car.carName}`} className="btn btn-outline-success btn-sm w-100 mt-3">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </section>
      
      {/* Floating Action Button for Quick Booking */}
      <div className="floating-action-button position-fixed bottom-0 end-0 mb-4 me-4">
        <button className="btn btn-success btn-lg rounded-circle shadow d-flex align-items-center justify-content-center" 
                style={{ width: '60px', height: '60px' }}>
          <i className="ri-car-line fs-4"></i>
        </button>
      </div>
      
      {/* Add Custom CSS */}
      <style jsx="true">{`
        .hover-effect:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .hover-visible {
          transition: opacity 0.3s ease;
        }
        .car-image-container:hover .hover-visible {
          opacity: 1 !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .car-image-container.enlarged {
          z-index: 1000;
        }
        .spec-item:hover {
          background-color: #f8f9fa;
          border-color: #4CAF50;
        }
        .car-title-bar {
          background-color: #4CAF50;
        }
        .btn-success {
          background-color: #4CAF50;
          border-color: #4CAF50;
        }
        .btn-outline-success {
          color: #4CAF50;
          border-color: #4CAF50;
        }
        .btn-outline-success:hover {
          background-color: #4CAF50;
          color: white;
        }
        .text-success {
          color: #4CAF50 !important;
        }
        .border-success {
          border-color: #4CAF50 !important;
        }
        .bg-success {
          background-color: #4CAF50 !important;
        }
        .nav-link.active {
          background-color: #4CAF50 !important;
          border-color: #4CAF50 !important;
        }
        .car-img-container {
          overflow: hidden;
          border-radius: 4px 4px 0 0;
        }
        .car-img-container img {
          transition: transform 0.3s ease;
        }
        .similar-car:hover .car-img-container img {
          transform: scale(1.05);
        }
      `}</style>
    </Helmet>
  );
};

export default CarDetails;