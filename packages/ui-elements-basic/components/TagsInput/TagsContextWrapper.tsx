import * as React from 'react';
import _ from 'lodash';

import { TagType } from '@relayr/ui-elements-basic/components/Tag';

export interface TagsContextProps{
  selectedTags?: TagType[];
  sourceTags?: TagType[];
  optionsTags?: TagType[];
  selectTag?: (tag:TagType) => void;
  removeTag?: (tag:TagType) => void;
  selectAllTags?: () => void;
  deselectAllTags?: () => void;
  onValueChange?: (value: string | string[] | number, ...args: unknown[]) => void;
  inputValue?: string | string[] | number;
  invalid?: boolean;
  noTagsMsg?:string;
  handleKeyDown?: (event: React.KeyboardEvent) => void;
  enableCustomTags?: boolean;
  inputValidator?: (inputValue:string | string[] | number) => boolean;
}

export interface TagsContextInterface{
  selectedTags?: TagType[];
  sourceTags?: TagType[];
  optionsTags?: TagType[];
  selectTag?: (tag:TagType) => void;
  removeTag?: (tag:TagType) => void;
  selectAllTags?: () => void;
  deselectAllTags?: () => void;
  onValueChange?: (value: string | string[] | number, ...args: unknown[]) => void;
  inputValue?: string | string[] | number;
  invalid?: boolean;
  noTagsMsg?:string;
  handleKeyDown?: (event: React.KeyboardEvent) => void;
}

interface TagsContextState {
  selectedTags?: TagType[];
  sourceTags?: TagType[];
  optionsTags?: TagType[];
  selectTag?: (tag:TagType) => void;
  removeTag?: (tag:TagType) => void;
  selectAllTags?: () => void;
  deselectAllTags?: () => void;
  onValueChange?: (value: string | string[] | number, ...args: unknown[]) => void;
  inputValue?: string | string[] | number;
  invalid?: boolean;
  noTagsMsg?:string;
  handleKeyDown?: (event: React.KeyboardEvent) => void;
}

export const TagsContext =
  React.createContext<TagsContextInterface|null>(null);

export class TagsContextWrapper extends  React.Component<TagsContextProps, TagsContextState>{
  private lastTagRemoveByKeyboard: number;
  private delayBetweenDeleteTabByKeyboard:number = 500;
  constructor(props:TagsContextProps, ...args:unknown[]) {
    super(props, ...args);
    this.state = {
      selectedTags: this.props.selectedTags || [],
      sourceTags: this.props.sourceTags,
      optionsTags: this.props.optionsTags ? this.props.optionsTags : this.props.sourceTags || [],
      selectTag: this.selectTag,
      removeTag: this.removeTag,
      selectAllTags: this.selectAllTags,
      deselectAllTags: this.deselectAllTags,
      onValueChange: this.onValueChange,
      inputValue: '',
      invalid: false,
      noTagsMsg: this.props.noTagsMsg,
      handleKeyDown: this.handleKeyDown,
    };
  }

  selectTag = (tag:TagType) => {
    if (this.state.selectedTags
      && this.state.selectedTags.filter(e => e.id === tag.id).length <= 0) {
      const options = _.reject(this.state.optionsTags, e => e.id === tag.id);
      this.setState({
        selectedTags: [...this.state.selectedTags, tag],
        optionsTags: [...options],
      });
    }
    this.clearRemovingState();
  }

  removeTag = (tag:TagType) => {
    if (this.state.optionsTags
      && this.state.optionsTags.filter(e => e.id === tag.id).length <= 0) {
      let selected = _.reject(this.state.selectedTags, e => e.id === tag.id);
      selected = selected.map(tag => ({ ...tag, removing: false }));
      if (tag.custom) {
        this.setState({
          selectedTags: [...selected],
          optionsTags: [...this.state.optionsTags],
        });
      } else {
        this.setState({
          selectedTags: [...selected],
          optionsTags: [...this.state.optionsTags, tag],
        });
      }

    }
  }

  selectAllTags = () => {
    this.setState({
      selectedTags: _.uniqBy([...this.state.selectedTags, ...this.state.optionsTags], t => t.id),
      optionsTags: [],
    });
    this.clearRemovingState();
  }

