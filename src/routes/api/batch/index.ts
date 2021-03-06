import { geocode, type GeocodeResult } from '$lib/geocoder';

export const post = async ({ request }) => {
	try {
		const addressField = (await request.formData()).get('addresses') as string;
		const addresses = addressField.split('\n').map((address: string) => address.trim());

		const results = await addresses.reduce<Promise<GeocodeResult[]>>(async (acc, address, i) => {
			const memo = await acc;
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
	} catch (e) {
		console.error(e);
		return { code: 500, body: { error: e.message } };
	}
};
