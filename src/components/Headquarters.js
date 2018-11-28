import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.
  state = {
    logs:[],
    activateAll:true
  }
  updateLogs = (newLogs)=>{
    this.setState({
      logs:newLogs
    })
  }
  changeActivationAll = () =>{

    this.setState( () => {
      return{activateAll:!this.state.activateAll}
    })
  }

  render(){

    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
        <ColdStorage
            onHostClick={this.props.onHostClick}
            inActiveHosts={this.props.getInactive}
            selectedHost={this.props.selectedHost}/>

        </Grid.Column>
        <Grid.Column width={5}>
          <Details
              handleActivation={this.props.handleActivation}
              areas={this.props.areas}
              selectedHost={this.props.selectedHost}
              changeHostArea={this.props.changeHostArea} />
        </Grid.Column>
        <Grid.Column width={3}>

        <LogPanel
          readMessage={this.props.readMessage}
          updateLogs={this.updateLogs}
          logs={this.state.logs}
          message={this.props.message}
          activateAll={this.state.activateAll}
          changeActivationAll={this.changeActivationAll}
          massActivityChange={this.props.massActivityChange}/>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
