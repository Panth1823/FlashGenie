import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-2xl">
        <div className="flex flex-wrap items-center mx-auto p-4">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AI Flashcard
            </span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
