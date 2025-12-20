export interface safeAccount {
  id: number;
  username: string;
  email: string;
}

export interface unsafeAccount {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export interface army {
  id?: number;
  owner_id: number;
  name: string;
  max_points: number;
  created_at?: string;
}

// API 
export interface unit {
  id?: number;
  army_id: number;
  name: string;
  xml_id: string;
  selection: selectionGroup;
}

export interface selectionGroup {
  type: "group";
  name: string;
  xml_id: string;
  is_root: boolean;
  data: (selectionGroup | selectionEntry)[];
}

export interface selectionEntry {
  type: "entry";
  name: string;
  xml_id: string;
  checked: boolean;
}

// frontend
export interface Unit {
  id?: number;
  name: string;
  type: string;
  points: number;
  xml_id: string;

}
