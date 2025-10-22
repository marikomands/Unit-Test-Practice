import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [fetchStatus, setfetchStatus] = useState(null);
  const [notes, setNotes] = useState("");
  //   const [saveError, setSaveError] = useState(null);
  //   const [saveStatus, setSaveStatus] = useState(null);
  // const [errorStatus, setErrorStatus] = useState(null);

  //   const [saveMessage, setSaveMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
        setFetchError(null); // 成功時はエラーをクリア
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
    try {
      const response = await axios.post("/api/save", {
        ...user,
        notes,
      });
      setUser(response.data);
      //   setSaveMessage(response.data.message || "Saved successfully!");
      //   setSaveError(null); // 成功時は保存エラーをクリア
      navigate("/success");
    } catch (err) {
      //   const errorMessage = err?.response?.data?.message || "Failed to Save";
      //   setSaveError(errorMessage);
      //   const errorStatus = err?.response?.status;
      //   setSaveStatus(errorStatus);
      //   console.log("Saved error:", errorStatus);
      //   setSaveMessage(""); // 失敗時は成功メッセージをクリア
      console.log("Save error:", err?.response?.status);
      navigate("/error");
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
          <p style={{ color: "red" }}>Error Status: {fetchStatus} </p>
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

          <button onClick={saveNotes}>Save Notes</button>
          {/* 
          {saveMessage ? (
            <p style={{ color: "green" }}>{saveMessage}</p>
          ) : saveError ? (
            <>
              <p style={{ color: "red" }}>{saveError}</p>
              {saveStatus && (
                <p style={{ color: "red" }}>Error Status: {saveStatus}</p>
              )}
            </>
          ) : null} */}

          {/* {saveMessage && <p style={{ color: "green" }}>{saveMessage}</p>}

          {saveError && <p style={{ color: "red" }}>{saveError}</p>}
          {errorStatus && (
            <p style={{ color: "red" }}>Error Status: {saveStatus}</p>
          )} */}
        </>
      )}
    </div>
  );
}

export default UserProfile;
