import styled from "@emotion/styled"

import Canvas from "./Canvas"
import Latice from "./Lattice"

import { fullSize } from "@/constants";

const Container=  styled.div`
  position: relative;
  width: ${fullSize}px;
  height: ${fullSize}px;
  margin: 50px;
`;

const Map = () => {

  
  return <Container>
    <Canvas></Canvas>
    <Latice></Latice>
  </Container>
};

export default Map