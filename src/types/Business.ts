export type BusinessPayload = {
  token: string;
  message: string;
  payload: {
    businessId: string;
    name: string;
    email: string;
    city: string;
    district: string;
    addressNumber: number;
    logo: string;
  }
}

