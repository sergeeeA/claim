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
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                width: "500px",
                padding: "20px",
                border: "4px solid #31322B",
            }}>
                
                <ConnectButton
                    client={client}
                    chain={chain}
                />
                                <hr style={{
                    width: "100%",
                    border: "0.5px solid #C2AC58",

                }}/>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <h2 style={{ marginRight: "20px", color: "#C2AC58"}}>Recruit Dwellers</h2>
                    <TransactionButton
                        transaction={() => (
                            claimTo({
                                contract: NFT_CONTRACT,
                                to: account?.address || "",
                                quantity: BigInt(1)
                            })
                        )}
                        onTransactionConfirmed={() => {
                            alert("NFT claimed!");
                            getOwnedNFTs();
                        }}
                        style={{
                            fontSize: "12px",
                            backgroundColor: "#333",
                            color: "#C2AC58",
                            padding: "10px 20px",
                            borderRadius: "10px",
                        }}
                    >Claim Dweller</TransactionButton>
                </div>

                <hr style={{
                    width: "100%",
                    border: "0.5px solid #C2AC58",

                }}/>

                <div style={{ 
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <h2 style={{ color: "#C2AC58" }}>Dwellers</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px", }}>
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
                            <p style={{ color: "#C2AC58" }}>You own 0 NFTs</p>
                        )}
                    </div>
                </div>

                <hr style={{
                    width: "100%",
                    border: "0.5px solid #C2AC58",

                }}/>

            </div>
        );
    }
};