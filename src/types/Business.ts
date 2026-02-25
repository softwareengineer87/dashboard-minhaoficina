export type BusinessPayload = {
  token: string;
  message: string;
  payload: {
    businessId: string;
    name: string;
    email: string;
  }
}

