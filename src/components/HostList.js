import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {

  return(
    <Card.Group itemsPerRow={6}>
      {props.hosts.map((host) =>{
        return <Host onHostClick={props.onHostClick} image={host.imageUrl} key={host.id} id={host.id} selectedHost = {props.selectedHost}/>
      })}
    </Card.Group>
  )
}

export default HostList
