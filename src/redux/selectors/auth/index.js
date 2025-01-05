const getAuth = state => state
export const isLoggedIn = state => getAuth(state).loginReducer.isLoggedIn
export const userRole = state => getAuth(state).loginReducer.userRole
