"use client";
import Link from "next/link";
// import {Link } from 'react-scroll'
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


function Header() {
  const [nav, setNav] = useState(false);
  const [active, setActive] = useState("Home");
  const path = usePathname();
  const pathName = path.split("/").filter((path) => path);
  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback(event => {
    setScrollY(window.scrollY)
  })

  useEffect(()=>{
    window.addEventListener('scroll', onScroll, {passive:true})

    return ()=>{window.removeEventListener('scroll', onscroll, {passive:true})}
  })

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: "Home", url:"/", section:"hero1", target:"_self"},
    // { id: 2, text: "About", url: "/" ,section:'hero2'},
    // { id: 3, text: "Harga", url: "/" ,section:'hero3'},
    { id: 3, text: "Pesan", url: "/pesan" ,section:'hero3'},
    { id: 5, text: "Blog", url: '/blog' , section:'hero4', target:"_self"},
    { id: 4, text: "Contact", url: 'https://wa.me/62895363324517' , section:'hero4', target:"_blank"},
  ];

  return (
    <nav className={
      scrollY > 0 
      ? " py-2 md:py-0  fixed w-full top-0 z-10 shadow-xl bg-white/80 backdrop-blur-xl duration-500 ease-in-out"
      : " py-2 md:py-0  fixed w-full top-0 bg-transparent z-10 duration-500 ease-in-out"
      }>

    <div className="max-w-screen-xl mx-auto flex items-center px-4 xl:px-0  justify-between ">
      {/* Logo */}
      <div className="inline-flex items-center">
        <img
          src="/img/logo-harmony.png"
          alt="logo Harmony"
          className="w-[48px]"
        />
        <span className="text-blue-900 font-bold md:text-2xl text-xl">Harmony Laundry</span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item, index) => {
          let href = pathName.length > 0 ? `/${pathName[0]}` : '/';
          
          return (
          <a href={item.url} target={item.target}>
          <li
            key={item.id}
            className={
              href === item.url
                ? `p-4 hover:text-blue-500 cursor-pointer duration-500 text-blue-600 font-bold border-b-2 border-blue-600 `
                : `p-4 hover:text-blue-600  cursor-pointer duration-500 text-blue-900 font-bold hover:border-blue-600 hover:border-b-2 `
            }
          >

            {item.text}
          </li>
            </a>
        )})}
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
          <a href={item.url} target={item.target}>
          <li
            key={item.id}
            className={
              
              pathName[0] === item.url 
              ? 'p-4   border-b  hover:text-blue-500 duration-300  cursor-pointer text-white font-bold bg-blue-600'
              : 'p-4 border-b  hover:text-blue-500 duration-300  cursor-pointer text-blue-900 font-bold'
            }
          >


            {item.text}
          </li>
            </a>
        ))}
      </ul>
    </div>
    </nav>

  );
}

export default Header;
