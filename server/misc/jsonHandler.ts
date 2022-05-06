import fetch from "node-fetch";

export const postJSON = async (url: string, object: unknown) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
};

export const fetchJSON = async <T extends unknown>(url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${res.status}: ${res.statusText}`);
  }
  return res.json() as T;
};
