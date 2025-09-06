const validator = require('../../backend/utils/validation');

describe('Validating weak and incorrect (includes non-printable characters) passwords', () => {

  test('returns false for password without uppercase', () => {
    expect(validator.validatePassword('abcdef1!')).toBe(false);
  });

  test('returns false for password without lowercase', () => {
    expect(validator.validatePassword('ABCDDEF1!')).toBe(false);
  });

  test('returns false for password without digit', () => {
    expect(validator.validatePassword('Abcdefgh!')).toBe(false);
  });

  test('returns false for password with a non-printable character', () => {
    expect(validator.validatePassword('Abcdefgh6¶!')).toBe(false);
  });

  test('returns false for password without a special character', () => {
    expect(validator.validatePassword('ABCDDEF12')).toBe(false);
  });

  test('returns false for password shorter than 8 characters', () => {
    expect(validator.validatePassword('Ab1sds!')).toBe(false);
  });

  test('returns false for password longer than 64 characters', () => {
    expect(validator.validatePassword(
        'Ab1!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    )).toBe(false);
  });
});

describe('Validating correct passwords', () => {
    test('returns true for a valid strong password', () => {
    expect(validator.validatePassword('Abcdef1!')).toBe(true);
  });

  test ('returns true for all criteria and length = 8', () => {
    expect(validator.validatePassword('Abc1234!')).toBe(true);
  });

  test ('returns true for all criteria and length = 64', () => {
    expect(validator.validatePassword(
      'Abc1234!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
    )).toBe(true);
  });
});

describe('Validating incorrectly structured names of users', () => {
  test('returns false for containing numbers', () => {
    expect(validator.validateName("J4son")).toBe(false);
  });

  test('returns false for containing special characters besides a hyphen', () => {
    expect(validator.validateName("Ja$on")).toBe(false);
  });

  test('returns false for ending in a hyphen', () => {
    expect(validator.validateName("Ja$on-")).toBe(false);
  });

  test('returns false for containing non-printable characters', () => {
    expect(validator.validateName("¶atrick")).toBe(false);
  });

  test('returns false for being shorter than 2 characters', () => {
    expect(validator.validateName("A")).toBe(false);
  });
});