import { useNavigate } from "react-router";

function ProductCard({ image, title, location, area, price,id }) {

  console.log(image)
  return (
    <div className="flex bg-white shadow-lg rounded-2xl overflow-hidden max-w-xl w-full" >
      {/* รูปภาพ */}
      <img src={image.image_url} className="w-40 h-40 object-cover" />

      {/* รายละเอียด */}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <div className="text-sm text-gray-600 mt-1">
          <p>
            <span className="font-medium">{location}</span>
          </p>
          <p>
            {" "}
            <span className="font-medium">{area}</span>
          </p>
          <p>
            <span className="font-bold text-green-600">{price}  บาท</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
