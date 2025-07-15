import React from "react";
import { useNavigate } from "react-router";
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
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          ยินดีต้อนรับสู่เว็บไซต์ของเรา
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          ค้นหาและซื้อขายบ้านในทำเลที่คุณต้องการ
        </p>
        <button
          onClick={goToMarket}
          className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          ไปยังหน้าซื้อขายบ้าน
        </button>
      </div>
    </div>
  );
}

export default HomePage;
