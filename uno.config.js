import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind()],
  shortcuts:{
    'todo-status':'h-36px w-full flex items-center justify-center rounded-lg',
    'todo-ul':'flex flex-col max-h-420px overflow-y-auto gap-4',
    'menu-item':'flex gap-2 items-center  justify-center cursor-pointer my-4',
  }
})