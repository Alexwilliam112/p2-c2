import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import CuisineForm from "../components/cuisineForm";

export default function AddCuisine({ url }) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleCreate(e, name, description, price, imgUrl, category) {
        try {
            e.preventDefault()
            setLoading(true)

            await axios.post(`${url}/apis/restaurant-app/cuisines`, {
                name,
                price: Number(price),
                description,
                imgUrl,
                categoryId: Number(category)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate('/cuisines')

            Toastify({
                text: "Success Created New Cuisine",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold",
                    position: 'absolute',
                    right: '0',
                    padding: "10px 20px",
                }
            }).showToast();

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

    return (
        <>
            <img src="./assets/background.png" alt="" className="backgroundImage" />
            {loading ? (
                <div className="loading">
                    <img src="./gif/loading.gif" />
                </div>
            ) : (
                <main>
                    <CuisineForm url={url} handleSubmit={handleCreate} formTitle={'CREATE NEW CUISINE'}/>
                </main>
            )}
        </>
    )
}