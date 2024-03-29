import request from "supertest";
import app from "../app";

const mockResponse = {
  userinfo_endpoint: "userinfo_endpoint",
  authorization_endpoint: "authorization_endpoint",
};

jest.mock("../misc/jsonHandler", () => ({
  fetchJSON: (_url: string) => Promise.resolve(mockResponse),
}));
jest.mock("./loginController", () => ({
  ...jest.requireActual("./loginController"),
  fetchUser: (_token, _config) => Promise.resolve({ user: "mockUser" }),
}));

describe("Login Controller", () => {
  it("should call google to fetch config", (done) => {
    request(app)
      .get("/api/login/")
      .set({
        Accept: "application/json",
      })
      .then((response) => {
        expect(response.body).toEqual({
          config: {
            google: {
              response_type: "token",
              authorization_endpoint: "authorization_endpoint",
              scope: "profile email",
              userinfo_endpoint: "userinfo_endpoint",
              client_id: "client_id",
            },
          },
          user: {},
        });
        done();
      });
  });

  it("post login google should respond with bad request if no body", (done) => {
    request(app)
      .post("/api/login/google")
      .send({})
      .set({
        Accept: "application/json",
      })
      .expect(401, done);
  });
});
