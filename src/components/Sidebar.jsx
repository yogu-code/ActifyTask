"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // icons

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Table", path: "/" },
    { name: "Form", path: "/form" },
  ];

  return (
    <>
      {/* Hamburger button (mobile only) */}
      {!isOpen && (<button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-sky-500 text-white rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>)}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-100 shadow-md flex flex-col z-40 w-56 p-4 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:w-52`}
      >
        {/* Close button (mobile only) */}
        <div className="flex items-center justify-between sm:hidden mb-6">
          <h2 className="text-lg font-bold text-black">Dashboard</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            <X size={22} />
          </button>
        </div>

        {/* Desktop title */}
        <h2 className="text-xl text-black font-bold text-center mb-6 hidden sm:block">
          Dashboard
        </h2>

        {/* Links below the cross */}
        <div className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`p-2 rounded-md text-center ${
                pathname === link.path
                  ? "bg-sky-500 text-white"
                  : "hover:bg-sky-200 text-gray-700"
              }`}
              onClick={() => setIsOpen(false)} // close menu on mobile after click
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 sm:hidden z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
