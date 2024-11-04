
class APIDTO {
    constructor(api) {
        this.apiID = api.apiID;
        this.apiInfo = new APIInfo(api);
        this.endPoints = new Endpoints(api);
        if (api.ThrottlingPolicies) {
            this.throttlingPolicies = api.ThrottlingPolicies.map(policy => new ThrottlingPolicy(policy));
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
        this.apiName = apiInfo.apiName;
        this.apiVersion = apiInfo.apiVersion;
        this.apiDescription = apiInfo.apiDescription;
        this.apiType = apiInfo.apiType;
        this.apiCategory = apiInfo.apiCategory;
        this.tags = apiInfo.tags.split(" ");
        this.visibility = apiInfo.visibility;
        if (apiInfo.visibleGroups) {
            this.visibleGroups = apiInfo.visibleGroups.split(" ");
        }
        if (apiInfo.businessOwner || apiInfo.technicalOwner) {
            this.owners = new Owner(apiInfo);
        }
        if (apiInfo.AdditionalProperties) {
            this.additionalProperties = getAdditionalProperties(apiInfo.AdditionalProperties);
        }
        if (apiInfo.ApiImages) {
            this.apiImages = new APIArtifacts(apiInfo.ApiImages);
        }
    }
}

class AdditionalProperties {
    constructor(data = {}) {
        Object.assign(this, data);
    }
}

const getAdditionalProperties = (additionalAPIProperties) => {
    let additionalProperties = {}
    additionalAPIProperties.forEach(element => {
        additionalProperties[element.key] = element.value;
    });
    return new AdditionalProperties(additionalProperties);
}

class ThrottlingPolicy {
    constructor(throttlingPolicy) {
        this.policyName = throttlingPolicy.policyName;
        this.description = throttlingPolicy.description;
        this.category = throttlingPolicy.category;
    }
}

class Owner {
    constructor(api) {
        this.technicalOwner = api.technicalOwner;
        this.businessOwner = api.businessOwner;
    }
}

class Endpoints {
    constructor(api) {
        this.sandboxUrl = api.sandboxUrl;
        this.productionUrl = api.productionUrl;
    }
}

class APIImages {
    constructor(data = {}) {
        Object.assign(this, data);
    }
}

class APIArtifacts {
    constructor(apiImages) {
        this.apiImages = getAPIImages(apiImages);
    }
}

const getAPIImages = (apiImages) => {
    let images = {}
    apiImages.forEach(element => {
        images[element.imageTag] = element.imagePath;
    });
    return new APIImages(images);
}

module.exports = APIDTO;