import React, { Component } from 'react';
import request from 'superagent';
import './Common.css';

export default class SignUp extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = await request.post('https://sleepy-earth-23861.herokuapp.com/auth/signup', this.state)
            console.log(data.body)
            this.props.handleTokenChange(data.body.token, data.body.email);
            this.props.history.push('/quests');
        } catch {
            this.setState({ failure: 'error' })
        }

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
                {this.state.failure && <p className='error'>Email already exists</p>}
                
            </div>
        )
    }
}
