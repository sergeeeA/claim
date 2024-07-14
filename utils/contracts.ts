import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0x52D516ec9D404dF6099d85EEdb8Eb127dd910729";
const rewardTokenContractAddress = "0xc199f5148CA7DF9ab1b59F621Fb959922078e2C0";
const stakingContractAddress = "0xD92fD9DD9C35A87769391bb14560e7BF663B2A18";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingABI
});