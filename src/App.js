//json-server
//create json file out of src folder
// install json server globally 
// npm install -g json-server

// type the following command to start json server 
// json-server --watch filename.json --port portno.
// json-server --watch db.json --port 3333 
//files to delete App.css,App.test.js,index.css,logo.svg,reportWebVitals.js,setupTests.js

import React from "react";
// import {BrowserRouter,Routes,Route} from "react-router-dom"
import { BrowserRouter} from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./components/pages/Home";
import View from "./components/student/View";
import Edit from "./components/student/Edit";

function App() {
  return (
    <>
      {/* <h1>Gaurav Mishra</h1> */}
      <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
