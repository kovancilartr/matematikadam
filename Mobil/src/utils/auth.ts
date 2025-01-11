import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        token: data.jwt,
      };
    } else {
      return {
        success: false,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
          username: username,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        token: data.jwt,
      };
    } else {
      return {
        success: false,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/users/me?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    return {
      success: true,
      message: "Çıkış yaptınız",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
