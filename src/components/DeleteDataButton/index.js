import React from "react";
import "./deleteDataButton.css";

export default function DeleteDataButton({ eventid }) {
  async function handleOnClick(e) {
    await fetch("http://localhost:5500/api/v1/events/" + e.target.value, {
      method: "DELETE",
    });
    console.log("delete req passed");
  }

  return (
    <div>
      <button
        onClick={(e) => {
          handleOnClick(e);
        }}
        className="delete-data-button"
        value={eventid}
      >
        Delete event
      </button>
    </div>
  );
}
