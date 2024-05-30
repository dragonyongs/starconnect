

// const jwt = require("jsonwebtoken");

// function generateTokens(foundUser) {
//     const accessToken = jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
//     const refreshToken = jwt.sign({ name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2m' });
//     console.log('generateTokens-accessToken', accessToken);
//     console.log('generateTokens-refreshToken', refreshToken);
//     return { accessToken, refreshToken };
// }

// module.exports = generateTokens;



const jwt = require("jsonwebtoken");

function generateTokens(foundUser) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    // create JWTs
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "name": foundUser.name,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' }
    );

    const refreshToken = jwt.sign(
        { "name": foundUser.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' }
    );

    return { accessToken, refreshToken };
}

module.exports = generateTokens;

