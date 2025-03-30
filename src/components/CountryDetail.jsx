import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fields=name,flags,region,capital,population,subregion,languages,currencies`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [name]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-600">
        <p className="text-white text-2xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  if (!country)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-xl font-semibold">Country not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{country.name.common}</h1>
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-2/3 mb-4 rounded-lg shadow-md border border-gray-300"
        />
        <div className="text-lg text-gray-700 space-y-2 text-center">
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Region:</strong> {country.region} ({country.subregion})</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages).join(", ")}</p>
          <p>
            <strong>Currency:</strong> {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})
          </p>
        </div>
        <div className="mt-6 w-full flex flex-col items-center">
          <button
            onClick={handleLike}
            className="px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            👍 Like ({likes})
          </button>
          <form onSubmit={handleCommentSubmit} className="mt-4 w-full">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="mt-2 w-full px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
              💬 Comment
            </button>
          </form>
          <div className="mt-4 w-full text-left">
            {comments.length > 0 && <h3 className="text-lg font-semibold">Comments:</h3>}
            {comments.map((comment, index) => (
              <p key={index} className="bg-gray-100 p-2 mt-2 rounded-lg">{comment}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;