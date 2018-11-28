import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = (props) => {

  const dummyLogs = () => {

    let logs = [...props.logs]
    if (!!props.message && props.message.newMessage){
      if (props.message.type==="warn"){
        logs.unshift(Log.warn(props.message.messageContent))
      }else if (props.message.type==="notify") {
        logs.unshift(Log.notify(props.message.messageContent))
      }else if (props.message.type==="error"){
        logs.unshift(Log.error(props.message.messageContent))
      }
      props.readMessage()
      props.updateLogs(logs)
    }
    return logs
  }

  const handleActivationAll = () => {
    props.massActivityChange(props.activateAll)
    props.changeActivationAll()
  }

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {dummyLogs().map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>

      <Button
        fluid
        color={props.activateAll ? "red" : "green"}
        content={props.activateAll ? "ACTIVATE ALL" : "DECOMMISSION ALL"}
        onClick={handleActivationAll}

      />
    </Segment>
  )
}

export default LogPanel
//{/* This isn't always going to be the same color...*/}
//{/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
