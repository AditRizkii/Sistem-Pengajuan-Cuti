import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const sortedUsers = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openModal = (user) => {
    setUserToDelete(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUserToDelete(null);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${userToDelete.uuid}`);
      closeModal();
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <h1 className="title has-text-centered mb-2">Daftar Pegawai</h1>
        <h2 className="subtitle has-text-centered">
          <strong>Unit Kerja :</strong> Stasiun Klimatologi Aceh
        </h2>
        <div className="has-text-right">
          <Link to="/users/add" className="button is-primary mb-4">
            <FontAwesomeIcon icon={faPlus} /> &nbsp; Add New
          </Link>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>NIP</th>
              <th>Sisa Cuti Tahunan (N)</th>
              <th>(N - 1)</th>
              <th>(N - 2)</th>
              <th>Role</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.nip}</td>
                <td>{`${user.sisacuti} Hari Kerja`}</td>
                <td>{`${user.sisacutiN1} Hari Kerja`}</td>
                <td>{`${user.sisacutiN2} Hari Kerja`}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    to={`/users/edit/${user.uuid}`}
                    className="button is-small is-info mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} /> &nbsp; Edit
                  </Link>
                  <button
                    onClick={() => openModal(user)}
                    className="button is-small is-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} /> &nbsp; Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`modal ${modalIsOpen ? "is-active" : ""}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-content">
          <div className="box">
            <h3 className="title is-4">Konfirmasi Penghapusan</h3>
            <p>Apakah kamu ingin menghapus user ini?</p>
            <div className="buttons is-right mt-3">
              <button onClick={deleteUser} className="button is-danger">
                Ya
              </button>
              <button onClick={closeModal} className="button">
                Tidak
              </button>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={closeModal}
        ></button>
      </div>
    </div>
  );
};

export default UserList;
