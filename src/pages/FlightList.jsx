import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingError from "../components/LoadingError";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFlights = () => {
      axios
        .get("https://flight-status-mock.core.travelopia.cloud/flights")
        .then((response) => {
          setFlights(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };

    // Initial fetch
    fetchFlights();

    // Set interval to fetch flights every 30 seconds
    const intervalId = setInterval(fetchFlights, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {loading || error ? (
        <LoadingError loading={loading} error={error} />
      ) : (
        <div className="main-container">
          <div className="header">
            <h3>Flight List</h3>
          </div>
          <div className="">
            <table className="flight-table">
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>Airline</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Departure Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.flightNumber}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.airline}</td>
                    <td>{flight.origin}</td>
                    <td>{flight.destination}</td>
                    <td>{new Date(flight.departureTime).toLocaleString()}</td>
                    <td>{flight.status}</td>
                    <td>
                      <Link to={`/flight/${flight.id}`} className="view-btn">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightList;
