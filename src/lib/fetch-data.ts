async function fetchData(queryString: string) {
  try {
    const query = `query {
        ${queryString}
      }`;

    const response = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.DATOCMS_API_KEY}`,
      },
      body: JSON.stringify({
        query,
      }),
    });

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    return {
      error: "Internal Server Error",
      message: "Something went wrong",
    };
  }
}

export { fetchData };
