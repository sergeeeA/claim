import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Staking } from "../../components/Staking";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px auto",
      width: "500px",
      borderRadius: "25px",
      overflow: "hidden", // Ensures content within rounded corners is clipped
      
    }}>
      <div style={{ borderRadius: "100px", overflow: "hidden", width: "300px" }}>
        <img src="example.gif" alt="BERA TEC Header" style={{ width: "50%", height: "auto" }} />
        <img src="example.gif" alt="BERA TEC Header" style={{ width: "50%", height: "auto" }} />
        <img src="beratecAPP.png" alt="BERA TEC Header" style={{ width: "100%", height: "auto" }} />
        <img src="example.gif" alt="BERA TEC Header" style={{ width: "50%", height: "auto" }} />
        <img src="example.gif" alt="BERA TEC Header" style={{ width: "50%", height: "auto" }} />
      </div>
      
      <ConnectEmbed
        client={client}
        chain={chain}
      />
      <Staking />
    </div>
  );
}
