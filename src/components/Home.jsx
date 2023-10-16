import { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  const [dropDown, setdropDown] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");

  const handleDrop = () => {
    setdropDown(!dropDown);
  };

  const [countryData, setCountryData] = useState([]);

  const searchCountry = async (name) => {
    const url = `https://restcountries.com/v3.1/name/${name}
    `;
    const response = await fetch(url);
    const data = await response.json();
    setCountryData(data);
  };

  useEffect(() => {
    const apiUrl = "https://restcountries.com/v3.1/all";

    const fetchCountries = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status ${response.status}`);
        }
        const data = await response.json();
        setCountryData(data.slice(10, 18));
        console.log(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="bg-VeryLightGray font-Nunito">
      <Navbar />
      <div className="relative text-DarkGray lg:flex lg:items-center lg:justify-between lg:pb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute top-[60px] lg:top-[70px] left-14 z-10"
          onClick={() => searchCountry(searchTerm)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for a country..."
          className="px-20 py-5 mx-5 mt-10 relative rounded-md bg- lg:w-[520px]"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          onKeyDown={() => searchCountry(searchTerm)}
        />
        <button
          className="bg-white text-black py-5 flex items-center w-[200px] justify-between rounded-md ml-5 my-5 px-5 lg:mr-6 lg:mt-10"
          onClick={handleDrop}
        >
          Filter by Region{" "}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
        {dropDown && (
          <div className="bg-blue-100 absolute top-[195px] w-48 left-5 rounded-md z-10">
            <div className="px-5 py-3 space-y-2 text-black">
              <p>Africa</p>
              <p>Africa</p>
              <p>Asia</p>
              <p>Europe</p>
              <p>Oceania</p>
            </div>
          </div>
        )}
      </div>
      {countryData?.length > 0 ? (
        <section className="grid grid-cols-1 gap-y-11  mx-12 lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-24 lg:gap-y-20 pb-28">
          {countryData.map((country, index) => (
            <Link key={index} to={`/country/${country.name.common}`}>
              <Card country={country} />
            </Link>
          ))}
        </section>
      ) : (
        <div className="text-center text-2xl pb-8 capitalize font-[800]">
          No countries found
        </div>
      )}
    </div>
  );
}
