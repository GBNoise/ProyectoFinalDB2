export type AppUser = {
  AppUserID?: number;
  Username: string;
  Pass: string;
  Email: string;
  isVerified?: boolean;
  isActivated?: boolean;
  isBlocked?: boolean;
};

export type Link = {
  LinkID?: number;
  Link: string;
  AppUserID: number;
};

export type Productor = {
  ProductorID?: number;
  Nombre: string;
  Identidad: string;
};

export type Tables = Productor | AppUser | Link;

export interface ServerResponse {
  message: string;
  object?: any;
  statusCode: number;
}
