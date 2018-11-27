import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = (props) => {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  const renderSomething = () =>{
    return props.selectedHost.id === null ? <Image size='medium' src={Images.westworldLogo}/> : <HostInfo key={props.selectedHost.id}areas={props.areas} handleActivation={props.handleActivation}selectedHost={props.selectedHost} changeHostArea={props.changeHostArea} />
  }

  return(
    <Segment id="details" className="HQComps">
      {renderSomething()}
    </Segment>
  )
}

export default Details
