import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingError from "../components/LoadingError";

const FlightDetails = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`)
      .then((response) => {
        setFlight(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading || error ? (
        <LoadingError loading={loading} error={error} />
      ) : (
        <div className="flight-details-container">
          {flight ? (
            <div className="flight-details">
              <div className="flight-info">
                <h2>Flight {flight.flightNumber}</h2>
                <p>
                  <strong>Airline:</strong> {flight.airline}
                </p>
                <p>
                  <strong>Origin:</strong> {flight.origin}
                </p>
                <p>
                  <strong>Destination:</strong> {flight.destination}
                </p>
                <p>
                  <strong>Departure Time:</strong>{" "}
                  {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {flight.status}
                </p>
                <Link to="/" className="back-btn">
                  Back to Flights
                </Link>
              </div>
            </div>
          ) : (
            <p>Flight details not available</p>
          )}
        </div>
      )}
    </>
  );
};

export default FlightDetails;
