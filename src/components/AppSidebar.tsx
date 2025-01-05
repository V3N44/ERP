import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0">
        <MobileSidebar />
      </SheetContent>
      <div className="hidden border-r bg-background md:block">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            <div className="space-y-1">
              <Link to="/" className={cn("block p-2 rounded-md", location.pathname === "/" ? "bg-muted" : "hover:bg-muted")}>
                Dashboard
              </Link>
              <Link to="/sales/orders" className={cn("block p-2 rounded-md", location.pathname === "/sales/orders" ? "bg-muted" : "hover:bg-muted")}>
                Sales Orders
              </Link>
              <Link to="/sales/analytics" className={cn("block p-2 rounded-md", location.pathname === "/sales/analytics" ? "bg-muted" : "hover:bg-muted")}>
                Sales Analytics
              </Link>
              <Link to="/inventory" className={cn("block p-2 rounded-md", location.pathname === "/inventory" ? "bg-muted" : "hover:bg-muted")}>
                Inventory
              </Link>
              <Link to="/customers" className={cn("block p-2 rounded-md", location.pathname === "/customers" ? "bg-muted" : "hover:bg-muted")}>
                Customers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

function MobileSidebar() {
  return (
    <ScrollArea className="h-full py-6">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <Link to="/" className="block p-2 rounded-md hover:bg-muted">
              Dashboard
            </Link>
            <Link to="/sales/orders" className="block p-2 rounded-md hover:bg-muted">
              Sales Orders
            </Link>
            <Link to="/sales/analytics" className="block p-2 rounded-md hover:bg-muted">
              Sales Analytics
            </Link>
            <Link to="/inventory" className="block p-2 rounded-md hover:bg-muted">
              Inventory
            </Link>
            <Link to="/customers" className="block p-2 rounded-md hover:bg-muted">
              Customers
            </Link>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
