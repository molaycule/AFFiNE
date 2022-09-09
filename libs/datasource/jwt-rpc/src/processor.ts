import * as decoding from 'lib0/decoding';
import * as encoding from 'lib0/encoding';
import * as syncProtocol from 'y-protocols/sync';
import * as Y from 'yjs';

import { Message } from './handler';
import { WebsocketProvider } from './provider';

export const readMessage = (
    provider: WebsocketProvider,
    buf: Uint8Array,
    emitSynced: boolean
): encoding.Encoder => {
    const decoder = decoding.createDecoder(buf);
    const encoder = encoding.createEncoder();
    const messageType = decoding.readVarUint(decoder) as Message;
    const messageHandler = provider.messageHandlers[messageType];
    if (/** @type {any} */ messageHandler) {
        messageHandler(encoder, decoder, provider, emitSynced, messageType);
    } else {
        console.error('Unable to compute message');
    }
    return encoder;
};

export const registerUpdateHandler = (
    provider: WebsocketProvider,
    doc: Y.Doc,
    broadcastMessage: (buf: ArrayBuffer) => void
) => {
    //  Listens to Yjs updates and sends them to remote peers (ws and broadcastchannel)
    const documentUpdateHandler = (update: Uint8Array, origin: any) => {
        if (origin !== provider) {
            const encoder = encoding.createEncoder();
            encoding.writeVarUint(encoder, Message.sync);
            syncProtocol.writeUpdate(encoder, update);
            broadcastMessage(encoding.toUint8Array(encoder));
        }
    };

    doc.on('update', documentUpdateHandler);
    return () => {
        doc.off('update', documentUpdateHandler);
    };
};
