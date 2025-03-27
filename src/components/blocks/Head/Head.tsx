import React, { JSX } from 'react';
import './Head.css';
import Button from 'components/ui/Button/Button';
import Modal from 'components/Modal/Modal';
import Form from 'components/Forms/Form';
import { useAppDispatch } from "store/hooks";
import { addPostThunk } from "store/articlesSlice";

type HeadProps = {
  title: string;
  subtitle?: string;
  addPost?: boolean;
};

const Head = ({ title, subtitle, addPost }: HeadProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const modalRef = React.useRef<HTMLDialogElement>(null);
  const onPostAdd = () => {
    modalRef.current?.showModal();
  };

  const onSubmit = (formData: FormData) => {
    dispatch(addPostThunk(Object.fromEntries(formData)));
  };

  return (
    <section className='head container'>
      
      <div className='head__inner'>
        <h1 className='head__title'>{title}</h1>
        { addPost && <Button onClick={onPostAdd}>+ Add post</Button> }
      </div>
      { subtitle && <p className='head__subtitle'>{subtitle}</p> }

      <Modal ref={modalRef} title="Add new post">
        <Form
          parentRef={modalRef}
          onSubmit={onSubmit} 
        />
      </Modal>
      
    </section>
  )
}

export default React.memo(Head);