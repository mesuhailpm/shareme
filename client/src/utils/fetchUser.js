export default () => {
    const user = localStorage.getItem('profileObj') !== undefined ? JSON.parse(localStorage.getItem('profileObj')) : localStorage.clear()
    return user
}