import { PropTypes } from 'react';
import routerAction from './action';
import createProvider from 'react-provide-props';

export default createProvider('ExecuteActionWithRouterProvider', (props, context) => ({
  executeAction: (action, payload, to) => context.executeAction(routerAction, {
    action,
    payload,
    to,
    router: context.router,
  }),
}), {
  executeAction: PropTypes.func.isRequired,
}, {
  executeAction: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
});
