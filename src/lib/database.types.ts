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
          img_path: string
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id: string
          img_path?: string
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          img_path?: string
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          id: string
          is_done: boolean
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_done?: boolean
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_done?: boolean
          title?: string
          user_id?: string
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
