import logo from "../logo_3.png";
import fullLogo from "../logo1.png";
import "../components/Navbar.css";
import "flowbite";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("Connect Wallet");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    // ethereumButton.textContent = newconnect;
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
    let val = window.ethereum.isConnected();
    if (val) {
      toggleConnect(val);
    }
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "80001") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "80001" }],
      });
      console.log("akash");
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  const newconnect = currAddress.substring(0, 15) + "...";

  return (
    <div className="navbarr">
      <nav class="bg-transperant border-gray-200 px-2 py-2">
        <div class="container mx-auto flex flex-wrap items-center justify-between">
          <a href="#" className="flex logo">
            <h4 className="font-semibold text-white">BlockProof</h4>
          </a>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            class="md:hidden ml-3 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="hidden md:block w-full md:w-auto" id="mobile-menu">
            <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
              {location.pathname === "/" ? (
                <li className="bg-white-700 md:bg-transparent hover:text-gray-50 text-white block pl-3 pr-4 py-2 my-2 md:text-white-500 md:p-0 rounded">
                  <Link to="/">Home</Link>
                </li>
              ) : (
                <li className="bg-white-700 hover:bg-gray-50 md:bg-transparent text-white block pl-3 my-2 pr-4 py-2 md:text-white-500 md:p-0 rounded">
                  <Link to="/">Home</Link>
                </li>
              )}

              <li className="text-white hover:bg-gray-50 border-b border-gray-100 my-2 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-whtie-700 md:p-0">
                <Link to="/sellNFT">List Certificate</Link>
              </li>

              {location.pathname === "/profile" ? (
                <li className="text-white hover:bg-gray-50 border-b border-gray-100 my-2 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-white-700 md:p-0">
                  <Link to="/profile">View Certificate</Link>
                </li>
              ) : (
                <li className="text-white hover:bg-gray-50 border-b border-gray-100 my-2 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-white-700 md:p-0">
                  <Link to="/profile">View Certificate</Link>
                </li>
              )}
              <li onClick={connectWebsite}>
                <button className="enableEthereumButton bg-white-500 hover:bg-pink-700 text-white font-bold px-4 rounded text-sm block pl-3 pr-4 py-2">
                  {connected ? newconnect : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

/* <nav className="w-screen">
        <ul className="flex items-end justify-between py-3 bg-transparent text-white pr-5 navv">
          <li className="flex items-end ml-5 pb-2">
            <Link to="/">
              <div className="inline-block font-bold text-xl ml-2">
                <img
                  src={fullLogo}
                  alt=""
                  width={100}
                  height={100}
                  className="inline-block -mt-2"
                />
                <span className="typeAnim">NFT Marketplace</span>
              </div>
            </Link>
          </li>
          <li className="w-1/2 nav-right">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
              {location.pathname === "/" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/">Marketplace</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/">Marketplace</Link>
                </li>
              )}
              {location.pathname === "/sellNFT" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/sellNFT">List My NFT</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/sellNFT">List My NFT</Link>
                </li>
              )}
              {location.pathname === "/profile" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/profile">Profile</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/profile">Profile</Link>
                </li>
              )}
              <li>
                <button
                  className="enableEthereumButton bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWebsite}
                >
                  {connected ? newconnect : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
     <div className="text-white text-bold text-right px-10 text-sm -mt-5">
        {currAddress !== "0x"
          ? "Connected to"
          : "Not Connected. Please login to view NFTs"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div> */
