import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CountryDetail from "./pages/CountryDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:countryName" element={<CountryDetail />} />
    </Routes>
  );
}
