import axios from "axios";
import { useState } from "react";
import Toastify from 'toastify-js';

export default function AddUserPage({ url }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister() {
        try {
            setLoading(true)
            await axios.post(`${url}/apis/add-user`, {
                username,
                email,
                password,
                phoneNumber,
                address
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Toastify({
                text: "Success Register New Account",
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
                            <p className="detailTitle">REGISTER</p>
                            <div className="inputField">
                                <label htmlFor="email">EMAIL</label>
                                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="inputField">
                                <label htmlFor="username">USERNAME</label>
                                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="inputField">
                                <label htmlFor="password">PASSWORD</label>
                                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="inputField">
                                <label htmlFor="phoneNumber">PHONE NO.</label>
                                <input type="text" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="inputField">
                                <label htmlFor="address">ADDRESS</label>
                                <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <button className="button_form" onClick={() => {handleRegister()}}>
                                CREATE NEW USER
                            </button>
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}