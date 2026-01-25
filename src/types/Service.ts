
export type Service = {
  service_id: string;
  business_id: string;
  service_title: string;
  description?: string;
  price: number;
  start_hour: string;
  end_hour?: string;
}

export type Schedule = {
  schedule_id: string;
  service_id: string;
  customer_id: string;
  schedule_hour: string;
  schedule_date: Date;
  name: string;
  phone: string;
}

