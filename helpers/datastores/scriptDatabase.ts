import { sendToBackground } from '../messager'

async function saveScript(script: Script) {
   sendToBackground({ message: 'save script', script })
}

async function giveScript(id: number) {
   sendToBackground({ message: 'give script', id })
}

export { saveScript, giveScript }
