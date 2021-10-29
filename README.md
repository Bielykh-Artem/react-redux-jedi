## Description:

Documentation link: [https://bielykh-artem.github.io/](https://bielykh-artem.github.io/)

## Utils:

| Method | Description  | 
| ------ | ------ |
| createActionTypes | Creates action types for actions based on a list of unique constants. |
| createActions | Created actions based on a list of unique constants. | 
| createThunkActions | Created actions based on a list of unique constants for using together with redux-thunk lib. |
| createReducer | Allows not to use switch/case inside reducers. |

## Routing:

| Method | Description  | 
| ------ | ------ |
| renderRoute | Renders a list of routes based on the config. Allow child routes. The nesting level can be any. |
| JediRoutes | The component uses renderRoute method. All routes building logic is encapsulated inside the component |

## Middlewares:

| Method | Description  | 
| ------ | ------ |
| createLoaderMiddleware | Middleware that implements functionality for tracking the process of loading data in an application. Implemented two types for loading indicator. More info in docs. |