import * as React from 'react';
import styled from 'styled-components';

export type GroupedInputsProps = {
  componentsLeft?: React.ReactNode;
  componentsRight?: React.ReactNode;
  labelLeft?: React.ReactNode;
  labelRight?: React.ReactNode;
  dividerRatio?: number;
};

const Separator = styled.div`
    min-height: 28px;
    border-left: solid 1px ${props => props.theme.palette.divider};
    margin: auto 1px;
`;

export const countRatio = (ratio?: number) => ratio ? `${ratio}%` : '50%';

const StyledGroup = styled.div<GroupedInputsProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
  height: auto;
  color: ${props => props.theme.palette.text};
  border: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  align-items: center;

  && label {
    word-break: normal;
    flex-grow: 0;
  }

  & label:first-child {
    width: ${props => countRatio(props.dividerRatio)};
  }

  & label:last-child {
    width: ${props => props.dividerRatio ? countRatio(100 - props.dividerRatio) : '50%'};
  }

  & input {
    box-shadow: none;
    background-color: transparent;
  }

  & div.groupBox {
    width: 100%;
    height: auto;
    padding: 0;
    display: flex;
    box-shadow: 0 1px 3px 0 ${props => props.theme.palette.shadow};
    background-color: ${props => props.theme.palette.foreground};
  }

  & .groupBox>input:first-child{
    flex-basis: ${props => props.dividerRatio ? countRatio(props.dividerRatio) : '50%'}
  }

  & .groupBox>input:last-child{
    flex-basis: ${props => props.dividerRatio ? countRatio(100 - props.dividerRatio) : '50%'}
  }

  & .groupBox>div:last-child{
    flex-basis: ${props => props.dividerRatio ? countRatio(100 - props.dividerRatio) : '50%'}
  }
`;

export class GroupedInputs extends React.Component<GroupedInputsProps> {
  render() {
    const { componentsLeft, componentsRight, labelLeft, labelRight, dividerRatio } = this.props;
    return (
      <StyledGroup dividerRatio={dividerRatio}>
        {labelLeft}
        {labelRight}
        <div className="groupBox">
            {componentsLeft}
            <Separator/>
            {componentsRight}
        </div>
      </StyledGroup>
    );
  }
}
