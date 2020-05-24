const numberOfUsers = 30

const getUsers = async () => {
    const res = await fetch(`https://randomuser.me/api/?results=${numberOfUsers}`)
    const body = await res.json()

    return body.results || []
}

export default getUsers