import { hashPassword } from './helper';

test('returns the hashed password', () => {
  expect(hashPassword('test')).toEqual(expect.stringMatching(/^\$2b\$\d\d\$[.\/0-9A-Za-z]{53}/));
});
