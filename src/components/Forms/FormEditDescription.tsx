import React, { useState, ChangeEvent, FormEvent } from 'react';

import { updateEventDescription } from '../../services/eventApi';

interface FormEditDescriptionProps {
  event_id: string;
  event_description: string;
}

const FormEditDescription: React.FC<FormEditDescriptionProps> = ({
  event_id,
  event_description,
}) => {
  const [description, setDescription] = useState<string>(event_description);
  const [inputHidden, setInputHidden] = useState<boolean>(true);

  const toggleInput = (): void => {
    setInputHidden(!inputHidden);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    updateEventDescription(event_id, description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type='button' className='edit-data-button' onClick={toggleInput}>
        Edit
      </button>
      <br />
      <div className={inputHidden ? 'hidden' : ''}>
        <input id='datainput' onChange={handleChange} value={description} />
        <button type='submit' id='databutton'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormEditDescription;
