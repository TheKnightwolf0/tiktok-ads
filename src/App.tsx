import { useState } from "react";
import OAuthConnect from "./components/OAuthConnect";
import AdForm from "./components/AdForm";
import ErrorBanner from "./components/ErrorBanner";
import { exchangeCodeForToken } from "./api/tiktokApi";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [error, setError] = useState<string>("");

  const handleOAuth = async (code: string) => {
    try {
      const res = await exchangeCodeForToken(code);
      localStorage.setItem("token", res.access_token);
      setToken(res.access_token);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>TikTok Ads Creative Flow</h2>

        <ErrorBanner message={error} />

        {!token ? (
          <OAuthConnect onConnect={handleOAuth} />
        ) : (
          <AdForm token={token} setGlobalError={setError} />
        )}
      </div>
    </div>
  );

};

export default App;
