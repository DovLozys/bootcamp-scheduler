export interface Event {
  id: string;
  event_name: string;
  event_description: string;
  event_date: string;
  event_start: string;
  event_duration: string;
  event_category: string;
  event_location: string;
  event_capacity: number;
  host_id?: string;
}

export interface EventFormData {
  event_name: string;
  event_description: string;
  event_date: string;
  event_start: string;
  event_end: string;
  event_category: string;
  event_location: string;
  event_capacity: string;
}

export interface UserInfo {
  id?: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
  event_name?: string;
  event_description?: string;
  event_category?: string;
  event_date?: string;
  event_start?: string;
  event_end?: string;
  event_location?: string;
  event_capacity?: string;
}

export interface APIResponse<T> {
  success: boolean;
  payload: T;
  error?: string;
}

export type EventCategory =
  | 'Class Schedule'
  | 'Guest Speaker'
  | 'Feedback'
  | 'Project';

export type SortOption = 'date' | 'name' | 'category';

export type TabType = 'upcoming' | 'past' | 'hosted';
