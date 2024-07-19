import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0xbab2D346FE4124469Fa676d7a3a00b2b14e576fc";
const rewardTokenContractAddress = "0x8dEa29f2e55225A04c8770c5D65A2DAFF89F55fC";
const stakingContractAddress = "0xCeE05a2eC7011c0d8D82093dDF6A23b1B75CcD34";

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