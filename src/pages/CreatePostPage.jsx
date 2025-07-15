import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createPost } from "../api/authApi";

// ตั้งไอคอน Marker เพื่อแก้ปัญหา icon หายของ Leaflet
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationMarker({ position, setPosition }) {
  // ให้คลิกแผนที่เพื่อเลือกตำแหน่ง
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}></Marker>
  );
}

function CreatePostPage() {
  const [postType, setPostType] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [position, setPosition] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // คุณสามารถทำอะไรกับข้อมูลได้ เช่น ส่ง API
    const formData2 = {
      postType,
      title,
      detail,
      area,
      location,
      price,
      image,
      lat: position?.lat,
      lng: position?.lng,
    };
    const formData = new FormData()
    formData.append("landtype", postType);
    formData.append("area", area);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("lat", position?.lat);
    formData.append("lng", position?.lng);
    

     Array.from(image).map((img) =>  formData.append("image", img))

    try {
      const result = await createPost(formData)
      console.log("result" ,result)
    } catch (error) {
      console.log(error)
    }
    console.log("ส่งข้อมูล:")
    alert("โพสต์เรียบร้อย!");
  };
console.log(image)
  return (
    <div className="min-h-screen bg-[#F3E5AB] flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-[#5D4037] mb-6">
          ลงประกาศที่ดิน
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* ประเภท */}
          <div>
            <label className="block mb-1 text-sm font-medium">ประเภท</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              required
            >
              <option value="">เลือกประเภท</option>
              <option value="HOME">HOME</option>
              <option value="LAND">LAND</option>
            </select>
          </div>

          {/* ชื่อประกาศ */}
          <div>
            <label className="block mb-1 text-sm font-medium">ชื่อประกาศ</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="กรอกชื่อประกาศ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* รายละเอียด */}
          <div>
            <label className="block mb-1 text-sm font-medium">รายละเอียด</label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border rounded"
              placeholder="กรอกรายละเอียด"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            ></textarea>
          </div>

          {/* พื้นที่ (Area) */}
          <div>
            <label className="block mb-1 text-sm font-medium">พื้นที่ (ตร.วา / ตร.ม.)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="ระบุพื้นที่"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          {/* ที่ตั้ง (Location) */}
          <div>
            <label className="block mb-1 text-sm font-medium">ที่ตั้ง</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="ระบุที่ตั้ง"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* ราคา */}
          <div>
            <label className="block mb-1 text-sm font-medium">ราคา (บาท)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              placeholder="ระบุราคา"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* รูปภาพ */}
          <div>
            <label className="block mb-1 text-sm font-medium">อัปโหลดรูปภาพ</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            {image.length > 0 && Array.from(image).map((img,index) => (
              <div key={index} className="mt-4">

                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full max-h-40 object-contain rounded"
                />
              </div>
            ))}
          </div>

          {/* แผนที่ Leaflet */}
          <div>
            <label className="block mb-1 text-sm font-medium">เลือกตำแหน่งบนแผนที่</label>
            <MapContainer
              center={[13.736717, 100.523186]} // กรุงเทพฯ เป็นค่าเริ่มต้น
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
            {position && (
              <p className="mt-2 text-sm">
                ตำแหน่งที่เลือก: lat {position.lat.toFixed(5)}, lng{" "}
                {position.lng.toFixed(5)}
              </p>
            )}
          </div>

          {/* ปุ่มโพสต์ */}
          <button
            type="submit"
            className="w-full py-2 rounded font-semibold text-white bg-[#5D4037] hover:bg-[#4E342E] transition"
          >
            โพสต์
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
