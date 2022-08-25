export default ({ action }, { services, getSchema, exceptions }) => {
		
	const { ItemsService } = services;
	const { ServiceUnavailableException } = exceptions;

	/**
	 * Crea una URL corta de 5 caracteres alfanuméricos
	 * @returns {string} URL corta
	 */
	const generateURL = () => {
		return Math.random().toString(36).substr(2, 5)
	}		
	
	//Activación del evento al crear un registro en la colección 'messages'
	action('messages.items.create', async (input, { database }) => {
					
		const recordService = new ItemsService('messages', { database, schema: await getSchema() });

		try {

			/**
			 * Valida que la URL generada sea única y no esté ya asociada a otro registro
			 * @returns {string} URL corta
			 */
			const validateURL = () => {
				let shortURL = generateURL();

				shortURLs.forEach(url => {
					if (url === shortURL) {
						validateURL();
					}
				});	
				
				return shortURL;
			}

			const shortURLs = await recordService.readByQuery({
				fields: ['URL_short']
			});

			const shortURL = validateURL();
			await recordService.updateOne(input.key, {URL_short: shortURL});
					

		} catch (error) {
			throw new ServiceUnavailableException(error);
		}	
	});
};
