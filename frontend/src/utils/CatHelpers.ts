//! HELPER FOR EXTRACTING PTS FOR UNITS/MODELS - IMPORTED IN UnitSelectionCard.vue

export function extractPoints(entry: any): number {
  //? check cost

  if (entry.costs) {
    if (Array.isArray(entry.costs.cost)) {
      const ptsEntry = entry.costs.cost.find(
        (c: any) => c.name?.toLowerCase() === "pts"
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
