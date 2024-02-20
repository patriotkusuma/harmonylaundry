'use client'
import React from "react";
import { RiMapPinLine, RiMailLine, RiClockwiseLine } from "react-icons/ri";
import { FiClock, FiPhone } from "react-icons/fi";
import { Element } from "react-scroll";

function Contact() {
  return (
    <Element name="hero4" className="max-w-screen-xl mx-auto py-10 mb-5 flex flex-col gap-y-12 px-4 my-20 lg:my-24 xl:px-0">
      <div className="flex flex-col items-center">
        <h3 className="text-blue-600 uppercase font-bold">Kontak</h3>
        <h4 className="text-blue-900 font-bold md:text-4xl text-2xl">
          Hubungi Kami
        </h4>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
        <div className="grid md:grid-cols-2  gap-4">
          <div className="p-8 bg-blue-100 hover:shadow-2xl cursor-pointer duration-500 ease-in-out shadow-lg rounded-xl flex flex-col gap-y-4">
            <RiMapPinLine className="text-blue-600 text-[48px]" />
            <h3 className="text-blue-900 font-bold text-[24px]">Alamat</h3>
            <a
              href="https://maps.app.goo.gl/x15aaXr2xAsF2PBd7"
              target="_blank"
              className="text-blue-600"
            >
              Jln. Candi Gebang, Karangasem, Condongcatur, Depok, Sleman, DI
              Yogyakarta
            </a>
          </div>
          <div className="p-8 bg-blue-100 shadow-lg hover:shadow-2xl duration-500 ease-in-out cursor-pointer rounded-xl flex flex-col gap-y-4">
            <FiPhone className="text-blue-600 text-[48px]" />
            <h3 className="text-blue-900 font-bold text-[24px]">Alamat</h3>
            <a
              href="http://wa.me/62895363324517"
              target="_blank"
              className="text-blue-600"
            >
              0895363324517
            </a>
          </div>
          <div className="p-8 bg-blue-100 shadow-lg hover:shadow-2xl duration-500 ease-in-out cursor-pointer rounded-xl flex flex-col gap-y-4">
            <RiMailLine className="text-blue-600 text-[48px]" />
            <h3 className="text-blue-900 font-bold text-[24px]">Email</h3>
            <a
              href="mailto://harmonylaundry6@gmail.com"
              target="_blank"
              className="text-blue-600"
            >
              harmonylaundry6@gmail.com
            </a>
          </div>
          <div className="p-8 bg-blue-100 shadow-lg hover:shadow-2xl duration-500 ease-in-out cursor-pointer rounded-xl flex flex-col gap-y-4">
            <FiClock className="text-blue-600 text-[48px]" />
            <h3 className="text-blue-900 font-bold text-[24px]">
              Jam Operasional
            </h3>
            <div className="text-blue-900 flex flex-col font-semibold">
              <span>Senin - Minggu</span>
              <span>08.00 - 21.00 WIB</span>
            </div>
          </div>
        </div>
        <div className="rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden" >
          <iframe className="w-[100%] md:h-[100%] h-[250px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d126507.89856892895!2d110.411664!3d-7.750327999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a593473ddfbd3%3A0xec409976b4b678b5!2sHARMONY%20LAUNDRY%20YOGYAKARTA!5e0!3m2!1sid!2sid!4v1708430094277!5m2!1sid!2sid" ></iframe>
        </div>
      </div>
    </Element>
  );
}

export default Contact;
