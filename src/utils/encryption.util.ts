import CryptoJS from 'crypto-js';

const PBKDF2_ITERATIONS = 50000;
const SALT_LENGTH = 8; // in bytes
const KEY_SIZE_BYTES = 32; // in bytes
const IV_LENGTH = 16; // in bytes

/**
 * Generates an 8-byte cryptographically random salt and returns it in base64 encoding.
 * @returns {string} - A random salt
 */
export const getRandomSalt = () => {
	return CryptoJS.lib.WordArray.random(SALT_LENGTH).toString(CryptoJS.enc.Base64);
}

/**
 * Generates a 16-byte cryptographically random initialization vector (IV) and returns it in base64 encoding.
 */
export const getInitializationVector = () => {
	return CryptoJS.lib.WordArray.random(IV_LENGTH).toString(CryptoJS.enc.Base64);
}

/**
 * Derives an encryption key from a password and salt using PBKDF2. This key is used for AES encryption and decryption.
 */
export const getEncryptionKey = (password: string, salt: string) => {
	if(!password) throw new Error('Password is empty');
	if(!salt) throw new Error('Salt is empty');

	return CryptoJS.PBKDF2(password, CryptoJS.enc.Base64.parse(salt), {
		keySize: KEY_SIZE_BYTES / 4, // word size is 4 bytes
		iterations: PBKDF2_ITERATIONS
	});
}

/**
 * Encrypts plaintext data given a password, salt, and initialization vector (IV). The result is returned as a base64 encoded string.
 */
export const encryptData = (password: string, passwordSalt: string, IV: string, plaintext: string) => {
	if(!password) throw new Error('Password is empty');
	if(!passwordSalt) throw new Error('Salt is empty');
	if(!IV) throw new Error('Initialization Vector is empty');
	if(!plaintext) throw new Error('Plaintext data is empty');

	const key = getEncryptionKey(password, passwordSalt);
	// Encrypt the data using AES
	const cipherText = CryptoJS.AES.encrypt(plaintext, key, {
		iv: CryptoJS.enc.Base64.parse(IV),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});

	return cipherText.toString();
}

/**
 * Decrypts encrypted data given a password, salt, IV, and ciphertext. The result is the original plaintext data.
 */
export const decryptData = (password: string, passwordSalt: string, IV: string, encryptedData: string) => {
	if(!password) throw new Error('Password is empty');
	if(!passwordSalt) throw new Error('Salt is empty');
	if(!IV) throw new Error('Initialization Vector is empty');
	if(!encryptedData) throw new Error('Encrypted data is empty');

	try {
		const key = getEncryptionKey(password, passwordSalt);
		const cipherParams = CryptoJS.lib.CipherParams.create({
			ciphertext: CryptoJS.enc.Base64.parse(encryptedData)
		});
	
		const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
			iv: CryptoJS.enc.Base64.parse(IV),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		const plainText = decrypted.toString(CryptoJS.enc.Utf8);
		// Check if the decrypted data is valid
		if(!plainText || plainText === '') {
            return null;
        }

		return plainText;
	} catch(e: any){
		// Decryption error
		console.log('Error decrypting data: ', e?.message || e);
		
		return null;
	}
}