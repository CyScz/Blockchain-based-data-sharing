/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Asset {
    @Property()
    public ID: string;

    @Property()
    public Filename: string;

    @Property()
    public Size: number;

    @Property()
    public Hash: string;

    @Property()
    public Sender: string;
}
