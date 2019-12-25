import makeUuidV4 from 'uuid/v4';

export interface Task {
    _id: string;
    text: string;
    done: boolean;
    creationTime: Date;
    schemaVersion: string;
}

export function makeTask(text: string, done: boolean) {
    return {
        _id: makeUuidV4(),
        text,
        done,
        creationTime: new Date(),
        schemaVersion: '0.0.0'
    };
}
