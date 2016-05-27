//App is our main view that contains every subview.

//Note: I am using stateful class for every component 
//because I am not sure if a component would have a state at a later point as we code.
//We can refactor to stateless functional class when we feel necessary.
//Question for myself: why is stateless functional better than stateful?

class App extends React.Component {
  constructor(props) {
    super(props);
    //TODO: need to pass this state to queueView
    this.state = {
    	clickedSong: ''
    }
  }

  onClickSong (song) {
  	//set up the state as the song that has been passed from searchResultView
  	console.log(song);
  	this.setState({
  		clickedSong: song
  	})
  	console.log(this.state.clickedSong)
  }

  render() {
  	return (
			<div>
				<h1>
				AppView
				</h1>
				<div>
				<SearchResultView clickSong={this.onClickSong.bind(this)}/>
				</div>
			</div>
		)
	}		
}

window.App = App;


