import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import FirstPage from './pages/firstPage';
import MainPage from "./pages/MainPage";
import FriendsPage from "./pages/FriendsPage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";

import Api from "./Api";

export interface Post {
  _id: string;
  authorId: string;
  text: string;
  photo: string;
  timestamp: string;
  likes: string[];
}

export interface User {
  _id: string;
  token: number;
  login: string;
  password: string;
  avatar: string;
  age: number;
  city: string;
  university: string;
  lastName: string;
  firstName: string;
  friends: string[];
  posts: string[];
}

export interface ContextProps {
  api: Api;
  setApi: React.Dispatch<React.SetStateAction<Api>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const Context = React.createContext<ContextProps>({
  api: new Api(null),
  setApi: () => { },
  token: null,
  setToken: () => { },
  user: null,
  setUser: () => { },
});

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("tokenVKintership"));
  const [api, setApi] = useState<Api>(new Api(token));

  const storedUser = localStorage.getItem("userVKintership");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    setApi(new Api(token));
    setToken(localStorage.getItem("tokenVKintership"));
  }, [token]);

  useEffect(() => {
    if (token && user) {
      const interval = setInterval(() => {
        api.getUser(user._id)
          .then((res) => res.json())
          .then((data: User) => {
            setUser(data);
          })
          .catch((error) => console.log(error));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [api, token, user]);

  return (
    <Context.Provider value={{
      api,
      setApi,
      token,
      setToken,
      user,
      setUser,
    }}>
      <div className="mainLayout">
        <Routes>
          {!token && <Route path="/" element={<FirstPage />} />}
          <Route path="/:userId" element={<UserPage />} />
          {token && <Route path="/" element={<MainPage />} />}
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default App;
