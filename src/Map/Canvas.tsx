/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetAtom } from "jotai";

import styled from "@emotion/styled";
import mapImage1 from "@/assets/map.png";
import mapImage2 from "@/assets/example2.png";
import { useEffect, useRef } from "react";
import { fullSize, itemsPerRow } from "@/constants";
import { pointsAtom } from "@/store";

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;

  & canvas {
    width: 100%;
    height: 100%;
  }
`;

const Canvas = () => {
  const setPoint = useSetAtom(pointsAtom);
  const canvasRef: any = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 테스트 코드
    // ctx.fillStyle = "red";
    // ctx.fillRect(1, 1, 1, 2);

    // const data = ctx.getImageData(1, 1, 2 ,2).data;

    // for (let i = 0; i < data.length; i += 4) {
    //   console.log(data[i], data[i+1], data[i+2]);
    // }

    const img = new Image();
    //img.src = mapImage1;
    img.src = mapImage2;

    img.onload = function () {
      ctx.drawImage(img, 0, 0, fullSize, fullSize);

      const itemSize = fullSize / itemsPerRow;

      const checkColor = (x: number, y: number) => {
        // ctx.font = "20px serif";
        // ctx.fillText("x:" + x + ", y:" + y, itemSize * x, itemSize * (y + 1));
        // ctx.moveTo(itemSize * x, itemSize * y);
        // ctx.lineTo(itemSize * (x + 1), itemSize * (y + 1));
        // ctx.stroke();
        // ctx.fillStyle = "blue";
        // ctx.fillRect(itemSize * x, itemSize * y, itemSize, itemSize);

        const data = ctx.getImageData(
          itemSize * x,
          itemSize * y,
          itemSize,
          itemSize
        ).data;

        for (let i = 0; i < data.length; i += 4) {
          // const isValidColors = [];

          //isValidColors[0] = true

          if (data[i] > 0) return true;
          if (data[i + 1] > 0) return true;
          if (data[i + 2] > 0) return true;
          if (data[i + 3] > 0) return true;

          // if(isValidColors.every(isValid => isValid)) return true;
        }

        return false;
      };
      for (let y = 0; y < itemsPerRow; y++) {
        for (let x = 0; x < itemsPerRow; x++) {
          //x < 1; x++){
          //y < 1; y++){
          if (checkColor(x, y)) {
            setPoint((points: any) => ({
              ...points,
              [x]: {
                ...points[x],
                [y]: true,
              },
            }));
            // console.log("x y",x,y)
          }

          // return;
        }
      }
    };
  }, [canvasRef, setPoint]);

  return (
    <Container>
      <canvas width={fullSize} height={fullSize} ref={canvasRef}></canvas>
    </Container>
  );
};

export default Canvas;
