import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import DefaultButton from "./button";

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        try {
            localStorage.removeItem("access_token")
            navigate('/')

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

    return (
        <div className="headerContainer">
            <div className="title_home">
                KFC
            </div>
            <div className="CTA_home">

                <DefaultButton cb={() => { navigate('/categories') }} tag={'CATEGORIES'} />
                <DefaultButton cb={() => { navigate('/cuisines') }} tag={'CUISINES'} />
                <DefaultButton cb={() => { navigate('/add-user') }} tag={'ADD USER'} />
                <DefaultButton cb={() => handleLogout()} tag={'LOGOUT'} />

            </div>
        </div>
    )
}