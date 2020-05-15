import React, { Component } from 'react';
import request from 'superagent';

export default class SignUp extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = await request.post('http://localhost:3001/auth/signup', this.state)
        console.log(data);

        this.props.handleTokenChange(data.body.token);
        this.props.history.push('/quests');
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email 
                        <input type='text' onChange={this.handleChange} name='email'></input>
                    </label>
                    <label>
                        Password
                        <input type='text' onChange={this.handleChange} name='password'></input>
                    </label>
                    <input type='submit'></input>
                </form>

                
            </div>
        )
    }
}
