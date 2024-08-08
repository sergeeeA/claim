'use client';


import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { StakeRewards } from "./StakeRewards";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { NFT } from "thirdweb";
import { useEffect, useState } from "react";
import { claimTo, getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";
import { NFTCard } from "./NFTCard";
import { StakedNFTCard } from "./StakedNFTCard";
import styles from './Staking.module.css'; // Import the CSS module


export const Staking = () => {
    const account = useActiveAccount();

    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
    
    const getOwnedNFTs = async () => {
        let ownedNFTs: NFT[] = [];

        const totalNFTSupply = await totalSupply({
            contract: NFT_CONTRACT,
        });
        const nfts = await getNFTs({
            contract: NFT_CONTRACT,
            start: 0,
            count: parseInt(totalNFTSupply.toString()),
        });
        
        for (let nft of nfts) {
            const owner = await ownerOf({
                contract: NFT_CONTRACT,
                tokenId: nft.id,
            });
            if (owner === account?.address) {
                ownedNFTs.push(nft);
            }
        }
        setOwnedNFTs(ownedNFTs);
    };
    
    useEffect(() => {
        if(account) {
            getOwnedNFTs();
        }
    }, [account]);

    const {
        data: stakedInfo,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""],
    });
    
    if(account) {
        return (
            <div className={styles.container}>
                <hr className={styles.divider} />
                <div className={styles.headerContainer}>
                    <h2 className={styles.Regulartxt}>RECRUIT DWELLERS</h2>
                    <TransactionButton
                        transaction={() => (
                            claimTo({
                                contract: NFT_CONTRACT,
                                to: account?.address || "",
                                quantity: BigInt(1)
                            })
                        )}
                        onTransactionConfirmed={() => {
                            alert("Dweller claimed!");
                            getOwnedNFTs();
                        }}
                        style={{

                            backgroundColor: "transparent",
                            color: "#C2AC58",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            cursor: `url('/curs.png'), pointer`,
                        }}
                    > <div className={styles.Button}>CLAIM DWELLER</div></TransactionButton>
                </div>

                <hr className={styles.finalDivider}/>

                <div style={{ 
                    margin: "20px 0",
                    width: "100%"
                }}>
                     <h2 className={styles.Regulartxt}>DWELLERS</h2>
                     <div className={styles.nftCardContainer}>
                        {ownedNFTs && ownedNFTs.length > 0 ? (
                            ownedNFTs.map((nft) => (
                                <NFTCard
                                    key={nft.id}
                                    nft={nft}
                                    refetch={getOwnedNFTs}
                                    refecthStakedInfo={refetchStakedInfo}
                                />
                            ))
                        ) : (
                            <p className={styles.Regulartxt}>You own 0 Dwellers</p>
                        )}
                    </div>
                </div>

                <hr className={styles.finalDivider}/>

<div style={{ width: "100%", margin: "20px 0" }}>
                    <h2 className={styles.Regulartxt}>WORKING DWELLERS</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                        {stakedInfo && stakedInfo[0].length > 0 ? (
                            stakedInfo[0].map((nft: any, index: number) => (
                                <StakedNFTCard
                                    key={index}
                                    tokenId={nft}
                                    refetchStakedInfo={refetchStakedInfo}
                                    refetchOwnedNFTs={getOwnedNFTs}
                                />
                            ))
                        ) : (
                            <p className={styles.Regulartxt}>No Dwellers Employed</p>
                        )}
                    </div>
                </div>
                <hr className={styles.finalDivider}/>
                <StakeRewards />  
            </div>
        );
    }
};