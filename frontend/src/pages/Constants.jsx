import React, { useEffect } from "react";
import Layout from "./Layout";
import ConstantList from "../components/ConstantList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Constants = () => {
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
      <ConstantList />
    </Layout>
  );
};

export default Constants;
