export type ShippingStatus = 
  | "Pending"
  | "Asking"
  | "Booking Waiting"
  | "Confirmed"
  | "Canceled";

export type FreightType = "Prepaid" | "Collect";

export type ShipType = "RoRo" | "Container" | "Other";

export type Forwarder = "FWT" | "JFA" | "Auto Hub" | "ECL";

export interface FreightForwarder {
  id: number;
  name: string;
  contact: string;
  country: string;
}

export interface CreateShipmentDTO {
  stock_number: string;
  country: string;
  status: ShippingStatus;
  etd: string;
  shipping_cost: number;
  insurance: number;
  freight_forwarder_id: number;
}

export interface ShippingOrder {
  id: string;
  soNumber: string;
  stockNumber: string;
  bookingStatus: ShippingStatus;
  shipType: ShipType;
  forwarder: Forwarder;
  freightType: FreightType;
  pol: string;
  pod: string;
  etd: string;
  eta: string;
  bookingNumber?: string;
  consignor?: string;
  consignee?: string;
  notify?: string;
  vessel?: string;
  voyageNo?: string;
  createdAt: string;
  updatedAt: string;
}