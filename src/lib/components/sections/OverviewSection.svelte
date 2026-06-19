<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import { handleLinkClick } from '$lib/router.svelte'
  import { sections } from '$lib/sections'
</script>

<div class="mx-auto max-w-4xl">
  <div class="mb-8">
    <h1 class="text-2xl font-semibold text-foreground">Droid Tycoon Toolkit</h1>
    <p class="mt-2 max-w-2xl text-sm text-muted">
      A clean reference for everything in the game — droids, the credit economy,
      rebirth requirements, the Nova Shop and cosmetics. Pick a section to dive
      in.
    </p>
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    {#each sections as section (section.id)}
      <a
        href={section.path}
        onclick={(event) => handleLinkClick(event, section.path)}
        class="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 hover:bg-elevated/50"
      >
        <div class="flex items-center gap-3">
          <span
            class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-elevated text-accent"
          >
            <Icon name={section.icon} size={20} />
          </span>
          <div class="flex flex-1 items-center justify-between">
            <h2 class="text-base font-semibold text-foreground">
              {section.label}
            </h2>
            <span
              class="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
            >
              <Icon name="arrow-right" size={18} />
            </span>
          </div>
        </div>
        <p class="mt-3 text-sm text-muted">{section.description}</p>
        <p class="mt-3 text-xs text-subtle">
          {section.count}
          {section.countLabel}
        </p>
      </a>
    {/each}
  </div>
</div>
