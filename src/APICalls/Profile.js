import React, { useEffect, useState } from "react";

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://api.example.com/profile", {
          // if failed here fetch error (Network error))
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        // if failed here, authentication error etc... fetched but not saved or other errors
        // Error is catch object.
        setUser(data);
      } catch (err) {
        setError(err.message);
        // both error goes this error.
      }
    };

    fetchProfile();
  }, [token]);

  //
  //  if (error) {
  //   let message = "unexpected error occurred.";

  //   if (error.includes("Unauthorized")) {
  //     message = "Please log in";
  //   } else if (error.includes("save")) {
  //     message = "Failed to save user data. Please try again.";
  //   } else if (error.includes("Network")) {
  //     message = "A network error occurred. Please check your connection.";
  //   }
  if (error) return <div role="alert">{message}</div>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
