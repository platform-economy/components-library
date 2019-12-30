import styled from 'styled-components';

export type BrandLogoProps = {
  img?: string;
  isMobile?: boolean;
};

export const BrandLogo = styled.div<BrandLogoProps>`
  display: block;
  flex: none;
  margin: 0;
  border: 15px solid transparent;
  box-sizing: border-box;
  background: center / contain no-repeat url("${({ img, theme }) => img || theme.logoURL}");
  width: ${({ isMobile }) => isMobile ? '100px' : '200px'};
  height: 64px;
`;
