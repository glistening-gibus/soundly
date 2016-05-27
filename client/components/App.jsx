//App is our main view that contains every subview.

//this.props.children in this code makes the parent-child route relationship 
//between app and other subviews complete
//this.props.children indicates where other subviews render as route changes

//Link to is a ReactRouter method that connects to a certain url tail 
//so we can see the subviews

//App view will change eventually when we integrate our views together.


//Note: I am using stateful class for every component 
//because I am not sure if a component would have a state at a later point as we code.
//We can refactor to stateless functional class when we feel necessary.
//Question for myself: why is stateless functional better than stateful?

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
			<div>
				<h1>
				AppView
				</h1>
				<div>
				<Link to="/">Home</Link>
				</div>
				<div>
				<Link to="search">Search</Link>
				</div>
				<div>
				{this.props.children}
				</div>
			</div>
		)
	}		
}

window.App = App;


