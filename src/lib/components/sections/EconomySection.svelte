<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import DataTable, {
    type Column,
    type ColumnGroup,
    type Row,
  } from '$lib/components/DataTable.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { droids } from '$lib/droidsData'
  import {
    droidEconomy,
    flawlessSpawnOdds,
    iconicIncome,
    sellValues,
    upgradeCosts,
  } from '$lib/economyData'
  import { rarityTone, variantTone } from '$lib/display'
  import type { DroidCategory, Variant } from '$lib/types'

  const categoryByName = new Map(droids.map((d) => [d.name, d.category]))

  // --- Main economy table -------------------------------------------------
  const econGroups: ColumnGroup[] = [
    { label: '', span: 1 },
    { label: 'Base', span: 3 },
    { label: 'Gold', span: 3 },
    { label: 'Diamond', span: 3 },
    { label: 'Rainbow', span: 3 },
    { label: 'Beskar', span: 3 },
  ]

  const variantKeys = ['base', 'gold', 'diamond', 'rainbow', 'beskar'] as const

  const econColumns: Column[] = [
    { key: 'name', label: 'Droid' },
    ...variantKeys.flatMap((v) => [
      { key: `${v}Cost`, label: 'Cost', align: 'right' as const },
      { key: `${v}Income`, label: 'Income', align: 'right' as const },
      { key: `${v}Value`, label: 'Value', align: 'right' as const },
    ]),
  ]

  const econRows: Row[] = droidEconomy.map((d) => {
    const row: Row = { name: d.name }
    for (const v of variantKeys) {
      const stats = d[v]
      row[`${v}Cost`] = stats.cost ?? '—'
      row[`${v}Income`] = stats.income ? `${stats.income}/s` : '—'
      row[`${v}Value`] = stats.value ?? '—'
    }
    return row
  })

  // --- Upgrade costs (chips) ---------------------------------------------
  const rarities: DroidCategory[] = ['Common', 'Rare', 'Epic', 'Legendary']

  const upgradeColumns: Column[] = [
    { key: 'rarity', label: 'Rarity' },
    { key: 'baseToGold', label: 'Base → Gold', align: 'right' },
    { key: 'goldToDiamond', label: 'Gold → Diamond', align: 'right' },
    { key: 'diamondToRainbow', label: 'Diamond → Rainbow', align: 'right' },
    { key: 'rainbowToBeskar', label: 'Rainbow → Beskar', align: 'right' },
  ]

  const upgradeRows: Row[] = rarities.map((rarity) => {
    const c = upgradeCosts[rarity as keyof typeof upgradeCosts]
    return {
      rarity,
      baseToGold: `${c.baseToGold}`,
      goldToDiamond: `${c.goldToDiamond}`,
      diamondToRainbow: `${c.diamondToRainbow}`,
      rainbowToBeskar: `${c.rainbowToBeskar}`,
    }
  })

  // --- Sell values (chips) -----------------------------------------------
  const sellColumns: Column[] = [
    { key: 'rarity', label: 'Rarity' },
    { key: 'gold', label: 'Gold', align: 'right' },
    { key: 'diamond', label: 'Diamond', align: 'right' },
    { key: 'rainbow', label: 'Rainbow', align: 'right' },
    { key: 'beskar', label: 'Beskar', align: 'right' },
  ]

  const sellRows: Row[] = rarities.map((rarity) => {
    const s = sellValues[rarity as keyof typeof sellValues]
    return {
      rarity,
      gold: `${s.gold}`,
      diamond: `${s.diamond}`,
      rainbow: `${s.rainbow}`,
      beskar: `${s.beskar}`,
    }
  })

  // --- Flawless spawn odds ------------------------------------------------
  const oddsColumns: Column[] = [
    { key: 'variant', label: 'Variant' },
    { key: 'odds', label: 'Flawless chance', align: 'right' },
  ]

  const oddsRows: Row[] = (Object.keys(flawlessSpawnOdds) as Variant[]).map(
    (variant) => ({
      variant,
      odds: `1 / ${flawlessSpawnOdds[variant]}`,
    }),
  )

  // --- Iconic income ------------------------------------------------------
  const iconicColumns: Column[] = [
    { key: 'name', label: 'Droid' },
    { key: 'income', label: 'Income', align: 'right' },
  ]

  const iconicRows: Row[] = iconicIncome.map((d) => ({
    name: d.name,
    income: d.income ? `${d.income}/s` : 'Coming soon',
  }))
</script>

<div class="flex flex-col gap-10">
  <div>
    <SectionHeader
      title="Droid Economy"
      description="Purchase cost, passive income per second, and sell value for every droid across all five variants."
    >
      {droidEconomy.length} droids
    </SectionHeader>
    <DataTable
      columns={econColumns}
      rows={econRows}
      groups={econGroups}
      stickyFirstColumn
      rowKey={(row) => row.name as string}
    >
      {#snippet cell(row, column)}
        {#if column.key === 'name'}
          <div class="flex items-center gap-2">
            <span class="font-medium text-foreground">{row.name}</span>
            {#if categoryByName.get(row.name as string)}
              {@const cat = categoryByName.get(row.name as string)!}
              <Badge tone={rarityTone[cat]}>{cat}</Badge>
            {/if}
          </div>
        {:else}
          {row[column.key]}
        {/if}
      {/snippet}
    </DataTable>
  </div>

  <div>
    <SectionHeader
      title="Iconic Droids"
      description="Event-locked droids generate a percentage of total income per second instead of a flat amount."
    />
    <DataTable
      columns={iconicColumns}
      rows={iconicRows}
      rowKey={(row) => row.name as string}
    >
      {#snippet cell(row, column)}
        {#if column.key === 'name'}
          <span class="font-medium text-foreground">{row.name}</span>
        {:else}
          {row[column.key]}
        {/if}
      {/snippet}
    </DataTable>
  </div>

  <div class="grid gap-8 lg:grid-cols-2">
    <div>
      <SectionHeader title="Upgrade Costs">chips per upgrade</SectionHeader>
      <DataTable
        columns={upgradeColumns}
        rows={upgradeRows}
        rowKey={(row) => row.rarity as string}
      >
        {#snippet cell(row, column)}
          {#if column.key === 'rarity'}
            <Badge tone={rarityTone[row.rarity as DroidCategory]}>
              {row.rarity}
            </Badge>
          {:else}
            {row[column.key]}
          {/if}
        {/snippet}
      </DataTable>
    </div>

    <div>
      <SectionHeader title="Sell Value">chips per droid</SectionHeader>
      <DataTable
        columns={sellColumns}
        rows={sellRows}
        rowKey={(row) => row.rarity as string}
      >
        {#snippet cell(row, column)}
          {#if column.key === 'rarity'}
            <Badge tone={rarityTone[row.rarity as DroidCategory]}>
              {row.rarity}
            </Badge>
          {:else}
            {row[column.key]}
          {/if}
        {/snippet}
      </DataTable>
    </div>

    <div>
      <SectionHeader
        title="Flawless Spawn Odds"
        description="Chance for a freshly crafted droid to roll flawless."
      />
      <DataTable
        columns={oddsColumns}
        rows={oddsRows}
        rowKey={(row) => row.variant as string}
      >
        {#snippet cell(row, column)}
          {#if column.key === 'variant'}
            <Badge tone={variantTone[row.variant as Variant]}>
              {row.variant}
            </Badge>
          {:else}
            {row[column.key]}
          {/if}
        {/snippet}
      </DataTable>
    </div>
  </div>
</div>
