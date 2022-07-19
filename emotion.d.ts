/* eslint-disable @typescript-eslint/no-empty-interface */
import "@emotion/react";
import { override } from "./src/config/theme";

type ThemeType = typeof override;

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
