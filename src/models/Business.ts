
export interface Business {
  name: string;
  email: string;
  password: string;
}

export interface BusinessPayload {
  token: string;
  message: string;
  payload: {
    businessId: string;
    name: string;
    email: string;
  }
}


