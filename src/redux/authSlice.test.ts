import authReducer, { setToken, logout } from "./authSlice";

describe("authSlice", () => {
  const initialState = {
    token: null,
    loggedIn: false,
  };

  it("should return the initial state when passed an empty action", () => {
    const result = authReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should handle setToken with a valid token", () => {
    const token = "test-token";
    const action = setToken(token);
    const result = authReducer(initialState, action);

    expect(result).toEqual({
      token: "test-token",
      loggedIn: true,
    });
  });

  it("should handle logout", () => {
    const currentState = {
      token: "some-token",
      loggedIn: true,
    };
    const action = logout();
    const result = authReducer(currentState, action);

    expect(result).toEqual(initialState);
  });
});
