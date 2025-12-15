interface selectionGroup {
  type: "group";
  name: string;
  xml_id: string;
  is_root: boolean;
  data: (selectionGroup | selectionEntry)[];
}

interface selectionEntry {
  type: "entry";
  name: string;
  xml_id: string;
  checked: boolean;
}
