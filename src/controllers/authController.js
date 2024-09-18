const configurePassport = require('../middlewares/passport');
var config = require('../config/config');

const login = async (req, res, next) => {
    try {
        const authJsonResponse = await fetch(config.adminAPI + "identityProvider?orgName=" + req.params.orgName);
        var authJsonContent = await authJsonResponse.json();

        if (authJsonContent.length > 0) {
            console.log("Identity provider found for the organization", authJsonContent[0]);
            configurePassport(authJsonContent[0]);  // Configure passport dynamically
            next();
        } else {
            res.status(400).send("No Identity Provider information found for the organization");
        }

    } catch (error) {
        console.error("Error fetching identity provider:", error);
        res.status(500).send("Server error");
    }
};

module.exports = {
    login
};
