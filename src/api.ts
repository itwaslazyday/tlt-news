import { Article } from "types/types";

const baseURL = "https://jsonplaceholder.typicode.com/posts";
const searchParams = new URLSearchParams({
  _limit: "20",
});

const getArticles = async () => {
  return await fetch(`${baseURL}?${searchParams.toString()}`);
};

const fetchArticle = async (data: Article) => {
  const response = await fetch(`${baseURL}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return response;
};

const deleteArticle = async (id: number) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });

  return response;
};

const patchArticle = async (data: Article) => {
  const response = await fetch(`${baseURL}/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return response;
};

export { getArticles, fetchArticle, deleteArticle, patchArticle };
