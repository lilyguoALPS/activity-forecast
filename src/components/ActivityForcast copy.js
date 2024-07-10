import React, { useState, useEffect } from "react";
import "../styles/ActivityForecast.css"; // Correct import path
import Popup from "./Popup"; // Import the Popup component

const ActivityForecast = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [roomNames, setRoomNames] = useState([]);

  useEffect(() => {
    fetchRoomNames();
  }, []);

  const fetchRoomNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/roomNames");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched room names from API:", data.roomNames); // Log the fetched room names
      setRoomNames(data.roomNames);
      setSelectedRoom(data.roomNames[0] || ""); // Set the default selected room
    } catch (error) {
      console.error("Error fetching room names:", error);
    }
  };

  const fetchBatchId = async (roomName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/batchId/${roomName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedBatch(data.batchId || "");
    } catch (error) {
      console.error("Error fetching batchId:", error);
    }
  };

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

  const handleRoomChange = (e) => {
    const roomName = e.target.value;
    setSelectedRoom(roomName);
    fetchBatchId(roomName);
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
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
              onChange={handleRoomChange}
            >
              {roomNames.map((roomName) => (
                <option key={roomName} value={roomName}>
                  {roomName}
                </option>
              ))}
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
        <div className="fetched-room-names">
          <h3>Fetched Room Names:</h3>
          <ul>
            {roomNames.map((roomName) => (
              <li key={roomName}>{roomName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityForecast;












import React, { useState, useEffect } from "react";
import "../styles/ActivityForecast.css"; // Correct import path
import Popup from "./Popup"; // Import the Popup component

const ActivityForecast = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [roomNames, setRoomNames] = useState([]);
  const [batchIds, setBatchIds] = useState([]);

  useEffect(() => {
    fetchRoomNames();
  }, []);

  const fetchRoomNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/roomNames");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched room names from API:", data.roomNames); // Log the fetched room names
      setRoomNames(data.roomNames);
      setSelectedRoom(data.roomNames[0] || ""); // Set the default selected room
      fetchBatchIds(data.roomNames[0] || ""); // Fetch batch IDs for the default room
    } catch (error) {
      console.error("Error fetching room names:", error);
    }
  };

  const fetchBatchIds = async (roomName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/batchId/${roomName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched batch IDs from API:", data.batchIds); // Log the fetched batch IDs
      setBatchIds(data.batchIds || []);
      setSelectedBatch(data.batchIds[0] || ""); // Set the default selected batch ID
    } catch (error) {
      console.error("Error fetching batch IDs:", error);
    }
  };

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

  const handleRoomChange = (e) => {
    const roomName = e.target.value;
    setSelectedRoom(roomName);
    fetchBatchIds(roomName);
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
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
              onChange={handleRoomChange}
            >
              {roomNames.map((roomName) => (
                <option key={roomName} value={roomName}>
                  {roomName}
                </option>
              ))}
            </select>
          </div>
          <div className="option-item">
            <label htmlFor="batchId">Batch ID:</label>
            <select
              id="batchId"
              className="dropdown"
              value={selectedBatch}
              onChange={handleBatchChange}
            >
              {batchIds.map((batchId) => (
                <option key={batchId} value={batchId}>
                  {batchId}
                </option>
              ))}
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
        <div className="fetched-room-names">
          <h3>Fetched Batch IDs:</h3>
          <ul>
            {batchIds.map((batchId) => (
              <li key={batchId}>{batchId}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityForecast;
