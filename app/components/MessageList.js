import React from 'react';

import MessageBox from '../components/MessageBox';
import StatusBox from '../components/StatusBox';

import styles from '../App.css';

export default class MessageList extends React.Component {
  render() {
    const listItems = this.props.messagelist.map((message, i) => 
          {
            if (message.type == 'message') return (
              <MessageBox key={i} text={message.text} currentuser={message.currentuser} winner={message.winner} />
            );
            else return (
              <StatusBox key={i} status={message.status} count={message.count} />
            );
          }
      );
    return (
      <div className={styles.messageList}>
        {listItems}
      </div>
    );
  }
}