import { AuthErrorMessagePipe } from './auth-error-message.pipe';

describe('AuthErrorMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new AuthErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
