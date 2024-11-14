
class APIDTO {
    constructor(api) {
        this.apiID = api.API_ID;
        this.apiInfo = new APIInfo(api);
        this.endPoints = new Endpoints(api);
        if (api.DP_API_SUBSCRIPTION_POLICies) {
            this.subscriptionPolicies = api.DP_API_SUBSCRIPTION_POLICies.map(policy => new SubscriptionPolicy(policy));
        }
    }

    setResponseData(data) {
        this.data = data;
    }

    getResponseData() {
        return this.data;
    }
}

class APIInfo {
    constructor(apiInfo) {
        this.apiName = apiInfo.API_NAME;
        this.apiVersion = apiInfo.API_VERSION;
        this.apiDescription = apiInfo.API_DESCRIPTION;
        this.apiType = apiInfo.API_TYPE;
        this.visibility = apiInfo.VISIBILITY;
        if (apiInfo.VISIBLE_GROUPS) {
            this.visibleGroups = apiInfo.VISIBLE_GROUPS.split(" ");
        }
        if (apiInfo.BUSINESS_OWNER || apiInfo.TECHNICAL_OWNER) {
            this.owners = new Owner(apiInfo);
        }
        if(apiInfo.DP_API_IMAGEDATA) {
           this.apiImageMetadata = getAPIImages(apiInfo.DP_API_IMAGEDATA);
        }
    }
}

class SubscriptionPolicy {
    constructor(subscriptionPolicy) {
        this.policyName = subscriptionPolicy.POLICY_NAME;
    }
}

class Owner {
    constructor(api) {
        this.technicalOwner = api.TECHNICAL_OWNER;
        this.businessOwner = api.BUSINESS_OWNER;
        if (api.BUSINESS_OWNER_EMAIL) {
            this.businessOwnerEmail = api.BUSINESS_OWNER_EMAIL;
        }
        if (api.TECHNICAL_OWNER_EMAIL) {
            this.technicalOwnerEmail = api.TECHNICAL_OWNER_EMAIL;
        }
    }
}

class Endpoints {
    constructor(api) {
        this.sandboxUrl = api.SANDBOX_URL;
        this.productionUrl = api.PRODUCTION_URL;
    }
}

class APIImages {
    constructor(data = {}) {
        Object.assign(this, data);
    }
}

const getAPIImages = (apiImages) => {
    let images = {}
    apiImages.forEach(element => {
        images[element.IMAGE_TAG] = element.IMAGE_NAME;
    });
    return new APIImages(images);
}

module.exports = APIDTO;