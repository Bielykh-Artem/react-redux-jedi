import React from "react";
import { Switch, Redirect, Route } from "react-router";
import { renderRoute } from "./";

export interface IJediRoutesProps {
  privateRouter?: IJediRouteConfig[];
  publicRouter?: IJediRouteConfig[];
  requireAuth?: Function;
  redirectTo: string;
  useSwitch?: boolean;
}

export interface IJediRouteConfig {
  path: string;
  exact: boolean;
  component: React.ReactNode | null;
  children: any[];
}

const JediRoutes = ({ redirectTo, privateRouter, publicRouter, requireAuth, useSwitch = true }: IJediRoutesProps) => {
  const Protected = requireAuth
    ? requireAuth(({ children }: { children: React.ReactNode }) => <>{children}</>)
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return useSwitch ? (
    <Switch>
      {publicRouter ? publicRouter.map((route) => renderRoute(null, route, redirectTo)) : null}
      <Protected>{privateRouter ? privateRouter.map((route) => renderRoute(null, route, redirectTo)) : null}</Protected>
      {redirectTo ? <Redirect to={redirectTo} /> : null}
    </Switch>
  ) : (
    <>
      {publicRouter ? publicRouter.map((route) => renderRoute(null, route, redirectTo)) : null}
      <Protected>{privateRouter ? privateRouter.map((route) => renderRoute(null, route, redirectTo)) : null}</Protected>
      {redirectTo ? <Redirect to={redirectTo} /> : null}
    </>
  );
};

export default JediRoutes;
