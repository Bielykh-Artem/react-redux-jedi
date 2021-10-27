import { Route, Switch } from "react-router";

export const renderRoute = (parentRoutePath: string | null, route: any) => {
  const { children, component, path, exact } = route;

  const routePath = parentRoutePath ? `${parentRoutePath}${path}` : path;
  if (!children.length) {
    return <Route key={routePath} path={routePath} exact={exact} component={component} />;
  } else {
    return (
      <Switch key="parent">
        <Route key={path} path={routePath} exact={exact} component={component} />
        {children.map((childRoute: any) => renderRoute(routePath, childRoute))}
      </Switch>
    );
  }
};
