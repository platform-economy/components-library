import styled from 'styled-components';

import { withMenuWrapper } from '../../HoC/withMenuWrapper';

export const StyledMenuVertical = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.palette.background};
  overflow: hidden;
`;

export const MenuVertical = withMenuWrapper(StyledMenuVertical);
