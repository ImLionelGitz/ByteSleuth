const scriptDB = storage.defineItem<Script[]>('local:scripts', {
   fallback: [],
})

function getAllScripts() {
   return scriptDB.getValue()
}

async function getScript(id: number) {
   const scripts = await scriptDB.getValue()
   return scripts.find((script) => script.linkedIDs.includes(id))
}

function saveScripts(list: Script[]) {
   scriptDB.setValue(list)
}

export { getAllScripts, getScript, saveScripts }
