import { useState, useEffect, useContext } from "react";
import "./MainPage.css";
import Navigation from "../../components/Navigation/Navigation";
import Post from "../../components/Post/Post";
import { Context } from "../../App";

const MainPage = (): JSX.Element => {
    const { api, user } = useContext(Context);
    const [newPosts, setNewPosts] = useState<Array<any>>([]);

    useEffect(() => {
        user && api
            .getNewPosts(user._id)
            .then((res) => res.json())
            .then((data) => setNewPosts(data));
    }, []);

    return (
        <div className="mainPage">
            <Navigation />
            <div className="mainContainer">
                {newPosts.map((el) => (
                    <Post id={el._id} key={el._id} />
                ))}
            </div>
        </div>
    );
};

export default MainPage;