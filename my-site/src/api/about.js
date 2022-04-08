import request from "./request";


export async function getAbouts(){
    return await request.get("/api/about");
}