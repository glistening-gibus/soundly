//Router and Route is a ReactRouter method
//Route connects a certain url path with a specific component we have set up
//SearchResultView component becomes a child of the App component with an indentation

ReactDOM.render((
	<Router>
  	<Route path="/" component={App} >
    	<Route path="queue" component={QueueView} />
			<Route path="search" component={SearchView} />
		</Route>
	</Router>
), document.getElementById("app"));