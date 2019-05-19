import React, {Component} from 'react';
import axios from 'axios';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            username: 'undefined',
        }
    }

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(response => {
            if (response.data.data !== undefined) {
                this.setState({
                    username: response.data.data.username,
                })
            } else {
                this.setState({
                    username: undefined,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.username === 'undefined') {
            return(
                <div>Loading...</div>
            )
        }
        if (this.state.username === undefined) {
            return (
                <div>Login Please</div>
            )
        }
        return(
            <div>
                Welcome {this.state.username}
            </div>
        )
    }
}

export default MainPage;