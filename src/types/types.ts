interface Article {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

type State = {
  articles: Article[];
  loading?: boolean;
  error?: null | Error;
};

export type { Article, State };
