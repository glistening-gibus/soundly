// queue.js

//
const songQueue = [];
// N upvotes or N downvotes will necessitate a change in
// the ranking.  That threshold is set here.
const rankingChangeThreshold = 2;


// A song will look like:
// {
//  id: 1234,
//  upvotes: 2,
//  downvotes: 3,
//  rankingChange : 1
// }
// Songs will be stored in a array, using array indexing.
// Song 0 is currently playing and can not be moved due to ranking changes.
// Song 1 is next.  It will not move up based on rankingChange.
// Song 2 is after Song 1, and can not swap places with Song 1 unless its rankingChange > Song 1

const swapSongs = (i, j) => {
  const tempSong = songQueue[i];
  songQueue[i] = songQueue[j];
  songQueue[j] = tempSong;
};
// blah blah blah.  Magic.
const reRankSongs = (songIDThatChanged) => {
  const songInQueue = songQueue[songIDThatChanged];
  if (songInQueue.rankingChange >= rankingChangeThreshold) {
    if (songIDThatChanged === 2) {
      //  only swap is the rankingChange is greater than the top song
    } else if (songIDThatChanged > 2) {
      songInQueue.rankingChange = songInQueue.rankingChange - rankingChangeThreshold;
      swapSongs(songIDThatChanged, songIDThatChanged - 1);
    }
  }
};


//  Remove the first/playing song.
const removeFirstSong = new Promise(
  (resolve, reject) => {
    songQueue.shift();
  }
);

// Routes
//
module.exports.firstSongFinished = (req, res, next) => {
  removeFirstSong()
  .then(
    res.end()
  );
};

module.exports.addSongToQueue = (req, res, next) => {
  songQueue.push();
};

module.exports.increaseSongRanking = (req, res, next) => {
  const id = req.body.id;

  const songInQueue = songQueue[id];

  if (songInQueue === undefined) {
    console.log('attempt to uprank song that doesn\'t exist');
  } else {
    songInQueue.upvotes++;
    songInQueue.rankingChange++;
    reRankSongs(id);
  }
};

module.exports.decreaseSongSongRanking = (req, res, next) => {
  const id = req.body.id;

  const songInQueue = songQueue[id];

  if (songInQueue === undefined) {
    console.log('attempt to downrank song that doesn\'t exist');
  } else {
    songInQueue.upvotes--;
    songInQueue.rankingChange--;
    reRankSongs(id);
  }
};

module.exports.moveUpInQueue = (req, res, next) => {
  const id = req.body.id;
  if (id > 0 && id < songQueue.length) {
    swapSongs(id, id - 1);
  }
};

module.exports.moveDownInQueue = (req, res, next) => {
  const id = req.body.id;
  if (id >= 0 && id < songQueue.length - 1) {
    swapSongs(id, id + 1);
  }
};

module.exports.removeSongFromQueue = (req, res, next) => {
  const id = req.body.id;
  songQueue.splice(id, 1);
};
