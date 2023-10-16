/* eslint-disable react/prop-types */
export default function Card({ country }) {
  return (
    <div className="cursor-pointer">
      <div>
        <img
          src={country.flags.png}
          alt=""
          className="rounded-t-md w-96 h-48"
        />
      </div>
      <div className="bg-white shadow-md rounded-b-md">
        <div className="mx-5 py-10">
          <h1 className="text-xl font-[800] mb-5">{country.name.common}</h1>
          <div className="space-y-2">
            <h1 className="font-[600]">
              Population:{" "}
              <span className="font-[300]">
                {country.population.toLocaleString()}
              </span>
            </h1>
            <h1 className="font-[600]">
              Region: <span className="font-[300]">{country.region}</span>
            </h1>
            <h1 className="font-[600]">
              Capital: <span className="font-[300]">{country.capital}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
