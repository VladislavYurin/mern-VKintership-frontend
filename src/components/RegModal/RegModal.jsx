import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./style.css";
import { Form, Button } from "react-bootstrap";
import AlertPopup from "../AlertPopup/AlertPopup";

export default ({ changeRegPopupActive }) => {
    const { api, setToken, setUser } = useContext(Context);

    const nav = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [university, setUniversity] = useState("");

    const [error, setError] = useState();

    const handler = e => {
        e.preventDefault();

        api.register({
            "login": login,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "avatar": avatar,
            "age": age,
            "city": city,
            "university": university
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message);
                } else {
                    setLogin();
                    setPassword();
                    setFirstName();
                    setLastName();
                    setAvatar();
                    setAge();
                    setCity();
                    setUniversity();
                    console.log(data);
                    setToken(data.token);
                    setUser(data);
                    localStorage.setItem("tokenVKintership", data.token);
                    localStorage.setItem("userVKintership", JSON.stringify(data));
                    changeRegPopupActive(false);
                    nav("/");
                }
            })
    }



    return <div className={changeRegPopupActive ? "popupBox active" : "popupBox"}>
        <div className="popup">
            <div className="popupClose" onClick={e => { changeRegPopupActive(false) }}>x</div>
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

                <Form.Group>
                    <Form.Label>Имя: </Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="bigInput"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Фамилия: </Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="bigInput"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Фото:</Form.Label>
                    <Form.Control
                        type="text"
                        value={avatar}
                        onChange={e => setAvatar(e.target.value)}
                        className="bigInput"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Возраст: </Form.Label>
                    <Form.Control
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        className="bigInput"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Город: </Form.Label>
                    <Form.Control
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="bigInput"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Университет: </Form.Label>
                    <Form.Control
                        type="text"
                        value={university}
                        onChange={e => setUniversity(e.target.value)}
                        className="bigInput"
                    />
                </Form.Group>

                <Button variant="warning" type="submit" className="bigButton">Регистрация</Button>
            </Form>
        </div>
        {error ? <AlertPopup error={error} /> : <></>}
    </div>
}