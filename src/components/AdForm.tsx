import { useState } from "react";
import { validateMusicId, submitAd } from "../api/tiktokApi";
import MusicSelector from "./MusicSelector";
import type { MusicOption, Objective } from "./Constants";

interface Props {
    token: string | null;
    setGlobalError: (msg: string) => void;
}

interface FormState {
    campaignName: string;
    objective: Objective;
    adText: string;
    cta: string;
}

const AdForm: React.FC<Props> = ({ token, setGlobalError }) => {
    const [form, setForm] = useState<FormState>({
        campaignName: "",
        objective: "Traffic",
        adText: "",
        cta: ""
    });

    const [musicOption, setMusicOption] = useState<MusicOption>("existing");
    const [musicId, setMusicId] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = async (): Promise<boolean> => {
        const e: Record<string, string> = {};

        if (form.campaignName.length < 3)
            e.campaignName = "Campaign name must be at least 3 characters.";

        if (!form.adText || form.adText.length > 100)
            e.adText = "Ad text is required (max 100 characters).";

        if (!form.cta) e.cta = "CTA is required.";

        if (musicOption === "none" && form.objective === "Conversions") {
            e.music = "Music is mandatory for Conversion campaigns.";
        }

        if (musicOption !== "none") {
            try {
                await validateMusicId(musicId);
            } catch (err: any) {
                e.music = err.message;
            }
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
        setGlobalError("");

        if (!(await validate())) return;

        try {
            await submitAd(
                {
                    ...form,
                    musicId: musicOption === "none" ? null : musicId
                },
                token
            );

            alert("Ad created successfully 🎉");
        } catch (err: any) {
            setGlobalError(err.message);
        }
    };

    return (
        <div>
            <input
                placeholder="Campaign Name"
                onChange={e => setForm({ ...form, campaignName: e.target.value })}
            />
            {errors.campaignName && <p>{errors.campaignName}</p>}

            <select
                value={form.objective}
                onChange={e =>
                    setForm({ ...form, objective: e.target.value as Objective })
                }
            >
                <option value="Traffic">Traffic</option>
                <option value="Conversions">Conversions</option>
            </select>

            <textarea
                placeholder="Ad Text"
                onChange={e => setForm({ ...form, adText: e.target.value })}
            />
            {errors.adText && <p>{errors.adText}</p>}

            <input
                placeholder="CTA"
                onChange={e => setForm({ ...form, cta: e.target.value })}
            />

            <MusicSelector
                option={musicOption}
                setOption={setMusicOption}
                musicId={musicId}
                setMusicId={setMusicId}
                error={errors.music}
            />

            <button onClick={handleSubmit}>Submit Ad</button>
        </div>
    );
};

export default AdForm;
