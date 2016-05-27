class QueueView extends React.Component {

  constructor({songs, parentFunction}) {
    this.songs = songs;
    this.parentFunction = parentFunction;
  }
  render () {
    return (
      <div className="queue-view">
      {songs.map(song => {
        return (<QueueEntryView key={song.id.scId} song={song} parentFunction={this.parentFunction}/>);
      })};
    );
  }
}

window.QueueView = QueueView;