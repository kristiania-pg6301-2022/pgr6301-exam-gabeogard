import { Request, Response } from "express";
import { fetchJSON } from "../misc/jsonHandler";
import fetch from "node-fetch";

interface GoogleConfig {
  response_type: string;
  authorization_endpoint: string;
  scope: string;
  userinfo_endpoint: string;
  client_id?: string;
}

export const googleConfig = async (): Promise<GoogleConfig> => {
  const discovery_endpoint = process.env.GOOGLE_ENDPOINT!;
  const client_id = process.env.GOOGLE_CLIENT_ID;
  console.warn("fetching");
  const { userinfo_endpoint, authorization_endpoint } = await fetchJSON<{
    userinfo_endpoint: string;
    authorization_endpoint: string;
  }>(discovery_endpoint);
  return {
    response_type: "token",
    authorization_endpoint,
    scope: "profile email",
    userinfo_endpoint,
    client_id,
  };
};

export const signOut = (_req: Request, res: Response) => {
  res.clearCookie("google_access_token");
  res.sendStatus(200);
};

export const setupGoogle = async (req: Request, res: Response) => {
  const config = {
    google: await googleConfig(),
  };
  const { google_access_token } = req.signedCookies;
  console.warn(
    "Fetched googleConfig",
    config,
    "accessToken",
    google_access_token,
    "signedCookies",
    req.signedCookies,
  );
  let user;
  if (google_access_token) {
    console.info("fetching user");
    user = await fetchUser(google_access_token, config.google);
    console.warn("fetchedUser", user);
  }
  res.status(200).json({
    config,
    user: { google: user },
  });
};

export const fetchUser = async (access_token: string, config: GoogleConfig) => {
  const userinfo = await fetch(config.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (userinfo.ok) {
    return await userinfo.json();
  } else {
    console.warn(`Failed to fetch token: ${userinfo.status}`);
    return undefined;
  }
};

export const signIn = (req: Request, res: Response) => {
  const { provider } = req.params;
  const { access_token = "" } = req.body; // TODO: find realistic token length
  if (access_token.length < 5) {
    return res.status(401).send("Missing or invalid access token");
  }
  console.warn("provider", provider, "body", req.body);
  res.cookie(`${provider}_access_token`, access_token, { signed: true });
  console.warn("signedCookie");
  res.sendStatus(200);
};
