import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownContentAlignment } from './DropdownContent';
import { TextAlignProperty } from 'csstype';

import { Dropdown, DropdownOpenState, DropdownProps, DropdownStated } from './index';

import {
  faCaretDown,
  faCaretUp,
  faUserCircle,
  faEdit,
  faDownload,
  faTrashAlt,
  faUserCog,
  faSignOutAlt,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCaretDown,
  faCaretUp,
  faUserCircle,
  faEdit,
  faDownload,
  faTrashAlt,
  faUserCog,
  faSignOutAlt,
  faEllipsisV,
);

const iconUser = <FontAwesomeIcon icon="user-circle"/>;
const iconEdit = <FontAwesomeIcon icon="edit"/>;
const iconDownload = <FontAwesomeIcon icon="download"/>;
const iconDelete = <FontAwesomeIcon icon="trash-alt"/>;
const iconSettings = <FontAwesomeIcon icon="user-cog"/>;
const iconLogout = <FontAwesomeIcon icon="sign-out-alt"/>;
const iconEllipsisV = <FontAwesomeIcon icon="ellipsis-v"/>;

const Surface = styled.div`
  background-color: ${props => props.theme.palette.background};
  color: ${props => props.theme.palette.text};
  padding: 10px;
`;

const DropdownContentContainer = styled.div<{width: string}>`
  background-color: ${props => props.theme.palette.background};
  width: ${props => props.width || 'auto'};
  text-align: left;
  box-sizing: border-box;
  border: solid 1px transparent;
`;

const MobileViewport = styled.div`
  width: 414px;
  height: 50vh;
`;

const MenuItem = styled.div`
  width: 135px;
  height: 14px;
  font-size: .875em;
  white-space: nowrap;
  padding: 8px 14px;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }
`;

type DropdownCloseWrapperProps = Pick<
  DropdownProps,
  Exclude<keyof DropdownProps, 'openState'|'children'>
> & {
  onButtonClick?: (e: React.SyntheticEvent) => void,
};
type DropdownCloseWrapperState = {
  openState: DropdownOpenState;
};
class DropdownCloseWrapper extends React.Component<
  DropdownCloseWrapperProps,
  DropdownCloseWrapperState
> {
  constructor(props: DropdownCloseWrapperProps) {
    super(props);
    this.state = {
      openState: 'closed',
    };
  }

  handleOpenStateChanged = (openState: DropdownOpenState) => {
    const { onOpenStateChange } = this.props;
    this.setState({ openState });
    if (onOpenStateChange) {
      onOpenStateChange(openState);
    }
  }

  handleButtonClick = (e: React.SyntheticEvent) => {
    const { onButtonClick } = this.props;
    const openState = 'closed';
    this.setState({ openState });
    if (onButtonClick) {
      onButtonClick(e);
    }
    // stopping propagation is important, to not race with internal content click handler!
    e.stopPropagation();
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        openState={this.state.openState}
        onOpenStateChange={this.handleOpenStateChanged}
      >
        <Dropdown.Cover>Cover</Dropdown.Cover>
        <Dropdown.Content>
          <DropdownContentContainer width="150px">
            <button onClick={this.handleButtonClick}>Close Me</button>
          </DropdownContentContainer>
        </Dropdown.Content>
      </Dropdown>
    );
  }
}

const iconOpenedOptions = {
  Caret: 'caret-up',
  Chevron: 'chevron-up',
};

const iconClosedOptions = {
  Caret: 'caret-down',
  Chevron: 'chevron-down',
};

const OpenStateOptions = {
  Closed: 'closed',
  Hovered: 'hovered',
  Clicked: 'clicked',
};

const ComponentAlignmentOptions = {
  left: 'left',
  right: 'right',
  center: 'center',
};

const ContentAlignmentOptions = {
  '(auto)': null,
  left: 'left',
  right: 'right',
  center: 'center',
  justify: 'justify',
};

const defaultDropdownKnobs = () => ({
  onOpenStateChange: action('onOpenStateChange'),
  iconOpened: (
    <FontAwesomeIcon
      icon={select('Icon Opened', iconOpenedOptions, 'caret-up') as IconProp}
    />
  ),
  iconClosed: (
    <FontAwesomeIcon
      icon={select('Icon Closed', iconClosedOptions, 'caret-down') as IconProp}
    />
  ),
  dropOnHover: boolean('Drop on Hover', true),
});
const defaultCoverKnobs = () => ({
  disableClick: boolean('Disable cover click', false),
});
const defaultContentKnobs = () => ({
  disableClick: boolean('Disable content click', false),
  alignment: select('Content alignment', ContentAlignmentOptions, null) as DropdownContentAlignment,
});

