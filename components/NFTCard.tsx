import { client } from "@/app/client";
import { NFT, prepareContractCall } from "thirdweb";
import { MediaRenderer, TransactionButton } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { useState, useRef } from "react";
import { approve } from "thirdweb/extensions/erc721";
import styles from './Staking.module.css';

type OwnedNFTsProps = {
    nft: NFT;
    refetch: () => void;
    refecthStakedInfo: () => void;
};

export const NFTCard = ({ nft, refetch, refecthStakedInfo }: OwnedNFTsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const mediaRef = useRef<HTMLDivElement>(null);
    const modalMediaRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 30; // Adjust the tilt angle as needed
            const rotateY = -((x - centerX) / centerX) * 30;

            ref.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };

    const handleMouseLeave = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
    };

    return (
        <div
            style={{ margin: "10px" }}
            className={styles.nftCard}
        >
            <div
                ref={mediaRef}
                style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "150px",
                    width: "150px",
                    overflow: "hidden", // Ensure the image doesn't overflow
                    transition: "transform 0.07s ease-out"
                }}
                onMouseMove={(e) => handleMouseMove(e, mediaRef)}
                onMouseLeave={() => handleMouseLeave(mediaRef)}
            >
                <MediaRenderer
                    client={client}
                    src={nft.metadata.image}
                    style={{
                        borderRadius: "10px",
                        height: "100%",
                        width: "100%",
                        objectFit: "cover" // Ensure the image fits within the container
                    }}
                />
            </div>
            <p style={{ margin: "0 10px 10px 10px", color: "#C2AC58", justifyContent: "center", display: "flex" }}>
                {nft.metadata.name}
            </p>

            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: `url('/curs.png'), pointer`,
                    width: "100%",
                    justifyContent: "center",
                    display: "flex"
                }}
            >
                <div className={styles.Button}>WORK</div>
            </button>

            {isModalOpen && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        minWidth: "150px",
                        backgroundColor: "#222",
                        padding: "20px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%"
                        }}>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                    color: "#C2AC58",
                                    cursor: "pointer"
                                }}
                            >
                                <div className={styles.Button}>Close</div>
                            </button>
                        </div>
                        <h3 style={{ margin: "10px 0", color: "#C2AC58" }}>
                            This Dweller is about to work:
                        </h3>
                        <div
                            ref={modalMediaRef}
                            style={{
                                borderRadius: "10px",
                                marginBottom: "10px",
                                height: "150px",
                                width: "150px",
                                overflow: "hidden",
                                transition: "transform 0.15s ease-out"
                            }}
                            onMouseMove={(e) => handleMouseMove(e, modalMediaRef)}
                            onMouseLeave={() => handleMouseLeave(modalMediaRef)}
                        >
                            <MediaRenderer
                                client={client}
                                src={nft.metadata.image}
                                style={{
                                    borderRadius: "10px",
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover" // Ensure the image fits within the container
                                }}
                            />
                        </div>
                        {!isApproved ? (
                            <TransactionButton
                                transaction={() => (
                                    approve({
                                        contract: NFT_CONTRACT,
                                        to: STAKING_CONTRACT.address,
                                        tokenId: nft.id
                                    })
                                )}
                                style={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    cursor: `url('/curs.png'), pointer`
                                }}
                                onTransactionConfirmed={() => setIsApproved(true)}
                            >
                                <div className={styles.Button}>Approve</div>
                            </TransactionButton>
                        ) : (
                            <TransactionButton
                                transaction={() => (
                                    prepareContractCall({
                                        contract: STAKING_CONTRACT,
                                        method: "stake",
                                        params: [[nft.id]]
                                    })
                                )}
                                onTransactionConfirmed={() => {
                                    alert("Working!");
                                    setIsModalOpen(false);
                                    refetch();
                                    refecthStakedInfo();
                                }}
                                style={{
                                    cursor: `url('/curs.png'), pointer`,
                                    width: "100%",
                                    backgroundColor: "transparent"
                                }}
                            >
                                <div className={styles.Button}>Employ</div>
                            </TransactionButton>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};
