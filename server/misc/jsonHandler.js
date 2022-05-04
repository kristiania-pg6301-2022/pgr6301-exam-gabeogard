import fetch from "node-fetch";

export async function postJSON(url, object) {
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

export async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return res.json();
}
