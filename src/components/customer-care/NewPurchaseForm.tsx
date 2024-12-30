import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Purchase, PurchaseItem } from "@/types/purchases";
import { createPurchase } from "@/services/purchaseService";
import { toast } from "sonner";

export const NewPurchaseForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [date, setDate] = useState<Date>();
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const addItem = () => {
    setItems([...items, {
      product_name: "",
      stock_quantity: 0,
      expiry_date: "",
      batch_no: "",
      quantity: 0,
      rate: 0,
      discount_percent: 0,
      discount_value: 0,
      vat_percent: 0,
      vat_value: 0,
      total: 0
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof PurchaseItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      total: calculateItemTotal(newItems[index], field, value)
    };
    setItems(newItems);
  };

  const calculateItemTotal = (item: PurchaseItem, field: keyof PurchaseItem, newValue: string | number) => {
    const quantity = field === 'quantity' ? Number(newValue) : item.quantity;
    const rate = field === 'rate' ? Number(newValue) : item.rate;
    const discountPercent = field === 'discount_percent' ? Number(newValue) : item.discount_percent;
    const vatPercent = field === 'vat_percent' ? Number(newValue) : item.vat_percent;

    const subtotal = quantity * rate;
    const discountValue = (subtotal * discountPercent) / 100;
    const vatValue = ((subtotal - discountValue) * vatPercent) / 100;
    
    return subtotal - discountValue + vatValue;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || items.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const purchase: Purchase = {
      supplier_id: 1,
      purchase_date: date.toISOString(),
      challan_no: "CH-" + Date.now(),
      details: "Purchase order",
      total_purchase_amount: items.reduce((sum, item) => sum + (item.quantity * item.rate), 0),
      total_discount: items.reduce((sum, item) => sum + item.discount_value, 0),
      total_vat: items.reduce((sum, item) => sum + item.vat_value, 0),
      grand_total: items.reduce((sum, item) => sum + item.total, 0),
      paid_amount: 0,
      due_amount: items.reduce((sum, item) => sum + item.total, 0),
      payment_type: "credit",
      items: items
    };

    try {
      await createPurchase(purchase);
      toast.success("Purchase created successfully");
      onSuccess();
    } catch (error) {
      toast.error("Failed to create purchase");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label>Purchase Date</Label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setIsCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Items</Label>
          <Button type="button" onClick={addItem} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 p-4 border rounded-lg">
            <div className="col-span-6 sm:col-span-2">
              <Label>Product Name</Label>
              <Input
                value={item.product_name}
                onChange={(e) => updateItem(index, 'product_name', e.target.value)}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
              />
            </div>
            <div>
              <Label>Rate</Label>
              <Input
                type="number"
                value={item.rate}
                onChange={(e) => updateItem(index, 'rate', e.target.value)}
              />
            </div>
            <div>
              <Label>Total</Label>
              <Input value={item.total} readOnly />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full">Create Purchase</Button>
    </form>
  );
};