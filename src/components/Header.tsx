"use client";
import Image from "next/image";
import Link from "next/link";
import LogOut from "../../public/svg/logout";
import Navbar from "./Nav";
import { useEffect, useState } from "react";
const Header = () => {
  const [link, setLink] = useState<string>("");
  useEffect(() => {
    setLink(window.location.href);
  }, []);
  return (
    <>
      <header className="bg-[#00adee] text-white font-bold  shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center  cursor-pointer">
              <Image
                src="/logo.png"
                alt="TBC Bank"
                width={65}
                height={65}
                className="z-50 bc-white"
              />
              <span className="text-xl font-bolder hidden md:block ">
                თიბისი <span className="!font-light">ბანკი</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4 ">
            <span className="hidden md:block text-base font-bold">
              {link.includes("payments")
                ? "დავით დავიტაშვილი"
                : "გიორგი გიორგაძე"}
            </span>

            <Image
              src={
                link.includes("payments")
                  ? "https://cdn-icons-png.flaticon.com/512/219/219986.png"
                  : `https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png`
              }
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full border border-white hover:scale-125 ease-in-out duration-500 cursor-pointer "
            />

            <button className="relative  group text-sm px-3 py-1 rounded-md hover:scale-125 transition-transform duration-700 z-50">
              <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-300 bg-white text-black border text-xs px-2 py-1 rounded-md ">
                გამოსვლა
              </span>
              <LogOut />
            </button>
          </div>
        </div>
        <Navbar />
      </header>
    </>
  );
};

export default Header;
