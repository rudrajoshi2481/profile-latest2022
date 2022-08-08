import React from "react";
import {GiCancel} from "react-icons/gi"
function PlayersList({setPlayers}) {
  return (
    <div
      style={{
        width: "22em",
        background: "#212125",
        border:"3px solid white",
        height: "90vh",
        // overflow:"scroll",
        borderRadius: "5px",
        padding: ".5em 1em",
      }}
    >
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <h3 className="cfont">All Players</h3>
      <h3><button style={{backgroundColor:"transparent",border:"none",color:"white",fontSize:"32px"}} onClick={() => {setPlayers(false)}} ><GiCancel /></button></h3>
      </div>
      <hr />
      <div style={{width:"100%"}}> 
       <ul style={{padding:0,margin:0}}>
              <ViewItem />
              <ViewItem />
              <ViewItem />
              <ViewItem />
              <ViewItem />
              <ViewItem />
              <ViewItem />
        </ul> 
      </div>
    </div>
  );
}

const ViewItem = () => {
  return (
    <li style={{listStyle:"none",padding:".5em 0.5em",margin:"1em 0",display:"flex",justifyContent:"flex-start",border:"1px dashed white"}}>
    <div style={{width:"100%",display:"flex"}}>
      <div>
        <img alt="img" style={{borderRadius:"15px"}}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",paddingLeft:"1em"}}>
      <div>Name</div>
      <div>rudra@gmail.com</div>
      </div>
    </div>
        </li>
  )
}

export default PlayersList;
