import React from 'react';
import styles from '../App.css';

export default class MessageBox extends React.Component {
  render() {
    if (this.props.currentuser == true) {
      if (this.props.winner) {
        return (
          <div className={styles.userMessage}>
            <div className={styles.userText}> {this.props.text}: You are a winner!!! </div>
          </div>
        );
      }
      return (
        <div className={styles.userMessage}>
          <div className={styles.userText}> {this.props.text} </div>
        </div>
      );
    }
    else {
      if (this.props.winner) {
        return (
          <div className={styles.opponentMessage}>
            <div className={styles.messageText}> {this.props.text}: Opponent won this game... </div>
          </div>
        );
      }
      return (
        <div className={styles.opponentMessage}>
          <div className={styles.messageText}> {this.props.text} </div>
        </div>
      );
    }
  }
}