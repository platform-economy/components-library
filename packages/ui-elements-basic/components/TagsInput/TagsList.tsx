import * as React from 'react';
import styled from 'styled-components';
import { Spinner } from '@relayr/ui-elements-skeletons';
// import classNames from 'classnames';

import { Tag, TagType } from '@relayr/ui-elements-basic/components/Tag';
import { Button } from '@relayr/ui-elements-basic/components/Button';

export type TagsListProps = {
  options?: TagType[];
  clearIcon?: React.ReactNode;
  selectAllTags?: () => void;
  noTagsMsg?:string;
  loading?:boolean;
};

const StyledTagsList = styled.ul<TagsListProps>`
  display: flex;
  flex-direction: row;
  min-height: 35px;
  width: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.palette.surface};
  color: ${({ theme }) => theme.palette.text};
  cursor: text;
  border: none;
  margin: 0;
  padding: .2em;
  box-sizing: border-box;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
  & li{
    margin-left: .5em;
    margin-top: 2px;
    list-style-type: none;
  }
  ${Button.Tertiary}{
    margin-left: auto;
    padding: 5px;
    min-height: 25px;
  }
  span.noTagsMsg{
    color: ${({ theme }) => theme.palette.text};
    margin-left: 1em;
    font-size: .75em;
  }
  & .loadingSpinner{
    margin: 2px;
  }
`;

const StyledLi = styled.li`
  list-style-type: none;
`;

export class TagsList extends React.Component<TagsListProps> {
  render() {
    const { options, clearIcon, selectAllTags, noTagsMsg } = this.props;
    return (
      <StyledTagsList {...this.props}>
        {options && options.map((tag: TagType) => {
          return (
            <StyledLi key={tag.id}>
              <Tag
                tagId={tag.id}
                title={tag.title}
                selected={false}
                removeIcon={clearIcon}
                custom={tag.custom}
                content={tag.content}
              >
                <span>{tag.content || tag.title}</span>
              </Tag>
            </StyledLi>
          );
        })
        }
        <span className="noTagsMsg">{options && options.length ? null : noTagsMsg}</span>
        {this.props.loading ? <Spinner className="loadingSpinner" /> : null}
        {options && options.length
          ? <Button.Tertiary onClick={selectAllTags}>Select All</Button.Tertiary>
          : null
        }
      </StyledTagsList>
    );
  }
}
