function getClockAngle(hh_mm: string): number {
  const time = hh_mm.split(":");
  let hour = parseInt(time[0]);
  const minute = parseInt(time[1]);

  let angle = 0;
  const minuteAngle = (minute / 60) * 360;
  let hourAngle = (hour / 12) * 360;
  const addAngleForHour = (minute / 60) * (1 / 12) * 360;
  hourAngle += addAngleForHour;

  if (hourAngle >= minuteAngle) {
    angle = 360 - hourAngle + minuteAngle;
  } else {
    angle = minuteAngle - hourAngle;
  }
  if (angle < 0) {
    angle *= -1;
  }
  while (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
}
