import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/AppHeader.jsx';
import MessageList from './components/MessageList.jsx';
import StartGameForm from './components/StartGameForm.jsx';

import styles from './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {messages: [], userid: 0, users: 0};
    this.userAccept = this.userAccept.bind(this);
    this.userJoin = this.userJoin.bind(this);
    this.userLeft = this.userLeft.bind(this);
    this.messageReceive = this.messageReceive.bind(this);
    this.messageSend = this.messageSend.bind(this);
    this.gameStart = this.gameStart.bind(this);
  }

  componentDidMount() {
    this.socket.emit('user:request');
    this.socket.on('user:accept', this.userAccept);
    this.socket.on('user:join', this.userJoin);
    this.socket.on('user:left', this.userLeft);
    this.socket.on('send:message', this.messageReceive);
  }

  componentWillUnmount() {
    this.socket.emit('user:left');
  }

  userAccept(msg) {
    this.setState({userid: msg.id});
    this.setState({users: msg.users});
    this.state.messages.push({
      'type': 'status',
      'status': 'you joined',
      'count': msg.users
    });
    this.setState({messages: this.state.messages});
  }

  userJoin() {
    this.setState((prevState, props) => ({users: prevState.users + 1}));
    this.state.messages.push({
      'type': 'status',
      'status': 'someone joined',
      'count': this.state.users
    });
    this.setState({messages: this.state.messages});
  }

  userLeft() {
    this.setState((prevState, props) => ({users: prevState.users - 1}));
    this.state.messages.push({
      'type': 'status',
      'status': 'someone left',
      'count': this.state.users
    });
    this.setState( {messages: this.state.messages} );
  }

  messageReceive(msg) {
    msg.currentuser = msg.user == this.state.userid;
    if (msg.newGame == true) {
      this.state.messages = [];
      msg.newGame = false;
    }
    this.state.messages.push(msg);
    this.setState({messages: this.state.messages});
    window.scrollTo(0, document.body.scrollHeight);

    if (!msg.currentuser && msg.text != 1) {
      this.sendGameMessage(msg);
    }
  }

  sendGameMessage(msg) {
    let retMsg = {};
    for (let attr in msg) {
      if (msg.hasOwnProperty(attr)) retMsg[attr] = msg[attr];
    }

    // Math.round is added to avoid the problem of large numbers that have
    // no neighbors divisible by 3. eg 12318777601077760
    let modulo = Math.round(retMsg.text % 3);

    if (modulo === 1) {
      retMsg.text--;
    }
    else if (modulo === 2) {
      retMsg.text++;
    }
    retMsg.text /= 3;

    if (retMsg.text === 1) {
      retMsg.winner = true;
    }

    this.messageSend(retMsg);
  }

  messageSend(msg) {
    msg.currentuser = true;
    msg.user = this.state.userid;
    this.socket.emit('send:message', msg);
  }

  gameStart(msg) {
    this.setState({messages: []});
    msg.newGame = true;
    this.messageSend(msg);
  }

  render() {
    return (
      <div className={styles.app}>
        <AppHeader title = "Game of Three" />
        <MessageList messagelist = {this.state.messages} />
        <StartGameForm onMessageSubmit = {this.gameStart} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app-root'));
