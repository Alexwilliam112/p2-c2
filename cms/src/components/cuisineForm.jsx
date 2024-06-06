import { useState } from "react"

export default function CuisineForm() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [category, setCategory] = useState('')

    return (
        <div className="formOuterContainer">
            <form action="" method="post" className="formContainer">
                <p className="detailTitle">ADD / EDIT CUISINE</p>
                <div className="inputField">
                    <label htmlFor="name">NAME</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="inputField">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="inputField">
                    <label htmlFor="price">PRICE</label>
                    <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="inputField">
                    <label htmlFor="imgUrl">IMAGE URL</label>
                    <input type="text" name="imgUrl" onChange={(e) => setImgUrl(e.target.value)} />
                </div>
                <div className="inputField">
                    <label htmlFor="category">CATEGORY</label>
                    <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} className="selectOption">
                        <option value="1">CATEGORY 1</option>
                        <option value="2">CATEGORY 2</option>
                        <option value="3">CATEGORY 3</option>
                        <option value="4">CATEGORY 4</option>
                        <option value="5">CATEGORY 5</option>
                    </select>
                </div>
                <button className="button_form">
                    ADD USER
                </button>
            </form>
        </div>
    )
}