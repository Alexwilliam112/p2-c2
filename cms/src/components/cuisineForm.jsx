import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import DefaultButton from "./button";

export default function CuisineForm({ url, handleSubmit, formTitle, cuisine }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    async function fetchCategories() {
        try {
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
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (cuisine) {
            setName(cuisine?.name)
            setDescription(cuisine?.description)
            setPrice(cuisine?.price)
            setImgUrl(cuisine?.imgUrl)
            setCategory(cuisine?.categoryId)
        }
    }, [cuisine])

    return (
        <>
            <img src="./assets/background.png" alt="" className="backgroundImage" />
            <main>
                <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, category)}>

                    <div className="formOuterContainer">
                        <div className="formContainer">
                            <p className="detailTitle">{formTitle}</p>
                            <div className="inputField">
                                CUISINE NAME
                                <input type="text" onChange={(e) => setName(e.target.value)} defaultValue={name}/>
                            </div>
                            <div className="inputField">
                                DESCRIPTION
                                <input type="text" onChange={(e) => setDescription(e.target.value)} defaultValue={description} />
                            </div>
                            <div className="inputField">
                                PRICE
                                <input type="number" onChange={(e) => setPrice(e.target.value)} defaultValue={price} />
                            </div>
                            <div className="inputField">
                                IMAGE URL
                                <input type="text" onChange={(e) => setImgUrl(e.target.value)} defaultValue={imgUrl} />
                            </div>
                            <div className="inputField">
                                CATEGORY
                                <select onChange={(e) => setCategory(e.target.value)} className="selectOpt" value={category}>
                                    <option value="">---SELECT---</option>
                                    {categories.map((cat) => {
                                        return (
                                            <option value={cat.id}>{cat.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="CTA_home">
                                <button type="submit" className="actionButton2">
                                    CONFIRM
                                </button>
                                <DefaultButton cb={() => { navigate("/cuisines") }} tag={'CANCEL'} />
                            </div>
                        </div>
                    </div>

                </form>
            </main>
        </>
    )
}