// components/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Table", path: "/" },
    { name: "Form", path: "/form" },
  ];

  return (
    <div className="h-screen w-16 sm:w-52 bg-gray-100 p-2 sm:p-4 shadow-md fixed left-0 top-0 flex flex-col z-50">
      <h2 className="text-sm sm:text-xl font-bold text-center mb-6 hidden sm:block">
        Dashboard
      </h2>

      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`p-2 rounded-md mb-2 text-center text-xs sm:text-base ${
            pathname === link.path
              ? "bg-sky-500 text-white"
              : "hover:bg-sky-200 text-gray-700"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
