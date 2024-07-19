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
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, }}> 
      <img src="bg.gif" alt="BERA TEC Header" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }} />
      </div>

      <div style={{   borderTopLeftRadius: "100px", borderTopRightRadius: "100px", overflow: "hidden", width: "300px",   }}>
        <img src="example.gif" alt="BERA TEC Header" style={{ width: "50%", height: "auto" }} />
        <img src="example.gif" alt="BERA TEC Header" style={{ width: "50%", height: "auto" }} />

      </div>
      <div style={{  overflow: "hidden", width: "300px", }}>
        <img src="beratecAPP.png" alt="BERA TEC Header" style={{ width: "100%", height: "auto" }} />

      </div>
      <div style={{  overflow: "hidden", width: "350px", }}>
        <img src="pipboy.png" alt="BERA TEC Header" style={{ width: "100%", height: "auto" }} />

      </div>
      

      
      <ConnectEmbed
        client={client}
        chain={chain}
        
      />
      <Staking />
    </div>
  );
}
