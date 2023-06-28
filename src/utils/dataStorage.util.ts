import { exists, createDir } from '@tauri-apps/api/fs';
import { join, appConfigDir } from '@tauri-apps/api/path';

/**
 * Check if the data storage folder exists, if not, create it
 */
export const checkDataStorageFolder = async () => {
	const dataStorageFolder = await join(await appConfigDir());

	const folderExists = await exists(dataStorageFolder);
	if(!folderExists){
		await createDir(dataStorageFolder);
		await createDir(await join(dataStorageFolder, 'maFiles'));
	}

	console.log(dataStorageFolder);

	return dataStorageFolder;
};