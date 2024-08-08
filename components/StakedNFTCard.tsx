import { MediaRenderer, TransactionButton, useReadContract } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { getNFT } from "thirdweb/extensions/erc721";
import { client } from "@/app/client";
import { prepareContractCall } from "thirdweb";
import { useState, useRef } from "react";
import styles from './Staking.module.css';

type StakedNFTCardProps = {
    tokenId: bigint;
    refetchStakedInfo: () => void;
    refetchOwnedNFTs: () => void;
};

export const StakedNFTCard: React.FC<StakedNFTCardProps> = ({ tokenId, refetchStakedInfo, refetchOwnedNFTs }) => {
    const { data: nft } = useReadContract(
        getNFT,
        {
            contract: NFT_CONTRACT,
            tokenId: tokenId,
        }
    );

    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const mediaRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (mediaRef.current) {
            const rect = mediaRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 30; // Adjust the tilt angle as needed
            const rotateY = -((x - centerX) / centerX) * 30;

            setTilt({ x: rotateX, y: rotateY });

            // Apply the transform directly to the element
            mediaRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };

    const handleMouseLeave = () => {
        if (mediaRef.current) {
            setTilt({ x: 0, y: 0 });
            mediaRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
    };

    return (
        <div style={{ margin: "10px" }}>
            <div
                ref={mediaRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "150px",
                    width: "150px",
                    color: "#C2AC58",
                    transition: "transform 0.07s ease-out", // Smooth transition for transform changes
                }}
            >
                <MediaRenderer
                    client={client}
                    src={nft?.metadata.image}
                    style={{
                        borderRadius: "10px",
                        height: "100%",
                        width: "100%",
                        objectFit: "cover" // Ensure the image fits within the container
                    }}
                />
            </div>
            <p className={styles.Regulartxt}>{nft?.metadata.name}</p>
            <TransactionButton
                transaction={() => (
                    prepareContractCall({
                        contract: STAKING_CONTRACT,
                        method: "withdraw",
                        params: [[tokenId]]
                    })
                )}
                onTransactionConfirmed={() => {
                    refetchOwnedNFTs();
                    refetchStakedInfo();
                    alert("Withdrawn!");
                }}
                style={{
                    justifyContent: "center",
                    display: "flex",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: `url('/curs.png'), pointer`,
                    fontSize: "12px",
                    margin: "0 auto" // Center horizontally if block-level
                }}
            >
                <div className={styles.Button}>RETIRE</div>
            </TransactionButton>
        </div>
    );
};
