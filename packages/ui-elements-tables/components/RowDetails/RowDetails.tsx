import React, { Component } from 'react';
import styled from 'styled-components';

export type RowDetailsProps = {
  data: DetailItem[];
};

export type DetailItem = {
  key: string;
  value: React.ReactNode;
};

const StyledDetails = styled.div`
  display:flex;
  color: ${props => props.theme.palette.text};
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  & > div {
    min-width: 24em;
    display: flex;
    flex: 0 1 auto;
    padding: .5em 20px .5em 0;
  }
  & > div > span {
    margin-right: 1em;
    min-width: 10em;
  }
  & > div > span.bold {
    min-width: 0;
    font-weight: bold;
    width: auto;
    margin: 0;
  }
  & > div:last-child {
    margin-right:auto;
  }
`;

export class RowDetails extends Component<RowDetailsProps> {
  renderDetails = () => {
    const { data } = this.props;
    return data.map((item: DetailItem, i) => {
      return (
        <div key={i}>
          <span>{item.key}</span>
          <span className="bold">{item.value}</span>
        </div>
      );
    });
  }
  render() {
    return (
      <StyledDetails>
        {this.renderDetails()}
      </StyledDetails>
    );
  }
}
