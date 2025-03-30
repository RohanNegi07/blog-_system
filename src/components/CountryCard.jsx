import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 border border-gray-200 hover:border-blue-400">
      {/* Country Flag */}
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Country Info */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">{country.name.common}</h2>
        <p className="text-gray-600 text-sm">Capital: <span className="font-medium">{country.capital?.[0] || "N/A"}</span></p>
        <p className="text-gray-600 text-sm">Region: <span className="font-medium">{country.region}</span></p>
        <p className="text-gray-600 text-sm">Population: <span className="font-medium">{country.population.toLocaleString()}</span></p>
      </div>

      {/* View Details Button */}
      <Link
        to={`/country/${country.name.common}`}
        className="block mt-4 text-center bg-blue-500 text-white py-2 rounded-lg font-semibold transition-all hover:bg-blue-600"
      >
        View Details →
      </Link>
    </div>
  );
};

export default CountryCard;