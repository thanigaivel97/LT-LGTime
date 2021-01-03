import React, { Component } from 'react';
import axios from 'axios';

class index extends Component {
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
            postTitle : this.state.name,   lat : this.state.lat, lon : this.state.lon
           
        }
        console.log(body)

        fetch('http://52.90.158.82:8080/posts/createPosts' , {
            method : 'POST',
            body : JSON.stringify(body),
           
           headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        }).then(results => {
            console.log(results)
            // localStorage.setItem('token', results.data.token)
        }).catch(err => {
            console.log(err)
        })



    }
    onChangeUserName = (event) => {
      
        this.setState({
            name : event.target.value
        })
    }
    render() {
        return (
            <div>
                    <div className="login">
                <div className="ui middle aligned center aligned grid">
	<div className="column">
		<form className="ui form">
			<div className="ui segment">
			<h2>Enter Details of post </h2>
				<div className="ui center aligned basic segment">
					<form className="ui form">
						<div className="field">
							<div className="ui left input">
								<input  onChange={this.onChangeUserName} type="text" name="email" placeholder="post tittle"/>
							</div>
						</div>
						<div className="field">
							<div className="ui left input">
								<input type="password" name="password" placeholder="Password"/>
							</div>
						</div>
						<button className="ui primary fluid button" onClick={e => this.signup(e)} >create Post</button>
					</form>
					<div className="ui divider"></div>
				</div>
			</div>
		
		</form>
	</div>
</div>

                
            </div>
                
                
            </div>
        );
    }
}

export default index;
