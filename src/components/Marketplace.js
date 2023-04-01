import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Certify.json";
import axios from "axios";
import { useState } from "react";
import "./Marketplace.css";
import img from "../logo_3.png";
import img1 from "../nft-mockup.png";
import { useNavigate } from "react-router";

export default function Marketplace() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateaddress] = useState("0x");
  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFts();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        // let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );

    updateFetched(true);
    updateData(items);
    updateaddress(addr);
  }

  const history = useNavigate();

  if (!dataFetched) getAllNFTs();

  return (
    <div>
      <Navbar />
      <div className="market-container container m-auto grid grid-cols-2 mt-20">
        <div>
          <h1 className="nfttitle">
            Create,Mint and Explore <br></br>Digital Certificates and <br></br>{" "}
            <span className="blurtext">NFTs</span> of legitimate.
          </h1>
          <p class="text-gray-500 font-semibold text-sm mt-3">
            Creating certificates as NFTs, A new form of art, a digital
            masterpiece. <br />
            Tokenized, unique, and forever, A blockchain treasure, an innovative
            endeavor.
          </p>
          <button className="btn-don text-font-bold py-2 px-4 rounded-full mt-5">
            Mint Certificates
          </button>
        </div>
        <div className="back">
          <img className="logo-img" src="" alt="" srcset="" />
          <p className="border-hero">
            <span className="text-white">You:- </span>
            <span className="text-gray-500 font-semibold text-sm mt-3">
              {address}
            </span>
          </p>
        </div>
      </div>
      <div className="ml-20 mt-20">
        <h1 className="text-style">Claim your certificates</h1>
      </div>
      <div className="flex flex-col place-items-center mt-10">
        {/* <div class="wrapper">
    <div class="static-txt">   </div>
    <ul class="dynamic-txts">
      <li><span>NFTs.</span></li>
      <li><span>Culture.</span></li>
      <li><span>Community.</span></li>
    </ul>
  </div> */}

        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {data.map((value, index) => {
            return <NFTTile data={value} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
