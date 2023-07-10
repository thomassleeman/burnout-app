export interface User {
  uid: string;
  providerData: ProviderData[];
  email: string;
  displayName: string;
}

export interface ProviderData {
  uid: string;
  providerId: string;
  email: string;
}
