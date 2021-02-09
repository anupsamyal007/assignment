import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import GithubSearch from './views';
const App = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={GithubSearch} />
      </Switch>
    </Router>
  )
}
export default App;