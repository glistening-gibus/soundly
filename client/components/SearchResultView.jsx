//SearchResultView is a parent view of SearchView and ResultView
//This view manages the data flow between SearchView and ResultView

class SearchResultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	tracks: [] 	
    }
  }

  handleGetTracks (tracks) {
  	this.setState({tracks: tracks});
  }

	render () {
		return (
			<div>
				<SearchView getTracks={this.handleGetTracks.bind(this)}/>
				<ResultView tracks={this.state.tracks} clickSong={this.props.clickSong}/>
     	</div>

		);
	}
}

window.SearchResultView = SearchResultView;