  deselectAllTags = () => {
    const selectedTagsToRemove = _.filter(this.state.selectedTags, e => e.custom !== true);
    this.setState({
      selectedTags: [],
      optionsTags: _.uniqBy(
        [...this.props.sourceTags, ...selectedTagsToRemove, ...this.state.optionsTags],
        t => t.id,
        ),
      inputValue: '',
      invalid: this.validateInput(''),
    });
  }

  validateInput = (value: string | string[] | number) => {
    // returns true means invalid | false means valid
    return (value
    && this.props.inputValidator
    && !this.props.inputValidator(value)) || false;
  }

  onValueChange = (value: string | string[] | number) => {
    this.setState({
      inputValue: value,
      invalid: this.validateInput(value),
    });
  }

  clearRemovingState = () => {
    this.setState(prevState => ({
      selectedTags: prevState.selectedTags && prevState.selectedTags.map(
        el => ({ ...el, removing: false }),
      ),
      optionsTags: prevState.optionsTags && prevState.optionsTags.map(
        el => ({ ...el, removing: false }),
      ),
    }));
  }

  clearInputValue = () => {
    this.setState({
      inputValue: '',
    });
  }

  addCustomTag = () => {
    const selectedTags = this.state.selectedTags;
    const customTag: TagType = {
      id: `${this.state.inputValue
        && this.state.inputValue.toString()}${selectedTags && selectedTags.length}`,
      title: this.state.inputValue && this.state.inputValue.toString() || '',
      custom: true,
    };
    if (this.props.inputValidator && this.state.inputValue) {
      if (!this.validateInput(this.state.inputValue)) {
        this.setState({
          selectedTags: [...this.state.selectedTags, customTag],
        });
        this.clearInputValue();
      }
    } else {
      this.setState({
        selectedTags: [...this.state.selectedTags, customTag],
      });
      this.clearInputValue();
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.keyCode === 8
      && this.state.selectedTags
      && this.state.selectedTags.length
      && (this.state.inputValue === undefined || this.state.inputValue === '')
    ) {
      if (this.state.selectedTags[this.state.selectedTags.length - 1].removing !== true) {
        this.setState(prevState => ({
          selectedTags: prevState.selectedTags && prevState.selectedTags.map(
            (el, i) => (prevState.selectedTags
              && i === prevState.selectedTags.length - 1) ? { ...el, removing: true } : el,
          ),
        }));
        this.state.selectedTags[this.state.selectedTags.length - 1].removing = true;
      } else if (
        this.lastTagRemoveByKeyboard == null ||
        this.lastTagRemoveByKeyboard + this.delayBetweenDeleteTabByKeyboard < Date.now()
      ) {
        this.removeTag(this.state.selectedTags[this.state.selectedTags.length - 1]);
        this.clearRemovingState();
        this.lastTagRemoveByKeyboard = Date.now();
      }
    } else if (
      e.keyCode === 13
      && this.props.enableCustomTags
      && this.state.inputValue
      && this.state.inputValue.toString().length > 0
      ) {
      this.addCustomTag();
    } else if (
      e.keyCode === 9
      && this.props.enableCustomTags
      && this.state.inputValue
      && this.state.inputValue.toString().length > 0
      ) {
      e.preventDefault();
      this.addCustomTag();
    }
  }

  static getDerivedStateFromProps(newProps: TagsContextProps, state: TagsContextState) {
    if (newProps.sourceTags !== state.sourceTags) {
      const newOptionsTags:TagType[] = [];
      _.each(newProps.sourceTags, (tag:TagType) => {
        if (_.findIndex(state.selectedTags, (st:TagType) => st.id === tag.id) === -1) {
          newOptionsTags.push(tag);
        }
      });
      return {
        sourceTags: newProps.sourceTags,
        optionsTags: newOptionsTags,
      };
    }
    return null;
  }

  render() {
    return(
      <TagsContext.Provider value={this.state}>
        {this.props.children}
      </TagsContext.Provider>
    );
  }
}
