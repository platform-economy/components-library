import * as React from 'react';
// @ts-ignore
import { withI18n } from 'react-i18next';

export interface WithI18nContextProps {
  /** Children of context decorator */
  children: React.ReactDOM;
}

const WithI18nContext = withI18n()((props: WithI18nContextProps) => (<div>{props.children}</div>));

export function withI18nContext(story: () => unknown) {
  return (
    <WithI18nContext>
      {story()}
    </WithI18nContext>
  );
}
