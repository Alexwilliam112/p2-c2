import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from 'toastify-js';

export default function HomeDetail({ url }) {
    const [cuisine, setCuisine] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { id } = useParams()

    async function fetchData() {
        try {
            setLoading(true)
            const data = await axios.get(`${url}/apis/pub/restaurant-app/cuisines/${id}`)
            setCuisine(data.data.data)

        } catch (err) {
            Toastify({
                text: err,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold",
                    position: "absolute",
                    right: 0
                }
            }).showToast();

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="pubHead">
                <div className="default_button" onClick={() => {navigate('/')}}>
                    HOME
                </div>
            </div>
            <div className="detailPage">
                <img src={cuisine.imgUrl} alt="" className="mainImage"></img>

                <div>
                    <div className="detailTitle">
                        <p>{cuisine.name}</p>
                        <p>IDR {cuisine.price}</p>
                    </div>
                    <p className="detailCategory">{cuisine?.Category?.name}</p>
                </div>

                <div className="line">

                </div>

                <div className="detailDescription">
                    {cuisine.description}
                </div>

                <p className="detailDescription">{cuisine?.User?.username}</p>
            </div>
        </>
    )
}