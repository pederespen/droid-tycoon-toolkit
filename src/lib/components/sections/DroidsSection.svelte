<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import DataTable, {
    type Column,
    type Row,
  } from '$lib/components/DataTable.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { droids } from '$lib/droidsData'
  import { rarityTone, typeTone } from '$lib/display'
  import type { Droid } from '$lib/types'

  const columns: Column[] = [
    { key: 'name', label: 'Droid' },
    { key: 'category', label: 'Rarity' },
    { key: 'type', label: 'Slot' },
  ]

  const rows = droids as unknown as Row[]
</script>

<SectionHeader
  title="Droid Roster"
  description="Every droid in the game, grouped by rarity. Iconic droids are event-locked and only come in their base variant."
>
  {droids.length} droids
</SectionHeader>

<DataTable {columns} {rows} rowKey={(row) => (row as Droid).name}>
  {#snippet cell(row, column)}
    {@const droid = row as Droid}
    {#if column.key === 'name'}
      <span class="font-medium text-foreground">{droid.name}</span>
    {:else if column.key === 'category'}
      <Badge tone={rarityTone[droid.category]}>{droid.category}</Badge>
    {:else if column.key === 'type'}
      <Badge tone={typeTone[droid.type]}>{droid.type}</Badge>
    {/if}
  {/snippet}
</DataTable>
