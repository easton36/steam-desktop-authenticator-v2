import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Switch } from '@headlessui/react';
import { connect } from 'react-redux';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import { decryptData } from '../../utils/encryption.util';

const NoticeModal = ({ isOpen, setIsOpen, triggerNotice, accountManifests, encrypted }: {
	isOpen: boolean,
	setIsOpen: (value: boolean) => void,
	triggerNotice: (notice: { title: string, message: string }) => void,
	accountManifests: {
		[steamId: string]: {
			encryptionIv: string | null,
			encryptionSalt: string | null,
			fileName: string,
			steamId: string
		}
	},
	encrypted: boolean
}) => {
	const { t } = useTranslation();
	
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [importedAccountFile, setImportedAccountFile] = useState<Object | null>(null);

	const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
	const [passkey, setPasskey] = useState<string>('');

	/**
	 * Get the extension of a file
	 */
	const getFileExtension = (filename: string) => {
		return filename.slice(filename.lastIndexOf('.'));
	};

	/**
	 * Get the contents of a file as a string
	 */
	const getFileContents = (file: File) => new Promise((resolve, reject) => {
		const reader = new FileReader();
        reader.onload = (e) => {
          	const fileContents = e?.target?.result;
		  
			return resolve(fileContents);
        };
		reader.onerror = (e) => {
			return reject(e);
		};
        reader.readAsText(file);
	});

	/*
	 * Test if a string is a valid JSON
	 */
	const isJSON = (str: any) => {
		try{
			JSON.parse(str);

			return true;
		} catch (e) {
			return false;
		}
	};

	/**
	 * Get the maFile from the uploaded files
	 */
	const getMaFile = (files: any) => {
		const maFileIndex = Array.from(files)?.findIndex((file: any) => getFileExtension(file?.name) === '.maFile');
		if(maFileIndex === undefined || maFileIndex === -1){
		  	return null;
		}

		return files?.[maFileIndex as number];
	};

	/**
	 * Get the manifest data from the uploaded files
	 */
	const getManifestData = async (files: any, steamId: string) => {
		const manifestFileIndex = Array.from(files)?.findIndex((file: any) => file?.name === 'manifest.json');
		const manifestFile = files?.[manifestFileIndex as number];
		if(manifestFile){
			const manifestFileContents = await getFileContents(manifestFile);
			const parsedManifestFile = JSON.parse(manifestFileContents as string);

			// there is a weird JAVASCRIPT bug I found where the `steamid` INT attribute on the manifest file is incremented by 1 for some reason?????
			// so we will just use the filename steamid instead, regardless of what the manifest says
			// all steamid attributes will be converted to strings so we dont need to deal with BigInts
			const foundManifest = parsedManifestFile?.entries?.find((entry: any) => entry?.filename === `${steamId}.maFile`);
			const filenameSteamId = foundManifest?.filename?.split('.')[0];
			foundManifest.steamid = filenameSteamId;

			return foundManifest;
		} else{
		  	return accountManifests[steamId];
		}
	};

	/**
	 * Get files from the client and attempt to parse and decrypt them if necessary
	 */
	const uploadFile = async (event: any) => {
		const files = event.target?.files;
		// get the maFile from the uploaded files
		const maFile = getMaFile(files);
		if(!maFile) return triggerNotice({ title: t('Invalid File Type'), message: t('Invalid File Type Desc') });
		// if the file isn't json and we aren't trying to decrypt it, throw an error
		const maFileContents = await getFileContents(maFile);
		if(!isJSON(maFileContents) && !isEncrypted){
			return triggerNotice({ title: t('Invalid maFile'), message: t('Invalid maFile Desc') });
		}
		// if the file is encrypted, make sure we have a passkey
		if(isEncrypted && !passkey){
			return triggerNotice({ title: t('Missing Passkey'), message: t('Missing Passkey Desc') });
		}

		let parsedMaFile;
		const steamId: string = maFile?.name?.split('.')[0];
		// if the file is encrypted, start decrypting it
		if(isEncrypted){
			let manifestData = await getManifestData(files, steamId);
			// make sure we have the manifest data
			if(!manifestData || !manifestData?.encryption_iv || !manifestData?.encryption_salt){
				return triggerNotice({ title: t('Missing Manifest Data'), message: t('Missing Manifest Data Desc') });
			}
			// decrypt the file
			const decryptedFile = decryptData(passkey, manifestData?.encryption_salt, manifestData?.encryption_iv, maFileContents as string);
			if(!decryptedFile){
				return triggerNotice({ title: t('Invalid Passkey'), message: t('Invalid Passkey Desc') });
			}

			parsedMaFile = JSON.parse(decryptedFile);
		} else{
			parsedMaFile = JSON.parse(maFileContents as string);
		}

		setImportedAccountFile(parsedMaFile);
		console.log(parsedMaFile);
	};

	/**
	 * Close the modal and reset the state
	 */
	const closeModal = () => {
		setImportedAccountFile(null);
		setIsEncrypted(false);
		setPasskey('');
		setIsOpen(false);
	};
	
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
					leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-2 text-center">
						<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full h-auto max-w-md transform overflow-hidden rounded-md bg-white px-4 py-4 text-left align-middle shadow-xl transition-all">
								<Dialog.Title as="h3" className="text-md font-medium leading-6 text-gray-900">
									{t('Import Account')}
								</Dialog.Title>
								<div className="mt-2 flex flex-col gap-2">
									{encrypted ? (
										<p className="text-12 leading-tight text-gray-900">{t('cantImportBecauseEncryptedError')}</p>
									) : (
										<div className="flex flex-row items-center gap-2">
											<Switch checked={isEncrypted} onChange={setIsEncrypted} className={`${isEncrypted ? 'bg-violet-700' : 'bg-violet-300' } relative
												inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent
												transition-colors duration-200 ease-in-out
												focus-visible:ring-opacity-75`}
											>
												<span aria-hidden="true" className={`${isEncrypted ? 'translate-x-4' : 'translate-x-0' } pointer-events-none
													inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200
													ease-in-out`} />
											</Switch>
											<p className="text-12 leading-tight text-gray-900">
												{t('accountIsEncryptedDesc')}
											</p>
										</div>
									)}
									

									{isEncrypted && (
										<div className="flex flex-col gap-2">
											<p className="text-xs text-gray-600">
												{t('Enter encryption passkey')}:
											</p>
											<input id="passkeyPrompt" type="password" value={passkey} onChange={(e) => setPasskey(e.currentTarget.value)} placeholder='Passkey'
												className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500" 
											/>
											<p className="text-xs text-gray-600 leading-tight">{t('encryptedImportNotice')}</p>
										</div>
									)}
								</div>

								<div className="mt-4 flex flex-row items-center gap-2">
									{!encrypted && (
										<>
											<input type="file" id="file" onChange={uploadFile} ref={fileInputRef} style={{ display: 'none '}} accept={isEncrypted ? '.maFile,.json' : '.maFile'} multiple={isEncrypted}/>
											<button type="button" className={`inline-flex justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-14 font-medium text-white hover:bg-violet-400
											 	duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset-1
												${isEncrypted && !passkey ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
												onClick={() => fileInputRef.current?.click()}
												disabled={isEncrypted && !passkey}
											>
												{t('Select .maFile to Import')}
											</button>
										</>
									)}

									<button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-14 font-medium text-violet-900 hover:bg-violet-200 duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset-1"
										onClick={closeModal}
									>
										{t(encrypted ? 'OK' : 'Cancel')}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
};

const mapStateToProps = (state: any) => ({
	isOpen: state.importAccountModal.isOpen,
	accountManifests: state.settings.accountManifests,
	encrypted: state.settings.encrypted
});

const mapDispatchToProps = (dispatch: any) => ({
	setIsOpen: (isOpen: Boolean) => dispatch({ type: 'SET_IMPORT_ACCOUNT_MODAL', isOpen: isOpen }),
	triggerNotice: (notice: { title: string, message: string }) => dispatch({ type: 'SET_NOTICE_MODAL', isOpen: true, title: notice.title, message: notice.message })
});

export default connect(mapStateToProps, mapDispatchToProps)(NoticeModal);