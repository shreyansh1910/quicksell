import React, { useState, useEffect } from "react";
import "./display.css";
function DropdownMenu({ show }) {
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  useEffect(() => {
    if (localStorage.getItem("grouping")) {
      setGrouping(localStorage.getItem("grouping"));
    } else {
      localStorage.setItem("grouping", "status");
    }

    if (localStorage.getItem("ordering")) {
      setOrdering(localStorage.getItem("ordering"));
    } else {
      localStorage.setItem("ordering", "priority");
    }
  }, []);

  const handleGrouping = (event) => {
    localStorage.setItem("grouping", event.target.value);
    console.log("grouping", localStorage.getItem("grouping"));
    setGrouping(event.target.value);
    window.dispatchEvent(new Event("storage"));
    show(false);
  };
  const handleOrdering = (event) => {
    localStorage.setItem("ordering", event.target.value);
    console.log("ordering", localStorage.getItem("ordering"));
    setOrdering(event.target.value);
    window.dispatchEvent(new Event("storage"));
    show(false);
  };

  return (
    <div className="display">
      <div>
        <div className="select-heading">Grouping </div>
        <select
          value={grouping}
          style={{ textAlign: "center" }}
          onChange={handleGrouping}
        >
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="user">User</option>
        </select>
      </div>
      <div>
        <div className="select-heading"> Ordering </div>
        <select
          value={ordering}
          style={{ textAlign: "center" }}
          onChange={handleOrdering}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default DropdownMenu;
