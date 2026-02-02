interface Props {
    onConnect: (code: string) => void;
}

const OAuthConnect: React.FC<Props> = ({ onConnect }) => {
    const handleConnect = () => {
        // Simulated OAuth callback
        const mockAuthCode = "valid_code";
        onConnect(mockAuthCode);
    };

    return (
        <button onClick={handleConnect}>
            Connect TikTok Ads Account
        </button>
    );
};

export default OAuthConnect;
