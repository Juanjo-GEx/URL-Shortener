import { file } from 'tmp-promise';

export default ({ action }, { services, getSchema, exceptions }) => {

	/**
	 * Crea una URL corta de 5 caracteres alfanuméricos
	 * @returns {string} URL corta
	 */
	const generateURL = () => {
		return Math.random().toString(36).substr(2, 5)
	}	
	/**
	 * Función que retorna un domino con slash
	 * @property {string} domain 
	 * @returns {string} Dominio con slash
	 */
	 const endsToSlash = (domain) => {
		let domainSlash = '';	
		if (domain.at(-1) === '/') {
			return domain	
		}

		domainSlash = `${domain}/`	

		return domainSlash;
	}
	
	const { ItemsService, FilesService } = services;
	const { ServiceUnavailableException } = exceptions;	
	
	//Activación del evento al crear un registro en la colección 'urls'
	action('urls.items.create', async (input, { accountability }) => {

		/**
		 * Valida que la URL generada sea única y no esté ya asociada a otro registro
		 * @returns {string} URL corta
		 */
		const validateURL = () => {
			let shortURL = generateURL();					

			if (shortURLs !== null) {
				shortURLs.forEach(url => {			
					if (url.slug === shortURL) {
						validateURL();
					}
				});	
			}		
			return shortURL;
		}
					
		const recordService = new ItemsService('urls', { accountability: accountability, schema: await getSchema() });
		const filesService = new FilesService({ schema: await getSchema() });

		const shortURLs = await recordService.readByQuery({
			fields: ['slug']
		});
		const shortURL = validateURL();	
		const fs = require('fs');
		const {path, cleanup} = await file();

		try {
		
			//Si la url corta ha sido generada manualmente por el administrador generamos únicamente los metadatos del archivo
			//Si ha sido generada desde otro punto de acceso generamos automáticamente la url corta y el fichero con los metadatos
			if(input.payload.slug === undefined) {	
				//Generamos el archivo
				const fileUpload = await filesService.uploadOne(fs.createReadStream(path), {					
					"storage": "s3",
					"filename_disk": `${shortURL}.txt`,
					"filename_download": `${shortURL}.txt`,
					"title": shortURL,
					"type": "text/plain",
					"uploaded_by": accountability.user,
					"filesize": 0,
					"metadata": {
						"x-amz-website-redirect-location": `${endsToSlash(input.payload.domain)}${shortURL}`
					}
				});
				//Grabamos la url corta y el archivo creado
				await recordService.updateOne(input.key, {
					slug: shortURL,
					redirection: fileUpload
				});

			} else {
				await filesService.updateOne(input.payload.redirection, {
					"metadata": {
						"x-amz-website-redirect-location": `${endsToSlash(input.payload.domain)}${input.payload.slug}`
					} 
				});
			}		

		} catch (error) {
			throw new ServiceUnavailableException(error);
		} finally {
			await cleanup(); 
		}
	});
};
