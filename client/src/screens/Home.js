import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [foodItems, setFooditems] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`${baseUrl}/api/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
      });
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setFooditems(data[0]);
      setFoodCat(data[1]);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        style={{ objectFit: "contain " }}
      >
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: 2 }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900×700/?biryani"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pastry"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat.length === 0 ? (
          <h1>loading</h1>
        ) : (
          foodCat.map((category) => {
            return (
              <div key={category._id} className="row mb-3">
                <div className="fs-3 m-3">{category.CategoryName}</div>
                <hr />
                {foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => {
                    return (
                      <div
                        key={filteredItem._id}
                        className="col-12 col-md-6 col-lg-4"
                      >
                        <Card item={filteredItem} />
                      </div>
                    );
                  })}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
