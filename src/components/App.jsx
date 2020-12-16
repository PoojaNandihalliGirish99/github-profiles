import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'pooja',
            userData: [],
            userRepos: [],
            perPage: 5
        }
    }
    // Get user data from github
    getUserData() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({userData: data});
                console.log(data);
            }.bind(this),
            error: function (xhs, status, err) {
                this.setState({username: null})
                alert(err);
            }.bind(this)
        });

    }
    componentDidMount(){
        this.getUserData();
    }
    render() {
        return (
            <div>
                <Profile userData = {this.state.userData} />
            </div>
        )
    }
}
App.propTypes = {
    clientId: React.propTypes.string,
    clientSecret: React.propTypes.string
};
App.defaultProps = {
    clientId: 'cd44c211bb8b811a7ec9',
    clientSecret: '5a86f9f54e2687b46dfc9c45d7b3e2ff6ecf251e'
}
export default App