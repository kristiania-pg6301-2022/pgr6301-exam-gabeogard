import { postJSON, fetchJSON } from "./jsonHandler";

let mockResponse;
jest.mock("node-fetch", () => (url: string, options: any) => mockResponse);

describe("jsonHandler", () => {
  it("postJSON should throw error if res is not ok", () => {
    mockResponse = { ok: false, status: 400, statusText: "Bad request" };
    expect(postJSON("/api/", {})).rejects.toThrowError("Failed to post");
  });

  it("fetchJSON should throw error if res is not ok", () => {
    mockResponse = { ok: false, status: 400, statusText: "Bad request" };
    expect(fetchJSON("/api/")).rejects.toThrowError("Failed to fetch");
  });
});
