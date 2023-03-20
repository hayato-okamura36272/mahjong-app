import React from 'react'

const calcurate = () => {
     //手牌読み込み
  const inputHead = '123m456p789s東南西北白発中';
  const handArray: number[] = [];

  for (let i = 0; i < inputHead.length; i++) {
    const tile: string = inputHead[i];

    switch (tile) {
      case 'm':
      case 'p':
      case 's':
        handArray.push(parseInt(inputHead[i - 1] + tile, 10));
    }
  }
  //牌効率の計算
  const calculateEfficiency = (handArray: number[]) => {
    const efficiency: {type: string, double: number, triple: number, quads: number, maxEfficiency: number}[] = [];
    // 萬子・索子・筒子・字牌ごとに枚数を数える
    const manzuCount: { [key: string]: number } = {};
    const pinzuCount: { [key: string]: number } = {};
    const souzuCount: { [key: string]: number } = {};
    const jihaiCount: { [key: string]: number } = {};

    handArray.forEach(tile => {
      const tileStr = tile.toString();
      switch (tileStr.charAt(0)) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (!manzuCount[tileStr]) manzuCount[tileStr] = 0;
          manzuCount[tileStr]++;
          break;
        case 'm':
          if (!manzuCount[tileStr]) manzuCount[tileStr] = 0;
          manzuCount[tileStr]++;
          break;
        case 'p':
          if (!pinzuCount[tileStr]) pinzuCount[tileStr] = 0;
          pinzuCount[tileStr]++;
          break;
        case 's':
          if (!souzuCount[tileStr]) souzuCount[tileStr] = 0;
          souzuCount[tileStr]++;
          break;
        case 'z':
          if (!jihaiCount[tileStr]) jihaiCount[tileStr] = 0;
          jihaiCount[tileStr]++;
          break;
      }
    });

    // 萬子・索子・筒子・字牌ごとに必要な牌の枚数を計算する
    const manzuEff = calculateEfficiencyForType(manzuCount);
    const pinzuEff = calculateEfficiencyForType(pinzuCount);
    const souzuEff = calculateEfficiencyForType(souzuCount);
    const jihaiEff = calculateEfficiencyForType(jihaiCount);

    // 牌効率をまとめて配列に格納する
    efficiency.push(manzuEff);
    efficiency.push(pinzuEff);
    efficiency.push(souzuEff);
    efficiency.push(jihaiEff);

    return efficiency;
  }

  const calculateEfficiencyForType = (count: {[key: string]: number}) => {
    const requiredTiles: {[key: string]: {double: number, triple: number, quads: number}} = {
      '2': { double: 1, triple: 1, quads: 1 },
      '3': { double: 2, triple: 1, quads: 1 },
      '4': { double: 2, triple: 2, quads: 1 },
      '5': { double: 2, triple: 2, quads: 2 },
      '6': { double: 2, triple: 3, quads: 2 },
      '7': { double: 2, triple: 3, quads: 3 },
      '8': { double: 2, triple: 4, quads: 3 },
      '9': { double: 2, triple: 4, quads: 4 }
    };

    let efficiency = {
      type: '',
      double: 0,
      triple: 0,
      quads: 0,
      maxEfficiency: 0
    };

    // 必要な牌の枚数を計算する
    Object.keys(count).forEach(tile => {
      const num = count[tile];

      if (num < 2) {
        efficiency.double += requiredTiles[tile].double - num;
        efficiency.triple += requiredTiles[tile].triple;
        efficiency.quads += requiredTiles[tile].quads;
      } else if (num == 2) {
        efficiency.triple += requiredTiles[tile].triple;
        efficiency.quads += requiredTiles[tile].quads;
      } else if (num == 3) {
        efficiency.quads += requiredTiles[tile].quads;
      }
    });

    // 牌効率を計算する
    efficiency.maxEfficiency = efficiency.double * 4 + efficiency.triple * 3 + efficiency.quads * 2;

    // 牌のタイプを設定する
    if (count['m']) efficiency.type = 'manzu';
    if (count['p']) efficiency.type = 'pinzu';
    if (count['s']) efficiency.type = 'souzu';
    if (count['z']) efficiency.type = 'jihai';

    return efficiency;
  }
  return (
    <div>calcurate</div>
  )
}

export default calcurate