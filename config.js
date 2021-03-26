module.exports = {
  oauth: {
    prod_client_id: 'a065d001ae9945258749c9c0651f4497',
    test_client_id: '1f2252beaad04f8d98a30f9f7bf232a7',
    local_client_id: '54fbd6dccd984f08bc871b63a32b32d1',
    casumo_client_id: '2bcdcbbffbf6483e8ded17613f54fe8d',
    heroes_client_id: '4ee461ca0ea84a9283db94689c991886',
    casinoroom_client_id: '02a33b0a618849fa8bd6118f493dd435',
    leovegas_client_id: 'c847ef464df94e5fb47a12f5a5fdebda',
    mrgreen_client_id: 'a35b5e19539e467fbe759283469f30db',
    prod_redirect_uri: 'https://developer-api.paymentiq.io/paymentiq/docs/callback',
    local_redirect_uri: 'http://localhost:3033/paymentiq/docs/callback'
  },

  prod: {
    sourcemap: false,
    assetsPublicPath: 'https://s3-eu-west-1.amazonaws.com/backoffice.paymentiq.io/',
    s3: {
      region: 'eu-west-1',
      bucket: 'backoffice.paymentiq.io'
    }
  },

  dev: {
    assetsPublicPath: '/',
    host: '0.0.0.0',
    port: 3300,
    https: false,
    proxy: {
      '*/paymentiq/oauth2/authorization/*|*/paymentiq/login/oauth2/*|*/paymentiq/backoffice/api*|*/paymentiq/backoffice/dashboard/kibana*|*/paymentiq/backoffice/dashboard/rta*|*/paymentiq/j_spring_security_check|*/paymentiq/bo/resetpassword|*/paymentiq/logout|*/paymentiq/docs*|*/paymentiq/swagger-ui.html*|*/paymentiq/swagger-resources*|*/paymentiq/*/api-docs*|*/paymentiq/oauth/token*|*/paymentiq/oauth/signin*|*/paymentiq/api/signin*|*/paymentiq/oauth/images*|*/paymentiq/oauth/authorize*|*/paymentiq/oauth/check_token*|*/paymentiq/identity*|*/paymentiq/webjars|*/paymentiq/admin/v1*': {
        target: 'http://localhost:8080', // local instance of PIQ
        secure: false
      }
    }
  }
}
