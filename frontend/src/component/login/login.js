import React, { Component } from 'react'
import './login.css'
import axios from 'axios'


export default class login extends Component {
    constructor(props) {
        super(props)
        this.state ={ 
            name : '',
            email : '',
            password : '',
            lat : null,
            lon : null,
        }
    }
     componentDidMount() {
        let lat , lon
        navigator.geolocation.getCurrentPosition((position)  =>{
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            lat =position.coords.latitude
            lon =  position.coords.longitude
            console.log(lat,lon , "0000000000000");
            this.setState({ lat : lat, lon : lon });
        });
    }

    signup = (e) =>{
        e.preventDefault()

        console.log("enter sign")
        let body = {
           email : this.state.email,password : this.state.password ,
           
        }
        console.log(body)

        axios.post('http://52.90.158.82:8080/auth/login' , {
           body
        }).then(results => {
            console.log(results.data)
            localStorage.setItem('token', results.data.token)
        }).catch(err => {
            console.log(err)
        })



    }
    onChangeUserName = (event) => {
      
        this.setState({
            name : event.target.value
        })
    }

    onChangeEmail = (event) => {
        
        this.setState({
            email : event.target.value
        }) 
    }
    onChangePassword = (event) => {
        this.setState({
            password : event.target.value
        }) 
    }
    render() {
        return (
            <div className="login">
                <div className="ui middle aligned center aligned grid">
	<div className="column">
		<form className="ui form">
			<div className="ui segment">
				<h1><i className="connectdevelop icon"></i></h1>
			<h2>Log in to App</h2>
				<div className="ui center aligned basic segment">
					<form className="ui form">
						<div className="field">
							<div className="ui left input">
								<input onChange={this.onChangeEmail} type="text" name="email" placeholder="Email adress"/>
							</div>
						</div>
						<div className="field">
							<div className="ui left input">
								<input onChange={this.onChangePassword} type="password" name="password" placeholder="Password"/>
							</div>
						</div>
						<button className="ui primary fluid button" onClick={(e) => this.signup(e)}>Log in</button>
					</form>
					<div className="ui divider"></div>
					<a href="#">Forgot password?</a>
				</div>
			</div>
			<div className="ui segment">
				New here? <a href="/sign-up">Sign Up</a>
			</div>
		</form>
	</div>
</div>

                
            </div>
        )
    }
}
