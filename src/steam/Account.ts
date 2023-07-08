// import SteamCommunity from 'steamcommunity';
import { LoginSession, EAuthTokenPlatformType } from 'steam-session';
import SteamTotp from 'steam-totp';
import axios from 'axios';
import { ConstructorOptions } from 'steam-session/dist/interfaces-external';

export interface AccountProps {
	steamId?: string,
	username: string,
	password: string | null,
	sharedSecret?: string,
	identitySecret?: string,
	refreshToken?: string,
	proxy?: {
		httpProxy?: string | null
	} | null
};

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36";

const Account = ({
	steamId,
	username,
	password,
	sharedSecret,
	identitySecret,
	refreshToken,
	proxy
}: AccountProps) => {
	const steamSessionOpts: ConstructorOptions = {};
	if(proxy?.httpProxy) steamSessionOpts['httpProxy'] = proxy?.httpProxy;
	// if(proxy?.socksProxy) steamSessionOpts['socksProxy'] = proxy?.socksProxy;

	// axios instance
	const axiosInstance = axios.create({
		headers: {
			'User-Agent': USER_AGENT
		},
		// proxy: proxy?.httpProxy || false
	});
	// steam community
	// const community: SteamCommunity = new SteamCommunity();
	// Steam session
	let session: LoginSession | null = null;

	/**
	 * steam-session LoginSession event listener
	 */
	const initializeLoginSessionListeners = () => {
		if(!session) throw new Error('No login session');

		session.on('authenticated', _loginSessionAuthenticated);
	};

	/**
	 * Fetch Steam session web cookies
	 */
	const getWebCookies = async () => session && await session.getWebCookies();
	/**
	 * Fetch Steam refresh token
	 */
	const getRefreshToken = () => session && session.refreshToken;
	/**
	 * Fetch Steam access token
	 */
	const getAccessToken = () => session && session.accessToken;
	/**
	 * Get steam totp code
	 */
	const getSteamTotpCode = () => SteamTotp.generateAuthCode(sharedSecret || '');
	/**
	 * Get steam server time
	 */
	const getSteamServerTime = () => SteamTotp.time();

	/**
	 * Create a Steam login session
	 */
	const createLoginSession = async () => {
		session = new LoginSession(EAuthTokenPlatformType.MobileApp, steamSessionOpts);
		initializeLoginSessionListeners();

		// if we already have a refreshToken, we don't need to login again
		if(refreshToken){
			session.refreshToken = refreshToken;
			await session.forcePoll();
			await session.refreshAccessToken();

			return true;
		}

		if(typeof password !== 'string') throw new Error('Password is not a string');
		// Start login session with credentials
		const credentialsAuth = await session.startWithCredentials({
			accountName: username,
			password
		});

		return credentialsAuth;
	};

	/**
	 * Submit Steam Guard code to login session
	 */
	const submitSteamGuardCode = async (code: string) => {
		if(!session) throw new Error('No login session');
		try{
			await session.submitSteamGuardCode(code);

			return true;
		} catch(err: any){
			const errorMessage = err.message;

			return errorMessage;
		}
	};

	/**
	 * Fetch Steam account trade confirmations
	 */
	const fetchConfirmations = async () => {
		if(!identitySecret) throw new Error('No identity secret');

		const currentTime: number = Math.floor(Date.now() / 1000);
		const confirmationKey: string = SteamTotp.getConfirmationKey(identitySecret, currentTime, 'conf');

		const response = await axios({
			method: 'GET',
			url: `https://steamcommunity.com/mobileconf/conf`,
			params: {
				p: SteamTotp.getDeviceID(steamId || session?.steamID || ''),
				a: steamId || session?.steamID?.getSteamID64(),
				k: confirmationKey,
				t: currentTime,
				m: 'react',
				tag: 'conf'
			},
			headers: {
				'User-Agent': USER_AGENT,
				'Cookie': (await session?.getWebCookies() || []).map(cookie => {
					const name = cookie.split('=')[0];
					const value = cookie.split('=')[1];

					return `${name}=${value}`;
				}).join('; '),
			},
		});

		return response.data;

		/* community.getConfirmations(currentTime, confirmationKey, (err, confirmations) => {
			if(err) return reject(err);

			return resolve(confirmations);
		}); */
	};

	/**
	 * Accept a Steam trade confirmation
	 */
	/* const acceptConfirmation = (confirmationId: string) => new Promise((resolve, reject) => {
		if(!identitySecret) return reject('No identity secret');

		community.acceptConfirmationForObject(identitySecret, confirmationId, (err) => {
			if(err) return reject(err);

			return resolve(true);
		});
	}); */

	/**
	 * Accept all Steam trade confirmations
	 */
	/* const acceptAllConfirmations = () => new Promise((resolve, reject) => {
		if(!identitySecret) return reject('No identity secret');

		const currentTime: number = Math.floor(Date.now() / 1000)
		const confirmationKey: string = SteamTotp.getConfirmationKey(identitySecret, currentTime, 'conf');
		const allowKey: string = SteamTotp.getConfirmationKey(identitySecret, currentTime, 'allow');

		community.acceptAllConfirmations(currentTime, confirmationKey, allowKey, (err) => {
			if(err) return reject(err);

			return resolve(true);
		});
	}); */

	/**
	 * When LoginSession is authenticated
	 */
	const _loginSessionAuthenticated = async () => {
		console.log(`[${steamId}] LoginSession authenticated`);

		// Set steamcommunity cookies
		const cookies = await getWebCookies();
		if(cookies && Array.isArray(cookies) && cookies.length > 0){
			console.log(`[${steamId}] Setting cookies`, cookies);
			// community.setCookies(cookies);
		}
	};

	return {
		createLoginSession,
		fetchConfirmations,
		submitSteamGuardCode,
		getWebCookies,
		getRefreshToken,
		getAccessToken,
		getSteamTotpCode,
		getSteamServerTime,
		// acceptConfirmation,
		// acceptAllConfirmations
	};
};

export default Account;