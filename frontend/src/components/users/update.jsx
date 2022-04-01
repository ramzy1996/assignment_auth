import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Update = (props) => {
  const { id } = useParams();
  const history = useNavigate();

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [isAdmin, setisAdmin] = useState();
  const [password, setPassword] = useState();
  const [c_pass, setCpass] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/user/${id}`)
      .then((res) => [
        setFname(res.data.fname),
        setLname(res.data.lname),
        setMobile(res.data.mobile),
        setEmail(res.data.email),
        setisAdmin(res.data.isAdmin),
        setPassword(res.data.password),
      ])
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);

  const changeOnClick = async (e) => {
    let item = { fname, lname, mobile, email, isAdmin, password };
    console.log("items", item);
    e.preventDefault();

    // const formData = await new FormData();

    // formData.append("fname", fname);
    // formData.append("lname", lname);
    // formData.append("mobile", mobile);
    // formData.append("email", email);
    // formData.append("isAdmin", isAdmin);
    // formData.append("password", password);
    console.log(password);
    console.log(c_pass);
    if (password !== c_pass) {
      toast.error("Password doesnt match");
    } else if (password === "" || c_pass === "") {
      toast.error("Password fields required");
    } else {
      await axios
        .put(
          `http://localhost:8800/api/user/update/${id}`,
          JSON.stringify(item),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          history("/");
          toast.success("Successfully updated");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  };
  console.log("fname", fname);
  return (
    <MainContainer>
      <h1 className="text-center">Update Users</h1>
      <div className="container">
        {/* {!fname || !lname || !email || !mobile || isAdmin ? (
          <img src={"/spinner2.gif"} alt="Loading..." className="center" />
        ) : ( */}
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">
              First Name
            </label>

            <input
              type="text"
              className="form-control"
              id="fname"
              onChange={(e) => setFname(e.target.value)}
              name="fname"
              value={fname}
              placeholder="Enter First Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>

            <input
              type="text"
              className="form-control"
              id="lname"
              name="lname"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
              placeholder="Enter Last Name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              placeholder="Enter Mobile"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="c_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="c_password"
              name="c_password"
              placeholder="Enter confirm Password"
              onChange={(e) => setCpass(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
        {/* )} */}
      </div>
    </MainContainer>
  );
};

export default Update;

const MainContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 70%;
  .message {
    font-weight: 900;
    color: tomato;
    padding: 1rem 1rem 1rem 0;
  }

  .center {
    display: block;
    margin-left: 50%;
    margin-right: 50%;
    width: 3rem;
  }
`;
