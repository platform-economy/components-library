import * as React from 'react';
import styled from 'styled-components';
// import classNames from 'classnames';

import { TagType } from '@relayr/ui-elements-basic/components/Tag';
import { TagsContext, TagsContextProps } from './TagsContextWrapper';
import { Spinner } from '@relayr/ui-elements-skeletons';

export type OptionsListProps = {
  options?: TagType[];
  clearIcon?: React.ReactNode;
  selectAllTags?: () => void;
  noTagsMsg?:string;
  loading?:boolean;
};

export type OptionProps = {
  tagId?: string;
  title?: string;
  selected?: boolean;
  selectHandler?: () => void;
  removeHandler?: () => void;
};

const StyledOptionsList = styled.ul<OptionsListProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 1em;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.palette.surface};
  color: ${({ theme }) => theme.palette.text};
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  align-items: flex-start;
  overflow: auto;
  flex-wrap: wrap;
  & li{
    width: 100%;
    min-height: 1em;
    padding: 0;
    line-height: 2em;
    box-sizing: border-box;
  }
  span.noTagsMsg{
    color: ${({ theme }) => theme.palette.text};
    font-size: .875em;
    margin-left: .75em;
    line-height: 2em;
  }
`;

const StyledOption = styled.li`
  min-height: 1.25em;
  color: ${props => props.theme.palette.text};
  line-height: 1.25em;
  list-style-type: none;
  font-weight: normal;
  font-size: .875em;
  text-align: center;
  border-left: 2px solid transparent;
  :hover {
    background: ${({ theme }) => theme.palette.midground};
    border-left: 2px solid ${({ theme }) => theme.palette.active};;
  };

  :active {
    color: ${({ theme }) => theme.palette.text_highlight};
    background: ${({ theme }) => theme.palette.active_lowered};
  };
  & span{
    padding-left: 1em;
  }
  & button{
    background: none;
    outline: none;
    border: none;
    padding: 0;
    color: ${({ theme }) => theme.palette.text};
  }
  &:focus-within{
    background-color:${({ theme }) => theme.palette.active_hovered};
  }
  & .loadingSpinner{
    display: inline;
    padding: 2px;
  }
`;

export class OptionsList extends React.Component<OptionsListProps> {
  render() {
    const { options, noTagsMsg } = this.props;
    return (
      <TagsContext.Consumer>
        {(context: TagsContextProps) => (
          <StyledOptionsList {...this.props}>
            {options && options.map((tag: TagType) => {
              const selectTag = () => {
                context.selectTag
                  && context.selectTag({ title: tag.title, id: tag.id, content: tag.content });
              };
              return (
                <StyledOption
                  key={tag.id}
                  onClick={selectTag}
                >
                  <button>{tag.content || tag.title}</button>
                </StyledOption>
              );
            })}
            <span className="noTagsMsg">{options && options.length ? null : noTagsMsg}</span>
            <span>{this.props.loading ? <Spinner className="loadingSpinner" /> : null}</span>
          </StyledOptionsList>
        )}
      </TagsContext.Consumer>);
  }
}
