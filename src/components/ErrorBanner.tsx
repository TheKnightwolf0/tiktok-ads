interface Props {
    message?: string;
}

const ErrorBanner: React.FC<Props> = ({ message }) => {
    if (!message) return null;

    return <div className="banner-error">{message}</div>;
};

export default ErrorBanner;
