import Button from "components/ui/Button/Button";
import './Form.css';

export type FormProps = {
  className?: string;
  parentRef: React.RefObject<HTMLDialogElement | null>;
  onSubmit?: (formData: FormData) => void;
  submitText?: string;
  title?: string;
  body?: string;
}

const Form = ({ parentRef, onSubmit, submitText, title, body}: FormProps) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    let formData = new FormData(form);

    onSubmit && onSubmit(formData);
    parentRef?.current?.close();
    form?.reset();
  };

  return (
    <form className='form' action='' onSubmit={handleSubmit}>
      <div className="form__inner">
        <input placeholder="Post title" required name="title" defaultValue={title || ''}/>
        <textarea placeholder="Post description" rows={6} required name="body" defaultValue={body || ''}/>
      </div>

      <Button type={"submit"}>
        {submitText || 'Accept it'}
      </Button>
    </form>
  );
};

export default Form;