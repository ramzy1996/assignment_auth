import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserList() {
  const [users, setUsers] = useState([]);
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    axios
      .get("user/getAll", {
        headers: { auth: `${JSON.parse(localStorage.getItem("auth"))}` },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);

  // delete users
  const deleteUser = async (id) => {
    await axios.delete(`/user/${id}`).then((res) => console.log(res.data));
    setUsers(users.filter((elem) => elem._id !== id));
    toast.success("product deleted successfully..");
  };

  return (
    <div>
      <h1 className="text-center">User Details</h1>
      <div className="d-flex justify-content-center">
        <TableContainer component={Paper} className="m-4">
          <Table sx={{ maxWidth: "100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">First&nbsp;Name</StyledTableCell>
                <StyledTableCell align="right">Last&nbsp;Name</StyledTableCell>
                <StyledTableCell align="right">Mobile</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">IsAdmin</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, i) => {
                return (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.fname}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.lname}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.mobile}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Switch
                        checked={row.isAdmin ? true : false}
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      {/* {row.isAdmin ? "True" : "False"} */}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <DeleteRoundedIcon
                        style={{ cursor: "pointer" }}
                        className="mr-4"
                        onClick={() => {
                          if (window.confirm("sure to delete?") === true) {
                            deleteUser(row._id);
                          }
                        }}
                      />
                      <Link to={`/update/${row._id}`}>
                        <AutoFixHighRoundedIcon className="mr-4" />
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
