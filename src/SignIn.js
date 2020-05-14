import React, { Component } from 'react';
import request from 'superagent';

export default class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = await request.post('http://localhost:3001/auth/signin', this.state)
        console.log(data);

        this.props.handleTokenChange(data.body.token);
        this.props.history.push('/todos');
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Sign Ip</h1>
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
