"use client";
import Link from "next/link";
// import {Link } from 'react-scroll'
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


function Header() {
  const [nav, setNav] = useState(false);
  const [active, setActive] = useState("Home");
  const pathName = usePathname();

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: "Home", url:"/", section:"hero1"},
    { id: 2, text: "About", url: "/" ,section:'hero2'},
    { id: 3, text: "Harga", url: "/" ,section:'hero3'},
    { id: 4, text: "Contact", url: '/' , section:'hero4'},
    { id: 5, text: "Blog", url: '/blog' , section:'hero4'},
  ];

  return (
    <nav className="shadow-lg py-2 md:py-0  sticky top-0 bg-white z-10">

    <div className="max-w-screen-xl mx-auto flex items-center px-4 xl:px-0  justify-between ">
      {/* Logo */}
      <div className="inline-flex items-center">
        <img
          src="https://harmonylaundry.my.id/assets/img/logo.png"
          alt="logo Harmony"
          className="w-[48px]"
        />
        <span className="text-blue-900 font-bold md:text-2xl text-xl">Harmony Laundry</span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={
              pathName == "/"
                ? `p-4 hover:text-blue-500 cursor-pointer duration-300 text-blue-600 font-bold `
                : `p-4 hover:text-blue-600  cursor-pointer duration-300 text-blue-900 font-bold `
            }
          >
            <a href={item.url}>

            {item.text}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="block md:hidden" onClick={handleNav} >
            {nav ? <AiOutlineClose/> : <AiOutlineMenu/> }
      </div>

      {/* Mobile */}

      <ul
        className={
          nav
            ? 'fixed md:hidden right-0 top-0 w-[100%] h-full  bg-white text-blue-900 ease-in-out duration-500'
            : 'ease-in-out w-[100%] duration-500 fixed top-0 bottom-0 right-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <div className="flex px-4 md:px-0 items-center justify-between">

          <div className="inline-flex items-center">
            <img
              src="https://harmonylaundry.my.id/assets/img/logo.png"
              alt="logo Harmony"
              className="w-[48px]"
              />
            <span className="text-blue-900 font-bold md:text-2xl text-lg">Harmony Laundry</span>
          </div>
          <div className="block md:hidden" onClick={handleNav}>
              {nav ? <AiOutlineClose/> : <AiOutlineMenu/>}
          </div>
        </div>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b  hover:text-blue-500 duration-300  cursor-pointer text-blue-900 font-bold'
          >

            <a href={item.url}>

            {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </nav>

  );
}

export default Header;
