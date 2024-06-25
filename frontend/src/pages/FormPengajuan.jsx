import React, { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import FormPengajuanCuti from "../components/FormPengajuanCuti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const FormPengajuan = ({ setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  return (
    <UserLayout>
      <FormPengajuanCuti setFormData={setFormData} />
    </UserLayout>
  );
};

export default FormPengajuan;
