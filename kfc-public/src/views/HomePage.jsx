import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import CuisineCard from "../components/cuisineCard";

export default function HomePage({ url }) {
    const [cuisine, setCuisine] = useState([])
    const [categories, setCategory] = useState([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('ASC')
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState(false)
    const [filter, setFilter] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const navigate = useNavigate()

    async function fetchData(page) {
        try {
            setLoading(true)
            const categories = await axios.get(`${url}/apis/pub/restaurant-app/categories`)
            setCategory(categories.data.data)

            let cuisineUrl = `${url}/apis/pub/restaurant-app/cuisines?sort=${sort}`
            if (search) cuisineUrl += `&q=${search}`
            if (filter) cuisineUrl += `&i=${filter}`
            if (page) cuisineUrl += `&page=${page}`

            const cuisines = await axios.get(cuisineUrl)
            setCuisine(cuisines.data.data.query)
            setTotalPage(cuisines.data.data.pagination.totalPage)
            setCurrentPage(cuisines.data.data.pagination.currentPage)

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

    const page = []
    if (totalPage) {
        for (let i = 0; i < totalPage; i++) {
            page.push(i + 1)
        }
    }

    useEffect(() => {
        fetchData()
        setQuery(false)
    }, [query])

    return (
        <>
            <div className="homeImage">
                <img src="/assets/home.jpg" alt="" className="mainImage"></img>
            </div>

            <div className="searchBar">
                <input type="search" placeholder="Search..." className="searchInput" onChange={(e) => { setSearch(e.target.value) }} />
                <select name="" id="" onChange={(e) => { setSort(e.target.value) }} className="searchInput">
                    <option value="ASC">
                        ASCENDING
                    </option>
                    <option value="DESC">
                        DESCENDING
                    </option>
                </select>
                <button className="submitButton" onClick={() => { fetchData() }}>SEARCH</button>
            </div>

            {loading ? (
                <div className="loading">
                    <img src="./gif/loading.gif" />
                </div>
            ) : (
                <main>
                    <div className="categoryContainer">
                        {categories.map((el) => {
                            return (
                                <button className="button_category" onClick={() => {
                                    setFilter(el.id)
                                    fetchData()
                                }} >
                                    {el.name}
                                </button>
                            )
                        })}
                    </div>

                    <div className="cardContainer">
                        {cuisine.map((cuisine) => {
                            return <CuisineCard data={cuisine} />
                        })}
                    </div >

                    <div className="pagingContainer">
                        <div className="pagination" onClick={() => {
                            if (currentPage > 1) {
                                fetchData(currentPage - 1)
                            }
                        }}>
                            {"<"}
                        </div>

                        {page.map((el) => {
                            return (
                                <div className="pagination" onClick={() => {
                                    fetchData(el)
                                }}>
                                    {el}
                                </div>
                            )
                        })}

                        <div className="pagination" onClick={() => {
                            if (currentPage < totalPage) {
                                fetchData(currentPage + 1)
                            }
                        }}>
                            {">"}
                        </div>
                    </div>
                </main >
            )}
        </>
    )
}