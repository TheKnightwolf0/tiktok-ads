import type { MusicOption } from "./Constants";


interface Props {
    option: MusicOption;
    setOption: (val: MusicOption) => void;
    musicId: string;
    setMusicId: (val: string) => void;
    error?: string;
}

const MusicSelector: React.FC<Props> = ({
    option,
    setOption,
    musicId,
    setMusicId,
    error
}) => {
    return (
        <div>
            <h4>Music Option</h4>

            <label>
                <input
                    type="radio"
                    checked={option === "existing"}
                    onChange={() => setOption("existing")}
                />
                Existing Music ID
            </label>

            <label>
                <input
                    type="radio"
                    checked={option === "upload"}
                    onChange={() => setOption("upload")}
                />
                Upload Custom Music
            </label>

            <label>
                <input
                    type="radio"
                    checked={option === "none"}
                    onChange={() => setOption("none")}
                />
                No Music
            </label>

            {(option === "existing" || option === "upload") && (
                <input
                    placeholder="Music ID"
                    value={musicId}
                    onChange={e => setMusicId(e.target.value)}
                />
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default MusicSelector;
