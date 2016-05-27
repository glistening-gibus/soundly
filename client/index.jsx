//Router and Route is a ReactRouter method
//Route connects a certain url path with a specific component we have set up
//SearchResultView component becomes a child of the App component with an indentation
//So even if you go to /search, App view does not disappear.
//Check App.jsx as there is more to be done to set up this parent-child route relationship

ReactDOM.render((
	<Router>
		<Route path="/" component={App}>
			<Route path="search" component={SearchResultView} />	
		</Route>	
	</Router>
), document.getElementById("app"));