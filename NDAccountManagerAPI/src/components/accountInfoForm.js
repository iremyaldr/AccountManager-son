// src\components\accountInfoForm.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/AccountInfo";
import { Button, TextField, Grid, Paper } from "@mui/material";
import { useToasts } from "react-toast-notifications";

const AccountInfoForm = ({ ...props }) => {
  const { addToast } = useToasts();
  const [values, setValues] = useState({
    accountName: "",
    userName: "",
    password: "",
    category: "",
    email: "",
    createdAt: new Date().toISOString(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.currentId === 0) {
      props.createAccountInfo(values, () => {
        addToast("Submitted successfully", { appearance: "success" });
        setValues({ accountName: "", userName: "", password: "", category: "", email: "", createdAt: new Date().toISOString() });
      });
    } else {
      props.updateAccountInfo(props.currentId, values, () => {
        addToast("Updated successfully", { appearance: "info" });
      });
    }
  };

  const handleAdd = () => {
    props.createAccountInfo(values, () => {
      addToast("Account added successfully", { appearance: "success" });
      setValues({ accountName: "", userName: "", password: "", category: "", email: "", createdAt: new Date().toISOString() });
    });
  };

  const handleReset = () => {
    setValues({ accountName: "", userName: "", password: "", category: "", email: "", createdAt: new Date().toISOString() });
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.AccountInfoList.find((x) => x.id === props.currentId),
      });
    }
  }, [props.currentId, props.AccountInfoList]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Paper elevation={3} style={{ padding: "16px", margin: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="accountName"
              variant="outlined"
              label="Account Name"
              value={values.accountName}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userName"
              variant="outlined"
              label="Username"
              value={values.userName}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              variant="outlined"
              label="Password"
              value={values.password}
              onChange={handleInputChange}
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="category"
              variant="outlined"
              label="Category"
              value={values.category}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleAdd} style={{ marginLeft: "10px" }}>
              Add
            </Button>
            <Button variant="contained" onClick={handleReset} style={{ marginLeft: "10px" }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

const mapStateToProps = (state) => ({
  AccountInfoList: state.AccountInfo.list,
});

const mapActionToProps = {
  createAccountInfo: actions.create,
  updateAccountInfo: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(AccountInfoForm);