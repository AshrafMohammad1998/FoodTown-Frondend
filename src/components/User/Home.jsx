import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Home() {
  const [page, setPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const jwtToken = Cookies.get("jwtToken");

  console.log(restaurants, "restaurants data");

  const getRestaurants = async () => {
    try {
      const response = await axios.get(
        `${configVariables.ipAddress}/restaurants/getAllRestaurants?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (page === 1) {
        setRestaurants(response.data.data);
      } else {
        setRestaurants((prevData) => [...prevData, ...response.data.data]);
      }
    } catch (error) {
      console.log("User Menu :: Get Restaurants :: Error", error);
    }
  };

  // const getDishes = async () => {
    
  // }

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log("User Menu :: Handle Infinite Scroll :: Error", error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div className="px-10 pb-8 mb-12 sm:mb-0 ">
      <ToastContainer />
      <h1 className="text-center mb-4 text-xl font-bold underline tracking-wide">Restaurants </h1>
      <div className="mx-auto w-[90%] md:w-4/5 flex justify-center md:justify-start flex-wrap gap-4">
      
        {restaurants.map((restaurant) => (
          <Link to={`/restaurants/${restaurant._id}`}>
            <div key={restaurant._id} className="h-64 w-56 mb-2 cursor-pointer">
              <div className="h-44 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover border rounded-xl"
                  src={restaurant.logo.url}
                  alt="Restaurant Image"
                />
              </div>
              <div className="py-2">
                <h1 className="truncate text-lg font-semibold" onClick>
                  {restaurant.name}
                </h1>
                <h6 className="text-sm dark:text-slate-300">
                  30-45 <span className="text-xs">mins</span>
                </h6>
                <p className="text-sm line-clamp-2 dark:text-slate-300">
                  {restaurant.cuisines.join(", ")}{" "}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
