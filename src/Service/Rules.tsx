import { get, post, constructApiUrl } from './index'

interface IPmRulesResponse {

}

interface IPmRulesSummaryResponse {

}

export const getPmRules = async (merchantId: string): Promise<IPmRulesResponse | null> => {
  try {
    const data = await get(constructApiUrl(`backoffice/api/decisiontable/T12/summary?merchantId=${merchantId}`))
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getPmRulesSummary = async (merchantId: string): Promise<IPmRulesSummaryResponse | null> => {
  try {
    const data = await get(constructApiUrl(`backoffice/api/decisiontable/T12/summary?merchantId=${merchantId}`)).then(function(response) {
      return response.json();
    }).then(function(data) {
      return data
    })
    if (data.success) {
      return data
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return false
  }
}