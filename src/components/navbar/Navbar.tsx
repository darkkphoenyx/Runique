import { Heart, Menu, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SecondaryButton from "../buttons/SecondaryButton";
import { useProductStore } from "@/zustand/store";
import { fetchCartData } from "@/utils/FetchCartItem";

const navItem = [
  {
    id: 1,
    link: "/about",
    name: "About",
  },
  {
    id: 2,
    link: "/shop",
    name: "Shop",
  },
  {
    id: 3,
    link: "/contact",
    name: "Contact",
  },
];

const Navbar = () => {
  const location = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const userData = useProductStore((state) => state.userData);
  const bagData = useProductStore((state) => state.bagData);
  const setBagData = useProductStore((state) => state.setBagData);

  const userId = userData?.id || ""; //typesafety for userId

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        const cartData = await fetchCartData(userId);
        setBagData(cartData);
      }
    };

    loadCart();
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isProduct = location.pathname.includes("p/");
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hideNavbar ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="bg-[#fafafb] lg:px-4 px-2 py-2 flex items-center justify-between">
        <div>
          <NavLink to="/">
            <img
              className="h-10"
              src="/assets/Logo/RuniqueLogo.png"
              alt="logo"
            />
          </NavLink>
        </div>

        {/* nav list -- only for Desktop */}
        <div className="hidden lg:block">
          <ul className="flex gap-4 items-center font-medium">
            {navItem.map((item) => (
              <NavLink
                key={item.id}
                to={item.link}
                className={({ isActive }) =>
                  `relative inline-block px-1 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:transform after:scale-x-0 after:origin-left  after:transition-transform after:duration-300 ${
                    isActive || (isProduct && item.name === "Shop")
                      ? "after:scale-x-100"
                      : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* likes and search boxes */}
        <div className="gap-4 items-center hidden lg:flex">
          {/* profile */}
          <NavLink to={"/profile"}>
            <User />
          </NavLink>

          {/* favourites */}
          <NavLink to={"/favourite"}>
            <Heart />
          </NavLink>

          {/* add to bag */}
          <NavLink to={"/cart"} className="relative">
            <ShoppingCart />

            {/* cart item number */}
            {bagData.length > 0 && (
              <span className="absolute rounded-full h-4 w-4 flex items-center justify-center text-xs text-white -top-1 -right-1 bg-red-600">
                {bagData.length}
              </span>
            )}
          </NavLink>
        </div>

        {/* hamburger menu icon -- only for Mobile */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <div className="flex gap-4 items-center lg:hidden">
              <div className="gap-4 items-center flex">
                <NavLink to={"/profile"}>
                  <User />
                </NavLink>

                <NavLink to={"/cart"} className="relative">
                  <ShoppingCart />

                  {/* cart item number */}
                  {bagData.length > 0 && (
                    <span className="absolute rounded-full h-4 w-4 flex items-center justify-center text-xs text-white -top-1 -right-1 bg-red-600">
                      {bagData.length}
                    </span>
                  )}
                </NavLink>
              </div>
              <Menu />
            </div>
          </SheetTrigger>

          <SheetContent className="w-full px-4 flex justify-between">
            <SheetClose className="absolute right-0 top-0 p-2 hover:bg-muted rounded-md">
              <X className="h-8 w-8 text-black" />
            </SheetClose>

            <SheetTitle className="hidden">Menu</SheetTitle>

            <ul className="mt-16 text-3xl font-medium text-black flex flex-col gap-6">
              {navItem.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `relative inline-block pr-1 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:transform after:scale-x-0 after:origin-left  after:transition-transform after:duration-300 ${
                        isActive || (isProduct && item.name === "Shop")
                          ? "after:scale-x-100"
                          : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div>
              <p>
                Become a Runique Member for the best products, inspiration and
                stories in sport.
              </p>

              <div>
                <Link to={"/login"}>
                  <SecondaryButton
                    title="Sign in"
                    className="bg-white text-black border-gray-400 rounded-full border hover:text-white"
                  />
                </Link>
              </div>
            </div>

            <div className="gap-4 flex flex-col pb-4">
              <NavLink to={"/favourite"} className="flex gap-2 font-medium">
                <Heart /> Favourites
              </NavLink>

              <NavLink to={"/cart"} className="flex gap-2 font-medium ">
                <div className="relative">
                  <ShoppingCart />
                  {/* cart item number */}
                  {bagData.length > 0 && (
                    <span className="absolute rounded-full h-4 w-4 flex items-center justify-center text-xs text-white -top-1 -right-1 bg-red-600">
                      {bagData.length}
                    </span>
                  )}
                </div>
                Bag
              </NavLink>
            </div>

            <SheetDescription className="hidden" />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Navbar;
