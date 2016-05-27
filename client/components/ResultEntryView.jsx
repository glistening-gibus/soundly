class ResultEntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


	render () {

		return (
			<div>
				{this.props.track.title}
     	</div>

		);
	}
}

window.ResultEntryView = ResultEntryView;