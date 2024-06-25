import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormAddConstant = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveConstants = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/constants", {
        name: name,
        value: value,
      });
      navigate("/constants");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Constants</h1>
      <h2 className="subtitle">Add New Constants</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveConstants}>
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
                <label className="label">Value</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Value"
                  />
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

export default FormAddConstant;
