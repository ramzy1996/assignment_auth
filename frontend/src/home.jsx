import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserList from "./components/users/userList";

const Home = () => {
  const id = JSON.parse(localStorage.getItem("id"));
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const history = useNavigate();

  console.log(isAdmin);
  return (
    <div style={{ marginTop: "200px" }}>
      {isAdmin ? <UserList /> : null}

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            history(`/update/${id}`);
          }}
        >
          Go to profile
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            localStorage.clear();
            history("/");
            toast.success("logout Success");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
