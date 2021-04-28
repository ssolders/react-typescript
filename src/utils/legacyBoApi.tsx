const LEGACY_BO_API_EVENTS = {
  PIQ_BO_SET_MID: 'PIQ_BO_SET_MID'
}

const sendData = (payload) => {
  const legacyBoIframe: HTMLIFrameElement | null = document.querySelector('#piq-iframe')
  if (legacyBoIframe) {
    legacyBoIframe?.contentWindow?.postMessage(payload, 'http://127.0.0.1:3337')
  }

}

export const notifyLegacyBo = (mId: number) => {
  const payload = {
    eventType: LEGACY_BO_API_EVENTS.PIQ_BO_SET_MID,
    mId
  }
  sendData(payload)
}