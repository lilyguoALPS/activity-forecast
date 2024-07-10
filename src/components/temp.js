import React, { useState } from "react";
import "../styles/ActivityForecast.css"; // Correct import path
import Popup from "./Popup"; // Import the Popup component

const ActivityForecast = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("cultivation-room-1");
  const [selectedBatch, setSelectedBatch] = useState("haze0704");

  const handleAssignClick = (data) => {
    setPopupData({
      ...data,
      roomName: selectedRoom,
      batchId: selectedBatch,
    });
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setPopupData(null);
  };

  const handleScheduleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: selectedRoom,
          batchId: selectedBatch,
        }),
      });

      if (response.ok) {
        alert("Scheduled successfully");
      } else {
        alert("Failed to schedule");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch");
    }
  };

  return (
    <div className="activity-forecast">
      <div className="main-content">
        <div className="header">
          <h1>Activity Forecast</h1>
        </div>
        <div className="options">
          <div className="option-item">
            <label htmlFor="roomName">Room Name:</label>
            <select
              id="roomName"
              className="dropdown"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="cultivation-room-1">Cultivation Room 1</option>
              <option value="cultivation-room-2">Cultivation Room 2</option>
            </select>
          </div>
          <div className="option-item">
            <label htmlFor="batchId">Batch ID:</label>
            <select
              id="batchId"
              className="dropdown"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="haze0704">Haze0704</option>
              <option value="batch2">Batch2</option>
            </select>
          </div>
          <div className="option-item">
            <label htmlFor="stage">Stage:</label>
            <label htmlFor="stage_name">Harvesting</label>
          </div>
        </div>
        <div className="table-container">
          <h2 className="table-name">Seeding Activities</h2>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Start Date</th>
                <th>Expected Output</th>
                <th>Unit</th>
                <th>Planned Activity Rate</th>
                <th>Unit (day)</th>
                <th>Assign to</th>
                <th>Assign Task</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Seeding Activities</td>
                <td>01/01/2024</td>
                <td>2000</td>
                <td>Row</td>
                <td>2</td>
                <td>Row</td>
                <td>
                  <select>
                    <option value="worker1">Worker 1</option>
                    <option value="worker2">Worker 2</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleAssignClick({
                        activity: "Seeding Activities",
                        startDate: "01/01/2024",
                        expectedOutput: 2000,
                        unit: "Row",
                      })
                    }
                  >
                    Assign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-container">
          <h2 className="table-name">Inventory Tracking / Documentation</h2>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Start Date</th>
                <th>Expected Output</th>
                <th>Unit</th>
                <th>Planned Activity Rate</th>
                <th>Unit (day)</th>
                <th>Assign to</th>
                <th>Assign Task</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inventory Tracking / Documentation</td>
                <td>01/01/2024</td>
                <td>100</td>
                <td>Files</td>
                <td>1</td>
                <td>Files</td>
                <td>
                  <select>
                    <option value="worker1">Worker 1</option>
                    <option value="worker2">Worker 2</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleAssignClick({
                        activity: "Inventory Tracking / Documentation",
                        startDate: "01/01/2024",
                        expectedOutput: 100,
                        unit: "Files",
                      })
                    }
                  >
                    Assign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {isPopupVisible && (
          <Popup onClose={handleClosePopup} data={popupData} />
        )}
        <div className="schedule-button-container">
          <button className="schedule-button" onClick={handleScheduleClick}>
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityForecast;
