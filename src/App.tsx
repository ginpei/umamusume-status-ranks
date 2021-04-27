import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFoundScreen } from "./components/misc/NotFoundScreen";
import { HomePage } from "./components/pages/home/HomePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
