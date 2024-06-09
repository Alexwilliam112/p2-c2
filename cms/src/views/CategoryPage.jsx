import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from 'toastify-js';

export default function CategoryPage({ url }) {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    async function fetchCategories() {
        try {
            setLoading(true)

            const { data } = await axios.get(`${url}/apis/restaurant-app/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCategories(data.data)

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
            {loading ? (
                <div className="loading" >
                    <img src="./gif/loading.gif" />
                </div>
            ) : (
                <main className="pageMargin">
                    <div className="pageTitle">
                        CATEGORIES
                    </div>

                    <table className="tableStyle">
                        <thead>
                            <tr>
                                <td>
                                    CategoryId
                                </td>
                                <td>
                                    Category Name
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((el) => {
                                return (
                                    <tr key={el.id}>
                                        <td>
                                            {el.id}
                                        </td>
                                        <td>
                                            {el.name}
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