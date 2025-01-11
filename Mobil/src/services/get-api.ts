export const getCourses = async () => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/courses?populate[sections][populate][chapters][populate]=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data.data);
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error(
      "There was a problem with the getCourses function:",
      error
    );
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      //   `${process.env.PUBLIC_URL}/api/categories?populate[courses][populate][sections][populate][chapters][populate]=*`
      `${process.env.PUBLIC_URL}/api/categories?populate=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data.data);
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error(
      "There was a problem with the getCategories function:",
      error
    );
  }
};

export const getFilteredCategories = async (categoryName: string) => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/categories?populate=*&filters[name][$eqi]=${categoryName}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data.data);
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error(
      "There was a problem with the getFilteredCategories function:",
      error
    );
  }
};
