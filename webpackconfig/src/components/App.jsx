import Navbar from './Navbar'
import React, { Component } from 'react'
import Greetings from './Greetings'

class App extends Component{

    render(){
        return(
          <div>
              <Navbar/>
              <Greetings/>
              {this.props.children}
          </div>
        )
    }


}

export default App;