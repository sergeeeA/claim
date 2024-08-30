import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { prepareContractCall, toEther } from "thirdweb";
import { useEffect } from "react";
import { balanceOf } from "thirdweb/extensions/erc721";
import styles from './Staking.module.css';

export const StakeRewards = () => {
    const account = useActiveAccount();

    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
        refetch: refetchTokenBalance,
    } = useReadContract(
        balanceOf,
        {
            contract: REWARD_TOKEN_CONTRACT,
            owner: account?.address || "",
        }
    )
    
    const {
        data: stakedInfo,
        isLoading: isStakedInfoLoading,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""],
    });

    useEffect(() => {
        refetchStakedInfo();
        const interval = setInterval(() => {
            refetchStakedInfo();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        
        <div style={{ width: "100%", margin: "20px 0", display: "flex", flexDirection: "column", color: "#C2AC58", }}>
            
            <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
                <img
                    src="coinflip.gif"
                    style={{ width: "100px" }} // Adjust width as needed
                />
            </h1>

            {!isTokenBalanceLoading && tokenBalance !== undefined && (
                
                <p className={styles.Regulartxt}>
                BALANCE: <p className={styles.valuetxt}>{toEther(BigInt(tokenBalance.toString()))}</p>
              </p>
            )}
            
            <p className={styles.Regulartxt}>
                UNCLAIMED tCAPS: <p className={styles.valuetxt}>{stakedInfo && !isStakedInfoLoading && stakedInfo[1] !== undefined ? toEther(BigInt(stakedInfo[1].toString())) : 'Loading...'}</p>
            </p>

            <TransactionButton
                transaction={() => (
                    prepareContractCall({
                        contract: STAKING_CONTRACT,
                        method: "claimRewards",
                    })
                )}
                onTransactionConfirmed={() => {
                    alert("Income claimed!")
                    refetchStakedInfo();
                    refetchTokenBalance();
                }}
                disabled={isStakedInfoLoading || isTokenBalanceLoading}
                style={{
                    color: "#C2AC58",
                    padding: "10px",
                    cursor: `url('/curs.png'), pointer`,
                    width: "50%",
                    opacity: (isStakedInfoLoading || isTokenBalanceLoading) ? 0.5 : 1,
                    backgroundColor: "transparent", // Ensures background color is transparent
                    margin: "0 auto", // Center horizontally
                    display: "block" // Ensure block-level for margin auto centering
                    
                }}
            >
                <div className={styles.Button}>CLAIM INCOME</div>
            </TransactionButton>

        </div>
    )
};