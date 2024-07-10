// src/components/Popup.js
import React from "react";
import "../styles/Popup.css"; // Add a separate CSS file for the popup if needed

const Popup = ({ onClose, data }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Info</h2>
          <div className="popup-row">
            <label>Activity: {data.activity}</label>
          </div>
          <div className="popup-row">
            <label>Room Name: {data.roomName}</label>
          </div>
          <div className="popup-row">
            <label>
              Batch ID: {data.batchId} 
            </label>
          </div>
        </div>
        <div className="popup-middle">
          <h2>Info2</h2>
          <div className="popup-row">
            <input type="radio" name="option" value="Employee" /> Employee
            <input type="radio" name="option" value="Group" /> Group
          </div>
          <div className="popup-row">
            <label htmlFor="dropdown">Dropdown Label: </label>
            <select id="dropdown">
              <option value="option1">Employee</option>
              <option value="option2">Group</option>
            </select>
          </div>
          <div className="popup-row">
            <label>Start Date: {data.startDate}</label>
          </div>
          <div className="popup-row">
            <label htmlFor="datePicker">Date Picker: </label>
            <input type="date" id="datePicker" />
          </div>
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
