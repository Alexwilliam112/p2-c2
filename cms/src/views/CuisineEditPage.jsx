import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from 'toastify-js';
import CuisineForm from "../components/cuisineForm";

export default function CuisineEditPage({ url }) {
    const [cuisine, setCuisine] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    async function handleEdit(e, name, description, price, imgUrl, category) {
        try {
            e.preventDefault()
            setLoading(true)
            
            await axios.put(`${url}/apis/restaurant-app/cuisines/${id}`, {
                name: name,
                description: description,
                price: Number(price),
                categoryId: Number(category),
                imgUrl: imgUrl
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            
            navigate('/cuisines')

            Toastify({
                text: "Success Update Cuisine",
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
            navigate('/cuisines')
        }
    }

    async function fetchData() {
        try {
            setLoading(true)

            const data = await axios.get(`${url}/apis/restaurant-app/cuisines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

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
            <img src="../../assets/background.png" alt="" className="backgroundImage" />
            {loading ? (
                <div className="loading" >
                    <img src="../../gif/loading.gif" />
                </div>
            ) : (
                <main>
                    <CuisineForm url={url} handleSubmit={handleEdit} formTitle={'EDIT CUISINE'} cuisine={cuisine} />
                </main>
            )}
        </>
    )
}