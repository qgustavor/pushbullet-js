import PushBullet from '../pushbullet'
import type { ClipboardOptions, DismissalOptions } from '../types'

declare module '../pushbullet' {
  interface PushBullet {
    sendClipboard(clipOptions: ClipboardOptions): Promise<Response>;
    dismissEphemeral(ephemeralOptions: DismissalOptions): Promise<Response>;
    sendEphemeral(ephemeralOptions: Record<string, any>): Promise<Response>;
  }
}

PushBullet.prototype.sendClipboard = function sendClipboard (clipOptions: ClipboardOptions): Promise<Response> {
  const options = JSON.parse(JSON.stringify(clipOptions)) as any
  options.type = 'clip'

  return this.sendEphemeral(options)
}

PushBullet.prototype.dismissEphemeral = function dismissEphemeral (ephemeralOptions: DismissalOptions): Promise<Response> {
  const options = JSON.parse(JSON.stringify(ephemeralOptions)) as any
  options.type = 'dismissal'

  return this.sendEphemeral(options)
}

PushBullet.prototype.sendEphemeral = async function sendEphemeral (ephemeralOptions: Record<string, any>): Promise<Response> {
  let optionsToSend = ephemeralOptions

  if (this.encryption) {
    const encryptedOptions = await this.encryption.encrypt(
      JSON.stringify(ephemeralOptions)
    )
    optionsToSend = {
      ciphertext: encryptedOptions,
      encrypted: true
    }
  }

  const options = {
    json: {
      type: 'push',
      push: optionsToSend
    }
  }

  return this.makeRequest('post', PushBullet.EPHEMERALS_END_POINT, options)
}
