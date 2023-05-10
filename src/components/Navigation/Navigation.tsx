import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./style.css";

const Navigation = () => {
    const nav = useNavigate();
    const { user, setUser, setToken } = useContext(Context);

    const logout = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        localStorage.removeItem("tokenVKintership");
        localStorage.removeItem("userVKintership")
        setUser(null);
        setToken(null);
    }

    return (
        <div className="navigationContainer">
            <div className="navigationButton" onClick={e => { nav(`/${user?._id}`) }}>Моя страница</div>
            <div className="navigationButton" onClick={e => { nav("/") }}>Новости</div>
            <div className="navigationButton" onClick={e => { nav("/friends") }}>Друзья</div>
            {/* <div className="navigationButton" onClick={e => { nav("/message") }}>Сообщения</div> */}
            <div className="navigationButton" onClick={e => { nav("/search") }}>Поиск</div>
            <div className="navigationButton" onClick={e => { logout(e); nav("/") }}>Выход</div>
        </div>
    );
};

export default Navigation;