/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";

export default function CountryDetail() {
  const { countryName } = useParams();
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    const getSingleCountry = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCountry(data);
        console.log(data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    };

    getSingleCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <Link
        to="/"
        className="flex items-center ml-5 mt-10 bg-white w-24 py-2  px-5 shadow-xl font-Nunito"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </span>{" "}
        Back
      </Link>
      {country.map((country, index) => (
        <div
          key={index}
          className="mt-14 mx-10 font-Nunito lg:grid lg:grid-cols-2 lg:mx-52"
        >
          <div>
            <img
              src={country.flags.png}
              alt=""
              className="h-52 w-72 lg:h-[300px] lg:w-[500px] pr-4"
            />
          </div>
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="mt-10 space-y-2">
              <h1 className="font-[800] text-[20px]">{country.name.common}</h1>
              <h1 className="flex items-center text-sm mt-5">
                Official Name:{" "}
                <span className="font-[300] ml-1">
                  {" "}
                  {country.name.official}
                </span>
              </h1>
              <h1 className="flex items-center text-sm mr-2">
                Population:{" "}
                <span className="font-[300] ml-1">
                  {" "}
                  {country.population.toLocaleString()}
                </span>
              </h1>
              <h1 className="flex items-center text-sm mr-2">
                Region:{" "}
                <span className="font-[300] ml-1"> {country.region}</span>
              </h1>
              <h1 className="flex items-center text-sm mr-2">
                Sub Region:{" "}
                <span className="font-[300] ml-1"> {country.subregion}</span>
              </h1>
              <h1 className="flex items-center text-sm mr-2">
                Capital:{" "}
                <span className="font-[300] ml-1"> {country.capital}</span>
              </h1>
            </div>
            <div className="mt-7 space-y-2">
              <h1 className="flex items-center text-sm mr-2">
                Top Level Domain:{" "}
                <span className="font-[300] ml-1"> {country.tld}</span>
              </h1>
              <h1 className="flex items-center text-sm mr-2">
                Currencies:{" "}
                <span className="font-[300] ml-1">
                  {Object.entries(country.currencies).map(
                    ([currencyCode, currencyData]) => (
                      <span key={currencyCode}>{currencyData.name}</span>
                    )
                  )}
                </span>
              </h1>
              <h1 className="flex items-center text-sm mr-2">
                Languages:{" "}
                <span className="font-[300] ml-1">
                  {" "}
                  {Object.keys(country.languages).length > 0
                    ? Object.entries(country.languages)
                        // eslint-disable-next-line no-unused-vars
                        .map(([languageCode, languageData]) => languageData)
                        .join(", ")
                    : "N/A"}
                </span>
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
