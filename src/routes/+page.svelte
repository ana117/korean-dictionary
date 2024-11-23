<script lang="ts">
	import ResultCard from '$lib/components/ResultCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

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

<main class="mx-auto flex h-full max-h-full w-full flex-col overflow-y-auto p-8 lg:w-5/6 xl:w-2/3">
	<SearchBar />

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
