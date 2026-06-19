<script lang="ts">
  import Icon from './lib/components/Icon.svelte'
  import OverviewSection from './lib/components/sections/OverviewSection.svelte'
  import { handleLinkClick, router } from './lib/router.svelte'
  import { sectionByPath, sectionGroups, sections } from './lib/sections'
  import { getTheme, toggleTheme, type Theme } from './lib/theme'

  let theme = $state<Theme>(getTheme())

  const COLLAPSE_KEY = 'sidebar-collapsed'
  let collapsed = $state(localStorage.getItem(COLLAPSE_KEY) === 'true')

  let aboutOpen = $state(false)

  const SHEET_URL =
    'https://docs.google.com/spreadsheets/d/1otLCKSCMKICMlnefirQ8KZhh_rdZTd5Mp8h0UYFUiqg/edit'

  const current = $derived(sectionByPath(router.path))
  const isHome = $derived(router.path === '/')

  const onToggleTheme = () => {
    theme = toggleTheme()
  }

  const toggleCollapsed = () => {
    collapsed = !collapsed
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  }
</script>

<div class="mx-auto flex min-h-screen w-full max-w-[1500px]">
  <!-- Sidebar (desktop) -->
  <aside
    class="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border py-4 transition-all md:flex {collapsed
      ? 'w-16 px-2'
      : 'w-60 px-3'}"
  >
    <div
      class="flex items-center gap-2 px-1 {collapsed
        ? 'justify-center'
        : 'justify-between'}"
    >
      {#if !collapsed}
        <a
          href="/"
          onclick={(event) => handleLinkClick(event, '/')}
          title="Droid Tycoon"
          class="flex min-w-0 items-center gap-2.5 overflow-hidden rounded-lg px-2 py-1 transition-colors hover:bg-elevated/60"
        >
          <img src="/droid.svg" alt="" class="size-7 shrink-0" />
          <span class="flex min-w-0 flex-col">
            <span class="truncate text-sm font-semibold text-foreground">
              Droid Tycoon
            </span>
            <span class="truncate text-xs text-subtle">
              Toolkit &amp; reference
            </span>
          </span>
        </a>
      {/if}
      <button
        type="button"
        onclick={toggleCollapsed}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        class="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated/60 hover:text-foreground"
      >
        <Icon name="panel-left" size={18} />
      </button>
    </div>

    <nav class="mt-4 flex flex-col gap-4">
      {#each sectionGroups as group (group.label)}
        <div class="flex flex-col gap-0.5">
          {#if !collapsed}
            <span
              class="px-3 pb-1 text-xs font-medium tracking-wide text-subtle uppercase"
            >
              {group.label}
            </span>
          {/if}
          {#each group.sections as section (section.id)}
            <a
              href={section.path}
              onclick={(event) => handleLinkClick(event, section.path)}
              title={collapsed ? section.label : undefined}
              class="flex items-center gap-3 rounded-lg text-sm transition-colors {collapsed
                ? 'size-9 justify-center self-center'
                : 'px-3 py-2'} {current?.id === section.id
                ? 'bg-elevated font-medium text-foreground'
                : 'text-muted hover:bg-elevated/60 hover:text-foreground'}"
            >
              <Icon name={section.icon} size={18} />
              {#if !collapsed}<span>{section.label}</span>{/if}
            </a>
          {/each}
        </div>
      {/each}
    </nav>

    <div
      class="mt-auto flex items-center pt-2 {collapsed
        ? 'flex-col gap-1'
        : 'justify-between gap-2'}"
    >
      <!-- About (hover popover) -->
      <div
        class="relative"
        role="group"
        onmouseenter={() => (aboutOpen = true)}
        onmouseleave={() => (aboutOpen = false)}
      >
        <button
          type="button"
          onclick={() => (aboutOpen = !aboutOpen)}
          aria-label="About"
          aria-expanded={aboutOpen}
          class="flex cursor-pointer items-center gap-2 rounded-lg text-sm text-muted transition-colors hover:bg-elevated/60 hover:text-foreground {collapsed
            ? 'size-9 justify-center'
            : 'px-3 py-2'}"
        >
          <Icon name="info" size={18} />
          {#if !collapsed}<span>About</span>{/if}
        </button>

        {#if aboutOpen}
          <div class="absolute bottom-full left-0 z-40 w-72 pb-2">
            <div
              class="rounded-xl border border-border bg-surface p-4 shadow-lg"
            >
              <p class="text-sm font-semibold text-foreground">
                Droid Tycoon Toolkit
              </p>
              <p class="mt-1.5 text-xs leading-relaxed text-muted">
                A fan-made reference and set of planning tools for the Droid
                Tycoon Fortnite game. All game data is community-sourced and may
                change with updates.
              </p>
              <a
                href={SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                class="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-opacity hover:opacity-80"
              >
                <Icon name="external-link" size={14} />
                Data source spreadsheet
              </a>
            </div>
          </div>
        {/if}
      </div>

      <!-- Theme switch -->
      <button
        type="button"
        role="switch"
        aria-checked={theme === 'dark'}
        onclick={onToggleTheme}
        title={theme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'}
        aria-label={theme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'}
        class="relative flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-border bg-elevated px-0.5 transition-colors"
      >
        <span
          class="flex size-6 items-center justify-center rounded-full bg-surface text-muted shadow-sm transition-transform {theme ===
          'dark'
            ? 'translate-x-5'
            : 'translate-x-0'}"
        >
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={14} />
        </span>
      </button>
    </div>
  </aside>

  <div class="flex min-w-0 flex-1 flex-col">
    <!-- Top bar (mobile nav) -->
    <header
      class="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur md:hidden"
    >
      <div class="flex items-center justify-between px-4 py-3">
        <a
          href="/"
          onclick={(event) => handleLinkClick(event, '/')}
          class="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <img src="/droid.svg" alt="" class="size-6 shrink-0" />
          Droid Tycoon
        </a>
        <button
          type="button"
          onclick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          class="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated/60 hover:text-foreground"
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>
      </div>
      <nav class="flex gap-1 overflow-x-auto px-3 pb-2">
        <a
          href="/"
          onclick={(event) => handleLinkClick(event, '/')}
          class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors {isHome
            ? 'bg-elevated font-medium text-foreground'
            : 'text-muted hover:text-foreground'}"
        >
          <Icon name="home" size={16} />
          Home
        </a>
        {#each sections as section (section.id)}
          <a
            href={section.path}
            onclick={(event) => handleLinkClick(event, section.path)}
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors {current?.id ===
            section.id
              ? 'bg-elevated font-medium text-foreground'
              : 'text-muted hover:text-foreground'}"
          >
            <Icon name={section.icon} size={16} />
            {section.label}
          </a>
        {/each}
      </nav>
    </header>

    <main class="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      {#if isHome}
        <OverviewSection />
      {:else if current}
        <current.component />
      {:else}
        <OverviewSection />
      {/if}
    </main>
  </div>
</div>
