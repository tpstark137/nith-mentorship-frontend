import React, { useState } from "react";
import "./style.css";
import downArrow from "../../assets/downArrow.svg";
import { useEffect } from "react";
import mentors from "../../assets/mentor_dumy";

const AuthBanner = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [color, setColor] = useState("#609B6C");
  const [circleColor, setCircleColor] = useState("#C5F8C7");

  // Additional: When you click on any image in the slider it will become active
  const handleSlideClick = (index) => {
    setActiveIndex(index);
    setColor((prevValue) => (prevValue === "#609B6C" ? "#4caf50" : "#609B6C"));
    setCircleColor((prevValue) =>
      prevValue === "#C5F8C7" ? "#7ABD87" : "#C5F8C7"
    );
  };

  //   Automatic looping of mentors
  useEffect(() => {
    setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === mentors.length - 1 ? 0 : prevIndex + 1
      );
    }, "9000");
  }, []);

  // Handling previous click
  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? mentors.length / 2 - 1 : prevIndex - 1
    );
    setColor((prevValue) => (prevValue === "#609B6C" ? "#4caf50" : "#609B6C"));
    setCircleColor((prevValue) =>
      prevValue === "#C5F8C7" ? "#7ABD87" : "#C5F8C7"
    );
  };

  // Handling next click
  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === mentors.length / 2 - 1 ? 0 : prevIndex + 1
    );
    setColor((prevValue) => (prevValue === "#609B6C" ? "#4caf50" : "#609B6C"));
    setCircleColor((prevValue) =>
      prevValue === "#C5F8C7" ? "#7ABD87" : "#C5F8C7"
    );
  };

  // Angle values
  const rotateAngle = -(180 / 5) * (activeIndex + 4);
  const circularSliderStyle = {
    transform: `rotateZ(${rotateAngle}deg)`,
  };

  //   const activeSlide = mentors[activeIndex];

  return (
    <>
      <div className="outer-container">
        <div className="active-mentor-div">
          <button className="circle-btn" onClick={handleNextClick}>
            <img className="down-arrow" src={downArrow} alt="downArrow" />
          </button>
          <div className="active-mentor">
            {mentors.map((mentor, index) => (
              <div
                key={index}
                className={
                  activeIndex === index
                    ? "active-slide active-slide-active"
                    : "active-slide"
                }
              >
                <div className="active-mentor-image-container">
                  <img
                    className="active-mentor-image"
                    src={mentor.imageSrc}
                    alt={mentor.name}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="circle-btn" onClick={handlePrevClick}>
            <img className="down-arrow" src={downArrow} alt="downArrow" />
          </button>
        </div>
        <div style={{ backgroundColor: circleColor }} className="circle">
          {/* Circular Sllider Here */}
          <div className="slider-container">
            <div className="circular-slider flex-center">
              <ul className="wrapper flex-center" style={circularSliderStyle}>
                {mentors.map((mentor, index) => (
                  <li
                    className="slides"
                    key={index}
                    style={{ "--img-no": index }}
                    onClick={() => handleSlideClick(index)}
                  >
                    <img
                      src={mentor.imageSrc}
                      alt={mentor.name}
                      style={{ "--img-no": index }}
                      className={activeIndex === index ? "active" : ""}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Mentor Info Div */}
        <div className="mentor-info">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className={activeIndex === index ? "info active-info" : "info"}
            >
              <div>
                <h2 className="mentor-rating" style={{ color: color }}>
                  {mentor.rating}
                </h2>

                {/* Stars */}
                <div
                  className="Stars"
                  style={{
                    "--rating": +mentor.rating,
                    "--star-background": color,
                  }}
                ></div>
                <div>
                  <h1 className="mentor-name">{mentor.name}</h1>
                  <p className="mentor-designation">{mentor.designation}</p>
                </div>
              </div>
              <div>
                <p className="mentor-description">{mentor.description}</p>
                <button className="book-btn" style={{ backgroundColor: color }}>
                  Book a Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthBanner;
