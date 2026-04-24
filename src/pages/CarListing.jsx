import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";

const CATEGORIES = [
  { id: "all", label: "All Cars" },
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "luxury", label: "Luxury" },
];

const CarListing = () => {
  const [sortOrder, setSortOrder] = useState("default");
  const [activeCategory, setActiveCategory] = useState("all");

  const displayedCars = useMemo(() => {
    let cars =
      activeCategory === "all"
        ? [...carData]
        : carData.filter((car) => car.category === activeCategory);

    if (sortOrder === "low") {
      cars.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      cars.sort((a, b) => b.price - a.price);
    }

    return cars;
  }, [sortOrder, activeCategory]);

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-5">
                {/* Category Filter */}
                <div className="d-flex gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className={`btn rounded-pill px-3 py-1 ${
                        activeCategory === cat.id
                          ? "btn-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <div className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i>
                  <span>Sort By:</span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </Col>

            {displayedCars.length === 0 ? (
              <Col lg="12" className="text-center py-5">
                <p className="text-muted fs-5">
                  No cars found in this category.
                </p>
              </Col>
            ) : (
              displayedCars.map((item) => (
                <CarItem item={item} key={item.id} />
              ))
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
