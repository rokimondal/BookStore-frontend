import { Link } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import avatarImg from "../assets/avatar.png"
import { useState } from "react";
import { useSelector } from "react-redux"
import { useAuth } from "../context/AuthContex";
const Navbar = () => {
  const cardItem = useSelector(state => state.cart.cartItems.length)
  const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
  ]

  const [isDropdownOpen, setDropdown] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const handleLogOut = () => {
    setDropdown(false);
    logout();
  }

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-4 bg-white">
      <nav className="flex justify-between items-center">
        {/* for left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiBars3CenterLeft className="size-6" />
          </Link>
          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoIosSearch className="absolute inline-block left-3 inset-y-2" />
            <input type="text" placeholder="Search here" className=" bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none" />
          </div>
        </div>
        {/* for right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2 gap-2 ">
          <div>
            <>{
              currentUser ? <button onClick={() => setDropdown(!isDropdownOpen)}>
                <img src={userData?.photo ? userData?.photo : avatarImg} alt="avatar" className="size-7 rounded-full ring-2 ring-blue-400 " />
              </button>
                : <Link to="/login"><FaRegUser className="size-6" /></Link>
            }
              {/* show dropdown*/}
              {isDropdownOpen && (
                <div className=" absolute right-0 mt-2 w-48 bg-white p-2 shadow-lg rounded-md z-40">
                  <ul>
                    {navigation.map((item) => (
                      <li key={item.name} onClick={() => { setDropdown(false) }}><Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md">{item.name}</Link></li>
                    ))}
                    <li onClick={handleLogOut} className="block px-4 py-2 text-sm text-red-300 hover:text-red-600 rounded-md">Log Out</li>
                  </ul>
                </div>
              )}</>

          </div>
          <button className=" hidden sm:block">
            <FiHeart className="size-6" />
          </button>
          <Link to="/cart" className="bg-primary p-1 sm:px-6 flex items-center rounded-md">
            <IoCartOutline className="size-6" />
            <span className="text-sm font-semibold sm:ml-1">{cardItem > 0 ? cardItem : 0}</span>
          </Link>
        </div>
      </nav>
    </header >
  );
};
export default Navbar;
