import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import { AuthContext } from "../context/authContext";
import Router from "next/router";
import { deleteCookie } from "cookies-next";
import { LogOutCookie } from "../context/authCookie";

import { MdNaturePeople } from "react-icons/md";
import PlayersList from "../Components/players/PlayersList";

function IndexPage() {
  const [auth, setAuth] = useContext(AuthContext);

  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    if (auth.token) {
      setAdmin(true);
    }
  }, []);

  return (
    <div style={{ color: "white" }}>
      {/* {auth.token || auth.email ? ( */}
      {true ? (
        <>
          {" "}
          <FirstLookHomePageComp />
          <SecondComp admin={admin} />
        </>
      ) : (
        <>
          <h1 className="cfont">You are Not Loged in</h1>
          <Link href="/auth">Login in </Link>
        </>
      )}
    </div>
  );
}

export default IndexPage;

const FirstLookHomePageComp = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [profileImageHover, setProfileImageHover] = useState(false);
  const [backgroundImageHover, setBackgroundImageHover] = useState(false);
  const [players, setPlayers] = useState(false);

  return (
    <div
      className={["paddingNullify", "backimage"]}
      style={{
        background: "orange",
        paddingLeft: "3em",
        paddingRight: "3em",
        // width: "100vw",
      }}
    
      onMouseEnter={e => setBackgroundImageHover(true)}
      onMouseLeave={e => setBackgroundImageHover(false)}
    >
      {
        backgroundImageHover ? <button style={{position:"absolute",right:"0",marginTop:"1em",marginRight:"9rem"}}>Edit</button> : null
      }
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "1em",
        }}
      >
        {
          <span
            style={{ fontSize: "2em", color: "black" }}
            onClick={(e) => setPlayers(true)}
          >
            <MdNaturePeople />
          </span>
        }
        {players ? (
          <div
            style={{
              position: "absolute",
              zIndex: "15",
              top: "0",
              left: "0",
              margin: ".5em",
            }}
          >
            <PlayersList setPlayers={setPlayers} />
          </div>
        ) : null}
        {auth ? (
          <Link href={"/"}>
            <button
              style={{
                padding: ".5em 1em .5em 1em",
                background: "black",
                color: "white",
              }}
              onClick={(e) => {
                LogOutCookie(), LogOutCookie(), Router.reload();
              }}
            >
              Log Out
            </button>
          </Link>
        ) : (
          <Link href={"/auth"}>
            <button
              style={{
                padding: ".5em 1em .5em 1em",
                background: "black",
                color: "white",
              }}
            >
              Log in your profile{" "}
            </button>
          </Link>
        )}
      </div>
      {/* flex horizontal */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          // flexWrap: "wrap-reverse",
          bottom: "-8em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          className="staterProfile"
        >
          {/* image comp */}
          <div
            className="profileImageHomePage"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onMouseEnter={() => setProfileImageHover(true)}
            onMouseLeave={() => setProfileImageHover(false)}
          >
            <Image
              style={{ borderRadius: "150px",background : profileImageHover ? "rgba(39,62,84,0.82)" : null }}
              alt="Profile Image"
              src="/images/profileImage.jpg"
              layout="fixed"
              width={200}
              height={200}
            />
            {profileImageHover ? <button style={{position:"absolute"}}>Edit</button> : null}
          </div>
          <div
            className="cfont"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "1em",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "2em",
              }}
            >
              <h1>{auth.name}</h1>
              <span
                style={{
                  fontSize: "1.5em",
                  color: "blue",
                  paddingLeft: ".5em",
                }}
              >
                <GoVerified />
              </span>
            </div>

            <span style={{ marginTop: "-1em" }}>{auth.email}</span>
          </div>
        </div>
        {/* profile Links */}
        <div>
          <button
            className="starterGitButton cfont"
            style={{
              width: "8em",
              height: "3em",
              background: "none",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <span>Github</span>{" "}
            <span style={{ fontSize: "1.5em" }}>
              <BsGithub />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SecondComp = ({ admin }) => {
  const [pageShow, setPageShow] = useState("profile");

  return (
    <div
      style={{ paddingTop: "10em", paddingLeft: "3em", paddingRight: "3em" }}
      className="secondComp paddingNullifyy"
    >
      {/* starting page switch flex box */}
      <div className="cfont" style={{ display: "flex", textAlign: "center" }}>
        <span
          className="borderbottom"
          style={{ margin: "0.5em", padding: "1em" }}
          onClick={(e) => setPageShow("profile")}
        >
          Profile
        </span>
        <span
          className="borderbottom"
          style={{ margin: "0.5em", padding: "1em" }}
          onClick={(e) => setPageShow("workhistory")}
        >
          Work History
        </span>
        <span
          className="borderbottom"
          style={{ margin: "0.5em", padding: "1em" }}
          onClick={(e) => setPageShow("contact")}
        >
          Contact
        </span>
      </div>

      <hr style={{ borderColor: "grey", marginTop: "-.6em" }} />
      {/* Switch Page */}
      <div>
        <SwitchPageComp pageShow={pageShow} admin={admin} />
      </div>
    </div>
  );
};

const SwitchPageComp = ({ pageShow, admin }) => {
  switch (pageShow) {
    case "profile":
      return <SwitchPageCompProfile admin={admin} />;
      break;
    case "workhistory":
      return <SwitchPageCompProfileWorkHistory admin={admin} />;
      break;

    case "contact":
      return <SwitchPageCompProfileContact admin={admin} />;
      break;
    default:
      return <SwitchPageCompProfile admin={admin} />;
      break;
  }
};

const CreateInputForBio = ({ admin }) => {
  const [editbio, setEditBio] = useState(true);
  const [bio, setBio] = useState("Not connected to node backend right now");

  const updateBio = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {bio && admin ? (
          <button onClick={(e) => updateBio(e)} style={{ marginBottom: "1em" }}>
            Update
          </button>
        ) : null}
      </div>
      {editbio && admin ? (
        <textarea
          value={bio}
          placeholder="this website is not connected to backend right now"
          onChange={(e) => setBio(e.target.value)}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "2px dashed white",
            width: "100%",
            height: "15em",
            padding: "1em",
          }}
          className="cfont"
          type={"text"}
        />
      ) : (
        <h1>BIO NOT FOUND</h1>
      )}
    </>
  );
};

const SocialLinks = () => {
  return <></>;
};

const SwitchPageCompProfile = ({ admin }) => {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <div className="cfont" style={{ color: "white" }}>
      <div>
        <h1>Bio</h1>
        {auth.body != true ? (
          <CreateInputForBio admin={admin} />
        ) : (
          <p>{auth.body}</p>
        )}
      </div>
      {/* <div>
        <h1>Find me on:</h1>
        <ul>
          <li>Github : @rudra</li>
          <li>Twitter : @rudra</li>
          <li>Instagram : @rudra</li>
        </ul>
      </div> */}
    </div>
  );
};

const SwitchPageCompProfileWorkHistory = () => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div className="cfont">
      <h1>Work History</h1>
      {auth.workHistory ? (
        <p>{auth.workHistory}</p>
      ) : (
        <span>Work History Not found</span>
      )}
    </div>
  );
};

const SwitchPageCompProfileContact = () => {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <div className="cfont">
      <h1>Contacts</h1>
      {auth.socialLinks ? (
        <>{auth.socialLinks}</>
      ) : (
        <span>Social Links not found</span>
      )}
    </div>
  );
};
