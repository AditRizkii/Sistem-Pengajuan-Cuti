import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo_bmkg.png";
import { IoKey, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <aside className="menu pl-4 has-shadow">
        <div className="flex justify-center py-4">
          <NavLink to={"/dashboard"} className="navbar-item">
            <img src={logo} width="112" alt="logo" className="is-rounded" />
          </NavLink>
        </div>

        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard" className="menu-item">
              <div className="flex items-center gap-2">
                <IoHome /> Dashboard
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to={"/constants"} className="menu-item">
              <div className="flex items-center gap-2">
                <IoKey /> Constant
              </div>
            </NavLink>
          </li>
        </ul>

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white is-fullwidth">
              <div className="flex items-center gap-2">
                <IoLogOut /> Log Out
              </div>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
