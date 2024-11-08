'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { StakeRewards } from "./StakeRewards";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { NFT } from "thirdweb";
import { useEffect, useState } from "react";
import { claimTo, getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";

import { StakedNFTCard } from "./StakedNFTCard";
import styles from './Staking.module.css'; // Import the CSS module

export const Staking = () => {
    const account = useActiveAccount();
    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
    const [quantity, setQuantity] = useState(1); // State for quantity

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
        if (account) {
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

    if (account) {
        return (
        <div className={styles.parent}>
            <div className={styles.container}>
            <h2 className={styles.Titletxt}>MINT DETAILS</h2>
       

                <p className={styles.Regulartxt}>PHASE: TESTNET CLAIM ( SOON )</p>

          <p className={styles.Regulartxt}>MAX MINT: 4 NFTs
          </p>
          <p className={styles.Regulartxt}>MINT COST: 5 BERA
          </p>
          <p className={styles.Regulartxt}>DURATION: 1 WEEK
          </p>
                
                <hr className={styles.divider} />
      
                <div className={styles.headerContainer}>
                    <h2 className={styles.Regulartxt}>RECRUIT DWELLERS</h2>
                    <button
                        className={styles.buttoninput}
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}  // Decrement
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        className={styles.inputQuantity}  // Apply the style class here
                    />
                    <button
                        className={styles.buttoninput}
                        onClick={() => setQuantity((prev) => prev + 1)}  // Increment
                    >
                        +
                    </button>
                    <TransactionButton
                        transaction={() => (
                            claimTo({
                                contract: NFT_CONTRACT,
                                to: account?.address || "",
                                quantity: BigInt(quantity) // Use the quantity from the input
                            })
                        )}
                        onTransactionConfirmed={() => {
                            alert("Dweller claimed!");
                            getOwnedNFTs();
                        }}
                        style={{
                            backgroundColor: "transparent",

                            cursor: `url('/curs.png'), pointer`,
                        }}
                    >
                        <div className={styles.Button}>CLAIM DWELLER</div>
                    </TransactionButton>
                </div>

                <hr className={styles.finalDivider} />

                <div style={{
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <h2 className={styles.Regulartxt}>WHAT ARE BERA DWELLERS?</h2>
       
                     <p className={styles.MintDetail}>Bera Dwellers are your wallets coolest inhabitants! 
                        Theyre not just cute; theyre super valuable! 
                        These little helpers can work, earning points and tokens to keep your wallet thriving. 
                        
                        
                        </p>
          
                        <h2 className={styles.Regulartxt}>WHAT ARE ITS UTILITIES?</h2>
       
                    <p className={styles.MintDetail}>Currently, you can wager your Bera Dwellers in our 
                        New Beras Decentralised Application to partcipate in our upcoming Competition. 
                        Staking and Gaming soon!
                        
                        
                        </p>
                        <h2 className={styles.Regulartxt}>WHERE ARE MY BERA DWELLERS?</h2>
       
       <p className={styles.MintDetail}>You can see your Bera Dwellers in our 
        New Beras Decentralised Application. Under the "STATS" tab. You can see its Attributes and Image.
           
           
           </p>
                </div>



                        
            </div>
         </div> 
        );
    }
};
                /*<StakeRewards />*/