function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  let current = start;
  const shop = shops.sort((a, b) => a - b);
  const station = stations.sort((a, b) => a - b);
  let energyAnswer = 0;

  let minGoFirstPointShop = Infinity;
  let goPointShop = 0;
  for (let i = 0; i < shop.length; i++) {
    if (Math.abs(current - shop[i]) < minGoFirstPointShop) {
      minGoFirstPointShop = Math.abs(current - shop[i]);
      goPointShop = i;
    }
  }

  let minGoFirstPointBus = Infinity;
  let goPointBus = 0;
  for (let i = 0; i < station.length; i++) {
    if (Math.abs(current - station[i]) < minGoFirstPointBus) {
      minGoFirstPointBus = Math.abs(current - station[i]);
      goPointBus = i;
    }
  }

  if (station[0] < shop[0] && station[1] < shop[0]) {
    let distStationToShop = Infinity;
    let goBus = 0;
    for (let i = 0; i < station.length; i++) {
      if (Math.abs(shop[goPointShop] - station[i]) < distStationToShop) {
        distStationToShop = Math.abs(shop[goPointShop] - station[i]);
        goBus = i;
      }
    }
    if (station[0] < shop[goPointShop] && station[1] < shop[goPointShop]) {
      energyAnswer += Math.abs(current - station[0]);
      current = station[0];
      current = station[goBus];
      energyAnswer += current - shop[goPointShop];
      current = shop[goPointShop];
    } else {
      energyAnswer += Math.abs(current - station[goPointBus]);
      current = station[goPointBus];
      current = station[goBus];
      energyAnswer += Math.abs(current - shop[goPointShop]);
      current = shop[goPointShop];
      shop.splice(goPointShop, 1);
    }
  } else if (
    Math.abs(current - shop[goPointShop]) <
    Math.abs(current - station[goPointBus])
  ) {
    energyAnswer += Math.abs(current - shop[goPointShop]);
    current = shop[goPointShop];
    shop.splice(goPointShop, 1);
  } else {
    let distStationToShop = Infinity;
    let goBus = 0;
    for (let i = 0; i < station.length; i++) {
      if (Math.abs(shop[goPointShop] - station[i]) < distStationToShop) {
        distStationToShop = Math.abs(shop[goPointShop] - station[i]);
        goBus = i;
      }
    }
    if (station[0] < shop[goPointShop] && station[1] < shop[goPointShop]) {
      energyAnswer += Math.abs(current - station[0]);
      current = station[0];
      current = station[goBus];
      energyAnswer += current - shop[goPointShop];
      current = shop[goPointShop];
    } else {
      energyAnswer += Math.abs(current - station[goPointBus]);
      current = station[goPointBus];
      current = station[goBus];
      energyAnswer += Math.abs(current - shop[goPointShop]);
      current = shop[goPointShop];
      shop.splice(goPointShop, 1);
    }
  }



  while (true) {

    if (current == shop[0]) {
      shop.shift();
    }
    let i = 0;
    if (shop.length < 1) {
      let disCurrentToTarget = Math.abs(current - target);

      let disLastStationToTarget = Math.abs(
        station[station.length - 1] - target
      );

      let minDisCurrentToStation = Infinity;
      let posMinDCT = 0;
      for (let i = 0; i < station.length; i++) {
        if (Math.abs(current - station[i]) < minDisCurrentToStation) {
          minDisCurrentToStation = Math.abs(current - station[i]);
          posMinDCT = i;
        }
      }

      if (
        disCurrentToTarget <
        Math.abs(current - station[posMinDCT]) +
          Math.abs(disLastStationToTarget)
      ) {
        while (true) {
          if (current != target) {
            current++;
            energyAnswer++;
          } else {
            break;
          }
        }
      } else {
        energyAnswer += Math.abs(current - station[posMinDCT]);
        current = station[posMinDCT];
        current = station[station.length - 1];
        energyAnswer += Math.abs(current - target);
        current = target;
      }
    } else {
      while (true) {
        if (shop.length < 1) break;
        if (current == shop[0]) {
          shop.shift();
        }
        i++;
        let up = current + i;
        let down = current - i;
        if (up == shop[0]) {
          current = shop[0];
          energyAnswer++;
          break;
        } else if (down == shop[0]) {
          current = shop[0];
          energyAnswer++;
          break;
        } else if (station.includes(up)) {
          for (let e = 0; e < station.length; e++) {
            let minDist = Infinity;
            let pos = 0;

            for (let x = 0; x < station.length; x++) {
              if (Math.abs(station[x] - shop[0]) < minDist) {
                minDist = Math.abs(station[x] - shop[0]);
                pos = x;
              }
            }
            if (pos != 0) {
              energyAnswer++;
              current = station[pos];
              energyAnswer += Math.abs(current - shop[0]);
              current = shop[0];
              shop.shift();
              i = 0;
              break;
            }
          }
        } else if (station.includes(down)) {
          for (let e = 0; e < station.length; e++) {
            let minDist = Infinity;
            let pos = 0;

            for (let x = 0; x < station.length; x++) {
              if (Math.abs(station[x] - shop[0]) < minDist) {
                minDist = Math.abs(station[x] - shop[0]);
                pos = x;
              }
            }
            if (pos != 0) {
              energyAnswer++;
              current = station[pos];
              energyAnswer += Math.abs(current - shop[0]);
              current = shop[0];
              shop.shift();
              i = 0;
              break;
            }
          }
        } else if (shop.length < 1) {
          let disCurrentToTarget = Math.abs(current - target);

          let disLastStationToTarget = Math.abs(
            station[station.length - 1] - target
          );

          let minDisCurrentToStation = Infinity;
          let posMinDCT = 0;
          for (let i = 0; i < station.length; i++) {
            if (Math.abs(current - station[i]) < minDisCurrentToStation) {
              minDisCurrentToStation = Math.abs(current - station[i]);
              posMinDCT = i;
            }
          }

          if (
            disCurrentToTarget <
            Math.abs(current - station[posMinDCT]) +
              Math.abs(disLastStationToTarget - target)
          ) {
            while (true) {
              if (current != target) {
                current += Math.abs(current - target);
                energyAnswer += Math.abs(current - target);
              } else {
                break;
              }
            }
          } else {
            energyAnswer += Math.abs(current - station[posMinDCT]);
            current = station[posMinDCT];
            current = station[station.length - 1];
            energyAnswer += Math.abs(current - target);
            current = target;

            break;
          }
        } else {
          let distBus = Infinity;
          let posBus = 0;
          for (let i = 0; i < station.length; i++) {
            if (Math.abs(current - station[i]) < distBus) {
              posBus = i;
              distBus = Math.abs(station[i] - current);
            }
          }
          let distShop = Infinity;
          let posShop = 0;
          for (let i = 0; i < shop.length; i++) {
            if (Math.abs(current - shop[i]) < distShop) {
              posShop = i;
              distShop = Math.abs(shop[i] - current);
            }
          }

          if (
            Math.abs(current - shop[posShop]) <
            Math.abs(current - station[posBus])
          ) {
            energyAnswer += Math.abs(current - shop[posShop]);
            current = shop[posShop];
          } else {
            energyAnswer += Math.abs(current - station[posBus]);
            current = station[posBus];

            let minBus = Infinity;
            let goBus = 0;
            for (let k = 0; k < station.length; k++) {
              if (Math.abs(station[k] - shop[0]) < minBus) {
                minBus = Math.abs(station[k] - shop[0]);
                goBus = k;
              }
            }
            current = station[goBus];

            energyAnswer += Math.abs(current - shop[0]);
            current = shop[0];
            shop.shift();
            break;
          }

          break;
        }
      }
    }
    if (current == target) {
      break;
    }
  }

  return energyAnswer;
}

