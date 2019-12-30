import React from 'react';
import { Form } from '@storybook/components';
import { styled, css } from '@storybook/theming';
import { readableColor } from 'polished';
import { INIT_EVENT, UPDATE_EVENT } from '../constants';

const BACKGROUND_COLORS = [
  'background',
  'background_inverted',
  'surface',
  'midground',
  'foreground',
  'surface_inverted',
];

const ColorSelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorSelectorButton = styled(Form.Button)`
  background-color: ${props => props.color || '#000'};
  color: ${props => readableColor(props.color || '#000')};
  display: ${props => props.color ? 'inline' : 'none'};
  
  &:hover {
    color: ${props => props.theme.input.color};
  }
  
  ${props => props.selected ? css`
    border-bottom: 3px solid ${props.theme.barSelectedColor};
  ` : ''}
`;

export class SelectorPanel extends React.Component {
  state = {
    color: null,
    palette: {},
  }
  componentDidMount() {
    const { api } = this.props;
    api.on(INIT_EVENT, this.handleInit);
  }
  componentWillUnmount() {
    const { api } = this.props;
    api.off(INIT_EVENT, this.handleInit);
  }

  handleInit = (theme) => {
    const { api } = this.props;
    const {palette = {}} = theme || {};
    this.setState({ palette });
    const queryColor = api.getQueryParam('backgroundColor');
    const color = queryColor || this.state.color;
    this.setColor(color);
  }

  handleClick = (colorName, e) => {
    this.setColor(colorName);
    e.preventDefault();
  }

  setColor(color) {
    const { api } = this.props;
    api.emit(UPDATE_EVENT, { color });
    this.setState({ color });
    api.setQueryParams({ backgroundColor: color });
  }

  render() {
    const { active } = this.props;
    const { color, palette } = this.state;
    return active ? (
      <Form>
        <Form.Field label="Palette color:">
          <ColorSelectorContainer>
            {BACKGROUND_COLORS.map(colorName => (
              <ColorSelectorButton
                key={colorName}
                color={palette[colorName]}
                selected={colorName === color}
                onClick={this.handleClick.bind(this, colorName)}
              >
                {colorName}
              </ColorSelectorButton>
            ))}
          </ColorSelectorContainer>
        </Form.Field>
      </Form>
    ) : null;
  }
}


