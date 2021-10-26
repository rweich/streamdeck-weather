import { Static, Type } from '@sinclair/typebox';

/* eslint-disable sort-keys */
export const CurrentType = Type.Object({
  coord: Type.Object({
    lon: Type.Number(),
    lat: Type.Number(),
  }),
  weather: Type.Array(
    Type.Object({
      id: Type.Number(),
      main: Type.String(),
      description: Type.String(),
      icon: Type.String(),
    }),
  ),
  base: Type.Literal('stations'),
  main: Type.Object({
    temp: Type.Number(),
    feels_like: Type.Number(),
    temp_min: Type.Number(),
    temp_max: Type.Number(),
    pressure: Type.Number(),
    humidity: Type.Number(),
  }),
  visibility: Type.Number(),
  wind: Type.Object({
    speed: Type.Number(),
    deg: Type.Number(),
    gust: Type.Number(),
  }),
  clouds: Type.Object({
    all: Type.Number(),
  }),
  dt: Type.Number(),
  sys: Type.Object({
    type: Type.Number(),
    id: Type.Number(),
    country: Type.String(),
    sunrise: Type.Number(),
    sunset: Type.Number(),
  }),
  timezone: Type.Number(),
  id: Type.Number(),
  name: Type.String(),
  cod: Type.Number(),
});
/* eslint-enable sort-keys */

export type CurrentType = Static<typeof CurrentType>;
