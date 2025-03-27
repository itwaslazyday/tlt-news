import React, { JSX } from 'react';
import './Back.css';
import { Link } from 'react-router-dom';
import { AppRoute } from 'const';
import ArrowIcon from "assets/arrow.svg?react";

type BackProps = {
  children?: React.ReactNode;
};

const Back = ({ children }: BackProps ): JSX.Element => {

  return (
    <section className='back container'>
      <Link className='back__link' to={AppRoute.Main}><ArrowIcon /> Back</Link>
      {children}
    </section>
  )
}

export default React.memo(Back);