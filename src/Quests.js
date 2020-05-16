import React, { Component } from 'react';
import request from 'superagent';
import './Quests.css';

export default class Quests extends Component {
    state = { quests: [] };

    componentDidMount = async() => {
        const data = await request.get('https://sleepy-earth-23861.herokuapp.com/api/quests')
        .set('Authorization', this.props.token);
        console.log(data)
        this.setState({ quests: data.body })
    }

    getClassName = (quest) => {
        if(quest.is_completed) return 'complete';
        if(!quest.is_completed) return 'incomplete';
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        
        // put the new quest onto the backend
        await request.post('https://sleepy-earth-23861.herokuapp.com/api/quests', {
            name: this.state.name,
            reward: this.state.reward
        })
        .set('Authorization', this.props.token)

        // grab the new questlist that should have the item above on it with set name and reward and other key/value pairs
        const newData = await request.get('https://sleepy-earth-23861.herokuapp.com/api/quests')
        .set('Authorization', this.props.token)

        this.setState({ quests: newData.body })
    }

    handleClick = async(id) => {
        console.log('id::::', id)
        // update the quest in backend
        await request.put(`https://sleepy-earth-23861.herokuapp.com/api/quests/${id}`)
        .set('Authorization', this.props.token)

        // get new updated list from backend
        const newData = await request.get('https://sleepy-earth-23861.herokuapp.com/api/quests')
        .set('Authorization', this.props.token)

        this.setState({ quests: newData.body })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add Name
                        <input onChange={this.handleChange} name='name' />
                    </label>
                    <label>
                        Add Reward
                        <input onChange={this.handleChange} name='reward' type='number' />
                    </label>
                    <button>Add</button>
                </form>
                <ul>
                    {
                        this.state.quests.map(quest => <li onClick={() => this.handleClick(quest.id) } className={this.getClassName(quest)} key={JSON.stringify(quest)}>
                            
                            Quest: {quest.name} -
                            Reward: {quest.reward}
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}
