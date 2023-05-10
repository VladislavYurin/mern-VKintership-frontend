import React, { useState, useEffect, useContext, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Context } from "../../App";

export type FriendProps = {
    friendId: string;
    // _id?: string;
};

type User = {
    _id: number;
    firstName: string;
    lastName: string;
    avatar?: string;
    friends: number[];
};

const Friend: React.FunctionComponent<FriendProps> = ({ friendId }) => {
    const DEFAULT_IMG = "https://domsveta24.ru/image/cache/catalog/2021-07-26/8433e8c4efa19196b475068c75b4c573-1000x1000.jpg";
    const { api, user } = useContext(Context);
    const nav = useNavigate();
    const [friend, setFriend] = useState<User | undefined>(undefined);

    useEffect(() => {
        api.getUser(friendId)
            .then((res) => res.json())
            .then((data) => {
                setFriend(data);
            })
            .catch((error) => console.log(error));
    }, [api, friendId]);

    const deleteUserFromFriend = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (user) {
            api.deleteFriend({
                userId: user._id,
                friendId: friendId,
            })
                .then((res) => res.json())
                .then((data) => alert(data.message))
                .catch((error) => console.log(error));
        }
    };

    const addUserToFriend = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (user) {
            api
                .addFriend({
                    userId: user._id,
                    friendId: friendId,
                })
                .then((res) => res.json())
                .then((data) => alert(data.message))
                .catch((error) => console.log(error));
        }
    }

    return <>
        {friend && <div className="friendContainer">
            <div
                className="avatarContainer"
                onClick={() => {
                    nav(`/${friendId}`);
                }}
            >
                <img
                    src={friend.avatar || DEFAULT_IMG}
                    alt={`${friend.firstName} ${friend.lastName}`}
                    className="avatar"
                />
            </div>
            <div
                className="nameContainer"
                onClick={() => {
                    nav(`/${friendId}`);
                }}
            >
                <span className="name">{friend.firstName} </span>
                <span className="surname">{friend.lastName}</span>
            </div>
            {user && user._id.toString() !== friendId && (
                user.friends.includes(friendId) ? (
                    <button
                        className="littleButton"
                        onClick={deleteUserFromFriend}
                    >
                        Удалить из друзей
                    </button>
                ) : (
                    <button
                        className="littleButton"
                        onClick={addUserToFriend}
                    >
                        Добавить в друзья
                    </button>
                )
            )}
            {user && user._id.toString() === friendId && <div className="nullDiv"></div>}
        </div>}
    </>
};

export default Friend;

