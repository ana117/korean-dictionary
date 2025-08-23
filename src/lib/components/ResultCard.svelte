<script lang="ts">
	import type { KoreanWord } from '$lib/types';

	export let word: KoreanWord;
	export let isFirst: boolean;

	let dialog: HTMLDialogElement;

	const externalLink = `https://krdict.korean.go.kr/eng/dicSearch/SearchView?nation=eng&nationCode=6&ParaWordNo=${word.code}`;
	const firstElementClass = isFirst ? 'lg:col-span-3 md:col-span-2 sticky top-0 z-10' : '';

	const playSound = (url: string | null) => {
		if (!url) return;
		const audio = new Audio(url);
		audio.play();
	};
</script>

<button
	class="rounded-md bg-accent p-5 shadow-lg hover:scale-105 {firstElementClass}"
	on:click={() => dialog.showModal()}
>
	<p class="fonr-bold text-3xl text-text">
		{word.koreanWord}
	</p>
	<ul class="hidden md:list-item">
		{#each word.translations.slice(0, 5) as translation}
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
			class="sticky top-0 h-16 w-full flex-col items-center gap-2 bg-background pt-5 mb-6"
		>
			<div class="flex justify-center border-b-2 pb-2 bg-background border-foreground/25">
				<h2>
					<span class="text-3xl font-bold">{word.koreanWord}</span>
					<br />
					<span class="text-lg">{word.romanization}</span>
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

			<div class="flex justify-between items-center w-full py-2 bg-background">
				<p class="text-lg">
					{word.partOfSpeech}
				</p>
	
				{#if word.pronounciation}
					<span class="flex items-center justify-center gap-3">
						{word.pronounciation.pronounciationText}
						<button
							on:click={() => {
								if (word.pronounciation) playSound(word.pronounciation.audioUrl);
							}}
							class="rounded-full bg-primary p-1 hover:scale-110 flex items-center justify-center"
							aria-label="Play Pronounciation"
						>
							<span class="sr-only">Play Pronounciation</span>
							<svg viewBox="0 0 72 72" fill="#fff" class="h-4 w-4">
								<path 
									d="M19.5816,55.6062 c0.4848,0.1782,1.0303,0.297,1.5758,0.297c0.8485,0,1.697-0.297,2.4242-0.7722l30-15.9793l0.303-0.297 c0.7879-0.7722,1.2121-1.7227,1.2121-2.7919c0-1.0692-0.4242-2.0791-1.2121-2.7919l-0.303-0.297l-30-16.0981 c-1.0909-0.8316-2.6667-1.0098-4-0.4752c-1.5152,0.594-2.4848,2.0791-2.4848,3.683v31.8397 C17.0967,53.5272,18.0664,55.0122,19.5816,55.6062z">
								</path> 
							</svg>
						</button>
					</span>
				{/if}
			</div>
		</div>


		<div class="w-full overflow-y-auto py-4 mt-10">
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
