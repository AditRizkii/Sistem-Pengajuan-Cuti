import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo_bmkg.png";
import { IoPerson, IoKey, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-4 has-shadow">
        <div className="flex justify-center">
          <NavLink to={"/dashboard"} className="navbar-item">
            <img src={logo} width="112" alt="logo" className="is-rounded" />
          </NavLink>
        </div>

        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard">
              <div className="flex gap-2">
                <IoHome /> Dashboard
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to={"/constants"}>
              <div className="flex gap-2">
                <IoKey />
                Constant
              </div>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Admin</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/users"}>
              <div className="flex gap-2">
                <IoPerson />
                Users
              </div>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white ">
              <div className="flex gap-2">
                <IoLogOut />
                Log Out
              </div>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
