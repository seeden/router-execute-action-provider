import React, { PropTypes, Component, createElement } from 'react';
import action from './action';
import inherits from 'inherits';
import hoistNonReactStatics from 'hoist-non-react-statics';

function createComponent(CurrentComponent) {
  function Provider(...args) {
    Component.apply(this, args);

    // bind
    this.executeAction = ::this.executeAction;
  }

  inherits(Provider, Component);

  const componentName = CurrentComponent.displayName || CurrentComponent.name;
  Provider.displayName = componentName + 'ExecuteActionWithRouterProvider';
  Provider.contextTypes = {
    executeAction: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  Provider.prototype.executeAction = function executeActionMethod(action, payload, to) {
    const { router, executeAction } = this.context;
    executeAction(action, {
      action,
      payload,
      to,
      router,
    });
  };

  Provider.prototype.render = function render() {
    return createElement(CurrentComponent, {
      ...this.props,
      executeAction: this.executeAction,
    });
  };

  hoistNonReactStatics(Provider, CurrentComponent);

  return Provider;
}

export default function provide(...args) {
  // support decorator pattern
  if (args.length === 0) {
    return (ComponentToDecorate) => createComponent(ComponentToDecorate);
  }

  return createComponent.apply(null, args);
}
