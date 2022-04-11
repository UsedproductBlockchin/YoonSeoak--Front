import http from "./axios";
import store from "@/store";

export async function login(partyType, userid, password) {
  const response = await http.post("/login", {
    partyType,
    userid,
    password,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
}

export async function logout(userid) {
  const response = await http.post("/logout", {
    userid,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
}

export async function logout2(userid) {
  const response = await http.post("/logout", {
    userid,
  });

  if (response.status === 200) {
    store.commit("auth/setToken", response.data.token);
  }
}
