import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProduct } from "../api/authApi";
import { Link } from "react-router";

function MarketPage() {
  const [landsList, setLandsList] = useState([]);

  async function getLandslist() {
    const res = await getAllProduct();
    console.log("res", res);
    setLandsList(res.data.message);
  }
  useEffect(() => {
    getLandslist();
  }, []);



  return (
    <div>
      {landsList.map((land) => {
        return (

       <Link to={`/property/${land.id}`}>
          <ProductCard
          key ={land.id}
            image={land.image[0]}
            title={land.detail}
            location={land.location}
            area={land.area}
            price={land.price}
            
          />
             </Link>
        );
      })}
    </div>
  );
}

export default MarketPage;
