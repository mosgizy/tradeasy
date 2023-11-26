import type {Metadata} from 'next'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

export const metadata: Metadata = {
  title: 'Tradezy',
  description: 'Tradeazy - End to end payment and invoice management in one software'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}
