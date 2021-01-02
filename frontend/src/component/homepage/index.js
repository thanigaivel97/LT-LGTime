import React, { Component } from 'react'

import { Card, Icon } from 'semantic-ui-react'
import './index.css'
import { Input, Menu } from 'semantic-ui-react'


import axios from 'axios'

const styles = {
    postSize: {
        width: '600px',
        height: 'auto',
        post : []
    }

}

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: 'home' }

    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });

          console.log("enter sign")
         
          fetch('http://localhost:8080/posts/getPosts' , {
              method : 'post',
             headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
          }).then(results => {
                return results.json();
              // localStorage.setItem('token', results.data.token)
          }).then(res => {
              console.log(res.posts[0].postRealted)
              this.setState({ post : res.posts[0].postRealted });
          })
          .catch(err => {
              console.log(err)
          })
        // axios.get('http://localhost:8080/posts/getPosts').then(results => {
        //     console.log(results)
        // }).catch(err => {
        //     console.log(err)
        // })
  
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (

            <div className="">
                 <Menu secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>

            <div className="homepage">

                {this.state.post && this.state.post.map(ite => {
  return <Card style={styles.postSize}
  image='https://www.w3schools.com/images/w3schools_green.jpg'
  header={ite.postTitle}
  meta='Friend'
  description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
/>
                })}
                          

                            
                        </div>
            </div>
            
        )
    }
}
