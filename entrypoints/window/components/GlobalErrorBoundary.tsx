import { Dialog } from '@mui/material'
import { Component, ReactNode } from 'react'
import InfoPanel from '../interfaces/popups/InfoPanel'

interface Props {
   children: ReactNode
}

interface State {
   hasError: boolean
   msg: string
}

export class GlobalErrorBoundary extends Component<Props, State> {
   public state: State = {
      hasError: false,
      msg: '',
   }

   // This is the missing lifecycle method React is asking for
   public static getDerivedStateFromError(err: Error): State {
      return {
         hasError: true,
         msg: err.message || 'An unexpected rendering error occurred.',
      }
   }

   public render() {
      // If it crashed, we return null here because your MUI Dialog
      // inside App.tsx is handling the visual error message overlay
      if (this.state.hasError) {
         return (
            <Dialog open>
               <InfoPanel
                  title="An UI Error Occurred"
                  msg={this.state.msg}
                  type="UI BROKEN"
               />
            </Dialog>
         )
      }

      return this.props.children
   }
}
