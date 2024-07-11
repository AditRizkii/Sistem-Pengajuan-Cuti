import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [nip, setNIP] = useState("");
  const [cutiBersama, setCutiBersama] = useState(0);
  const [sisacuti, setSisaCuti] = useState(0);
  const [sisacuti1, setSisaCuti1] = useState(0);
  const [sisacuti2, setSisaCuti2] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        nip: nip,
        cutiBersama: cutiBersama,
        sisacuti: sisacuti,
        sisacutiN1: sisacuti1,
        sisacutiN2: sisacuti2,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">NIP</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nip}
                    onChange={(e) => setNIP(e.target.value)}
                    placeholder="Nomor Induk Pegawai"
                    pattern="\d{18}"
                    title="NIP harus terdiri dari 18 digit angka"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Cuti Bersama</label>
                <div className="control">
                  <input
                    type="number"
                    min={0}
                    className="input"
                    value={cutiBersama}
                    onChange={(e) => {
                      setCutiBersama(e.target.value);
                    }}
                    placeholder="Cuti Bersama"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Sisa Cuti</label>
                <div className="control">
                  <input
                    type="number"
                    min={0}
                    max={12}
                    className="input"
                    value={sisacuti}
                    onChange={(e) => {
                      const value = Math.max(
                        0,
                        Math.min(12, Number(e.target.value))
                      );
                      setSisaCuti(value);
                    }}
                    placeholder="Sisa cuti"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Sisa Cuti (N - 1)</label>
                <div className="control">
                  <input
                    type="number"
                    min={0}
                    max={6}
                    className="input"
                    value={sisacuti1}
                    onChange={(e) => {
                      const value = Math.max(
                        0,
                        Math.min(6, Number(e.target.value))
                      );
                      setSisaCuti1(value);
                    }}
                    placeholder="Sisa cuti (N - 1)"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Sisa Cuti (N - 2)</label>
                <div className="control">
                  <input
                    type="number"
                    min={0}
                    max={6}
                    className="input"
                    value={sisacuti2}
                    onChange={(e) => {
                      const value = Math.max(
                        0,
                        Math.min(6, Number(e.target.value))
                      );
                      setSisaCuti2(value);
                    }}
                    placeholder="Sisa cuti (N - 2)"
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
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="" disabled>
                        Silahkan Pilih Role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
