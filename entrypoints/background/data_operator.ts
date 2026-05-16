const fieldBase = storage.defineItem<FieldByte[]>('session:fields', {
   fallback: [],
})

export default async function handleData(
   msg: Messages,
   respond: (s: unknown) => void
) {
   switch (msg.message) {
      case 'give data': {
         const data = await fieldBase.getValue()
         respond(data)
         break
      }

      case 'save data':
         fieldBase.setValue(msg.list)
         break

      default:
         break
   }
}
