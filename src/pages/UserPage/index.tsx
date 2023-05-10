import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import "./UserPage.css"

import Navigation from "../../components/Navigation/Navigation";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import { Context, User, ContextProps } from "../../App";

type UserPageProps = {}

const UserPage: React.FC<UserPageProps> = () => {
    const DEFAULT_IMG = "https://domsveta24.ru/image/cache/catalog/2021-07-26/8433e8c4efa19196b475068c75b4c573-1000x1000.jpg";
    const { user, api } = useContext<ContextProps>(Context);
    const [addPostPopupActive, changeAddPostPopupActive] = useState<boolean>(false);
    const { userId } = useParams<{ userId: string }>();
    const [thisUser, setThisUser] = useState<User | undefined>();

    useEffect(() => {
        const interval = setInterval(() => {
            api.getUser(userId)
                .then((res: Response) => res.json())
                .then((data: User) => {
                    setThisUser(data);
                })
                .catch((error: Error) => console.log(error));
        }, 500);
        return () => clearInterval(interval);
    }, [userId, api]);

    const addUserToFriend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        user && api.addFriend({
            "userId": user._id,
            "friendId": thisUser?._id
        })
            .then((res: Response) => res.json())
            .then((data: { message: string }) => alert(data.message))
            .catch((error: Error) => console.log(error));
    }

    const deleteUserFromFriend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        user && api.deleteFriend({
            "userId": user._id,
            "friendId": thisUser?._id
        })
            .then((res: Response) => res.json())
            .then((data: { message: string }) => alert(data.message))
            .catch((error: Error) => console.log(error));
    }

    return <div>
        <div className="userPage">
            <Navigation />
            {thisUser && <div className="userPageContainer">
                <div className="gridItem image">
                    <img src={thisUser.avatar || DEFAULT_IMG} className="avatar"></img>
                </div>
                <div className="grid-item mainText ">{thisUser.firstName} {thisUser.lastName}</div>
                <div className="grid-item text">Возраст: {thisUser.age}</div>
                <div className="grid-item text">Город: {thisUser.city}</div>
                <div className="grid-item text">Университет: {thisUser.university}</div>
                <div className="grid-item text">Друзья {thisUser.friends.length}</div>
            </div>}
        </div>
        <div className="addPostButton">
            {thisUser && user && thisUser._id == user._id && <button className="bigButton" onClick={e => changeAddPostPopupActive(true)}>Добавить пост</button>}
            {addPostPopupActive ? <AddPostModal changeAddPostPopupActive={changeAddPostPopupActive}></AddPostModal> : <></>}
        </div >
        <div className="friendButton">
            {thisUser && user && thisUser._id !== user._id && !thisUser.friends.includes(user._id) && <button className="bigButton" onClick={addUserToFriend}>Добавить в друзья</button>}
            {thisUser && user && thisUser._id !== user._id && thisUser.friends.includes(user._id) && <button className="bigButton" onClick={deleteUserFromFriend}>Удалить из друзей</button>}
        </div >
        {thisUser && thisUser.posts.map((el) => <Post id={el.toString()} key={el} />)}
    </div >
}

export default UserPage;