import instance from "@/lib/api/axios";

export async function createComment(comment) {
  try {
    const response = await instance.post("/comments", comment, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    const error = new Error("An error occurred while creating comment");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}
export async function fetchCommentsByPost(postId) {
  const url = "/comments?pageNumber=0&pageSize=5&postId=" + postId;
  try {
    const response = await instance.get(url);
    return response.data.content;
  } catch (err) {
    const error = new Error("An error occurred while fetching comments");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}
