import type { CookieAcceptState } from '../../enums';

export type CookieDialogProps = {
  setCookieAcceptState: (arg: CookieAcceptState) => void;
  cookieAcceptState: CookieAcceptState;
};
