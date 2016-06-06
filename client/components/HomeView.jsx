// dashboard view to be used when a user navigates to our page.

import React from 'react';
import { browserHistory } from 'react-router';


const HomeView = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId =
    browserHistory.push('/room/');
  };
  return (
    <div className="hero-unit">
      <h1>Welcome to Soundly!</h1>
        <p>Join a room!</p>
        <form onSubmit={handleSubmit.bind(this)}>
            <input className="form-control" name="roomid" ref="roomid" placeholder="Room ID" />
        </form>
    </div>
  );
}

export default HomeView;