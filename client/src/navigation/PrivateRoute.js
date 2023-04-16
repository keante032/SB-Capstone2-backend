import { useContext } from "react";
import { Route, redirect } from "react-router-dom";
import { UserContext } from "../App";

function PrivateRoute({ path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return redirect("/user/login");
  }

  return (
      <Route path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;