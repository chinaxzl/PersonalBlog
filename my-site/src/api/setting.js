import request from "./request";


export async function getSettings() {
    return await request.get("/api/setting")
}
