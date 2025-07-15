import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { getPropertyId } from "../api/authApi";
import { useLocation, useParams } from "react-router";

function PropertyDetailPage() {
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

  const [property, setProperty] = useState({});

  const { id } = useParams();

  async function getProperty() {
    const res = await getPropertyId(id);
    console.log("res", res);
    setProperty(res.data.property);
  }

  useEffect(() => {
    getProperty();
  }, []);

  console.log(property?.lat, property?.lng);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Content */}
      <div className="max-w-3xl mx-auto mt-6 space-y-6 p-4">
        {/* รูปภาพหลัก */}
        <div className="w-full">
          {property.image?.map((item, index) => (
            <img
              key={index}
              src={item.image_url}
              className="w-full rounded shadow object-cover"
            />
          ))}
        </div>

        {/* กล่องข้อมูล */}
        <div className="bg-[#D9D9D9] text-center py-6 rounded shadow text-xl font-medium">
          {property.detail}
        </div>

        {/* แผนที่ */}

        {property?.lat && property?.lng ? (
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#5D4037]">
              เลือกตำแหน่งบนแผนที่
            </label>
            <div className="rounded border overflow-hidden">
              <MapContainer
                center={[13.7330902091783, 100.5346655845642]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
                className="rounded"
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/* <div className="w-full">
          <img
            src="https://developers.google.com/maps/documentation/maps-static/images/map-static-1.png"
            alt="map"
            className="w-full h-64 object-cover rounded shadow"
          />
        </div> */}
      </div>
    </div>
  );
}

export default PropertyDetailPage;
