"use client";

import { useEffect, useState } from 'react';
import { ConnectButton, ThirdwebProvider, darkTheme, } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Staking } from "../../components/Staking";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const wallets = [
    createWallet("io.metamask"),
  
  ];


  return (
    <>

      
      {/* Main Content */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px auto",
        width: "500px",
        borderRadius: "5px",
   
        position: "relative", 
      }}>
         <div style={{
          position: "absolute", // Keeps it fixed in a certain area, but won't overlap content
          top: 10, // Gives a bit of space from the top
          left: "50%",
          transform: "translateX(-50%)", // Centers the button horizontally
          zIndex: 1000, // Ensures button is above other content
          padding: "10px",
        }}>
        <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: {
            accentText: "#C2AC58",
           
            modalBg: "#c2ad581f",
 
            borderColor: "#C2AC58",
            separatorLine: "#C2AC58",
            success: "#C2AC58",
            primaryText: "#C2AC58",
            secondaryText: "#C2AC58",
            accentButtonText: "#C2AC58",
            primaryButtonBg: "transparent",
            primaryButtonText: "#C2AC58",
            secondaryButtonText:"#C2AC58",
            secondaryButtonBg: "#transparent",
            connectedButtonBg: "#c2ad581f",
            tertiaryBg: "transparent", //this is hover over options
            accentButtonBg: "transparent",
            connectedButtonBgHover: "transparent",
  
            secondaryIconColor: "#C2AC58",

            skeletonBg: "#C2AC58",
            selectedTextColor: "#C2AC58",
            selectedTextBg: "#C2AC58",
          },
        })}
        connectModal={{
          size: "compact",
          showThirdwebBranding: false,
        }}
      />
    </ThirdwebProvider>
        </div>

        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          <img src="bg.gif" alt="BERA TEC Header" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }} />
        </div>





        
        <div style={{
          marginTop: "90px", // Adds some space below the fixed ConnectButton
          zIndex: 1, 
        
        }}>
          <Staking />
        </div>

      </div>
    </>
  );
}
