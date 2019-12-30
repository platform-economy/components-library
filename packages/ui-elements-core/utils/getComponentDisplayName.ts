import * as React from 'react';

export const getComponentDisplayName = <P extends {}>(component: React.ComponentType<P>) => {
  return component.displayName || (component as React.ComponentClass<P>).name || 'Component';
};
