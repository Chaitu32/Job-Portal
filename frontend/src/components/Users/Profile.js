import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: '',
            sortName:true,
            profile:'',
            apps:[],
            login:false,
            name:false,
            new_name:'',
            email:false,
            new_email:'',
            Edu_list:false,
            new_Edu_list:[],
            Skill:false,
            new_skill:[],
            rating:false,
            new_rating: '',
            Contact_number:false,
            new_Contact_number:'',
            Bio:false,
            new_Bio:'',
        };

    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/profile')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(res=>(function(error) {
                console.log(error);
                console.log(res)
            }))
            if(this.state.users.role==="App"){
                axios.get('http://localhost:4000/Info1/fetchprofile1').then( res =>{
                    this.state.profile = res.data;
                    }
                ).catch(err => {alert("Unsuccessful in fetching");
                    })
            }
            console.log(this.state)
    }
    

    componentDidUpdate() {
        axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onEdit(event){
        this.setState({[event.target.name]: (!event.target.value)});
    }

    onChange(event){

    }

    onUpdate(event){
        const newData ={
            name: event.target.name,
            value: event.target.value
        }

        if(users.role ==="App"){
            axios.post('http://localhost:4000/Info1/Upprofile1',newData).then(alert("success")).catch(err => alert(err));
        }else{
            axios.post('http://localhost:4000/Info2/Upprofile2',newData).then(alert("success")).catch(err => alert(err));
        }
    }

    onChangelistEduC(e,index){
        const {name ,value } = e.target
        const list = [...this.state.profile.EducationList]
        console.log(e.target.name)
        list[index][name] = value
        this.setState({ new_Edu_list: list})
    }

    onChangelistEduR(index){
        const list = [...this.state.EducationList]
        list.splice(index,1)
        this.setState({ new_Edu_list: list })
    }

    onChangelistEduA(){
        this.setState({ profile: {...this.state.profile,EducationList:[...this.state.profile.EducationList,{Institution_name: '',start_year: '',end_year:''}]} })
    }

    onChangelistSkillC(e,index){
        const list = [...this.state.profile.skill]
        list[index] = e.target.value
        this.setState({ profile:{...this.state.profile,skill: list }})
    }

    onChangelistSkillA(){
        this.setState({ profile:{...this.state.profile,skill: [...this.state.profile.skill,''] }})
    }

    onChangelistSkillR(index){
        const list = [...this.state.skill]
        list.splice(index,1)
        this.setState({ skill: list})
    }

    render() {
        
        console.log(this.state)
        return (
            <div>
                {this.state.login && <Redirect to="/"/>}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper>
                        <Table>
                            <TableRow>
                                <TableCell>Name:</TableCell>
                                <TableCell>{this.state.profile.name}</TableCell>
                                <TableCell><Button variant="contained" color="secondary" name="name" value={this.state.name} onClick={this.onEdit}>Edit</Button></TableCell>
                            </TableRow>
                            {this.state.name && <TableRow>
                                <TableCell>new name</TableCell>
                                <TableCell><input type="String" value={this.state.new_name} name="name" onChange={this.onChange}/></TableCell>
                                <TableCell><Button variant="contained" color="secondary" name="name" value={this.state.new_name} onClick={this.onUpdate}>Update</Button></TableCell>
                                </TableRow>}
                            <TableRow>
                                <TableCell>Email:</TableCell>
                                <TableCell>{this.state.users.email}</TableCell>
                                <TableCell><Button variant="contained" color="secondary" name="email" value={this.state.email} onClick={this.onEdit}>Edit</Button></TableCell>
                            </TableRow>
                            {this.state.name && <TableRow>
                                <TableCell>new Email</TableCell>
                                <TableCell><input type="String" value={this.state.new_email} name="email" onChange={this.onChange}/></TableCell>
                                <TableCell><Button variant="contained" color="secondary" name="email" value={this.state.new_email} onClick={this.onUpdate}>Update</Button></TableCell>
                                </TableRow>}
                            {this.state.users.role==="App" && <TableRow>
                                <TableCell>Education:</TableCell>
                                <TableCell><Grid container justify="center" spacing={2}>
                        { this.state.profile.EducationList.map((Ed,index)=>{
                            return(
                                    <Grid container item  spacing={3}>
                                        <Grid item>
                                            <label>Institution Name:</label>
                                            <input  type="text"
                                                    className="form-control"
                                                    onChange={e => this.onChangelistEduC(e,index)}
                                                    name="Institution_name"
                                                    value={Ed.Institution_name}
                                                    required={true}
                                            />
                                        </Grid>
                                        <Grid item>
                                        <label>Start Year:</label>
                                        <input  type="Number"
                                                className="form-control"
                                                name="start_year"
                                                onChange={e => this.onChangelistEduC(e,index)}
                                                min={1000}
                                                max={(new Date().getFullYear())}
                                                value={Ed.start_year}
                                                required={true}
                                        />
                                        </Grid>
                                        <Grid item>
                                        <label>End Year:</label>
                                        <input  type="Number"
                                                className="form-control"
                                                name="end_year"
                                                onChange={e => this.onChangelistEduC(e,index)}
                                                min={Ed.start_year}
                                                max={9999}
                                                value={Ed.end_year}
                                        />
                                        </Grid>
                                        <Grid item>
                                            {this.state.profile.EducationList.length!==1 && <Button variant="contained" color="secondary" className="form-control"  onClick={this.onChangelistEduR}>Remove</Button>}
                                        </Grid>
                                        <Grid item>
                                            {this.state.profile.EducationList.length-1===index && <Button variant="contained" color="secondary" className="form-control" onClick={this.onChangelistEduA}>Add</Button>}
                                        </Grid>
                                    </Grid>
                            )}
                        )}
                        </Grid></TableCell>
                            </TableRow>  }
                        </Table>
                    </Paper>               
                </Grid>                
            </div>
        )
    }
}

export default Profile;