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
    selectedHost:{id:null}
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
    this.setState({
      hosts:newHosts,
      selectedHost:newSelectedHost
    })
  }
  changeHostArea = (newArea) =>{
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
            areas={this.state.areas}/>
      </Segment>
    )
  }
}

export default App;
