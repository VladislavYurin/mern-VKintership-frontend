import { useState } from "react";
import "./FirstPage.css"
import AuthModal from "../../components/AuthModal/AuthModal";
import RegModal from "../../components/RegModal/RegModal";

const FirstPage = () => {
    const [authPopupActive, changeAuthPopupActive] = useState < boolean > (false);
    const [regPopupActive, changeRegPopupActive] = useState < boolean > (false);

    return (
        <div className="center__block">
            <div className="main__container">
                <div className="main__options">
                    <button
                        className="bigButton"
                        onClick={() => { changeAuthPopupActive(true) }}
                    >
                        Авторизация
                    </button>
                    <button
                        className="bigButton"
                        onClick={() => { changeRegPopupActive(true) }}
                    >
                        Регистрация
                    </button>
                </div>
            </div>
            {authPopupActive ? <AuthModal changeAuthPopupActive={changeAuthPopupActive} /> : null}
            {regPopupActive ? <RegModal changeRegPopupActive={changeRegPopupActive} /> : null}
        </div>
    )
}

export default FirstPage;