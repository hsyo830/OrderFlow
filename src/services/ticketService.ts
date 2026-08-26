import { createClient } from "@/lib/supabase/client";

export const fetchTickets = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("tickets").select(`
      *,
      venues(name),
      ticket_grade_price(price)
    `);

  if (error) throw error;

  return data;
};
