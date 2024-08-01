import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import Result from "./Result";
import blacktrain from "./assets/blacktrain.jpg";
import axios from "axios";

async function getStations() {
  try {
    const response = await axios.get("http://localhost:5500/metro/getStations");
    return response.data;
  } catch (error) {
    console.error("Error in fetching stations", error);
    return [];
  }
}

async function getPath(data) {
  try {
    const response = await axios.post(
      "http://localhost:5500/metro/getPath",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetching the path", error);
    return [];
  }
}

function App() {
  const [stations, setStations] = useState([]);
  const [path, setPath] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    async function fetchStations() {
      const stationList = await getStations();
      setStations(stationList);
    }
    fetchStations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const source = event.target.source.value;
    const destination = event.target.destination.value;
    let obj = { source, destination };
    let objToServer = JSON.stringify(obj);
    setSource(source);
    setDestination(destination);
    const pathData = await getPath(objToServer);
    setPath(pathData);
  };

  return (
    <>
      <div className="nav">
        <h1>Metro Station Finder</h1>
        <div className="icon-container">
          <img src={blacktrain} alt="train" className="icon" />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <SearchBox place="Source :" name="source" arr={stations} />
          <SearchBox place="Destination :" name="destination" arr={stations} />
          <input type="submit" value="Submit" />
        </div>
      </form>

      <Result source={source} destination={destination} stations={path} />
    </>
  );
}

export default App;
