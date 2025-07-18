import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { getPropertyId } from "../api/authApi";
import { useParams } from "react-router";
import L from "leaflet";

function PropertyDetailPage() {
  const markerIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await getPropertyId(id);
        setProperty(res.data.property);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    }

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-gray-600 text-xl font-semibold">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-4xl mx-auto space-y-8 px-4">

        {/* รูปภาพ */}
        {property.image?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.image.map((item, index) => (
              <img
                key={index}
                src={item.image_url}
                className="w-full h-60 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        )}

        {/* ข้อมูลอสังหา */}
        <div className="bg-white p-6 rounded-lg shadow text-lg space-y-4">
          <div>
            <span className="font-semibold text-gray-700">รายละเอียด:</span>
            <p className="text-gray-800">{property.detail}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">ที่ตั้ง:</span>
            <p className="text-gray-800">{property.location}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">พื้นที่:</span>
            <p className="text-gray-800">{property.area}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">ราคา:</span>
            <p className="text-green-600 font-bold text-xl">{property.price} บาท</p>
          </div>
        </div>

        {/* แผนที่ */}
        {property.lat && property.lng && (
          <div>
            <label className="block text-lg font-semibold mb-2 text-[#5D4037]">
              ตำแหน่งที่ตั้งบนแผนที่
            </label>
            <div className="rounded-lg overflow-hidden border">
              <MapContainer
                center={[property.lat, property.lng]}
                zoom={15}
                style={{ height: "350px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[property.lat, property.lng]} icon={markerIcon} />
       
           
              </MapContainer>
         
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetailPage;
