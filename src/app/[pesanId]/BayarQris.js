import React from "react";
import { FaDownload } from "react-icons/fa";

function BayarQris() {

   
  return (
    <div className="max-w-screen-lg mx-auto ">
      <div className="flex justify-start items-start">
        <div className="bg-white border shadow-xl rounded-xl overflow-hidden px-6 max-w-md min-w-[320px] mx-auto mt-8">
          <h1 className="font-bold text-lg my-4 text-center text-blue-600 flex justify-between">
            Pembayaran Qris
            <a
                href="/img/qris/qris-1.jpg" target="_blank"
            >
                <FaDownload className="text-xl"/>
            </a>
          </h1>
          <p className="text-gray-500">
            Untuk Pembayaran Teman-teman bisa melalui cash atau pun non tunai QRIS
          </p>
          <hr className="my-4"/>
          <img src="/img/qris/qris-1.jpg" alt="Qris"className="w-full my-3" />
        </div>
      </div>
    </div>
  );
}

export default BayarQris;
