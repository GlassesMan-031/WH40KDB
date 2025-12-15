export interface selectionGroup {
  type: 'group'
  name: string
  xml_id: string
  is_root: boolean
  data: (selectionGroup | selectionEntry)[]
}

export interface selectionEntry {
  type: 'entry'
  name: string
  xml_id: boolean
  checked: boolean
}
