import { Card, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/zustand/store";
import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileDetails = () => {
  const userData = useProductStore((state) => state.userData);
  const navigate = useNavigate();
  // handleLogout
  const handleLogout = (userType: string | undefined) => {
    console.log("logout pressed");
    if (userType?.toUpperCase() === "USER") {
      localStorage.removeItem("isLogin");
    } else {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("isAdmin");
    }
    toast.success("Logged out.");
    navigate("/");
  };
  return (
    <div className="pt-4 w-full">
      <CircleUser
        color="red"
        size={100}
        className="lg:flex hidden items-center justify-center text-center w-full"
      />
      <CircleUser
        color="red"
        size={80}
        className="hidden md:flex items-center justify-center text-center w-full"
      />
      <CircleUser
        color="red"
        size={60}
        className="md:hidden flex items-center justify-center text-center w-full"
      />
      <Card className="p-0 pt-8 text-red-500 gap-5 md:text-[18px] shadow-none border-none outline-none text-start">
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
          <span className="font-normal text-black">Account Type:</span> Basic{" "}
          {userData?.role}
        </CardTitle>

        <button
          onClick={() => handleLogout(userData?.role)}
          className="bg-red-600 hover:bg-red-700 text-lg active:scale-95 cursor-pointer w-full mt-8 card-nav-cta-button md:inline-flex border-0 rounded-lg px-4 py-2 h-full font-medium transition-colors duration-300 text-white text-center items-center justify-center"
        >
          Logout
        </button>
      </Card>
    </div>
  );
};

export default ProfileDetails;
