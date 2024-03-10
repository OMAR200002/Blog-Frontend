import instance from "@/lib/api/axios";

export async function authenticateUser(loginData) {
  try {
    const response = await instance.post("/authenticate", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data["id_token"];
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    const error = new Error("An error occurred while authenticating user");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}

export async function registerAccount(account) {
  try {
    const response = await instance.post("/register", account, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    const error = new Error("An error occurred while authenticating user");
    error.code = err.response.status;
    error.info = {
      title: err.response.data.title,
      detail: err.response.data.detail,
    };
    throw error;
  }
}
export async function requestPasswordReset(email) {
  try {
    const response = await instance.post(
      "/account/reset-password/init",
      email,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (err) {
    const error = new Error("An error occurred while authenticating user");
    error.code = err.response.status;
    error.info = {
      title: err.response.data.title,
      detail: err.response.data.detail,
    };
    throw error;
  }
}
export async function finishPasswordReset(keyAndPassword) {
  try {
    const response = await instance.post(
      "/account/reset-password/finish",
      keyAndPassword,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (err) {
    const error = new Error("An error occurred while authenticating user");
    error.code = err.response.status;
    error.info = {
      title: err.response.data.title,
      detail: err.response.data.detail,
    };
    throw error;
  }
}
