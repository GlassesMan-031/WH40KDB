//! HELPER FOR EXTRACTING PTS FOR UNITS/MODELS - IMPORTED IN UnitSelectionCard.vue
import type { selectionGroup, selectionEntry } from "./interfaces";
export function extractPoints(entry: any): number {
  //? check cost

  if (entry.costs) {
    if (Array.isArray(entry.costs.cost)) {
      const ptsEntry = entry.costs.cost.find(
        (c: any) => c.name?.toLowerCase() === "pts",
      );
      if (ptsEntry) return Number(ptsEntry.value ?? 0);
    } else if (entry.costs.cost?.value) {
      return Number(entry.costs.cost.value);
    }
  }

  //? check selectionEntry

  if (entry.selectionEntry) {
    const nested = Array.isArray(entry.selectionEntry)
      ? entry.selectionEntry
      : [entry.selectionEntry];
    for (const e of nested) {
      const points = extractPoints(e);
      if (points > 0) return points;
    }
  }

  //?  check selectionEntryGroups

  if (entry.selectionEntryGroups) {
    const groups = entry.selectionEntryGroups.selectionEntryGroup;
    const arr = Array.isArray(groups) ? groups : [groups];
    for (const g of arr) {
      if (g.selectionEntries?.selectionEntry) {
        const nestedEntries = Array.isArray(g.selectionEntries.selectionEntry)
          ? g.selectionEntries.selectionEntry
          : [g.selectionEntries.selectionEntry];
        for (const e of nestedEntries) {
          const points = extractPoints(e);
          if (points > 0) return points;
        }
      }
    }
  }

  //? final check profiles

  if (entry.profiles) {
    const profs = Array.isArray(entry.profiles.profile)
      ? entry.profiles.profile
      : [entry.profiles.profile];
    for (const p of profs) {
      const points = extractPoints(p);
      if (points > 0) return points;
    }
  }

  return 0;
}

export function selectionGroupCrawl(
  group: any,
  is_root: boolean,
): selectionGroup {
  console.log("newCrawl");
  console.log(group);
  let firstSelectable = true;
  let newGroup: selectionGroup = {
    type: "group",
    name: group.name,
    xml_id: group.id,
    is_root: is_root,
    data: [],
  };
  // crawl through entries
  if (
    group.selectionEntries &&
    group.selectionEntries.selectionEntry.length > 0
  ) {
    console.log("has entry");
    group.selectionEntries.selectionEntry.forEach((entry: any) => {
      let newEntry: selectionEntry = {
        type: "entry",
        name: entry.name,
        xml_id: entry.id,
        checked: firstSelectable,
      };
      firstSelectable = firstSelectable ? false : true;
      newGroup.data.push(newEntry);
    });
  } else if (group.selectionEntries) {
    if (group.selectionEntries.selectionEntry.type === "model") {
      console.log("has solo entry");
      let entry = group.selectionEntries.selectionEntry;
      let newEntry: selectionGroup = {
        type: "group",
        is_root: true,
        name: entry.name,
        xml_id: entry.id,
        data: [],
      };
      newEntry.data.push(selectionGroupCrawl(entry, false));
      newGroup.data.push(newEntry);
    }
    if (group.selectionEntries.selectionEntry.type !== "model") {
      console.log("has solo entry (non model)");
      let entry = group.selectionEntries.selectionEntry;
      let newEntry: selectionEntry = {
        type: "entry",
        name: entry.name,
        xml_id: entry.id,
        checked: false,
      };
      newGroup.data.push(newEntry);
    }
  }
  // crawl through groups
  if (group.selectionEntryGroups) {
    console.log("has group");
    // group.selectionEntryGroups.selectionEntryGroup.forEach(
    //   (entryGroup: any) => {
    //     let newEntryGroup: selectionGroup = selectionGroupCrawl(entryGroup);
    //     newGroup.data.push(newEntryGroup);
    //   },
    // );
    let newEntryGroup: selectionGroup = selectionGroupCrawl(
      group.selectionEntryGroups.selectionEntryGroup,
      false,
    );
    newGroup.data.push(newEntryGroup);
  }
  return newGroup;
}
