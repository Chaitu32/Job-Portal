import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import { Button,   Input, InputLabel, Link, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            logstate:false
        }

        this.onChange = this.onChange.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    onChange(event){
        this.setState({ [event.target.name ]: event.target.value})
    }

    onLogin(e){
        e.preventDefault();

        let login = false;
        const userDetails ={
            email: this.state.email,
            password: this.state.password
        }
        if(this.state.email && this.state.password){
            axios.post('http://localhost:4000/user/login',userDetails)
            .then(res => {
                alert("Success");
                this.setState({logstate:true})
            })
            .catch(err =>{
                alert("Login unsuccessful"+err)
            })
            

            this.setState({
                email:'',
                password:''
            })

            
        }
        else{
            alert("Details not entered")
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div >
                <Paper elevation={0} style={{position:"center"}}>
                    <form onSubmit={this.onLogin} >
                    <div>
                    <InputLabel >Email  :
                    </InputLabel>
                    <Input  type="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.onChange}
                            required="required"
                    />
                    </div>
                    <div>
                    <InputLabel>Password:
                    </InputLabel>
                    <Input  type="password"
                            value={this.state.password}
                            name="password"
                            onChange={this.onChange}
                            required="required"
                    />
                    </div>
                    <br />
                    <Button type="submit" color="primary" variant="contained" >Sign In</Button>
                    < br />
                    < br />
                    <Link href="/register" >Sign up</Link>
                    </form>
                </Paper>
                { this.state.logstate===true && <Redirect to="/profile" /> }
           </div>
        )
    }
}