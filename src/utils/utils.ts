import { useRouter } from "next/navigation";

const { push } = useRouter();

function redirectTo(url: string) {
  setTimeout(() => {
    push(url);
  }, 3000);
}

/*function formatHour(hour: string): string {
  const hourWithDot = hour.includes(':');
  const hourSplit = hour.split(':')[0];
  const lastHour = !hourWithDot ? `${hourSplit}:` : hourSplit;
  const hourFormat = hour.length === 1 ? `0${lastHour}` : `${lastHour}`;
  const minuteSplit = hour.split(':')[1];
  const minuteFormat = !hourWithDot ? '00' : minuteSplit;
  const format = !hourWithDot ?
    `${hourFormat}:${minuteFormat}hs` :
    `${hourFormat}${minuteFormat}hs`
  return format;
}
*/
export {
  redirectTo,
  //formatHour
}
