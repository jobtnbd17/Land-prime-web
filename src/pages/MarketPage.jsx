import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProduct } from "../api/authApi";
import { Link } from "react-router";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

function MarketPage() {
  const [landsList, setLandsList] = useState([]);

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

  async function getLandslist() {
    const res = await getAllProduct();

    setLandsList(res.data.message);
  }
  useEffect(() => {
    getLandslist();
  }, []);

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">รายการอสังหา</h2>
      {landsList.length === 0 && (
        <p className="text-center text-gray-500">ไม่มีรายการอสังหาในขณะนี้</p>
      )}
      {landsList.map((land) => (
        <Link
          to={`/property/${land.id}`}
          key={land.id}
          className="block rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 bg-white hover:bg-gray-50"
        >
          <ProductCard
            image={land.image?.[0]}
            title={land.detail}
            location={land.location}
            area={land.area}
            price={land.price}
          />
        </Link>
      ))}
      {landsList.length > 0 && (
        <div className="rounded-lg overflow-hidden border">
          <MapContainer
            center={[landsList[0]?.lat || 0.1, landsList[0]?.lng || -0.1]}
            zoom={12}
            style={{ height: "350px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {landsList.map((position, index) => {
              return (
                <Marker
                  key={index}
                  position={[position.lat, position.lng]}
                  icon={markerIcon}
                />
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default MarketPage;
