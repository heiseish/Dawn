"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the platform and platform-specific id from the database string
 * @param {string} databaseId
 * @return {Result} parsed data
 * @return an object containing the account id and platform
 */
const getPlatformAndId = (databaseId) => {
    let platform;
    let id;
    if (databaseId.indexOf('mes') !== -1) {
        platform = 'messenger';
        id = databaseId.replace('mes', '');
    }
    else if (databaseId.indexOf('tlg') !== -1) {
        platform = 'telegram';
        id = parseInt(databaseId.replace('tlg', ''));
    }
    else if (databaseId.indexOf('gia') !== -1) {
        platform = 'unknown';
        id = databaseId.replace('gia', '');
    }
    return {
        platform,
        id,
    };
};
exports.getPlatformAndId = getPlatformAndId;
//# sourceMappingURL=account.js.map