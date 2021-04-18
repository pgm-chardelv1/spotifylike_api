import { handleHTTPError, HTTPError } from './index';

test('sends a message and a status code to return an error', () => {
  expect(HTTPError('Some error happened', 500)).toBeDefined();
  expect(HTTPError('Some error happened', 500)).toHaveProperty('message')
  expect(HTTPError('Some error happened', 500)).toHaveProperty('statusCode')
});

test('resolves HTTPError', () => {
  const fallback = jest.fn().mockName('next');
  const e = new Error('Some error');
  expect(handleHTTPError(e, fallback)).resolves
})
