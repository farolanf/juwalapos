module.exports = {
    strategies: [
        {
            module: 'passport-facebook',
            match: 'email',
            options: {
                clientID: '2251442565182230',
                clientSecret: '65c14e7b8d92e60bf486d4441326b12a'
            }
        }
    ]
}