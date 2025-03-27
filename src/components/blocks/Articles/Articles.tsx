import { JSX } from 'react';
import { Article } from 'types/types';
import ArticleItem from 'components/blocks/ArticleItem/ArticleItem';
import './Articles.css';

type ArticlesProps = {
  articles: Article[];
};

const Articles = ({ articles }: ArticlesProps): JSX.Element => {

  const items = articles.map((article) => (
    <li key={article.id} className='articles__item'>
      <ArticleItem {...article}/>
    </li>
  ));

  return (
    <section className='articles container'>
      <ul className="articles__list">{items}</ul>
    </section>
  )
}

export default Articles;