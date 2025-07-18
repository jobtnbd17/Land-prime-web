import React from "react";
import { useNavigate } from "react-router";  // ไม่แก้ไขตามที่ขอ
import BG from '../assets/BG.jpg'

function HomePage() {

  const navigate = useNavigate()

  const goToMarket = () => {
    navigate('/market')
  }

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
       backgroundImage : `url(${BG})`
      }}
    >
      <div className="bg-white bg-opacity-90 p-12 rounded-xl shadow-xl text-center max-w-md">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 tracking-wide">
          Land-Prime
        </h1>
        <p className="text-xl mb-10 text-gray-700 leading-relaxed">
          ค้นหาบ้านในฝันของคุณได้อย่างง่ายดาย พร้อมข้อเสนอที่ดีที่สุดในทุกทำเล
        </p>
        <button
          onClick={goToMarket}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800
                     text-white text-lg px-8 py-4 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
        >
          เริ่มซื้อขายบ้านเลย
        </button>
      </div>
    </div>
  );
}

export default HomePage;
