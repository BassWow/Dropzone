import React from "react";
import ReactDOM from "react-dom";
import "materialize-css"; // It installs the JS asset only
//import "materialize-css/dist/css/materialize.min.css";

import "./styles.scss";

import Dropzone from "./Dropzone";

function App() {
  return (
    <div className="App">
      <Dropzone />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
