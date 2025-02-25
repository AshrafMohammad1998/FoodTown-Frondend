import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDish from "./EditDish";
import ChangeHistoryTwoToneIcon from "@mui/icons-material/ChangeHistoryTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MenuItemSkeleton from "../skeletons/MenuItemSkeleton";

function Menu() {
  const jwtToken = Cookies.get("jwtToken");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  console.log(dishes, "fetched dishes");

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
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      if(response.status === 200){
        setDishes(response.data.data);
        setIsLoading(false)
      }
    } catch (error) {
      console.log("Partner Menu :: Fetch dishes :: Error", error);
    }
  };

  const handleDishDelete = async (dishId, imageId) => {
    try {
      await axios.delete(
        `${configVariables.ipAddress}/dishes/deleteDish/${dishId}?imageId=${imageId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      fetchDishes();
      toast.success("Dish deleted successfully");
    } catch (error) {
      console.log("Partner-menu :: Menu :: Delete Dish :: Error:", error);
      toast.error("Failed to delete dish");
    }

    console.log(response);
  };

  const editDish = async (dish) => {
    setSelectedDish(dish);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDish(null);
  };

  useEffect(() => {
    if (restaurantData) fetchDishes();
  }, [restaurantData]);

  return (
    <div className="px-5 sm:px-10 pb-8 mb-12 sm:mb-0 flex justify-center min-w-fit">
      <ToastContainer />
      <div className="w-full md:w-4/5 flex flex-wrap gap-4">
        {isLoading
          ? new Array(6)
              .fill("")
              .map((each, index) => <MenuItemSkeleton key={index} />)
          : dishes.map((dish, index) => {
              return (
                <div
                  key={index}
                  className="flex  rounded-xl shadow-xl p-2 border border-slate-500 w-full md:w-[calc(50%-1rem)]"
                >
                  <div className="w-2/5 sm:w-1/4">
                    <img
                      src={dish.dishImage.url}
                      alt="Dish Img"
                      className="h-24 w-full border border-l-slate-400 rounded-l-xl"
                    />
                  </div>

                  <div className="ml-3 relative w-3/5 sm:w-3/4 ">
                    <h1 className="text-black dark:text-white text-md sm:text-lg font-bold ">
                      {dish.dishName}
                    </h1>
                    <div className="flex my-1">
                      <p className="text-slate-600 dark:text-slate-300 text-md">
                        {dish.amount}/-
                      </p>
                      {dish.typeOfDish === "Veg" ? (
                        <span className="ml-2 border-2 border-green-700  text-center rounded-md p-[1px] flex justify-center items-center w-6 h-6">
                          <FiberManualRecordIcon
                            fontSize="small"
                            sx={{ color: "green" }}
                          />
                        </span>
                      ) : (
                        <span className="ml-2 border-2 border-red-500  text-center rounded-md p-[1px] flex justify-center items-center w-6 h-6">
                          <ChangeHistoryTwoToneIcon
                            fontSize="small"
                            sx={{ color: "#ef4444" }}
                          />
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 sm:text-sm w-2/3 md:w-3/4 line-clamp-2 hidden sm:block">
                      {dish.description}
                    </p>
                    <div className="absolute bottom-1 right-1">
                      <button onClick={() => editDish(dish)}>
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() =>
                          handleDishDelete(dish._id, dish.dishImage.publicID)
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      {selectedDish && (
        <EditDish
          open={isEditModalOpen}
          handleClose={handleCloseEditModal}
          dish={selectedDish}
          fetchDishes={fetchDishes}
        />
      )}
    </div>
  );
}

export default Menu;
