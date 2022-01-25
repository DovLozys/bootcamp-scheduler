import React, {useState} from "react";
import "./FormEditDescription.css";
import updateDescription from "../../services/EventApi";

function FormEditDescription(props) {
    const [description, setDescription] = useState(props.event_description);
    const [inputHidden, setInputHidden] = useState(true);

    function toggleInput() {
        setInputHidden(!inputHidden);
    }
    
    function handleChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateDescription(props.event_id, description);
    }

    return(
        <form onSubmit={handleSubmit}>
            <button type="button" className="edit-data-button" onClick={toggleInput}>Edit</button>
            <br />
            <div className={inputHidden ? "hidden" : ""}>
                <input id="datainput" onChange={handleChange} value={description} />
                <button type="submit" id="databutton">Submit</button>
            </div>
        </form>
    );
}

export default FormEditDescription;
