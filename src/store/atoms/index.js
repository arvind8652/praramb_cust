import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({ storage: localStorage });

export const customerDetail = atom({
  key: "customerDetail",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const attendance = atom({
  key: "attendance",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export const notifications = atom({
  key: "notifications",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const notificationSingleData = atom({
  key: "notificationSingleData",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const customers = atom({
  key: "customers",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const customerSingleData = atom({
  key: "customerSingleData",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const summary = atom({
  key: "summary",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const loginDetail = atom({
  key: "loginDetail",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export const chat = atom({
  key: "chat",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
