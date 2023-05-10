import { useContext } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Friend from "../../components/Friend/Friend";
import { Context } from "../../App";
import "./FriendPage.css"

export default () => {
    const { user } = useContext(Context);
    return (
        <div className="friendsPage">
            <Navigation />
            <div className="friendsContainer">
                {user && user.friends.map((el: string) => <Friend key={el} friendId={el} />)}
            </div>
        </div>
    );
}; 