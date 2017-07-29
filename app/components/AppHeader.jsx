import React from 'react';
import styles from '../App.css';

export default class AppHeader extends React.Component {
  render() {
    return (
      <div className={styles.heading}>{this.props.title}</div>
    );
  }
}