import styled from 'styled-components';

export type BreadcrumbItemProps = {
  isCurrent?: boolean;
};

const isCurrent = (props: { isCurrent?: boolean }) => props.isCurrent ? 'bold' : 'normal';

export const Item = styled.span<BreadcrumbItemProps>`
  display: inline;
  padding: 10px;
  cursor: default;
  font-weight: ${ props => isCurrent(props)};
  text-decoration: none;
`;
