import React from "react";
import "./board.css";
import Card from "./card";
import Image from "./image.jpg";

function Board({ data }) {
  let group = localStorage.getItem("grouping");
  let icon = [];
  let heading;
  if (group === "status") {
    heading = ["To Do", "In Progress", "Backlog", "Done", "Cancelled"];
    icon = [
      <i style={{ color: "grey" }} class="fa-regular fa-circle"></i>,
      <i style={{ color: "yellow" }} class="fa-solid fa-clock"></i>,
      <i style={{ color: "red" }} class="fa-solid fa-clock"></i>,
      <i style={{ color: "green " }} class="fa-regular fa-circle-check"></i>,
      <i style={{ color: "grey" }} class="fa-solid fa-x"></i>,
    ];
  } else if (group === "priority") {
    heading = [
      "No Priority",
      "Urgent",
      "High Priority",
      "Medium Priority",
      "Low Priority",
    ];
    icon = [
      <i style={{ color: "grey" }} class="fa-regular fa-circle"></i>,
      <i style={{ color: "red" }} class="fa-solid fa-signal"></i>,
      <i style={{ color: "orange" }} class="fa-solid fa-signal"></i>,
      <i style={{ color: "yellow" }} class="fa-solid fa-signal"></i>,
      <i style={{ color: "blue" }} class="fa-solid fa-signal"></i>,
    ];
    if (data != null) {
      const reversedObject = Object.keys(data).reduce((acc, key, index) => {
        if (index >= 1 && index <= 4) {
          acc[5 - index] = data[key];
        } else {
          acc[key] = data[key];
        }
        return acc;
      }, {});
      console.log("rev", reversedObject);
      data = reversedObject;
    }
  } else if (group === "user") {
    if (data != null) {
      const temp = Object.keys(data);
      const totaldata = JSON.parse(localStorage.getItem("data"));
      const users = totaldata.users;
      heading = temp.map((userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.name : null;
      });
    }

    if (data != null) {
      const n = Object.keys(data).length;
      for (let i = 0; i < n; i++) {
        const imageElement = (
          <img
            key={i}
            src={Image}
            width={"30px"}
            height={"30px"}
            style={{ borderRadius: "50%" }}
          />
        );
        icon.push(imageElement);
      }
    }
  }

  return (
    <div className="column">
      {data &&
        Object.entries(data).map(([category, tickets], index) => (
          <div key={category} className="child-col">
            <div className="heading-col">
              <span style={{ width: "190px" }}>
                {icon[index]}&nbsp; &nbsp;<span> {heading[index]}</span> &nbsp;
                <span style={{ color: "grey" }}> {tickets.length}</span>{" "}
              </span>{" "}
              <i
                style={{ marginLeft: "50px", color: "grey" }}
                class="fa-solid fa-plus fa-lg"
              ></i>{" "}
              <i
                style={{ marginLeft: "23px" }}
                class="fa-solid fa-ellipsis fa-lg"
              ></i>
            </div>

            {tickets.map((ticket) => (
              <Card id={ticket.id} title={ticket.title} tag={ticket.tag[0]} />
            ))}
          </div>
        ))}
    </div>
  );
}

export default Board;
