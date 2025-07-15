import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FromInput from "../components/FromInput"; // คุณต้องมี component นี้ หรือใช้ <input> ธรรมดา
import { postSchema } from "../validation/validate";
import { createPost } from "../api/authApi";
import { toast } from "react-toastify";

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
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

function CreatePostPage() {
  const [position, setPosition] = useState(null);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("detail", data.detail);
    formData.append("landtype", data.landtype);
    formData.append("area", data.area);
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("lat", position?.lat || "");
    formData.append("lng", position?.lng || "");

    Array.from(images).map((img) => {
      formData.append("image", img);
    });
    try {
      const result = await createPost(formData);
    } catch (error) {
      console.log(error);
    }finally {
      setIsSubmitting(false)
    }

    console.log("ส่งข้อมูล:", Object.fromEntries(formData));
    toast.success("Success");
    reset();
    setImages([]);
    setPosition(null);
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3E5AB] to-[#FFF8E1] flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl border border-gray-200 rounded-xl p-8 w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#5D4037]">
          ลงประกาศอสังหา
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ประเภท */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#5D4037]">
              ประเภท
            </label>
            <select
              {...register("landtype")}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- เลือกประเภท --</option>
              <option value="HOME">HOME</option>
              <option value="LAND">LAND</option>
            </select>
            <p className="text-red-500 text-sm mt-1">
              {errors.landtype?.message}
            </p>
          </div>

          {/* รายละเอียด, พื้นที่, ที่ตั้ง, ราคา */}
          <FromInput
            label="รายละเอียด"
            name="detail"
            register={register}
            errors={errors}
          />
          <FromInput
            label="พื้นที่ ตรม."
            name="area"
            register={register}
            errors={errors}
          />
          <FromInput
            label="ที่ตั้ง"
            name="location"
            register={register}
            errors={errors}
          />
          <FromInput
            label="ราคา"
            name="price"
            type="number"
            register={register}
            errors={errors}
          />

          {/* อัปโหลดรูป */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#5D4037]">
              อัปโหลดรูปภาพ
            </label>
            <button
              type="button"
              onClick={() => document.getElementById("image-upload").click()}
              className="px-4 py-2 bg-[#5D4037] text-white rounded hover:bg-[#4E342E] transition"
            >
              เลือกรูปภาพ
            </button>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="grid grid-cols-2 gap-3 mt-3">
              {Array.from(images).map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="w-full h-28 object-cover rounded border"
                  alt={`upload-preview-${i}`}
                />
              ))}
            </div>
          </div>

          {/* แผนที่ */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#5D4037]">
              เลือกตำแหน่งบนแผนที่
            </label>
            <div className="rounded border overflow-hidden">
              <MapContainer
                center={[13.736717, 100.523186]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
                className="rounded"
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
            {position && (
              <p className="mt-2 text-sm text-gray-600">
                lat: {position.lat.toFixed(6)}, lng: {position.lng.toFixed(6)}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-bold text-lg transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isSubmitting ? "กำลังโพสต์..." : "โพสต์ประกาศ"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
