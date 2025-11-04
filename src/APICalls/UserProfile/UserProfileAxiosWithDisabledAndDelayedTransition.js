import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SaveSuccess } from "./SaveSuccessWithUserLocation";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [fetchStatus, setfetchStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
        setFetchError(null);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          "ユーザーデータの取得に失敗しました。";
        setFetchError(errorMessage);
        const errorStatus = err?.response?.status;
        setfetchStatus(errorStatus);
        console.log("error status:", errorStatus);
      }
    };
    fetchUser();
  }, []);

  const saveNotes = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    setIsSaving(true);
    try {
      const response = await axios.post("/api/save", {
        ...user,
        notes,
      });
      setUser(response.data);

      await delay(1000);
      // setTimeout(() => {
      console.log("Navigating to success with message:", response.data.message);
      navigate("/success", { state: { message: response.data.message } });
      console.log("navigating");
      // setIsSaving(false);
      // }, 1000); // 1秒後に遷移
    } catch (err) {
      await delay(1000);
      navigate("/error", {
        state: { message: err?.response?.data?.message },
      });
      // setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {fetchError ? (
        <>
          <p style={{ color: "red" }}>{fetchError}</p>
          <p style={{ color: "red" }}>Error Status: {fetchStatus}</p>
        </>
      ) : !user ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{user?.name}</h2>
          <p>Email: {user?.email}</p>
          <p>Notes: {user?.notes}</p>

          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            rows="4"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this user..."
          />
          {/* Disable button while saving or no notes are present */}
          <button onClick={saveNotes} disabled={isSaving || !notes}>
            {isSaving ? "Saving..." : "Save Notes"}
          </button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
