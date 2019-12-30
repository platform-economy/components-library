import React, { ReactNode, KeyboardEvent, Component, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { get, find, findIndex, isEqual, Omit } from 'lodash';
import classnames from 'classnames';
import { Dropdown } from '@relayr/ui-elements-basic';

export type OptionType = {
  value: string;
  caption?: string;
};

export type SelectProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
  placeholder?: string;
  placeholderAsOption?: boolean;
  icon?: ReactNode;
  options: OptionType[];
  value?: string;
  onChange?: (value?: string) => void;
  disabled?: boolean;
};

type SelectState = {
  showList: boolean;
  focusedElement: number;
};

type StyledSelectProps = {
  open: boolean;
  disabled?: boolean;
};

const StyledSelect = styled.div<StyledSelectProps & HTMLAttributes<HTMLDivElement>>`
  .select {
    -webkit-tap-highlight-color: transparent;

    &__field {
      font-size: 0.875em;
      color: ${({ disabled, theme }) => disabled ? theme.palette.inactive : theme.palette.text};
      background-color: ${({ theme }) => theme.palette.foreground};
      padding: 10px 10px 8px 10px;
      box-shadow: 0 1px 3px 0 ${({ theme }) => theme.palette.shadow};
      border-bottom: 2px solid transparent;
      outline: none;
      user-select: none;

      pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};

      &:focus {
        border-bottom: 2px solid ${({ theme }) => theme.palette.active};
      }
    }

    &__text--placeholder {
      color: ${({ disabled, theme }) => disabled
        ? theme.palette.inactive
        : theme.palette.text_inverted
      };
    }

    &__icon {
      position: absolute;
      top: 12px;
      right: 10px;
      transition: transform .3s ease;
      pointer-events: none;
      transform-origin: 50% 45%;
      transform: ${({ open }) => open ? 'rotate(180deg)' : 'none'};
    }

    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
      z-index: 2;
    }

    &__list-item {
      padding: 10px;
      max-height: 35px;
      font-size: 14px;
      background: ${({ theme }) => theme.palette.foreground};
      color: ${({ theme }) => theme.palette.text};
      user-select: none;

      &--focused {
        background: ${({ theme }) => theme.palette.midground};
      }
    }
  }

  .Dropdown {
    width: 100%;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  }
`;

export class Select extends Component<SelectProps, SelectState> {
  constructor(props: SelectProps) {
    super(props);

    this.state = {
      showList: false,
      focusedElement: this.findSelectedItemIndex(),
    };
  }

  componentDidUpdate(prevProps: SelectProps) {
    if (!isEqual(prevProps.options, this.props.options)) {
      this.changeFocusedElement(this.findSelectedItemIndex());
    }
  }

  setShowList = (value: boolean) => {
    this.setState({
      ...this.state,
      showList: value,
    });
  }

  setFocusedElement = (value: number) => {
    this.setState({
      ...this.state,
      focusedElement: value,
    });
  }

  findSelectedItemIndex = () => {
    const { options, value } = this.props;
    return findIndex(options, (option: OptionType) => option.value === value);
  }

  setActiveItem = (index: number, option?: OptionType) => {
    const { onChange, value } = this.props;
    const newValue = get(option, 'value');

    this.changeFocusedElement(index);

    if (newValue === value) {
      return;
    }

    onChange && onChange(newValue);
  }

  changeFocusedElement = (index: number) => {
    this.setFocusedElement(index);
  }

  handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { showList } = this.state;
    if (e.key === 'Tab' && showList) {
      this.changeFocusedElement(this.findSelectedItemIndex());
      this.setShowList(!showList);
    } else if (e.key === 'Escape') {
      this.changeFocusedElement(this.findSelectedItemIndex());
      this.setShowList(false);
    }
  }

  handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    const { options, placeholderAsOption } = this.props;
    const { showList, focusedElement } = this.state;

    const handleChangeUp = () => {
      if (focusedElement - 1 > -1 - (placeholderAsOption ? 1 : 0)) {
        this.changeFocusedElement(focusedElement - 1);
        this.setActiveItem(focusedElement - 1, options[focusedElement - 1]);
      }
    };

    const handleChangeDown = () => {
      if (focusedElement + 1 < options.length) {
        this.changeFocusedElement(focusedElement + 1);
        this.setActiveItem(focusedElement + 1, options[focusedElement + 1]);
      }
    };

    switch (e.key) {
      case ' ':
        showList || this.setShowList(true);
        break;
      case 'Enter':
        this.setShowList(!showList);
        break;
      case 'ArrowUp':
        handleChangeUp();
        break;
      case 'ArrowLeft':
        if (!showList) {
          handleChangeUp();
        }
        break;
      case 'ArrowDown':
        handleChangeDown();
        break;
      case 'ArrowRight':
        if (!showList) {
          handleChangeDown();
        }
        break;
    }
  }

  handleStateChange = () => {
    const { showList } = this.state;
    this.setShowList(!showList);
  }

  renderOption = (index: number, option?: OptionType) => {
    const { focusedElement } = this.state;
    const { placeholder } = this.props;

    const activeHandler = () => {
      this.setActiveItem(index, option);
      this.setShowList(false);
    };
    const focusHandler = () => this.changeFocusedElement(index);

    const renderedOption = option || { value: placeholder, caption: undefined };

    return (
      <li
        key={renderedOption.value}
        className={classnames(
          'select__list-item',
          focusedElement === index && 'select__list-item--focused',
        )}
        onClick={activeHandler}
        onMouseEnter={focusHandler}
        onTouchStart={focusHandler}
        role="option"
        aria-selected={false}
      >
        {renderedOption.caption || renderedOption.value}
      </li>
    );
  }

  render() {
    const {
      placeholder,
      placeholderAsOption,
      icon,
      options,
      value,
      disabled,
      onChange,
      ...restProps
    } = this.props;
    const { showList } = this.state;

    const selectedOption = find(options, option => option.value === value);
    const text = get(selectedOption, 'caption') || get(selectedOption, 'value') || placeholder;
    return (
      <StyledSelect open={showList} disabled={disabled} {...restProps}>
        <Dropdown
          openState={showList ? 'clicked' : 'closed'}
          onOpenStateChange={this.handleStateChange}
        >
          <Dropdown.Cover disableClick={disabled}>
            <div
              className="select__field"
              onKeyUp={this.handleKeyUp}
              onKeyDown={this.handleKeyDown}
              role="button"
              tabIndex={disabled ? -1 : 0}
            >
              <span
                className={classnames(
                  'select__text',
                  text === placeholder && 'select__text--placeholder',
                )}
              >
                {text}
              </span>
              <i className="select__icon">
                {icon}
              </i>
            </div>
          </Dropdown.Cover>
          <Dropdown.Content alignment="justify">
            <ul className="select__list" role="listbox">
              {placeholderAsOption && this.renderOption(-1)}
              {options.map((option: OptionType, index) => this.renderOption(index, option))}
            </ul>
          </Dropdown.Content>
        </Dropdown>
      </StyledSelect>
    );
  }
}
