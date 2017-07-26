import React from 'react';
import styles from '../App.css';

export default class StartGameForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }

  submit(e) {
    e.preventDefault();
    let message = {
      type : 'message',
      text : this.state.text
    }
    this.props.onMessageSubmit(message);  
    this.setState({text: ''});
  }

  change(e) {
    this.setState({ text : e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submit} className={styles.form} >
        <input type="number"
               min="4"
               value={this.state.text}
               onChange={this.change}
               className={styles.input}
               placeholder="Type your number"
               required
        />
        <input type="submit" value="Start" className={styles.button} />
      </form>
    );
  }
}