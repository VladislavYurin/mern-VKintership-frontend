import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./style.css";
import { Form, Button } from "react-bootstrap";
import AlertPopup from "../AlertPopup/AlertPopup";

export default ({ changeAuthPopupActive }) => {
    const { api, setToken, setUser } = useContext(Context);

    const nav = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState();

    const handler = e => {
        e.preventDefault();

        api.auth({
            "login": login,
            "password": password
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message);
                }
                else {
                    setError();
                    setLogin();
                    setPassword();
                    console.log(data);
                    setToken(data.token);
                    setUser(data);
                    localStorage.setItem("tokenVKintership", data.token);
                    localStorage.setItem("userVKintership", JSON.stringify(data));
                    changeAuthPopupActive(false);
                    nav("/");
                }
            })
    }

    return <div className={changeAuthPopupActive ? "popupBox active" : "popupBox"}>
        <div className="popup">
            <div className="popupClose" onClick={e => { changeAuthPopupActive(false) }}>x</div>
            <Form onSubmit={handler}>

                <Form.Group>
                    <Form.Label>Логин:</Form.Label>
                    <Form.Control
                        type="text"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        className="bigInput"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="bigInput"
                        required
                    />
                </Form.Group>

                <Button variant="warning" type="submit" className="bigButton">Авторизация</Button>
            </Form>
        </div>
        {error ? <AlertPopup error={error} /> : <></>}
    </div>
}