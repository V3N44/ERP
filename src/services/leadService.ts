import { api } from "@/config/api"

export interface Lead {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  interested_in: string
  notes: string
}

interface LeadsParams {
  skip: number
  limit: number
}

export const createLead = async (data: Omit<Lead, "id">) => {
  const response = await api.post("/leads/", data)
  return response.data
}

export const getLeads = async ({ skip, limit }: LeadsParams) => {
  const response = await api.get(`/leads/?skip=${skip}&limit=${limit}`)
  return response.data
}