storiesOf('ui-elements-basic/Dropdown', module)
  .add('default (stateless)', () => (
    <Surface>
      <div
        style={{
          textAlign:
            select('Component alignment', ComponentAlignmentOptions, 'right') as TextAlignProperty,
        }}
      >
        <Dropdown
          openState={select('Open state', OpenStateOptions, 'closed') as DropdownOpenState}
          {...defaultDropdownKnobs()}
        >
          <Dropdown.Cover {...defaultCoverKnobs()}>My Profile</Dropdown.Cover>
          <Dropdown.Content {...defaultContentKnobs()}>
              <DropdownContentContainer width="150px">
                <ul>
                  <li>Lorem ipsum dolor sit amet,</li>
                  <li>consectetur adipiscing elit,</li>
                  <li>sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua.</li>
                </ul>
              </DropdownContentContainer>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </div>
    </Surface>
  ))
  .add('default (stated)', () => (
    <Surface>
      <div
        style={{
          textAlign:
            select('Component alignment', ComponentAlignmentOptions, 'right') as TextAlignProperty,
        }}
      >
        <DropdownStated
          {...defaultDropdownKnobs()}
        >
          <Dropdown.Cover {...defaultCoverKnobs()}>
            My Profile
          </Dropdown.Cover>
          <Dropdown.Content {...defaultContentKnobs()}>
            <DropdownContentContainer width="150px">
              <ul>
                <li>Lorem ipsum dolor sit amet,</li>
                <li>consectetur adipiscing elit,</li>
                <li>sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua.</li>
              </ul>
            </DropdownContentContainer>
          </Dropdown.Content>
        </DropdownStated>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </div>
    </Surface>
  ))
  .add('mobile', () => (
    <Surface>
      <MobileViewport>
        <DropdownStated
          isMobile={true}
          {...defaultDropdownKnobs()}
        >
          <Dropdown.Cover {...defaultCoverKnobs()}>{iconUser} My Profile</Dropdown.Cover>
          <Dropdown.Content {...defaultContentKnobs()}>
            <DropdownContentContainer width="auto">
              <ul>
                <li>Lorem ipsum dolor sit amet,</li>
                <li>consectetur adipiscing elit,</li>
                <li>sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua.</li>
              </ul>
            </DropdownContentContainer>
          </Dropdown.Content>
        </DropdownStated>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </div>
      </MobileViewport>
    </Surface>
  ))
  .add('example: manual close when button clicked', () => (
      <Surface>
        <div style={{ textAlign: 'right' }}>
          <DropdownCloseWrapper
            dropOnHover={true}
            onOpenStateChange={action('onOpenStateChange')}
          />
        </div>
      </Surface>
    ), { info: 'See DropdownCloseWrapper implementation in story source for details.' },
  )
  .add('example: open on focus', () => (
    <Surface>
      <div style={{ textAlign: 'right' }}>
        <DropdownStated
          dropOnFocus={true}
        >
          <Dropdown.Cover disableClick={boolean('Disable cover click', true)}>
            <input/>
          </Dropdown.Cover>
          <Dropdown.Content>
            <DropdownContentContainer width="150px">
              <ul>
                <li>Lorem ipsum dolor sit amet,</li>
                <li>consectetur adipiscing elit,</li>
                <li>sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua.</li>
              </ul>
            </DropdownContentContainer>
          </Dropdown.Content>
        </DropdownStated>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </div>
    </Surface>
    ), { info: 'See DropdownCloseWrapper implementation in story source for details.' },
  )
  .add('example: menu without toogle icon', () => (
    <Surface>
      <div style={{ textAlign: 'right' }}>
        <DropdownStated
          style={{ width: '150px', textAlign: 'left' }}
          dropOnHover={boolean('Drop on Hover', true)}
        >
          <Dropdown.Cover>
            <MenuItem>{iconUser} My Profile</MenuItem>
          </Dropdown.Cover>
          <Dropdown.Content alignment="justify">
            <DropdownContentContainer width="auto">
              <MenuItem onClick={action('View Profile clicked')}>
                {iconUser} View Profile
              </MenuItem>
              <MenuItem onClick={action('Settings clicked')}>
                {iconSettings} Settings
              </MenuItem>
              <MenuItem onClick={action('Logout clicked')}>
                {iconLogout} Logout
              </MenuItem>
            </DropdownContentContainer>
          </Dropdown.Content>
        </DropdownStated>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </div>
    </Surface>
  ))
  .add('example: menu on icon', () => (
    <Surface>
      <div style={{ textAlign: 'right' }}>
        <DropdownStated
          dropOnHover={boolean('Drop on Hover', true)}
        >
          <Dropdown.Cover>{iconEllipsisV}</Dropdown.Cover>
          <Dropdown.Content>
            <DropdownContentContainer width="200px">
              <MenuItem onClick={action('Edit Template clicked')}>
                {iconEdit} Edit Template
              </MenuItem>
              <MenuItem onClick={action('Download Template clicked')}>
                {iconDownload} Download Template
              </MenuItem>
              <MenuItem onClick={action('Delete Template clicked')}>
                {iconDelete} Delete Template
              </MenuItem>
            </DropdownContentContainer>
          </Dropdown.Content>
        </DropdownStated>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </div>
    </Surface>
  ));
