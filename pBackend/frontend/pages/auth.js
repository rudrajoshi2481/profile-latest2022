// import { redirect } from "next/dist/server/api-utils";
import React, { useContext, useState } from "react";
import { createUser, LoginUser } from "../functions/axiosFun";
import Router from "next/router";
import { AuthContext } from "../context/authContext";
import { setCookie } from "cookies-next";
import { setTokenCookie } from "../context/authCookie";
import sessionstorage from "sessionstorage";

import Link from "next/link";

function AuthPage() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div
      className="AuthCover"
      style={{
        paddingLeft: "3em",
        paddingRight: "3em",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "0",
          paddingTop: "1em",
          zIndex: "5",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Link href="/">View Profile</Link>
      </span>
      <div style={{ width: "auto", padding: "3em" }}>
        <div>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              justifyContent: "space-evenly",
            }}
          >
            <li
              className="borderbottom"
              style={{
                padding: "1em",
                borderBottom: showForm ? "2px solid white" : null,
              }}
              onClick={() => {
                setShowForm(true);
              }}
            >
              login User
            </li>
            <li
              className="borderbottom"
              style={{
                padding: "1em",
                borderBottom: !showForm ? "2px solid white" : null,
              }}
              onClick={() => {
                setShowForm(false);
              }}
            >
              Create User
            </li>
          </ul>
        </div>
        {showForm ? <LoginUsers /> : <CreateUser />}
      </div>
    </div>
  );
}

const CreateUser = () => {
  const [userData, setUserData] = useState({});

  const [auth, setAuth] = useContext(AuthContext);

  const createUserAxios = (e) => {
    e.preventDefault();

    if (
      userData.email &&
      userData.name &&
      userData.password &&
      userData.phNumber
    ) {
      createUser(userData)
        .then((res) => {
          const data = {
            token: res.data.token,
            ...res.data.infoDatabase._doc,
          };
          if (res.status === 200) {
            setTokenCookie(data);
            setAuth(data);
            Router.push("/");
          }
        })
        .catch((Err) => {
          console.log("err", Err);
        });
    }
  };

  return (
    <>
      <h1 className="cfont">Create User</h1>
      <form style={{ width: "20em" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Name </label>
          <input
            style={{ marginTop: "1em", padding: ".3em" }}
            type={"text"}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          ></input>
          <br />
          <label>Email </label>
          <input
            style={{ marginTop: "1em", padding: ".3em" }}
            type={"email"}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          ></input>
          <br />
          <label>Password </label>
          <input
            type={"password"}
            style={{ marginTop: "1em", padding: ".3em" }}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></input>
          <br />
          <label>Mobile Number </label>
          <input
            style={{ marginTop: "1em", padding: ".3em" }}
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(e) =>
              setUserData({ ...userData, phNumber: e.target.value })
            }
          ></input>
          <br />
        </div>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1em",
        }}
      >
        <button
          style={{
            borderRadius: "none",
            fontSize: "1rem",
            padding: ".5em 1em",
            background: "teal",
            color: "white",
          }}
          onClick={(e) => createUserAxios(e)}
        >
          Create User
        </button>
      </div>
    </>
  );
};

const LoginUsers = () => {
  const [userInfo, setUserInfo] = useState({
    email: "rudra@gmail.com",
    password: "12345",
  });

  const [auth, setAuth] = useContext(AuthContext);

  const loginUserAxios = (e) => {
    e.preventDefault();

    if (userInfo.email && userInfo.password) {
      LoginUser(userInfo)
        .then((res) => {
          if (res.status === 200) {
            let data = {
              ...res.data._doc,
              token: res.data.token,
            };
            setTokenCookie(data);
            setAuth(data);
            Router.push("/");
          }
        })
        .catch((Err) => {
          console.log("err", Err);
        });
    }
  };

  return (
    <>
      <h1 className="cfont">Login User</h1>
      <form style={{ width: "20em" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Email </label>
          <input
            style={{ marginTop: "1em", padding: ".3em" }}
            type={"email"}
            onChange={(e) => {
              e.preventDefault();
              // setUserData({ ...userData, email: e.target.value })
            }}
          ></input>
          <br />
          <label>Password </label>
          <input
            type={"password"}
            style={{ marginTop: "1em", padding: ".3em" }}
            onChange={(e) => {
              e.preventDefault();
              // setUserData({ ...userData, password: e.target.value })
            }}
          ></input>
        </div>
      </form>
      {/* <div style={{paddingTop:".5em",color:"teal"}}> */}
      {/* <span onClick={e => form.setShowForm(1)}>create new account ?</span> */}
      {/* </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1em",
        }}
      >
        <button
          style={{
            borderRadius: "none",
            fontSize: "1rem",
            padding: ".3em 1em",
            background: "teal",
            color: "white",
          }}
          onClick={(e) => loginUserAxios(e)}
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default AuthPage;
