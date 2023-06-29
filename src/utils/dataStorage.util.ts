import { exists, createDir, writeFile, removeFile, readTextFile, readDir } from '@tauri-apps/api/fs';
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

/**
 * Read specific maFile
 */
export const readMaFile = async (steamId: string) => {
	const dataStorageFolder = await checkDataStorageFolder();
	const maFile = await join(dataStorageFolder, 'maFiles', `${steamId}.maFile`);

	const maFileExists = await exists(maFile);
	if(!maFileExists) throw new Error('maFile does not exist');

	const maFileData = await readTextFile(`${steamId}.maFile`);

	return JSON.parse(maFileData);
};

/**
 * Write specific maFile
 */
export const writeMaFile = async (steamId: string, maFileData: any) => {
	const dataStorageFolder = await checkDataStorageFolder();
	const maFile = await join(dataStorageFolder, 'maFiles', `${steamId}.maFile`);

	await writeFile(maFile, JSON.stringify(maFileData));

	return true;
};

/**
 * Delete specific maFile
 */
export const deleteMaFile = async (steamId: string) => {
	const dataStorageFolder = await checkDataStorageFolder();
	const maFile = await join(dataStorageFolder, 'maFiles', `${steamId}.maFile`);

	const maFileExists = await exists(maFile);
	if(!maFileExists) throw new Error('maFile does not exist');

	await removeFile(maFile);

	return true;
};

/**
 * List all maFiles
 */
export const listMaFiles = async () => {
	const dataStorageFolder = await checkDataStorageFolder();
	const maFilesFolder = await join(dataStorageFolder, 'maFiles');

	const maFilesList = await readDir(maFilesFolder, { recursive: true });

	// return array of filenames
	return maFilesList.map((file: any) => file.name);
};

/**
 * Load settings file
 */
export const loadSettings = async () => {
	const dataStorageFolder = await checkDataStorageFolder();
	const settingsFile = await join(dataStorageFolder, 'manifest.json');

	const settingsFileExists = await exists(settingsFile);
	// if the settings file doesnt exist, create it
	if(!settingsFileExists){
		await writeFile(settingsFile, JSON.stringify({
			encrypted: false,
			first_run: true,
			accounts: []
		}));
	}

	const settingsFileData = await readTextFile(settingsFile);

	return JSON.parse(settingsFileData);
};