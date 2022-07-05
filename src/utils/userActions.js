export const checkUser = (email, password, users) => {
    return new Promise((resolve, reject) => {
        let isEmailExists = false

        users.forEach(u => {
            if (u.email === email) {
                isEmailExists = true
            }
        })

        if (isEmailExists) {
            reject(new Error('Почта занята'))
        } else {
            resolve({
                email: email,
                password: password
            })
        }
    })
}

export const authorizeUser = (email, password, users) => {
    return new Promise((resolve, reject) => {
        let passwordCorrect = false
        let isEmailExists = false

        users.forEach(u => {
            if (u.email === email) {
                isEmailExists = true
                if(u.password === password) {
                    passwordCorrect = true
                }
            }
        })

        if(passwordCorrect) {
            resolve({
                email: email,
                password: password
            })
        } else {
            reject(new Error('Неверно введен логин/пароль'))
        }
    })
}

export const checkChangePassword = (oldPassword, newPassword, userCredentials) => {
    return new Promise((resolve, reject) => {
        let passwordsEqual

        passwordsEqual = userCredentials.password === oldPassword

        if (passwordsEqual) {
            resolve(newPassword)
        } else {
            reject(new Error('Неверно введен предыдущий пароль'))
        }
    })
}
