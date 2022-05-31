import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Counter from "./exercises/01-counter/Counter";
import TempConverter from "./exercises/02-temp-converter/TempConverter";
import FlightBooker from "./exercises/03-flight-booker/FlightBooker";
import Timer from "./exercises/04-timer/Timer";

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
            <li>
              <Link to="/03-flight-booker">Flight Booker</Link>
            </li>
            <li>
              <Link to="/04-timer">Timer</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/01-counter" element={<Counter />} />
          <Route path="/02-temp-converter" element={<TempConverter />} />
          <Route path="/03-flight-booker" element={<FlightBooker />} />
          <Route path="/04-timer" element={<Timer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
