import deepmerge from 'deepmerge'
import type { Config } from 'payload/config'

import type { PluginConfig } from './types'

export default (pluginConfig: PluginConfig) =>
  (config: Config): Config => {
    return deepmerge(config, pluginConfig.overwrites || {})
  }
