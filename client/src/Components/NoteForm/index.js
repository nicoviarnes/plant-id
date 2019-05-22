import React, {Component} from "react";
import "./style.css";

class NoteForm extends Component {
    
    state = {
        title:"",
        note:""
    };

    handleChange = event => {
        let value = event.target.value;
        const name = event.target.name; 

        this.setState({
            [name]:value
        });
        console.log(value);
    };

    handleSubmit = event => {
        event.preventDefault();
        if(!this.state.title || !this.state.note){
            alert("Fill both a title and a note!")
        } else {
            alert("Submitted to Database");
            console.log(this.state.title);
            console.log(this.state.note)
        }
    }

    render(){
        return(
            <form className="note-form">
                <label>
                <p className="label">Title :</p>
                    <input 
                    type="text"
                    name="title" 
                    value={this.state.title} 
                    onChange={this.handleChange}
                    placeholder="title"
                    />
                </label>
                <br></br>
                <label>
                    <p className="label">Note :</p>
                    <textarea 
                    type="text"
                    name="note" 
                    value={this.state.note} 
                    onChange={this.handleChange}
                    placeholder="note"
                    />
                </label>
                <button onClick={this.handleSubmit}>Save</button>

            </form>

        )
    }
}

export default NoteForm;