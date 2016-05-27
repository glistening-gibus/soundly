class ResultEntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleClick(e) {
		e.preventDefault();
		this.props.clickSong(this.props.track);
  }

	render () {

		return (
			<div onClick={this.handleClick.bind(this)}>
				{this.props.track.title}
     	</div>

		);
	}
}

window.ResultEntryView = ResultEntryView;