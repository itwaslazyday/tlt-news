import React, { JSX } from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void,
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({ onClick, children, type="button" }: ButtonProps): JSX.Element => {

  return (
    <button
      onClick={onClick}
      className='button' 
      type={type}
    >
      {children}
    </button>
  )
}

export default Button;