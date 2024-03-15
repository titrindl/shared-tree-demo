import React, { useEffect, useState } from 'react';
import { App, Note, Group, TableRef } from '../schema/app_schema';
import { Session } from '../schema/session_schema';
import {
    ConnectionState,
    IFluidContainer,
    IMember,
    IServiceAudience,
    Tree,
    TreeView,
} from 'fluid-framework';
import { GroupView } from './groupux';
import { RootNoteWrapper } from './noteux';
import {
    Floater,
    NewGroupButton,
    NewNoteButton,
    DeleteNotesButton,
    ButtonGroup,
    NewTableButton,
} from './buttonux';
import { undefinedUserId } from '../utils/utils';

export function Canvas(props: {
    appTree: TreeView<App>;
    sessionTree: TreeView<Session>;
    audience: IServiceAudience<IMember>;
    container: IFluidContainer;
    fluidMembers: string[];
    currentUser: string;
    setCurrentUser: (arg: string) => void;
    setConnectionState: (arg: string) => void;
    setSaved: (arg: boolean) => void;
    setFluidMembers: (arg: string[]) => void;
}): JSX.Element {
    const [invalidations, setInvalidations] = useState(0);

    const appRoot = props.appTree.root;
    const sessionRoot = props.sessionTree.root;

    // Register for tree deltas when the component mounts.
    // Any time the tree changes, the app will update
    // For more complex apps, this code can be included
    // on lower level components.
    useEffect(() => {
        const unsubscribe = Tree.on(appRoot, 'afterChange', () => {
            setInvalidations(invalidations + Math.random());
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const updateConnectionState = () => {
            if (props.container.connectionState === ConnectionState.Connected) {
                props.setConnectionState('connected');
            } else if (
                props.container.connectionState === ConnectionState.Disconnected
            ) {
                props.setConnectionState('disconnected');
            } else if (
                props.container.connectionState ===
                ConnectionState.EstablishingConnection
            ) {
                props.setConnectionState('connecting');
            } else if (
                props.container.connectionState === ConnectionState.CatchingUp
            ) {
                props.setConnectionState('catching up');
            }
        };
        updateConnectionState();
        props.setSaved(!props.container.isDirty);
        props.container.on('connected', updateConnectionState);
        props.container.on('disconnected', updateConnectionState);
        props.container.on('dirty', () => props.setSaved(false));
        props.container.on('saved', () => props.setSaved(true));
        props.container.on('disposed', updateConnectionState);
    }, []);

    const updateMembers = () => {
        if (props.audience.getMyself() == undefined) return;
        if (props.audience.getMyself()?.userId == undefined) return;
        if (props.audience.getMembers() == undefined) return;
        if (props.container.connectionState !== ConnectionState.Connected) return;
        if (props.currentUser == undefinedUserId) {
            const user = props.audience.getMyself()?.userId;
            if (typeof user === 'string') {
                props.setCurrentUser(user);
            }
        }
        props.setFluidMembers(Array.from(props.audience.getMembers().keys()));
    };

    useEffect(() => {
        props.audience.on('membersChanged', updateMembers);
        return () => {
            props.audience.off('membersChanged', updateMembers);
        };
    }, []);

    return (
        <div className="relative flex grow-0 h-full w-full bg-transparent">
            <Tables app={appRoot}></Tables>
            <RootItems
                app={appRoot}
                clientId={props.currentUser}
                session={sessionRoot}
                fluidMembers={props.fluidMembers}
            />
            <Floater>
                <ButtonGroup>
                    <NewTableButton root={appRoot}></NewTableButton>
                    <NewGroupButton
                        root={appRoot}
                        session={sessionRoot}
                        clientId={props.currentUser}
                    />
                    <NewNoteButton root={appRoot} clientId={props.currentUser} />
                    <DeleteNotesButton
                        session={sessionRoot}
                        app={appRoot}
                        clientId={props.currentUser}
                    />
                </ButtonGroup>
            </Floater>
        </div>
    );
}

function Tables({ app }: { app: App }): JSX.Element {
    const tables: JSX.Element[] = [];
    for (const table of app.tables.values()) {
        const rollRef = React.useRef<HTMLInputElement>(null);
        const rollInput = <input ref={rollRef} type="text" />;
        const resultRef = React.useRef<HTMLInputElement>(null);
        const resultInput = <input ref={resultRef} type="text" />;
        const importRef = React.useRef<HTMLTextAreaElement>(null);
        const importArea = <textarea ref={importRef}></textarea>;
        tables.push(
            <div>
                <input
                    type='text'
                    onChange={(e) => {
                        e.preventDefault();
                        table.setName(e.currentTarget.value)
                    }}
                    value={table.name}
                />
                <table>
                    <tr>
                        <th>
                            <button
                                onClick={() => {
                                    const result = table.roll();
                                    app.items.newNote('anon', table.name + '\n' + result);
                                }}
                            >
                                roll
                            </button>
                        </th>
                        <th>result</th>
                    </tr>
                    {Array.from(table.rows.entries()).sort(([k1], [k2]) => Number.parseInt(k1) - Number.parseInt(k2)).map(([roll, result]) => (
                        <tr key={roll}>
                            <td>{roll}</td>
                            <td>
                                {result.result.reduce<string>(
                                    (prev, val): string =>
                                        prev + ((val as TableRef).tableId ?? val),
                                    ''
                                )}
                            </td>
                        </tr>
                    ))}
                </table>
                {rollInput}
                {resultInput}
                <button
                    onClick={() => {
                        if (rollRef.current && resultRef.current) {
                            table.addRow(
                                rollRef.current.value,
                                resultRef.current.value
                            );
                            rollRef.current.value = resultRef.current.value = '';
                        }
                    }}
                >
                    Add Row
                </button>
                {importArea}
                <button
                    onClick={() => {
                        if (importRef.current) {
                            table.addRowsFromText(importRef.current.value);
                            importRef.current.value = '';
                        }
                    }}
                >
                    Import
                </button>
            </div>
        );
    }
    return <div style={{ overflow: 'scroll' }}>{...tables}</div>;
}

function RootItems(props: {
    app: App;
    clientId: string;
    session: Session;
    fluidMembers: string[];
}): JSX.Element {
    const pilesArray = [];
    for (const i of props.app.items) {
        if (i instanceof Group) {
            pilesArray.push(
                <GroupView
                    key={i.id}
                    group={i}
                    clientId={props.clientId}
                    app={props.app}
                    session={props.session}
                    fluidMembers={props.fluidMembers}
                />
            );
        } else if (i instanceof Note) {
            pilesArray.push(
                <RootNoteWrapper
                    key={i.id}
                    note={i}
                    clientId={props.clientId}
                    notes={props.app.items}
                    session={props.session}
                    fluidMembers={props.fluidMembers}
                />
            );
        }
    }

    return (
        <div className="flex grow-0 flex-row h-full w-full flex-wrap gap-4 p-4 content-start overflow-y-scroll">
            {pilesArray}
            <div className="flex w-full h-24"></div>
        </div>
    );
}
