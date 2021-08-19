import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles((theme) => ({
  
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            date:null,
            password: '',
            confirm_password: '',
            formType: '',
            open: false,
            EducationList:[{Institution_name: '',
                        start_year: '',
                        end_year: ''}],
            skill: [''],
            rating: "1",
            Contact:'',
            Bio: '',
            Login: false
        }


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeformType = this.onChangeformType.bind(this);
        this.onChangeOpen = this.onChangeOpen.bind(this);
        this.onChangeClose =this.onChangeClose.bind(this);
        this.onChangelistEduA = this.onChangelistEduA.bind(this);
        this.onChangelistEduC = this.onChangelistEduC.bind(this);
        this.onChangelistEduR = this.onChangelistEduR.bind(this);
        this.onChangelistSkillA = this.onChangelistSkillA.bind(this);
        this.onChangelistSkillC = this.onChangelistSkillC.bind(this);
        this.onChangelistSkillR = this.onChangelistSkillR.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeconf_pass = this.onChangeconf_pass.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onSubmitRec = this.onSubmitRec.bind(this);
    }

    onChangeNumber(event){
        this.setState({ Contact: event.target.value});
    }

    onChangeBio(event){
        const text = event.target.value;
        let words = text.splice(' ').filter(Boolean);
        if(words>250){
            alert("Bio exceed 250 words");
            text = text.split(" ").slice(0, -1).join(" ");
        }
        this.setState({ Bio:text});
    }

    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeRating(event,value){
        this.setState({ rating: value});
    }

    onChangePass(event){
        this.setState({ password: event.target.value });
    }

    onChangeconf_pass(event){
        this.setState({ confirm_password: event.target.value })
    }

    onChangeformType(event) {
        this.setState({ formType: event.target.value })
    }

    onChangeOpen() {
        this.setState({ open: true })
    }

    onChangeClose() {
        this.setState({ open: false })
    }

    onChangelistEduC(e,index){
        const {name ,value } = e.target
        const list = [...this.state.EducationList]
        console.log(e.target.name)
        list[index][name] = value
        this.setState({ EducationList: list})
    }

    onChangelistEduR(index){
        const list = [...this.state.EducationList]
        list.splice(index,1)
        this.setState({ EducationList: list })
    }

    onChangelistEduA(){
        this.setState({ EducationList: [...this.state.EducationList,{Institution_name: '',start_year: '',end_year:''}] })
    }

    onChangelistSkillC(e,index){
        const list = [...this.state.skill]
        list[index] = e.target.value
        this.setState({ skill: list })
    }

    onChangelistSkillA(){
        this.setState({ skill: [...this.state.skill,''] })
    }

    onChangelistSkillR(index){
        const list = [...this.state.skill]
        list.splice(index,1)
        this.setState({ skill: list})
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            date: Date.now(),
            password: this.state.password,
            jobtype: "App"
        }
        const newData = {
            name: this.state.name,
            date: Date.now(),
            Education: this.state.EducationList,
            Skill: this.state.skill,
            Rating: this.state.rating
        }
        var temp = false
         axios.post('http://localhost:4000/user/register', newUser)
              .then( res =>
                  {alert(res.data);temp = true;}
              )
              .catch(err => alert(err +"1"))
              ;

        console.log(newData)
        if(temp){
        axios.post('http://localhost:4000/Info1/Addprofile1',newData)
        .then(alert("Sucess")).catch(
            err => alert(err)
        )}

        this.setState({
            name: '',
            email: '',
            date:null,
            password: '',
            confirm_password: '',
            formType: '',
            open: false,
            EducationList:[{Institution_name: '',
                        start_year: '',
                        end_year: ''}],
            skill: [''],
            rating: 1,
            Contact:'',
            Bio: ''
        });
    }

    onSubmitRec(e){
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            date: Date.now(),
            password: this.state.password,
            jobtype: "Rec"
        }

        const newData = {
            name: this.state.name,
            date: Date.now(),
            ContactNum: this.state.Contact,
            Bio: this.state.Bio
        }

        axios.post('http://localhost:4000/user/register', newUser)
              .then(
                  axios.post('http://localhost:4000/Info2/Addprofile2',newData)
                    .then(this.setState({Login:true})).catch(
                        err => alert(err))
                  )
              .catch(err => alert(err))
              ;

        this.setState({
            name: '',
            email: '',
            date:null,
            password: '',
            confirm_password: '',
            formType: '',
            open: false,
            EducationList:[{Institution_name: '',
                        start_year: '',
                        end_year: ''}],
            skill: [''],
            rating: 1,
            Contact:'',
            Bio: ''
        })
    }

    render() {
        return (
            <div>
                {this.state.Login && <Redirect to="/profile"/>}
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               required={true}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required={true}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input  type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePass}
                                required={true}
                                />
                    </div>
                    <div className="form-group">
                        <label>Confirm-Password: </label>
                        <input  type="password"
                                className="form-control"
                                value={this.state.confirm_password}
                                onChange={this.onChangeconf_pass}
                                required={true}
                                />
                    </div>
                    <FormControl style={ {marginHorizontal:10, minWidth:120 } }>
                    <InputLabel >UserType</InputLabel>
                    <Select
                        open={this.state.open}
                        onClose={this.onChangeClose}
                        onOpen={this.onChangeOpen}
                        value={this.state.formType}
                        onChange={this.onChangeformType}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Job Applicant</MenuItem>
                    <MenuItem value={2}>Recruiter</MenuItem>
                    </Select>
                </FormControl>
                { this.state.formType==1 && <form onSubmit={this.onSubmit} >
                    <br />
                    <div className="form-group">
                        <h6><b>Education Details</b></h6>
                        <br />
                        <Grid container justify="center" spacing={2}>
                        { this.state.EducationList.map((Ed,index)=>{
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
                                            {this.state.EducationList.length!==1 && <Button variant="contained" color="secondary" className="form-control"  onClick={this.onChangelistEduR}>Remove</Button>}
                                        </Grid>
                                        <Grid item>
                                            {this.state.EducationList.length-1===index && <Button variant="contained" color="secondary" className="form-control" onClick={this.onChangelistEduA}>Add</Button>}
                                        </Grid>
                                    </Grid>
                            )}
                        )}
                        </Grid>
                    </div>
                    <div className="form-group">
                        <h6><b>Programming language skills</b></h6>
                        <br />
                        <Grid container spacing={3} justify="center">
                            { this.state.skill.map((sk,index) =>{
                                return (
                                    <Grid container item spacing={4}>
                                        <Grid item className="form-group">
                                            <label>Language:</label>
                                            <input  type="text"
                                                    className="form-control"
                                                    onChange={e => this.onChangelistSkillC(e,index)}
                                                    value={sk}
                                                    required={true}
                                            />
                                        </Grid>
                                        <Grid item>
                                            {this.state.skill.length!==1 && <Button variant="contained"  className="form-control" color="secondary" onClick={this.onChangelistSkillR}>Remove</Button>}
                                        </Grid>
                                        <Grid item>
                                            {this.state.skill.length-1===index && <Button variant="contained"  className="form-control" color="secondary" onClick={this.onChangelistSkillA}>Add</Button>}
                                        </Grid>
                                    </Grid>
                                )
                            })
                            }
                        </Grid>
                    </div>
                    <div style={{width:300}}>
                        <Typography id="disceret-slider" gutterBottom>
                            Rating
                        </Typography>
                        <Slider
                            defaultValue={0.00000005}
                            value={this.state.rating}
                            onChange={this.onChangeRating}
                            aria-labelledby="discrete-slider-small-steps"
                            step={1}
                            marks
                            min={1}
                            max={5}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary" onClick={this.onSubmit}/>
                    </div>
                </form>}
                <br />
                { this.state.formType===2 && <form onSubmit={this.onSubmitRec}>
                    <div className="form-group">
                        <label>Contact Number:</label>
                        <input  type="Number"
                                className="form-control"
                                value={this.state.Contact}
                                onChange={this.onChangeNumber}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio:</label>
                        <input  type="text"
                                value={this.state.Bio}
                                className="form-control"
                                onChange={this.onChangeBio}
                                required
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                    </form>}
                <br />
            </div>
        
        )
    }
}