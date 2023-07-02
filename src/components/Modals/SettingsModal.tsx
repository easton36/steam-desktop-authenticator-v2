import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { requestNotificationsPermission, notify } from '../../utils/notifications.util';
import { shell, os } from "@tauri-apps/api";
import { join, appConfigDir } from '@tauri-apps/api/path';

const SettingsModal = ({
	isOpen,
	setIsOpen,
	settings,
	setSettings
}: {
	isOpen: boolean,
	setIsOpen: (value: boolean) => void,
	settings: any,
	setSettings: (settings: any) => void
}) => {
	const { t } = useTranslation();

	const [checkForNewConfirmations, setCheckForNewConfirmations] = useState(settings?.checkForNewConfirmations || false);
	const [secondsBetweenChecks, setSecondsBetweenChecks] = useState(settings?.secondsBetweenChecks || 5);
	const [checkAllAccounts, setCheckAllAccounts] = useState(settings?.checkAllAccounts || false);
	const [autoConfirmMarket, setAutoConfirmMarket] = useState(settings?.autoConfirmMarket || false);
	const [autoConfirmTrades, setAutoConfirmTrades] = useState(settings?.autoConfirmTrades || false);
	const [minimalMode, setMinimalMode] = useState(settings?.minimalMode || false);

	const saveSettings = () => {
		setSettings({
			checkForNewConfirmations,
			secondsBetweenChecks,
			checkAllAccounts,
			autoConfirmMarket,
			autoConfirmTrades,
			minimalMode
		});

		setIsOpen(false);
	};

	const notificationSetting = async () => {
		console.log('requesting notifications permission');
		const permission = await requestNotificationsPermission();
		if(permission){
			notify('Notifications enabled', 'You will now receive notifications when new confirmations are available.');
		}
	};

	useEffect(() => {
		if(checkForNewConfirmations){
			notificationSetting();
		}
	}, [checkForNewConfirmations]);

	const openMaFilesFolder = async () => {
		const platform = await os.platform();
		const maFilesFolder = await join(await appConfigDir(), 'maFiles');
		switch(platform){
			case 'win32': {
				const command = new shell.Command('open-windows-folder', [
					'Start-Process',
					'explorer.exe',
					'-FilePath',
					maFilesFolder
				]);

				const child = await command.spawn();

				return child;
			}
			case 'darwin': {
				const command = new shell.Command('open-mac-folder', [
					'open',
					'-R',
					maFilesFolder
				]);

				const child = await command.spawn();

				return child;
			}
			case 'linux': {
				const command = new shell.Command('open-linux-folder', [
					'xdg-open',
					maFilesFolder
				]);

				const child = await command.spawn();

				return child;
			}
			default:
				return false;
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white px-4 py-4 text-left align-middle shadow-xl transition-all">
								<Dialog.Title as="h3" className="text-md font-medium leading-6 text-gray-900">
									{t('Settings')}
								</Dialog.Title>
								<div className="mt-2 flex flex-col gap-2">
									<div className="flex flex-row items-center gap-2">
										<Switch checked={checkForNewConfirmations} onChange={setCheckForNewConfirmations} className={`${checkForNewConfirmations ? 'bg-violet-700' : 'bg-violet-300' } relative
											inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent
											transition-colors duration-200 ease-in-out
											focus-visible:ring-opacity-75`}
										>
											<span aria-hidden="true" className={`${checkForNewConfirmations ? 'translate-x-4' : 'translate-x-0' } pointer-events-none
												inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200
												ease-in-out`} />
										</Switch>
										<p className="text-12 leading-tight">
											{t('checkForNewConfirmationsDesc')}
										</p>
									</div>

									<div className="flex flex-row items-center gap-2">
										<input type="number" min="5" max="60" value={secondsBetweenChecks} onChange={(e) => setSecondsBetweenChecks(parseInt(e.target.value))} 
											className={`duration-100 w-12 py-2 px-2 pr-1 text-14 text-center placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500
												${!checkForNewConfirmations ? 'bg-gray-50 cursor-not-allowed text-gray-300' : 'bg-white text-gray-900'}`}
											disabled={!checkForNewConfirmations}
										/>
										<p className={`text-12 leading-tight duration-100 ${!checkForNewConfirmations ? 'text-gray-300' : ''}`}>
											{t('secondsBetweenChecksDesc')}
										</p>
									</div>

									<div className="flex flex-row items-center gap-2">
										<Switch checked={checkAllAccounts} onChange={setCheckAllAccounts} className={`${!checkForNewConfirmations ? 'bg-gray-200' : checkAllAccounts ? 'bg-violet-700' : 'bg-violet-300'} relative
											inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent
											transition-colors duration-200 ease-in-out
											focus-visible:ring-opacity-75
											${!checkForNewConfirmations ? 'cursor-not-allowed' : ''}`}
											disabled={!checkForNewConfirmations}
										>
											<span aria-hidden="true" className={`${checkAllAccounts ? 'translate-x-4' : 'translate-x-0' } pointer-events-none
												inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200
												ease-in-out`} />
										</Switch>
										<p className={`text-12 leading-tight duration-100 ${!checkForNewConfirmations ? 'text-gray-300' : ''}`}>
											{t('checkAllAccountsDesc')}
										</p>
									</div>

									<div className="flex flex-row items-center gap-2">
										<Switch checked={autoConfirmMarket} onChange={setAutoConfirmMarket} className={`${!checkForNewConfirmations ? 'bg-gray-200' : autoConfirmMarket ? 'bg-violet-700' : 'bg-violet-300' } relative
											duration-100 inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent
											transition-colors duration-200 ease-in-out
											focus-visible:ring-opacity-75
											${!checkForNewConfirmations ? 'cursor-not-allowed' : ''}`}
											disabled={!checkForNewConfirmations}
										>
											<span aria-hidden="true" className={`${autoConfirmMarket ? 'translate-x-4' : 'translate-x-0' } pointer-events-none
												inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200
												ease-in-out`} />
										</Switch>
										<p className={`text-12 leading-tight duration-100 ${!checkForNewConfirmations ? 'text-gray-300' : ''}`}>
											{t('autoConfirmMarketDesc')}
										</p>
									</div>

									<div className="flex flex-row items-center gap-2">
										<Switch checked={autoConfirmTrades} onChange={setAutoConfirmTrades} className={`${!checkForNewConfirmations ? 'bg-gray-200' : autoConfirmTrades ? 'bg-violet-700' : 'bg-violet-300' } relative
											inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent
											transition-colors duration-200 ease-in-out
											focus-visible:ring-opacity-75
											${!checkForNewConfirmations ? 'cursor-not-allowed' : ''}`}
											disabled={!checkForNewConfirmations}
										>
											<span aria-hidden="true" className={`${autoConfirmTrades ? 'translate-x-4' : 'translate-x-0' } pointer-events-none
												inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200
												ease-in-out`} />
										</Switch>
										<p className={`text-12 leading-tight duration-100 ${!checkForNewConfirmations ? 'text-gray-300' : ''}`}>
											{t('autoConfirmTradesDesc')}
										</p>
									</div>									
								</div>

								<hr className="m-2"/>

								<div className="mt-2 flex flex-col gap-2">
									<div className="flex flex-row items-center gap-2">
										<Switch checked={minimalMode} onChange={setMinimalMode} className={`${minimalMode ? 'bg-violet-700' : 'bg-violet-300' } relative
											inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent
											transition-colors duration-200 ease-in-out
											focus-visible:ring-opacity-75`}
										>
											<span aria-hidden="true" className={`${minimalMode ? 'translate-x-4' : 'translate-x-0' } pointer-events-none
												inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200
												ease-in-out`} />
										</Switch>
										<p className="text-12 leading-tight">
											{t('minimalModeDesc')}
										</p>
									</div>
								</div>

								<hr className="m-2"/>

								<div className="mt-2 flex flex-col gap-2">
									<div className="flex flex-row items-center gap-2">
										<button type="button" 
											className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-3 py-1.5 text-12 font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset-21"
											onClick={openMaFilesFolder}
										>
											{t('Open')}
										</button>

										<p className="text-12 leading-tight">
											{t('OpenBtnDesc')}
										</p>
									</div>
								</div>

								<div className="mt-4 flex flex-row items-center w-full">
									<button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-14 font-medium text-white hover:bg-violet-400 duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset-1"
										onClick={saveSettings}
									>
										{t('Save Settings')}
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
	isOpen: state.settingsModal.isOpen,
	settings: state.settings
});

const mapDispatchToProps = (dispatch: any) => ({
	setIsOpen: (isOpen: Boolean) => dispatch({ type: 'SET_SETTINGS_MODAL', isOpen: isOpen }),
	setSettings: (settings: any) => dispatch({ type: 'SET_SETTINGS', settings: settings })
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);