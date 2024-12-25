"use client";

import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  return (
    <div className="p-5 bg-black text-white">
      <div id="main" className="flex justify-between items-center p-50">
        <div
          id="logo"
          onClick={() => router.push("/")}
          className="font-Nue flex items-center cursor-pointer"
        >
          <h1 className="ml-2 text-3xl">PocketSwap</h1>
        </div>

        <div
          id="navlinks"
          className="flex justify-center text-white gap-20 items-center font-Nue font-weight: 600"
        >
          <h4
            onClick={() => router.push("/")}
            className="relative cursor-pointer group transition-all"
          >
            Home
            <span className="absolute bottom-0 left-0 block h-0.5 w-0 bg-white transition-all group-hover:w-full"></span>
          </h4>

          <h4
            onClick={() => router.push("/about")}
            className="relative cursor-pointer group transition-all"
          >
            About
            <span className="absolute bottom-0 left-0 block h-0.5 w-0 bg-white transition-all group-hover:w-full"></span>
          </h4>

          <h4
            onClick={() => router.push("/login")}
            className="relative cursor-pointer group transition-all"
          >
            Login
            <span className="absolute bottom-0 left-0 block h-0.5 w-0 bg-white transition-all group-hover:w-full"></span>
          </h4>
        </div>

        <div id="dot" className="h-10 w-10 bg-black rounded-full overflow-hidden flex justify-center items-center">
          <img
            className="border-black"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIOVOH4NHf85lJfAD7WCeOrqx3gvTLWl5eVQ&s"
            alt="User Avatar"
          />
        </div>
      </div>
    </div>
  );
};
