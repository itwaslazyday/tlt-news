import { JSX } from 'react';
import Button from 'components/ui/Button/Button';
import './Stub.css';

type StubProps = {
  onClick: () => void;
};

const Stub = ({ onClick }: StubProps): JSX.Element => {
  return (
    <div className='stub'>
      <p className='stub__text'>Your search did not match any results</p>
      <Button onClick={onClick}>Reset</Button>
    </div>
  )
}

export default Stub;