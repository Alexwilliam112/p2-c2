import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import ActionButton from "../components/actionButton";

export default function CuisinePage({ url }) {
    const [loading, setLoading] = useState(false)
    const [cuisines, setCuisines] = useState([])
    const navigate = useNavigate()

    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/apis/restaurant-app/cuisines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            fetchCuisines()

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
        }
    }

    async function fetchCuisines() {
        try {
            setLoading(true)

            const { data } = await axios.get(`${url}/apis/restaurant-app/cuisines`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCuisines(data.data)

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
        fetchCuisines()
    }, [])

    return (
        <>
            {loading ? (
                <div className="loading" >
                    <img src="./gif/loading.gif" />
                </div>
            ) : (
                <main className="pageMargin">
                    <div className="tableTitle_group">
                        <div className="pageTitle">
                            CUISINES
                        </div>

                        <ActionButton cb={() => {navigate("/create-cuisine")}} tag={'NEW CUISINE'} />
                    </div>

                    <table className="tableStyle">
                        <thead>
                            <tr>
                                <td>
                                    Category
                                </td>
                                <td>
                                    Cuisine Name
                                </td>
                                <td>
                                    Image
                                </td>
                                <td>
                                    Description
                                </td>
                                <td>
                                    Price
                                </td>
                                <td>
                                    Created By
                                </td>
                                <td>
                                    Action
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {cuisines.map((el) => {
                                return (
                                    <tr key={el.id}>
                                        <td>
                                            {el.categoryId}
                                        </td>
                                        <td>
                                            {el.name}
                                        </td>
                                        <td>
                                            <img src={el.imgUrl} alt="" className="tableImg" />
                                        </td>
                                        <td>
                                            {el.description}
                                        </td>
                                        <td>
                                            {el.price}
                                        </td>
                                        <td>
                                            {el.User.username}
                                        </td>
                                        <td className="tableAction">
                                            <ActionButton cb={() => {navigate("/cuisines/" + el.id)}} tag={'VIEW DETAIL'} />
                                            <ActionButton cb={() => {navigate("/cuisines/edit/" + el.id)}} tag={'EDIT ITEM'} />
                                            <ActionButton cb={() => {navigate("/cuisines/uploadImage/" + el.id)}} tag={'UPLOAD IMAGE'} />
                                            <ActionButton cb={() => { handleDelete(el.id) }} tag={'DELETE'} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </main>
            )}
        </>
    )
}