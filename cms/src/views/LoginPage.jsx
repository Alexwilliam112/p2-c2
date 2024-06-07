import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import DefaultButton from "../components/button";

export default function LoginForm({ url }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleLogin() {
        try {
            setLoading(true)
            const { data } = await axios.post(`${url}/apis/login`, {
                email,
                password
            })

            localStorage.setItem("access_token", data.data.access_token)
            navigate('/cuisines')
            Toastify({
                text: "Success Login",
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
                    <div className="formOuterContainer">
                        <div className="formContainer">
                            <p className="detailTitle">LOGIN</p>
                            <div className="inputField">
                                EMAIL
                                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="inputField">
                                PASSWORD
                                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <DefaultButton cb={() => { handleLogin() }} tag={'LOGIN'} />
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}