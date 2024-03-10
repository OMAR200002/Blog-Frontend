import instance from "@/lib/api/axios";

export async function createPost(post) {
  try {
    post = {
      ...post,
      id: 0,
      tags: post.tags.map((tag) => {
        return { id: 0, name: tag };
      }),
    };

    const response = await instance.post("/posts", post, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    const error = new Error("An error occurred while creating post");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}
export async function fetchLatestPosts() {
  try {
    const response = await instance.get("/posts/latestPosts");

    let data = response.data;
    const latestPosts = [];

    for (let latestPost of data) {
      const tags = latestPost.tags.map((tag) => tag.name);
      latestPost = { ...latestPost, tags };
      latestPosts.push(latestPost);
    }

    return latestPosts;
  } catch (err) {
    const error = new Error("An error occurred while fetching latest posts");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}
export async function fetchPosts(pageNumber, searchTerm, tags) {
  let url =
    "/posts?page=" +
    pageNumber +
    "&size=6&searchTerm=" +
    searchTerm +
    "&tags=" +
    tags;

  if (tags.length !== 0) {
    url += "&tags=" + tags;
  }
  try {
    const response = await instance.get(url);

    let data = response.data.content;
    const pageNumber = response.data.pageable.pageNumber;
    const totalPages = response.data.totalPages;
    const posts = [];

    for (let post of data) {
      const tags = post.tags.map((tag) => tag.name);
      post = { ...post, tags };
      posts.push(post);
    }

    return { pageNumber: pageNumber, posts: posts, totalPages: totalPages };
  } catch (err) {
    const error = new Error("An error occurred while fetching posts");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}
export async function fetchPost(id) {
  try {
    const response = await instance.get("/posts/" + id);

    return response.data;
  } catch (err) {
    const error = new Error("An error occurred while fetching posts");
    error.code = err.response.status;
    error.info = err.response.data;
    throw error;
  }
}
