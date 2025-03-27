import { createPortal } from "react-dom";
import React, { forwardRef } from "react";
import CloseIcon from "assets/close.svg?react";
import "./Modal.css";

type ModalProps = {
  title: string;
  children?: React.ReactNode;
  onClose?: () => void
};

export default forwardRef(function Modal({ title, children, onClose }: ModalProps, ref: React.ForwardedRef<HTMLDialogElement>) {
  const handleCloseClick = () => {
    (ref as React.RefObject<HTMLDialogElement>)?.current?.close();
  };

  return createPortal(
    <dialog
      className="modal"
      ref={ref}
      onClose={onClose}
    >
      {title && <h4 className="modal__title">{title}</h4>}
      {children}
      <button className="modal__close" onClick={handleCloseClick}>
        <CloseIcon/>
      </button>
    </dialog>,
    document.getElementById("modal")!
  );
});
