const currentUrl = window.location.href;
const SERVER_BASE_URL = currentUrl && currentUrl.includes('marmon-dev') ? 
  'https://marmon-dev.compunnel.com/api' : currentUrl && currentUrl.includes('marmon-qa') ? 
  'https://marmon-qa.compunnel.com/api' : currentUrl && currentUrl.includes('marmon-uat') ? 
  'https://marmon-uat.compunnel.com/api' : currentUrl && currentUrl.includes('mkportals.marmonkeystone.com') ?  
  'https://mkportals.marmonkeystone.com/api' :  currentUrl && currentUrl.includes('local') ? 'https://marmon-dev.compunnel.com/api' : 'https://marmon-dev.compunnel.com/api'
 

  // const SERVER_BASE_URL = 'https://marmon-qa.compunnel.com/api'

export default SERVER_BASE_URL;
