import "./App.css";
import Login from "./Components/Login/Login";

import TableComponent from "./Components/TableComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/data" element={<TableComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
