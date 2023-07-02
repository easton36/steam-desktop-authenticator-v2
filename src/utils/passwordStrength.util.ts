const passwordOptions = [{
		id: 0,
		minDiversity: 0,
		minLength: 0
	},
	{
		id: 1,
		minDiversity: 0,
		minLength: 8
	},
	{
		id: 2,
		minDiversity: 3,
		minLength: 8
	},
	{
		id: 3,
		minDiversity: 4,
		minLength: 10
	}
];

const allowedSymbols: string = "!\"#\$%&'\(\)\*\+,-\./:;<=>\?@\[\\\\\\]\^_`\{|\}~";

export const passwordStrength = (password: string) => {
	const passwordCopy = password || '';

	const rules = [{
			regex: "[a-z]",
			message: 'lowercase'
		},
		{
			regex: '[A-Z]',
			message: 'uppercase'
		},
		{
			regex: '[0-9]',
			message: 'number'
		},
	];

	if (allowedSymbols) {
		rules.push({
			regex: `[${allowedSymbols}]`,
			message: 'symbol'
		});
	}

	const strength: {
		contains: string[],
		length: number,
		id?: number
	} = {
		contains: [],
		length: 0
	};

	strength.contains = rules
		.filter(rule => new RegExp(`${rule.regex}`).test(passwordCopy))
		.map(rule => rule.message);

	strength.length = passwordCopy.length;

	const fulfilledOptions = passwordOptions
		.filter(option => strength?.contains?.length >= option.minDiversity)
		.filter(option => strength?.length >= option.minLength)
		.sort((o1, o2) => o2.id - o1.id)
		.map(option => ({
			id: option.id
		}));

	Object.assign(strength, fulfilledOptions[0]);

	return strength;
};