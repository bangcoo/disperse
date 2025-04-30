import { useEffect, useState } from "react";
import { getBestRpcUrl, saveUserRpcUrl, removeUserRpcUrl } from "../rpcurl";
import { networkName } from "../networks";

interface RpcUrlInputProps {
  chainId?: number;
  onRpcChanged?: (rpcUrl: string | undefined) => void;
}

const CustomRpc: React.FC<RpcUrlInputProps> = ({ chainId, onRpcChanged }) => {
  const [rpcUrl, setRpcUrl] = useState<string>("");
  const [isCustomRpc, setIsCustomRpc] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Load RPC URL when chain ID changes
  useEffect(() => {
    if (!chainId) return;

    const bestRpc = getBestRpcUrl(chainId);
    if (bestRpc) {
      setRpcUrl(bestRpc);
      setIsCustomRpc(true);
    } else {
      setRpcUrl("");
      setIsCustomRpc(false);
    }

    setError(null);
    setIsSaved(false);
  }, [chainId]);

  const handleRpcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRpcUrl(e.target.value);
    setError(null);
    setIsSaved(false);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSaveRpc = () => {
    if (!chainId) {
      setError("No chain selected");
      return;
    }

    if (!rpcUrl.trim()) {
      removeUserRpcUrl(chainId);
      setIsCustomRpc(false);
      setIsSaved(true);
      if (onRpcChanged) onRpcChanged(undefined);
      setTimeout(() => setIsSaved(false), 3000);
      return;
    }

    if (!validateUrl(rpcUrl)) {
      setError("Invalid URL format");
      return;
    }

    saveUserRpcUrl(chainId, rpcUrl);
    setIsCustomRpc(true);
    setIsSaved(true);
    if (onRpcChanged) onRpcChanged(rpcUrl);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleClearRpc = () => {
    if (!chainId) return;

    removeUserRpcUrl(chainId);
    const predefinedRpc = getBestRpcUrl(chainId);
    setRpcUrl(predefinedRpc || "");
    setIsCustomRpc(!!predefinedRpc);
    setIsSaved(true);
    if (onRpcChanged) onRpcChanged(predefinedRpc);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!chainId) {
    return null;
  }

  return (
    <div className="rpc-url-input">
      <h3>Custom RPC URL for {networkName(chainId) || `Chain ${chainId}`}</h3>
      <div className="rpc-input-container">
        <input
          type="text"
          value={rpcUrl}
          onChange={handleRpcChange}
          placeholder="Enter custom RPC URL (https://...)"
          style={{ width: "70%" }}
        />
        <button
          onClick={handleSaveRpc}
          className="primary-button"
          style={{ marginLeft: "10px" }}
        >
          Save
        </button>
        {isCustomRpc && (
          <button
            onClick={handleClearRpc}
            className="secondary-button"
            style={{ marginLeft: "10px" }}
          >
            Reset
          </button>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      {isSaved && <div className="success-message">RPC settings updated</div>}
      <p className="info-text">
        <small>
          {isCustomRpc
            ? "Using custom RPC endpoint"
            : "Using default RPC endpoint"}
        </small>
      </p>

      <p className="info-text red">
        <small>
          Prompt: Balance not loading or tokens not displaying? This is usually
          a node connection issue. You can visit https://ankr.com to apply for
          your own node or check{" "}
          <a
            href={`https://chainlist.org/chain/${chainId}`}
            target="_blank"
          >{`https://chainlist.org/chain/${chainId}`}</a>{" "}
          to find alternative nodes.
        </small>
      </p>
    </div>
  );
};

export default CustomRpc;
