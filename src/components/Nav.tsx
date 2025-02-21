"use client";
import Link from "next/link";
import Messages from "../../public/svg/Messages";
import Messages2 from "../../public/svg/Messages2";
import Setting from "../../public/svg/Setting";
import { useState } from "react";
import Home from "../../public/svg/Home";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#333333] bg-opacity-95 border-transparent relative flex items-center justify-between ">
      <div className="container mx-auto">
        <div className="flex justify-between p-2 w-full" id="navbar">
          <ul className="navbar-nav flex ml-3 space-x-4 w-full">
            <li className="nav-item">
              <Link
                href="#"
                className="text-white flex items-center gap-3 hover:text-[#00a3e0] "
              >
                <Home />
                მთავარი
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="text-white hover:text-[#00a3e0]">
                ჩემი პროდუქტები
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="text-white hover:text-[#00a3e0]">
                გადარიცხვები
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="text-white hover:text-[#00a3e0]">
                ტრანზაქციები
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="text-white hover:text-[#00a3e0]">
                ჩემი ფინანსები
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="text-white hover:text-[#00a3e0]">
                პროდუქტების აქტივაცია
              </Link>
            </li>
          </ul>
          <div className=" flex justify-center items-center space-x-4">
            <div className="tbc-nav-item rounded-full cursor-pointer w-8 h-8 flex justify-center items-center">
              <span className="text-white">
                <Messages2 />
              </span>
            </div>
            <div className="tbc-nav-item bg-[#3333] cursor-pointer rounded-full w-8 h-8 flex justify-center items-center">
              <span>
                <Messages />
              </span>
            </div>
            <div className="tbc-nav-item bg-[#3333]  cursor-pointer rounded-full w-8 h-8 flex justify-center items-center">
              <span className="text-white">
                <Setting />
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
