import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'


class App extends Component {

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.
  state = {
    areas:[],
    hosts:[],
    selectedHost:{id:null},
    message:{
      newMessage:false,
      messageContent:"",
      type:""
    }
  }
  componentDidMount(){
    fetch("http://localhost:4000/areas").then(r=>r.json())
    .then(data=>{
      this.setState({
        areas: data
      })
    })

    fetch("http://localhost:4000/hosts").then(r=>r.json())
    .then(data=>{
      this.setState({
        hosts: data
      })
    })
  }
  createMessage = (content,type)=>{
    this.setState({
      message:{
        newMessage:true,
        messageContent:content,
        type:type
      }
    })
  }
  inActiveHosts = () => {
    return this.state.hosts.filter((host) => !host.active)
  }
  activeHosts = () => {
    return this.state.hosts.filter((host) => host.active)
  }
  onHostClick = (id)=>{
    const foundHost = this.state.hosts.find((host)=>host.id===id)
    this.setState({
      selectedHost: foundHost
    })
  }
  handleActivation = ()=>{
    let newHosts = this.state.hosts.map((host)=>{
      if (host.id===this.state.selectedHost.id){
        return {...host,active:!this.state.selectedHost.active}
      }else{
        return host
      }
    })
    let newSelectedHost = newHosts.find((host)=>host.id===this.state.selectedHost.id)
    if(newSelectedHost.active){
      this.setState({
        hosts:newHosts,
        selectedHost:newSelectedHost
      },this.createMessage(`Activated ${newSelectedHost.firstName}.`,"warn"))
    }else {
      this.setState({
        hosts:newHosts,
        selectedHost:newSelectedHost
      },this.createMessage(`Decomissioned ${newSelectedHost.firstName}.`,"notify"))
    }


  }
  changeHostArea = (newArea) =>{

    let currentNumHostsInNewArea = this.state.hosts.filter(host=>host.area===newArea).length
    let foundArea = this.state.areas.find(area=>area.name===newArea)
    if (currentNumHostsInNewArea===foundArea.limit){
      //createMessage
      this.createMessage(`Too many hosts. Cannot add ${this.state.selectedHost.firstName} to ${newArea.replace(/_/g, ' ').split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}`,"error")
    }else{
      let newHosts = this.state.hosts.map((host)=>{
        if (host.id===this.state.selectedHost.id){
          return {...host,area: newArea}
        }else{
          return host
        }
      })
      let newSelectedHost = newHosts.find((host)=>host.id===this.state.selectedHost.id)

      this.setState({
        hosts:newHosts,
        selectedHost:newSelectedHost
      },this.createMessage(`${newSelectedHost.firstName} set in area ${newSelectedHost.area.replace(/_/g, ' ').split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}`,"notify"))
    }

  }
  massActivityChange = (active) => {
    let newHosts = this.state.hosts.map((host)=>{
        return {...host,active:active}
    })
    if(this.state.selectedHost.id === null){
      this.setState({
        hosts:newHosts,
      },this.createMessage( active ? `Activating all hosts`:"Decommissioning all hosts", active ? "warn":"notify"))
    }else{
      let newSelectedHost = newHosts.find((host)=>host.id===this.state.selectedHost.id)
      this.setState({
        hosts:newHosts,
        selectedHost:newSelectedHost
      },this.createMessage( active ? `Activating all hosts`:"Decommissioning all hosts", active ? "warn":"notify"))
    }
  }
  readMessage= ()=>{
    this.setState({
      ...this.state,
      message:{
        newMessage:false,
        messageContent:""
      }
    })
  }
  render(){

    return (
      <Segment id='app'>
        <WestworldMap
          onHostClick={this.onHostClick}
          selectedHost={this.state.selectedHost}
          areas={this.state.areas}
          activeHosts={this.activeHosts}/>
        <Headquarters
            onHostClick={this.onHostClick}
            getInactive={this.inActiveHosts}
            selectedHost={this.state.selectedHost}
            handleActivation={this.handleActivation}
            changeHostArea={this.changeHostArea}
            areas={this.state.areas}
            message={this.state.message}
            readMessage={this.readMessage}
            massActivityChange={this.massActivityChange}/>
      </Segment>
    )
  }
}

export default App;
