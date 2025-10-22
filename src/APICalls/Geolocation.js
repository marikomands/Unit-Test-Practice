import React, { useState } from "react";

const LocationSender = () => {
  const [status, setStatus] = useState("");

  const sendLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch("/api/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });
          if (res.ok) {
            setStatus("Location saved successfully");
          } else {
            setStatus("Failed to save location");
            // location received and fetch succeeded, but processing or saving failed
          }
        } catch (err) {
          setStatus("Network error");
        }
        // location received but fetch failed
      },
      () => setStatus("Permission denied")
      // error receiving about geolocation information
    );
    //4 different situations to handle
  };

  return (
    <div>
      <button onClick={sendLocation}>Send Location</button>
      <p>{status}</p>
    </div>
  );
};

export default LocationSender;
