import React, {Component} from "react";
import {createRoot} from "react-dom/client";
import Counter from "@/Components/Counter";

export default class NewComponent extends Component {

    state = {
        name: 'Mike Jones',
        age: 25,
        mobile: '+2125551212',
        skills: ['php', 'react', 'mysql'],
        users: {},
        token: '',
        user: {}
    }

    handleClick = (e) => {
        let c = document.getElementById('class-comp').classList;
        console.log('class ' + c);
        $('#class-comp').toggleClass('color');
    }

    handleMouseOver = (e) => {
        console.log(e.target, e.pageX, e.pageY);
    }

    handleCopy = (e) => {
        console.log('Paragraph has been copied')
    }

    handleChangeState = () => {
        this.setState({
            name: 'John',
            age: 21,
            mobile: 111111
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    getToken = () => {
        fetch('/token', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token
                },
                body: JSON.stringify({token_name: 'auth_token'})
            }
        )
            .then(response => {
                return response.json();
            })
            .then(token => {
                this.setState({token: token});
                console.log(token);
                $('#token').val(token);
                console.log(this.state.token);
                $('#api').show();
                $('#token_result').html('Access API Now');
            });
    }

    loadUsers = () => {
        fetch('/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({users: users});
                console.log('x ' + users);
                console.log('y ' + this.state.users);
                let u = this.state.users;
                let html = "";
                for (var x in u) {
                    html += x + ". " + u[x].username+'<br>';
                }
                $('#users').html(html);
            });
    }

    getUser = () => {
        fetch('/api/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ this.state.token
            }
        })
            .then(response => {
                return response.json();
            })
            .then(user => {
                this.setState({user: user});
                console.log(user);
                $('#user').html(user.id+' : '+user.username);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name', this.state.name);
        console.log('Age', this.state.age);
        console.log('Mobile', this.state.mobile);
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div id="class-comp">
                            <h1>This is a class component</h1>
                            <p>Name {this.state.name}</p>
                            <p>Age {this.state.age}</p>
                            <p>Mobile {this.state.mobile}</p>
                            <p>Mobile {this.state.skills.join(', ')}</p>
                            <button className="btn btn-primary" type="button" onClick={this.handleClick}>Click</button>
                            <p onCopy={this.handleCopy}>This is a test paragraph here</p>
                            <button className="btn btn-primary" type="button" onClick={this.handleChangeState}>
                                Change
                                State
                            </button>

                            <button className="btn btn-primary" type="button" onClick={this.getToken}>Get Token</button>
                            <button className="btn btn-primary" type="button" onClick={this.loadUsers}>Users</button>
                            <button id="api" className="btn btn-primary" type="button" onClick={this.getUser}>API</button>
                            <div id="users"></div>

                            <form onSubmit={this.handleSubmit}>
                                Name: <input type="text" name="name" onChange={this.handleChange}/> <br/>
                                Age: <input type="text" name="age" onChange={this.handleChange}/> <br/>
                                Mobile: <input type="text" name="mobile" onChange={this.handleChange}/> <br/>
                                Token: <input type="text" id="token" disabled="disabled"/> <br/>
                                <p id="token_result"></p>
                                <div id="user"></div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

if (document.getElementById('comp')) {
    const container = document.getElementById('comp');
    const root = createRoot(container);
    root.render(<NewComponent/>);
}
