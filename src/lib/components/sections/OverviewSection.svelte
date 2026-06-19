<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import { handleLinkClick, href } from '$lib/router.svelte'
  import { sectionGroups } from '$lib/sections'
</script>

<div class="mx-auto max-w-4xl">
  <div class="mb-8">
    <h1 class="text-2xl font-semibold text-foreground">Droid Tycoon Toolkit</h1>
  </div>

  <div class="space-y-8">
    {#each sectionGroups as group (group.label)}
      <section>
        <h2
          class="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle"
        >
          {group.label}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          {#each group.sections as section (section.id)}
            <a
              href={href(section.path)}
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
                  <h3 class="text-base font-semibold text-foreground">
                    {section.label}
                  </h3>
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
      </section>
    {/each}
  </div>
</div>
