import React, { Component } from "react";
import './Form.css';
import shortid from "shortid";

class Form extends Component {
    state = {
        name: '',
        surname: '',
        experiens: 'junior',
        license: false,
    }

    nameInputId = shortid.generate();
    surnameInputId = shortid.generate();

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };

    handleLicenseChange = e => {
        console.log(e.currentTarget.checked);
        this.setState({ license: e.currentTarget.checked });
    };

    reset = () => {
      this.setState({ name: '', surname: '' });
    };
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor={this.nameInputId}>
                    Ім'я
                    <br />
                    <input 
                        type="text" 
                        name="name"
                        value={this.state.name} 
                        onChange={this.handleChange}
                        id={this.nameInputId} 
                    />
                </label>
                <br />
                <label htmlFor={this.surnameInputId}>
                    Прізвище
                    <br />
                    <input 
                        type="text"
                        name="surname" 
                        value={this.state.surname} 
                        onChange={this.handleChange}
                        id={this.surnameInputId} 
                    />
                </label>

                <p>Ваш уровень:</p>
                <label>
                    <input 
                        type="radio" 
                        name="experiens" 
                        value="junior" 
                        onChange={this.handleChange} 
                        checked={this.state.experiens === 'junior'} 
                    /> Junior
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="experiens" 
                        value="middle" 
                        onChange={this.handleChange} 
                        checked={this.state.experiens === 'middle'} 
                    /> Middle
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="experiens" 
                        value="senior" 
                        onChange={this.handleChange} 
                        checked={this.state.experiens === 'senior'} 
                    /> Senior
                </label>
                <br />
                <label>
                    <input 
                        type="checkbox" 
                        name="license" 
                        checked={this.state.license} 
                        onChange={this.handleLicenseChange} 
                    />Согласен с условиями
                </label>
                <br />
                <button type="submit" disabled={!this.state.license}>Відправити</button>
          </form>
        );
    }
}

export default Form;