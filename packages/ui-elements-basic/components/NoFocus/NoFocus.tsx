import * as React from 'react';

export type NoFocusProps = {
  children: React.ReactChildren;
};

export class NoFocus extends React.Component {
  /**
   * Disables its children from redirecting focus to parental TextInput after being clicked.
   * Intended to use within TextInput component.
   *
   * @example
  ```
    <TextInput
      componentsLeft={
        <NoFocus>
          <Button.Primary />
        </NoFocus>
      }
    </TextInput>
  ```
   *
   * @beta
   */
  handleWrapperClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className="nofocus"
        onClick={this.handleWrapperClick}
      >
        {this.props.children}
      </div>
    );
  }
}
