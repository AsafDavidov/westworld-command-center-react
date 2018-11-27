import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

const WestworldMap = (props) => {

  return (
    <Segment id="map" >
      {props.areas.map((area)=>{
        return <Area key={area.id} id={area.name} selectedHost={props.selectedHost} onHostClick={props.onHostClick} activeHosts={props.activeHosts}/>
      })}
    </Segment>
  )
}

export default WestworldMap
