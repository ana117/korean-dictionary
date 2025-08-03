<script lang="ts">
	import type { KoreanWord } from '$lib/types';

	export let word: KoreanWord;
	export let isFirst: boolean;

	let dialog: HTMLDialogElement;

	const externalLink = `https://krdict.korean.go.kr/eng/dicSearch/SearchView?nation=eng&nationCode=6&ParaWordNo=${word.code}`;
	const firstElementClass = isFirst ? 'lg:col-span-3 md:col-span-2 sticky top-0 z-10' : '';
</script>

<button
	class="rounded-md bg-accent p-5 shadow-lg hover:scale-105 {firstElementClass}"
	on:click={() => dialog.showModal()}
>
	<p class="fonr-bold text-3xl text-text">
		{word.koreanWord}
	</p>
	<ul class="hidden md:list-item">
		{#each word.translations as translation}
			<li>
				{translation.text}
			</li>
		{/each}
	</ul>
	<ul class="md:hidden">
		{#each word.translations.slice(0, 3) as translation}
			<li>
				{translation.text}
			</li>
		{/each}
	</ul>
</button>

<dialog bind:this={dialog} class="w-5/6 rounded-md bg-background px-8 md:w-1/2">
	<div class="flex h-full flex-col items-center">
		<div
			class="sticky top-0 flex h-16 w-full justify-center border-b-2 border-foreground/25 bg-background pt-5"
		>
			<h2 class="text-3xl font-bold">
				{word.koreanWord}
			</h2>
			<a href={externalLink} target="_blank" rel="noopener noreferrer" class="group relative">
				<span class="sr-only"> External link to the Korean Dictionary </span>
				<svg
					viewBox="0 0 24 24"
					class="absolute -right-6 top-0 h-5 w-5 rounded-sm p-0.5 group-hover:scale-110 group-hover:bg-primary group-hover:fill-background"
				>
					<path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
					<path
						d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"
					></path>
				</svg>
			</a>
		</div>

		<div class="w-full overflow-y-auto py-4">
			<ul>
				{#each word.translations as translation, i}
					<li class="mb-4 text-xl">
						<span class="font-bold">
							{i + 1}. {translation.text === '' ? '(no equivalent expression)' : translation.text}
						</span>
						<br />
						<span>{translation.definition}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div
			class="sticky bottom-0 flex h-16 w-full justify-center border-t-2 border-foreground/25 bg-background pb-5"
		>
			<button
				on:click={() => dialog.close()}
				class="text-xl font-bold underline-offset-4 hover:underline"
			>
				Close
			</button>
		</div>
	</div>
</dialog>
