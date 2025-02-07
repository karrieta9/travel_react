import './App.css'
import  Main from "./components/Main";
import  Country from "./components/Country";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/country/:id_param" element={<Country />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
