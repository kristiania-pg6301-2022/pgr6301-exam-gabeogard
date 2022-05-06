import { postJSON, fetchJSON } from "./jsonHandler";

mockResponse = { ok: false, status: 400, statusText: "Bad request" };
global.fetch = (url, options) => jest.fn(() => mockResponse);
describe("jsonHandler", () => {
  it("postJSON should throw error if res is not ok", () => {
    expect(postJSON("/api/", {})).rejects.toThrowError("Failed to post");
  });

  it("fetchJSON should throw error if res is not ok", () => {
    expect(fetchJSON("/api/")).rejects.toThrowError("Failed to fetch");
  });
});
