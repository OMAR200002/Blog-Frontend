import instance from "./axios";

export async function fetchTags() {
  try {
    const response = await instance.get("/tags");

    const fetchedTags = response.data.content;

    const tags = fetchedTags.map((tag) => tag.name);

    return tags;
  } catch (err) {
    const error = new Error("An error occurred while fetching tags");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}
