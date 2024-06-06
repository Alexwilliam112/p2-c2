import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CuisineCard(cuisine) {
    const [cuisineData, setCuisine] = useState(cuisine.data)
    const navigate = useNavigate()

    return (
        <div className="cuisineCard" key={cuisineData.id}>
            <img src={cuisineData.imgUrl} alt="" className="cuisineImage"></img>
            <div className="cardText">
                <p>{cuisineData.name}</p>
                <p>{cuisineData.price}</p>
            </div>
            <button onClick={() => {navigate(`/${cuisineData.id}`)}} className="button_viewDetail">
                View Detail
            </button>
        </div>
    )
}