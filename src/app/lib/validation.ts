const MINIMUM_PASSWORD_LENGTH = 8;

export function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function isValidFirstName(name: string) {
  const re = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  return re.test(name);
}

export function isValidSurName(name: string) {
  const re = /^(?=.{1,75}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  return re.test(name);
}

export function isValidPassword(password: string) {
  const re = /^(?=.{1,64}$)[a-z0-9]+$/i;
  return password.length >= MINIMUM_PASSWORD_LENGTH && re.test(password);
}
