"use client";

import { useEffect, useState } from 'react';
import { ConnectButton } from "thirdweb/react";
import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Staking } from "../../components/Staking";

export default function Home() {
  const [loading, setLoading] = useState(true);

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
          <ConnectButton client={client} chain={chain} />
        </div>

        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          <img src="bg.gif" alt="BERA TEC Header" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }} />
        </div>

        <div style={{ overflow: "hidden", width: "300px", marginRight: "33px" }}>
          <img src="beratecAPP.png" alt="BERA TEC Header" style={{ width: "100%", height: "auto" }} />
        </div>

        <div style={{ overflow: "hidden", width: "350px" }}>
          <img src="pipboy.png" alt="BERA TEC Header" style={{ width: "100%", height: "auto" }} />
        </div>

        <ConnectEmbed client={client} chain={chain} />
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
