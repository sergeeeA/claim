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
    createWallet("app.phantom"),
  ];
  useEffect(() => {
    // Simulate a loading period, e.g., 1.275 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className={`loading-overlay ${!loading ? 'fade-out' : ''}`} style={overlayStyles} onClick={() => setLoading(false)}>
          <video autoPlay muted style={videoStyles}>
            <source src="/loadingbiboi.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      {/* Main Content */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px auto",
        width: "500px",
        borderRadius: "25px",
        overflow: "hidden", // Ensures content within rounded corners is clipped
      }}>
        <div style={{ position: "fixed", top: 0, right: 0, padding: "10px", zIndex: 1000 }}>
        <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: {
            accentText: "#C2AC58",
            accentButtonBg: "#C2AC58",
            modalBg: "#c2ad581f",
 
            borderColor: "#C2AC58",
            separatorLine: "#C2AC58",
            success: "#C2AC58",
            primaryText: "#C2AC58",
            secondaryText: "#C2AC58",
            accentButtonText: "#C2AC58",
            primaryButtonBg: "#C2AC58",
            primaryButtonText: "#000000",
            secondaryButtonBg: "#C2AC58",
            connectedButtonBg: "#c2ad581f",
            secondaryButtonHoverBg: "#C2AC58",
            secondaryButtonText: "#C2AC58",
            connectedButtonBgHover: "#C2AC58",

            secondaryIconColor: "#C2AC58",
            secondaryIconHoverColor: "#000000",
            secondaryIconHoverBg: "#C2AC58",
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

        <div style={{ overflow: "hidden", width: "300px", marginRight: "33px" }}>
          <img src="beratecAPP.png" alt="BERA TEC Header" style={{ width: "100%", height: "auto" }} />
        </div>



        <ConnectEmbed client={client} chain={chain}         theme={darkTheme({
          colors: {
            
            accentText: "#C2AC58",
            accentButtonBg: "#C2AC58",
            modalBg: "#c2ad581f",

            borderColor: "#C2AC58",
            separatorLine: "#C2AC58",
            success: "#C2AC58",
            primaryText: "#C2AC58",
            secondaryText: "#C2AC58",
            accentButtonText: "#C2AC58",
            primaryButtonBg: "#C2AC58",
            primaryButtonText: "#000000",
            secondaryButtonBg: "#C2AC58",
            connectedButtonBg: "#c2ad581f",
            secondaryButtonHoverBg: "#C2AC58",
            secondaryButtonText: "#C2AC58",
            connectedButtonBgHover: "#C2AC58",

            secondaryIconColor: "#C2AC58",
            secondaryIconHoverColor: "#000000",
            secondaryIconHoverBg: "#C2AC58",
            skeletonBg: "#C2AC58",
            selectedTextColor: "#C2AC58",
            selectedTextBg: "#C2AC58",
          },
        })}

         />
        <Staking />
        <div style={{ overflow: "hidden", width: "350px" }}>
          <img src="pipboybott.png" alt="BERA TEC Header" style={{ width: "100%", height: "auto" }} />
        </div>
      </div>
    </>
  );
}

// Styles for the overlay and video
const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const videoStyles: React.CSSProperties = {
  width: '100%',
  height: 'auto',
};
