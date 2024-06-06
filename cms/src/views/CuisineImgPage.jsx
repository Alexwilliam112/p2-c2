import axios from "axios";
import { useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Toastify from 'toastify-js';

export default function CuisineImageUpload({ url }) {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    async function handleUpload() {
        try {
            const formData = new FormData();
            formData.append('file', file);

            setLoading(true)
            await axios.patch(`${url}/apis/restaurant-app/cuisines/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate('/cuisines')

            Toastify({
                text: "Success Upload New Image",
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
                        UPLOAD CUISINE IMAGE
                        <div className="inputField2">
                            <p>IMAGE FILE</p>
                            <input
                                type="file"
                                filename={file}
                                className="imageUpload"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <br />
                        <div className="CTA_home">
                            <div className="default_button" onClick={() => { handleUpload() }}>
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