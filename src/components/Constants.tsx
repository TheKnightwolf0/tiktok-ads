export type Objective = "Traffic" | "Conversions";
export type MusicOption = "existing" | "upload" | "none";

export interface ApiError {
    type: "OAUTH" | "AUTH" | "MUSIC" | "GEO";
    message: string;
}
