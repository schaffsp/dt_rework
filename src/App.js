import './CSS/App.css';
import './CSS/FilterBar.css';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import About from './Pages/About';
import { Route, Routes } from "react-router-dom";

/**
 * Contains the main body of the application, including the NavBar, FilterBar, and nearby restaurant list.
 * @returns The entire application.
 */
function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
