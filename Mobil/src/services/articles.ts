export const fetchGetArticles = async () => {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/articles?populate=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(
      "There was a problem with the fetchArticles function:",
      error
    );
  }
};
