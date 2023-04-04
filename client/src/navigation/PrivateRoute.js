import { useContext } from "react";
import { BrowserRouter as Route, Redirect } from "react-router-dom";
import { UserContext } from "../App";

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;