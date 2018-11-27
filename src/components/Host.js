import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  return(
    <Card
      className={props.selectedHost.id === props.id ? "host selected" : "host"}

      onClick={(e)=>props.onHostClick(props.id)}
      image={props.image}
      raised
    />
  )
}

export default Host

// HOST SELECTED AS A CLASS NAME... FOR WHEN SELECTED...
