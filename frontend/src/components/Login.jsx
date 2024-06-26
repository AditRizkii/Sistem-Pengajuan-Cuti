import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [nip, setNIP] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/dashboard");
    } else if (user && user.role === "user") {
      navigate("/form");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ nip, password }));
  };
  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form className="box" onSubmit={Auth}>
                {isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-2 has-text-centered">Sign In</h1>
                <div className="field">
                  <label className="label">NIP</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={nip}
                      onChange={(e) => setNIP(e.target.value)}
                      placeholder="Nomor Induk Pegawai"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-info is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
