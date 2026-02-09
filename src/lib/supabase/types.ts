export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          company_website: string | null;
          company_sector: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          company_website?: string | null;
          company_sector?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company?: string | null;
          company_website?: string | null;
          company_sector?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      campaigns: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          status: "active" | "completed" | "paused" | "draft";
          start_date: string | null;
          end_date: string | null;
          target_links: number;
          delivered_links: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          status?: "active" | "completed" | "paused" | "draft";
          start_date?: string | null;
          end_date?: string | null;
          target_links?: number;
          delivered_links?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          status?: "active" | "completed" | "paused" | "draft";
          start_date?: string | null;
          end_date?: string | null;
          target_links?: number;
          delivered_links?: number;
          updated_at?: string;
        };
      };
      backlinks: {
        Row: {
          id: string;
          campaign_id: string;
          url: string;
          anchor_text: string;
          target_url: string;
          dr: number;
          status: "live" | "pending" | "removed" | "replaced";
          live_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          url: string;
          anchor_text: string;
          target_url: string;
          dr?: number;
          status?: "live" | "pending" | "removed" | "replaced";
          live_date?: string | null;
          created_at?: string;
        };
        Update: {
          url?: string;
          anchor_text?: string;
          target_url?: string;
          dr?: number;
          status?: "live" | "pending" | "removed" | "replaced";
          live_date?: string | null;
        };
      };
      invoices: {
        Row: {
          id: string;
          user_id: string;
          number: string;
          amount: number;
          status: "paid" | "pending" | "overdue";
          due_date: string;
          pdf_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          number: string;
          amount: number;
          status?: "paid" | "pending" | "overdue";
          due_date: string;
          pdf_url?: string | null;
          created_at?: string;
        };
        Update: {
          number?: string;
          amount?: number;
          status?: "paid" | "pending" | "overdue";
          due_date?: string;
          pdf_url?: string | null;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string;
          type: "backlink" | "campaign" | "invoice" | "auth" | "profile";
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "backlink" | "campaign" | "invoice" | "auth" | "profile";
          message: string;
          created_at?: string;
        };
        Update: {
          type?: "backlink" | "campaign" | "invoice" | "auth" | "profile";
          message?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      campaign_status: "active" | "completed" | "paused" | "draft";
      backlink_status: "live" | "pending" | "removed" | "replaced";
      invoice_status: "paid" | "pending" | "overdue";
      activity_type: "backlink" | "campaign" | "invoice" | "auth" | "profile";
    };
  };
}
