import "./App.css";
import React, { useState } from "react";
import DataProcessing from "./components/Processdata";
import DropdownMenu from "./components/display";

function App() {
  const [show, setShow] = useState(false);

  function showfun() {
    setShow(!show);
  }

  return (
    <div>
      <div>
        <div className="button" onClick={showfun}>
          <i class="fa-solid fa-list"></i> Display
        </div>{" "}
      </div>
      {show && <DropdownMenu show={setShow} />}
      <DataProcessing />
    </div>
  );
}

export default App;
