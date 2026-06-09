interface SaveFileOptions {
   content: string | ArrayBuffer | Blob
   suggestedName: string
   contentType: `${string}/${string}`
   extension: `.${string}` // Enforces that extensions must start with a dot (e.g., '.xlsx')
   fileDescription?: string
}

export default async function saveFile(props: SaveFileOptions) {
   const {
      content,
      suggestedName,
      contentType,
      extension,
      fileDescription = 'File',
   } = props

   // Use 'in window' check safely with type assertion if your TS config lacks modern DOM definitions
   const supportsFileSystemAccess = 'showSaveFilePicker' in window

   if (supportsFileSystemAccess) {
      try {
         // Structure the dynamic MIME type and extension mapping for the API
         const acceptTypes: Record<`${string}/${string}`, `.${string}`[]> = {
            [contentType]: [extension],
         }

         const handle = await window.showSaveFilePicker({
            suggestedName,
            types: [
               {
                  description: fileDescription,
                  accept: acceptTypes,
               },
            ],
         })

         const writable = await handle.createWritable()
         await writable.write(new Blob([content], { type: contentType }))
         await writable.close()
         return
      } catch (e) {
         const err = e as Error
         if (err.name !== 'AbortError') {
            console.error('Modern save failed:', err)
         } else {
            return // User cancelled the dialog normally
         }
      }
   }

   // Fallback for Firefox, Safari, and Mobile
   const blob = new Blob([content], { type: contentType })
   const url = window.URL.createObjectURL(blob)
   const link = document.createElement('a')

   link.href = url
   link.download = suggestedName
   link.style.display = 'none'

   document.body.appendChild(link)
   link.click()

   document.body.removeChild(link)
   window.URL.revokeObjectURL(url)
}
