import { Suspense, ComponentType } from 'react'

interface WindowContentProps {
  appId: string
  component: ComponentType<any>
  isFocused: boolean
}

export function WindowContent({ appId, component: Component, isFocused }: WindowContentProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading...</div>
        </div>
      }
    >
      {appId === 'terminal' ? (
        <Component isFocused={isFocused} />
      ) : (
        <Component />
      )}
    </Suspense>
  )
}
