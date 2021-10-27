import { Route, Switch, Redirect, RouteComponentProps, StaticContext } from "react-router";
import { IJediRouteConfig } from "./";

export const renderRoute = (parentRoutePath: string | null, route: IJediRouteConfig, redirectTo: string) => {
  const { children, component, path, exact } = route;

  const routePath = parentRoutePath ? `${parentRoutePath}${path}` : path;
  if (!children.length) {
    return (
      <Route
        key={routePath}
        path={routePath}
        exact={exact}
        component={component as React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>}
      />
    );
  } else {
    return (
      <Switch key="parent">
        <Route
          key={path}
          path={routePath}
          exact={exact}
          component={component as React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>}
        />
        {children.map((childRoute: any) => renderRoute(routePath, childRoute, redirectTo))}
        <Redirect to={redirectTo} />
      </Switch>
    );
  }
};
