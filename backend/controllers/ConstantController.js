import Constants from "../models/constants.js";
import argon2 from "argon2";

export const getConstants = async (req, res) => {
  try {
    const response = await Constants.findAll({
      attributes: ["uuid", "name", "value"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getConstantsById = async (req, res) => {
  try {
    const response = await Constants.findOne({
      attributes: ["uuid", "name", "value"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createConstants = async (req, res) => {
  const { name, value } = req.body;
  try {
    await Constants.create({
      name: name,
      value: value,
    });
    res.status(201).json({ msg: "Konstanta Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateConstants = async (req, res) => {
  const konstanta = await Constants.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!konstanta)
    return res.status(404).json({ msg: "Konstanta tidak ditemukan" });
  const { name, value } = req.body;
  try {
    await Constants.update(
      {
        name: name,
        value: value,
      },
      {
        where: {
          id: konstanta.id,
        },
      }
    );
    res.status(200).json({ msg: "Konstanta Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteConstants = async (req, res) => {
  const konstanta = await Constants.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!konstanta) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Constants.destroy({
      where: {
        id: konstanta.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
