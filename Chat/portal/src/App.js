
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    isOpen: false,
    inputMessage: '',
    conversation: []
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ inputMessage: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { inputMessage, conversation } = this.state;

    try {
      const response = await axios.post('http://127.0.0.1:9876/ask', { "query": inputMessage });
      console.log(response)
      const updatedConversation = [
        ...conversation,
        { speaker: 'user', message: inputMessage },
        { speaker: 'bot', message: response.data.response.answer || 'Sorry, I did not understand that' }
      ];
      this.setState({ conversation: updatedConversation, inputMessage: '' });
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  render() {
    const { inputMessage, conversation } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <p>Hello there! How may I help you?</p>
            <div className="chat-popup">
              <div className="chat-area">
                {conversation.map((entry, index) => (
                  <p key={index} className={entry.speaker}>
                    {entry.message}
                  </p>
                ))}
              </div>
              <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Type a message" value={inputMessage} onChange={this.handleInputChange} />
                <button type="submit">Send</button>
              </form>
            </div>
        </header>
      </div>
    );
  }
}

export default App;