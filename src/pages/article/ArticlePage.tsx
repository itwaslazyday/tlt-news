import Back from 'components/blocks/Back/Back';
import Head from 'components/blocks/Head/Head';
import Loader from 'components/ui/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { Article } from 'types/types';

const ArticlePage = () => {
  const { id } = useParams();
  const { loading, articles } = useAppSelector((state) => state.articles);
  const [ pageData, setPageData ] = useState<Article>();

  useEffect(() => {
    const article = id && articles.find((item: Article) => item.id === parseInt(id));
    article && setPageData(article);
  }, [articles]);

  return (
    <main className='main'>
      {
        loading ? 
          <Loader/> : 
          <Head
            title={pageData?.title || ''}
            subtitle={pageData?.body}
          />
      }
      <Back/>
    </main>
  )
}

export default ArticlePage;