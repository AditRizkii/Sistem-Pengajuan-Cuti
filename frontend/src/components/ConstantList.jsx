import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ConstantList = () => {
  const [constants, setConstants] = useState([]);
  const [editState, setEditState] = useState({
    row: null,
    col: null,
    value: "",
  });

  useEffect(() => {
    getConstants();
  }, []);

  const getConstants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/constants");
      setConstants(response.data);
    } catch (error) {
      console.error("Error fetching constants:", error);
    }
  };

  const handleDoubleClick = (rowIndex, colName, currentValue) => {
    setEditState({ row: rowIndex, col: colName, value: currentValue });
  };

  const handleInputChange = (e) => {
    setEditState({ ...editState, value: e.target.value });
  };

  const handleInputBlur = async (constantID) => {
    const updatedConstant = {
      ...constants[editState.row],
      [editState.col]: editState.value,
    };

    try {
      const response = await axios.patch(
        `http://localhost:5000/constants/${constantID}`,
        updatedConstant,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Update successful");
        // Update local state
        const updatedConstants = [...constants];
        updatedConstants[editState.row] = {
          ...updatedConstants[editState.row],
          [editState.col]: editState.value,
        };
        setConstants(updatedConstants);
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setEditState({ row: null, col: null, value: "" });
    }
  };

  const deleteConstant = async (constantID) => {
    try {
      await axios.delete(`http://localhost:5000/constants/${constantID}`);
      getConstants();
    } catch (error) {
      console.error("Error deleting constant:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Constants</h1>
      <h2 className="subtitle">List of Constants</h2>
      <Link to="/constants/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {constants.map((constant, index) => (
            <tr key={constant.uuid}>
              <td>{index + 1}</td>
              <td
                onDoubleClick={() =>
                  handleDoubleClick(index, "name", constant.name)
                }
              >
                {editState.row === index && editState.col === "name" ? (
                  <input
                    type="text"
                    value={editState.value}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(constant.uuid)}
                    autoFocus
                  />
                ) : (
                  constant.name
                )}
              </td>
              <td
                onDoubleClick={() =>
                  handleDoubleClick(index, "value", constant.value)
                }
              >
                {editState.row === index && editState.col === "value" ? (
                  <input
                    type="text"
                    value={editState.value}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(constant.uuid)}
                    autoFocus
                  />
                ) : (
                  constant.value
                )}
              </td>
              <td>
                <button
                  onClick={() => deleteConstant(constant.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConstantList;
