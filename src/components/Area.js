import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => (

  <div className='area' id={props.id}>
    <h3 className='labels'>{props.id.replace(/_/g, ' ').split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}</h3>
    <HostList selectedHost={props.selectedHost} onHostClick={props.onHostClick} hosts={props.activeHosts().filter((host)=>host.area===props.id)} />

  </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
