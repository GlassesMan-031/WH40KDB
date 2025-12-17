export interface accountState {
  id?: number;
  username?: string;
  email?: string;
}

const accountState: { value: accountState } = { value: {} };

// sets the accountState to the newState value
export function setAccount(newState: accountState) {
  accountState.value = newState;
  if (newState.id) {
    sessionStorage.setItem("account", "" + newState.id);
  }
}

// gets the accountState and provides its whole value
export function getAccount() {
  return accountState.value;
}

export function checkSessionAccount() {
  const sessionId = sessionStorage.getItem("account");
  if (sessionId) {
    accountState.value.id = Number(sessionId);
  }
}
