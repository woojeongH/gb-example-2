import { useAtomValue } from "jotai";

import styled from "@emotion/styled";
import LatticeItem from "./LatticeItem";
import { itemsPerRow, fullSize } from "@/constants";
import { pointsAtom } from "@/store";
import { useState } from "react";

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
  const [isMap, setIsMap] = useState(false);

  const latticeItems: boolean[] = [];
  for (let y = 0; y < itemsPerRow; y++) {
    for (let x = 0; x < itemsPerRow; x++) {
      // console.log(x, y, points[x] ? points[x][y] : false)
      latticeItems.push(points[x] ? points[x][y] : false);
    }
  }

  const onMouseMove = (e: any) => {
    const { layerX, layerY } = e.nativeEvent;

    const x = Math.floor((layerX / fullSize) * itemsPerRow);
    const y = Math.floor((layerY / fullSize) * itemsPerRow);

    let flag = false;
    try {
      if (points[x][y]) flag = true;
    } catch (error) {
      console.warn(error);
    }

    if (isMap != flag) setIsMap(flag);
  };

  return (
    <Container onMouseMove={onMouseMove}>
      {latticeItems.map((isContains, index) => (
        <LatticeItem key={index} isContains={isContains}></LatticeItem>
      ))}
      <div>마우스가 지도 위에 있나? {isMap ? "O" : "X"}</div>
    </Container>
  );
};

export default Lattice;
