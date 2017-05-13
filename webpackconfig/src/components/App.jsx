import Navbar from './Navbar'
import React, { Component } from 'react'

export default class App extends Component{

    render(){
        return(
          <div>
              <Navbar/>
              {this.props.children}
          </div>
        )
    }

};