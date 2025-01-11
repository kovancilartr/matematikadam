export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      }
    );

    const data = await response.json();
    // console.log("AUTH LOGIN RESPONSE ( SERVER ):", data);

    if (response.ok) {
      return {
        success: true,
        token: data.jwt,
        user: data.user,
      };
    } else {
      return {
        success: false,
        error: data.error,
        message: "Giriş başarısız, lütfen e-posta ve şifreyi kontrol ediniz.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Something went wrong: ${error}`,
    };
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    // console.log("AUTH GET RESPONSE ( SERVER ):", data);

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
      error: error,
    };
  }
};
