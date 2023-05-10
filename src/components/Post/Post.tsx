import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./style.css";
import { Post } from "../../App"

interface Props {
    id: string;
}

export default function PostPage(props: Props): JSX.Element {
    const DEFAULT_IMG = "https://domsveta24.ru/image/cache/catalog/2021-07-26/8433e8c4efa19196b475068c75b4c573-1000x1000.jpg";
    const { user, api } = useContext(Context);
    const [post, setPost] = useState<Post | undefined>();
    const [isAuthor, setIsAuthor] = useState(false);
    const [author, setAuthor] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        api.getPost(props.id)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                if (user?._id === data.authorId) {
                    setIsAuthor(true);
                }
                api.getUser(data.authorId)
                    .then(res => res.json())
                    .then(data => setAuthor(data.firstName + " " + data.lastName))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, [api, props.id, user]);

    const deletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (post) {
            api.deletePost(post._id)
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        console.log(data.message);
                    }
                })
                .catch(error => console.log(error));
        }
    };

    const likePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (post) {
            api.likePost(post._id, { "userId": user?._id })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        console.log(data.message);
                    } else {
                        setPost(data);
                    }
                })
                .catch(error => console.log(error));
        }
    };

    return (
        <div className="postContainer">
            {post && (
                <div className="postGrid">
                    <div
                        className="postAuthor"
                        onClick={() => {
                            nav(`/${post.authorId}`);
                        }}
                    >
                        {author}
                    </div>
                    <div className="postTime">{new Date(post.timestamp).toLocaleString()}</div>
                    <div className="postPhoto">
                        {<img src={post.photo || DEFAULT_IMG} alt="Post" className="postImg" />}
                    </div>
                    <div className="postText">{post.text}</div>
                    <div className="postLikeButton">
                        <button
                            className="littleButton"
                            onClick={likePost}
                            disabled={!user || post.likes.includes(user._id)}
                        >
                            ❤ {post.likes.length}
                        </button>
                        {isAuthor && (
                            <button className="littleButton" onClick={deletePost}>
                                Удалить пост
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}