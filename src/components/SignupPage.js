import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";

const eventBaseUrl = "http://localhost:8080/projectManagement/addNewUser";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      address: "",
      role: "Requestor",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      signupErrorMessage: "",
      isEmailError: false,
      isNumberError: false,
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };

  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };

  handleSubmit = () => {
    const { username, email, password, role, phoneNumber } = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      role === "" ||
      phoneNumber === ""
    ) {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    const isEmailError = this.checkEmailError(email);
    const isPhoneError = this.checkPhoneError(phoneNumber);
    if (!isEmailError) {
      this.setState({ isEmailError: true });
    } else {
      this.setState({ isEmailError: false });
    }
    if (!isPhoneError) {
      this.setState({ isNumberError: true });
    } else {
      this.setState({ isNumberError: false });
    }

    if (!isEmailError) {
      return;
    }

    const reqJson = {
      userName: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      userRole: role,
    };

    axios.post(eventBaseUrl, reqJson).then((res) => {
      if (!res.data.isRegisterSuccessfull) {
        this.setState({
          signupErrorMessage: res.data.error,
          shouldErrorMessageDisplay: true,
        });
      } else {
        push("/");
      }
    });
  };

  checkEmailError = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  checkPhoneError = (number) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(number).toLowerCase());
  };

  render() {
    const {
      username,
      phoneNumber,
      email,
      password,
      shouldAlertDisplay,
      shouldErrorMessageDisplay,
      signupErrorMessage,
      isEmailError,
      isNumberError,
      role,
    } = this.state;

    return (
      <div
        className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500"
        style={{
          backgroundColor: "aliceblue",
          padding: "30px",
          borderRadius: 10,
        }}
      >
        <h2
          style={{
            color: "cornflowerblue",
            display: "flex",
            justifyContent: "center",
          }}
          className="text-4xl font-semibold uppercase"
        >
          Signup
        </h2>
        <TextField
          required
          id="outlined-username"
          value={username}
          label="Username"
          autoComplete="off"
          onChange={(e) => this.handleUsernameChange(e)}
        />
        <TextField
          value={password}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => this.handlePasswordChange(e)}
        />
        <TextField
          error={isEmailError}
          required
          id="outlined-email"
          value={email}
          label="Email"
          onChange={(e) => this.handleEmailChange(e)}
          helperText={isEmailError ? "Invalid Email" : ""}
        />
        <TextField
          error={isNumberError}
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
          helperText={isNumberError ? "Invalid Phone Number" : ""}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={(e) => this.handleRoleChange(e)}
          >
            <MenuItem value={"Requestor"}>Requestor</MenuItem>
            <MenuItem value={"Approver"}>Approver</MenuItem>
          </Select>
        </FormControl>

        <div className="flex items-center justify-between">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            onClick={this.handleSubmit}
          >
            Submit
          </button>

          <div className="flex">
            <p className="text-lg">Existing User?</p>
            <Link
              to="/"
              style={{ color: "cornflowerblue" }}
              className="font-semibold text-lg px-1"
            >
              Login
            </Link>
          </div>
        </div>
        {shouldAlertDisplay && (
          <Alert severity="error">Field cannot be empty</Alert>
        )}
        {shouldErrorMessageDisplay && (
          <Alert severity="error"> {signupErrorMessage} </Alert>
        )}
      </div>
    );
  }
}

export default withRouter(Signup);
