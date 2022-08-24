import { shortUrl } from "./shortURL";
export default ({ action }, { services, getSchema, exceptions }) => {
		
	const { ItemsService } = services;
	const { ServiceUnavailableException } = exceptions;
	
	//Activación del evento al crear un registro en la colección 'messages'
	action('messages.items.create', async (input, { database }) => {
		
		//Formato URL acortada: gex-(+7caracteres alfanuméricos)
		const shortURL = `gex-${shortUrl()}`;
		const recordService = new ItemsService('messages', { database, schema: await getSchema() });

		try {
			
			await recordService.updateOne(input.key, {URL_short: shortURL});		

		} catch (error) {
			throw new ServiceUnavailableException(error);
		}	
	});
};