import React, { useState, useRef } from "react";
import { InfoModal } from "../Modal/InfoModal";
import "./Head.css";

const Head = ({ setNumOfPages, getOffers }) => {
  const [modalDisplay, setDisplay] = useState(false);
  const pagesButtons = useRef();
  const city = useRef();
  const category = useRef();

  const changeColor = e => {
    let levels = pagesButtons.current.children;
    for (let i = 1; i < levels.length; i++) {
      levels[i].style.background = "rgb(33,133,208)";
    }
    e.style.background = "rgb(13,113,187)";
  };

  const displayModal = () => {
    if (modalDisplay) {
      return (
        <InfoModal
          header={"Information"}
          description={"Using big search scope can take a few minutes..."}
        />
      );
    }
  };
  return (
    <div className="sixteen wide column">
      <div className="flex">
        <div className="head">
          <h1 className="ui header">Job Scrapper</h1>
        </div>
        <div style={{ minWidth: "250px", margin: "20px 0px 0px 0px" }}>
          <div
            ref={pagesButtons}
            id="pages-buttons"
            className="ui buttons blue"
            style={{ padding: "0px 15px" }}
          >
            <div
              className="ui button active blue"
              style={{ backgroundColor: "rgb(13,113,187)" }}
            >
              Search Scope
            </div>
            <button
              className="ui button"
              value={1}
              onClick={e => {
                setNumOfPages(e);
                changeColor(e.target);
              }}
            >
              Small
            </button>
            <button
              className="ui button"
              value={5}
              onClick={e => {
                setNumOfPages(e);
                changeColor(e.target);
              }}
            >
              Normal
            </button>
            <button
              className="ui button"
              value={15}
              onClick={e => {
                setNumOfPages(e);
                changeColor(e.target);
                setDisplay(true);
              }}
            >
              Big
            </button>
            {displayModal()}
          </div>
        </div>
        <div className="ui input focus " style={{ margin: "20px 0px 0px 0px" }}>
          <input
            ref={city}
            type="text"
            id="search-bar-city"
            placeholder="Location..."
          />
          <input
            ref={category}
            type="text"
            id="search-bar-category"
            placeholder="Category..."
          />
          <button
            id="search-button"
            className="ui primary button attached"
            onClick={() =>
              getOffers(city.current.value, category.current.value)
            }
          >
            Click to Search
          </button>
        </div>
      </div>
    </div>
  );
};

export { Head };
