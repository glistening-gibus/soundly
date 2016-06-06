import React from 'react';
import QueueEntryView from './QueueEntryView.jsx';

const QueueView = (props) => {
  const queue = props.queue;
  const upvoteArt = '/styles/imgs/upvote.png';
  const downvoteArt = '/styles/imgs/downvote.png';

  console.log('current queue =>', queue);
  return (
    <div>
      <img className="upvoteMsg" src={upvoteArt} alt="upvoteMsg" />
      <img className="downvoteMsg" src={downvoteArt} alt="downvoteMsg" />
      <div className="queueBox">
        {queue.map((song, i) =>
          <QueueEntryView
            key={i}
            index={i}
            song={song}
            upVote={props.upVote}
            downVote={props.downVote}
          />
          )}
      </div>
    </div>
  );
};

export default QueueView;
