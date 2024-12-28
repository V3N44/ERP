import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/serviceService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ServiceList = () => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error loading services: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Services</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Charge</TableHead>
              <TableHead>VAT %</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service: { id: number; service_name: string; charge: number; service_vat_percent: number; description: string }) => (
              <TableRow key={service.id}>
                <TableCell>{service.service_name}</TableCell>
                <TableCell>${service.charge}</TableCell>
                <TableCell>{service.service_vat_percent}%</TableCell>
                <TableCell>{service.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};