import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} /> 
          {/* add links here */}
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
