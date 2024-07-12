import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function Menu() {
  const jwtToken = Cookies.get("jwtToken");

  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const restaurantId = restaurantData?._id;

  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        `${configVariables.ipAddress}/dishes/getDishes/${restaurantId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response, "fetched dishes");
    } catch (error) {
      console.log("Partner Menu :: Fetch dishes :: Error", error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, [restaurantData]);
  return (
    <div className="px-5 sm:px-10 pb-8 mb-12 sm:mb-0 flex justify-center min-w-fit">
      <ToastContainer />
      <div className="border border-slate-500 rounded-2xl shadow-xl p-5 w-[90%] md:w-3/4 flex flex-wrap justify-between">
        <div className="flex rounded-xl shadow-xl p-2 border border-slate-500 w-full sm:w-1/2 md:w-1/3">
          <div>
            <img
              src={"image1.jpeg"}
              className="h-32 w-28 border border-l-slate-400 rounded-l-xl"
            />
          </div>
          <div className="ml-3 relative flex-grow">
            <h1 className="text-black dark:text-white text-lg font-bold ">Ashraf</h1>
            <p className="text-slate-600 dark:text-white text-sm">50/-</p>
          <div className="absolute bottom-1 right-1">
            <button>ABC</button>
            <button>ABC</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
