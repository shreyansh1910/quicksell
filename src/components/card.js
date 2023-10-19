import React from "react";
import "./card.css";
import Image from "./image.jpg";
function Card({ id, title, tag }) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <div className="card-id ">{id} </div>
        <div>
          <img
            src={Image}
            width={"30px"}
            height={"30px"}
            style={{
              borderRadius: "50%",
              marginRight: "10px",
              marginTop: "10px",
            }}
          />{" "}
        </div>{" "}
      </div>
      <div className="card-title">{title}</div>
      <div className="card-tag">
        <div className="exclamation">
          <i class="fa-solid fa-exclamation "></i>
        </div>
        <div className="feature">
          <div className="circle"></div>
          <div className="tag-text">{tag}</div>
        </div>
      </div>
    </div>
  );
}
export default Card;
