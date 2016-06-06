import React from 'react';
import SearchView from './SearchView';
import ResultView from './ResultView';
import QueueView from './QueueView';
import PlayerView from './PlayerView';
import $ from 'jquery';

const socket = io();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.onClickSong = this.onClickSong.bind(this);
    this.handleChangeSong = this.handleChangeSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      socket: socket,
      master: false,
      searchResult: [],
      queue: [],
      currentSong: '',
      keyword: '',
    };
  }

  componentWillMount() {
    console.log("initialmount")
    const context = this;

    socket.on('connect', () => {
      socket.on('master', (data) => {
        console.log("i am a master",data)
        context.setState({
          master: data,
        });
      });
    });

    socket.on('queue', (data) => {
      if (data[0].length === 0) {
        this.setState({
          queue: data[0],
          currentSong: '',
        });
      } else {
        if (data[1]) {
          this.setState({
            queue: data[0],
            currentSong: data[1],
          });
        } else {
          this.setState({
            queue: data[0],
          });
        }
      }
    });
  }

  onClickSong(song) {
    // set up the state as the song that has been passed from searchResultView
    console.log("clicked");
    $.ajax({
      url: '/api/queue/addSong',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function (result) {
        if (result.length === 1) {
          socket.emit('update', result[0]);
          this.setState({
            currentSong: result[0],
            queue: result,
          });
        } else {
          socket.emit('update');
          this.setState({
            queue: result,
          });
        }
        // displaying a "song is added" message
        $('.songAdded').fadeToggle(500).fadeToggle(500);
      }.bind(this),
      error: function (xhr, status, err) {
        // displaying a "song is not added" message;
        $('.notAdded').fadeToggle(500).fadeToggle(500);
      }.bind(this),
    });
  }

  requestBuildQueryString(params) {
    const queryString = [];
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    }
    return queryString.join('&');
  }

  handleSubmit(keyword) {
    this.setState({ keyword });
    const obj = { keyword };
    $.ajax({
      url: 'http://localhost:4568/server',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: this.requestBuildQueryString(obj),
      success: function (result) {
        this.setState({
          searchResult: result.data,
        });
        // displaying a "song is added" message
        $('.songAdded').fadeToggle(500).fadeToggle(500);
      }.bind(this),
      error: function (xhr, status, err) {
        // displaying a "song is not added" message;
        $('.notAdded').fadeToggle(500).fadeToggle(500);
        console.error(status, err.toString());
      }.bind(this),
    });
  }

  handleChangeSong(song) {
    $.ajax({
      url: 'api/queue/songFinished',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function(result) {
        socket.emit('update', result[0]);
        if (result.length === 0) {
          this.setState({
            queue: result,
            currentSong: '',
          });
        } else {
          this.setState({
            queue: result,
            currentSong: result[0],
          });
        }
      }.bind(this),
      error: function (xhr, status, err) {
      }.bind(this),
    });
  }

  handleUpVote(song, i) {
    $.ajax({
      type: 'POST',
      url: '/api/queue/increaseRank',
      data: { index: i },
      success: function (result) {
        socket.emit('update');
        const tempQueue = result;
        this.setState({
          queue: tempQueue,
        });
        // upvote click animation
        $('.upvoteMsg').fadeToggle(500).fadeToggle(500);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }

  handleDownVote(song, i) {
    $.ajax({
      type: 'POST',
      url: '/api/queue/decreaseRank',
      data: { index: i },
      success: function (result) {
        socket.emit('update');
        const tempQueue = result;
        this.setState({
          queue: tempQueue,
        });
        // downvote click animation
        $('.downvoteMsg').fadeToggle(500).fadeToggle(500);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }

  render() {
    return (
      <div>
        <div>
          <SearchView
            handleSubmit={this.handleSubmit}
          />
          <ResultView
            tracks={this.state.searchResult}
            clickSong={this.onClickSong}
            keyword={this.state.keyword}
          />
        </div>
        <div>
          <QueueView
            queue={this.state.queue}
            upVote={this.handleUpVote}
            downVote={this.handleDownVote}
          />
        </div>
        <div>
          <PlayerView
            currentSong={this.state.currentSong}
            master={this.state.master}
            changeSong={this.handleChangeSong}
            queue={this.state.queue}
          />
        </div>
      </div>
		);
  }
}
