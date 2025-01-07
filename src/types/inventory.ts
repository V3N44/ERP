export interface InventoryFormData {
  product_name: string;
  category: string;
  quantity: number;
  price: number;
  supplier_id: number;
  chassis_number: string;
  engine_number: string;
  mileage: number;
  registration_year: number;
  evaluation_grade: string;
  make: string;
  model: string;
  fuel_type: string;
  transmission: string;
  steering: string;
  drive: string;
  seats: number;
  doors: number;
  colour: string;
  location: string;
  dimensions: string;
  m3_size: string;
  stock_no: string;
  image_url?: string;
  created_at?: string;
}

export interface InventoryItem extends InventoryFormData {
  id: number;
  created_at: string;
}