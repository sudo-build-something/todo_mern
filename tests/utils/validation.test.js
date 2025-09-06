const myvalidator = require('../../backend/utils/validation');

describe('Validating weak and incorrect passwords', () => {

  test('returns false for password without uppercase', () => {
    expect(myvalidator.validatePassword('abcdef1!')).toBe(false);
  });

  test('returns false for password without lowercase', () => {
    expect(myvalidator.validatePassword('ABCDDEF1!')).toBe(false);
  });

  test('returns false for password without digit', () => {
    expect(myvalidator.validatePassword('Abcdefgh!')).toBe(false);
  });

  test('returns false for password with a non-printable character', () => {
    expect(myvalidator.validatePassword('Abcdefgh6¶!')).toBe(false);
  });

  test('returns false for password without a special character', () => {
    expect(myvalidator.validatePassword('ABCDDEF12')).toBe(false);
  });

  test('returns false for password shorter than 8 characters', () => {
    expect(myvalidator.validatePassword('Ab1sds!')).toBe(false);
  });

  test('returns false for password longer than 64 characters', () => {
    expect(myvalidator.validatePassword(
        'Ab1!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    )).toBe(false);
  });
});

describe('Validating correct passwords', () => {
    test('returns true for a valid strong password', () => {
    expect(myvalidator.validatePassword('Abcdef1!')).toBe(true);
  });

  test ('returns true for all criteria and length = 8', () => {
    expect(myvalidator.validatePassword('Abc1234!')).toBe(true);
  });

  test ('returns true for all criteria and length = 64', () => {
    expect(myvalidator.validatePassword(
      'Abc1234!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
    )).toBe(true);
  });
});

describe('Validating incorrectly structured names of users', () => {
  test('returns false for containing numbers', () => {
    expect(myvalidator.validateName("J4son")).toBe(false);
  });

  test('returns false for containing special characters besides a hyphen', () => {
    expect(myvalidator.validateName("Ja$on")).toBe(false);
  });

  test('returns false for ending in a hyphen', () => {
    expect(myvalidator.validateName("Ja$on-")).toBe(false);
  });

  test('returns false for containing non-printable characters', () => {
    expect(myvalidator.validateName("¶atrick")).toBe(false);
  });

  test('returns false for being shorter than 2 characters', () => {
    expect(myvalidator.validateName("A")).toBe(false);
  });
});

describe('Validating correctly structured names of users', () => {
  test('returns true for capitalised name', () => {
    expect(myvalidator.validateName("Jason")).toBe(true);
  });

  test('returns true for lowercase name', () => {
    expect(myvalidator.validateName("jason")).toBe(true);
  });

  test('returns true for hyphenated name', () => {
    expect(myvalidator.validateName("Bobby-Joe")).toBe(true);
  });

  test('returns true for 2 letter name', () => {
    expect(myvalidator.validateName("Jo")).toBe(true);
  });

});

describe('Validating correct usernames', () => {
  test('returns true for username meeting all criteria and minimum length', () => {
    expect(myvalidator.validateUsername('jO-do3')).toBe(true);
  });
  
  test('returns true for username meeting all criteria and maximum length', () => {
    expect(myvalidator.validateUsername('jO3-jO3-jO3-jO3-jO3-jO3-jO3-jO3-')).toBe(true);
  });

  test('returns true for username with all allowed special characters', () => {
    expect(myvalidator.validateUsername('jO3_jO3.jO3-')).toBe(true);
  });
});

describe('Validating incorrect usernames', () => {
  test('returns false for special characters other than "_", "-", "-" and "."', () => {
    expect(myvalidator.validateUsername("jO3@doe")).toBe(false);
  });

  test('returns false for whitespaced names', () => {
    expect(myvalidator.validateUsername('jo3 doe.')).toBe(false);
  });

  test('returns false for username shorter than minimum length', () => {
    expect(myvalidator.validateUsername('j-do3')).toBe(false);
  });

  test('returns false for username longer than maximum length', () => {
    expect(myvalidator.validateUsername("jO3--jO3-jO3-jO3-jO3-jO3-jO3-jO3-")).toBe(false);
  });
});

describe('Validating correct email addresses', () => {
  test('returns true for valid email', () => {
    expect(myvalidator.validateEmail('johndoe17@hotmail.com')).toBe(true);
  });
});

describe('Validating incorrect email addresses', () => {
  test('returns false for email starting with special character', () => {
    expect(myvalidator.validateEmail('@john.doe17@hotmail.com')).toBe(false);
  });
});