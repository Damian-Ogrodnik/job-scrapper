import React, { useState } from "react";
import axios from "../axios/axiosSettings";
import "./App.css";
import { Offers } from "./Offers";
import { Head } from "./Head";

const App = () => {
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchingStatus, setStatus] = useState(null);
  const [pages, setPages] = useState(1);
  const [serverError, setError] = useState(false);

  const getOffers = async (city, category) => {
    await setLoading(true);
    await axios
      .get(`/jobs-search/?city=${city}&pages=${pages}&category=${category}`)
      .then(response => {
        setOffers(response.data);
        setLoading(false);
        setError(false);
        setStatus("finished");
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const setNumOfPages = e => setPages(e.target.value);

  return (
    <div className="ui grid">
      <Head setNumOfPages={setNumOfPages} getOffers={getOffers} />
      <Offers
        searchingStatus={searchingStatus}
        offers={offers}
        loading={loading}
        serverError={serverError}
      />
    </div>
  );
};

export default App;
