import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMap from "./component/mainMap";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMap />} />
      </Routes>
    </BrowserRouter>
  );
}
