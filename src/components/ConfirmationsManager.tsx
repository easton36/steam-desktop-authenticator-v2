import { connect } from "react-redux";
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmationsManager = ({ selectedAccount, accounts }: {
	selectedAccount: string,
	accounts: {
		[steamId: string]: string
	}
}) => {
	const { t } = useTranslation();

	const accountName = useMemo(() => {
		return accounts[selectedAccount];
	}, [selectedAccount, accounts]);

	return (
		<div className="relative border border-white rounded-md p-2 pt-3 mt-2 flex flex-row items-center">
			<div className="absolute left-2 -top-2.5 text-white text-xs bg-gray-700 px-1">
				{t('Account')}: {accountName || 'N/A'}
			</div>

			<button
				className="w-full bg-violet-500 hover:bg-violet-400 text-md text-white px-5 py-2 rounded-md"
			>
				{t('View Confirmations')}
			</button>
			
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	selectedAccount: state.settings.selectedAccount,
	accounts: state.settings.steamIdToUsername,
});

export default connect(mapStateToProps)(ConfirmationsManager);