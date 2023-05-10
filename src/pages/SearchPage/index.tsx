import { useState, useEffect, useContext } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Friend, { FriendProps } from "../../components/Friend/Friend";
import { Context } from "../../App";
import "./SearchPage.css"
import { User } from "../../App";

export default function SearchPage() {
    const { api } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<User[]>([]);

    useEffect(() => {
        if (searchQuery) {
            api.searchUsers(searchQuery)
                .then(res => res.json())
                .then((data: User[]) => {
                    setSearchResults(data)
                })
                .catch(err => console.log(err.message))
        }
    }, [api, searchQuery]);

    return (
        <div className="searchPage">
            <Navigation />
            <div className="searchContainer">
                <input className="bigInput" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <div className="searchResult">
                    {searchResults.map((el) => (
                        <Friend key={el._id} friendId={el._id.toString()} />
                    ))}
                </div>
            </div>
        </div>
    );
} 
