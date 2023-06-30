import { connect } from "react-redux";
import React, { useState, useMemo, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const AccountsList = ({ accounts, selectedAccount, setSelectedAccount }: { accounts: string[], selectedAccount: string, setSelectedAccount: (username: string) => void }) => {
	const [accountFilter, setAccountFilter] = useState('');

	const filteredAccounts = useMemo(() => {
		if (accountFilter.length > 0) {
			return accounts.filter((account) => {
				return account.toLowerCase().includes(accountFilter.toLowerCase());
			});
		} else {
			return accounts;
		}
	}, [accountFilter, accounts]);

	return (
		<>
		<div className="relative border border-white rounded-md p-2 flex-grow overflow-y-scroll">
			<RadioGroup value={selectedAccount} onChange={setSelectedAccount}>
				<div className="space-y-1">
					{filteredAccounts.map((account: string) => (
						<RadioGroup.Option key={account} value={account} className={({ active, checked }) => `${active ? 'ring-1 ring-white ring-opacity-60 ring-offset-1 ring-offset-violet-300' : ''}
							${checked ? 'bg-violet-500 bg-opacity-75 text-white' : 'bg-white'}
							relative flex cursor-pointer rounded-md px-3 py-2 shadow-md focus:outline-none`}
							// onClick={() => setSelectedAccount(account)}
						>
							{({ active, checked }) => (
								<div className="flex flex-row w-full items-center justify-between">
									<div className="flex items-center">
										<div className="text-14">
											<RadioGroup.Label as="p" className={`font-medium ${checked ? 'text-white' : 'text-black' }`}>
												{account}
											</RadioGroup.Label>
										</div>
									</div>
									{checked && (
										<div className="text-white ">
											<FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
										</div>
									)}
								</div>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>

		<div className="flex flex-row items-center">
			<p className="text-sm text-white font-medium">Filter:</p>
			<input type="text" placeholder="Type an account name..." className="border border-white rounded-md text-sm ml-2 bg-gray-700 text-white px-2 py-1 flex-1" value={accountFilter} onChange={(e) => {
				setAccountFilter(e.target.value);
			}}/>
		</div>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	accounts: Object.keys(state.steam.usernameToSteamId),
	selectedAccount: state.steam.selectedAccountUsername
});

const mapDispatchToProps = (dispatch: any) => ({
	setSelectedAccount: (username: string) => dispatch({ type: 'SET_STEAM_SELECTED_ACCOUNT_BY_USERNAME', username })
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList);