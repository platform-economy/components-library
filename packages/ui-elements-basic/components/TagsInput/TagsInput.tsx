import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import _ from 'lodash';

import { Tag, TagType } from '@relayr/ui-elements-basic/components/Tag';
import { Dropdown, DropdownStated } from '@relayr/ui-elements-basic/components/Dropdown';
import { TagsList, OptionsList } from './index';

import { TagsContextWrapper, TagsContext, TagsContextInterface } from './TagsContextWrapper';

export type TagsInputProps = {
  placeholder?: string;
  clearIcon?: React.ReactNode;
  selectedTags?: TagType[];
  optionsTags?: TagType[];
  sourceTags?: TagType[];
  onBlur?: React.FocusEventHandler;
  onChange?: React.FormEventHandler;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  clearTags?: () => void;
  componentsLeft?: React.ReactNode;
  componentsRight?: React.ReactNode;
  tagsContext?: TagsContextInterface;
  onValueChange?: (value: string | string[] | number, ...args: unknown[]) => void;
  inputValue?: string | string[] | number;
  invalid?: boolean;
  listShown?: boolean;
  optionsList?:boolean;
  loading?:boolean;
  noTagsMsg?:string;
  onTagsQueryChange?:(query?:string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  enableCustomTags?: boolean;
  inputValidator?: (inputValue:string | string[] | number) => boolean;
  className?: string;
  throttle?: number;
};

export type TagsInputState = {
  hasFocus?: boolean;
};

const StyledTagsInput = styled.ul<TagsInputProps>`
  display: flex;
  flex-direction: row;
  min-height: 35px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.palette.foreground};
  color: ${({ theme }) => theme.palette.text};
  cursor: text;
  border: none;
  margin: 0;
  padding-left: 0;
  padding-right: 25px;
  padding-bottom: 2px;
  padding-top: 2px;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  align-items: center;
  overflow: auto;
  flex-wrap: wrap;
  position: relative;
  user-select: none;
  width: 100%;

  &:invalid{
    border-bottom: 2px solid ${props => props.theme.palette.negative};
    outline: transparent;
  }

  & li{
    margin-left: .5em;
    margin-top: 2px;
    list-style-type: none;
  }

  & > input {
    background: transparent;
    color: ${({ theme }) => theme.palette.text};
    border: none;
    flex: 1 1 auto;
    padding: 0 .5em;
    margin-top: 2px;
    min-height: 26px;
  }

  & > input:focus{
    border: none;
    outline: none;
  }

  &:invalid{
    border-bottom: 2px solid ${props => props.theme.palette.negative};
    outline: transparent;
  }
  @media screen and (min-width: 414px){
    & > input::-webkit-input-placeholder {
    font-size: .875em;
    }
    & > input::-moz-placeholder {
      font-size: .875em;
    }
    & > input:-ms-input-placeholder {
      font-size: .875em;
    }
    & > input::placeholder {
      font-size: .875em;
    }
  }

  &.hasFocus{
    border-bottom: 2px solid ${props => props.theme.palette.active};
  }

  &.invalid{
    border-bottom: 2px solid ${props => props.theme.palette.negative};
  }

  & > .clearBtn{
    font-size: 1em;
    position: absolute;
    top: 8px;
    right: 10px;
    transition: all .3s ease;
    color: ${props => props.theme.palette.text_inverted};
    pointer-events:none;
    opacity: 0;
    transform: rotate(0deg);
  }

  & > .clearBtn.clearVisible{
    cursor: pointer;
    top: 8px;
    right: 10px;
    opacity: 1;
    pointer-events:auto;
    transform: rotate(90deg);
  }
  & .clearBtn:hover{
    color: ${props => props.theme.palette.text}
  }
  & .clearBtn:active{
    color: ${props => props.theme.palette.active_lowered}
  }

  & div.DropdownContent{
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  }
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  :focus{
    color: ${props => props.theme.palette.active_hovered}
  }
`;

const StyledLi = styled.li`
  list-style-type: none;
`;

class TagsInputPure extends React.Component<TagsInputProps, TagsInputState> {
  private emitAutocompleteUpdateThrottled:() => void;
  private TagsInputRef: React.RefObject<HTMLInputElement>;
  static contextType = TagsContext;
  state = {
    hasFocus: false,
  };

  constructor(props:TagsInputProps) {
    super(props);
    this.TagsInputRef = React.createRef();
    this.emitAutocompleteUpdateThrottled =
    _.throttle(this.emitAutocompleteUpdate, this.props.throttle || 500);
  }

  handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.context.onValueChange && this.context.onValueChange(event.target.value);
    this.props.onChange && this.props.onChange(event);
    this.emitAutocompleteUpdateThrottled();
  }

  handleClick = (event: React.MouseEvent) => {
    this.TagsInputRef.current!.focus();
    this.setState({ hasFocus: true });
    event.preventDefault();
  }

  handleFocus = (event:React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ hasFocus: true });
  }

  handleBlur = (event:React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({ hasFocus: false });
  }

  clearInputInternal = () => {
    this.context.deselectAllTags && this.context.deselectAllTags();
    this.props.onTagsQueryChange && this.props.onTagsQueryChange('');
    this.props.clearTags ? this.props.clearTags() : null;
  }

  emitAutocompleteUpdate = () => {
    if (this.props.onTagsQueryChange != null && this.TagsInputRef.current) {
      this.props.onTagsQueryChange(
        this.TagsInputRef.current.value ? this.TagsInputRef.current.value.toString() : undefined);
    }
  }

  render() {
    const {
      placeholder,
      clearIcon,
      componentsLeft,
      componentsRight,
      optionsList,
      loading,
    } = this.props;
    const {
      inputValue,
      optionsTags,
      selectAllTags,
      noTagsMsg,
      invalid,
      handleKeyDown,
    } = this.context;
    const selectedTags = this.props.selectedTags || this.context.selectedTags;
    const clearVisible = selectedTags
    && selectedTags.length || inputValue;
    const clearBtn = clearIcon
      ? (
      <ClearBtn
        onClick={this.clearInputInternal}
        className={classNames('clearBtn', { clearVisible })}
      >{clearIcon}
      </ClearBtn>
      )
    : null ;

    const tagsOptionsList = () => {
      if (!optionsList) {
        return (
              <TagsList
                options={optionsTags}
                clearIcon={clearIcon}
                selectAllTags={selectAllTags}
                noTagsMsg={noTagsMsg}
                loading={loading}
              />
        );
      } return (
            <OptionsList
              options={optionsTags}
              clearIcon={clearIcon}
              selectAllTags={selectAllTags}
              noTagsMsg={noTagsMsg}
              loading={loading}
            />
      );
    };

    return (
        <DropdownStated
          {...this.props}
          dropOnFocus={true}
          style={{ width: '100%' }}
        >
          <Dropdown.Cover disableClick={true}>
            <StyledTagsInput
              className={
                classNames(
                  'TagsInput',
                  {
                    invalid,
                    hasFocus: this.state.hasFocus,
                  },
                )
              }
              onClick={this.handleClick}
            >
              {componentsLeft}
              {selectedTags && selectedTags.map((tag:TagType) => {
                return (
                  <StyledLi key={tag.id}>
                    <Tag
                      tagId={tag.id}
                      title={tag.title}
                      selected={true}
                      removeIcon={clearIcon || true}
                      removing={tag.removing}
                      custom={tag.custom}
                      content={tag.content}
                    >
                      <span>{tag.content || tag.title}</span>
                    </Tag>
                  </StyledLi>
                );
              })
              }
              <input
                ref={this.TagsInputRef}
                type="text"
                placeholder={placeholder}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                value={inputValue}
                onKeyDown={handleKeyDown}
              />

              {clearBtn}
              {componentsRight}
            </StyledTagsInput>
          </Dropdown.Cover>
          <Dropdown.Content alignment="justify">
              {tagsOptionsList()}
          </Dropdown.Content>
        </DropdownStated>
    );
  }
}

export class TagsInput extends  React.Component<TagsInputProps> {
  render() {
    const { sourceTags, noTagsMsg, enableCustomTags, inputValidator } = this.props;
    return (
      <TagsContextWrapper
        sourceTags={sourceTags}
        noTagsMsg={noTagsMsg}
        enableCustomTags={enableCustomTags}
        inputValidator={inputValidator}
      >
        <TagsInputPure
          className="TagsInput"
          {...this.props}
        />
      </TagsContextWrapper>
    );
  }
}
