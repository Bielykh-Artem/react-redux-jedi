import { Route, Switch } from "react-router";

export const renderRoute = (parentRoutePath: string | null, route: any) => {
  const { children, component, path, exact } = route;

  if (!children.length) {
    return (
      <Route
        key={path}
        path={parentRoutePath ? `${parentRoutePath}${path}` : path}
        exact={exact}
        component={component}
      />
    );
  } else {
    return (
      <Switch key="parent">
        <Route
          key={path}
          path={parentRoutePath ? `${parentRoutePath}${path}` : path}
          exact={exact}
          component={component}
        />
        {children.map((childRoute: any) => renderRoute(path, childRoute))}
      </Switch>
    );
  }
};
