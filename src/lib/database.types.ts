export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      journals: {
        Row: {
          created_at: string
          description: string
          id: string
          summary: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id: string
          summary?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          summary?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          user_name: string
        }
        Insert: {
          id?: number
          user_name: string
        }
        Update: {
          id?: number
          user_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
