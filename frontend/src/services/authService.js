const BACKEND_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();

    if (json.token) {
      localStorage.setItem("token", json.token);
      return json;
    }

    if (json.error) {
      throw new Error(json.error);
    }
  } catch (err) {
    return { error: err.message };
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.token) {
      localStorage.setItem("token", json.token);
      const user = JSON.parse(atob(json.token.split(".")[1]));
      return user;
    }
  } catch (err) {
    return { error: err.message };
  }
};

// decodes the payload part of the JWT and return the username of the User
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

const signout = () => {
  localStorage.removeItem("token");
};

export { signup, signin, getUser, signout };
