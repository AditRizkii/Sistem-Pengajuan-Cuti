import Users from "../models/user.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "nip",
        "cutiBersama",
        "sisacuti",
        "sisacutiN1",
        "sisacutiN2",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "nip",
        "cutiBersama",
        "sisacuti",
        "sisacutiN1",
        "sisacutiN2",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confPassword,
    role,
    nip,
    cutiBersama,
    sisacuti,
    sisacutiN1,
    sisacutiN2,
  } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      cutiBersama: cutiBersama,
      nip: nip,
      role: role,
      sisacuti: sisacuti,
      sisacutiN1: sisacutiN1,
      sisacutiN2: sisacutiN2,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const {
    name,
    email,
    password,
    confPassword,
    role,
    nip,
    cutiBersama,
    sisacuti,
    sisacutiN1,
    sisacutiN2,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
        nip: nip,
        cutiBersama: cutiBersama,
        sisacuti: sisacuti,
        sisacutiN1: sisacutiN1,
        sisacutiN2: sisacutiN2,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCuti = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, nip, cutiBersama, sisacuti, sisacutiN1, sisacutiN2 } = req.body;

  try {
    await Users.update(
      {
        name: name,
        nip: nip,
        cutiBersama: cutiBersama,
        sisacuti: sisacuti,
        sisacutiN1: sisacutiN1,
        sisacutiN2: sisacutiN2,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCutiAtYearEnd = async (req, res) => {
  try {
    const users = await Users.findAll();
    for (let user of users) {
      let newSisaCutiN2 = user.sisacutiN1 < 6 ? user.sisacutiN1 : 6;
      let newSisaCutiN1 = user.sisacuti > 6 ? 6 : user.sisacuti;
      let newSisaCuti = 12;
      let newCutiBersama = 0;

      await Users.update(
        {
          cutiBersama: newCutiBersama,
          sisacuti: newSisaCuti,
          sisacutiN1: newSisaCutiN1,
          sisacutiN2: newSisaCutiN2,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
    }
    res.status(200).json({ msg: "Leave data updated for the new year" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to update leave data" });
  }
};
