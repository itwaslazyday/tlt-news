import { JSX, useState, useEffect } from 'react';
import Search from 'components/blocks/Search/Search';
import Articles from 'components/blocks/Articles/Articles';
import Head from 'components/blocks/Head/Head';
import Loader from 'components/ui/Loader/Loader';
import Stub from 'components/blocks/Stub/Stub';

import { fetchArticles } from 'store/articlesSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSearchReset, resetSearch] = useState(false);

  const { error, loading, articles } = useAppSelector((state) => state.articles);
  const [articlesState, setArticlesState] = useState(articles);

  useEffect(() => {
    !articles.length && dispatch(fetchArticles());
  }, []);

  useEffect(() => {
    setArticlesState(articles);
  }, [articles]);

  const handleSearch = (value: string) => {
    if (value) {
      const filtered = articles.filter(({ title, body }) => title.toLowerCase().includes(value) || body.toLowerCase().includes(value));
      setArticlesState(filtered.length ? filtered : []);
    } else {
      setArticlesState(articles);
    }
  };

  const handleReset = () => {
    setArticlesState(articles);
    resetSearch((prev) => !prev);
  }

  if (error) {
    return (<p>{error.message}</p>);
  } else if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <main className='main'>
      <Head title='Recent posts' addPost={true}/>
      <Search
        handleSearch={handleSearch}
        resultLength={articlesState.length}
        isSearchReset={isSearchReset}
      />
      <Articles articles={articlesState}/>
      {
        !articlesState.length && <Stub onClick={handleReset}/>
      }
    </main>
  );
}
