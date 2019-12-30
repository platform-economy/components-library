import * as React from 'react';
import styled from 'styled-components';
import { NamespacesConsumer } from 'react-i18next';

const StyledLabel = styled.label`
  display:inline;
  color: #00aaff;
  font-size: .938em;
  font-weight:bold;
  padding:6px 24px;
  text-decoration:none;

  .staticText {
    color: #000;
  }
`;

export type LabelProps = {
  /** Value to display as label text */
  title: string;

  className?: string;
};

export class Label extends React.Component<LabelProps> {
  render() {
    return (
      <NamespacesConsumer
        ns={['ui-elements']}
      >
        {
          (t) => {
            return (
              <StyledLabel
                className={this.props.className}
              >
                <span className="staticText">{t('staticLabel')}: </span>
                {this.props.title}
              </StyledLabel>
            );
          }
        }
      </NamespacesConsumer>
    );
  }
}
