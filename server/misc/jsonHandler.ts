import fetch from "node-fetch";

export async function postJSON(url, object) {
    console.log("Posting to URL", url);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(object)
    })
    if (!res.ok) {
        throw new Error(`Failed to post ${res.status}: ${res.statusText}`)
    }
}

export const fetchJSON = async <T extends unknown> (url: string) => {
    console.log("Fetching from URL", url);
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return res.json() as T;
}
