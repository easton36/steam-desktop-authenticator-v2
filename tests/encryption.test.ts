import { getRandomSalt, getInitializationVector, encryptData, decryptData } from '../src/utils/encryption.util';
import { describe, test, expect } from '@jest/globals';

describe('FileEncryptor', () => {
    const password = 'testPassword';
    const plaintext = 'This is a test message for encryption';

	// console.log('Password: ', password);
	// console.log('Plaintext: ', plaintext);

    test('Should encrypt and then decrypt to the original message', () => {
        const salt = getRandomSalt();
        const iv = getInitializationVector();

		// console.log('Salt: ', salt);
		// console.log('IV: ', iv);

        const encryptedData = encryptData(password, salt, iv, plaintext);
        const decryptedData = decryptData(password, salt, iv, encryptedData);

		// console.log('Encrypted data: ', encryptedData);
		// console.log('Decrypted data: ', decryptedData);

        expect(decryptedData).toEqual(plaintext);
    });

    test('Should fail to decrypt with wrong password', () => {
        const salt = getRandomSalt();
        const iv = getInitializationVector();
        const wrongPassword = 'wrongPassword';

		// console.log('Salt: ', salt);
		// console.log('IV: ', iv);
		// console.log('Wrong password: ', wrongPassword);

        const encryptedData = encryptData(password, salt, iv, plaintext);
        const decryptedData = decryptData(wrongPassword, salt, iv, encryptedData);

		// console.log('Encrypted data: ', encryptedData);
		// console.log('Decrypted data: ', decryptedData);

        expect(decryptedData).not.toEqual(plaintext);
        expect(decryptedData).toBeNull();
    });
});