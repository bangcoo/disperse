import { useState, useEffect, useRef, ChangeEvent, useMemo } from "react";
import { useDisconnect, useEnsName, useSwitchChain, useConfig } from "wagmi";
import { explorerAddr, networkName } from "../networks";

interface HeaderProps {
  chainId?: number;
  address?: `0x${string}`;
}

const Header = ({ chainId, address }: HeaderProps) => {
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const networkNameRef = useRef<HTMLElement>(null);
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({
    address,
    chainId: 1, // ENS names are on Ethereum mainnet
  });
  const { switchChain } = useSwitchChain();
  const config = useConfig();

  // Get all chains from wagmi config
  const chains = config.chains;

  // Format chain name to reasonable length
  const formatChainName = (name: string) => {
    return name
      .replace(" Mainnet", "")
      .replace(" Network", "")
      .replace(" Chain", "");
  };

  // Handle network name click
  const handleNetworkClick = () => {
    setIsNetworkMenuOpen(!isNetworkMenuOpen);
  };

  // Add click-away listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        networkNameRef.current &&
        !networkNameRef.current.contains(event.target as Node)
      ) {
        setIsNetworkMenuOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isNetworkMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNetworkMenuOpen]);

  // input search
  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // chains
  const filteredChains = useMemo(() => {
    return chains.filter((chain) =>
      formatChainName(chain.name).toLowerCase().includes(searchTerm)
    );
  }, [chains, searchTerm]);

  return (
    <>
      <header>
        <div className={address ? "eth active" : "eth inactive"}>
          <svg
            id="svg"
            version="1.1"
            width="50"
            height="50"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ display: "block" }}
          >
            <g id="svgg">
              <path
                id="path0"
                d="M196.423 21.530 C 195.612 23.471,171.105 64.622,141.963 112.977 C 112.821 161.331,88.735 201.528,88.437 202.304 C 88.050 203.313,103.882 213.162,143.951 236.838 L 200.008 269.960 256.049 236.820 C 296.310 213.011,311.937 203.279,311.546 202.259 C 309.521 196.981,200.545 18.000,199.356 18.000 C 198.554 18.000,197.234 19.588,196.423 21.530 M88.570 226.125 C 90.730 229.818,199.545 382.920,200.000 382.906 C 200.752 382.883,312.004 225.671,311.574 225.240 C 311.168 224.835,207.179 286.081,202.841 289.280 L 200.182 291.242 146.341 259.454 C 116.728 241.971,91.406 226.961,90.070 226.100 C 87.855 224.673,87.722 224.675,88.570 226.125 "
                stroke="none"
                fill="#cccccc"
                fillRule="evenodd"
              />
            </g>
          </svg>
        </div>
        <h1>
          disperse
          <sup ref={networkNameRef} onClick={handleNetworkClick}>
            {networkName(chainId)?.toLowerCase()}
          </sup>
          {isNetworkMenuOpen && (
            <div ref={dropdownRef} className="chain-selector-dropdown">
              <input
                type="text"
                className="chain-selector-option-input"
                placeholder="search"
                onChange={handleInputSearch}
                value={searchTerm}
              />
              <div className="chain-selector-dropdown-inner">
                {filteredChains.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => {
                      switchChain({ chainId: chain.id });
                      setIsNetworkMenuOpen(false);
                      setSearchTerm(""); // 清空搜索内容
                    }}
                    className={`chain-selector-option ${
                      chain.id === chainId ? "active" : ""
                    }`}
                  >
                    {formatChainName(chain.name)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </h1>
        <div className="expand" />
        {address && (
          <div className="network-info">
            <div>
              <a
                href={explorerAddr(address, chainId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ensName ||
                  `${address.substring(0, 6)}...${address.substring(38)}`}
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  disconnect();
                }}
              >
                disconnect
              </a>
            </div>
          </div>
        )}
      </header>
      <p>
        <em>verb</em> distribute ether or tokens to multiple addresses
      </p>
    </>
  );
};

export default Header;
