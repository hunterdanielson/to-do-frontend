import React, { Component } from 'react';
import request from 'superagent';
import './Common.css'

export default class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = await request.post('https://sleepy-earth-23861.herokuapp.com/auth/signin', this.state)
            this.props.handleTokenChange(data.body.token, data.body.email);
            this.props.history.push('/quests');
        } catch {
            this.setState({ failure: 'login failed' })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Sign In</h1>
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
                {this.state.failure && <p className='error'>Invalid email/password combo</p>}

                
            </div>
        )
    }
}
