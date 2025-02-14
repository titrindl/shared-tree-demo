import { Note } from '../schema/app_schema';
import { Session, Client } from '../schema/session_schema';
import { selectAction, undefinedUserId } from './utils';

export const testRemoteNoteSelection = (
    item: Note,
    session: Session,
    clientId: string,
    setRemoteSelected: (value: boolean) => void,
    setSelected: (value: boolean) => void,
    fluidMembers: string[]
) => {
    if (clientId == undefinedUserId) return;

    let selected = false;
    let remoteSelected = false;

    for (const c of session.clients) {
        if (c.clientId == clientId) {
            if (c.selected.indexOf(item.id) != -1) {
                selected = true;
            }
        }

        if (c.clientId != clientId && fluidMembers.indexOf(c.clientId) != -1) {
            if (c.selected.indexOf(item.id) != -1) {
                remoteSelected = true;
            }
        }
    }
    setRemoteSelected(remoteSelected);
    setSelected(selected);
};

export const updateRemoteNoteSelection = (
    item: Note,
    action: selectAction,
    session: Session,
    clientId: string
) => {
    if (clientId == undefinedUserId) return;

    // Handle removed items and bail
    if (action == selectAction.REMOVE) {
        for (const c of session.clients) {
            if (c.clientId === clientId) {
                const i = c.selected.indexOf(item.id);
                if (i != -1) c.selected.removeAt(i);
                return;
            }
        }
        return;
    }

    if (action == selectAction.MULTI) {
        for (const c of session.clients) {
            if (c.clientId === clientId) {
                const i = c.selected.indexOf(item.id);
                if (i == -1) c.selected.insertAtEnd(item.id);
                return;
            }
        }
    }

    if (action == selectAction.SINGLE) {
        console.log(clientId);
        for (const c of session.clients) {
            if (c.clientId === clientId) {
                if (c.selected.length > 0) c.selected.removeRange(0);
                c.selected.insertAtStart(item.id);
                return;
            }
        }
    }

    const s = new Client({
        clientId: clientId,
        selected: [item.id],
    });

    session.clients.insertAtEnd(s);
};

export const getSelectedNotes = (session: Session, clientId: string): string[] => {
    for (const c of session.clients) {
        if (c.clientId == clientId) {
            return c.selected.concat();
        }
    }
    return [];
};

export const cleanSessionData = (session: Session, fluidMembers: string[]) => {
    const deleteMe: Client[] = [];
    for (const c of session.clients) {
        if (!fluidMembers.includes(c.clientId)) {
            deleteMe.push(c);
        }
    }

    for (const c of deleteMe) {
        session.clients.removeAt(session.clients.indexOf(c));
    }
};
