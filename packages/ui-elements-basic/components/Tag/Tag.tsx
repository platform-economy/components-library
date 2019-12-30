import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Omit } from 'lodash';
import { TagsContext } from '../TagsInput/TagsContextWrapper';

export type TagType = {
  id: string,
  title?: string,
  removing?: boolean,
  custom?: boolean,
  content?: React.ReactNode,
};

export type TagProps =  Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  tagId: string;
  custom?: boolean;
  selected?: boolean;
  removeIcon?: React.ReactNode;
  removing?: boolean;
  content?: React.ReactNode
  onClick?: () => void;
};

const highlightSwitch = (selected?: boolean, removing?: boolean) => {
  if (removing) {
    return 'negative';
  }
  if (selected) {
    return 'active';
  }
  return 'foreground';
};

const StyledTag = styled.button<TagProps>`
  min-height: 1.25em;
  padding: 0.125em 1em;
  background: ${props => props.theme.palette[highlightSwitch(props.selected, props.removing)]};
  color: ${props => props.selected || props.removing
  ? props.theme.palette.text_highlight
  : props.theme.palette.text};
  border: none;
  line-height: 1.25em;
  border-radius: .75em;
  list-style-type: none;
  font-weight: normal;
  cursor: pointer;
  user-select: none;
  transition: all .2s ease;
  & > span, div, i, a {
    font-size: .75em;
  };

  :hover {
    color: ${({ theme }) => theme.palette.text_highlight};
    background: ${props => props.removing
    ? props.theme.palette.negative_hovered
    : props.theme.palette.active_hovered
    };
  };

  :active {
    color: ${({ theme }) => theme.palette.text_highlight};
    background: ${props => props.removing
    ? props.theme.palette.negative_lowered
    : props.theme.palette.active_lowered
    };
  };

  :focus {
    color: ${({ theme }) => theme.palette.text_highlight};
    background: ${props => props.removing
    ? props.theme.palette.negative_hovered
    : props.theme.palette.active_hovered
    };
    border: none;
    outline: transparent;
  };
`;
export class Tag extends React.Component<TagProps> {
  static contextType = TagsContext;

  handleClick = () => {
    const { selected, removing, title, custom, tagId, onClick, content } = this.props;
    if (this.context) {
      const { removeTag, selectTag } = this.context;
      if (selected || removing) {
        removeTag && removeTag({ title, custom, content, id: tagId });
      } else {
        selectTag && selectTag({ title, content, id: tagId });
      }
    }
    if (onClick) {
      onClick();
    }
  }

  render() {
    const {
      children,
      removeIcon,
      content,
      ...htmlProps
    } = this.props;
    const { selected, removing } = this.props;

    return (
      <StyledTag
        {...htmlProps}
        className="Tag"
        onClick={this.handleClick}
      >
        {children}
        {(selected || removing) && removeIcon !== undefined
          ? <span className="removeIcon">&nbsp;{removeIcon}</span>
          : null
        }
      </StyledTag>
    );
  }
}
