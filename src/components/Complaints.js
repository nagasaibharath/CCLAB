import React, {Component} from 'react'
import NavBar from './NavBar'
import {Nav} from 'react-bootstrap'
import axios from 'axios'
import M from 'materialize-css';
import './../cssfiles/Complaints.css'
import Complaints_Box from './Complaints_Box'

class Complaints extends Component{
  constructor(props){
      super(props) 
      console.log(props)
      this.state = { data : []} 
  }

  componentWillMount(){
      // console.log("IN home component")
      const token = window.localStorage.getItem("cclab-token")
      if((token=="")||(token==null)){
          this.props.history.push("/")
      }
  }
  componentDidMount(){
  
  }
  ///

  // time of complaint and solved can also be added
  //logout should be written remove token and push him to home page



  logClicked = ()=>{
    axios.get('http://localhost:4000/Complaints/log').then((res) => {
      this.setState({data : res.data })
      }
    )
  }

  solvedClicked = ()=>{
    axios.get('http://localhost:4000/Complaints/solved').then((res)=>{
      this.setState({data : res.data })
    })
  }

  searchClicked = ()=>{
    var search_string = document.getElementById("search_bar").value
    axios.post('http://localhost:4000/Complaints/search',search_string).then((res)=>{
      // this.setState({data : res.data })
      console.log(res.data)
    })
    document.getElementById("search_bar").value = ""
  }

  render(){
    if(this.state.data.length == 0){
      return (<div>
        <NavBar/>
        <div className="parent"> 

          <div className="tab">
              <button id = "Log"  onClick={this.logClicked} className="tablinks" >Log</button>
              <button id = "Solved" onClick={this.solvedClicked} className="tablinks" >Solved</button>
          </div>

          <div id="search_space" className="tabcontent">

              <div className = "searchBar"> {/*float top and bottom*/}
                    <input id = "search_bar" type="text" placeholder = "Search ..."/>
                    <button type="submit" onClick = {this.searchClicked} >
                      <i className="fa fa-search fa-2x"></i>
                    </button>
              </div>

            <div className = "bottom-content">
            </div>
          </div>
        </div>
      </div>)
    }
    return (
      <div>
        <NavBar/>
        <div className="parent"> 
          <div className="tab">
              <button id = "Log"  onClick={this.logClicked} className="tablinks" >Log</button>
              <button id = "Solved"  onClick={this.solvedClicked} className="tablinks" >Solved</button>
          </div>

          <div id="search_space" className="tabcontent">

              <div className = "searchBar"> {/*float top and bottom*/}
                    <input id = "search_bar" type="text" placeholder = "Search ..."/>
                    <button type="submit" onClick = {this.searchClicked}>
                      <i className="fa fa-search fa-2x"></i>
                    </button>
              </div>

            <div className = "bottom-content">
                  {/*<Box/> Load component*/}
                  {
                    this.state.data.map(data=>(
                        <Complaints_Box props={data} key={data._id}/>
                    ))
                  }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Complaints;
