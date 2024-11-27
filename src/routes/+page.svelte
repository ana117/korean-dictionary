<script lang="ts">
	import { setContext } from 'svelte';
	import * as hangul from 'hangul-js';

	import ResultCard from '$lib/components/ResultCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import VirtualKeyboard from '$lib/components/keyboard/VirtualKeyboard.svelte';
	import type { KoreanWord } from '$lib/types';

	let words = $state<KoreanWord[] | null>(null);
	let isLoading = $state(false);
	let error = $state('');

	let showKeyboard = $state(false);
	let searchQuery = $state('');
	setContext('searchQuery', {
		get searchQuery(): string {
			return searchQuery;
		},
		set searchQuery(value: string) {
			searchQuery = value;
		}
	});

	$effect(() => {
		const disassembled = hangul.disassemble(searchQuery);
		searchQuery = hangul.assemble(disassembled);
	});

	const handleSearch = () => {
		if (!searchQuery) return;

		isLoading = true;
		error = '';
		words = [];

		fetch('/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ word: searchQuery })
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Internal server error');
				}
				return res.json();
			})
			.then((data) => {
				words = data;
				isLoading = false;
			})
			.catch((err) => {
				error = err.message;
				isLoading = false;
			});
	};
</script>

<main
	class="mx-auto flex h-full max-h-full w-full flex-col overflow-y-auto p-8 pb-4 lg:w-5/6 xl:w-2/3"
>
	<SearchBar handleShowKeyboard={() => (showKeyboard = !showKeyboard)} {handleSearch} />

	<div class="mt-8 grow overflow-y-auto px-6">
		{#if isLoading}
			<div class="flex h-64 items-center justify-center">
				<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
			</div>
		{:else if error}
			<div
				class="mt-8 flex flex-col items-center justify-center gap-4 text-center text-2xl font-semibold"
			>
				<p class="text-red-600">Internal Server Error</p>
				<p>
					Please try again later or contact me through
					<a
						href="https://github.com/ana117/korean-dictionary/issues"
						target="_blank"
						class="underline-primary text-primary underline-offset-2 hover:underline">GitHub</a
					>
				</p>
			</div>
		{:else if words?.length}
			<div
				class="grid grid-cols-1 content-start gap-x-4 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
			>
				{#each words as word, i}
					<ResultCard {word} isFirst={i === 0} />
				{/each}
			</div>
		{:else if words?.length === 0}
			<div
				class="flex flex-col items-center justify-center gap-4 text-center text-2xl font-semibold"
			>
				<p class="font-semibold">No results found</p>
				<p class="text-text/50">Please try another search term</p>
			</div>
		{/if}
	</div>
</main>

{#if showKeyboard}
	<div class="mx-auto w-full max-w-5xl py-2">
		<VirtualKeyboard handleEnter={handleSearch} />
	</div>
{/if}
