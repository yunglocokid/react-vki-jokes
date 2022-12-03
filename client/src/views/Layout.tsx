import React, {useEffect, useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import {API} from "../servises/api";

function Layout() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const userRequest = async () => {
      setLogged(false);
      setResult("");
      setError("");
      try {
        const user = await API.user.getCurrentUser();
        setResult(`Привет, ${user.login}`);
        setLogged(true);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    userRequest();
  }, []);

  const handleLogout = () => {
    const logoutRequest = async () => {
      try {
        await API.auth.logout();
        setLogged(false);
        setResult("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    logoutRequest();
  };

  return <>
    <nav className="navbar navbar-expand-lg bg-light navbar-dark bg-dark">
      <div className="container-fluid">
        <Link  className="navbar-brand" to="/">Цитаты преподавателей ВКИ НГУ</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/*<li className="nav-item">*/}
            {/*  <Link className="nav-link active" to="/">Home</Link>*/}
            {/*</li>*/}
          </ul>
          <span className="navbar-text">
            {!isLogged &&
                <div>
                  <Link  className="nav-link active" to="/login">Login</Link>
                  <Link className="nav-link active" to="/registration">Registration</Link>
                </div>
            }
          </span>
        </div>
      </div>
    </nav>

    <div className="container">
      <Outlet />
    </div>
  </>;
};

export default Layout;
