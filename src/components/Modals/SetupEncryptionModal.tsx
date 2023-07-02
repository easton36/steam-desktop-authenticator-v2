import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { passwordStrength } from '../../utils/passwordStrength.util';

const SetupEncryptionModal = ({ isOpen, setIsOpen, triggerNotice }: { isOpen: boolean, setIsOpen: (value: boolean) => void, triggerNotice: (notice: { title: string, message: string }) => void }) => {
	const { t } = useTranslation();
	
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const closeModal = () => {
		setIsOpen(false);
		setPassword("");
		triggerNotice({ title: t('WARNING'), message: t('noEncryptWarning') })
	};

	const passwordStrengthValue = useMemo(() => {
		const strength = passwordStrength(password);

		switch(strength?.id){
			case 0:
				return {
					color: 'bg-red-500',
					width: 'w-1/4',
					text: t('passwordStrengthWeakDesc')
				};
			case 1:
				return {
					color: 'bg-yellow-500',
					width: 'w-1/2',
					text: t('passwordStrengthFairDesc')
				};
			case 2:
				return {
					color: 'bg-blue-500',
					width: 'w-3/4',
					text: t('passwordStrengthGoodDesc')
				};
			case 3:
				return {
					color: 'bg-green-500',
					width: 'w-full',
					text: t('passwordStrengthStrongDesc')
				};
			default:
				return "";
		}
	}, [password]);

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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white px-4 py-4 text-left align-middle shadow-xl transition-all">
								<Dialog.Title as="h3" className="text-md font-medium leading-6 text-gray-900">
									{t('Setup Encryption')}
								</Dialog.Title>
								<div className="mt-2 flex flex-col gap-2">
									<div className="flex flex-col gap-2">
										<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500" />
										{password?.length > 0 && passwordStrengthValue && (
											<div>
												<div className={`${passwordStrengthValue?.width} h-2 rounded-md ${passwordStrengthValue?.color} transition-all duration-300`} />
												<p className="text-xs text-gray-600">
													{passwordStrengthValue?.text}
												</p>
											</div>
										)}
									</div>

									<div className="flex flex-col gap-1">
										<input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.currentTarget.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500" />
										{password !== confirmPassword && confirmPassword?.length > 0 && (
											<p className="text-xs text-red-500">
												{t('passwordNotMatch')}
											</p>
										)}
									</div>
									

									<hr />

									<p className="text-xs text-gray-600">
										{t('passwordDescription')}
									</p>
								</div>

								<div className="mt-4 flex flex-row items-center gap-2">
									<button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-14 font-medium text-white hover:bg-violet-400 duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset-1"
										onClick={() => {}}
									>
										{t('Accept')}
									</button>

									<button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-14 font-medium text-violet-900 hover:bg-violet-200 duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset-1"
										onClick={closeModal}
									>
										{t('Cancel')}
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
	isOpen: state.setupEncryptionModal.isOpen
});

const mapDispatchToProps = (dispatch: any) => ({
	setIsOpen: (isOpen: Boolean) => dispatch({ type: 'SET_SETUP_ENCRYPTION_MODAL', isOpen: isOpen }),
	triggerNotice: (notice: { title: string, message: string }) => dispatch({ type: 'SET_NOTICE_MODAL', isOpen: true, title: notice.title, message: notice.message })
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupEncryptionModal);