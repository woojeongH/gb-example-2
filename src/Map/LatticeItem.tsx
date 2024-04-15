import styled from "@emotion/styled";

import { itemsPerRow, fullSize } from "@/constants";

const Container = styled.div<any>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  box-sizing: border-box;
  border-color: ${({ color }) => color};
  border-left: 1px solid black;
  border-top: 1px solid black;
  ${({ isContains }) =>
    isContains ? "background-color: rgba(100, 10, 100, 0.4);" : ""}
  &:nth-child(${({ itemsPerRow }) => itemsPerRow}n) {
    border-right: 1px solid black;
  }
  &:nth-last-child(-n + ${({ itemsPerRow }) => itemsPerRow}) {
    border-bottom: 1px solid black;
  }
`;

const LatticeItem = ({ isContains }: { isContains: boolean }) => {
  const size = fullSize / itemsPerRow;
  return (
    <Container size={size} itemsPerRow={itemsPerRow} isContains={isContains} />
  );
};

export default LatticeItem;
