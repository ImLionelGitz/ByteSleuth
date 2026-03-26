import IframeManager from './classes/IframeManage'
import SelectManager from './classes/SelectManage'
import chrome_communicator from './content'
import window_communicator from './window'

const iframeMGR = new IframeManager()
const selectMGR = new SelectManager()

window_communicator(selectMGR, iframeMGR)
chrome_communicator(iframeMGR, selectMGR)

console.log('Content script loaded')
