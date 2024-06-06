import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Toastify from 'toastify-js';

export default function CuisineEditPage({ url }) {
    const [cuisine, setCuisine] = useState({})
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    async function handleEdit() {
        try {
            setLoading(true)
            console.log(category);
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
            redirect('/cuisines')
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

            const categories = await axios.get(`${url}/apis/restaurant-app/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCuisine(data.data.data)
            setCategories(categories.data.data)
            setName(data.data.data.name)
            setDescription(data.data.data.description)
            setPrice(data.data.data.price)
            setCategory(data.data.data.categoryId)
            setImgUrl(data.data.data.imgUrl)

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
                <main className="formContainer2">
                    <div className="formContainerVert">
                        EDIT CUISINE
                        <div className="inputField2">
                            <p>NAME</p>
                            <input type="text" defaultValue={name} onChange={(e) => {setName(e.target.value)}}/>
                        </div>
                        <div className="inputField2">
                            <p>DESCRIPTION</p>
                            <input type="area" defaultValue={description} onChange={(e) => {setDescription(e.target.value)}}/>
                        </div>
                        <div className="inputField2">
                            <p>PRICE</p>
                            <input type="number" defaultValue={price} onChange={(e) => {setPrice(e.target.value)}}/>
                        </div>
                        <div className="inputField2">
                            <p>IMAGE URL</p>
                            <input type="text" defaultValue={imgUrl} onChange={(e) => {setImgUrl(e.target.value)}}/>
                        </div>
                        <div className="inputField2">
                            <p>CATEGORY</p>
                            <select name="" id="" className="selectOpt" onChange={(e) => {setCategory(e.target.value)}}>
                                <option value="">---SELECT---</option>
                                {categories.map((cat) => {
                                    let isSelected = false
                                    if (cat.id === category) isSelected = true
                                    return (
                                        <option selected={isSelected} value={cat.id}>{cat.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <br />
                        <div className="CTA_home">
                            <div className="default_button" onClick={() => {handleEdit()}}>
                                CONFIRM
                            </div>
                            <div className="default_button" onClick={() => {navigate("/cuisines")}}>
                                CANCEL
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}