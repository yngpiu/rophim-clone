export const convertMinutesToFilmDuration = (minutes: number) => {
  if (!minutes || minutes === 0) return '';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);

  if (hours === 0) return `${minutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;

  return `${hours}h ${remainingMinutes}m`;
};
