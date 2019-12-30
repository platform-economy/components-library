import styled from 'styled-components';

export const Separator = styled.div`
    width: 1px;
    height: 100%;
    opacity: 0.3;
    border-left: solid 1px ${props => props.theme.palette.divider_inverted};
`;
