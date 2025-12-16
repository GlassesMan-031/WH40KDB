<script setup lang="ts">
import axios from "axios";
import type { selectionEntry, selectionGroup } from "../utils/interfaces.ts";
import { onMounted, ref, watch } from "vue";
import EntryGroupBlock from "./EntryGroupBlock.vue";

type Unit = {
  id: number;
  name: string;
  type: string;
  points: number;
};

const props = defineProps<{
  unitData: Unit;
}>();

const unitProfile = ref<any | null>(null);
const unitSelections = ref<selectionGroup | null>(null);

async function fetchUnitData() {
  try {
    const { data } = await axios.get("/api/warhammer");

    const entries: any[] =
      data?.catalogue?.sharedSelectionEntries?.selectionEntry ?? [];
    unitProfile.value = entries.find((entry) => entry.id === props.unitData.id);

    function selectionGroupCrawl(group: any, is_root: boolean): selectionGroup {
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
    console.log("crawling");
    unitSelections.value = selectionGroupCrawl(unitProfile.value, true);
    console.log("finished");
    console.log(unitSelections.value);
  } catch (err) {
    console.log(err);
    console.log("uh oh");
  }
}

onMounted(() => {
  fetchUnitData();
});

watch(props, (_newVal) => {
  console.log("change watched");
  fetchUnitData();
});

// use this to update unit data in the backend
function updateUnitSaveData(group: selectionGroup) {
  // todo
  console.log(group);
  return;
}
</script>

<template>
  <section
    id="uniteditor"
    class="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col"
  >
    <h3
      id="unitname"
      class="text-xl font-semibold mb-4 shrink-0"
      v-if="props.unitData"
    >
      {{ props.unitData.name }}
    </h3>
    <div v-if="unitProfile != null" class="flex flex-row">
      <div id="unitstats" class="flex-1">
        <h5 class="text-lg font-semibold shrink-0">Stats</h5>
        <ul class="mr-8">
          <li
            v-for="value in unitProfile.profiles?.profile.find((p: any) => {
              if (p.typeName === 'Unit') {
                return p;
              }
            }).characteristics.characteristic"
            class="min-h-6 pl-2 pr-2 bg-gray-100 rounded-lg mb-2 shadow-sm"
          >
            <span class="float-left"> {{ value.name }}:</span
            ><span class="float-right">{{ value.value }}</span>
          </li>
        </ul>
      </div>
      <div id="unitselections" class="flex-3" v-if="unitSelections">
        <h5 class="text-lg font-semibold shrink-0">Selections</h5>
        <EntryGroupBlock
          :group="unitSelections"
          :rootIndex="0"
          @groupUpdate="
            (d) => {
              updateUnitSaveData(d.group);
            }
          "
        ></EntryGroupBlock>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #e5e7eb;
  border-radius: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 4px;
}
</style>
