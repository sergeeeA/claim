import { client } from "@/app/client";
import { NFT, prepareContractCall } from "thirdweb";
import { MediaRenderer, TransactionButton } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { useState } from "react";
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

    return (
        <div style={{ margin: "10px" }}>
            <MediaRenderer
                client={client}
                src={nft.metadata.image}
                style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "150px",
                    width: "150px"
                }}
            />
            <p style={{ margin: "0 10px 10px 10px", color: "#C2AC58", justifyContent: "center",  display: "flex",}}>{nft.metadata.name}</p>

            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: `url('/curs.png'), pointer`,
                    width: "100%",
                    justifyContent: "center",  
                    display: "flex",
                    
                }}
            ><div className={styles.Button}>WORK</div></button>
       
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
                            ><div className={styles.Button}>Close</div></button>
                        </div>
                        <h3 style={{ margin: "10px 0", color: "#C2AC58", }}>This Dweller is about to work:</h3>
                        <MediaRenderer
                            client={client}
                            src={nft.metadata.image}
                            style={{
                                color: "#C2AC58",
                                borderRadius: "10px",
                                marginBottom: "10px"
                            }}
                        />
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
                                    cursor: `url('/curs.png'), pointer`,
                                }}
                                onTransactionConfirmed={() => setIsApproved(true)}
                            ><div className={styles.Button}>Approve</div></TransactionButton>
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
                                    backgroundColor: "transparent",
                                }}
                            ><div className={styles.Button}>Employ</div></TransactionButton>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    )
};