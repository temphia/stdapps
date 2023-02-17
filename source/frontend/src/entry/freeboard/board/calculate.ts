export interface BlockPoint {
  top: number;
  left: number;
  height: number;
  width: number;
}

export const calculateLink = (fromElem: BlockPoint, toElem: BlockPoint) => {
  try {
    const fromCenter = [
      fromElem.top + fromElem.height / 2,
      fromElem.left + fromElem.width / 2,
    ];
    const toElemCenter = [
      toElem.top + toElem.height / 2,
      toElem.left + toElem.width / 2,
    ];

    const totalWeight =
      fromElem.height + fromElem.width + toElem.height + toElem.width;

    const fromWeight = fromElem.height + fromElem.width;
    const toWeight = toElem.height + toElem.width;

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
