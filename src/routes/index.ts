import geocode, { type GeocodeResult } from 'geocoder';

export const post = async ({ request }) => {
	const addressField = (await request.formData()).get('addresses') as string;
	const addresses = addressField.split('\n').map((address: string) => address.trim());

	const results = await addresses.reduce<Promise<GeocodeResult[]>>(async (acc, address, i) => {
		const memo = await acc;
		console.log('i, address :>> ', i, address);
		const result =
			address.length > 3
				? await geocode(address, 1).catch((err) => {
						console.error(err);
						return null;
				  })
				: null;
		memo.push(result);
		return memo;
	}, Promise.resolve([]));

	const result = results.map((r) => (r ? JSON.stringify(r.results[0]) : null)).join('\n');

	return { code: 200, body: { results: result, addresses: addressField } };
};
