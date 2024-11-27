<script lang="ts">
	import { setContext } from 'svelte';
	import * as hangul from 'hangul-js';

	import ResultCard from '$lib/components/ResultCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import VirtualKeyboard from '$lib/components/keyboard/VirtualKeyboard.svelte';
	import type { KoreanWord } from '$lib/types';

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
		searchQuery = hangul.assemble(searchQuery.split(''));
	});

	const handleSearch = () => {
		if (searchQuery) console.log('Search query:', searchQuery);
	};

	const mockResult: KoreanWord[] = [
		{
			code: '1',
			koreanWord: '안녕',
			translations: [
				{
					text: 'hello',
					definition: 'a greeting'
				},
				{
					text: 'hi',
					definition: 'a greeting'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑 사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑사랑 사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑 사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑사랑 사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑 사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		},
		{
			code: '2',
			koreanWord: '사랑사랑 사랑',
			translations: [
				{
					text: 'love',
					definition: 'a feeling'
				}
			]
		}
	];
</script>

<main
	class="mx-auto flex h-full max-h-full w-full flex-col overflow-y-auto p-8 pb-4 lg:w-5/6 xl:w-2/3"
>
	<SearchBar handleShowKeyboard={() => (showKeyboard = !showKeyboard)} {handleSearch} />

	<div class="mt-8 grow overflow-y-auto px-6">
		<div
			class="grid grid-cols-1 content-start gap-x-4 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
		>
			{#each mockResult as word, i}
				<ResultCard {word} isFirst={i === 0} />
			{/each}
		</div>
	</div>
</main>

{#if showKeyboard}
	<div class="mx-auto w-full max-w-5xl py-2">
		<VirtualKeyboard handleEnter={handleSearch} />
	</div>
{/if}
