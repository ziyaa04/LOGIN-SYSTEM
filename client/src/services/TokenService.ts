export class TokenService {
    static generateToken(size: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"';
        let token: string = '';
        for (const char of chars) {
            const randNum = Math.floor(Math.random() * chars.length);
            token += chars[randNum];
        }
        return token;
    }
}
