<script lang="ts">
	import { getContext } from 'svelte';
	import Key from '$lib/components/keyboard/Key.svelte';

	interface KeyType {
		symbol: string;
		altSymbol: string;
		customClass?: string;
		customTextClass?: string;
	}

	let { handleEnter } = $props();

	let searchContext = getContext<{ searchQuery: string }>('searchQuery');

	let isCapsLocked = $state(false);
	let isShifted = $state(false);

	let useAltKey = $derived(isCapsLocked || isShifted);

	const handleKeyClick = (symbol: string) => {
		switch (symbol) {
			case 'Backspace':
			case '⌫':
				searchContext.searchQuery = searchContext.searchQuery.slice(0, -1);
				break;

			case 'Tab':
			case 'LCtrl':
			case 'RCtrl':
			case '​':
				break;

			case 'Space':
				searchContext.searchQuery = searchContext.searchQuery + ' ';
				break;

			case 'Caps Lock':
			case '⛭':
				isCapsLocked = !isCapsLocked;
				break;

			case 'LShift':
			case 'RShift':
			case '⇧':
				isShifted = !isShifted;
				break;

			case 'Enter':
			case '↵':
				handleEnter();
				break;

			default:
				searchContext.searchQuery = searchContext.searchQuery + (useAltKey ? symbol : symbol);
				break;
		}
	};

	const keys: KeyType[][] = [
		[
			{ symbol: '`', altSymbol: '~', customClass: 'hidden md:block' },
			{ symbol: '1', altSymbol: '!' },
			{ symbol: '2', altSymbol: '@' },
			{ symbol: '3', altSymbol: '#' },
			{ symbol: '4', altSymbol: '$' },
			{ symbol: '5', altSymbol: '%' },
			{ symbol: '6', altSymbol: '^' },
			{ symbol: '7', altSymbol: '&' },
			{ symbol: '8', altSymbol: '*' },
			{ symbol: '9', altSymbol: '(' },
			{ symbol: '0', altSymbol: ')' },
			{ symbol: '-', altSymbol: '_', customClass: 'hidden md:block' },
			{ symbol: '=', altSymbol: '+', customClass: 'hidden md:block' },
			{ symbol: 'Backspace', altSymbol: 'Backspace', customClass: 'hidden md:block' }
		],
		[
			{ symbol: 'Tab', altSymbol: 'Tab', customClass: 'hidden md:block' },
			{ symbol: 'ㅂ', altSymbol: 'ㅃ' },
			{ symbol: 'ㅈ', altSymbol: 'ㅉ' },
			{ symbol: 'ㄷ', altSymbol: 'ㄸ' },
			{ symbol: 'ㄱ', altSymbol: 'ㄲ' },
			{ symbol: 'ㅅ', altSymbol: 'ㅆ' },
			{ symbol: 'ㅛ', altSymbol: '' },
			{ symbol: 'ㅕ', altSymbol: '' },
			{ symbol: 'ㅑ', altSymbol: '' },
			{ symbol: 'ㅐ', altSymbol: 'ㅒ' },
			{ symbol: 'ㅔ', altSymbol: 'ㅖ' },
			{ symbol: '[', altSymbol: '{', customClass: 'hidden md:block' },
			{ symbol: ']', altSymbol: '}', customClass: 'hidden md:block' },
			{ symbol: '\\', altSymbol: '|', customClass: 'hidden md:block' }
		],
		[
			{ symbol: 'Caps Lock', altSymbol: 'Caps Lock', customClass: 'hidden md:block' },
			{
				symbol: '​',
				altSymbol: '1',
				customClass: 'border-none hover:bg-white cursor-default md:hidden',
				customTextClass: 'text-white'
			},
			{ symbol: 'ㅁ', altSymbol: '' },
			{ symbol: 'ㄴ', altSymbol: '' },
			{ symbol: 'ㅇ', altSymbol: '' },
			{ symbol: 'ㄹ', altSymbol: '' },
			{ symbol: 'ㅎ', altSymbol: '' },
			{ symbol: 'ㅗ', altSymbol: '' },
			{ symbol: 'ㅓ', altSymbol: '' },
			{ symbol: 'ㅏ', altSymbol: '' },
			{ symbol: 'ㅣ', altSymbol: '' },
			{ symbol: ';', altSymbol: ':', customClass: 'hidden md:block' },
			{ symbol: "'", altSymbol: '"', customClass: 'hidden md:block' },
			{ symbol: 'Enter', altSymbol: 'Enter', customClass: 'hidden md:block' },
			{
				symbol: '​',
				altSymbol: '2',
				customClass: 'border-none hover:bg-white cursor-default md:hidden',
				customTextClass: 'text-white'
			}
		],
		[
			{ symbol: 'LShift', altSymbol: 'LShift', customClass: 'hidden md:block' },
			{ symbol: '⇧', altSymbol: '⇧', customClass: 'md:hidden', customTextClass: 'text-2xl' },
			{ symbol: 'ㅋ', altSymbol: ',' },
			{ symbol: 'ㅌ', altSymbol: '' },
			{ symbol: 'ㅊ', altSymbol: '' },
			{ symbol: 'ㅍ', altSymbol: '' },
			{ symbol: 'ㅠ', altSymbol: '' },
			{ symbol: 'ㅜ', altSymbol: '' },
			{ symbol: 'ㅡ', altSymbol: '.' },
			{ symbol: ',', altSymbol: '<', customClass: 'hidden md:block' },
			{ symbol: '.', altSymbol: '>', customClass: 'hidden md:block' },
			{ symbol: '/', altSymbol: '?', customClass: 'hidden md:block' },
			{ symbol: 'RShift', altSymbol: 'RShift', customClass: 'hidden md:block' },
			{ symbol: '⌫', altSymbol: '⌫', customClass: 'md:hidden', customTextClass: 'text-xl' }
		],
		[
			{ symbol: 'LCtrl', altSymbol: 'LCtrl', customClass: 'hidden md:block' },
			{ symbol: '⛭', altSymbol: '⛭', customClass: 'md:hidden', customTextClass: 'text-xl' },
			{ symbol: 'Space', altSymbol: 'Space' },
			{ symbol: 'RCtrl', altSymbol: 'RCtrl', customClass: 'hidden md:block' },
			{ symbol: '↵', altSymbol: '↵', customClass: 'md:hidden', customTextClass: 'text-2xl' }
		]
	];
</script>

<div class="grid max-h-full grid-rows-5">
	{#each keys as row, i}
		<div class={`flex w-full ${i === 0 ? '' : 'mt-1'}`}>
			{#each row as key}
				<Key
					{...key}
					{useAltKey}
					keyClick={(symbol: string) => {
						handleKeyClick(symbol);
					}}
				/>
			{/each}
		</div>
	{/each}
</div>
