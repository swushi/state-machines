import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Counter from "./exercises/01-counter/Counter";
import TempConverter from "./exercises/02-temp-converter/TempConverter";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/01-counter">Counter</Link>
            </li>
            <li>
              <Link to="/02-temp-converter">Temp Converter</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/01-counter" element={<Counter />} />
          <Route path="/02-temp-converter" element={<TempConverter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
