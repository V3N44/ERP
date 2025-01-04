import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { getLeads } from "@/services/leadService"
import { LeadsList } from "@/components/leads/LeadsList"
import { Loader2 } from "lucide-react"

const LeadsPage = () => {
  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: () => getLeads({ skip: 0, limit: 100 }),
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching leads:', error)
      }
    }
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading leads: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-purple-900 mb-6">Leads List</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsList leads={leads} />
        </CardContent>
      </Card>
    </div>
  )
}

export default LeadsPage