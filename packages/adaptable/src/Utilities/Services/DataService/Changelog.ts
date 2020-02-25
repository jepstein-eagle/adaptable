import { DataChangedInfo } from '../../../PredefinedConfig/Common/DataChangedInfo';

import binarySearch from 'binary-search';

interface TimestampedInfo extends DataChangedInfo {
  Timestamp: number;
}
interface ChangelogConfig {
  /**
   * amount in milliseconds - if we detect an entry with
   * timestamp < Date.now() - cleanupOlderThan
   * we clear it
   */
  cleanupOlderThan?: number;
}

export default class Changelog {
  private changelogMap: {
    [key: string]: TimestampedInfo[];
  } = {};
  private changelogArray: TimestampedInfo[] = [];
  private timestamps: number[] = [];

  private cleanupOlderThan?: number = -1;

  constructor(config?: ChangelogConfig) {
    this.cleanupOlderThan = config ? config.cleanupOlderThan : -1;
  }

  public put = (dataChangedInfo: DataChangedInfo) => {
    const Timestamp = (dataChangedInfo as any).Timestamp || Date.now();
    const timestampedInfo = {
      ...dataChangedInfo,
      Timestamp,
    };

    const id = `${timestampedInfo.PrimaryKeyValue}`;

    this.changelogMap[id] = this.changelogMap[id] || [];

    this.changelogMap[id].push(timestampedInfo);

    this.changelogArray.push(timestampedInfo);

    this.timestamps.push(Timestamp);

    this.cleanup();
  };

  cleanup = () => {
    if (this.cleanupOlderThan >= 0) {
      const NOW = Date.now();
      const cleanupBeforeTimestamp = NOW - this.cleanupOlderThan;
      const cleanupBeforeIndex = this.getInsertIndexOfTimestamp(cleanupBeforeTimestamp);
      this.timestamps = this.timestamps.slice(cleanupBeforeIndex);
      this.changelogArray = this.changelogArray.slice(cleanupBeforeIndex);

      // instead of goingthrough all the changelog map and cleaning up
      // old records
      this.changelogMap = {};

      // it's easier to just rebuild it from the new records
      this.changelogArray.forEach((info: TimestampedInfo) => {
        const id = info.PrimaryKeyValue;
        this.changelogMap[id] = this.changelogMap[id] || [];
        this.changelogMap[id].push(info);
      });

      console.log(this.changelogMap);
    }
  };

  private getInsertIndexOfTimestamp = (timestamp: number) => {
    const index = binarySearch(this.timestamps, timestamp, (element, needle) => {
      return element - needle;
    });

    let insertIndex: number;
    if (index < 0) {
      insertIndex = ~index;
    } else {
      insertIndex = index;
    }

    return insertIndex;
  };

  /**
   * Returns the changes that have happened since the provided timestamp
   * (INCLUDING changes ocurred on the exact timestamp)
   */
  public getChangesSince = (timestamp: number, primaryKey?: string): TimestampedInfo[] => {
    const startFrom = this.getInsertIndexOfTimestamp(timestamp);

    const result = this.changelogArray.slice(startFrom);

    return primaryKey !== undefined
      ? result.filter(info => info.PrimaryKeyValue === primaryKey)
      : result;
  };
}
