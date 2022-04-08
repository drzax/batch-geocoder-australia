<script lang="ts">
	export let results: string;
	export let addresses: string = '';
</script>

<div>
	<h1>Batch geocoder for Australian addresses</h1>
	<form method="post">
		<label for="addresses">Addresses to geocode (1 per line)</label>
		<textarea name="addresses" id="addresses" value={addresses} />
		<button>Submit</button>
	</form>

	{#if results}
		<h2>Results</h2>
		<textarea readonly>{results}</textarea>
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	textarea {
		display: block;
		height: 12em;
		width: 80vw;
		margin-bottom: 1rem;
	}
	button {
		margin: 0 auto 10vh;
		color: #000;
		vertical-align: middle;
		padding: 10px;
		font-weight: bold;
		text-transform: uppercase;
		border-radius: 0;
		font-size: 1.2rem;
		border: 1px solid #000;
		position: relative;
		z-index: 2;
		box-shadow: 10px 10px 0px #000;
		&:active {
			transform: translate(5px, 5px);
			box-shadow: 3px 3px 0px #000;
		}
	}
</style>
