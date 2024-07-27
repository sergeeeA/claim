import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { prepareContractCall, toEther } from "thirdweb";
import { useEffect } from "react";
import { balanceOf } from "thirdweb/extensions/erc721";

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
                    src="tcaps.gif"
                    style={{ width: "100px" }} // Adjust width as needed
                />
            </h1>

            {!isTokenBalanceLoading && tokenBalance !== undefined && (
                
                <p>
                Balance: {toEther(BigInt(tokenBalance.toString()))}
              </p>
            )}
            
            <p style={{ marginBottom: "20px" , color: "#C2AC58"}}>
                unclaimed tCAPS: {stakedInfo && !isStakedInfoLoading && stakedInfo[1] !== undefined ? toEther(BigInt(stakedInfo[1].toString())) : 'Loading...'}
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
                    border: "none",
                    backgroundColor: "#333",
                    color: "#C2AC58",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "12px",
                    opacity: (isStakedInfoLoading || isTokenBalanceLoading) ? 0.5 : 1
                }}
            >
                Claim Income
            </TransactionButton>
        </div>
    )
};