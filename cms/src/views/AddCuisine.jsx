import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';

export default function AddCuisine({ url }) {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    async function handleCreate() {
        try {
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

    async function fetchCategories() {
        try {
            setLoading(true)

            const data = await axios.get(`${url}/apis/restaurant-app/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCategories(data.data.data)

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
        fetchCategories()
    }, [])

    return (
        <>
            <img src="./assets/background.png" alt="" className="backgroundImage" />
            {loading ? (
                <div className="loading">
                    <img src="./gif/loading.gif" />
                </div>
            ) : (
                <main>
                    <div className="formOuterContainer">
                        <div className="formContainer">
                            <p className="detailTitle">CREATE NEW CUISINE</p>
                            <div className="inputField">
                                CUISINE NAME
                                <input type="text" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="inputField">
                                DESCRIPTION
                                <input type="text" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="inputField">
                                PRICE
                                <input type="number" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="inputField">
                                IMAGE URL
                                <input type="text" onChange={(e) => setImgUrl(e.target.value)} />
                            </div>
                            <div className="inputField">
                                CATEGORY
                                <select onChange={(e) => setCategory(e.target.value)} className="selectOpt">
                                    <option value="">---SELECT---</option>
                                    {categories.map((cat) => {
                                        return (
                                            <option value={cat.id}>{cat.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="CTA_home">
                                <div className="default_button" onClick={() => { handleCreate() }}>
                                    CONFIRM
                                </div>
                                <div className="default_button" onClick={() => {navigate("/cuisines")}} >
                                    CANCEL
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}