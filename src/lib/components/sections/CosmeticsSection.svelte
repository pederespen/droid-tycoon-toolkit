<script lang="ts">
  import DataTable, {
    type Column,
    type Row,
  } from '$lib/components/DataTable.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { effects, hats, paints } from '$lib/cosmeticsData'
  import type { Cosmetic } from '$lib/types'

  const columns: Column[] = [
    { key: 'name', label: 'Cosmetic' },
    { key: 'requirement', label: 'How to unlock' },
  ]

  const groups: { title: string; description: string; rows: Row[] }[] = [
    {
      title: 'Hats',
      description: 'Most hats are found out in the world.',
      rows: hats as unknown as Row[],
    },
    {
      title: 'Base Paints',
      description:
        'Paints unlock through rebirths, crafting milestones and events.',
      rows: paints as unknown as Row[],
    },
    {
      title: 'Droid Effects',
      description: 'Visual effects applied to your droids.',
      rows: effects as unknown as Row[],
    },
  ]
</script>

<div class="flex flex-col gap-10">
  {#each groups as group (group.title)}
    <div>
      <SectionHeader title={group.title} description={group.description}>
        {group.rows.length}
      </SectionHeader>
      <DataTable
        {columns}
        rows={group.rows}
        rowKey={(row) => (row as Cosmetic).name}
      >
        {#snippet cell(row, column)}
          {#if column.key === 'name'}
            <span class="font-medium text-foreground">{row.name}</span>
          {:else}
            <span class="text-muted">{row.requirement}</span>
          {/if}
        {/snippet}
      </DataTable>
    </div>
  {/each}
</div>
