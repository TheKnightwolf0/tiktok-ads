import type { ApiError } from "../components/Constants";


const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface OAuthTokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
}

export async function exchangeCodeForToken(
    code: string
): Promise<OAuthTokenResponse> {
    await sleep(500);

    if (code === "invalid") {
        throw {
            type: "OAUTH",
            message: "Invalid client ID or secret."
        } as ApiError;
    }

    return {
        access_token: "mock_access_token",
        expires_in: 3600,
        scope: "ads_management"
    };
}

export async function validateMusicId(musicId: string): Promise<boolean> {
    await sleep(400);

    if (musicId.startsWith("bad")) {
        throw {
            type: "MUSIC",
            message: "Music ID is invalid or rejected by TikTok."
        } as ApiError;
    }

    return true;
}

export interface SubmitAdPayload {
    campaignName: string;
    objective: string;
    adText: string;
    cta: string;
    musicId: string | null;
}

export async function submitAd(
    payload: SubmitAdPayload,
    token: string | null
): Promise<{ success: boolean }> {
    await sleep(600);

    if (!token) {
        throw {
            type: "AUTH",
            message: "OAuth token expired or revoked."
        } as ApiError;
    }

    if (payload.musicId === "geo-blocked") {
        throw {
            type: "GEO",
            message: "This feature is not available in your region."
        } as ApiError;
    }

    return { success: true };
}
