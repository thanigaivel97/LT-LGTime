import React, { Component } from 'react'
import './signup.css'
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
            name : this.state.name,email : this.state.email,password : this.state.password ,
            lat : this.state.lat , lon : this.state.lon
        }
        console.log(body)

        axios.post('http://localhost:8080/auth/signup' , {
            // method : 'post',
            // contentType : 'application/json',
           body
        }).then(results => {
            console.log(results)
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
			<h2>Sign Up to App</h2>
				<div className="ui center aligned basic segment">
					{/* <form className="ui form"> */}
                    <div className="field">
							<div className="ui left input">
								<input onChange={this.onChangeUserName} type="text" name="email" placeholder="UserName"/>
							</div>
						</div>
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
						<button className="ui primary fluid button" onClick={(e) => this.signup(e)}>Sign Up</button>
					{/* </form> */}
					<div className="ui divider"></div>
					<a href="#">Forgot password?</a>
				</div>
			</div>
			<div className="ui segment">
				Aldready Have an account ?<a href="/">Login </a>
			</div>
		</form>
	</div>
</div>

                
            </div>
        )
    }
}
