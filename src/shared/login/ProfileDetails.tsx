import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/zustand/store";
import { CircleUser, Heart, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const ProfileDetails = ({ isAdmin }: { isAdmin?: boolean }) => {
  const userData = useProductStore((state) => state.userData);
  const clearUserData = useProductStore((state) => state.clearUserData);
  const clearBagData = useProductStore((state) => state.clearBagData);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData();
    clearBagData();
    localStorage.removeItem("isLogin");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div
      className={cn(
        `w-full pt-20 px-4 flex flex-col ${isAdmin ? "h-full" : "h-screen"}`
      )}
    >
      <CircleUser
        color="black"
        size={80}
        className="hidden md:flex items-center justify-center text-center w-full"
      />
      <CircleUser
        color="black"
        size={60}
        className="md:hidden flex items-center justify-center text-center w-full"
      />

      {/* User details card */}
      <Card className="p-0 pt-8 gap-5 md:text-[18px] shadow-none border-none outline-none text-start flex-grow">
        <CardTitle>
          <span className="font-normal text-black">ID:</span> {userData?.id}
        </CardTitle>
        <CardTitle>
          <span className="font-normal text-black">Name:</span> {userData?.name}
        </CardTitle>
        <CardTitle>
          <span className="font-normal text-black">Email:</span>{" "}
          {userData?.email}
        </CardTitle>
        <CardTitle>
          <span className="font-normal text-black">Account Type:</span>{" "}
          {!isAdmin && "Basic"} {userData?.role}
        </CardTitle>
      </Card>

      {!isAdmin && (
        <div className="gap-4 flex flex-col pb-4">
          <NavLink to={"/favourite"} className="flex gap-2 font-medium">
            <Heart /> Favourites
          </NavLink>

          <NavLink to={"/cart"} className="flex gap-2 font-medium">
            <ShoppingCart /> Bag
          </NavLink>
        </div>
      )}
      {/* Logout button */}
      <button
        onClick={() => handleLogout()}
        className="bg-red-600 mb-4 mt-auto w-full hover:bg-red-700 text-lg cursor-pointer card-nav-cta-button md:inline-flex border-0 rounded-lg px-4 py-2  font-medium transition-colors duration-300 text-white text-center items-center justify-center"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDetails;
