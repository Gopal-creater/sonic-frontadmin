const baseUrls = {
  localhost: {
    BASE_URL: "http://localhost:8000",
    API_URL: "http://localhost:8000",
  },
  staging: {
    BASE_URL: "https://sonicserver.arba-dev.uk",
    API_URL: "https://sonicserver.arba-dev.uk",
  },
  production: {
    BASE_URL: "https://apiserver.sonicdata.com",
    API_URL: "https://apiserver.sonicdata.com",
  },
};

export default baseUrls["staging"];