import React, { JSX, useEffect } from 'react';
import { useState, useRef } from 'react';
import './ArticleItem.css';
import {  Link } from 'react-router-dom';
import { Article } from 'types/types';
import BinIcon from "assets/bin.svg?react";
import PencilIcon from "assets/pencil.svg?react";
import Button from 'components/ui/Button/Button';
import { useAppDispatch } from 'store/hooks';
import { deletePostThunk, patchPostThunk } from 'store/articlesSlice';
import Modal from 'components/Modal/Modal';
import Form from 'components/Forms/Form';

const ArticleItem = ({ id, title, body }: Article): JSX.Element => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const onDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const id = (e.target as HTMLElement).closest('a')?.id;
    if (id) {
      dispatch(deletePostThunk(parseInt(id)));
    }
  };

  const onChangeClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const id = (e.target as HTMLElement).closest('a')?.id;
    if (id) {
      setIsModalOpen(prev => !prev);
    }
  };

  const onSubmit = (formData: FormData) => {
    dispatch(patchPostThunk({...Object.fromEntries(formData), id} as Article));
    setIsModalOpen(prev => !prev);
  };

  const onModalClose = () => {
    setIsModalOpen(prev => !prev);
  };

  useEffect(() => {
    isModalOpen && modalRef.current?.showModal();
  }, [isModalOpen]);

  return(
    <>
      <article className='article'>
        <Link className='article__inner' id={`${id}`} to={`/article/${id}`}>
          <div className='article__content'>
            <h3 className='article__title'>{title}</h3>
            <p className='article__description'>{body}</p>
          </div>

          <div className='article__buttons'>
            <Button onClick={onDeleteClick}>
              <BinIcon className='article__bin' />
            </Button>
            <Button onClick={onChangeClick}>
              <PencilIcon className='article__change' />
            </Button>
          </div>
        </Link>
      </article>

      {
        isModalOpen && (
          <Modal
            ref={modalRef} 
            title="Change post"
            onClose={onModalClose}
          >
            <Form
              parentRef={modalRef}
              title={title}
              body={body}
              onSubmit={onSubmit}
              submitText='Change post' 
            />
          </Modal>
        )
      }
    </>

  )
}

export default ArticleItem;