export interface BlockPoint {
  top: number;
  left: number;
  height: string;
  width: string;
}

export const calculateLink = (fromElem: BlockPoint, toElem: BlockPoint) => {
  console.log("@calculating_link", fromElem, toElem);

  if (!fromElem || !toElem) {
    return undefined;
  }

  const fheight = Number(fromElem.height.replace("px", ""));
  const fwidth = Number(fromElem.width.replace("px", ""));

  const theight = Number(toElem.height.replace("px", ""));
  const tWeight = Number(toElem.width.replace("px", ""));

  try {
    const fromCenter = [fromElem.top + fheight / 2, fromElem.left + fwidth / 2];
    const toElemCenter = [toElem.top + theight / 2, toElem.left + tWeight / 2];

    const totalWeight = fheight + fwidth + theight + tWeight;

    const fromWeight = fheight + fwidth;
    const toWeight = theight + tWeight;

    const distance = Math.hypot(
      fromCenter[0] - toElemCenter[0],
      fromCenter[1] - toElemCenter[1]
    );

    const angle = Math.atan2(
      fromCenter[0] - toElemCenter[0],
      fromCenter[1] - toElemCenter[1]
    );

    const final = [
      toElemCenter[0],
      toElemCenter[1],
      distance,
      (angle * 180) / Math.PI,

      (fromCenter[0] + toElemCenter[0]) / 2,
      (fromCenter[1] + toElemCenter[1]) / 2,

      // wighted center
      (fromCenter[0] * toWeight + toElemCenter[0] * fromWeight) / totalWeight,
      (fromCenter[1] * toWeight + toElemCenter[1] * fromWeight) / totalWeight,
    ];

    return final;
  } catch (error) {
    return undefined;
  }
};
