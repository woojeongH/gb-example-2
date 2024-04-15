import { useAtomValue } from "jotai";

import styled from "@emotion/styled";
import LatticeItem from "./LatticeItem";
import { itemsPerRow } from "@/constants";
import { pointsAtom } from "@/store";

export interface LatticeProps {
  size: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const Lattice = () => {
  const points: any = useAtomValue(pointsAtom);

  const latticeItems: boolean[] = [];
  for (let y = 0; y < itemsPerRow; y++) {
    for (let x = 0; x < itemsPerRow; x++) {
      // console.log(x, y, points[x] ? points[x][y] : false)
      latticeItems.push(points[x] ? points[x][y] : false);
    }
  }

  return (
    <Container>
      {latticeItems.map((isContains, index) => (
        <LatticeItem key={index} isContains={isContains}></LatticeItem>
      ))}
    </Container>
  );
};

export default Lattice;
