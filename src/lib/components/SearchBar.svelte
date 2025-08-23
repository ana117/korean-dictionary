<script lang="ts">
	import { getContext } from 'svelte';

	type SearchBarProps = {
		handleShowKeyboard: () => void;
		handleSearch: () => void;
	};

	let { handleShowKeyboard, handleSearch }: SearchBarProps = $props();
	let searchContext = getContext<{ searchQuery: string }>('searchQuery');
</script>

<div class="flex">
	<div class="relative flex grow items-center">
		<form onsubmit={handleSearch} class="w-full">
			<input
				type="text"
				placeholder="Type here"
				class="w-full rounded-l-2xl border-2 border-foreground py-2 pe-20 ps-5 text-lg focus:outline-0"
				bind:value={searchContext.searchQuery}
			/>

			<button class="absolute right-4" onclick={handleShowKeyboard} type="button" aria-label="Toggle Floating Keyboard">
				<span class="sr-only">Floating Keyboard</span>
				<svg viewBox="0 0 24 24" class="h-8 w-8 fill-foreground md:h-12 md:w-12">
					<path
						d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 2h2v2h-2V7zm0 4h2v2h-2v-2zM9 7h2v2H9V7zm0 4h2v2H9v-2zM5 7h2v2H5V7zm0 4h2v2H5v-2zm12 6H7v-2h10v2zm2-4h-2v-2h2v2zm0-4h-2V7h2v2z"
					>
					</path>
				</svg>
			</button>
		</form>
	</div>

	<button
		onclick={handleSearch}
		class="w-2/6 rounded-r-2xl border-2 border-foreground bg-foreground px-2 py-2 text-lg font-bold text-background ease-in md:w-1/6 md:px-5"
	>
		Search
	</button>
</div>
