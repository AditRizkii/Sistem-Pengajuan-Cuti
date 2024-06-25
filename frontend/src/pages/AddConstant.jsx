import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddConstant from "../components/FormAddConstant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddConstant = () => {
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
    if (user && user.role !== "admin") {
      navigate("/forbiden");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <FormAddConstant />
    </Layout>
  );
};

export default AddConstant;
