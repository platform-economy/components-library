import React from 'react';
import { Form } from '@storybook/components';
import { INIT_EVENT, UPDATE_EVENT } from '../constants';

export class SelectorPanel extends React.Component {
  state = {
    styles: null,
    defaultStyles: null,
    fonts: [],
    minSize: 8,
    maxSize: 20
  }
  componentDidMount() {
    const { api } = this.props;
    api.on(INIT_EVENT, this.handleInit);
  }
  componentWillUnmount() {
    const { api } = this.props;
    api.off(INIT_EVENT, this.handleInit);
  }

  handleInit = ({fonts, minSize, maxSize, initialStyles}) => {
    const { api } = this.props;
    this.setState({ fonts, minSize, maxSize, defaultStyles: initialStyles});
    if (!this.state.styles) {
      this.setState({ styles: initialStyles });
    }
    api.emit(UPDATE_EVENT, this.state.styles);
  }

  handleStyleChange = (e) => {
    const { name, value } = e.target;
    this.setStyles({ ...this.state.styles, [name]: value })
    e.preventDefault();
  }

  handleResetClick = (e) => {
    this.setStyles({ ...this.state.defaultStyles })
    e.preventDefault();
  }

  setStyles(styles) {
    const { api } = this.props;
    api.emit(UPDATE_EVENT, styles);
    this.setState({ styles });
  }

  render() {
    const { active } = this.props;
    const { styles, fonts, minSize, maxSize } = this.state;
    return active && styles ? (
      <Form>
        <Form.Field label="Font family:">
          <Form.Select
            name="fontFamily"
            value={styles.fontFamily}
            onChange={this.handleStyleChange}
          >
            {fonts.map(fontFamily => (
              <option key={fontFamily} value={fontFamily}>{fontFamily}</option>
            ))}
          </Form.Select>
        </Form.Field>
        <Form.Field label="Font size:">
          <Form.Input
            type="number"
            name="fontSize"
            value={styles.fontSize}
            onChange={this.handleStyleChange}
            min={minSize}
            max={maxSize}
          />
        </Form.Field>
        <Form.Button onClick={this.handleResetClick}>Reset to default</Form.Button>
      </Form>
    ) : null;
  }
}


