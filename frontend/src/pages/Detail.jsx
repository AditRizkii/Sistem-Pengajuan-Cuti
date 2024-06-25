import React, { useEffect } from "react";
import UserLayout from "./UserLayout";
import DetailPengajuanCuti from "../components/DetailPengajuanCuti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Detail = ({ setFormData }) => {
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
      <DetailPengajuanCuti setFormData={setFormData} />
    </UserLayout>
  );
};

export default Detail;
