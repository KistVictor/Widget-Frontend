import { useState } from "react";

import html2canvas from "html2canvas";

import { Loading } from "./Loading";

import { CameraIcon, TrashIcon } from "@heroicons/react/outline";

interface ScreeshotButtonProps {
  screenshot: string | null,
  onScreenshotTook: (screenshot: string | null) => void
}

export function ScreeshotButton({ screenshot, onScreenshotTook }: ScreeshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)
  
  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')
    onScreenshotTook(base64image)

    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        title="Excluir foto atual"
        onClick={() => onScreenshotTook(null)}
        className="p-1 w-10 h-10 rounded-md border-transparent flex items-end justify-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{backgroundImage: `url(${screenshot})`}}
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      title="Tirar foto da tela"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-purple-500 transition-colors"
    >
      {isTakingScreenshot ? <Loading /> : <CameraIcon className="w-6 h-6 text-zinc-100" />}
    </button>
  )
}