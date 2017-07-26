import React from 'react';
import styles from '../App.css';

export default class StatusBox extends React.Component {
  render() {
    return (
      <div className={styles.statusBox}>
        {this.props.status} <br/>
        there {this.props.count > 1 ? 'are' : 'is'} {this.props.count} {this.props.count > 1 ? 'participants' : 'participant'}
      </div>
    );
  }
}