import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 15;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌍 Explore Countries</h1>
      
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-lg w-full max-w-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {currentCountries.map((country, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="country-image"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{country.name.common}</h2>
              <p className="text-gray-600 text-sm">Capital: {country.capital?.[0] || "N/A"}</p>
              <p className="text-gray-600 text-sm">Region: {country.region}</p>
              <p className="text-gray-600 text-sm">Population: {country.population.toLocaleString()}</p>
              <Link
                to={`/country/${country.name.common}`}
                className="inline-block mt-3 text-blue-500 font-semibold hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          ← Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 border rounded-lg ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      <style>
        {`
          .country-image {
            width: 250px;
            height: 180px;
            object-fit: cover;
            display: block;
            margin: 0 auto;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;