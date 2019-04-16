(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("glue4office", [], factory);
	else if(typeof exports === 'object')
		exports["glue4office"] = factory();
	else
		root["glue4office"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(48);
var methodNames_1 = __webpack_require__(1);
var validations_1 = __webpack_require__(3);
exports.attachmentsErrorMessage = "Invalid type of \"attachments\" element, expected array of strings for " +
    "existing attachments or array of \"{data: string, fileName: string}\" for dynamically created attachments";
exports.isOutlookEnabled = function (agm) { return agm.methods({ name: methodNames_1.CreateItemMethodName }).length > 0; };
exports.getOlDefaultFolders = function () {
    return {
        $SentMail: 5,
        $Inbox: 6,
    };
};
exports.concatChunkData = function (data) {
    var result = "";
    data.forEach(function (chunk) {
        result += exports.encodeData(chunk);
    });
    return result;
};
exports.encodeData = function (data) { return atob(data); };
exports.decodeData = function (data) { return btoa(data); };
exports.generateConversationId = function () {
    return {
        systemName: Math.random().toString(36).substr(2, 10),
        nativeId: new Date().getTime().toString(),
    };
};
exports.convertToT42Email = function (email) {
    var t42ValueEmail = {
        attachments: email.attachments || [],
        body: email.body,
        bodyHtml: email.bodyHtml,
        subject: email.subject,
    };
    var newEmail = validations_1.validateRecipients(email);
    ["to", "cc", "bcc"].forEach(function (contactListName) {
        var receiver = newEmail[contactListName];
        if (receiver) {
            var newList_1 = [];
            receiver.forEach(function (contactEmail) {
                newList_1.push({ emails: [contactEmail] });
            });
            t42ValueEmail[contactListName] = newList_1;
        }
        if (newEmail.sender) {
            t42ValueEmail.sender = { emails: [newEmail.sender] };
        }
    });
    return t42ValueEmail;
};
exports.convertToT42Task = function (task) {
    return {
        attachments: task.attachments || [],
        body: task.body,
        dueDate: task.dueDate,
        importance: getTaskImportance(task.priority),
        reminderTime: task.reminderTime,
        startDate: task.startDate,
        subject: task.subject,
    };
};
var getTaskImportance = function (priority) {
    return typeof types_1.TaskPriority[priority] === "number" ? types_1.TaskPriority[priority] : types_1.TaskPriority.normal;
};
exports.getTaskPriority = function (importance) {
    if (types_1.TaskPriority.low === importance) {
        return "low";
    }
    else if (types_1.TaskPriority.high === importance) {
        return "high";
    }
    return "normal";
};
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemMethodName = "T42.Outlook.CreateItem";
exports.ShowItemMethodName = "T42.Outlook.ShowItem";
exports.SaveItemMethodName = "T42.Outlook.SaveItem";
exports.OnSendMethodName = "T42.Outlook.OnSendMethod";
exports.OnCancelMethodName = "T42.Outlook.OnCancelMethod";
exports.OnEmailReceivedMethodName = "T42.Outlook.OnEmailReceived";
exports.OnTaskCreatedMethodName = "T42.Outlook.OnTaskCreated";
exports.OutlookGetAttachmentMethodName = "T42.Outlook.GetAttachment";
exports.CreateLocalEmailMethodName = "T42.Outlook.CreateLocalEmail";
exports.OutlookGetItemAsMsgMethodName = "T42.Outlook.GetItemAsMsgMethod";
exports.TmpFilesAppendMethodName = "T42.TmpFiles.Append";
exports.OnTrackEmailMethodName = "T42.CRM.TrackEmail";
exports.OnUntrackEmailMethodName = "T42.CRM.UntrackEmail";
exports.OnTrackItemMethodName = "T42.CRM.TrackCalendarItem";
exports.OnUntrackItemMethodName = "T42.CRM.UntrackCalendarItem";
exports.CRMGetAttachmentMethodName = "T42.CRM.GetAttachment";
exports.CRMGetItemAsMsgMethodName = "T42.CRM.GetItemAsMsg";
exports.SyncTrackEmailMethodName = "T42.CRM.SyncTrackEmail";
exports.SyncUntrackEmailMethodName = "T42.CRM.SyncUntrackEmail";
exports.SyncTrackCalendarItemMethodName = "T42.CRM.SyncTrackCalendarItem";
exports.SyncUntrackCalendarItemMethodName = "T42.CRM.SyncUntrackCalendarItem";
exports.SecureReplyMethodName = "T42.CRM.SecureReply";
exports.DisplaySecureMailMethodName = "T42.CRM.DisplaySecureMail";
//# sourceMappingURL=methodNames.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createRegistry() {
    var callbacks = {};
    function add(key, callback) {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }
        callbacksForKey.push(callback);
        return function () {
            var allForKey = callbacks[key];
            if (!allForKey) {
                return;
            }
            allForKey = allForKey.filter(function (item) {
                return item !== callback;
            });
            callbacks[key] = allForKey;
        };
    }
    function execute(key) {
        var argumentsArr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argumentsArr[_i - 1] = arguments[_i];
        }
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }
        var results = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            }
            catch (err) {
                results.push(undefined);
            }
        });
        return results;
    }
    function clear() {
        callbacks = {};
    }
    return {
        add: add,
        execute: execute,
        clear: clear
    };
}
;
createRegistry.default = createRegistry;
module.exports = createRegistry;
//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
exports.validateRecipients = function (email) {
    var recipientProps = ["to", "cc", "bcc"];
    return Object.keys(email).reduce(function (prev, curr) {
        if (recipientProps.indexOf(curr) >= 0) {
            var receiver = email[curr];
            if (!Array.isArray(receiver)) {
                prev[curr] = [receiver.toString()];
                return prev;
            }
            else {
                prev[curr] = [];
                receiver.forEach(function (contactEmail) {
                    prev[curr].push(contactEmail.toString());
                });
            }
        }
        prev[curr] = email[curr];
        return prev;
    }, {});
};
exports.validateAttachments = function (attachments) {
    if (!Array.isArray(attachments)) {
        throw new Error(index_1.attachmentsErrorMessage);
    }
    if (attachments.length === 0) {
        return attachments;
    }
    var isValid = true;
    var firstAtt = attachments[0];
    if (firstAtt.data !== undefined || firstAtt.fileName !== undefined) {
        attachments.forEach(function (att) {
            if (typeof att.data !== "string" || typeof att.fileName !== "string") {
                window.console.warn(index_1.attachmentsErrorMessage);
                isValid = false;
            }
        });
    }
    else {
        attachments.forEach(function (att) {
            if (typeof att !== "string") {
                window.console.warn(index_1.attachmentsErrorMessage);
                isValid = false;
            }
        });
    }
    return isValid ? attachments : null;
};
exports.validateDate = function (date, propertyName) {
    var newDate = new Date(date);
    var dateUnix = newDate.getTime();
    if (isNaN(dateUnix)) {
        window.console.warn("Invalid type of \"" + propertyName + "\", expected \"Date\" or unix timestamp number");
        return null;
    }
    return date;
};
exports.validatePriority = function (priority) {
    var listOfPriorities = ["low", "normal", "high"];
    if (typeof priority !== "string") {
        window.console.warn("Invalid type of \"priority\", expected \"string\", one of: \"low\", \"normal\" or \"high\"");
        return "normal";
    }
    if (listOfPriorities.indexOf(priority) < 0) {
        throw new Error("Invalid type of \"priority\", expected \"string\", one of: \"low\", \"normal\" or \"high\"");
    }
    return priority;
};
exports.validateNewItemOptions = function (options) {
    if (options.onSent && typeof options.onSent !== "function") {
        throw new Error("Invalid type of \"onSent\" callback, expected function");
    }
    if (options.onSaved && typeof options.onSaved !== "function") {
        throw new Error("Invalid type of \"onSaved\" callback, expected function");
    }
    if (options.onCanceled && typeof options.onCanceled !== "function") {
        throw new Error("Invalid type of \"onCanceled\" callback, expected function");
    }
};
exports.validateLocalEmailParameters = function (agm, localEmailParams) {
    if (!index_1.isOutlookEnabled(agm)) {
        throw new Error("The method \"createLocalEmail\" is not available");
    }
    if (!localEmailParams) {
        throw new Error("\"localEmailParams\" of type object are mandatory");
    }
    if (!localEmailParams.sender) {
        throw new Error("The property \"sender\" in \"localEmailParams\" is mandatory");
    }
    else if (typeof localEmailParams.sender !== "string") {
        throw new Error("Invalid type of \"sender\", expected string");
    }
    if (!localEmailParams.to) {
        throw new Error("The property \"to\" in \"localEmailParams\" is mandatory");
    }
    else if (typeof localEmailParams.to !== "string" && !Array.isArray(localEmailParams.to)) {
        throw new Error("Invalid type of \"to\", expected string or string[]");
    }
    if (!localEmailParams.subject) {
        throw new Error("The property \"subject\" in \"localEmailParams\" is mandatory");
    }
    else if (typeof localEmailParams.subject !== "string") {
        throw new Error("Invalid type of \"subject\", expected string");
    }
};
exports.validateLocation = function (location) {
    if (typeof location !== "string" && !location.ids) {
        throw new Error("Invalid location");
    }
    if (typeof location === "string" && location.indexOf("$") === 0) {
        var defaultFolders = index_1.getOlDefaultFolders();
        if (typeof defaultFolders[location] !== "number") {
            throw new Error("Invalid location");
        }
    }
};
exports.validateCalendarEventParameters = function (agm, action, event) {
    if (!index_1.isOutlookEnabled(agm)) {
        var methodName = action === "track" ? "trackEmail" : "untrackEmail";
        throw new Error("The method " + methodName + " is not available");
    }
    if (!event || (!event.ids || event.ids.length === 0)) {
        throw new Error("Invalid meeting / appointment");
    }
};
exports.validateId = function (id) {
    if (!id.systemName || !id.nativeId) {
        throw new Error("Invalid type of conversationId, expected \"{systemName: string, nativeId: string\"");
    }
    var systemName = id.systemName.toString();
    var nativeId = id.nativeId.toString();
    return { systemName: systemName, nativeId: nativeId };
};
//# sourceMappingURL=validations.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(29);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

function get () {
  return alphabet || ORIGINAL;
}

module.exports = {
    get: get,
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getAttachment_1 = __webpack_require__(44);
var AttachmentImpl = /** @class */ (function () {
    function AttachmentImpl(attachment, agm, parent) {
        this.cookie = attachment.cookie;
        this.emailIds = attachment.emailIds;
        this.data = attachment.data;
        this.ids = attachment.ids;
        this.name = attachment.name;
        this.sizeHint = attachment.sizeHint;
        this.errorMessage = attachment.errorMessage;
        this.more = attachment.more;
        this.success = attachment.success;
        this.agm = agm;
        if (parent) {
            this.parent = parent;
        }
    }
    AttachmentImpl.prototype.getData = function (callback) {
        return getAttachment_1.getAttachment(this.agm, this.emailIds, this.ids, callback);
    };
    return AttachmentImpl;
}());
exports.AttachmentImpl = AttachmentImpl;
//# sourceMappingURL=AttachmentImplementation.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __webpack_require__(7);
var AttachmentImplementation_1 = __webpack_require__(5);
var EmailImpl = /** @class */ (function () {
    function EmailImpl(email, agm) {
        var _this = this;
        if (email.attachments && email.attachments.length > 0) {
            this.attachments = [];
            email.attachments.forEach(function (att) {
                _this.attachments.push(new AttachmentImplementation_1.AttachmentImpl(att, agm, _this));
            });
        }
        this.bcc = email.bcc;
        this.body = email.body;
        this.bodyHtml = email.bodyHtml;
        this.cc = email.cc;
        this.date = email.date;
        this.ids = email.ids;
        this.sender = email.sender;
        this.subject = email.subject;
        this.to = email.to;
        this.entityType = email.entityType;
    }
    EmailImpl.prototype.show = function () {
        return Manager_1.default.showItemMethod(this.ids, "showEmail");
    };
    EmailImpl.prototype.saveToFile = function () {
        return Manager_1.default.saveItemMethod(this.ids, "saveEmail");
    };
    EmailImpl.prototype.getAsMsg = function () {
        return Manager_1.default.getItemAsMsg(this.ids);
    };
    EmailImpl.prototype.track = function (conversationId) {
        return Manager_1.default.handleTrackingEmails("track", this.ids, conversationId);
    };
    EmailImpl.prototype.untrack = function () {
        return Manager_1.default.handleTrackingEmails("untrack", this.ids);
    };
    return EmailImpl;
}());
exports.EmailImpl = EmailImpl;
//# sourceMappingURL=EmailImplementation.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var methodNames_1 = __webpack_require__(1);
var validations_1 = __webpack_require__(3);
var GetItemAsMsgDictionary_1 = __webpack_require__(13);
var TrackEmailDictionary_1 = __webpack_require__(14);
var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.prototype.init = function (agm) {
        this.agm = agm;
    };
    Manager.prototype.showItemMethod = function (ids, methodName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!index_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"" + methodName + "\" is not available");
                return;
            }
            ids = _this.validateIds(ids);
            var successHandler = function () {
                resolve(ids);
            };
            var errorHandler = function (err) {
                reject(err.message);
                return;
            };
            _this.agm.invoke(methodNames_1.ShowItemMethodName, { itemT42Ids: ids })
                .then(function () { return successHandler(); })
                .catch(function (err) { return errorHandler(err); });
        });
    };
    Manager.prototype.saveItemMethod = function (ids, methodName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!index_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"" + methodName + "\" is not available");
                return;
            }
            var successHandler = function (r) {
                resolve(r.returned.url);
            };
            var errorHandler = function (err) {
                reject(err.message);
                return;
            };
            _this.agm.invoke(methodNames_1.SaveItemMethodName, { itemT42Ids: ids })
                .then(function (r) { return successHandler(r); })
                .catch(function (err) { return errorHandler(err); });
        });
    };
    Manager.prototype.getItemAsMsg = function (ids) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!index_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"getAsMsg\" is not available");
                return;
            }
            var cookie = new Date().getTime().toString();
            var successHandler = function () {
                GetItemAsMsgDictionary_1.default.add(cookie, { resolve: resolve, reject: reject });
            };
            var errorHandler = function (err) {
                reject(err.message);
                return;
            };
            var getItemOptions = {
                itemIds: ids,
                callback: methodNames_1.OutlookGetItemAsMsgMethodName,
                cookie: cookie,
            };
            _this.agm.invoke(methodNames_1.CRMGetItemAsMsgMethodName, getItemOptions)
                .then(function () { return successHandler(); })
                .catch(function (err) { return errorHandler(err); });
        });
    };
    Manager.prototype.handleTrackingEmails = function (action, emailIds, conversationId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!index_1.isOutlookEnabled(_this.agm)) {
                reject("The method \"" + action + "\" is not available");
                return;
            }
            var id = conversationId ? validations_1.validateId(conversationId) : null;
            var isTrackEmail = action === "track";
            var conversationIds = _this.combineConversationIds(emailIds, id, isTrackEmail);
            var successHandler = function () {
                resolve({ emailIds: emailIds, conversationIds: conversationIds });
                if (!isTrackEmail) {
                    TrackEmailDictionary_1.default.remove(emailIds);
                    var untrackIds = emailIds.filter(function (ids) { return ids.systemName === ("Outlook.ConversationId"); });
                    TrackEmailDictionary_1.default.add(emailIds, untrackIds);
                }
            };
            var errorHandler = function (err) {
                reject(err.message);
                return;
            };
            var methodName = isTrackEmail ? methodNames_1.SyncTrackEmailMethodName : methodNames_1.SyncUntrackEmailMethodName;
            var params = { emailIds: emailIds, conversationIds: conversationIds };
            return _this.agm.invoke(methodName, params)
                .then(successHandler)
                .catch(errorHandler);
        });
    };
    Manager.prototype.validateIds = function (ids) {
        if (!ids) {
            throw new Error("\"ids\" are mandatory");
        }
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error("Invalid type of ids");
        }
        return ids.map(function (id) { return validations_1.validateId(id); });
    };
    Manager.prototype.combineConversationIds = function (ids, conversationId, isTrackEmail) {
        var conversationIds = TrackEmailDictionary_1.default.containsIds(ids) ? TrackEmailDictionary_1.default.get(ids) : [];
        if (isTrackEmail) {
            var newConversationIds = conversationId ? conversationId : index_1.generateConversationId();
            conversationIds.push(newConversationIds);
            if (!TrackEmailDictionary_1.default.containsIds(ids)) {
                TrackEmailDictionary_1.default.add(ids, conversationIds);
            }
        }
        return conversationIds;
    };
    return Manager;
}());
exports.Manager = Manager;
exports.default = new Manager();
//# sourceMappingURL=Manager.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseMethodName = "T42.WordEditor.Closed";
exports.EditHtmlMethodName = "T42.Word.HtmlEdit";
exports.ReceiveHtmlMethodName = "T42.Word.HtmlReceive";
exports.ReturnHtmlMethodName = "T42.Word.ReturnHtml";
exports.OnReturnHtmlMethodName = "T42.Word.OnReturnHtml";
exports.ChunkSize = 4000000;
//# sourceMappingURL=const.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22), __webpack_require__(32)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = __webpack_require__(23);
function getColumnsAsJson(columns) {
    var modifiedColumns = columns.map(function (col) {
        var column = {
            name: col.fieldName || "",
            text: col.header || col.fieldName,
            foregroundColor: col.foregroundColor || "",
            backgroundColor: col.backgroundColor || "",
            width: isNumber(col.width) ? col.width : null,
        };
        if (col.validation) {
            column.validation = {
                type: ("xlValidate" + col.validation.type),
                alert: ("xlValidAlert" + col.validation.alert),
                list: col.validation.list || null,
            };
        }
        return column;
    });
    return modifiedColumns;
}
function getDataAsJson(columns, data) {
    var modifiedData = data.map(function (row) {
        var dataList = [];
        columns
            .map(function (col) { return col.fieldName; })
            .forEach(function (name) { return dataList.push(row[name] || ""); });
        return { data: dataList };
    });
    return modifiedData;
}
function getOptions(options) {
    // This is object, which is used to convert options from friendly name to the method's params and sets the default value
    var methodOptions = {
        clearGrid: {
            default: true,
            friendlyName: undefined,
        },
        workbook: {
            default: shortid.generate(),
            friendlyName: undefined,
        },
        dataWorksheet: {
            default: shortid.generate(),
            friendlyName: "worksheet",
        },
        templateWorkbook: undefined,
        viewWorksheet: {
            friendlyName: "templateWorksheet",
        },
        response: {
            default: "image",
            friendlyName: "payloadType",
        },
        inhibitLocalSave: undefined,
        glueMethod: {
            default: "ValidateShowGrid",
            friendlyName: undefined,
        },
        buttonText: undefined,
        buttonRange: {
            default: "A1",
            friendlyName: undefined,
        },
        topLeft: {
            default: "A1",
            friendlyName: undefined,
        },
        triggers: {
            default: ["save"],
            friendlyName: "updateTrigger",
        },
        dataRangeName: undefined,
        window: undefined,
        chunkSize: {
            default: 1000,
            friendlyName: undefined,
        },
        disableErrorViewer: undefined,
        autostart: undefined,
        displayName: undefined,
    };
    var updatedOptions = {};
    options = options || {};
    Object.keys(methodOptions).forEach(function (key) {
        var value = methodOptions[key];
        var friendlyName = value ? value.friendlyName : undefined;
        var defaultValue = value ? value.default : undefined;
        if (friendlyName) {
            updatedOptions[key] = options[friendlyName];
        }
        else {
            updatedOptions[key] = options[key];
        }
        if (!updatedOptions[key]) {
            updatedOptions[key] = defaultValue;
        }
    });
    return updatedOptions;
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function parseAgmResult(r) {
    var resp;
    try {
        resp = JSON.parse(r.returned.result).success;
    }
    catch (error) {
        resp = false;
    }
    return resp;
}
exports.parseAgmResult = parseAgmResult;
function convertParams(columns, data, options, cookie) {
    var params = {
        columnsAsJSON: JSON.stringify(getColumnsAsJson(columns)),
        dataAsJSON: JSON.stringify(getDataAsJson(columns, data)),
        cookie: cookie ? cookie : shortid.generate(),
    };
    var op = getOptions(options);
    // Workaround for Object.assign(params, op);
    var combinedParams = __assign({}, params, op);
    return {
        params: combinedParams,
        options: op,
    };
}
exports.convertParams = convertParams;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CreateItemDictionary = /** @class */ (function () {
    function CreateItemDictionary() {
        this.items = {};
    }
    CreateItemDictionary.prototype.containsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    CreateItemDictionary.prototype.add = function (key, value) {
        this.items[key] = value;
    };
    CreateItemDictionary.prototype.remove = function (key) {
        delete this.items[key];
    };
    CreateItemDictionary.prototype.get = function (key) {
        return this.items[key];
    };
    return CreateItemDictionary;
}());
exports.CreateItemDictionary = CreateItemDictionary;
exports.default = new CreateItemDictionary();
//# sourceMappingURL=CreateItemDictionary.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GetAttachmentDictionary = /** @class */ (function () {
    function GetAttachmentDictionary() {
        this.items = {};
    }
    GetAttachmentDictionary.prototype.containsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    GetAttachmentDictionary.prototype.add = function (key, value) {
        this.items[key] = value;
    };
    GetAttachmentDictionary.prototype.remove = function (key) {
        delete this.items[key];
    };
    GetAttachmentDictionary.prototype.get = function (key) {
        return this.items[key];
    };
    return GetAttachmentDictionary;
}());
exports.GetAttachmentDictionary = GetAttachmentDictionary;
exports.default = new GetAttachmentDictionary();
//# sourceMappingURL=GetAttachmentDictionary.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GetItemAsMsgDictionary = /** @class */ (function () {
    function GetItemAsMsgDictionary() {
        this.items = {};
    }
    GetItemAsMsgDictionary.prototype.containsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    GetItemAsMsgDictionary.prototype.add = function (key, value) {
        this.items[key] = value;
    };
    GetItemAsMsgDictionary.prototype.remove = function (key) {
        delete this.items[key];
    };
    GetItemAsMsgDictionary.prototype.get = function (key) {
        return this.items[key];
    };
    return GetItemAsMsgDictionary;
}());
exports.GetItemAsMsgDictionary = GetItemAsMsgDictionary;
exports.default = new GetItemAsMsgDictionary();
//# sourceMappingURL=GetItemAsMsgDictionary.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TrackEmailDictionary = /** @class */ (function () {
    function TrackEmailDictionary() {
        this.items = {};
    }
    TrackEmailDictionary.prototype.containsIds = function (ids) {
        var key = this.getOutlookId(ids);
        return this.items.hasOwnProperty(key);
    };
    TrackEmailDictionary.prototype.add = function (emailIds, ids) {
        var key = this.getOutlookId(emailIds);
        this.items[key] = ids;
    };
    TrackEmailDictionary.prototype.remove = function (ids) {
        var key = this.getOutlookId(ids);
        delete this.items[key];
    };
    TrackEmailDictionary.prototype.get = function (ids) {
        var key = this.getOutlookId(ids);
        return this.items[key];
    };
    TrackEmailDictionary.prototype.getOutlookId = function (ids) {
        return ids.filter(function (id) { return id.systemName.indexOf("Outlook") === 0; })[0].nativeId;
    };
    return TrackEmailDictionary;
}());
exports.TrackEmailDictionary = TrackEmailDictionary;
exports.default = new TrackEmailDictionary();
//# sourceMappingURL=TrackEmailDictionary.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TrackItemDictionary = /** @class */ (function () {
    function TrackItemDictionary() {
        this.items = {};
    }
    TrackItemDictionary.prototype.containsIds = function (ids) {
        var key = this.getOutlookId(ids);
        return this.items.hasOwnProperty(key);
    };
    TrackItemDictionary.prototype.add = function (emailIds, ids) {
        var key = this.getOutlookId(emailIds);
        this.items[key] = ids;
    };
    TrackItemDictionary.prototype.remove = function (ids) {
        var key = this.getOutlookId(ids);
        delete this.items[key];
    };
    TrackItemDictionary.prototype.get = function (ids) {
        var key = this.getOutlookId(ids);
        return this.items[key];
    };
    TrackItemDictionary.prototype.getOutlookId = function (ids) {
        return ids.filter(function (id) { return id.systemName.indexOf("Outlook") === 0; })[0].nativeId;
    };
    return TrackItemDictionary;
}());
exports.TrackItemDictionary = TrackItemDictionary;
exports.default = new TrackItemDictionary();
//# sourceMappingURL=TrackItemDictionary.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var validations_1 = __webpack_require__(3);
var methodNames_1 = __webpack_require__(1);
var index_1 = __webpack_require__(0);
var CreateItemDictionary_1 = __webpack_require__(11);
var chunkSize = 800000;
// TODO add action for test purposes
// export const createItem = (agm: Glue42Core.AGM.API,
//                            item: EmailParams | TaskParams,
//                            itemType: string,
//                            options?: NewEmailOptions | NewTaskOptions,
//                            action?: number) => {
exports.createItem = function (agm, item, itemType, options) {
    var isT42Email = itemType === "email";
    var isT42Task = itemType === "task";
    options = options ? options : {};
    var onCanceled = options.onCanceled;
    return new Promise(function (resolve, reject) {
        var validItem = validateAndParseCreateItemParams(item);
        validations_1.validateNewItemOptions(options);
        var internalCookie = new Date().getTime().toString();
        var createItemObject = {
            ItemType: itemType,
            Cookie: internalCookie,
            OnSendMethod: methodNames_1.OnSendMethodName,
            OnCancelMethod: methodNames_1.OnCancelMethodName,
        };
        if (isT42Email) {
            createItemObject.t42value = index_1.convertToT42Email(validItem);
        }
        else if (isT42Task) {
            createItemObject.t42value = index_1.convertToT42Task(validItem);
        }
        var successHandler = function () {
            var onSent = isT42Email
                ? options.onSent
                : options.onSaved;
            CreateItemDictionary_1.default.add(internalCookie, { onSent: onSent, onCanceled: onCanceled });
            resolve();
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        // TODO add action for test purposes
        // const showItem = (r: { returned: { ItemID: object, displaySettings?: { action: number } } }) => {
        var showItem = function (r) {
            var showItemObject = r.returned;
            // if (action) {
            //     r.returned.displaySettings = {action};
            // }
            agm.invoke(methodNames_1.ShowItemMethodName, showItemObject)
                .then(successHandler)
                .catch(errorHandler);
        };
        var attachments = validItem.attachments;
        if (attachments && attachments.length > 0) {
            if (isT42Email) {
                createItemObject.t42value.attachments = [];
            }
            else {
                createItemObject.AttachFiles = [];
            }
            var att = attachments[0];
            var createNewFile = typeof att.data === "string";
            if (createNewFile) {
                Promise.all(attachments
                    .map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        file.truncate = true;
                        file.encoding = "base64";
                        // chunk by 1 MB
                        if (new Blob([file.data]).size > 1000000) {
                            return [2 /*return*/, chunkAndAppendAttachment(agm, file, file.data, isT42Email, createItemObject)];
                        }
                        else {
                            return [2 /*return*/, agm.invoke(methodNames_1.TmpFilesAppendMethodName, file)
                                    .then(function (returnedFile) {
                                    var fileName = returnedFile.returned.Filename;
                                    if (isT42Email) {
                                        createItemObject.t42value.attachments
                                            .push({ name: fileName });
                                    }
                                    else {
                                        createItemObject.AttachFiles.push(fileName);
                                    }
                                })
                                    .catch(function (err) { return window.console.warn("Not able to create attachment file"); })];
                        }
                        return [2 /*return*/];
                    });
                }); }))
                    .then(function () {
                    agm.invoke(methodNames_1.CreateItemMethodName, createItemObject)
                        .then(showItem)
                        .catch(function (err) { return reject(err.message); });
                })
                    .catch(function (err) { return reject(err.message); });
            }
            else if (typeof attachments[0] === "string") {
                // Attach existing file(s)
                attachments.map(function (file) {
                    return isT42Email
                        ? createItemObject.t42value.attachments
                            .push({ name: file })
                        : createItemObject.AttachFiles.push(file);
                });
                agm.invoke(methodNames_1.CreateItemMethodName, createItemObject)
                    .then(showItem)
                    .catch(function (err) { return reject(err.message); });
            }
            else {
                reject(index_1.attachmentsErrorMessage);
            }
        }
        else {
            agm.invoke(methodNames_1.CreateItemMethodName, createItemObject)
                .then(showItem)
                .catch(function (err) { return reject(err.message); });
        }
    });
};
var validateAndParseCreateItemParams = function (params) {
    var validParams = parseCreateItemParams(params);
    if (validParams.attachments) {
        validParams.attachments = validations_1.validateAttachments(params.attachments);
    }
    if (validParams.startDate) {
        validParams.startDate = validations_1.validateDate(validParams.startDate, "startDate");
    }
    if (validParams.dueDate) {
        validParams.dueDate = validations_1.validateDate(validParams.dueDate, "dueDate");
    }
    if (validParams.reminderTime) {
        validParams.reminderTime = validations_1.validateDate(validParams.reminderTime, "reminderTime");
    }
    if (validParams.priority) {
        validParams.priority = validations_1.validatePriority(validParams.priority);
    }
    return validParams;
};
var parseCreateItemParams = function (params) {
    var newParams = Object.keys(params)
        .reduce(function (prev, curr) {
        prev[curr] = params[curr];
        return prev;
    }, {});
    if (newParams.subject) {
        newParams.subject = newParams.subject.toString();
    }
    if (newParams.body) {
        newParams.body = newParams.body.toString();
    }
    if (newParams.bodyHtml) {
        newParams.bodyHtml = newParams
            .bodyHtml.toString();
    }
    if (newParams.sender) {
        newParams.sender.toString();
    }
    return newParams;
};
var chunkAndAppendAttachment = function (agm, file, data, isT42Email, createItemObject) {
    return new Promise(function (resolve) {
        var _a = updateChunkFile(file, data), chunkFile = _a.chunkFile, chunkData = _a.chunkData;
        invokeFileAppend(agm, chunkFile, chunkData, resolve, isT42Email, createItemObject);
    });
};
var invokeFileAppend = function (agm, file, data, resolve, isT42Email, createItemObject) {
    agm.invoke(methodNames_1.TmpFilesAppendMethodName, file)
        .then(function (returnedFile) {
        if (data.length > 0) {
            file.truncate = false;
            var _a = updateChunkFile(file, data), chunkFile = _a.chunkFile, chunkData = _a.chunkData;
            return invokeFileAppend(agm, chunkFile, chunkData, resolve, isT42Email, createItemObject);
        }
        else {
            var fileName = returnedFile.returned.Filename;
            if (isT42Email) {
                createItemObject.t42value.attachments
                    .push({ name: fileName });
            }
            else {
                createItemObject.AttachFiles.push(fileName);
            }
            resolve();
        }
    })
        .catch(function () {
        window.console.warn("Not able to create attachment file");
    });
};
var updateChunkFile = function (file, data) {
    file.data = data.slice(0, chunkSize);
    data = data.slice(chunkSize, data.length);
    return { chunkFile: file, chunkData: data };
};
//# sourceMappingURL=createItem.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __webpack_require__(7);
var AttachmentImplementation_1 = __webpack_require__(5);
var index_1 = __webpack_require__(0);
var TaskImpl = /** @class */ (function () {
    function TaskImpl(task, agm) {
        var _this = this;
        if (task.attachments && task.attachments.length > 0) {
            this.attachments = [];
            task.attachments.forEach(function (att) {
                _this.attachments.push(new AttachmentImplementation_1.AttachmentImpl(att, agm, _this));
            });
        }
        this.actualWork = task.actualWork;
        this.body = task.body;
        this.creationTime = task.creationTime;
        this.dateCompleted = task.dateCompleted;
        this.dueDate = task.dueDate;
        this.ids = task.ids;
        this.priority = index_1.getTaskPriority(task.importance);
        this.reminderTime = task.reminderTime;
        this.startDate = task.startDate;
        this.subject = task.subject;
        this.entityType = task.entityType;
    }
    TaskImpl.prototype.show = function () {
        return Manager_1.default.showItemMethod(this.ids, "showTask");
    };
    TaskImpl.prototype.saveToFile = function () {
        return Manager_1.default.saveItemMethod(this.ids, "saveTask");
    };
    return TaskImpl;
}());
exports.TaskImpl = TaskImpl;
//# sourceMappingURL=TaskImplementation.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EmailImplementation_1 = __webpack_require__(6);
var TaskImplementation_1 = __webpack_require__(17);
var index_1 = __webpack_require__(0);
var methodNames_1 = __webpack_require__(1);
var CreateItemDictionary_1 = __webpack_require__(11);
var GetAttachmentDictionary_1 = __webpack_require__(12);
var ChunkDataDictionary_1 = __webpack_require__(39);
var GetItemAsMsgDictionary_1 = __webpack_require__(13);
var TrackEmailDictionary_1 = __webpack_require__(14);
var TrackItemDictionary_1 = __webpack_require__(15);
var registerOnEmailReceived = function (agm, callbacks) {
    return agm.register(methodNames_1.OnEmailReceivedMethodName, function (args) {
        var email = new EmailImplementation_1.EmailImpl(args.email, agm);
        callbacks.execute("onEmailReceived", email);
        return { email: email };
    });
};
var registerOnTaskCreated = function (agm, callbacks) {
    return agm.register(methodNames_1.OnTaskCreatedMethodName, function (args) {
        var task = new TaskImplementation_1.TaskImpl(args, agm);
        callbacks.execute("onTaskCreated", task);
        return { task: task };
    });
};
var registerOnSendMethod = function (agm) {
    return agm.register(methodNames_1.OnSendMethodName, function (args) {
        var cookie = args.cookie, email = args.email, task = args.task;
        if (!CreateItemDictionary_1.default.containsKey(cookie) ||
            typeof CreateItemDictionary_1.default.get(cookie).onSent !== "function") {
            return;
        }
        if (email && !task) {
            CreateItemDictionary_1.default.get(cookie).onSent(new EmailImplementation_1.EmailImpl(email, agm));
            return { cookie: cookie, email: email };
        }
        else if (!email && task) {
            CreateItemDictionary_1.default.get(cookie).onSent(new TaskImplementation_1.TaskImpl(task, agm));
            return { cookie: cookie, task: task };
        }
        CreateItemDictionary_1.default.remove(cookie);
    });
};
var registerOnCancelMethod = function (agm) {
    return agm.register(methodNames_1.OnCancelMethodName, function (args) {
        var cookie = args.cookie;
        if (!CreateItemDictionary_1.default.containsKey(cookie) ||
            typeof CreateItemDictionary_1.default.get(cookie).onCanceled !== "function") {
            return;
        }
        CreateItemDictionary_1.default.get(cookie).onCanceled();
        CreateItemDictionary_1.default.remove(cookie);
        return { cookie: cookie };
    });
};
var getChunkDataSuccessCallback = function (methodCallbacksDictionary, cookie) {
    var attachmentData = index_1.concatChunkData(ChunkDataDictionary_1.default.get(cookie));
    if (methodCallbacksDictionary.containsKey(cookie)) {
        methodCallbacksDictionary.get(cookie).resolve(index_1.decodeData(attachmentData));
    }
    ChunkDataDictionary_1.default.remove(cookie);
    methodCallbacksDictionary.remove(cookie);
};
var getChunkDataErrorCallback = function (methodCallbacksDictionary, cookie, errorMessage) {
    if (methodCallbacksDictionary.containsKey(cookie)) {
        methodCallbacksDictionary.get(cookie).reject(errorMessage);
    }
    ChunkDataDictionary_1.default.remove(cookie);
    methodCallbacksDictionary.remove(cookie);
};
var executeGetDataCallback = function (percent, cookie) {
    if (percent <= 100 &&
        GetAttachmentDictionary_1.default.containsKey(cookie) &&
        typeof GetAttachmentDictionary_1.default.get(cookie).callback === "function") {
        GetAttachmentDictionary_1.default.get(cookie).callback(percent);
    }
};
var registerGetAttachment = function (agm) {
    var percent = 0;
    return agm.register(methodNames_1.OutlookGetAttachmentMethodName, function (args) {
        var cookie = args.cookie, data = args.data, errorMessage = args.errorMessage, success = args.success, more = args.more, length = args.length, totalLength = args.totalLength;
        ChunkDataDictionary_1.default.add(cookie, data);
        if (success) {
            percent += (length / totalLength) * 100;
            executeGetDataCallback(percent, cookie);
            if (!more) {
                if (percent < 100) {
                    executeGetDataCallback(100, cookie);
                }
                percent = 0;
                getChunkDataSuccessCallback(GetAttachmentDictionary_1.default, cookie);
            }
        }
        else {
            percent = 0;
            getChunkDataErrorCallback(GetAttachmentDictionary_1.default, cookie, errorMessage);
        }
        return {};
    });
};
var registerGetItemAsMsgMethod = function (agm) {
    return agm.register(methodNames_1.OutlookGetItemAsMsgMethodName, function (args) {
        var cookie = args.cookie, data = args.data, errorMessage = args.errorMessage, success = args.success, more = args.more;
        ChunkDataDictionary_1.default.add(cookie, data);
        if (success) {
            if (!more) {
                getChunkDataSuccessCallback(GetItemAsMsgDictionary_1.default, cookie);
            }
        }
        else {
            getChunkDataErrorCallback(GetItemAsMsgDictionary_1.default, cookie, errorMessage);
        }
        return {};
    });
};
exports.registerCRMTrackEmail = function (agm, callbacks) {
    return agm.register(methodNames_1.OnTrackEmailMethodName, function (args) {
        var conversationIds = args.conversationIds;
        var email = new EmailImplementation_1.EmailImpl(args.email, agm);
        TrackEmailDictionary_1.default.add(email.ids, conversationIds);
        callbacks.execute("onEmailTracked", { conversationIds: conversationIds, email: email });
        return {};
    });
};
exports.registerCRMUntrackEmail = function (agm, callbacks) {
    return agm.register(methodNames_1.OnUntrackEmailMethodName, function (args) {
        var conversationIds = args.conversationIds, emailIds = args.emailIds;
        callbacks.execute("onEmailUntracked", { conversationIds: conversationIds, emailIds: emailIds });
        return {};
    });
};
exports.registerCRMTrackItem = function (agm, callbacks) {
    return agm.register(methodNames_1.OnTrackItemMethodName, function (args) {
        var conversationIds = args.conversationIds, item = args.item;
        TrackItemDictionary_1.default.add(item.ids, conversationIds);
        callbacks.execute("onItemTracked", { conversationIds: conversationIds, event: item });
        return { conversationIds: conversationIds, event: item };
    });
};
exports.registerCRMUntrackItem = function (agm, callbacks) {
    return agm.register(methodNames_1.OnUntrackItemMethodName, function (args) {
        var conversationIds = args.conversationIds, itemIds = args.itemIds;
        callbacks.execute("onItemUntracked", { conversationIds: conversationIds, eventIds: itemIds });
        return { conversationIds: conversationIds, eventIds: itemIds };
    });
};
var registerSecureReply = function (agm, callbacks) {
    return agm.register(methodNames_1.SecureReplyMethodName, function (args) {
        var email = new EmailImplementation_1.EmailImpl(args.inReplyToMail, agm);
        callbacks.execute("onSecureReply", email);
        return { email: email };
    });
};
var registerDisplaySecureEmail = function (agm, callbacks) {
    return agm.register(methodNames_1.DisplaySecureMailMethodName, function (args) {
        var email = new EmailImplementation_1.EmailImpl(args.inReplyToMail, agm);
        callbacks.execute("onDisplaySecureEmail", email);
        return { email: email };
    });
};
exports.registerAgmMethods = function (agm, callbacks) {
    registerOnEmailReceived(agm, callbacks);
    registerOnTaskCreated(agm, callbacks);
    registerOnSendMethod(agm);
    registerOnCancelMethod(agm);
    registerGetItemAsMsgMethod(agm);
    registerGetAttachment(agm);
    registerSecureReply(agm, callbacks);
    registerDisplaySecureEmail(agm, callbacks);
};
//# sourceMappingURL=registerAgmMethods.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tick42_glue_core_1 = __webpack_require__(31);
var main_1 = __webpack_require__(50);
var main_2 = __webpack_require__(36);
var main_3 = __webpack_require__(40);
var es6_promise_1 = __webpack_require__(9);
var pjson = __webpack_require__(20);
var config_1 = __webpack_require__(33);
exports.default = (function (options) {
    // get config object
    // basically selecting some properties (and defaulting them)
    // it's used to extract things like layouts, appManager, activities etc things
    // that glueCore itself doesn't know about
    options = options || {};
    var glueConfig = config_1.default(options);
    function createOutlook(core) {
        if (glueConfig.outlook) {
            return main_3.default({ agm: core.agm });
        }
    }
    function createExcel(core) {
        if (glueConfig.excel) {
            return main_2.default({ agm: core.agm });
        }
    }
    function createWord(core) {
        if (glueConfig.word) {
            return main_1.default({ agm: core.agm });
        }
    }
    function extendExistingGlue(glue) {
        glue.outlook = createOutlook(glue);
        glue.excel = createExcel(glue);
        glue.word = createWord(glue);
        ext.enrichGlue(glue);
    }
    var ext = {
        // define extra libraries for glue-core to raise
        libs: [
            { name: "outlook", create: createOutlook },
            { name: "excel", create: createExcel },
            { name: "word", create: createWord },
        ],
        version: pjson.version,
        enrichGlue: function (glue) {
            // put some data to config
            glue.config.outlook = glueConfig.outlook;
            glue.config.excel = glueConfig.excel;
            glue.config.word = glueConfig.word;
        },
    };
    // users can pass existing glue object (that can be glue-core or glue)
    // in that case it will be extended with office libs
    if (options.glue) {
        extendExistingGlue(options.glue);
        return es6_promise_1.Promise.resolve(options.glue);
    }
    return tick42_glue_core_1.default(options, ext);
});
//# sourceMappingURL=glue4office.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {"name":"glue4office","version":"1.3.2","description":"glue for office","main":"dist/node/glue4office.js","browser":"dist/web/glue4office.js","types":"glue4office.d.ts","docName":"Glue4Office","scripts":{"clean":"node ./build/scripts/clean.js","pre:build":"npm run tslint && tsc && set NODE_ENV=development && npm run clean","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**/*.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**/*.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify","docs":"typedoc --options typedoc.json ./src","generate-docs":"tick42-reference-docs -l 1.0.0,2.1.1 -d D:\\test-reference-docs -p g4o -m tick42-outlook,tick42-excel,tick42-word,tick42-agm","prepublish":"npm update && npm run build:prod"},"author":"Tick42","license":"ISC","precommit":"tslint","devDependencies":{"@types/node":"^9.6.23","callback-registry":"^2.3.1","es6-promise":"^4.2.2","onchange":"^3.3.0","pre-commit":"^1.1.3","shelljs":"^0.6.0","tick42-webpack-config":"^4.1.6","tslint":"^5.11.0","typedoc":"^0.9.0","typescript":"^2.9.2","webpack":"2.3.3"},"dependencies":{"shortid":"^2.2.12","tick42-glue-core":"^3.13.1"}}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * Secure random string generator with custom alphabet.
 *
 * Alphabet must contain 256 symbols or less. Otherwise, the generator
 * will not be secure.
 *
 * @param {generator} random The random bytes generator.
 * @param {string} alphabet Symbols to be used in new random string.
 * @param {size} size The number of symbols in new random string.
 *
 * @return {string} Random string.
 *
 * @example
 * var format = require('nanoid/format')
 *
 * function random (size) {
 *   var result = []
 *   for (var i = 0; i < size; i++) result.push(randomByte())
 *   return result
 * }
 *
 * format(random, "abcdef", 5) //=> "fbaef"
 *
 * @name format
 * @function
 */
module.exports = function (random, alphabet, size) {
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  var step = Math.ceil(1.6 * mask * size / alphabet.length)

  var id = ''
  while (true) {
    var bytes = random(step)
    for (var i = 0; i < step; i++) {
      var byte = bytes[i] & mask
      if (alphabet[byte]) {
        id += alphabet[byte]
        if (id.length === size) return id
      }
    }
  }
}

/**
 * @callback generator
 * @param {number} bytes The number of bytes to generate.
 * @return {number[]} Random bytes.
 */


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(26);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generate = __webpack_require__(25);
var alphabet = __webpack_require__(4);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {
    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + generate(version);
    str = str + generate(clusterWorkerId);
    if (counter > 0) {
        str = str + generate(counter);
    }
    str = str + generate(seconds);
    return str;
}

module.exports = build;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(4);
var random = __webpack_require__(28);
var format = __webpack_require__(21);

function generate(number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + format(random, alphabet.get(), 1);
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = generate;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(4);
var build = __webpack_require__(24);
var isValid = __webpack_require__(27);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(30) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(4);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}

module.exports = isShortId;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

var randomByte;

if (!crypto || !crypto.getRandomValues) {
    randomByte = function(size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    };
} else {
    randomByte = function(size) {
        return crypto.getRandomValues(new Uint8Array(size));
    };
}

module.exports = randomByte;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tick42-glue-core", [], factory);
	else if(typeof exports === 'object')
		exports["tick42-glue-core"] = factory();
	else
		root["tick42-glue-core"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createRegistry() {
    var callbacks = {};
    function add(key, callback) {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }
        callbacksForKey.push(callback);
        return function () {
            var allForKey = callbacks[key];
            if (!allForKey) {
                return;
            }
            allForKey = allForKey.filter(function (item) {
                return item !== callback;
            });
            callbacks[key] = allForKey;
        };
    }
    function execute(key) {
        var argumentsArr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argumentsArr[_i - 1] = arguments[_i];
        }
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }
        var results = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            }
            catch (err) {
                results.push(undefined);
            }
        });
        return results;
    }
    function clear() {
        callbacks = {};
    }
    return {
        add: add,
        execute: execute,
        clear: clear
    };
}
;
createRegistry.default = createRegistry;
module.exports = createRegistry;
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DEFAULT: 0,
    STRING: 1,
    NUMBER: 2,
    COUNT: 3,
    RATE: 4,
    STATISTICS: 6,
    TIMESTAMP: 7,
    ADDRESS: 8,
    TIMESPAN: 10,
    OBJECT: 11
};
//# sourceMappingURL=metric-types.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    validate: function (definition, parent, transport) {
        // TODO: Add validation for parent, transport, system
        if (definition === null || typeof definition !== "object") {
            throw new Error("Missing definition");
        }
        if (parent === null || typeof parent !== "object") {
            throw new Error("Missing parent");
        }
        if (transport === null || typeof transport !== "object") {
            throw new Error("Missing transport");
        }
    },
};
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var shortid = __webpack_require__(7);
exports.default = shortid;
//# sourceMappingURL=random.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(20);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function convertInfoToInstance(info) {
    if (typeof info !== "object") {
        info = {};
    }
    return {
        application: info.ApplicationName,
        environment: info.Environment,
        machine: info.MachineName,
        pid: info.ProcessId,
        region: info.Region,
        service: info.ServiceName,
        user: info.UserName,
        started: info.ProcessStartTime,
    };
}
exports.convertInfoToInstance = convertInfoToInstance;
function isStreamingFlagSet(flags) {
    if (typeof flags !== "number" || isNaN(flags)) {
        return false;
    }
    // checking the largest Bit using bitwise ops
    var mask = 32;
    // tslint:disable-next-line:no-bitwise
    var result = flags & mask;
    return result === mask;
}
exports.isStreamingFlagSet = isStreamingFlagSet;
function convertInstance(instance) {
    return {
        ApplicationName: instance.application,
        ProcessId: instance.pid,
        MachineName: instance.machine,
        UserName: instance.user,
        Environment: instance.environment,
        Region: instance.region,
    };
}
exports.convertInstance = convertInstance;
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(17);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1(promise, successCallback, errorCallback) {
    if (typeof successCallback !== "function" && typeof errorCallback !== "function") {
        return promise;
    }
    if (typeof successCallback !== "function") {
        successCallback = function () { };
    }
    else if (typeof errorCallback !== "function") {
        errorCallback = function () { };
    }
    promise.then(successCallback, errorCallback);
}
exports.default = default_1;
//# sourceMappingURL=promisify.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ServerSubscription = /** @class */ (function () {
    function ServerSubscription(protocol, repoMethod, subscription) {
        this.protocol = protocol;
        this.repoMethod = repoMethod;
        this.subscription = subscription;
    }
    Object.defineProperty(ServerSubscription.prototype, "stream", {
        get: function () { return this.repoMethod.stream; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSubscription.prototype, "arguments", {
        get: function () { return this.subscription.arguments || {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSubscription.prototype, "branchKey", {
        get: function () { return this.subscription.branchKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSubscription.prototype, "instance", {
        get: function () { return this.subscription.instance; },
        enumerable: true,
        configurable: true
    });
    ServerSubscription.prototype.close = function () {
        this.protocol.server.closeSingleSubscription(this.repoMethod, this.subscription);
    };
    ServerSubscription.prototype.push = function (data) {
        this.protocol.server.pushDataToSingle(this.repoMethod, this.subscription, data);
    };
    return ServerSubscription;
}());
exports.default = ServerSubscription;
//# sourceMappingURL=subscription.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(19);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
/**
 * A template for gateway connections - this is extended from specific protocols and transports.
 */
var ConnectionImpl = /** @class */ (function () {
    function ConnectionImpl(settings) {
        // The message handlers that have to be executed for each received message
        this.messageHandlers = {};
        this.ids = 1;
        this.registry = callback_registry_1.default();
        this._connected = false;
        this._settings = settings;
    }
    ConnectionImpl.prototype.init = function (transport, protocol) {
        this._protocol = protocol;
        this._transport = transport;
        this._transport.onConnectedChanged(this.handleConnectionChanged.bind(this));
        this._transport.onMessage(this.handleTransportMessage.bind(this));
    };
    ConnectionImpl.prototype.send = function (product, type, message, id, options) {
        // create a message using the protocol
        if (this._transport.isObjectBasedTransport) {
            var msg = this._protocol.createObjectMessage(product, type, message, id);
            return this._transport.sendObject(msg, product, type, options);
        }
        else {
            var strMessage = this._protocol.createStringMessage(product, type, message, id);
            return this._transport.send(strMessage, product, type, options);
        }
    };
    ConnectionImpl.prototype.on = function (product, type, messageHandler) {
        type = type.toLowerCase();
        if (this.messageHandlers[type] === undefined) {
            this.messageHandlers[type] = {};
        }
        var id = this.ids++;
        this.messageHandlers[type][id] = messageHandler;
        return {
            type: type,
            id: id,
        };
    };
    // Remove a handler
    ConnectionImpl.prototype.off = function (info) {
        delete this.messageHandlers[info.type.toLowerCase()][info.id];
    };
    Object.defineProperty(ConnectionImpl.prototype, "isConnected", {
        get: function () {
            return this._connected;
        },
        enumerable: true,
        configurable: true
    });
    ConnectionImpl.prototype.connected = function (callback) {
        if (this._connected) {
            callback(this._settings.ws || this._settings.http);
        }
        return this.registry.add("connected", callback);
    };
    ConnectionImpl.prototype.disconnected = function (callback) {
        return this.registry.add("disconnected", callback);
    };
    ConnectionImpl.prototype.login = function (authRequest) {
        // open the protocol in case it was closed by explicity logout
        this._transport.open();
        return this._protocol.login(authRequest);
    };
    ConnectionImpl.prototype.logout = function () {
        this._protocol.logout();
        this._transport.close();
    };
    ConnectionImpl.prototype.loggedIn = function (callback) {
        return this._protocol.loggedIn(callback);
    };
    Object.defineProperty(ConnectionImpl.prototype, "protocolVersion", {
        get: function () {
            return this._settings.protocolVersion || 1;
        },
        enumerable: true,
        configurable: true
    });
    ConnectionImpl.prototype.toAPI = function () {
        var that = this;
        return {
            send: that.send.bind(that),
            on: that.on.bind(that),
            off: that.off.bind(that),
            login: that.login.bind(that),
            logout: that.logout.bind(that),
            loggedIn: that.loggedIn.bind(that),
            connected: that.connected.bind(that),
            disconnected: that.disconnected.bind(that),
            get protocolVersion() {
                return that.protocolVersion;
            }
        };
    };
    ConnectionImpl.prototype.distributeMessage = function (message, type) {
        // Retrieve handlers for the message type
        var handlers = this.messageHandlers[type.toLowerCase()];
        if (handlers !== undefined) {
            // Execute them
            Object.keys(handlers).forEach(function (handlerId) {
                var handler = handlers[handlerId];
                if (handler !== undefined) {
                    handler(message);
                }
            });
        }
    };
    ConnectionImpl.prototype.handleConnectionChanged = function (connected) {
        if (this._connected === connected) {
            return;
        }
        this._connected = connected;
        if (connected) {
            this.registry.execute("connected");
        }
        else {
            this.registry.execute("disconnected");
        }
    };
    ConnectionImpl.prototype.handleTransportMessage = function (msg) {
        var msgObj;
        if (typeof msg === "string") {
            msgObj = this._protocol.processStringMessage(msg);
        }
        else {
            msgObj = this._protocol.processObjectMessage(msg);
        }
        this.distributeMessage(msgObj.msg, msgObj.msgType);
    };
    return ConnectionImpl;
}());
exports.default = ConnectionImpl;
//# sourceMappingURL=connection.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(79);
var main_2 = __webpack_require__(51);
var main_3 = __webpack_require__(64);
var main_4 = __webpack_require__(31);
var config_1 = __webpack_require__(48);
var dummyConnection_1 = __webpack_require__(61);
var timer_1 = __webpack_require__(82);
var GlueCore = function (userConfig, ext) {
    var hc;
    var glue42gd;
    if (typeof window !== "undefined") {
        hc = window.htmlContainer;
        glue42gd = window.glue42gd;
    }
    var glueInitTimer = timer_1.default();
    userConfig = userConfig || {};
    ext = ext || {};
    var internalConfig = config_1.default(userConfig, ext, hc, glue42gd);
    // Init the GLUE namespace
    var _connection;
    var _agm;
    var _logger;
    var _rootMetrics;
    var _metrics;
    var libs = {};
    function registerLib(name, inner, t) {
        inner.initStartTime = t.startTime;
        if (inner.ready) {
            inner.ready().then(function () {
                inner.initTime = t.stop();
                inner.initEndTime = t.endTime;
            });
        }
        else {
            inner.initTime = t.stop();
            inner.initEndTime = t.endTime;
        }
        libs[name] = inner;
        GlueCore[name] = inner;
    }
    function setupConnection() {
        var initTimer = timer_1.default();
        internalConfig.connection.logger = _logger.subLogger("connection");
        _connection = main_2.default(internalConfig.connection);
        var authPromise = Promise.resolve(internalConfig.auth);
        // no auth - what we do in different protocol versions
        if (internalConfig.connection && !internalConfig.auth) {
            var protocolVersion = internalConfig.connection.protocolVersion;
            // v1 or no protocol version - we don't need auth in that case
            if (!protocolVersion || protocolVersion === 1) {
                registerLib("connection", _connection, initTimer);
                return Promise.resolve({});
            }
            // v2 requires auth
            if (protocolVersion === 2) {
                return Promise.reject("You need to provide auth information");
            }
            // v3 if running in gd pull off gw token. If not in gd reject
            if (protocolVersion === 3) {
                if (glue42gd) {
                    authPromise = glue42gd.getGWToken().then(function (token) {
                        return {
                            gatewayToken: token
                        };
                    });
                }
                else {
                    return Promise.reject("You need to provide auth information");
                }
            }
        }
        return authPromise
            .then(function (authConfig) {
            // convert the authConfig to AuthRequest object
            var authRequest;
            if (typeof authConfig === "string" || typeof authConfig === "number") {
                authRequest = {
                    token: authConfig
                };
            }
            else if (Object.prototype.toString.call(authConfig) === "[object Object]") {
                authRequest = authConfig;
            }
            else {
                throw new Error("Invalid auth object - " + JSON.stringify(authConfig));
            }
            return authRequest;
        })
            .then(function (authRequest) {
            // do the login
            return _connection.login(authRequest);
        })
            .then(function (identity) {
            if (identity) {
                if (identity.machine) {
                    internalConfig.agm.instance.machine = identity.machine;
                }
                if (identity.user) {
                    internalConfig.agm.instance.user = identity.user;
                }
            }
            registerLib("connection", _connection, initTimer);
            return internalConfig;
        });
    }
    function setupLogger() {
        // Logger
        var initTimer = timer_1.default();
        var loggerConfig = {
            identity: internalConfig.identity,
            getConnection: function () {
                return _connection || dummyConnection_1.default;
            },
            publish: internalConfig.logger.publish || "off",
            console: internalConfig.logger.console || "info",
            metrics: (internalConfig.metrics && internalConfig.logger.metrics) || "off"
        };
        _logger = main_3.default(loggerConfig);
        registerLib("logger", _logger, initTimer);
        return Promise.resolve(undefined);
    }
    function setupMetrics() {
        if (internalConfig.metrics) {
            var initTimer = timer_1.default();
            _rootMetrics = main_1.default({
                identity: internalConfig.metrics.identity,
                connection: internalConfig.metrics ? _connection : dummyConnection_1.default,
                logger: _logger.subLogger("metrics")
            });
            _metrics = _rootMetrics.subSystem("App");
            // Creating subsystem for reporting and feature metric
            var reportingSystem_1 = _metrics.subSystem("reporting");
            var def_1 = {
                name: "features",
                conflation: 1 /* TickByTick */,
            };
            var _featureMetric_1;
            _metrics.featureMetric = function (name, action, payload) {
                if (typeof name === "undefined" || name === "") {
                    throw new Error("name is mandatory");
                }
                else if (typeof action === "undefined" || action === "") {
                    throw new Error("action is mandatory");
                }
                else if (typeof payload === "undefined" || payload === "") {
                    throw new Error("payload is mandatory");
                }
                if (!_featureMetric_1) {
                    _featureMetric_1 = reportingSystem_1.objectMetric(def_1, { name: name, action: action, payload: payload });
                }
                else {
                    _featureMetric_1.update({
                        name: name,
                        action: action,
                        payload: payload
                    });
                }
            };
            _logger.metricsLevel("warn", _metrics.parent.subSystem("LogEvents"));
            registerLib("metrics", _metrics, initTimer);
        }
        return Promise.resolve(undefined);
    }
    function setupAGM() {
        var initTimer = timer_1.default();
        // AGM
        var agmConfig = {
            instance: internalConfig.agm.instance,
            connection: _connection,
            logger: _logger.subLogger("agm"),
            metrics: undefined,
            forceGW: internalConfig.connection && internalConfig.connection.force
        };
        if (internalConfig.metrics) {
            agmConfig.metrics = _rootMetrics.subSystem("AGM");
        }
        return new Promise(function (resolve, reject) {
            main_4.default(agmConfig)
                .then(function (agmLib) {
                _agm = agmLib;
                registerLib("agm", _agm, initTimer);
                resolve(internalConfig);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    }
    function setupExternalLibs(externalLibs) {
        try {
            externalLibs.forEach(function (lib) {
                setupExternalLib(lib.name, lib.create);
            });
            return Promise.resolve();
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    function setupExternalLib(name, createCallback) {
        var initTimer = timer_1.default();
        var lib = createCallback(libs);
        if (lib) {
            registerLib(name, lib, initTimer);
        }
    }
    function waitForLibs() {
        // get all libs that have ready promises and wait for these to be ready
        var libsReadyPromises = Object.keys(libs).map(function (key) {
            var lib = libs[key];
            return lib.ready ?
                lib.ready() : Promise.resolve();
        });
        return Promise.all(libsReadyPromises);
    }
    function constructGlueObject() {
        var feedbackFunc = function () {
            if (!_agm) {
                return;
            }
            _agm.invoke("T42.ACS.Feedback", {}, "best");
        };
        var info = { glueVersion: internalConfig.version };
        glueInitTimer.stop();
        var glue = {
            feedback: feedbackFunc,
            info: info,
            version: internalConfig.version,
            userConfig: userConfig
        };
        // ver performance
        glue.performance = {
            get browser() {
                return window.performance.timing.toJSON();
            },
            get memory() {
                return window.performance.memory;
            },
            get initTimes() {
                var result = Object.keys(glue)
                    .filter(function (key) {
                    if (key === "initTimes") {
                        return false;
                    }
                    return glue[key].initTime;
                })
                    .map(function (key) {
                    return {
                        name: key,
                        time: glue[key].initTime,
                        startTime: glue[key].initStartTime,
                        endTime: glue[key].initEndTime
                    };
                });
                // add glue
                result.push({
                    name: "glue",
                    startTime: glueInitTimer.startTime,
                    endTime: glueInitTimer.endTime,
                    time: glueInitTimer.period
                });
                return result;
            }
        };
        // attach each lib to glue && attach versions to info object
        Object.keys(libs).forEach(function (key) {
            var lib = libs[key];
            glue[key] = lib;
            info[key] = lib.version;
        });
        // push perf data to hc if needed
        if (hc && hc.perfDataNeeded && hc.updatePerfData) {
            var delay = hc.perfDataDelay || 100;
            setTimeout(function () {
                hc.updatePerfData(glue.performance);
            }, delay);
        }
        // construct the config object to be exposed to end user
        // transfer config keys from internalConfig and then ext
        glue.config = {};
        if (ext.enrichGlue) {
            ext.enrichGlue(glue);
        }
        Object.keys(internalConfig).forEach(function (k) {
            glue.config[k] = internalConfig[k];
        });
        if (ext.extOptions) {
            Object.keys(ext.extOptions).forEach(function (k) {
                glue.config[k] = ext.extOptions[k];
            });
        }
        return glue;
    }
    return setupLogger()
        .then(setupConnection)
        .then(setupMetrics)
        .then(setupAGM)
        .then(function () {
        return setupExternalLibs(internalConfig.libs || []);
    })
        .then(waitForLibs)
        .then(constructGlueObject)
        .catch(function (err) {
        // if there is some some error include the libs object for debugging purposes
        return Promise.reject({
            err: err,
            libs: libs
        });
    });
};
exports.default = GlueCore;
//# sourceMappingURL=glue.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"name":"tick42-glue-core","version":"3.13.1","description":"Glue42 core library including logger, connection, agm and metrics","main":"./dist/node/tick42-glue-core.js","types":"./glue.d.ts","browser":"./dist/web/tick42-glue-core.js","scripts":{"init-dev-mode":"node ./build/scripts/init-dev-mode.js","remove-installed-dependencies":"node ./build/scripts/remove-installed-dependencies.js","clean":"node ./build/scripts/clean.js","pre:build":"npm run clean && npm run tslint && tsc && set NODE_ENV=development","file-versionify":"node ./build/scripts/file-versionify.js","tslint":"tslint -t codeFrame ./src/**.ts","tslint:fix":"tslint -t codeFrame --fix ./src/**.ts","watch":"onchange ./src/**/*.ts -- npm run build:dev","build:dev":"npm run pre:build && set NODE_ENV=development && webpack && npm run file-versionify","build:prod":"npm run pre:build && set NODE_ENV=development && webpack && set NODE_ENV=production && webpack && npm run file-versionify","docs":"typedoc --options typedoc.json ./src","prepublish":"npm run build:prod && npm run test:only","test":"npm run build:dev && npm run test:only","test:only":"mocha ./tests/ --recursive","test:core":"mocha ./tests/core","test:agm":"mocha ./tests/agm"},"repository":{"type":"git","url":"https://stash.tick42.com/scm/tg/js-glue-core.git"},"author":{"name":"Tick42","url":"http://www.glue42.com"},"license":"ISC","dependencies":{"callback-registry":"^2.3.1","es6-promise":"^4.1.0","shortid":"^2.2.6","util-deprecate":"^1.0.2","ws":"^0.7.2"},"devDependencies":{"@types/shortid":"0.0.29","archiver":"^1.3.0","babel-core":"^6.25.0","babel-loader":"^6.4.1","babel-plugin-add-module-exports":"^0.2.1","babel-preset-es2015":"^6.16.0","babel-preset-stage-2":"^6.22.0","chai":"^4.0.2","deep-equal":"^1.0.1","mocha":"^2.5.3","onchange":"3.*","pre-commit":"^1.1.3","readline-sync":"^1.4.5","shelljs":"^0.6.0","tick42-gateway":"^0.2.2","tick42-webpack-config":"4.1.6","tslint":"^5.4.3","typedoc":"^0.5.10","typescript":"^2.6.2","webpack":"2.3.3"}}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(10);
var alphabet = __webpack_require__(5);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(5);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(5);
var encode = __webpack_require__(10);
var decode = __webpack_require__(16);
var build = __webpack_require__(15);
var isValid = __webpack_require__(18);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(21) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(5);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 22 */
/***/ (function(module, exports) {


/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __webpack_require__(24);
var server_1 = __webpack_require__(45);
var AGMImpl = /** @class */ (function () {
    function AGMImpl(protocol, clientRepository, serverRepository, instance, configuration) {
        this.protocol = protocol;
        this.clientRepository = clientRepository;
        this.serverRepository = serverRepository;
        this.instance = instance;
        this.configuration = configuration;
        this.client = new client_1.default(protocol, clientRepository, instance, configuration);
        this.server = new server_1.default(protocol, serverRepository, instance, configuration);
    }
    AGMImpl.prototype.serverRemoved = function (callback) {
        return this.client.serverRemoved(callback);
    };
    AGMImpl.prototype.serverAdded = function (callback) {
        return this.client.serverAdded(callback);
    };
    AGMImpl.prototype.serverMethodRemoved = function (callback) {
        return this.client.serverMethodRemoved(callback);
    };
    AGMImpl.prototype.serverMethodAdded = function (callback) {
        return this.client.serverMethodAdded(callback);
    };
    AGMImpl.prototype.methodRemoved = function (callback) {
        return this.client.methodRemoved(callback);
    };
    AGMImpl.prototype.methodAdded = function (callback) {
        return this.client.methodAdded(callback);
    };
    AGMImpl.prototype.methodsForInstance = function (instance) {
        return this.client.methodsForInstance(instance);
    };
    AGMImpl.prototype.methods = function (methodFilter) {
        return this.client.methods(methodFilter);
    };
    AGMImpl.prototype.servers = function (methodFilter) {
        return this.client.servers(methodFilter);
    };
    AGMImpl.prototype.subscribe = function (method, options, successCallback, errorCallback) {
        return this.client.subscribe(method, options, successCallback, errorCallback);
    };
    AGMImpl.prototype.createStream = function (streamDef, callbacks, successCallback, errorCallback) {
        return this.server.createStream(streamDef, callbacks, successCallback, errorCallback);
    };
    AGMImpl.prototype.unregister = function (methodFilter) {
        return this.server.unregister(methodFilter);
    };
    AGMImpl.prototype.registerAsync = function (methodDefinition, callback) {
        return this.server.registerAsync(methodDefinition, callback);
    };
    AGMImpl.prototype.register = function (methodDefinition, callback) {
        return this.server.register(methodDefinition, callback);
    };
    AGMImpl.prototype.invoke = function (methodFilter, argumentObj, target, additionalOptions, success, error) {
        return this.client.invoke(methodFilter, argumentObj, target, additionalOptions, success, error);
    };
    AGMImpl.prototype.updateInstance = function (newInstance) {
        if (this.instance.machine === undefined) {
            this.instance.machine = newInstance.MachineName || newInstance.machine;
        }
        if (this.instance.user === undefined) {
            this.instance.user = newInstance.UserName || newInstance.user;
        }
        if (this.instance.environment === undefined) {
            this.instance.environment = newInstance.Environment || newInstance.environment;
        }
        if (this.instance.region === undefined) {
            this.instance.region = newInstance.Region || newInstance.region;
        }
    };
    return AGMImpl;
}());
exports.default = AGMImpl;
//# sourceMappingURL=agm.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
  The AGM Client analyses server presences, collects information about their methods and allows users to invoke these methods.
 */
var invoke_1 = __webpack_require__(25);
var promisify_1 = __webpack_require__(8);
var Client = /** @class */ (function () {
    function Client(protocol, repo, instance, configuration) {
        this.protocol = protocol;
        this.repo = repo;
        this.instance = instance;
        this.configuration = configuration;
        // Instantiate the module that handles method execution and responses
        this.clientInvocations = new invoke_1.default(protocol);
    }
    /**
     * Subscribes to an AGM streaming method
     */
    Client.prototype.subscribe = function (method, options, successCallback, errorCallback) {
        // options can have arguments:{}, target: 'best'/'all'/{server_instance}, waitTimeoutMs:3000
        var _this = this;
        var callProtocolSubscribe = function (targetServers, stream, successProxy, errorProxy) {
            _this.protocol.client.subscribe(stream, options.arguments, targetServers, { methodResponseTimeout: options.waitTimeoutMs }, successProxy, errorProxy);
        };
        var promise = new Promise(function (resolve, reject) {
            var successProxy = function (sub) {
                resolve(sub);
            };
            var errorProxy = function (err) {
                reject(err);
            };
            var methodDef;
            if (typeof method === "string") {
                methodDef = { name: method };
            }
            else {
                methodDef = method;
            }
            if (options === undefined) {
                options = {};
            }
            var target = options.target;
            if (target === undefined) {
                target = "best";
            }
            if (typeof target === "string" && target !== "all" && target !== "best") {
                reject({ message: '"' + target + '" is not a valid target. Valid targets are "all", "best", or an instance.' });
            }
            if (options.methodResponseTimeout === undefined) {
                // legacy support
                options.methodResponseTimeout = options.method_response_timeout;
                if (options.methodResponseTimeout === undefined) {
                    // fallback to default
                    options.methodResponseTimeout = _this.configuration.methodResponseTimeout;
                }
            }
            if (options.waitTimeoutMs === undefined) {
                // legacy support
                options.waitTimeoutMs = options.wait_for_method_timeout;
                if (options.waitTimeoutMs === undefined) {
                    // fallback to default
                    options.waitTimeoutMs = _this.configuration.waitTimeoutMs;
                }
            }
            var delayStep = 500;
            var delayTillNow = 0;
            // don't check if the method is streaming or not, subscribing to non-streaming method has to invoke it
            // get all servers that have method(s) matching the filter
            var currentServers = _this.getServerMethodsByFilterAndTarget(methodDef, target);
            if (currentServers.length > 0) {
                callProtocolSubscribe(currentServers, currentServers[0].methods[0], successProxy, errorProxy);
            }
            else {
                var retry_1 = function () {
                    delayTillNow += delayStep;
                    // get all servers that have method(s) matching the filter
                    currentServers = _this.getServerMethodsByFilterAndTarget(methodDef, target);
                    if (currentServers.length > 0) {
                        var streamInfo = currentServers[0].methods[0];
                        callProtocolSubscribe(currentServers, streamInfo, successProxy, errorProxy);
                    }
                    else if (delayTillNow >= options.waitTimeoutMs) {
                        var def = typeof method === "string" ? { name: method } : method;
                        var info = {
                            id: undefined,
                            info: def,
                            getInfoForUser: function () {
                                return methodDef;
                            },
                            protocolState: undefined,
                        };
                        callProtocolSubscribe(currentServers, info, successProxy, errorProxy);
                    }
                    else {
                        setTimeout(retry_1, delayStep);
                    }
                };
                setTimeout(retry_1, delayStep);
            }
        });
        return promisify_1.default(promise, successCallback, errorCallback);
    };
    /**
     * Returns all servers. If methodFilter is specified will return a list of servers
     * having a method matching the filter.
     */
    Client.prototype.servers = function (methodFilter) {
        return this.getServers(methodFilter).map(function (serverMethodMap) {
            return serverMethodMap.server.getInfoForUser();
        });
    };
    /**
     * Returns all methods that match the given filter. If no filter specified returns all methods.
     */
    Client.prototype.methods = function (methodFilter) {
        return this.getMethods(methodFilter).map(function (m) {
            return m.getInfoForUser();
        });
    };
    /**
     * Returns all agm method registered by some server
     */
    Client.prototype.methodsForInstance = function (instance) {
        return this.getMethodsForInstance(instance).map(function (m) {
            return m.getInfoForUser();
        });
    };
    /**
     * Called when a method is added for the first time by any application
     */
    Client.prototype.methodAdded = function (callback) {
        return this.repo.onMethodAdded(function (method) {
            callback(method.getInfoForUser());
        });
    };
    /**
     * Called when a method is removed from the last application offering it
     * @function methodRemoved
     * @param {MethodCallback} callback
     */
    Client.prototype.methodRemoved = function (callback) {
        return this.repo.onMethodRemoved(function (method) {
            callback(method.getInfoForUser());
        });
    };
    /**
     * Called when an application offering methods (server) is discovered
     * @param {InstanceCallback} callback Callback that will be invoked with the {@link Instance} of the new sever
     */
    Client.prototype.serverAdded = function (callback) {
        return this.repo.onServerAdded(function (server) {
            callback(server.getInfoForUser());
        });
    };
    /**
     * Called when an app offering methods stops offering them or exits
     * @param {InstanceCallback} callback Callback that will be invoked with the {@link Instance} of the removed server
     */
    Client.prototype.serverRemoved = function (callback) {
        return this.repo.onServerRemoved(function (server, reason) {
            callback(server.getInfoForUser(), reason);
        });
    };
    /**
     * Called when a method is offered by an application. This will be called for each server offering the method
     * where {@link methodAdded} will be called only for the first time the method is registered.
     *
     * @param {ServerMethodCallback} callback
     */
    Client.prototype.serverMethodAdded = function (callback) {
        return this.repo.onServerMethodAdded(function (server, method) {
            callback({ server: server.getInfoForUser(), method: method.getInfoForUser() });
        });
    };
    /**
     * Called when a server stops offering a method
     * @param {ServerMethodCallback} callback
     */
    Client.prototype.serverMethodRemoved = function (callback) {
        return this.repo.onServerMethodRemoved(function (server, method) {
            callback({ server: server.getInfoForUser(), method: method.getInfoForUser() });
        });
    };
    /**
     * Invokes an AGM method
     * @param {MethodDefinition} methodFilter Method to invoke
     * @param {Object} argumentObj Arguments for the invocation
     * @param {Instance|Instance[]|string} [target] Defines which server(s) to target with the invocation - can be one of:
     * * ’best' - executes the method on the best (or first) server
     * * 'all' - executes the method on all servers offering it
     * * AGM instance (or a subset, used for filtering), e.g. { application: 'appName' }
     * * an array of AGM instances/filters
     * @param {InvocationOptions} [additionalOptions] Additional options for the invocation
     * @param {function} [success] - (use this if you prefer callback style instead of promises)
     * Callback that will be called with {@link InvocationResult} object when the invocation is successful
     * @param {function} [error] -  (use this if you prefer callback style instead of promises)
     * Callback that will be called with {@link InvocationError} object when the invocation is not successful
     * @returns {Promise<InvocationResult>}
     * @example
     * glue.agm.invoke(
     *   'Sum',
     *   { a: 37, b: 5 }) // everything else is optional
     *   .then(
     *      function(result) {
     *      console.log('37 + 5 = ' + result.returned.answer)
     *   })
     *   .catch(
     *      function(err) {
     *      console.error('Failed to execute Sum' + err.message)
     *   })
     */
    Client.prototype.invoke = function (methodFilter, argumentObj, target, additionalOptions, success, error) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var successProxy = function (args) {
                // var parsed = JSON.parse(args);
                resolve(args);
            };
            var errorProxy = function (err) {
                // var parsed = JSON.parse(args);
                reject(err);
            };
            // Add default params
            if (!argumentObj) {
                argumentObj = {};
            }
            if (!target) {
                target = "best";
            }
            if (typeof target === "string" && target !== "all" && target !== "best") {
                reject({ message: '"' + target + '" is not a valid target. Valid targets are "all" and "best".' });
            }
            if (!additionalOptions) {
                additionalOptions = {};
            }
            if (additionalOptions.methodResponseTimeoutMs === undefined) {
                // legacy support
                additionalOptions.methodResponseTimeoutMs = additionalOptions.method_response_timeout;
                if (additionalOptions.methodResponseTimeoutMs === undefined) {
                    // fallback to default
                    additionalOptions.methodResponseTimeoutMs = _this.configuration.methodResponseTimeout;
                }
            }
            if (additionalOptions.waitTimeoutMs === undefined) {
                // legacy support
                additionalOptions.waitTimeoutMs = additionalOptions.wait_for_method_timeout;
                if (additionalOptions.waitTimeoutMs === undefined) {
                    // fallback to default
                    additionalOptions.waitTimeoutMs = _this.configuration.waitTimeoutMs;
                }
            }
            if (additionalOptions.waitTimeoutMs !== undefined && typeof additionalOptions.waitTimeoutMs !== "number") {
                reject({ message: '"' + additionalOptions.waitTimeoutMs + '" is not a valid number for \'waitTimeoutMs\'' });
                return;
            }
            // Check if the arguments are an object
            if (typeof argumentObj !== "object") {
                reject({ message: "The method arguments must be an object." });
                return;
            }
            if (typeof methodFilter === "string") {
                methodFilter = { name: methodFilter };
            }
            var serversMethodMap = _this.getServerMethodsByFilterAndTarget(methodFilter, target);
            if (serversMethodMap.length === 0) {
                _this.invokeUnExisting(methodFilter, argumentObj, target, additionalOptions, successProxy, errorProxy);
            }
            else if (serversMethodMap.length === 1) {
                var serverMethodPair = serversMethodMap[0];
                _this.clientInvocations.invoke(serverMethodPair.methods[0], argumentObj, serverMethodPair.server, additionalOptions, successProxy, errorProxy);
            }
            else {
                _this.invokeOnAll(serversMethodMap, argumentObj, additionalOptions, successProxy, errorProxy);
            }
        });
        return promisify_1.default(promise, success, error);
    };
    /**
     * Called when the user tries to invoke a method which does not exist
     */
    Client.prototype.invokeUnExisting = function (methodFilter, argumentObj, target, additionalOptions, success, error) {
        var _this = this;
        var callError = function () {
            error({
                method: methodFilter,
                called_with: argumentObj,
                message: "Can not find a method matching " + JSON.stringify(methodFilter) + " with server filter " + JSON.stringify(target),
                executed_by: undefined,
                returned: undefined,
                status: undefined,
            });
        };
        if (additionalOptions.waitTimeoutMs === 0) {
            callError();
        }
        else {
            var delayStep_1 = 500;
            var delayTillNow_1 = 0;
            var retry_2 = function () {
                delayTillNow_1 += delayStep_1;
                // get all servers that have method(s) matching the filter
                var serversMethodMap = _this.getServerMethodsByFilterAndTarget(methodFilter, target);
                if (serversMethodMap.length > 0) {
                    _this.invoke(methodFilter, argumentObj, target, additionalOptions, success, error);
                }
                else if (delayTillNow_1 >= additionalOptions.waitTimeoutMs) {
                    callError();
                }
                else {
                    setTimeout(retry_2, delayStep_1);
                }
            };
            setTimeout(retry_2, delayStep_1);
        }
    };
    /**
     * Calls a method for all servers and unifies the results they return into one:
     */
    Client.prototype.invokeOnAll = function (serverMethodsMap, argumentObj, additionalOptions, success, error) {
        var _this = this;
        // Here we will store the results that the getServers return
        var successes = [];
        var errors = [];
        // These are the callbacks
        var successCallback = function (result) {
            successes.push(result);
            sendResponse();
        };
        var errorCallback = function (err) {
            errors.push(err);
            sendResponse();
        };
        // Calls the main success and error callbacks with the aggregated results
        var sendResponse = function () {
            // wait till everybody is finished
            if (successes.length + errors.length < serverMethodsMap.length) {
                return;
            }
            // Execute the "success" callback
            if (successes.length !== 0) {
                var result_1 = successes.reduce(function (obj, invResult) {
                    obj.method = invResult.method;
                    obj.called_with = invResult.called_with;
                    obj.returned = invResult.returned;
                    obj.all_return_values.push({
                        executed_by: invResult.executed_by,
                        returned: invResult.returned,
                        called_with: invResult.called_with,
                        method: invResult.method,
                        message: undefined,
                        status: undefined,
                    });
                    obj.executed_by = invResult.executed_by;
                    return obj;
                }, { all_return_values: [] });
                // If we get errors from one of the getServers add them to the success object that will be resolved.
                if (errors.length !== 0) {
                    result_1.all_errors = [];
                    errors.forEach(function (obj) {
                        result_1.all_errors.push({
                            // executed_by : obj.executed_by, // we don't get executed_by object from the error clientInvocations
                            name: obj.method.name,
                            message: obj.message,
                        });
                    });
                }
                success(result_1);
            }
            else if (errors.length !== 0) {
                error(errors.reduce(function (obj, currentError) {
                    obj.method = currentError.method;
                    obj.called_with = currentError.called_with;
                    obj.message = currentError.message;
                    obj.all_errors.push({
                        executed_by: currentError.executed_by,
                        message: currentError.message,
                    });
                    // obj.executed_by = success.executed_by;
                    return obj;
                }, { all_errors: [] }));
            }
        };
        // Call the method for all targets
        serverMethodsMap.forEach(function (serverMethodsPair) {
            _this.clientInvocations.invoke(serverMethodsPair.methods[0], argumentObj, serverMethodsPair.server, additionalOptions, successCallback, errorCallback);
        });
    };
    /**
     * Filters an array of servers and returns the ones which match the target criteria
     */
    Client.prototype.filterByTarget = function (target, serverMethodMap) {
        var _this = this;
        // If the user specified target as string:
        var targetServerMethod = [];
        if (typeof target === "string") {
            if (target === "all") {
                targetServerMethod = serverMethodMap;
            }
            else if (target === "best") {
                // check if there is a server with the same machine as us
                var matchingMachine = serverMethodMap.filter(function (serverMethodPair) {
                    var serverInfo = serverMethodPair.server.info;
                    return serverInfo.machine === _this.instance.machine;
                })[0];
                if (matchingMachine) {
                    return [matchingMachine];
                }
                targetServerMethod = serverMethodMap[0] !== undefined ? [serverMethodMap[0]] : []; // If the user specified the target as server filter
            }
        }
        else {
            if (!Array.isArray(target)) {
                target = [target];
            }
            if (Array.isArray(target)) {
                // Retrieve all getServers that match the filters
                targetServerMethod = target.reduce(function (matches, filter) {
                    // Add matches for each filter
                    var myMatches = serverMethodMap.filter(function (serverMethodPair) {
                        return _this.instanceMatch(filter, serverMethodPair.server.info);
                    });
                    return matches.concat(myMatches);
                }, []);
            }
        }
        return targetServerMethod;
    };
    /**
     * Matches a server definition against a server filter
     */
    Client.prototype.instanceMatch = function (instanceFilter, instanceDefinition) {
        return this.containsProps(instanceFilter, instanceDefinition);
    };
    /**
     * Matches a method definition against a method filter
     */
    Client.prototype.methodMatch = function (methodFilter, methodDefinition) {
        return this.containsProps(methodFilter, methodDefinition);
    };
    /**
     * Checks if all properties of filter match properties in object
     */
    Client.prototype.containsProps = function (filter, object) {
        return Object.keys(filter).reduce(function (match, prop) {
            // ignore undefined properties and functions
            if (!filter[prop] || typeof filter[prop] === "function") {
                return match;
            }
            if (filter[prop].constructor === RegExp) {
                if (!filter[prop].test(object[prop])) {
                    return false;
                }
                else {
                    return match;
                }
            }
            else {
                if (String(filter[prop]).toLowerCase() !== String(object[prop]).toLowerCase()) {
                    return false;
                }
                else {
                    return match;
                }
            }
        }, true);
    };
    Client.prototype.getMethods = function (methodFilter) {
        var _this = this;
        if (methodFilter === undefined) {
            return this.repo.getMethods();
        }
        if (typeof methodFilter === "string") {
            methodFilter = { name: methodFilter };
        }
        return this.repo.getMethods().filter(function (method) {
            return _this.methodMatch(methodFilter, method.info);
        });
    };
    Client.prototype.getMethodsForInstance = function (instanceFilter) {
        var _this = this;
        var allServers = this.repo.getServers();
        var matchingServers = allServers.filter(function (server) {
            return _this.instanceMatch(instanceFilter, server.info);
        });
        if (matchingServers.length === 0) {
            return [];
        }
        var resultMethodsObject = {};
        if (matchingServers.length === 1) {
            resultMethodsObject = matchingServers[0].methods;
        }
        else {
            // we have more than one server matching, join all methods
            matchingServers.forEach(function (server) {
                Object.keys(server.methods).forEach(function (methodKey) {
                    var method = server.methods[methodKey];
                    resultMethodsObject[method.id] = method;
                });
            });
        }
        // transform the object to array
        return Object.keys(resultMethodsObject)
            .map(function (key) {
            return resultMethodsObject[key];
        });
    };
    Client.prototype.getServers = function (methodFilter) {
        var _this = this;
        var servers = this.repo.getServers();
        // No method - get all getServers
        if (methodFilter === undefined) {
            return servers.map(function (server) {
                return { server: server };
            });
        }
        // Non-existing method - return an empty array
        var methods = this.getMethods(methodFilter);
        if (methods === undefined) {
            return [];
        }
        return servers.reduce(function (prev, current) {
            var methodsForServer = _this.repo.getServerMethodsById(current.id);
            var matchingMethods = methodsForServer.filter(function (method) {
                return _this.methodMatch(methodFilter, method.info);
            });
            if (matchingMethods.length > 0) {
                prev.push({ server: current, methods: matchingMethods });
            }
            return prev;
        }, []);
    };
    /**
     * Returns an array of server-methods pairs for all servers that match the target and have at lease one method matching the method filter
     */
    Client.prototype.getServerMethodsByFilterAndTarget = function (methodFilter, target) {
        // get all servers that have method(s) matching the filter
        var serversMethodMap = this.getServers(methodFilter);
        // filter the server-method map by target
        return this.filterByTarget(target, serversMethodMap);
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=client.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This module handles AGM method invocations - validating
 * inputs and delegating to protocol
 */
var random_1 = __webpack_require__(4);
var ClientInvocations = /** @class */ (function () {
    function ClientInvocations(_protocol) {
        var _this = this;
        this._protocol = _protocol;
        /** Store pending callback */
        this._pendingCallbacks = {};
        // subscribe for invocation results
        _protocol.client.onInvocationResult(function (invocationId, executedBy, status, result, resultMessage) { return _this.processInvocationResult(invocationId, executedBy, status, result, resultMessage); });
    }
    /**
     * Invokes an AGM method to a single AGM server, given valid input.
     */
    ClientInvocations.prototype.invoke = function (method, argumentsObj, target, stuff, success, error) {
        // Generate a unique invocation ID, for this invocation
        var invocationId = random_1.default();
        // Register the user's callbacks
        this.registerInvocation(invocationId, {
            method: method,
            calledWith: argumentsObj,
        }, success, error, stuff.methodResponseTimeoutMs);
        this._protocol.client.invoke(invocationId, method, argumentsObj, target, stuff);
    };
    /**
     * Register invocation so we can find it later when invocation result is received
     */
    ClientInvocations.prototype.registerInvocation = function (invocationId, invocationInfo, success, error, timeout) {
        var _this = this;
        // Adds the callbacks
        this._pendingCallbacks[invocationId] = { invocationInfo: invocationInfo, success: success, error: error };
        // Schedules to throw a timeout if nobody answers
        setTimeout(function () {
            if (_this._pendingCallbacks[invocationId] === undefined) {
                return;
            }
            error({
                method: invocationInfo.method.getInfoForUser(),
                called_with: invocationInfo.calledWith,
                executed_by: undefined,
                status: undefined,
                returned: undefined,
                message: "Invocation timeout (" + timeout + " ms) reached",
            });
            delete _this._pendingCallbacks[invocationId];
        }, timeout);
    };
    /**
     * Process invocation result received from protocol
     */
    ClientInvocations.prototype.processInvocationResult = function (invocationId, executedBy, status, result, resultMessage) {
        // Finds the appropriate callback
        var callback = this._pendingCallbacks[invocationId];
        if (callback === undefined) {
            return;
        }
        // If the server returned success, execute the success callback
        if (status === 0 && typeof callback.success === "function") {
            // Execute the success callback
            callback.success({
                method: callback.invocationInfo.method.getInfoForUser(),
                called_with: callback.invocationInfo.calledWith,
                executed_by: executedBy,
                returned: result,
                message: resultMessage,
                status: status,
            });
            // Else, return an error
        }
        else if (typeof callback.error === "function") {
            callback.error({
                method: callback.invocationInfo.method.getInfoForUser(),
                called_with: callback.invocationInfo.calledWith,
                executed_by: executedBy,
                message: resultMessage,
                // log_details: message.ResultLogDetails,
                status: status,
                returned: result,
            });
        }
        // Finally, remove the callbacks
        delete this._pendingCallbacks[invocationId];
    };
    return ClientInvocations;
}());
exports.default = ClientInvocations;
//# sourceMappingURL=invoke.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Repository holding servers and methods visible by this peer including those created by the peer itself.
 */
var callback_registry_1 = __webpack_require__(0);
var ClientRepository = /** @class */ (function () {
    function ClientRepository() {
        // each server has format {id:'', info:{}, methods:{}}
        // where methods has format {id:'', info:{}}
        this.servers = {};
        // object keyed by method id - value is number of servers that offer that method
        this.methodsCount = {};
        // store for callbacks
        this.callbacks = callback_registry_1.default();
    }
    // add a new server to internal collection
    ClientRepository.prototype.addServer = function (info, serverId) {
        var _this = this;
        var current = this.servers[serverId];
        if (current) {
            return current.id;
        }
        var serverEntry = {
            id: serverId,
            info: info,
            methods: {},
            getInfoForUser: function () {
                var serverInfo = _this.createUserServerInfo(serverEntry.info);
                serverInfo.getMethods = function () {
                    return _this.getServerMethodsById(serverEntry.id).map(function (m) {
                        return m.getInfoForUser();
                    });
                };
                serverInfo.getStreams = function () {
                    return _this.getServerMethodsById(serverEntry.id)
                        .filter(function (method) {
                        return method.info.supportsStreaming;
                    })
                        .map(function (m) {
                        return m.getInfoForUser();
                    });
                };
                return serverInfo;
            },
        };
        this.servers[serverId] = serverEntry;
        this.callbacks.execute("onServerAdded", serverEntry);
        return serverId;
    };
    ClientRepository.prototype.removeServerById = function (id, reason) {
        var _this = this;
        var server = this.servers[id];
        Object.keys(server.methods).forEach(function (methodId) {
            _this.removeServerMethod(id, methodId);
        });
        delete this.servers[id];
        this.callbacks.execute("onServerRemoved", server, reason);
    };
    ClientRepository.prototype.addServerMethod = function (serverId, method, protocolState) {
        if (!protocolState) {
            protocolState = {};
        }
        var server = this.servers[serverId];
        if (!server) {
            throw new Error("server does not exists");
        }
        var methodId = this.createMethodId(method);
        // server already has that method
        if (server.methods[methodId]) {
            return;
        }
        var that = this;
        var methodEntity = {
            id: methodId,
            info: method,
            getInfoForUser: function () {
                var result = that.createUserMethodInfo(methodEntity.info);
                result.getServers = function () {
                    return that.getServersByMethod(methodId);
                };
                return result;
            },
            protocolState: protocolState,
        };
        server.methods[methodId] = methodEntity;
        // increase the ref and notify listeners
        if (!this.methodsCount[methodId]) {
            this.methodsCount[methodId] = 0;
            this.callbacks.execute("onMethodAdded", methodEntity);
        }
        this.methodsCount[methodId] = this.methodsCount[methodId] + 1;
        this.callbacks.execute("onServerMethodAdded", server, methodEntity);
    };
    ClientRepository.prototype.createMethodId = function (methodInfo) {
        // Setting properties to defaults:
        var accepts = methodInfo.accepts !== undefined ? methodInfo.accepts : "";
        var returns = methodInfo.returns !== undefined ? methodInfo.returns : "";
        return (methodInfo.name + accepts + returns).toLowerCase();
    };
    ClientRepository.prototype.removeServerMethod = function (serverId, methodId) {
        var server = this.servers[serverId];
        if (!server) {
            throw new Error("server does not exists");
        }
        var method = server.methods[methodId];
        delete server.methods[methodId];
        // update ref counting
        this.methodsCount[methodId] = this.methodsCount[methodId] - 1;
        if (this.methodsCount[methodId] === 0) {
            this.callbacks.execute("onMethodRemoved", method);
        }
        this.callbacks.execute("onServerMethodRemoved", server, method);
    };
    ClientRepository.prototype.getMethods = function () {
        var _this = this;
        var allMethods = {};
        Object.keys(this.servers).forEach(function (serverId) {
            var server = _this.servers[serverId];
            Object.keys(server.methods).forEach(function (methodId) {
                var method = server.methods[methodId];
                allMethods[method.id] = method;
            });
        });
        var methodsAsArray = Object.keys(allMethods).map(function (id) {
            return allMethods[id];
        });
        return methodsAsArray;
    };
    ClientRepository.prototype.getServers = function () {
        var _this = this;
        var allServers = [];
        Object.keys(this.servers).forEach(function (serverId) {
            var server = _this.servers[serverId];
            allServers.push(server);
        });
        return allServers;
    };
    ClientRepository.prototype.getServerMethodsById = function (serverId) {
        var server = this.servers[serverId];
        return Object.keys(server.methods).map(function (id) {
            return server.methods[id];
        });
    };
    ClientRepository.prototype.onServerAdded = function (callback) {
        var unsubscribeFunc = this.callbacks.add("onServerAdded", callback);
        // replay all servers
        this.getServers().forEach(function (server) {
            callback(server);
        });
        return unsubscribeFunc;
    };
    ClientRepository.prototype.onMethodAdded = function (callback) {
        var unsubscribeFunc = this.callbacks.add("onMethodAdded", callback);
        // reply all existing methods
        this.getMethods().forEach(function (method) {
            callback(method);
        });
        return unsubscribeFunc;
    };
    ClientRepository.prototype.onServerMethodAdded = function (callback) {
        var unsubscribeFunc = this.callbacks.add("onServerMethodAdded", callback);
        // replay all existing server methods
        this.getServers().forEach(function (server) {
            var methods = server.methods;
            Object.keys(methods).forEach(function (methodId) {
                callback(server, methods[methodId]);
            });
        });
        return unsubscribeFunc;
    };
    ClientRepository.prototype.onMethodRemoved = function (callback) {
        var unsubscribeFunc = this.callbacks.add("onMethodRemoved", callback);
        return unsubscribeFunc;
    };
    ClientRepository.prototype.onServerRemoved = function (callback) {
        var unsubscribeFunc = this.callbacks.add("onServerRemoved", callback);
        return unsubscribeFunc;
    };
    ClientRepository.prototype.onServerMethodRemoved = function (callback) {
        var unsubscribeFunc = this.callbacks.add("onServerMethodRemoved", callback);
        return unsubscribeFunc;
    };
    ClientRepository.prototype.getServerById = function (id) {
        return this.servers[id];
    };
    ClientRepository.prototype.reset = function () {
        this.servers = {};
        this.methodsCount = {};
    };
    /**
     * Transforms internal server object to user object
     */
    ClientRepository.prototype.createUserServerInfo = function (serverInfo) {
        return {
            machine: serverInfo.machine,
            pid: serverInfo.pid,
            user: serverInfo.user,
            application: serverInfo.application,
            environment: serverInfo.environment,
            region: serverInfo.region,
            instance: serverInfo.instance,
            windowId: serverInfo.windowId,
            peerId: serverInfo.peerId,
        };
    };
    /**
     * Transforms internal method object to user object
     */
    ClientRepository.prototype.createUserMethodInfo = function (methodInfo) {
        var result = {
            name: methodInfo.name,
            accepts: methodInfo.accepts,
            returns: methodInfo.returns,
            description: methodInfo.description,
            displayName: methodInfo.displayName,
            objectTypes: methodInfo.objectTypes,
            supportsStreaming: methodInfo.supportsStreaming,
        };
        // now add some legacy stuff
        result.object_types = methodInfo.objectTypes;
        result.display_name = methodInfo.objectTypes;
        result.version = methodInfo.objectTypes;
        return result;
    };
    ClientRepository.prototype.getServersByMethod = function (id) {
        var _this = this;
        var allServers = [];
        Object.keys(this.servers).forEach(function (serverId) {
            var server = _this.servers[serverId];
            Object.keys(server.methods).forEach(function (methodId) {
                if (methodId === id) {
                    allServers.push(server.getInfoForUser());
                }
            });
        });
        return allServers;
    };
    return ClientRepository;
}());
exports.default = ClientRepository;
//# sourceMappingURL=repository.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var promisify_1 = __webpack_require__(8);
var NativeAGM = /** @class */ (function () {
    function NativeAGM(instance, helpers, agmFacade) {
        this.instance = instance;
        this.helpers = helpers;
        this.agmFacade = agmFacade;
        this.protocolVersion = this.agmFacade.protocolVersion;
    }
    NativeAGM.prototype.register = function (name, handler) {
        var methodInfoAsObject = this.helpers.stringToObject(name, "name");
        this.helpers.validateMethodInfo(methodInfoAsObject);
        if (this.protocolVersion && this.protocolVersion >= 3) {
            // for newer HC use the version where we don't pass arguments as JSON (because of different issues)
            this.agmFacade.register(JSON.stringify(methodInfoAsObject), handler, true); // return as objects
        }
        else {
            this.agmFacade.register(JSON.stringify(methodInfoAsObject), function (arg, caller) {
                var methodResult = handler(JSON.parse(arg), caller);
                return JSON.stringify(methodResult);
            });
        }
    };
    NativeAGM.prototype.registerAsync = function (name, handler) {
        if (!this.agmFacade.registerAsync) {
            throw new Error("not supported in that version of HtmlContainer");
        }
        var methodInfoAsObject = this.helpers.stringToObject(name, "name");
        this.helpers.validateMethodInfo(methodInfoAsObject);
        this.agmFacade.registerAsync(methodInfoAsObject, function (args, instance, tracker) {
            // execute the user callback
            handler(args, instance, function (successArgs) {
                tracker.success(successArgs);
            }, function (error) {
                tracker.error(error);
            });
        });
    };
    NativeAGM.prototype.unregister = function (definition) {
        this.agmFacade.unregister(JSON.stringify(this.helpers.stringToObject(definition, "name")));
    };
    NativeAGM.prototype.invoke = function (method, argumentObj, target, options, success, error) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (argumentObj === undefined) {
                argumentObj = {};
            }
            if (typeof argumentObj !== "object") {
                reject({ message: "The method arguments must be an object." });
            }
            if (options === undefined) {
                options = {};
            }
            target = _this.helpers.targetArgToObject(target);
            if (_this.agmFacade.invoke2) {
                // invoke ver2 - do not stringify arguments and result values
                _this.agmFacade.invoke2(JSON.stringify(_this.helpers.stringToObject(method, "name")), argumentObj, JSON.stringify(target), JSON.stringify(options), function (a) {
                    resolve(a);
                }, function (err) {
                    reject(err);
                });
            }
            else {
                var successProxy = void 0;
                var errorProxy = void 0;
                successProxy = function (args) {
                    var parsed = JSON.parse(args);
                    resolve(parsed);
                };
                errorProxy = function (args) {
                    var parsed = JSON.parse(args);
                    reject(parsed);
                };
                _this.agmFacade.invoke(JSON.stringify(_this.helpers.stringToObject(method, "name")), JSON.stringify(argumentObj), JSON.stringify(target), JSON.stringify(options), successProxy, errorProxy);
            }
        });
        return promisify_1.default(promise, success, error);
    };
    NativeAGM.prototype.createStream = function (methodDefinition, options, successCallback, errorCallback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (typeof methodDefinition === "string") {
                methodDefinition = {
                    name: methodDefinition,
                    getServers: function () { return []; },
                };
            }
            if (!options) {
                options = {
                    subscriptionRequestHandler: undefined,
                    subscriptionAddedHandler: undefined,
                    subscriptionRemovedHandler: undefined,
                };
            }
            _this.agmFacade.createStream2(JSON.stringify(methodDefinition), 
            // TODO - wrap to transform params
            options.subscriptionRequestHandler, 
            // TODO - wrap to transform params
            options.subscriptionAddedHandler, 
            // TODO - wrap to transform params
            options.subscriptionRemovedHandler, 
            // success handler
            function (stream) {
                resolve(stream);
            }, 
            // error handler
            function (error) {
                reject(error);
            });
        });
        return promisify_1.default(promise, successCallback, errorCallback);
    };
    NativeAGM.prototype.subscribe = function (methodDefinition, parameters, successCallback, errorCallback) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (typeof methodDefinition === "undefined") {
                reject("method definition param is required");
            }
            if (parameters === undefined) {
                parameters = {};
            }
            parameters.args = JSON.stringify(parameters.arguments || {});
            parameters.target = _this.helpers.targetArgToObject(parameters.target);
            var name;
            if (typeof methodDefinition === "string") {
                name = methodDefinition;
            }
            else {
                name = methodDefinition.name;
            }
            _this.agmFacade.subscribe2(name, JSON.stringify(parameters), function (sub) {
                resolve(sub);
            }, function (error) {
                reject(error);
            });
        });
        return promisify_1.default(promise, successCallback, errorCallback);
    };
    NativeAGM.prototype.servers = function (filter) {
        var _this = this;
        var jsonResult = this.agmFacade.servers(JSON.stringify(this.helpers.stringToObject(filter, "name")));
        var parsedResult = this.helpers.agmParse(jsonResult);
        return parsedResult.map(function (server) {
            return _this.transformServerObject(server);
        });
    };
    NativeAGM.prototype.methods = function (filter) {
        var _this = this;
        var jsonResult = this.agmFacade.methods(JSON.stringify(this.helpers.stringToObject(filter, "name")));
        var parsedResult = this.helpers.agmParse(jsonResult);
        return parsedResult.map(function (method) {
            return _this.transformMethodObject(method);
        });
    };
    NativeAGM.prototype.methodAdded = function (callback) {
        var _this = this;
        var subscribed = true;
        this.agmFacade.methodAdded(function (method) {
            if (subscribed) {
                callback(_this.transformMethodObject(method));
            }
        });
        return function () {
            subscribed = false;
        };
    };
    NativeAGM.prototype.methodRemoved = function (callback) {
        var _this = this;
        var subscribed = true;
        this.agmFacade.methodRemoved(function (method) {
            if (subscribed) {
                callback(_this.transformMethodObject(method));
            }
        });
        return function () {
            subscribed = false;
        };
    };
    NativeAGM.prototype.serverAdded = function (callback) {
        var _this = this;
        var subscribed = true;
        this.agmFacade.serverAdded(function (server) {
            if (subscribed) {
                callback(_this.transformServerObject(server));
            }
        });
        return function () {
            subscribed = false;
        };
    };
    NativeAGM.prototype.serverRemoved = function (callback) {
        var _this = this;
        var subscribed = true;
        this.agmFacade.serverRemoved(function (server) {
            if (subscribed) {
                callback(_this.transformServerObject(server));
            }
        });
        return function () {
            subscribed = false;
        };
    };
    NativeAGM.prototype.serverMethodAdded = function (callback) {
        var _this = this;
        var subscribed = true;
        this.agmFacade.serverMethodAdded(function (info) {
            if (subscribed) {
                callback({
                    server: _this.transformServerObject(info.server),
                    method: _this.transformMethodObject(info.method),
                });
            }
        });
        return function () {
            subscribed = false;
        };
    };
    NativeAGM.prototype.serverMethodRemoved = function (callback) {
        var _this = this;
        var subscribed = true;
        this.agmFacade.serverMethodRemoved(function (info) {
            if (subscribed) {
                callback({
                    server: _this.transformServerObject(info.server),
                    method: _this.transformMethodObject(info.method),
                });
            }
        });
        return function () {
            subscribed = false;
        };
    };
    NativeAGM.prototype.methodsForInstance = function (server) {
        var jsonResult = this.agmFacade.methodsForInstance(JSON.stringify(server));
        var methods = this.helpers.agmParse(jsonResult);
        return methods.map(this.transformMethodObject);
    };
    NativeAGM.prototype.transformMethodObject = function (method) {
        var _this = this;
        if (!method) {
            return undefined;
        }
        if (!method.displayName) {
            method.displayName = method.display_name;
        }
        if (!method.objectTypes) {
            method.objectTypes = method.object_types;
        }
        method.getServers = function () {
            return _this.servers(method.name);
        };
        return method;
    };
    NativeAGM.prototype.transformServerObject = function (server) {
        var _this = this;
        if (!server) {
            return undefined;
        }
        server.getMethods = function () {
            return _this.methodsForInstance(server);
        };
        server.getStreams = function () {
            return _this.methodsForInstance(server).filter(function (method) {
                return method.supportsStreaming;
            });
        };
        return server;
    };
    return NativeAGM;
}());
exports.NativeAGM = NativeAGM;
//# sourceMappingURL=agm.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Helpers = /** @class */ (function () {
    function Helpers(facade) {
        this.facade = facade;
        this.dateTimeIdentifier = facade.jsonValueDatePrefix;
        this.lenOfIdentifier = this.dateTimeIdentifier.length;
    }
    // helper function for parsing dates properly
    Helpers.prototype.agmParse = function (str) {
        var _this = this;
        return JSON.parse(str, function (k, v) {
            if (typeof v !== "string") {
                return v;
            }
            // pre-seed - this should be a bit faster than indexOf
            if (v[0] !== _this.dateTimeIdentifier[0]) {
                return v;
            }
            if (v.indexOf(_this.dateTimeIdentifier) !== 0) {
                return v;
            }
            var unixTimestampMs = v.substr(_this.lenOfIdentifier);
            return new Date(parseFloat(unixTimestampMs));
        });
    };
    /**
     * Converts a target argument to object ready to be passed to Agm facade
     * @param target
     */
    Helpers.prototype.targetArgToObject = function (target) {
        var _this = this;
        target = target || "best";
        if (typeof target === "string") {
            if (target !== "all" && target !== "best") {
                throw new Error(target + " is not a valid target. Valid targets are 'all' and 'best'");
            }
            return { target: target };
        }
        else {
            if (!Array.isArray(target)) {
                target = [target];
            }
            target = target.map(function (e) {
                return _this.convertInstanceToRegex(e);
            });
            return { serverFilter: target };
        }
    };
    Helpers.prototype.convertInstanceToRegex = function (instance) {
        var instanceConverted = {};
        Object.keys(instance).forEach(function (key) {
            var propValue = instance[key];
            instanceConverted[key] = propValue;
            if (typeof propValue === "undefined" || propValue === null) {
                return;
            }
            if (typeof propValue === "string" && propValue !== "") {
                // do exact matching if user passed a string
                instanceConverted[key] = "^" + instance[key] + "$";
            }
            else if (instance[key].constructor === RegExp) {
                instanceConverted[key] = instance[key].source;
            }
            else {
                instanceConverted[key] = instance[key];
            }
        });
        return instanceConverted;
    };
    Helpers.prototype.validateMethodInfo = function (methodInfo) {
        if (typeof methodInfo === "undefined") {
            throw Error("methodInfo is required argument");
        }
        if (!methodInfo.name) {
            throw Error("methodInfo object must contain name property");
        }
        if (methodInfo.objectTypes) {
            methodInfo.object_types = methodInfo.objectTypes;
        }
        if (methodInfo.displayName) {
            methodInfo.display_name = methodInfo.displayName;
        }
    };
    Helpers.prototype.stringToObject = function (param, stringPropName) {
        if (typeof param === "string") {
            var obj = {};
            obj[stringPropName] = param;
            return obj;
        }
        return param;
    };
    return Helpers;
}());
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var agm_1 = __webpack_require__(27);
var helpers_1 = __webpack_require__(28);
function default_1(configuration) {
    // date parsing
    var facade = global.htmlContainer.jsAgmFacade;
    var cfgAsString = createConfig(configuration);
    return new Promise(function (resolve, reject) {
        // create new AGM façade for this instance
        var successInit = function (instance) {
            var nativeAGM = new agm_1.NativeAGM(instance, new helpers_1.Helpers(facade), facade);
            // deprecated API
            nativeAGM.create_stream = nativeAGM.createStream;
            nativeAGM.methods_for_instance = nativeAGM.methodsForInstance;
            nativeAGM.method_added = nativeAGM.methodAdded;
            nativeAGM.method_removed = nativeAGM.methodRemoved;
            nativeAGM.server_added = nativeAGM.serverAdded;
            nativeAGM.server_removed = nativeAGM.serverRemoved;
            nativeAGM.server_method_added = nativeAGM.serverMethodAdded;
            nativeAGM.server_method_removed = nativeAGM.serverMethodRemoved;
            resolve(nativeAGM);
        };
        if (facade.protocolVersion && facade.protocolVersion >= 5 && facade.initAsync) {
            facade.initAsync(cfgAsString, successInit, function (err) {
                reject(err);
            });
        }
        else {
            var instance = facade.init(cfgAsString);
            successInit(instance);
        }
    });
}
exports.default = default_1;
var createConfig = function (configuration) {
    // add metrics
    if (configuration !== undefined && configuration.metrics !== undefined) {
        configuration.metrics.metricsIdentity = configuration.metrics.identity;
        // quick and dirty - we need to stringify the configuration so we need to replace the metrics object (which has circular references)
        // with an object that holds only the properties needed
        var metricsConfig = {
            metricsIdentity: configuration.metrics.metricsIdentity,
            path: configuration.metrics.path,
        };
        configuration.metrics = metricsConfig;
    }
    // remove the logger - we don't need it in HC and has circular references
    delete configuration.logger;
    return JSON.stringify(configuration);
};
//# sourceMappingURL=native.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = __webpack_require__(4);
/**
 * Each AGM application is identified by its AGM instance, which is a set of known key/value pairs.
 *
 */
function createOwnInstance(userSubmittedProperties, resolvedIdentity, peerId) {
    var document = global.document || global.process;
    // Generate default instance properties
    var instance = {
        application: document.title + random_1.default(),
        pid: Math.floor(Math.random() * 10000000000),
    };
    // Set peerId
    instance.peerId = peerId;
    // Apply user-submitted instance properties
    if (typeof userSubmittedProperties === "object") {
        if (userSubmittedProperties.application !== undefined) {
            instance.application = userSubmittedProperties.application;
        }
        instance.machine = userSubmittedProperties.machine;
        instance.user = userSubmittedProperties.user;
        instance.environment = userSubmittedProperties.environment;
        instance.region = userSubmittedProperties.region;
    }
    // Apply resolved identity (GW3 case)
    if (typeof resolvedIdentity !== "undefined") {
        instance.user = resolvedIdentity.user;
        instance.instance = resolvedIdentity.instance;
        instance.application = resolvedIdentity.application;
        instance.pid = resolvedIdentity.process;
        instance.machine = resolvedIdentity.machine;
        instance.environment = resolvedIdentity.environment;
        instance.region = resolvedIdentity.region;
        instance.windowId = resolvedIdentity.windowId;
    }
    return instance;
}
exports.createOwnInstance = createOwnInstance;
//# sourceMappingURL=instance.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = __webpack_require__(30);
var native_1 = __webpack_require__(29);
var factory_1 = __webpack_require__(34);
var factory_2 = __webpack_require__(39);
var agm_1 = __webpack_require__(23);
var repository_1 = __webpack_require__(26);
var repository_2 = __webpack_require__(43);
exports.default = (function (configuration) {
    if (!configuration.forceGW && global.htmlContainer !== undefined) {
        return native_1.default(configuration);
    }
    if (typeof configuration === "undefined") {
        throw new Error("configuration is required");
    }
    if (typeof configuration.connection === "undefined") {
        throw new Error("configuration.connections is required");
    }
    var connection = configuration.connection;
    if (typeof configuration.methodResponseTimeout !== "number") {
        configuration.methodResponseTimeout = 3000;
    }
    if (typeof configuration.waitTimeoutMs !== "number") {
        configuration.waitTimeoutMs = 3000;
    }
    // Initialize our modules
    // TODO - FIX ME
    var myIdentity = connection.resolvedIdentity;
    var myInstance = instance_1.createOwnInstance(configuration.instance, myIdentity, connection.peerId);
    var clientRepository = new repository_1.default();
    var serverRepository = new repository_2.default();
    var protocolPromise;
    var agmImpl;
    if (connection.protocolVersion === 3) {
        protocolPromise = factory_2.default(myInstance, connection, clientRepository, serverRepository, configuration, function () { return agmImpl; });
    }
    else {
        protocolPromise = factory_1.default(myInstance, connection, clientRepository, serverRepository, configuration, function () { return agmImpl; });
    }
    return new Promise(function (resolve, reject) {
        // wait for protocol to resolve
        protocolPromise.then(function (protocol) {
            agmImpl = new agm_1.default(protocol, clientRepository, serverRepository, myInstance, configuration);
            resolve(agmImpl);
        }).catch(function (err) {
            reject(err);
        });
    });
});
//# sourceMappingURL=main.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = __webpack_require__(4);
var helpers_1 = __webpack_require__(6);
var STATUS_AWAITING_ACCEPT = "awaitingAccept"; // not even one server has accepted yet
var STATUS_SUBSCRIBED = "subscribed"; // at least one server has responded as 'Accepting'
var ERR_MSG_SUB_FAILED = "Subscription failed.";
var ERR_MSG_SUB_REJECTED = "Subscription rejected.";
var ON_CLOSE_MSG_SERVER_INIT = "ServerInitiated";
var ON_CLOSE_MSG_CLIENT_INIT = "ClientInitiated";
var ClientStreaming = /** @class */ (function () {
    function ClientStreaming(configuration, instance, sendRequest, nextResponseSubject) {
        this.configuration = configuration;
        this.instance = instance;
        this.sendRequest = sendRequest;
        this.nextResponseSubject = nextResponseSubject;
        this.subscriptionsList = {};
    }
    ClientStreaming.prototype.subscribe = function (stream, args, targetServers, options, success, error) {
        var _this = this;
        if (targetServers.length === 0) {
            error({
                method: stream.getInfoForUser(),
                message: ERR_MSG_SUB_FAILED + " No available servers matched the target params.",
                called_with: args,
            });
            return;
        }
        // This same Id will be passed to all the servers (as 'InvocationId')
        // so they can respond back with it during the initial handshake
        var subscriptionId = "subscriptionId_" + random_1.default();
        // Register the user's callbacks
        var pendingSub = this.registerSubscription(subscriptionId, stream, args, success, error, options.methodResponseTimeout);
        if (typeof pendingSub !== "object") {
            error({
                method: stream.getInfoForUser(),
                message: ERR_MSG_SUB_FAILED + " Unable to register the user callbacks.",
                called_with: args,
            });
            return;
        }
        // Send a subscription request to each server
        targetServers.forEach(function (target) {
            // Get a response subject for this invocation
            var responseSubject = _this.nextResponseSubject();
            var requestSubject = stream.info.requestSubject;
            // Add server to the list of ones the client is expecting a response from
            pendingSub.trackedServers.push({
                server: undefined,
                streamId: undefined,
                streamSubjects: {
                    global: undefined,
                    private: undefined,
                },
                methodRequestSubject: requestSubject,
                methodResponseSubject: responseSubject,
            });
            // Construct a message
            var message = {
                EventStreamAction: 1,
                MethodRequestSubject: requestSubject,
                MethodResponseSubject: responseSubject,
                Client: helpers_1.convertInstance(_this.instance),
                Context: {
                    ArgumentsJson: args,
                    InvocationId: subscriptionId,
                    MethodName: stream.info.name,
                    ExecutionServer: target.server.info,
                    Timeout: options.methodResponseTimeout,
                },
            };
            // Send it
            _this.sendRequest(message);
        });
    };
    ClientStreaming.prototype.processPublisherMsg = function (msg) {
        if (!(msg && msg.EventStreamAction && msg.EventStreamAction !== 0)) {
            return;
        }
        if (msg.EventStreamAction === 2) {
            this.serverIsKickingASubscriber(msg);
        }
        else if (msg.EventStreamAction === 3) {
            this.serverAcknowledgesGoodSubscription(msg);
        }
        else if (msg.EventStreamAction === 5) {
            this.serverHasPushedSomeDataIntoTheStream(msg);
        }
    };
    ClientStreaming.prototype.registerSubscription = function (subscriptionId, method, args, success, error, timeout) {
        var _this = this;
        this.subscriptionsList[subscriptionId] = {
            status: STATUS_AWAITING_ACCEPT,
            method: method,
            arguments: args,
            success: success,
            error: error,
            trackedServers: [],
            handlers: {
                onData: [],
                onClosed: [],
            },
            queued: {
                data: [],
                closers: [],
            },
            timeoutId: undefined,
        };
        this.subscriptionsList[subscriptionId].timeoutId = setTimeout(function () {
            if (_this.subscriptionsList[subscriptionId] === undefined) {
                return; // no such subscription
            }
            var subscription = _this.subscriptionsList[subscriptionId];
            if (subscription.status === STATUS_AWAITING_ACCEPT) {
                error({
                    method: method,
                    called_with: args,
                    message: ERR_MSG_SUB_FAILED + " Subscription attempt timed out after " + timeout + "ms.",
                });
                // None of the target servers has answered the subscription attempt
                delete _this.subscriptionsList[subscriptionId];
            }
            else if (subscription.status === STATUS_SUBSCRIBED &&
                subscription.trackedServers.length > 0) {
                // Clean the trackedServers, removing those without valid streamId
                subscription.trackedServers = subscription.trackedServers.filter(function (server) {
                    return (typeof server.streamId === "string" && server.streamId !== "");
                });
                subscription.timeoutId = undefined;
                if (subscription.trackedServers.length === 0) {
                    // TODO this might be dead-code, where is closers.push?
                    // There are no open streams, some servers accepted then closed very quickly
                    // (that's why the status changed but there's no good server with a StreamId)
                    // call the onClosed handlers
                    var closersCount = subscription.queued.closers.length;
                    var closingServer_1 = (closersCount > 0) ? subscription.queued.closers[closersCount - 1] : null;
                    subscription.handlers.onClosed.forEach(function (callback) {
                        if (typeof callback === "function") {
                            callback({
                                message: ON_CLOSE_MSG_SERVER_INIT,
                                requestArguments: subscription.arguments,
                                server: closingServer_1,
                                stream: subscription.method,
                            });
                        }
                    });
                    delete _this.subscriptionsList[subscriptionId];
                }
            }
        }, timeout);
        return this.subscriptionsList[subscriptionId];
    };
    ClientStreaming.prototype.serverIsKickingASubscriber = function (msg) {
        // Note: this might be either the server rejecting a subscription request OR closing an existing subscription
        var _this = this;
        // Get ALL subscriptions
        var keys = Object.keys(this.subscriptionsList);
        // If it is a rejection there may be an InvocationId, it can narrow the search
        if (typeof msg.InvocationId === "string" && msg.InvocationId !== "") {
            keys = keys.filter(function (k) { return k === msg.InvocationId; });
        }
        var deletionsList = [];
        // Find the kicking/rejecting server and remove it from the subscription.trackedServers[]
        keys.forEach(function (key) {
            if (typeof _this.subscriptionsList[key] !== "object") {
                return;
            }
            _this.subscriptionsList[key].trackedServers = _this.subscriptionsList[key].trackedServers.filter(function (server) {
                var isRejecting = (server.methodRequestSubject === msg.MethodRequestSubject && server.methodResponseSubject === msg.MethodResponseSubject);
                var isKicking = (server.streamId === msg.StreamId &&
                    (server.streamSubjects.global === msg.EventStreamSubject || server.streamSubjects.private === msg.EventStreamSubject));
                var isRejectingOrKicking = isRejecting || isKicking;
                return !isRejectingOrKicking;
            });
            if (_this.subscriptionsList[key].trackedServers.length === 0) {
                deletionsList.push(key);
            }
        });
        // Call onClosed OR error()
        // and remove the subscription
        deletionsList.forEach(function (key) {
            if (typeof _this.subscriptionsList[key] !== "object") {
                return;
            }
            if (_this.subscriptionsList[key].status === STATUS_AWAITING_ACCEPT &&
                typeof _this.subscriptionsList[key].timeoutId === "number") {
                var reason = (typeof msg.ResultMessage === "string" && msg.ResultMessage !== "") ?
                    ' Publisher said "' + msg.ResultMessage + '".' :
                    " No reason given.";
                var callArgs = typeof _this.subscriptionsList[key].arguments === "object" ?
                    JSON.stringify(_this.subscriptionsList[key].arguments) :
                    "{}";
                _this.subscriptionsList[key].error(ERR_MSG_SUB_REJECTED + reason + " Called with:" + callArgs);
                clearTimeout(_this.subscriptionsList[key].timeoutId);
            }
            else {
                // The timeout may or may not have expired yet,
                // but the status is 'subscribed' and trackedServers is now empty
                _this.subscriptionsList[key].handlers.onClosed.forEach(function (callback) {
                    if (typeof callback !== "function") {
                        return;
                    }
                    callback({
                        message: ON_CLOSE_MSG_SERVER_INIT,
                        requestArguments: _this.subscriptionsList[key].arguments,
                        server: helpers_1.convertInfoToInstance(msg.Server),
                        stream: _this.subscriptionsList[key].method,
                    });
                });
            }
            delete _this.subscriptionsList[key];
        });
    };
    // action 3
    ClientStreaming.prototype.serverAcknowledgesGoodSubscription = function (msg) {
        var _this = this;
        var subscriptionId = msg.InvocationId;
        var subscription = this.subscriptionsList[subscriptionId];
        if (typeof subscription !== "object") {
            return;
        }
        var acceptingServer = subscription.trackedServers.filter(function (server) {
            return (server.methodRequestSubject === msg.MethodRequestSubject &&
                server.methodResponseSubject === msg.MethodResponseSubject);
        })[0];
        if (typeof acceptingServer !== "object") {
            return;
        }
        var isFirstResponse = (subscription.status === STATUS_AWAITING_ACCEPT);
        subscription.status = STATUS_SUBSCRIBED;
        var privateStreamSubject = this.generatePrivateStreamSubject(subscription.method.name);
        if (typeof acceptingServer.streamId === "string" && acceptingServer.streamId !== "") {
            return; // already accepted previously
        }
        acceptingServer.server = helpers_1.convertInfoToInstance(msg.Server);
        acceptingServer.streamId = msg.StreamId;
        acceptingServer.streamSubjects.global = msg.EventStreamSubject;
        acceptingServer.streamSubjects.private = privateStreamSubject;
        // acceptingServer.methodResponseSubject stays the same
        var confirmatoryRequest = {
            EventStreamAction: 3,
            EventStreamSubject: privateStreamSubject,
            StreamId: msg.StreamId,
            MethodRequestSubject: msg.MethodRequestSubject,
            MethodResponseSubject: acceptingServer.methodResponseSubject,
            Client: helpers_1.convertInstance(this.instance),
            Context: {
                ArgumentsJson: subscription.arguments,
                MethodName: subscription.method.name,
            },
        };
        this.sendRequest(confirmatoryRequest);
        if (isFirstResponse) {
            // Pass in the subscription object
            subscription.success({
                onData: function (dataCallback) {
                    if (typeof dataCallback !== "function") {
                        throw new TypeError("The data callback must be a function.");
                    }
                    this.handlers.onData.push(dataCallback);
                    if (this.handlers.onData.length === 1 && this.queued.data.length > 0) {
                        this.queued.data.forEach(function (dataItem) {
                            dataCallback(dataItem);
                        });
                    }
                }.bind(subscription),
                onClosed: function (closedCallback) {
                    if (typeof closedCallback !== "function") {
                        throw new TypeError("The callback must be a function.");
                    }
                    this.handlers.onClosed.push(closedCallback);
                }.bind(subscription),
                onFailed: function () { },
                close: function () { return _this.closeSubscription(subscription, subscriptionId); },
                requestArguments: subscription.arguments,
                serverInstance: helpers_1.convertInfoToInstance(msg.Server),
                stream: subscription.method,
            });
        }
    };
    // action 5
    ClientStreaming.prototype.serverHasPushedSomeDataIntoTheStream = function (msg) {
        var _loop_1 = function (key) {
            if (this_1.subscriptionsList.hasOwnProperty(key) && typeof this_1.subscriptionsList[key] === "object") {
                var isPrivateData = void 0;
                var trackedServersFound = this_1.subscriptionsList[key].trackedServers.filter(function (ls) {
                    return (ls.streamId === msg.StreamId &&
                        (ls.streamSubjects.global === msg.EventStreamSubject ||
                            ls.streamSubjects.private === msg.EventStreamSubject));
                });
                if (trackedServersFound.length === 0) {
                    isPrivateData = undefined;
                }
                else if (trackedServersFound[0].streamSubjects.global === msg.EventStreamSubject) {
                    isPrivateData = false;
                }
                else if (trackedServersFound[0].streamSubjects.private === msg.EventStreamSubject) {
                    isPrivateData = true;
                }
                if (isPrivateData !== undefined) {
                    // create the arrivedData object
                    var receivedStreamData_1 = {
                        data: msg.ResultContextJson,
                        server: helpers_1.convertInfoToInstance(msg.Server),
                        requestArguments: this_1.subscriptionsList[key].arguments || {},
                        message: msg.ResultMessage,
                        private: isPrivateData,
                    };
                    var onDataHandlers = this_1.subscriptionsList[key].handlers.onData;
                    var queuedData = this_1.subscriptionsList[key].queued.data;
                    if (Array.isArray(onDataHandlers)) {
                        if (onDataHandlers.length > 0) {
                            onDataHandlers.forEach(function (callback) {
                                if (typeof callback === "function") {
                                    callback(receivedStreamData_1);
                                }
                            });
                        }
                        else {
                            queuedData.push(receivedStreamData_1);
                        }
                    }
                }
            }
        };
        var this_1 = this;
        // Find the subscription of interest by trawling the dictionary
        for (var key in this.subscriptionsList) {
            _loop_1(key);
        } // end for-in
    };
    /** (subscription) Methods */
    ClientStreaming.prototype.closeSubscription = function (sub, subId) {
        var _this = this;
        var responseSubject = this.nextResponseSubject();
        sub.trackedServers.forEach(function (server) {
            _this.sendRequest({
                EventStreamAction: 2,
                Client: helpers_1.convertInstance(_this.instance),
                MethodRequestSubject: server.methodRequestSubject,
                MethodResponseSubject: responseSubject,
                StreamId: server.streamId,
                EventStreamSubject: server.streamSubjects.private,
            });
        });
        // Call the onClosed handlers
        sub.handlers.onClosed.forEach(function (callback) {
            if (typeof callback === "function") {
                callback({
                    message: ON_CLOSE_MSG_CLIENT_INIT,
                    requestArguments: sub.arguments || {},
                    server: sub.trackedServers[sub.trackedServers.length - 1].server,
                    stream: sub.method,
                });
            }
        });
        delete this.subscriptionsList[subId];
    };
    ClientStreaming.prototype.generatePrivateStreamSubject = function (methodName) {
        var appInfo = helpers_1.convertInstance(this.instance);
        return "ESSpriv-jsb_" +
            appInfo.ApplicationName +
            "_on_" +
            methodName +
            "_" +
            random_1.default();
    };
    return ClientStreaming;
}());
exports.default = ClientStreaming;
//# sourceMappingURL=client-streaming.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = __webpack_require__(4);
var callback_registry_1 = __webpack_require__(0);
var client_streaming_1 = __webpack_require__(32);
var helpers_1 = __webpack_require__(6);
var numberMissingHeartbeatsToRemove = 3;
var ClientProtocol = /** @class */ (function () {
    function ClientProtocol(connection, instance, configuration, repository) {
        var _this = this;
        this.connection = connection;
        this.instance = instance;
        this.configuration = configuration;
        this.repository = repository;
        this.respCounter = 0;
        this.callbacks = callback_registry_1.default();
        this.timers = {};
        this.timers = {};
        this.streaming = new client_streaming_1.default(configuration, instance, function (msg) {
            connection.send("agm", "MethodInvocationRequestMessage", msg);
        }, function () { return _this.nextResponseSubject(); });
        this.listenForEvents();
    }
    ClientProtocol.prototype.subscribe = function (stream, args, targetServers, options, success, error) {
        this.streaming.subscribe(stream, args, targetServers, options, success, error);
    };
    ClientProtocol.prototype.onInvocationResult = function (callback) {
        this.callbacks.add("onResult", callback);
    };
    ClientProtocol.prototype.invoke = function (id, method, args, target, stuff) {
        var methodInfo = method.info;
        // Construct a message
        var message = {
            MethodRequestSubject: methodInfo.requestSubject,
            MethodResponseSubject: this.nextResponseSubject(),
            Client: helpers_1.convertInstance(this.instance),
            Context: {
                ArgumentsJson: args,
                InvocationId: id,
                MethodName: methodInfo.name,
                ExecutionServer: target.info,
                Timeout: stuff.methodResponseTimeoutMs,
            },
        };
        this.connection.send("agm", "MethodInvocationRequestMessage", message);
    };
    ClientProtocol.prototype.nextResponseSubject = function () {
        return "resp_" + (this.respCounter++) + "_" + random_1.default();
    };
    ClientProtocol.prototype.createServerInfo = function (instance) {
        return {
            machine: instance.MachineName,
            pid: instance.ProcessId,
            user: instance.UserName,
            application: instance.ApplicationName,
            environment: instance.Environment,
            region: instance.Region,
        };
    };
    ClientProtocol.prototype.createMethod = function (methodInfo) {
        var method = methodInfo.Method;
        return {
            name: method.Name,
            accepts: method.InputSignature,
            returns: method.ResultSignature,
            requestSubject: methodInfo.MethodRequestSubject,
            description: method.Description,
            displayName: method.DisplayName,
            version: method.Version,
            objectTypes: method.ObjectTypeRestrictions,
            supportsStreaming: helpers_1.isStreamingFlagSet(method.Flags),
        };
    };
    // Generates a unique ID for a server
    ClientProtocol.prototype.createServerId = function (serverInfo) {
        if (serverInfo === undefined) {
            return undefined;
        }
        return [serverInfo.application,
            serverInfo.user,
            serverInfo.machine,
            serverInfo.started,
            serverInfo.pid].join("/").toLowerCase();
    };
    ClientProtocol.prototype.processServerPresence = function (presence, isPresence) {
        var instance = presence.Instance;
        var serverInfo = this.createServerInfo(instance);
        var serverId = this.createServerId(serverInfo);
        if (isPresence) {
            // test
            // console.debug(new Date(), '  heard presence');
            // if (instance.ApplicationName === 'Dummy server') {
            //     console.debug(new Date(), '  got Dummy server presence', presence);
            // }
            serverId = this.repository.addServer(serverInfo, serverId);
            if (presence.PublishingInterval) {
                this.scheduleTimeout(serverId, presence.PublishingInterval);
            }
        }
        else if (presence.PublishingInterval === 0) {
            // Good bye message from Gateway
            var server = this.repository.getServerById(serverId);
            if (typeof server !== "undefined") {
                this.repository.removeServerById(serverId);
            }
        }
        // Finally, update the methods
        if (presence.MethodDefinitions !== undefined) {
            this.updateServerMethods(serverId, presence.MethodDefinitions);
        }
    };
    // This function sets a timeout which removes the server unless - the function is called again before the timeout is over
    ClientProtocol.prototype.scheduleTimeout = function (serverId, duration) {
        var _this = this;
        if (duration === -1) {
            return;
        }
        // Stop the previous timeout
        var timer = this.timers[serverId];
        if (timer !== undefined) {
            clearTimeout(timer);
        }
        // Set a new one
        this.timers[serverId] = setTimeout(function () {
            _this.repository.removeServerById(serverId);
        }, duration * (numberMissingHeartbeatsToRemove + 1));
    };
    // Updates the methods of a server
    ClientProtocol.prototype.updateServerMethods = function (serverId, newMethods) {
        var _this = this;
        // Get an array of the methods the server had before we started this
        var oldMethods = this.repository.getServerMethodsById(serverId);
        // Get an array of the methods that the server has now
        var newMethodsReduced = newMethods
            .map(function (nm) { return _this.createMethod(nm); })
            .reduce(function (obj, method) {
            var methodId = _this.repository.createMethodId(method);
            obj[methodId] = method;
            return obj;
        }, {});
        // For each of the old methods
        oldMethods.forEach(function (method) {
            // Check if it is still there
            if (newMethodsReduced[method.id] === undefined) {
                // If it isn't, remove it
                _this.repository.removeServerMethod(serverId, method.id);
            }
            else {
                // If it is there in both the old array and the new one, we don't need to add it again
                delete newMethodsReduced[method.id];
            }
        });
        // Now add the new methods
        Object.keys(newMethodsReduced).forEach(function (key) {
            var method = newMethodsReduced[key];
            _this.repository.addServerMethod(serverId, method);
        });
    };
    ClientProtocol.prototype.handleInvokeResultMessage = function (message) {
        // Delegate streaming-related messages to streaming
        if (message && message.EventStreamAction && message.EventStreamAction !== 0) {
            this.streaming.processPublisherMsg(message);
            return;
        }
        var server = message.Server ? this.createServerInfo(message.Server) : undefined;
        // parse the result
        var result = message.ResultContextJson;
        // If the result is an empty object, there is no result
        if (result && Object.keys(result).length === 0) {
            result = undefined;
        }
        this.callbacks.execute("onResult", message.InvocationId, server, message.Status, result, message.ResultMessage);
    };
    ClientProtocol.prototype.listenForEvents = function () {
        var _this = this;
        this.connection.on("agm", "ServerPresenceMessage", function (msg) {
            _this.processServerPresence(msg, true);
        });
        this.connection.on("agm", "ServerHeartbeatMessage", function (msg) {
            _this.processServerPresence(msg, false);
        });
        this.connection.on("agm", "MethodInvocationResultMessage", function (msg) {
            _this.handleInvokeResultMessage(msg);
        });
    };
    return ClientProtocol;
}());
exports.default = ClientProtocol;
//# sourceMappingURL=client.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(36);
var client_1 = __webpack_require__(33);
function default_1(instance, connection, clientRepository, serverRepository, configuration, getAGM) {
    var unsubscribe = connection.on("agm", "Instance", function (newInstance) {
        getAGM().updateInstance(newInstance);
        connection.off(unsubscribe);
    });
    var server = new server_1.default(connection, instance, configuration, serverRepository);
    var client = new client_1.default(connection, instance, configuration, clientRepository);
    return new Promise(function (resolve) {
        resolve({
            server: server,
            client: client,
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=factory.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = __webpack_require__(4);
var helpers_1 = __webpack_require__(6);
var ServerStreaming = /** @class */ (function () {
    function ServerStreaming(connection, instance) {
        this.connection = connection;
        this.instance = instance;
    }
    ServerStreaming.prototype.isStreamMsg = function (msg, method) {
        return (msg &&
            msg.EventStreamAction &&
            msg.EventStreamAction !== 0 &&
            typeof method === "object" &&
            method.definition.supportsStreaming === true);
    };
    ServerStreaming.prototype.pushData = function (streamingMethod, data, branches) {
        var _this = this;
        if (typeof streamingMethod !== "object" || !Array.isArray(streamingMethod.protocolState.branchKeyToStreamIdMap)) {
            return;
        }
        // TODO validate data is a plain object
        if (typeof data !== "object") {
            throw new Error("Invalid arguments. Data must be an object.");
        }
        if (typeof branches === "string") {
            branches = [branches]; // user wants to push to single branch
        }
        else if (!Array.isArray(branches) || branches.length <= 0) {
            branches = null;
        }
        // get the StreamId's from the method's branch map
        var streamIdList = streamingMethod.protocolState.branchKeyToStreamIdMap
            .filter(function (br) {
            return (branches === null || (Boolean(br) && typeof br.key === "string" && branches.indexOf(br.key) >= 0));
        }).map(function (br) {
            return br.streamId;
        });
        var server = helpers_1.convertInstance(this.instance);
        streamIdList.forEach(function (streamId) {
            _this.sendResult({
                EventStreamAction: 5,
                EventStreamSubject: streamingMethod.protocolState.globalEventStreamSubject,
                MethodName: streamingMethod.protocolState.method.Method.Name,
                MethodRequestSubject: streamingMethod.protocolState.method.MethodRequestSubject,
                ResultContextJson: data,
                Server: server,
                StreamId: streamId,
            });
        });
    };
    ServerStreaming.prototype.closeAllSubscriptions = function (streamingMethod, branchKey) {
        var _this = this;
        if (typeof streamingMethod !== "object" || !Array.isArray(streamingMethod.protocolState.branchKeyToStreamIdMap)) {
            return;
        }
        var streamList = streamingMethod.protocolState.branchKeyToStreamIdMap;
        if (typeof branchKey === "string") {
            streamList = streamingMethod.protocolState.branchKeyToStreamIdMap.filter(function (br) {
                return (typeof br === "object" && br.key === branchKey);
            });
        }
        // TODO: consider getting the unique branch keys from 'live subscribers'
        streamList.forEach(function (br) {
            var streamId = br.streamId;
            _this.sendResult({
                EventStreamAction: 2,
                EventStreamSubject: streamingMethod.protocolState.globalEventStreamSubject,
                MethodName: streamingMethod.protocolState.method.Method.Name,
                MethodRequestSubject: streamingMethod.protocolState.method.MethodRequestSubject,
                Server: helpers_1.convertInstance(_this.instance),
                StreamId: streamId,
                Status: 0,
            });
        });
    };
    ServerStreaming.prototype.getBranchList = function (streamingMethod) {
        if (typeof streamingMethod !== "object") {
            return [];
        }
        return this.getUniqueBranchNames(streamingMethod);
        // TODO the agm-api passes each sub to protocol methods for creating the sub front obj
    };
    ServerStreaming.prototype.getSubscriptionList = function (streamingMethod, branchKey) {
        if (typeof streamingMethod !== "object") {
            return [];
        }
        var subscriptions = [];
        if (typeof branchKey !== "string") {
            subscriptions = streamingMethod.protocolState.subscriptions;
        }
        else {
            subscriptions = streamingMethod.protocolState.subscriptions.filter(function (sub) {
                return sub.branchKey === branchKey;
            });
        }
        return subscriptions;
    };
    ServerStreaming.prototype.onSubAdded = function (handlerFunc) {
        if (typeof handlerFunc !== "function") {
            return;
        }
        this.subAddedHandler = handlerFunc;
    };
    ServerStreaming.prototype.onSubRemoved = function (handlerFunc) {
        if (typeof handlerFunc !== "function") {
            return;
        }
        this.subRemovedHandler = handlerFunc;
    };
    ServerStreaming.prototype.onSubRequest = function (handlerFunc) {
        if (typeof handlerFunc !== "function") {
            return;
        }
        this.requestHandler = handlerFunc;
    };
    ServerStreaming.prototype.generateNewStreamId = function (streamingMethodName) {
        var appInfo = helpers_1.convertInstance(this.instance);
        return "streamId-jsb_of_" +
            streamingMethodName +
            "__by_" +
            appInfo.ApplicationName +
            "_" +
            random_1.default();
    };
    ServerStreaming.prototype.rejectRequest = function (requestContext, streamingMethod, reason) {
        if (typeof reason !== "string") {
            reason = "";
        }
        var msg = requestContext.msg;
        this.sendResult({
            EventStreamAction: 2,
            EventStreamSubject: streamingMethod.protocolState.globalEventStreamSubject,
            // InvocationId: msg.Context.InvocationId,
            MethodName: streamingMethod.protocolState.method.Method.Name,
            MethodRequestSubject: streamingMethod.protocolState.method.MethodRequestSubject,
            MethodResponseSubject: msg.MethodResponseSubject,
            MethodVersion: streamingMethod.protocolState.method.Method.Version,
            ResultMessage: reason,
            Server: helpers_1.convertInstance(this.instance),
            StreamId: "default_rejection_streamId",
        });
    };
    ServerStreaming.prototype.pushDataToSingle = function (streamingMethod, subscription, data) {
        // TODO validate data is a plain object
        if (typeof data !== "object") {
            throw new Error("Invalid arguments. Data must be an object.");
        }
        this.sendResult({
            EventStreamAction: 5,
            EventStreamSubject: subscription.privateEventStreamSubject,
            MethodName: streamingMethod.protocolState.method.Method.Name,
            MethodRequestSubject: streamingMethod.protocolState.method.MethodRequestSubject,
            ResultContextJson: data,
            Server: helpers_1.convertInstance(this.instance),
            StreamId: subscription.streamId,
        });
    };
    ServerStreaming.prototype.closeSingleSubscription = function (streamingMethod, subscription) {
        this.closeIndividualSubscription(streamingMethod, subscription.streamId, subscription.privateEventStreamSubject, true);
    };
    /** (request) Methods */
    ServerStreaming.prototype.acceptRequestOnBranch = function (requestContext, streamingMethod, branch) {
        if (typeof branch !== "string") {
            branch = "";
        }
        var streamId = this.getStreamId(streamingMethod, branch);
        var msg = requestContext.msg;
        this.sendResult({
            EventStreamAction: 3,
            EventStreamSubject: streamingMethod.protocolState.globalEventStreamSubject,
            InvocationId: msg.Context.InvocationId,
            MethodName: streamingMethod.protocolState.method.Method.Name,
            MethodRequestSubject: streamingMethod.protocolState.method.MethodRequestSubject,
            MethodResponseSubject: msg.MethodResponseSubject,
            MethodVersion: streamingMethod.protocolState.method.Method.Version,
            ResultMessage: "Accepted",
            Server: helpers_1.convertInstance(this.instance),
            StreamId: streamId,
        });
    };
    ServerStreaming.prototype.processSubscriberMsg = function (msg, streamingMethod) {
        if (!(msg && msg.EventStreamAction && msg.EventStreamAction !== 0)) {
            return;
        }
        if (msg.EventStreamAction === 1) {
            this.clientWishesToSubscribe(msg, streamingMethod);
        }
        else if (msg.EventStreamAction === 2) {
            this.clientWishesToUnsubscribe(msg, streamingMethod);
        }
        else if (msg.EventStreamAction === 3) {
            this.clientAcknowledgesItDidSubscribe(msg, streamingMethod);
        }
        else if (msg.EventStreamAction === 4) {
            this.clientPerSubHeartbeat(msg);
        }
    };
    ServerStreaming.prototype.sendResult = function (message) {
        if (typeof message !== "object") {
            throw new Error("Invalid message.");
        }
        if (typeof message.Status !== "number") {
            message.Status = 0;
        }
        this.connection.send("agm", "MethodInvocationResultMessage", message);
    };
    /** msg 'Request' Actions */
    // action 1
    ServerStreaming.prototype.clientWishesToSubscribe = function (msg, streamingMethod) {
        var requestContext = {
            msg: msg,
            arguments: msg.Context.ArgumentsJson || {},
            instance: helpers_1.convertInfoToInstance(msg.Client),
        };
        if (typeof this.requestHandler === "function") {
            this.requestHandler(requestContext, streamingMethod);
        }
    };
    // action 2
    ServerStreaming.prototype.clientWishesToUnsubscribe = function (msg, streamingMethod) {
        if (!(streamingMethod &&
            Array.isArray(streamingMethod.protocolState.subscriptions) &&
            streamingMethod.protocolState.subscriptions.length > 0)) {
            return;
        }
        this.closeIndividualSubscription(streamingMethod, msg.StreamId, msg.EventStreamSubject, false);
    };
    // action 3
    ServerStreaming.prototype.clientAcknowledgesItDidSubscribe = function (msg, streamingMethod) {
        // Client indicates it is listening to a specific StreamId
        if (typeof msg.StreamId !== "string" || msg.StreamId === "") {
            return;
        }
        var branchKey = this.getBranchKey(streamingMethod, msg.StreamId);
        if (typeof branchKey !== "string") {
            return;
        }
        if (!Array.isArray(streamingMethod.protocolState.subscriptions)) {
            return;
        }
        var subscription = {
            branchKey: branchKey,
            instance: helpers_1.convertInfoToInstance(msg.Client),
            arguments: msg.Context.ArgumentsJson,
            streamId: msg.StreamId,
            privateEventStreamSubject: msg.EventStreamSubject,
            methodResponseSubject: msg.MethodResponseSubject,
        };
        // Subscription back-obj is stored
        streamingMethod.protocolState.subscriptions.push(subscription);
        if (typeof this.subAddedHandler === "function") {
            this.subAddedHandler(subscription, streamingMethod);
        }
    };
    // action 4
    ServerStreaming.prototype.clientPerSubHeartbeat = function (msg) {
        // A client may have multiple subscriptions, each one having its own heartbeat
        // Currently not implemented by the GW or the client
    };
    ServerStreaming.prototype.getBranchKey = function (streamingMethod, streamId) {
        if (typeof streamId !== "string" || typeof streamingMethod !== "object") {
            return;
        }
        var needle = streamingMethod.protocolState.branchKeyToStreamIdMap.filter(function (branch) {
            return branch.streamId === streamId;
        })[0];
        if (typeof needle !== "object" || typeof needle.key !== "string") {
            return;
        }
        return needle.key;
    };
    ServerStreaming.prototype.getStreamId = function (streamingMethod, branchKey) {
        if (typeof branchKey !== "string") {
            branchKey = "";
        }
        var needleBranch = streamingMethod.protocolState.branchKeyToStreamIdMap.filter(function (branch) {
            return branch.key === branchKey;
        })[0];
        var streamId = (needleBranch ? needleBranch.streamId : undefined);
        if (typeof streamId !== "string" || streamId === "") {
            streamId = this.generateNewStreamId(streamingMethod.protocolState.method.Method.Name);
            streamingMethod.protocolState.branchKeyToStreamIdMap.push({ key: branchKey, streamId: streamId });
        }
        return streamId;
    };
    /** (subscription) Methods */
    ServerStreaming.prototype.closeIndividualSubscription = function (streamingMethod, streamId, privateEventStreamSubject, sendKickMessage) {
        var subscription = streamingMethod.protocolState.subscriptions.filter(function (subItem) {
            return (subItem.privateEventStreamSubject === privateEventStreamSubject &&
                subItem.streamId === streamId);
        })[0];
        if (typeof subscription !== "object") {
            return; // unrecognised subscription
        }
        var initialLength = streamingMethod.protocolState.subscriptions.length;
        streamingMethod.protocolState.subscriptions = streamingMethod.protocolState.subscriptions.filter(function (subItem) {
            return !(subItem.privateEventStreamSubject === subscription.privateEventStreamSubject &&
                subItem.streamId === subscription.streamId);
        });
        var filteredLength = streamingMethod.protocolState.subscriptions.length;
        if (filteredLength !== (initialLength - 1)) {
            return; // the subscription wasn't removed
        }
        if (sendKickMessage === true) {
            this.sendResult({
                EventStreamAction: 2,
                EventStreamSubject: privateEventStreamSubject,
                MethodName: streamingMethod.protocolState.method.Method.Name,
                MethodRequestSubject: streamingMethod.protocolState.method.MethodRequestSubject,
                MethodResponseSubject: subscription.methodResponseSubject,
                MethodVersion: streamingMethod.protocolState.method.Method.Version,
                ResponseContextJson: {},
                Server: helpers_1.convertInstance(this.instance),
                StreamId: subscription.streamId,
                Status: 0,
            });
        }
        if (typeof this.subRemovedHandler === "function") {
            this.subRemovedHandler(subscription, streamingMethod);
        }
    };
    // Returns the names of branches for which there are live subscriptions
    ServerStreaming.prototype.getUniqueBranchNames = function (streamingMethod) {
        var keysWithDuplicates = streamingMethod.protocolState.subscriptions.map(function (sub) {
            var result = null;
            if (typeof sub === "object" && typeof sub.branchKey === "string") {
                result = sub.branchKey;
            }
            return result;
        });
        var seen = [];
        var branchArray = keysWithDuplicates.filter(function (bKey) {
            if (bKey === null || seen.indexOf(bKey) >= 0) {
                return false;
            }
            seen.push(bKey);
            return true;
        });
        return branchArray;
    };
    return ServerStreaming;
}());
exports.default = ServerStreaming;
//# sourceMappingURL=server-streaming.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = __webpack_require__(4);
var server_streaming_1 = __webpack_require__(35);
var callback_registry_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(6);
var HeartbeatInterval = 5000;
var PresenceInterval = 10000;
var ServerProtocol = /** @class */ (function () {
    function ServerProtocol(connection, instance, configuration, serverRepository) {
        var _this = this;
        this.connection = connection;
        this.instance = instance;
        this.serverRepository = serverRepository;
        this.invocationMessagesMap = {}; // {invocationId: Invocation_RequestMessage}
        this.reqCounter = 0;
        this.callbacks = callback_registry_1.default();
        this.streaming = new server_streaming_1.default(connection, instance);
        connection.on("agm", "MethodInvocationRequestMessage", function (msg) { return _this.handleMethodInvocationMessage(msg); });
        this.sendHeartbeat();
        if (this.heartbeatTimer === undefined) {
            this.heartbeatTimer = setInterval(function () { return _this.sendHeartbeat(); }, HeartbeatInterval);
        }
        this.getBranchList = this.streaming.getBranchList;
        this.getSubscriptionList = this.streaming.getSubscriptionList;
        this.closeAllSubscriptions = this.streaming.closeAllSubscriptions;
        this.closeSingleSubscription = this.streaming.closeSingleSubscription;
        this.pushDataToSingle = this.streaming.pushDataToSingle;
        this.pushData = this.streaming.pushData;
        this.onSubRequest = this.streaming.onSubRequest;
        this.acceptRequestOnBranch = this.streaming.acceptRequestOnBranch;
        this.rejectRequest = this.streaming.rejectRequest;
        this.onSubAdded = this.streaming.onSubAdded;
        this.onSubRemoved = this.streaming.onSubRemoved;
    }
    ServerProtocol.prototype.unregister = function (info) {
        this.sendPresence();
    };
    ServerProtocol.prototype.register = function (repoMethod, success, error) {
        // Get a request subject for this method
        var reqSubj = this.nextRequestSubject();
        repoMethod.protocolState.method = this.createNewMethodMessage(repoMethod.definition, reqSubj, false);
        this.announceNewMethod();
        success();
    };
    /** Create a streaming method */
    ServerProtocol.prototype.createStream = function (repoMethod, success, error) {
        var reqSubj = this.nextRequestSubject();
        var streamConverted = this.createNewMethodMessage(repoMethod.definition, reqSubj, true);
        // Used for presences
        repoMethod.protocolState.method = streamConverted;
        // Utility things for this protocol
        repoMethod.protocolState.globalEventStreamSubject = repoMethod.definition.name + ".jsStream." + random_1.default();
        repoMethod.protocolState.subscriptions = [];
        repoMethod.protocolState.branchKeyToStreamIdMap = []; // [ {branchKey: '', streamId: 'strj_nds7`8`6y2378yb'}, {...}, ...]
        this.announceNewMethod();
        success();
    };
    ServerProtocol.prototype.onInvoked = function (callback) {
        this.callbacks.add("onInvoked", callback);
    };
    ServerProtocol.prototype.methodInvocationResult = function (executedMethod, invocationId, err, result) {
        var message = this.invocationMessagesMap[invocationId];
        if (!message) {
            return;
        }
        // Don't send result if the client does not require it
        if (message.MethodResponseSubject === "null") {
            return;
        }
        if (executedMethod === undefined) {
            return;
        }
        var resultMessage = {
            MethodRequestSubject: message.MethodRequestSubject,
            MethodResponseSubject: message.MethodResponseSubject,
            MethodName: executedMethod.protocolState.method.Method.Name,
            InvocationId: invocationId,
            ResultContextJson: result,
            Server: helpers_1.convertInstance(this.instance),
            ResultMessage: err,
            Status: err ? 1 : 0,
        };
        // Send result
        this.connection.send("agm", "MethodInvocationResultMessage", resultMessage);
        delete this.invocationMessagesMap[invocationId];
    };
    ServerProtocol.prototype.nextRequestSubject = function () {
        return "req_" + (this.reqCounter++) + "_" + random_1.default();
    };
    // Sends a heartbeat
    ServerProtocol.prototype.sendHeartbeat = function () {
        this.connection.send("agm", "ServerHeartbeatMessage", this.constructHeartbeat());
    };
    // Constructs a heartbeat message
    ServerProtocol.prototype.constructHeartbeat = function () {
        return {
            PublishingInterval: HeartbeatInterval,
            Instance: helpers_1.convertInstance(this.instance),
        };
    };
    // Constructs a presence message
    ServerProtocol.prototype.constructPresence = function () {
        var methods = this.serverRepository.getList();
        return {
            PublishingInterval: PresenceInterval,
            Instance: helpers_1.convertInstance(this.instance),
            MethodDefinitions: methods.map(function (m) { return m.protocolState.method; }),
        };
    };
    // Sends a presence
    ServerProtocol.prototype.sendPresence = function () {
        this.connection.send("agm", "ServerPresenceMessage", this.constructPresence());
    };
    ServerProtocol.prototype.announceNewMethod = function () {
        var _this = this;
        // Send presence so the clients know we have it
        this.sendPresence();
        // Start sending presence regularly (if we aren't already doing it)
        if (this.presenceTimer === undefined) {
            this.presenceTimer = setInterval(function () { return _this.sendPresence(); }, PresenceInterval);
        }
    };
    // Listens for method invocations
    ServerProtocol.prototype.handleMethodInvocationMessage = function (message) {
        var subject = message.MethodRequestSubject;
        var methodList = this.serverRepository.getList();
        var method = methodList.filter(function (m) {
            return m.protocolState.method.MethodRequestSubject === subject;
        })[0];
        // Stop if the message isn't for us
        if (method === undefined) {
            return;
        }
        // TODO see if have to move this earlier - i.e. if some messages from Client don't have MethodRequestSubject
        // Check if message is stream-related : defer to streaming module
        if (this.streaming.isStreamMsg(message, method)) {
            this.streaming.processSubscriberMsg(message, method);
            return;
        }
        var invocationId = message.Context.InvocationId;
        this.invocationMessagesMap[invocationId] = message;
        var invocationArgs = {
            args: message.Context.ArgumentsJson,
            instance: helpers_1.convertInfoToInstance(message.Client),
        };
        this.callbacks.execute("onInvoked", method, invocationId, invocationArgs);
    };
    ServerProtocol.prototype.createNewMethodMessage = function (methodIdentifier, subject, stream) {
        // If we are given a string instead of an object, we presume that is the method's name:
        if (typeof methodIdentifier === "string") {
            methodIdentifier = { name: methodIdentifier };
        }
        // Set default values
        if (typeof methodIdentifier.version !== "number") {
            methodIdentifier.version = 0;
        }
        // Convert the method definition to the format that AGM requires
        return {
            Method: {
                Name: methodIdentifier.name,
                InputSignature: methodIdentifier.accepts,
                ResultSignature: methodIdentifier.returns,
                Description: methodIdentifier.description,
                DisplayName: methodIdentifier.displayName,
                Version: methodIdentifier.version,
                ObjectTypeRestrictions: methodIdentifier.objectTypes,
                Flags: stream ? 32 : undefined,
            },
            MethodRequestSubject: subject,
        };
    };
    return ServerProtocol;
}());
exports.default = ServerProtocol;
//# sourceMappingURL=server.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var STATUS_AWAITING_ACCEPT = "awaitingAccept"; // not even one server has accepted yet
var STATUS_SUBSCRIBED = "subscribed"; // at least one server has responded as 'Accepting'
var ERR_MSG_SUB_FAILED = "Subscription failed.";
var ERR_MSG_SUB_REJECTED = "Subscription rejected.";
var ON_CLOSE_MSG_SERVER_INIT = "ServerInitiated";
var ON_CLOSE_MSG_CLIENT_INIT = "ClientInitiated";
/**
 * Handles registering methods and sending data to clients
 */
var ClientStreaming = /** @class */ (function () {
    function ClientStreaming(instance, session, repository, logger) {
        var _this = this;
        this.instance = instance;
        this.session = session;
        this.repository = repository;
        this.logger = logger;
        this.subscriptionsList = {};
        this.subscriptionIdToLocalKeyMap = {};
        this.nextSubLocalKey = 0;
        this.handleErrorSubscribing = function (errorResponse) {
            var tag = errorResponse._tag;
            var subLocalKey = tag.subLocalKey;
            var pendingSub = _this.subscriptionsList[subLocalKey];
            if (typeof pendingSub !== "object") {
                return;
            }
            pendingSub.trackedServers = pendingSub.trackedServers.filter(function (server) {
                return server.serverId !== tag.serverId;
            });
            if (pendingSub.trackedServers.length <= 0) {
                clearTimeout(pendingSub.timeoutId);
                if (pendingSub.status === STATUS_AWAITING_ACCEPT) {
                    // Reject with reason
                    var reason = (typeof errorResponse.reason === "string" && errorResponse.reason !== "") ?
                        ' Publisher said "' + errorResponse.reason + '".' :
                        " No reason given.";
                    var callArgs = typeof pendingSub.arguments === "object" ?
                        JSON.stringify(pendingSub.arguments) :
                        "{}";
                    pendingSub.error({
                        message: ERR_MSG_SUB_REJECTED + reason + " Called with:" + callArgs,
                        called_with: pendingSub.arguments,
                        method: pendingSub.method.getInfoForUser(),
                    });
                }
                else if (pendingSub.status === STATUS_SUBSCRIBED) {
                    // The timeout may or may not have expired yet,
                    // but the status is 'subscribed' and trackedServers is now empty
                    _this.callOnClosedHandlers(pendingSub);
                }
                delete _this.subscriptionsList[subLocalKey];
            }
        };
        this.handleSubscribed = function (msg) {
            var subLocalKey = msg._tag.subLocalKey;
            var pendingSub = _this.subscriptionsList[subLocalKey];
            if (typeof pendingSub !== "object") {
                return;
            }
            var serverId = msg._tag.serverId;
            // Add a subscription_id to this trackedServer
            var acceptingServer = pendingSub.trackedServers
                .filter(function (server) {
                return server.serverId === serverId;
            })[0];
            if (typeof acceptingServer !== "object") {
                return;
            }
            acceptingServer.subscriptionId = msg.subscription_id;
            _this.subscriptionIdToLocalKeyMap[msg.subscription_id] = subLocalKey;
            var isFirstResponse = (pendingSub.status === STATUS_AWAITING_ACCEPT);
            pendingSub.status = STATUS_SUBSCRIBED;
            var that = _this;
            if (isFirstResponse) {
                // Pass in the subscription object
                pendingSub.success({
                    onData: function (dataCallback) {
                        if (typeof dataCallback !== "function") {
                            throw new TypeError("The data callback must be a function.");
                        }
                        pendingSub.handlers.onData.push(dataCallback);
                        if (pendingSub.handlers.onData.length === 1 && pendingSub.queued.data.length > 0) {
                            pendingSub.queued.data.forEach(function (dataItem) {
                                dataCallback(dataItem);
                            });
                        }
                    },
                    onClosed: function (closedCallback) {
                        if (typeof closedCallback !== "function") {
                            throw new TypeError("The callback must be a function.");
                        }
                        pendingSub.handlers.onClosed.push(closedCallback);
                    },
                    onFailed: function () {
                        /* Will not be implemented for browser. */
                    },
                    close: function () { return that.closeSubscription(subLocalKey); },
                    requestArguments: pendingSub.arguments,
                    serverInstance: that.repository.getServerById(serverId).getInfoForUser(),
                    stream: pendingSub.method.info,
                });
            }
        };
        this.handleEventData = function (msg) {
            var subLocalKey = _this.subscriptionIdToLocalKeyMap[msg.subscription_id];
            if (typeof subLocalKey === "undefined") {
                return;
            }
            var subscription = _this.subscriptionsList[subLocalKey];
            if (typeof subscription !== "object") {
                return;
            }
            var trackedServersFound = subscription.trackedServers.filter(function (server) {
                return server.subscriptionId === msg.subscription_id;
            });
            if (trackedServersFound.length !== 1) {
                return;
            }
            var isPrivateData = msg.oob && msg.snapshot;
            var sendingServerId = trackedServersFound[0].serverId;
            // Create the arrivedData object, new object for each handler call
            var receivedStreamData = function () {
                return {
                    data: msg.data,
                    server: _this.repository.getServerById(sendingServerId).getInfoForUser(),
                    requestArguments: subscription.arguments || {},
                    message: null,
                    private: isPrivateData,
                };
            };
            var onDataHandlers = subscription.handlers.onData;
            var queuedData = subscription.queued.data;
            if (onDataHandlers.length > 0) {
                onDataHandlers.forEach(function (callback) {
                    if (typeof callback === "function") {
                        callback(receivedStreamData());
                    }
                });
            }
            else {
                queuedData.push(receivedStreamData());
            }
        };
        this.handleSubscriptionCancelled = function (msg) {
            var subLocalKey = _this.subscriptionIdToLocalKeyMap[msg.subscription_id];
            if (typeof subLocalKey === "undefined") {
                return;
            }
            var subscription = _this.subscriptionsList[subLocalKey];
            if (typeof subscription !== "object") {
                return;
            }
            // Filter tracked servers
            var expectedNewLength = subscription.trackedServers.length - 1;
            subscription.trackedServers = subscription.trackedServers.filter(function (server) {
                if (server.subscriptionId === msg.subscription_id) {
                    subscription.queued.closers.push(server.serverId);
                    return false;
                }
                else {
                    return true;
                }
            });
            // Check if a server was actually removed
            if (subscription.trackedServers.length !== expectedNewLength) {
                return;
            }
            // Check if this was the last remaining server
            if (subscription.trackedServers.length <= 0) {
                clearTimeout(subscription.timeoutId);
                _this.callOnClosedHandlers(subscription);
                delete _this.subscriptionsList[subLocalKey];
            }
            delete _this.subscriptionIdToLocalKeyMap[msg.subscription_id];
        };
        session.on("subscribed", this.handleSubscribed);
        session.on("event", this.handleEventData);
        session.on("subscription-cancelled", this.handleSubscriptionCancelled);
    }
    ClientStreaming.prototype.subscribe = function (streamingMethod, argumentObj, targetServers, stuff, success, error) {
        var _this = this;
        if (targetServers.length === 0) {
            error({
                method: streamingMethod.getInfoForUser(),
                called_with: argumentObj,
                message: ERR_MSG_SUB_FAILED + " No available servers matched the target params.",
            });
            return;
        }
        // Note: used to find the subscription in subList. Do not confuse it with the gw-generated subscription_id
        var subLocalKey = this.getNextSubscriptionLocalKey();
        var pendingSub = this.registerSubscription(subLocalKey, streamingMethod, argumentObj, success, error, stuff.methodResponseTimeout);
        if (typeof pendingSub !== "object") {
            error({
                method: streamingMethod.getInfoForUser(),
                called_with: argumentObj,
                message: ERR_MSG_SUB_FAILED + " Unable to register the user callbacks.",
            });
            return;
        }
        targetServers.forEach(function (target) {
            var serverId = target.server.id;
            pendingSub.trackedServers.push({
                serverId: serverId,
                subscriptionId: undefined,
            });
            var msg = {
                type: "subscribe",
                server_id: serverId,
                method_id: streamingMethod.protocolState.id,
                arguments_kv: argumentObj,
            };
            _this.session.send(msg, { serverId: serverId, subLocalKey: subLocalKey })
                .then(function (m) { return _this.handleSubscribed(m); })
                .catch(function (err) { return _this.handleErrorSubscribing(err); });
        });
    };
    ClientStreaming.prototype.getNextSubscriptionLocalKey = function () {
        var current = this.nextSubLocalKey;
        this.nextSubLocalKey += 1;
        return current;
    };
    ClientStreaming.prototype.registerSubscription = function (subLocalKey, method, args, success, error, timeout) {
        var _this = this;
        this.subscriptionsList[subLocalKey] = {
            status: STATUS_AWAITING_ACCEPT,
            method: method,
            arguments: args,
            success: success,
            error: error,
            trackedServers: [],
            handlers: {
                onData: [],
                onClosed: [],
            },
            queued: {
                data: [],
                closers: [],
            },
            timeoutId: undefined,
        };
        this.subscriptionsList[subLocalKey].timeoutId = setTimeout(function () {
            if (_this.subscriptionsList[subLocalKey] === undefined) {
                return; // no such subscription
            }
            var pendingSub = _this.subscriptionsList[subLocalKey];
            if (pendingSub.status === STATUS_AWAITING_ACCEPT) {
                error({
                    method: method.getInfoForUser(),
                    called_with: args,
                    message: ERR_MSG_SUB_FAILED + " Subscription attempt timed out after " + timeout + " ms.",
                });
                // None of the target servers has answered the subscription attempt
                delete _this.subscriptionsList[subLocalKey];
            }
            else if (pendingSub.status === STATUS_SUBSCRIBED && pendingSub.trackedServers.length > 0) {
                // Clean the trackedServers, removing those without valid streamId
                pendingSub.trackedServers = pendingSub.trackedServers.filter(function (server) {
                    return (typeof server.subscriptionId !== "undefined");
                });
                delete pendingSub.timeoutId;
                if (pendingSub.trackedServers.length <= 0) {
                    // There are no open streams, some servers accepted then closed very quickly
                    //  (that's why the status changed but there's no good server with a StreamId)
                    // call the onClosed handlers
                    _this.callOnClosedHandlers(pendingSub);
                    delete _this.subscriptionsList[subLocalKey];
                }
            }
        }, timeout);
        return this.subscriptionsList[subLocalKey];
    };
    ClientStreaming.prototype.callOnClosedHandlers = function (subscription, reason) {
        var closersCount = subscription.queued.closers.length;
        var closingServerId = (closersCount > 0) ? subscription.queued.closers[closersCount - 1] : null;
        var closingServer = null;
        if (typeof closingServerId === "number") {
            closingServer = this.repository.getServerById(closingServerId).getInfoForUser();
        }
        subscription.handlers.onClosed.forEach(function (callback) {
            if (typeof callback !== "function") {
                return;
            }
            callback({
                message: reason || ON_CLOSE_MSG_SERVER_INIT,
                requestArguments: subscription.arguments,
                server: closingServer,
                stream: subscription.method,
            });
        });
    };
    ClientStreaming.prototype.closeSubscription = function (subLocalKey) {
        var _this = this;
        var subscription = this.subscriptionsList[subLocalKey];
        if (typeof subscription !== "object") {
            return;
        }
        // Tell each server that we're unsubscribing
        subscription.trackedServers.forEach(function (server) {
            if (typeof server.subscriptionId === "undefined") {
                return;
            }
            _this.session.sendFireAndForget({
                type: "unsubscribe",
                subscription_id: server.subscriptionId,
                reason_uri: "",
                reason: ON_CLOSE_MSG_CLIENT_INIT,
            });
            delete _this.subscriptionIdToLocalKeyMap[server.subscriptionId];
        });
        subscription.trackedServers = [];
        this.callOnClosedHandlers(subscription, ON_CLOSE_MSG_CLIENT_INIT);
        delete this.subscriptionsList[subLocalKey];
    };
    return ClientStreaming;
}());
exports.default = ClientStreaming;
//# sourceMappingURL=client-streaming.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var client_streaming_1 = __webpack_require__(37);
/**
 * Handles session lifetime and events
 */
var ClientProtocol = /** @class */ (function () {
    function ClientProtocol(instance, session, repository, logger) {
        var _this = this;
        this.instance = instance;
        this.session = session;
        this.repository = repository;
        this.logger = logger;
        this.callbacks = callback_registry_1.default();
        session.on("peer-added", function (msg) { return _this.handlePeerAdded(msg); });
        session.on("peer-removed", function (msg) { return _this.handlePeerRemoved(msg); });
        session.on("methods-added", function (msg) { return _this.handleMethodsAddedMessage(msg); });
        session.on("methods-removed", function (msg) { return _this.handleMethodsRemovedMessage(msg); });
        this.streaming = new client_streaming_1.default(instance, session, repository, logger);
    }
    ClientProtocol.prototype.subscribe = function (stream, args, targetServers, options, success, error) {
        this.streaming.subscribe(stream, args, targetServers, options, success, error);
    };
    ClientProtocol.prototype.invoke = function (id, method, args, target) {
        var _this = this;
        var serverId = target.id;
        var methodId = method.protocolState.id;
        var msg = {
            type: "call",
            server_id: serverId,
            method_id: methodId,
            arguments_kv: args,
        };
        // we transfer the invocation id as tag
        this.session.send(msg, { invocationId: id, serverId: serverId })
            .then(function (m) { return _this.handleResultMessage(m); })
            .catch(function (err) { return _this.handleInvocationError(err); });
    };
    ClientProtocol.prototype.onInvocationResult = function (callback) {
        this.callbacks.add("onResult", callback);
    };
    ClientProtocol.prototype.handlePeerAdded = function (msg) {
        var newPeerId = msg.new_peer_id;
        var remoteId = msg.identity;
        var pid = Number(remoteId.process);
        var serverInfo = {
            machine: remoteId.machine,
            pid: isNaN(pid) ? remoteId.process : pid,
            instance: remoteId.instance,
            application: remoteId.application,
            environment: remoteId.environment,
            region: remoteId.region,
            user: remoteId.user,
            windowId: remoteId.windowId,
            peerId: newPeerId,
        };
        this.repository.addServer(serverInfo, newPeerId);
    };
    ClientProtocol.prototype.handlePeerRemoved = function (msg) {
        var removedPeerId = msg.removed_id;
        var reason = msg.reason;
        this.repository.removeServerById(removedPeerId, reason);
    };
    ClientProtocol.prototype.handleMethodsAddedMessage = function (msg) {
        var _this = this;
        var serverId = msg.server_id;
        var methods = msg.methods;
        methods.forEach(function (method) {
            var methodInfo = {
                name: method.name,
                displayName: method.display_name,
                description: method.description,
                version: method.version,
                objectTypes: method.object_types,
                accepts: method.input_signature,
                returns: method.result_signature,
                supportsStreaming: typeof method.flags !== "undefined" ? method.flags.streaming : false,
            };
            _this.repository.addServerMethod(serverId, methodInfo, { id: method.id });
        });
    };
    ClientProtocol.prototype.handleMethodsRemovedMessage = function (msg) {
        var _this = this;
        var serverId = msg.server_id;
        var methodIdList = msg.methods;
        var server = this.repository.getServerById(serverId);
        var serverMethodKeys = Object.keys(server.methods);
        serverMethodKeys.forEach(function (methodKey) {
            var method = server.methods[methodKey];
            if (methodIdList.indexOf(method.protocolState.id) > -1) {
                _this.repository.removeServerMethod(serverId, methodKey);
            }
        });
    };
    ClientProtocol.prototype.handleResultMessage = function (msg) {
        var invocationId = msg._tag.invocationId;
        var result = msg.result;
        var serverId = msg._tag.serverId;
        var server = this.repository.getServerById(serverId);
        this.callbacks.execute("onResult", invocationId, server.getInfoForUser(), 0, result, "");
    };
    ClientProtocol.prototype.handleInvocationError = function (msg) {
        // TODO check for log level
        this.logger.debug("handle invocation error " + JSON.stringify(msg));
        var invocationId = msg._tag.invocationId;
        var serverId = msg._tag.serverId;
        var server = this.repository.getServerById(serverId);
        var message = msg.reason;
        var context = msg.context;
        this.callbacks.execute("onResult", invocationId, server.getInfoForUser(), 1, context, message);
    };
    return ClientProtocol;
}());
exports.default = ClientProtocol;
//# sourceMappingURL=client.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(41);
var client_1 = __webpack_require__(38);
function default_1(instance, connection, clientRepository, serverRepository, libConfig, getAGM) {
    var logger = libConfig.logger.subLogger("gw3-protocol");
    var resolveReadyPromise;
    var readyPromise = new Promise(function (resolve) {
        resolveReadyPromise = resolve;
    });
    // start domain join handshake
    var session = connection.domain("agm", logger.subLogger("domain"), ["subscribed"]);
    var server = new server_1.default(instance, session, clientRepository, serverRepository, logger.subLogger("server"));
    var client = new client_1.default(instance, session, clientRepository, logger.subLogger("client"));
    function handleReconnect() {
        // we're reconnecting
        logger.info("reconnected - will replay registered methods and subscriptions");
        // Client side
        clientRepository.reset();
        // add our server
        clientRepository.addServer(instance, connection.peerId);
        // TODO - re-subscribe for streams
        // server side
        var registeredMethods = serverRepository.getList();
        serverRepository.reset();
        // replay server methods
        registeredMethods.forEach(function (method) {
            var def = method.definition;
            if (method.theFunction.userCallback) {
                getAGM().register(def, method.theFunction.userCallback);
            }
            else if (method.theFunction.userCallbackAsync) {
                getAGM().registerAsync(def, method.theFunction.userCallbackAsync);
            }
        });
    }
    function handleInitialJoin() {
        clientRepository.addServer(instance, connection.peerId);
        resolveReadyPromise({
            client: client,
            server: server,
        });
        resolveReadyPromise = undefined;
    }
    session.onJoined(function (reconnect) {
        if (reconnect) {
            handleReconnect();
        }
        else {
            handleInitialJoin();
        }
    });
    session.join();
    return readyPromise;
}
exports.default = default_1;
//# sourceMappingURL=factory.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var SUBSCRIPTION_REQUEST = "onSubscriptionRequest";
var SUBSCRIPTION_ADDED = "onSubscriptionAdded";
var SUBSCRIPTION_REMOVED = "onSubscriptionRemoved";
/**
 * Handles registering methods and sending data to clients
 */
var ServerStreaming = /** @class */ (function () {
    function ServerStreaming(instance, session, repository, serverRepository, logger) {
        var _this = this;
        this.instance = instance;
        this.session = session;
        this.repository = repository;
        this.serverRepository = serverRepository;
        this.logger = logger;
        this.ERR_URI_SUBSCRIPTION_FAILED = "com.tick42.agm.errors.subscription.failure";
        this.callbacks = callback_registry_1.default();
        this.nextStreamId = 0;
        session.on("add-interest", function (msg) { _this.handleAddInterest(msg); });
        session.on("remove-interest", function (msg) { _this.handleRemoveInterest(msg); });
    }
    ServerStreaming.prototype.acceptRequestOnBranch = function (requestContext, streamingMethod, branch) {
        if (typeof branch !== "string") {
            branch = "";
        }
        if (typeof streamingMethod.protocolState.subscriptionsMap !== "object") {
            throw new TypeError("The streaming method is missing its subscriptions.");
        }
        if (!Array.isArray(streamingMethod.protocolState.branchKeyToStreamIdMap)) {
            throw new TypeError("The streaming method is missing its branches.");
        }
        var streamId = this.getStreamId(streamingMethod, branch);
        // Add a new subscription to the method
        var key = requestContext.msg.subscription_id;
        var subscription = {
            id: key,
            arguments: requestContext.arguments,
            instance: requestContext.instance,
            branchKey: branch,
            streamId: streamId,
            subscribeMsg: requestContext.msg,
        };
        streamingMethod.protocolState.subscriptionsMap[key] = subscription;
        // Inform the gw
        this.session.sendFireAndForget({
            type: "accepted",
            subscription_id: key,
            stream_id: streamId,
        });
        // Pass state above-protocol for user objects
        this.callbacks.execute(SUBSCRIPTION_ADDED, subscription, streamingMethod);
    };
    ServerStreaming.prototype.rejectRequest = function (requestContext, streamingMethod, reason) {
        if (typeof reason !== "string") {
            reason = "";
        }
        this.sendSubscriptionFailed("Subscription rejected by user. " + reason, requestContext.msg.subscription_id);
    };
    ServerStreaming.prototype.pushData = function (streamingMethod, data, branches) {
        var _this = this;
        if (typeof streamingMethod !== "object" || !Array.isArray(streamingMethod.protocolState.branchKeyToStreamIdMap)) {
            return;
        }
        // TODO validate data is a plain object
        if (typeof data !== "object") {
            throw new Error("Invalid arguments. Data must be an object.");
        }
        if (typeof branches === "string") {
            branches = [branches]; // user wants to push to single branch
        }
        else if (!Array.isArray(branches) || branches.length <= 0) {
            branches = null;
        }
        // get the StreamId's from the method's branch map
        var streamIdList = streamingMethod.protocolState.branchKeyToStreamIdMap
            .filter(function (br) {
            return (branches === null || (Boolean(br) && typeof br.key === "string" && branches.indexOf(br.key) >= 0));
        }).map(function (br) {
            return br.streamId;
        });
        streamIdList.forEach(function (streamId) {
            var publishMessage = {
                type: "publish",
                stream_id: streamId,
                // sequence: null,  // the streamingMethod might be used for this
                // snapshot: false, // ...and this
                data: data,
            };
            _this.session.sendFireAndForget(publishMessage);
        });
    };
    ServerStreaming.prototype.pushDataToSingle = function (method, subscription, data) {
        // TODO validate data is a plain object
        if (typeof data !== "object") {
            throw new Error("Invalid arguments. Data must be an object.");
        }
        var postMessage = {
            type: "post",
            subscription_id: subscription.id,
            // sequence: null,  // the streamingMethod might be used for this
            // snapshot: false, // ...and this
            data: data,
        };
        this.session.sendFireAndForget(postMessage);
    };
    ServerStreaming.prototype.closeSingleSubscription = function (streamingMethod, subscription) {
        delete streamingMethod.protocolState.subscriptionsMap[subscription.id];
        var dropSubscriptionMessage = {
            type: "drop-subscription",
            subscription_id: subscription.id,
            reason: "Server dropping a single subscription",
        };
        this.session.sendFireAndForget(dropSubscriptionMessage);
        var subscriber = subscription.instance;
        this.callbacks.execute(SUBSCRIPTION_REMOVED, subscription, streamingMethod);
    };
    ServerStreaming.prototype.closeMultipleSubscriptions = function (streamingMethod, branchKey) {
        var _this = this;
        if (typeof streamingMethod !== "object" || typeof streamingMethod.protocolState.subscriptionsMap !== "object") {
            return;
        }
        var subscriptionsToClose = Object.keys(streamingMethod.protocolState.subscriptionsMap)
            .map(function (key) {
            return streamingMethod.protocolState.subscriptionsMap[key];
        });
        if (typeof branchKey === "string") {
            subscriptionsToClose = subscriptionsToClose.filter(function (sub) {
                return sub.branchKey === branchKey;
            });
        }
        subscriptionsToClose.forEach(function (subscription) {
            delete streamingMethod.protocolState.subscriptionsMap[subscription.id];
            var drop = {
                type: "drop-subscription",
                subscription_id: subscription.id,
                reason: "Server dropping all subscriptions on stream_id: " + subscription.streamId,
            };
            _this.session.sendFireAndForget(drop);
        });
    };
    ServerStreaming.prototype.getSubscriptionList = function (streamingMethod, branchKey) {
        if (typeof streamingMethod !== "object") {
            return [];
        }
        var subscriptions = [];
        var allSubscriptions = Object.keys(streamingMethod.protocolState.subscriptionsMap)
            .map(function (key) {
            return streamingMethod.protocolState.subscriptionsMap[key];
        });
        if (typeof branchKey !== "string") {
            subscriptions = allSubscriptions;
        }
        else {
            subscriptions = allSubscriptions.filter(function (sub) {
                return sub.branchKey === branchKey;
            });
        }
        return subscriptions;
    };
    ServerStreaming.prototype.getBranchList = function (streamingMethod) {
        if (typeof streamingMethod !== "object") {
            return [];
        }
        var allSubscriptions = Object.keys(streamingMethod.protocolState.subscriptionsMap)
            .map(function (key) {
            return streamingMethod.protocolState.subscriptionsMap[key];
        });
        var keysWithDuplicates = allSubscriptions.map(function (sub) {
            var result = null;
            if (typeof sub === "object" && typeof sub.branchKey === "string") {
                result = sub.branchKey;
            }
            return result;
        });
        var seen = [];
        var branchArray = keysWithDuplicates.filter(function (bKey) {
            if (bKey === null || seen.indexOf(bKey) >= 0) {
                return false;
            }
            seen.push(bKey);
            return true;
        });
        return branchArray;
    };
    ServerStreaming.prototype.onSubAdded = function (callback) {
        this.onSubscriptionLifetimeEvent(SUBSCRIPTION_ADDED, callback);
    };
    ServerStreaming.prototype.onSubRequest = function (callback) {
        this.onSubscriptionLifetimeEvent(SUBSCRIPTION_REQUEST, callback);
    };
    ServerStreaming.prototype.onSubRemoved = function (callback) {
        this.onSubscriptionLifetimeEvent(SUBSCRIPTION_REMOVED, callback);
    };
    ServerStreaming.prototype.handleRemoveInterest = function (msg) {
        var streamingMethod = this.serverRepository.getById(msg.method_id);
        if (typeof msg.subscription_id !== "string" ||
            typeof streamingMethod !== "object" ||
            typeof streamingMethod.protocolState.subscriptionsMap[msg.subscription_id] !== "object") {
            return;
        }
        var subscription = streamingMethod.protocolState.subscriptionsMap[msg.subscription_id];
        delete streamingMethod.protocolState.subscriptionsMap[msg.subscription_id];
        this.callbacks.execute(SUBSCRIPTION_REMOVED, subscription, streamingMethod);
    };
    ServerStreaming.prototype.onSubscriptionLifetimeEvent = function (eventName, handlerFunc) {
        this.callbacks.add(eventName, handlerFunc);
    };
    // TODO there are many of these incrementing integer id's -> make a helper module
    ServerStreaming.prototype.getNextStreamId = function () {
        return this.nextStreamId++ + "";
    };
    /**
     * Processes a subscription request
     */
    ServerStreaming.prototype.handleAddInterest = function (msg) {
        var caller = this.repository.getServerById(msg.caller_id);
        var instance = (typeof caller.getInfoForUser === "function") ? caller.getInfoForUser() : null;
        // call subscriptionRequestHandler
        var requestContext = {
            msg: msg,
            arguments: msg.arguments_kv || {},
            instance: instance,
        };
        var streamingMethod = this.serverRepository.getById(msg.method_id);
        if (streamingMethod === undefined) {
            var errorMsg = "No method with id " + msg.method_id + " on this server.";
            this.sendSubscriptionFailed(errorMsg, msg.subscription_id);
            return;
        }
        if (streamingMethod.protocolState.subscriptionsMap &&
            streamingMethod.protocolState.subscriptionsMap[msg.subscription_id]) {
            this.sendSubscriptionFailed("A subscription with id " + msg.subscription_id + " already exists.", msg.subscription_id);
            return;
        }
        this.callbacks.execute(SUBSCRIPTION_REQUEST, requestContext, streamingMethod);
    };
    ServerStreaming.prototype.sendSubscriptionFailed = function (reason, subscriptionId) {
        var errorMessage = {
            type: "error",
            reason_uri: this.ERR_URI_SUBSCRIPTION_FAILED,
            reason: reason,
            request_id: subscriptionId,
        };
        this.session.sendFireAndForget(errorMessage);
    };
    ServerStreaming.prototype.getStreamId = function (streamingMethod, branchKey) {
        if (typeof branchKey !== "string") {
            branchKey = "";
        }
        var needleBranch = streamingMethod.protocolState.branchKeyToStreamIdMap.filter(function (branch) {
            return branch.key === branchKey;
        })[0];
        var streamId = (needleBranch ? needleBranch.streamId : undefined);
        if (typeof streamId !== "string" || streamId === "") {
            streamId = this.getNextStreamId();
            streamingMethod.protocolState.branchKeyToStreamIdMap.push({ key: branchKey, streamId: streamId });
        }
        return streamId;
    };
    return ServerStreaming;
}());
exports.default = ServerStreaming;
//# sourceMappingURL=server-streaming.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var server_streaming_1 = __webpack_require__(40);
var ServerProtocol = /** @class */ (function () {
    function ServerProtocol(instance, session, clientRepository, serverRepository, logger) {
        var _this = this;
        this.session = session;
        this.clientRepository = clientRepository;
        this.serverRepository = serverRepository;
        this.logger = logger;
        this.callbacks = callback_registry_1.default();
        this.streaming = new server_streaming_1.default(instance, session, clientRepository, serverRepository, logger);
        this.session.on("invoke", function (msg) { return _this.handleInvokeMessage(msg); });
    }
    ServerProtocol.prototype.createStream = function (repoMethod, success, error) {
        var isStreaming = true;
        // Utility things for this protocol
        repoMethod.protocolState.subscriptionsMap = {}; // ~subscription_id~ : {id:~, branchKey: '~', arguments: {~}, instance:{~}, etc.}
        repoMethod.protocolState.branchKeyToStreamIdMap = []; // [ {branchKey: '', streamId: 7}, {...}, ...]
        this.register(repoMethod, success, error, isStreaming);
    };
    ServerProtocol.prototype.register = function (repoMethod, success, error, isStreaming) {
        var _this = this;
        var methodDef = repoMethod.definition;
        // TODO review, why is this type of closure necessary
        repoMethod.protocolState.registrationCallbacks = {
            success: success,
            fail: error,
        };
        var flags = { streaming: isStreaming || false };
        this.logger.debug('registering method "' + methodDef.name + '"');
        var registerMsg = {
            type: "register",
            methods: [{
                    id: repoMethod.repoId,
                    name: methodDef.name,
                    display_name: methodDef.displayName,
                    description: methodDef.description,
                    version: methodDef.version,
                    flags: flags,
                    object_types: methodDef.objectTypes || methodDef.object_types,
                    input_signature: methodDef.accepts,
                    result_signature: methodDef.returns,
                    restrictions: undefined,
                }],
        };
        this.session.send(registerMsg, { methodId: repoMethod.repoId })
            .then(function (msg) { return _this.handleRegisteredMessage(msg); })
            .catch(function (err) { return _this.handleErrorRegister(err); });
    };
    ServerProtocol.prototype.onInvoked = function (callback) {
        this.callbacks.add("onInvoked", callback);
    };
    ServerProtocol.prototype.methodInvocationResult = function (method, invocationId, err, result) {
        var msg;
        if (err) {
            msg = {
                type: "error",
                request_id: invocationId,
                reason_uri: "agm.errors.client_error",
                reason: err,
                context: result,
                peer_id: undefined,
            };
        }
        else {
            msg = {
                type: "yield",
                invocation_id: invocationId,
                peer_id: this.session.peerId,
                result: result,
                request_id: undefined,
            };
        }
        this.session.sendFireAndForget(msg);
    };
    ServerProtocol.prototype.unregister = function (method) {
        var msg = {
            type: "unregister",
            methods: [method.repoId],
        };
        this.session.send(msg);
    };
    ServerProtocol.prototype.getBranchList = function (method) {
        return this.streaming.getBranchList(method);
    };
    ServerProtocol.prototype.getSubscriptionList = function (method, branchKey) {
        return this.streaming.getSubscriptionList(method, branchKey);
    };
    ServerProtocol.prototype.closeAllSubscriptions = function (method, branchKey) {
        this.streaming.closeMultipleSubscriptions(method, branchKey);
    };
    ServerProtocol.prototype.pushData = function (method, data, branches) {
        this.streaming.pushData(method, data, branches);
    };
    ServerProtocol.prototype.pushDataToSingle = function (method, subscription, data) {
        this.streaming.pushDataToSingle(method, subscription, data);
    };
    ServerProtocol.prototype.closeSingleSubscription = function (method, subscription) {
        this.streaming.closeSingleSubscription(method, subscription);
    };
    ServerProtocol.prototype.acceptRequestOnBranch = function (requestContext, method, branch) {
        this.streaming.acceptRequestOnBranch(requestContext, method, branch);
    };
    ServerProtocol.prototype.rejectRequest = function (requestContext, method, reason) {
        this.streaming.rejectRequest(requestContext, method, reason);
    };
    ServerProtocol.prototype.onSubRequest = function (callback) {
        this.streaming.onSubRequest(callback);
    };
    ServerProtocol.prototype.onSubAdded = function (callback) {
        this.streaming.onSubAdded(callback);
    };
    ServerProtocol.prototype.onSubRemoved = function (callback) {
        this.streaming.onSubRemoved(callback);
    };
    ServerProtocol.prototype.handleRegisteredMessage = function (msg) {
        var methodId = msg._tag.methodId;
        var repoMethod = this.serverRepository.getById(methodId);
        if (repoMethod && repoMethod.protocolState.registrationCallbacks) {
            this.logger.debug("registered method " + repoMethod.definition.name + " with id " + methodId);
            repoMethod.protocolState.registrationCallbacks.success();
        }
    };
    ServerProtocol.prototype.handleErrorRegister = function (msg) {
        this.logger.warn(JSON.stringify(msg));
        var methodId = msg._tag.methodId;
        var repoMethod = this.serverRepository.getById(methodId);
        if (repoMethod && repoMethod.protocolState.registrationCallbacks) {
            this.logger.debug("failed to register method " + repoMethod.definition.name + " with id " + methodId);
            repoMethod.protocolState.registrationCallbacks.fail();
        }
    };
    ServerProtocol.prototype.handleInvokeMessage = function (msg) {
        var invocationId = msg.invocation_id;
        var callerId = msg.caller_id;
        var methodId = msg.method_id;
        var args = msg.arguments_kv;
        this.logger.debug('received invocation for method id "' + methodId + '" from peer ' + callerId);
        var methodList = this.serverRepository.getList();
        var method = methodList.filter(function (m) {
            return m.repoId === methodId;
        })[0];
        // Stop if the message isn't for us
        if (method === undefined) {
            return;
        }
        var client = this.clientRepository.getServerById(callerId);
        var invocationArgs = { args: args, instance: client.getInfoForUser() };
        this.callbacks.execute("onInvoked", method, invocationId, invocationArgs);
    };
    return ServerProtocol;
}());
exports.default = ServerProtocol;
//# sourceMappingURL=server.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var subscription_1 = __webpack_require__(9);
var ServerBranch = /** @class */ (function () {
    function ServerBranch(key, protocol, repoMethod) {
        this.key = key;
        this.protocol = protocol;
        this.repoMethod = repoMethod;
    }
    ServerBranch.prototype.subscriptions = function () {
        var _this = this;
        var subList = this.protocol.server.getSubscriptionList(this.repoMethod, this.key);
        return subList.map(function (sub) {
            return new subscription_1.default(_this.protocol, _this.repoMethod, sub);
        });
    };
    ServerBranch.prototype.close = function () {
        this.protocol.server.closeAllSubscriptions(this.repoMethod, this.key);
    };
    ServerBranch.prototype.push = function (data) {
        this.protocol.server.pushData(this.repoMethod, data, [this.key]);
    };
    return ServerBranch;
}());
exports.default = ServerBranch;
//# sourceMappingURL=branch.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ServerRepository = /** @class */ (function () {
    function ServerRepository() {
        this.nextId = 0;
        this.methods = [];
    }
    ServerRepository.prototype.add = function (method) {
        if (typeof method !== "object") {
            return;
        }
        if (method.repoId !== undefined) {
            return;
        }
        // id should be a string
        method.repoId = String(this.nextId);
        this.nextId += 1;
        this.methods.push(method);
        return method;
    };
    ServerRepository.prototype.remove = function (repoId) {
        if (typeof repoId !== "string") {
            return new TypeError("Expecting a string");
        }
        this.methods = this.methods.filter(function (m) {
            return m.repoId !== repoId;
        });
    };
    ServerRepository.prototype.getById = function (id) {
        if (typeof id !== "string") {
            return undefined;
        }
        return this.methods.filter(function (m) {
            return m.repoId === id;
        })[0];
    };
    ServerRepository.prototype.getList = function () {
        return this.methods.map(function (m) { return m; });
    };
    ServerRepository.prototype.length = function () {
        return this.methods.length;
    };
    ServerRepository.prototype.reset = function () {
        this.methods = [];
    };
    return ServerRepository;
}());
exports.default = ServerRepository;
//# sourceMappingURL=repository.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Request = /** @class */ (function () {
    function Request(protocol, repoMethod, requestContext) {
        this.protocol = protocol;
        this.repoMethod = repoMethod;
        this.requestContext = requestContext;
        this.arguments = requestContext.arguments;
        this.instance = requestContext.instance;
    }
    Request.prototype.accept = function () {
        this.protocol.server.acceptRequestOnBranch(this.requestContext, this.repoMethod, "");
    };
    Request.prototype.acceptOnBranch = function (branch) {
        this.protocol.server.acceptRequestOnBranch(this.requestContext, this.repoMethod, branch);
    };
    Request.prototype.reject = function (reason) {
        this.protocol.server.rejectRequest(this.requestContext, this.repoMethod, reason);
    };
    return Request;
}());
exports.default = Request;
//# sourceMappingURL=request.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var promisify_1 = __webpack_require__(8);
var streaming_1 = __webpack_require__(47);
var stream_1 = __webpack_require__(46);
/*
 The AGM Server allows users register AGM methods.
 It exposes these methods to AGM clients (using presence messages) and listens for their invocation
 */
var Server = /** @class */ (function () {
    function Server(protocol, serverRepository, instance, configuration) {
        this.protocol = protocol;
        this.serverRepository = serverRepository;
        this.instance = instance;
        this.configuration = configuration;
        this.invocations = 0;
        // Save the reference to the metric function if it exists
        if (configuration.metrics !== undefined) {
            this.metric = configuration.metrics.numberMetric.bind(configuration.metrics);
        }
        // An array of the server's methods
        this.streaming = new streaming_1.default(protocol, this);
        this.protocol.server.onInvoked(this.onMethodInvoked.bind(this));
    }
    /**
     * Registers a new agm method
     * @param {MethodDefinition} methodDefinition
     * @param {MethodHandler} callback Callback that will be called when the AGM server is invoked
     */
    Server.prototype.register = function (methodDefinition, callback) {
        var wrappedCallbackFunction = function (context, resultCallback) {
            // get the result as direct invocation of the callback and return it using resultCallback
            try {
                var result = callback(context.args, context.instance);
                resultCallback(null, result);
            }
            catch (e) {
                resultCallback(e, e);
            }
        };
        wrappedCallbackFunction.userCallback = callback;
        this.registerCore(methodDefinition, wrappedCallbackFunction);
    };
    // registers a new async agm method (the result can be returned in async way)
    Server.prototype.registerAsync = function (methodDefinition, callback) {
        var wrappedCallback = function (context, resultCallback) {
            // invoke the callback passing success and error callbacks
            try {
                callback(context.args, context.instance, function (result) {
                    resultCallback(null, result);
                }, function (e) {
                    resultCallback(e, e);
                });
            }
            catch (e) {
                resultCallback(e, null);
            }
        };
        wrappedCallback.userCallbackAsync = callback;
        this.registerCore(methodDefinition, wrappedCallback);
    };
    // Registers a new streaming agm method
    Server.prototype.createStream = function (streamDef, callbacks, successCallback, errorCallback) {
        var _this = this;
        // in callbacks we have subscriptionRequestHandler, subscriptionAddedHandler, subscriptionRemovedHandler
        var promise = new Promise(function (resolve, reject) {
            if (typeof streamDef === "string") {
                if (streamDef === "") {
                    reject("Invalid stream name - can not be empty");
                }
                streamDef = { name: streamDef };
            }
            streamDef.supportsStreaming = true;
            // User-supplied subscription callbacks
            if (!callbacks) {
                callbacks = {};
            }
            if (typeof callbacks.subscriptionRequestHandler !== "function") {
                callbacks.subscriptionRequestHandler = function (request) {
                    request.accept();
                };
            }
            var repoMethod = {
                definition: streamDef,
                streamCallbacks: callbacks,
                protocolState: {},
            };
            // Add the method
            _this.serverRepository.add(repoMethod);
            _this.protocol.server.createStream(repoMethod, function () {
                _this.metric("Registered methods", _this.serverRepository.length());
                var streamFrontObject = new stream_1.default(_this.protocol, repoMethod, _this);
                repoMethod.stream = streamFrontObject;
                resolve(streamFrontObject);
            }, function (err) {
                _this.serverRepository.remove(repoMethod.repoId);
                reject(err);
            });
        });
        return promisify_1.default(promise, successCallback, errorCallback);
    };
    // TODO add success/fail here and at gw1+2 implementations?
    // Unregisters a previously registered AGM method
    Server.prototype.unregister = function (methodFilter) {
        var _this = this;
        if (typeof methodFilter === "string") {
            methodFilter = { name: methodFilter };
        }
        var methodsToBeRemoved = this.serverRepository.getList().filter(function (method) {
            return _this.containsProps(methodFilter, method.definition);
        });
        // update repository
        methodsToBeRemoved.forEach(function (method) {
            _this.serverRepository.remove(method.repoId);
            _this.protocol.server.unregister(method);
        });
        this.metric("Registered methods", this.serverRepository.length());
    };
    // Core method for registering agm method
    Server.prototype.registerCore = function (methodDefinition, theFunction) {
        var _this = this;
        // transform the definition
        if (typeof methodDefinition === "string") {
            methodDefinition = { name: methodDefinition };
        }
        // Add the method ()
        var repoMethod = this.serverRepository.add({
            definition: methodDefinition,
            theFunction: theFunction,
            protocolState: {},
        });
        this.protocol.server.register(repoMethod, function () {
            _this.metric("Registered methods", _this.serverRepository.length());
        }, function () {
            _this.serverRepository.remove(repoMethod.repoId);
        });
    };
    /**
     * Checks if all properties of filter match properties in object
     */
    Server.prototype.containsProps = function (filter, object) {
        var match = true;
        Object.keys(filter).forEach(function (prop) {
            if (filter[prop] !== object[prop]) {
                match = false;
            }
        });
        return match;
    };
    Server.prototype.onMethodInvoked = function (methodToExecute, invocationId, invocationArgs) {
        var _this = this;
        this.metric("Invocations count", this.invocations++);
        if (!methodToExecute) {
            return;
        }
        // Execute it and save the result
        methodToExecute.theFunction(invocationArgs, function (err, result) {
            if (err) {
                // handle error case
                if (typeof err.message === "string") {
                    err = err.message;
                }
                else if (typeof err !== "string") {
                    err = "<>";
                }
            }
            // The AGM library only transfers objects. If the result is not an object, put it in one
            if (!result || typeof result !== "object" || result.constructor === Array) {
                result = { _result: result };
            }
            _this.protocol.server.methodInvocationResult(methodToExecute, invocationId, err, result);
        });
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var subscription_1 = __webpack_require__(9);
var branch_1 = __webpack_require__(42);
var ServerStream = /** @class */ (function () {
    function ServerStream(protocol, repoMethod, server) {
        this.protocol = protocol;
        this.repoMethod = repoMethod;
        this.server = server;
        this.def = repoMethod.definition;
    }
    Object.defineProperty(ServerStream.prototype, "name", {
        get: function () { return this.def.name; },
        enumerable: true,
        configurable: true
    });
    ServerStream.prototype.branches = function (key) {
        var _this = this;
        var bList = this.protocol.server.getBranchList(this.repoMethod);
        if (key) {
            if (bList.indexOf(key) > -1) {
                return new branch_1.default(key, this.protocol, this.repoMethod);
            }
            return undefined;
        }
        else {
            return bList.map(function (branchKey) {
                return new branch_1.default(branchKey, _this.protocol, _this.repoMethod);
            });
        }
    };
    ServerStream.prototype.subscriptions = function () {
        var _this = this;
        var subList = this.protocol.server.getSubscriptionList(this.repoMethod);
        return subList.map(function (sub) {
            return new subscription_1.default(_this.protocol, _this.repoMethod, sub);
        });
    };
    Object.defineProperty(ServerStream.prototype, "definition", {
        get: function () {
            var def2 = this.def;
            return {
                accepts: def2.accepts,
                description: def2.description,
                displayName: def2.displayName,
                name: def2.name,
                objectTypes: def2.objectTypes,
                returns: def2.returns,
                supportsStreaming: def2.supportsStreaming,
            };
        },
        enumerable: true,
        configurable: true
    });
    ServerStream.prototype.close = function () {
        this.protocol.server.closeAllSubscriptions(this.repoMethod);
        this.server.unregister(this.repoMethod.definition);
    };
    ServerStream.prototype.push = function (data, branches) {
        if (typeof branches !== "string" && !Array.isArray(branches) && branches !== undefined) {
            throw new Error("invalid branches should be string or string array");
        }
        // TODO validate if is plain object
        if (typeof data !== "object") {
            throw new Error("Invalid arguments. Data must be an object.");
        }
        this.protocol.server.pushData(this.repoMethod, data, branches);
    };
    return ServerStream;
}());
exports.default = ServerStream;
//# sourceMappingURL=stream.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var subscription_1 = __webpack_require__(9);
var request_1 = __webpack_require__(44);
/*
 The streaming module defines the user objects relevant to the streaming api, and
 attaches to relevant events exposed by the protocol.
 */
var ServerStreaming = /** @class */ (function () {
    function ServerStreaming(protocol, server) {
        var _this = this;
        this.protocol = protocol;
        this.server = server;
        /** Attach to stream 'events' */
        protocol.server.onSubRequest(function (rc, rm) { return _this.handleSubRequest(rc, rm); });
        protocol.server.onSubAdded(function (sub, rm) { return _this.handleSubAdded(sub, rm); });
        protocol.server.onSubRemoved(function (sub, rm) { return _this.handleSubRemoved(sub, rm); });
    }
    ServerStreaming.prototype.handleSubRequest = function (requestContext, repoMethod) {
        if (!(repoMethod &&
            repoMethod.streamCallbacks &&
            typeof repoMethod.streamCallbacks.subscriptionRequestHandler === "function")) {
            return;
        }
        var request = new request_1.default(this.protocol, repoMethod, requestContext);
        repoMethod.streamCallbacks.subscriptionRequestHandler(request);
    };
    ServerStreaming.prototype.handleSubAdded = function (subscription, repoMethod) {
        if (!(repoMethod &&
            repoMethod.streamCallbacks &&
            typeof repoMethod.streamCallbacks.subscriptionAddedHandler === "function")) {
            return;
        }
        var sub = new subscription_1.default(this.protocol, repoMethod, subscription);
        repoMethod.streamCallbacks.subscriptionAddedHandler(sub);
    };
    ServerStreaming.prototype.handleSubRemoved = function (subscription, repoMethod) {
        if (!(repoMethod &&
            repoMethod.streamCallbacks &&
            typeof repoMethod.streamCallbacks.subscriptionRemovedHandler === "function")) {
            return;
        }
        var sub = new subscription_1.default(this.protocol, repoMethod, subscription);
        repoMethod.streamCallbacks.subscriptionRemovedHandler(sub);
    };
    return ServerStreaming;
}());
exports.default = ServerStreaming;
//# sourceMappingURL=streaming.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {
Object.defineProperty(exports, "__esModule", { value: true });
var shortid_1 = __webpack_require__(7);
var pjson = __webpack_require__(13);
function default_1(configuration, ext, hc, glue42gd) {
    if (typeof window !== "undefined") {
        global = global || window; // ... Safari WebView
    }
    global = global || {}; // ... a bit paranoid
    var uid = shortid_1.generate();
    // when searching for a configuration value check the following chain until the value is resolved:
    //
    // 1. global.GLUE_CONFIG            - a way to override user preferences. Use case is GLUE Mobile
    // 2. userConfig                    - user configuration
    // 3. global.GLUE_DEFAULT_CONFIG    - a way to dynamically override hard coded defaults
    // 4. hardDefaults                  - glue.js hard coded defaults
    var masterConfig = global.GLUE_CONFIG || {};
    var dynamicDefaults = global.GLUE_DEFAULT_CONFIG || {};
    var hardDefaults = getHardDefaults();
    var metricsIdentity = {
        system: getConfigProp("metrics", "system"),
        service: getConfigProp("metrics", "service"),
        instance: getConfigProp("metrics", "instance")
    };
    function getMetrics() {
        return ifNotFalse(getConfigProp("metrics"), {
            identity: metricsIdentity
        });
    }
    function getGateway() {
        function detectNode() {
            // Only Node.JS has a process variable that is of [[Class]] process
            try {
                return Object.prototype.toString.call(global.process) === "[object process]";
            }
            catch (e) {
                // catch all
            }
            return false;
        }
        var force = getConfigProp("gateway", "force");
        var gw = hc === undefined || force;
        if (gw) {
            var gwConfig = getConfigProp("gateway");
            var protocolVersion = getConfigProp("gateway", "protocolVersion");
            var reconnectInterval = getConfigProp("gateway", "reconnectInterval");
            var reconnectAttempts = getConfigProp("gateway", "reconnectAttempts");
            var ws = gwConfig.ws;
            var http = gwConfig.http;
            var inproc = gwConfig.inproc;
            // if not we will select endpoint for him
            if (!ws && !http && !inproc) {
                if (detectNode() || ("WebSocket" in window && window.WebSocket.CLOSING === 2)) {
                    // if in node, or we have WebSockets use ws
                    ws = getConfigProp("gateway", "ws");
                }
                else {
                    // fallback to http
                    http = getConfigProp("gateway", "http");
                }
            }
            var windowId = void 0;
            var pid = void 0;
            if (hc) {
                windowId = hc.windowId;
            }
            else if (typeof glue42gd !== "undefined") {
                windowId = glue42gd.windowId;
                pid = glue42gd.pid;
            }
            else if (detectNode()) {
                pid = process.pid;
            }
            return {
                identity: {
                    application: getApplication(),
                    windowId: windowId,
                    process: pid,
                },
                reconnectInterval: reconnectInterval,
                ws: ws,
                http: http,
                gw: inproc,
                protocolVersion: protocolVersion,
                reconnectAttempts: reconnectAttempts,
                force: true,
                replaySpecs: getConfigProp("gateway", "replaySpecs")
            };
        }
        return {};
    }
    function getLogger() {
        return getConfigProp("logger");
    }
    function getAgm() {
        return ifNotFalse(configuration.agm, {
            instance: {
                application: getApplication()
            }
        });
    }
    function getApplication() {
        return getConfigProp("application");
    }
    function getAuth() {
        return getConfigProp("auth");
    }
    function getHardDefaults() {
        function getMetricsDefaults() {
            var documentTitle = typeof document !== "undefined" ? document.title : "unknown";
            // check for empty titles
            documentTitle = documentTitle || "none";
            if (typeof hc === "undefined") {
                return {
                    system: "Connect.Browser",
                    service: configuration.application || documentTitle,
                    instance: "~" + uid
                };
            }
            if (typeof hc.metricsFacade.getIdentity !== "undefined") {
                var identity = hc.metricsFacade.getIdentity();
                return {
                    system: identity.system,
                    service: identity.service,
                    instance: identity.instance
                };
            }
            // backward compatibility for HC <= 1.60
            return {
                system: "HtmlContainer." + hc.containerName,
                service: "JS." + hc.browserWindowName,
                instance: "~" + hc.machineName
            };
        }
        function getGatewayDefaults() {
            function isSecureConnection(protocolVersion) {
                // GW2 and lower in JPM don't have SSL certificates
                if (protocolVersion && protocolVersion <= 2) {
                    return false;
                }
                if (typeof window !== "undefined" && window.location) {
                    return window.location.protocol !== "http:";
                }
                // Defaults to secure for node env.
                return true;
            }
            // GD2
            var defaultProtocol = 1;
            var gatewayURL = "localhost:22037";
            // build URI based on if running in secure connection
            var isSSL = isSecureConnection(defaultProtocol);
            var defaultWs = isSSL ? "wss://" + gatewayURL : "ws://" + gatewayURL;
            var defaultHttp = isSSL ? "https://" + gatewayURL : "http://" + gatewayURL;
            if (glue42gd) {
                // GD3
                defaultProtocol = 3;
                defaultWs = glue42gd.gwURL;
            }
            return {
                ws: defaultWs,
                http: defaultHttp,
                protocolVersion: defaultProtocol,
                reconnectInterval: 1000
            };
        }
        function getDefaultApplicationName() {
            if (hc) {
                return hc.containerName + "." + hc.browserWindowName;
            }
            if (glue42gd) {
                return glue42gd.appName;
            }
            if (typeof window !== "undefined" && typeof document !== "undefined") {
                return (window.agm_application || document.title) + uid;
            }
            else {
                return "NodeJS" + uid;
            }
        }
        function getDefaultLogger() {
            return {
                publish: "off",
                console: "info",
                metrics: "off",
            };
        }
        return {
            application: getDefaultApplicationName(),
            metrics: getMetricsDefaults(),
            agm: {},
            gateway: getGatewayDefaults(),
            logger: getDefaultLogger(),
        };
    }
    function getConfigProp(prop1, prop2) {
        var masterConfigProp1 = masterConfig[prop1];
        var userProp1 = configuration[prop1];
        var dynamicDefaultsProp1 = dynamicDefaults[prop1];
        var hardDefaultsProp1 = hardDefaults[prop1];
        if (prop2) {
            if (masterConfigProp1 && masterConfigProp1[prop2] !== undefined) {
                return masterConfigProp1[prop2];
            }
            if (userProp1 && userProp1[prop2] !== undefined) {
                return userProp1[prop2];
            }
            if (dynamicDefaultsProp1 && dynamicDefaultsProp1[prop2] !== undefined) {
                return dynamicDefaultsProp1[prop2];
            }
            if (hardDefaultsProp1 && hardDefaultsProp1[prop2] !== undefined) {
                return hardDefaultsProp1[prop2];
            }
        }
        else {
            if (masterConfigProp1 !== undefined) {
                return masterConfigProp1;
            }
            if (userProp1 !== undefined) {
                return userProp1;
            }
            if (dynamicDefaultsProp1 !== undefined) {
                return dynamicDefaultsProp1;
            }
            if (hardDefaultsProp1 !== undefined) {
                return hardDefaultsProp1;
            }
        }
        return undefined;
    }
    function ifNotFalse(what, then) {
        if (typeof what === "boolean" && !what) {
            return undefined;
        }
        else {
            return then;
        }
    }
    return {
        identity: metricsIdentity,
        application: getApplication(),
        auth: getAuth(),
        logger: getLogger(),
        connection: getGateway(),
        metrics: getMetrics(),
        agm: getAgm(),
        version: ext.version || pjson.version,
        libs: ext.libs
    };
}
exports.default = default_1;
//# sourceMappingURL=config.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(14)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MessageReplayerImpl = /** @class */ (function () {
    function MessageReplayerImpl(specs) {
        this.specsNames = [];
        this.messages = {};
        this.subs = {};
        this.subsRefCount = {};
        this.specs = {};
        for (var _i = 0, specs_1 = specs; _i < specs_1.length; _i++) {
            var spec = specs_1[_i];
            this.specs[spec.name] = spec;
            this.specsNames.push(spec.name);
        }
    }
    MessageReplayerImpl.prototype.init = function (connection) {
        var _this = this;
        this.connection = connection;
        for (var _i = 0, _a = this.specsNames; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var _loop_1 = function (type) {
                var refCount = this_1.subsRefCount[type];
                if (!refCount) {
                    refCount = 0;
                }
                refCount += 1;
                this_1.subsRefCount[type] = refCount;
                if (refCount > 1) {
                    return "continue";
                }
                var sub = connection.on("glue-core", type, function (msg) { return _this.processMessage(type, msg); });
                this_1.subs[type] = sub;
            };
            var this_1 = this;
            for (var _b = 0, _c = this.specs[name_1].types; _b < _c.length; _b++) {
                var type = _c[_b];
                _loop_1(type);
            }
        }
    };
    MessageReplayerImpl.prototype.processMessage = function (type, msg) {
        if (this.isDone || !msg) {
            return;
        }
        for (var _i = 0, _a = this.specsNames; _i < _a.length; _i++) {
            var name_2 = _a[_i];
            if (this.specs[name_2].types.indexOf(type) !== -1) {
                var messages = this.messages[name_2] || [];
                this.messages[name_2] = messages;
                messages.push(msg);
            }
        }
    };
    MessageReplayerImpl.prototype.drain = function (name, callback) {
        if (callback) {
            (this.messages[name] || []).forEach(callback);
        }
        delete this.messages[name];
        for (var _i = 0, _a = this.specs[name].types; _i < _a.length; _i++) {
            var type = _a[_i];
            this.subsRefCount[type] -= 1;
            if (this.subsRefCount[type] <= 0) {
                this.connection.off(this.subs[type]);
                delete this.subs[type];
                delete this.subsRefCount[type];
            }
        }
        delete this.specs[name];
        if (!this.specs.length) {
            this.isDone = true;
        }
    };
    return MessageReplayerImpl;
}());
exports.MessageReplayerImpl = MessageReplayerImpl;
//# sourceMappingURL=MessageReplayer.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __webpack_require__(11);
var MessageReplayer_1 = __webpack_require__(49);
var GW3ConnectionImpl = /** @class */ (function (_super) {
    __extends(GW3ConnectionImpl, _super);
    function GW3ConnectionImpl(settings) {
        var _this = _super.call(this, settings) || this;
        if (settings.replaySpecs &&
            settings.replaySpecs.length) {
            _this.replayer = new MessageReplayer_1.MessageReplayerImpl(settings.replaySpecs);
        }
        return _this;
    }
    GW3ConnectionImpl.prototype.init = function (transport, protocol) {
        _super.prototype.init.call(this, transport, protocol);
        if (this.replayer) {
            this.replayer.init(this);
        }
        this.gw3Protocol = protocol;
    };
    GW3ConnectionImpl.prototype.toAPI = function () {
        var that = this;
        var superAPI = _super.prototype.toAPI.call(this);
        return {
            domain: that.domain.bind(that),
            get peerId() { return that.peerId; },
            get token() { return that.token; },
            get info() { return that.info; },
            get resolvedIdentity() { return that.resolvedIdentity; },
            get availableDomains() { return that.availableDomains; },
            get gatewayToken() { return that.gatewayToken; },
            get replayer() { return that.replayer; },
            on: superAPI.on,
            send: superAPI.send,
            off: superAPI.off,
            login: superAPI.login,
            logout: superAPI.logout,
            loggedIn: superAPI.loggedIn,
            connected: superAPI.connected,
            disconnected: superAPI.disconnected,
            authToken: that.authToken.bind(that),
            get protocolVersion() { return superAPI.protocolVersion; },
        };
    };
    GW3ConnectionImpl.prototype.domain = function (domain, logger, successMessages, errorMessages) {
        return this.gw3Protocol.domain(domain, logger, successMessages, errorMessages);
    };
    GW3ConnectionImpl.prototype.authToken = function () {
        return this.gw3Protocol.authToken();
    };
    return GW3ConnectionImpl;
}(connection_1.default));
exports.default = GW3ConnectionImpl;
//# sourceMappingURL=gw3Connection.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __webpack_require__(11);
var gw3_1 = __webpack_require__(54);
var hc_1 = __webpack_require__(56);
var ws_1 = __webpack_require__(60);
var gw3Connection_1 = __webpack_require__(50);
var gw1_1 = __webpack_require__(52);
var hc_2 = __webpack_require__(57);
var gw2_1 = __webpack_require__(53);
var inproc_1 = __webpack_require__(59);
var http_1 = __webpack_require__(58);
/**
 * Check readme.md for detailed description
 */
exports.default = (function (settings) {
    settings = settings || {};
    settings.reconnectAttempts = settings.reconnectAttempts || 10;
    settings.reconnectInterval = settings.reconnectInterval || 500;
    var connection = new connection_1.default(settings);
    var logger = settings.logger;
    if (!logger) {
        throw new Error("please pass a logger object");
    }
    // by default use gw1 protocol and hc transport
    var protocol = new hc_1.default();
    var transport = new hc_2.default();
    var outsideHC = global.htmlContainer === undefined || settings.force;
    if (outsideHC) {
        if (settings.gw && settings.gw.facade && settings.gw.token && settings.protocolVersion === 3) {
            transport = new inproc_1.default(settings.gw.token, settings.gw.facade, logger.subLogger("inproc"));
        }
        else if (settings.ws !== undefined) {
            transport = new ws_1.default(settings, logger.subLogger("ws"));
        }
        else if (settings.http !== undefined) {
            transport = new http_1.default(settings, logger.subLogger("http"));
        }
        else {
            throw new Error("No connection information specified");
        }
        // if running in the browser - let's check which protocol version user wants
        if (settings.protocolVersion === 3) {
            var gw3Connection = new gw3Connection_1.default(settings);
            var gw3Port = gw3_1.default(gw3Connection, settings, logger.subLogger("gw3"));
            gw3Connection.init(transport, gw3Port);
            return gw3Connection.toAPI();
        }
        else if (settings.protocolVersion === 2) {
            protocol = new gw2_1.default(connection);
        }
        else {
            protocol = new gw1_1.default();
        }
    }
    connection.init(transport, protocol);
    return connection.toAPI();
});
//# sourceMappingURL=main.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connection to gateway V1 - the one that runs on the desktop without authentication
 */
var GW1Protocol = /** @class */ (function () {
    function GW1Protocol() {
    }
    GW1Protocol.prototype.processStringMessage = function (message) {
        // GW1 messages have the following structure
        // {message: object, type: string}
        // so type is outside the message
        var messageObj = JSON.parse(message);
        return {
            msg: messageObj.message,
            msgType: messageObj.type,
        };
    };
    GW1Protocol.prototype.createStringMessage = function (product, type, message, id) {
        return JSON.stringify({
            type: type,
            message: message,
            id: id,
        });
    };
    GW1Protocol.prototype.login = function (message) {
        return Promise.resolve({ application: undefined });
    };
    GW1Protocol.prototype.logout = function () {
        // Do nothing
    };
    GW1Protocol.prototype.loggedIn = function (callback) {
        callback();
        return function () {
            // do nothing
        };
    };
    GW1Protocol.prototype.processObjectMessage = function (message) {
        throw new Error("not supported");
    };
    GW1Protocol.prototype.createObjectMessage = function (product, type, message, id) {
        throw new Error("not supported");
    };
    return GW1Protocol;
}());
exports.default = GW1Protocol;
//# sourceMappingURL=gw1.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MESSAGE_LOGIN = "LOGIN";
var MESSAGE_LOGIN_RESPONSE = "LOGIN_RESPONSE";
var MESSAGE_LOGIN_TOKEN = "LOGIN_TOKEN";
var MESSAGE_LOGOUT = "LOGOUT";
var MESSAGE_SEND = "SEND";
// Connection to gateway V2 - gw1 +  authentication
var GW2Protocol = /** @class */ (function () {
    function GW2Protocol(connection) {
        this.connection = connection;
    }
    GW2Protocol.prototype.processStringMessage = function (message) {
        // GW2 messages have the following structure
        // {message: object, type: string}
        // so type is outside the message
        // This is the same protocol sa GW1 except for SEND messages :(
        // They have different structure because of authentication
        var messageObj = JSON.parse(message);
        if (messageObj.type === MESSAGE_SEND) {
            // GW2 introduces a new
            return {
                msg: messageObj.data.message,
                msgType: messageObj.data.type,
            };
        }
        return {
            msg: messageObj,
            msgType: messageObj.type,
        };
    };
    GW2Protocol.prototype.createStringMessage = function (product, type, message, id) {
        // GW2 message madness bellow
        // LOGIN and LOGOUT are kind of special
        if (type === MESSAGE_LOGIN) {
            return JSON.stringify(message);
        }
        if (type === MESSAGE_LOGOUT) {
            return JSON.stringify({ type: "LOGOUT" });
        }
        return JSON.stringify({
            type: MESSAGE_SEND,
            sessionCookie: this.sessionCookie,
            data: {
                type: type,
                message: message,
                id: id,
            },
        });
    };
    GW2Protocol.prototype.login = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request;
            if (message.token) {
                request = {
                    token: message.token,
                    type: MESSAGE_LOGIN_TOKEN,
                };
            }
            else if (message.username) {
                request = {
                    user: message.username,
                    password: message.password,
                    type: MESSAGE_LOGIN,
                };
            }
            else {
                throw new Error("Invalid auth message" + JSON.stringify(message));
            }
            var lrSubs = _this.connection.on("", MESSAGE_LOGIN_RESPONSE, function (response) {
                _this.connection.off(lrSubs);
                if (response && !response.errorMessage) {
                    _this.sessionCookie = response.sessionCookie;
                    resolve(response);
                }
                else {
                    reject(response);
                }
            });
            _this.connection.send("", "LOGIN", request);
        });
    };
    GW2Protocol.prototype.logout = function () {
        this.connection.send("", "LOGOUT", {});
    };
    GW2Protocol.prototype.loggedIn = function (callback) {
        callback();
        return function () {
            // do nothing
        };
    };
    GW2Protocol.prototype.processObjectMessage = function (message) {
        throw new Error("not supported");
    };
    GW2Protocol.prototype.createObjectMessage = function (product, type, message, id) {
        throw new Error("not supported");
    };
    return GW2Protocol;
}());
exports.default = GW2Protocol;
//# sourceMappingURL=gw2.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gw3Domain_1 = __webpack_require__(55);
var callback_registry_1 = __webpack_require__(0);
function default_1(connection, settings, logger) {
    var datePrefix = "#T42_DATE#";
    var datePrefixLen = datePrefix.length;
    var dateMinLen = datePrefixLen + 1; // prefix + at least one char (1970/01/01 = 0)
    var datePrefixFirstChar = datePrefix[0];
    var registry = callback_registry_1.default();
    var globalDomain;
    /* Flag indicating if the user is currently logged in */
    var isLoggedIn = false;
    /*
     * If true(default) the user wants to be connected.
     * If the user explicitly calls logout this will become false.
     * This is used to determine if it should retry trying to login.
     */
    var shouldTryLogin = true;
    /* True only if this is the initial login attempt. */
    var initialLogin = true;
    var initialLoginAttempts = 3;
    var initialLoginAttemptsInterval = 500;
    var sessions = [];
    var loginConfig;
    connection.disconnected(handleDisconnected.bind(this));
    ping();
    function processStringMessage(message) {
        var msg = JSON.parse(message, function (key, value) {
            // check for date - we have custom protocol for dates
            if (typeof value !== "string") {
                return value;
            }
            if (value.length < dateMinLen) {
                return value;
            }
            if (value[0] !== datePrefixFirstChar) {
                return value;
            }
            if (value.substring(0, datePrefixLen) !== datePrefix) {
                return value;
            }
            try {
                var milliseconds = parseInt(value.substring(datePrefixLen, value.length), 10);
                if (isNaN(milliseconds)) {
                    return value;
                }
                return new Date(milliseconds);
            }
            catch (ex) {
                return value;
            }
        });
        return {
            msg: msg,
            msgType: msg.type,
        };
    }
    function createStringMessage(product, type, message, id) {
        var oldToJson = Date.prototype.toJSON;
        try {
            Date.prototype.toJSON = function () {
                return datePrefix + this.getTime();
            };
            var result = JSON.stringify(message);
            return result;
        }
        finally {
            Date.prototype.toJSON = oldToJson;
        }
    }
    function processObjectMessage(message) {
        if (!message.type) {
            throw new Error("Object should have type property");
        }
        return {
            msg: message,
            msgType: message.type,
        };
    }
    function createObjectMessage(product, type, message, id) {
        return message;
    }
    function login(config) {
        logger.debug("logging in...");
        loginConfig = config;
        if (!loginConfig) {
            // in case of no auth send empty username and password
            loginConfig = { username: "", password: "" };
        }
        shouldTryLogin = true;
        return new Promise(function (resolve, reject) {
            var authentication = {};
            connection.gatewayToken = config.gatewayToken;
            if (connection.gatewayToken) {
                authentication.method = "gateway-token";
                authentication.token = connection.gatewayToken;
            }
            else if (config.token) {
                authentication.method = "access-token";
                authentication.token = config.token;
            }
            else if (config.username) {
                authentication.method = "secret";
                authentication.login = config.username;
                authentication.secret = config.password;
            }
            else {
                throw new Error("invalid auth message" + JSON.stringify(config));
            }
            var helloMsg = {
                type: "hello",
                identity: settings.identity,
                authentication: authentication,
            };
            globalDomain = gw3Domain_1.default("global", connection, logger, [
                "welcome",
                "token"
            ]);
            var sendOptions = { skipPeerId: true };
            if (initialLogin) {
                sendOptions.retryInterval = settings.reconnectInterval;
                sendOptions.maxRetries = settings.reconnectAttempts;
            }
            globalDomain.send(helloMsg, undefined, sendOptions)
                .then(function (msg) {
                // we've logged in once - set this to false for the rest of the lifetime
                initialLogin = false;
                logger.debug("login successful with PeerId " + msg.peer_id);
                connection.peerId = msg.peer_id;
                connection.resolvedIdentity = msg.resolved_identity;
                connection.availableDomains = msg.available_domains;
                if (msg.options) {
                    connection.token = msg.options.access_token;
                    connection.info = msg.options.info;
                }
                setLoggedIn(true);
                resolve(msg.resolved_identity);
            })
                .catch(function (err) {
                logger.error("error sending hello message - " + err);
                reject(err);
            });
        });
    }
    function logout() {
        logger.debug("logging out...");
        shouldTryLogin = false;
        // go through all sessions and leave the corresponding domain
        sessions.forEach(function (session) {
            session.leave();
        });
    }
    function loggedIn(callback) {
        if (isLoggedIn) {
            callback();
        }
        return registry.add("onLoggedIn", callback);
    }
    function domain(domainName, domainLogger, successMessages, errorMessages) {
        var session = sessions.filter(function (s) { return s.domain === domainName; })[0];
        if (!session) {
            session = gw3Domain_1.default(domainName, connection, domainLogger, successMessages, errorMessages);
            sessions.push(session);
        }
        return session;
    }
    function handleDisconnected() {
        setLoggedIn(false);
        var tryToLogin = shouldTryLogin;
        if (tryToLogin && initialLogin) {
            if (initialLoginAttempts <= 0) {
                return;
            }
            initialLoginAttempts--;
        }
        logger.debug("disconnected - will try new login?" + shouldTryLogin);
        if (shouldTryLogin) {
            connection.login(loginConfig)
                .catch(function () {
                setTimeout(handleDisconnected, 1000);
            });
        }
    }
    function setLoggedIn(value) {
        isLoggedIn = value;
        if (isLoggedIn) {
            registry.execute("onLoggedIn");
        }
    }
    // ping the server every 30 sec
    function ping() {
        if (isLoggedIn) {
            connection.send("", "", { type: "ping" });
        }
        setTimeout(ping, 30 * 1000);
    }
    function authToken() {
        var createTokenReq = {
            type: "create-token"
        };
        return globalDomain.send(createTokenReq)
            .then(function (res) {
            return res.token;
        });
    }
    return {
        processStringMessage: processStringMessage,
        createStringMessage: createStringMessage,
        createObjectMessage: createObjectMessage,
        processObjectMessage: processObjectMessage,
        login: login,
        logout: logout,
        loggedIn: loggedIn,
        domain: domain,
        authToken: authToken,
    };
}
exports.default = default_1;
//# sourceMappingURL=gw3.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callbackRegistry = __webpack_require__(0);
var shortid_1 = __webpack_require__(7);
/**
 * Handles domain session lifetime and events for a given connection/domain pair
 */
function default_1(domain, connection, logger, successMessages, errorMessages) {
    if (domain == null) {
        domain = "global";
    }
    var isJoined = false;
    var tryReconnecting = false;
    /** holds latest options passed to join - used when doing reconnects */
    var _latestOptions;
    // #deleteme TODO: verify this gets properly set to true
    var _connectionOn = false;
    var callbacks = callbackRegistry();
    // attach event handlers to connection
    connection.disconnected(handleConnectionDisconnected);
    connection.loggedIn(handleConnectionLoggedIn);
    connection.on(domain, "success", function (msg) { return handleSuccessMessage(msg); });
    connection.on(domain, "error", function (msg) { return handleErrorMessage(msg); });
    connection.on(domain, "result", function (msg) { return handleSuccessMessage(msg); });
    if (successMessages) {
        successMessages.forEach(function (sm) {
            connection.on(domain, sm, function (msg) { return handleSuccessMessage(msg); });
        });
    }
    if (errorMessages) {
        errorMessages.forEach(function (sm) {
            connection.on(domain, sm, function (msg) { return handleErrorMessage(msg); });
        });
    }
    var requestsMap = {};
    function join(options) {
        _latestOptions = options;
        return new Promise(function (resolve, reject) {
            if (isJoined) {
                resolve();
            }
            var joinPromise;
            if (domain === "global") {
                joinPromise = _connectionOn ? Promise.resolve({}) : Promise.reject("not connected to gateway");
            }
            else {
                logger.debug("joining " + domain);
                var joinMsg = {
                    type: "join",
                    destination: domain,
                    domain: "global",
                    options: options,
                };
                // #deleteme TODO: what happens if multiple clients try to open the same domain?
                // e.g. contexts
                joinPromise = send(joinMsg);
            }
            joinPromise
                .then(function () {
                handleJoined();
                resolve();
            })
                .catch(function (err) {
                logger.debug("error joining " + domain + " domain: " + JSON.stringify(err));
                reject(err);
            });
        });
    }
    // terminology: join vs leave (domain), connect vs login vs disconnect (to/from GW)
    function leave() {
        if (domain === "global") {
            return;
        }
        logger.debug("stopping session " + domain + "...");
        var leaveMsg = {
            type: "leave",
            destination: domain,
            domain: "global",
        };
        // #deleteme - handling
        send(leaveMsg).then(function () {
            isJoined = false;
            callbacks.execute("onLeft");
        });
    }
    function handleJoined() {
        logger.debug("joined " + domain);
        isJoined = true;
        var wasReconnect = tryReconnecting;
        tryReconnecting = false;
        callbacks.execute("onJoined", wasReconnect);
    }
    function handleConnectionDisconnected() {
        _connectionOn = false;
        logger.warn("connection is down");
        isJoined = false;
        tryReconnecting = true;
        callbacks.execute("onLeft", { disconnected: true });
    }
    function handleConnectionLoggedIn() {
        _connectionOn = true;
        if (tryReconnecting) {
            logger.info("connection is now up - trying to reconnect...");
            join(_latestOptions);
        }
    }
    function onJoined(callback) {
        if (isJoined) {
            callback(false);
        }
        return callbacks.add("onJoined", callback);
    }
    function onLeft(callback) {
        if (!isJoined) {
            callback();
        }
        return callbacks.add("onLeft", callback);
    }
    function handleErrorMessage(msg) {
        if (domain !== msg.domain) {
            return;
        }
        var requestId = msg.request_id;
        var entry = requestsMap[requestId];
        if (!entry) {
            return;
        }
        entry.error(msg);
    }
    function handleSuccessMessage(msg) {
        if (msg.domain !== domain) {
            return;
        }
        var requestId = msg.request_id;
        var entry = requestsMap[requestId];
        if (!entry) {
            return;
        }
        entry.success(msg);
    }
    function getNextRequestId() {
        return shortid_1.generate();
    }
    /**
     * Send a message
     * @param msg message to send
     * @param tag a custom object (tag) - it will be transferred to success/error callback
     * @param success
     * @param error
     */
    function send(msg, tag, options) {
        options = options || {};
        // Allows function caller to override request_id
        msg.request_id = msg.request_id || getNextRequestId();
        // Allows function caller to override domain (join/leave messages are in global domain)
        msg.domain = msg.domain || domain;
        if (!options.skipPeerId) {
            msg.peer_id = connection.peerId;
        }
        var requestId = msg.request_id;
        return new Promise(function (resolve, reject) {
            requestsMap[requestId] = {
                success: function (successMsg) {
                    delete requestsMap[requestId];
                    successMsg._tag = tag;
                    resolve(successMsg);
                },
                error: function (errorMsg) {
                    logger.warn("GW error - " + JSON.stringify(errorMsg) + " for request " + JSON.stringify(msg));
                    delete requestsMap[requestId];
                    errorMsg._tag = tag;
                    reject(errorMsg);
                },
            };
            connection
                .send(domain, domain, msg, undefined, options)
                .catch(function (err) {
                requestsMap[requestId].error({ err: err });
            });
        });
    }
    function sendFireAndForget(msg) {
        // Allows function caller to override request_id
        msg.request_id = msg.request_id ? msg.request_id : getNextRequestId();
        // Allows function caller to override domain (join/leave messages are in global domain)
        msg.domain = msg.domain || domain;
        msg.peer_id = connection.peerId;
        connection.send(domain, domain, msg);
    }
    return {
        join: join,
        leave: leave,
        onJoined: onJoined,
        onLeft: onLeft,
        send: send,
        sendFireAndForget: sendFireAndForget,
        on: function (type, callback) {
            connection.on(domain, type, callback);
        },
        loggedIn: function (callback) { return connection.loggedIn(callback); },
        connected: function (callback) { return connection.connected(callback); },
        disconnected: function (callback) { return connection.disconnected(callback); },
        get peerId() {
            return connection.peerId;
        },
        get domain() {
            return domain;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=gw3Domain.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connection to HC
 */
var HCProtocol = /** @class */ (function () {
    function HCProtocol() {
    }
    HCProtocol.prototype.processStringMessage = function (message) {
        var messageObj = JSON.parse(message);
        return {
            msg: messageObj,
            msgType: messageObj.type,
        };
    };
    HCProtocol.prototype.createStringMessage = function (product, type, message, id) {
        return JSON.stringify(message);
    };
    HCProtocol.prototype.login = function (message) {
        return Promise.resolve({ application: undefined });
    };
    HCProtocol.prototype.logout = function () {
        // Do nothing
    };
    HCProtocol.prototype.loggedIn = function (callback) {
        callback();
        return function () {
            // do nothing
        };
    };
    HCProtocol.prototype.processObjectMessage = function (message) {
        throw new Error("not supported");
    };
    HCProtocol.prototype.createObjectMessage = function (product, type, message, id) {
        throw new Error("not supported");
    };
    return HCProtocol;
}());
exports.default = HCProtocol;
//# sourceMappingURL=hc.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connection to HtmlContainer
 */
var HCTransport = /** @class */ (function () {
    function HCTransport() {
        this.connectionId = Math.floor(1e10 * Math.random()).toString();
    }
    HCTransport.prototype.send = function (message, product, type) {
        if (product === "metrics") {
            global.htmlContainer.metricsFacade.send(type, message);
        }
        else if (product === "log") {
            global.htmlContainer.loggingFacade.send(type, message);
        }
        return Promise.resolve(undefined);
    };
    HCTransport.prototype.onConnectedChanged = function (callback) {
        // always connected;
        callback(true);
    };
    HCTransport.prototype.onMessage = function (callback) {
        // dummy implementation
        // hc transports are one way only
    };
    HCTransport.prototype.close = function () {
        // do nothing
    };
    HCTransport.prototype.open = function () {
        // do nothing
    };
    return HCTransport;
}());
exports.default = HCTransport;
//# sourceMappingURL=hc.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var HTTPTransport = /** @class */ (function () {
    function HTTPTransport(settings, logger) {
        this.registry = callback_registry_1.default();
        this.url = settings.http;
        // polling interval in ms, default is 1 second
        this.interval = settings.httpInterval || 1000;
        this.logger = logger;
        this.logger.debug("Attempting connection to Gateway via HTTP with url " + this.url + " on interval " + this.interval + " ms");
    }
    HTTPTransport.prototype.close = function () {
        // Do nothing
    };
    HTTPTransport.prototype.open = function () {
        // do nothing
    };
    HTTPTransport.prototype.onConnectedChanged = function (callback) {
        callback(true);
    };
    HTTPTransport.prototype.onMessage = function (callback) {
        this.registry.add("onMessage", callback);
    };
    HTTPTransport.prototype.send = function (msg) {
        this.httpPost(this.url, msg);
        return Promise.resolve(undefined);
    };
    /**
     * Polls data from a given url on some interval
     * @param url       Base server url. A sequence url param may be added based on the seq param
     * @param interval  Interval (in ms) between polling requestts
     * @param seq       Next sequence number we should ask for (if 0 the server will return the last known message)
     * @param ondata    Data callback
     */
    HTTPTransport.prototype.poll = function (url, interval, seq, ondata) {
        var _this = this;
        // construct the get Url - if seq != 0 add as url param to get
        // only messages after this sequence
        var getUrl = url;
        if (seq !== 0) {
            getUrl = url + "?sequence=" + seq + "&no-cache=" + new Date().getTime();
        }
        // create a request
        var xmlhttp = this.createCORSRequest("GET", getUrl, function () {
            if (seq === 0) {
                _this.logger.debug("Connected to Gateway on " + url);
            }
            var message = JSON.parse(xmlhttp.responseText);
            // the server returns the number of the next sequence that we must query for
            var nextSeq = message.nextSequence;
            // call user callback
            ondata(message.data);
            // re-schedule
            setTimeout(function () {
                _this.poll(url, interval, nextSeq, ondata);
            }, _this.interval);
        });
        xmlhttp.onerror = function (ev) {
            // tslint:disable-next-line:no-console
            console.log("Error polling data from http server " + getUrl + " -  + " + ev);
            // re-schedule
            setTimeout(function () {
                _this.poll(url, interval, seq, ondata);
            }, _this.interval);
        };
        xmlhttp.send();
    };
    /**
     * POSTs a message to a given url
     */
    HTTPTransport.prototype.httpPost = function (url, message) {
        // create a request
        var xmlhttp = this.createCORSRequest("POST", url);
        xmlhttp.send(message);
    };
    /**
     * Creates CORS request (cross domain requests) for different browsers - XMLHttpRequest withCredentials
     * for Chrome and FF and XDomainRequest for IE
     */
    HTTPTransport.prototype.createCORSRequest = function (method, url, resultCallback) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
            if (typeof resultCallback !== "undefined") {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        resultCallback();
                    }
                };
            }
        }
        else if (typeof global.XDomainRequest !== "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new global.XDomainRequest();
            xhr.open(method, url);
            if (typeof resultCallback !== "undefined") {
                xhr.onload = resultCallback;
            }
        }
        else {
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }
        return xhr;
    };
    return HTTPTransport;
}());
exports.default = HTTPTransport;
//# sourceMappingURL=http.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
/**
 * Inproc transport for GW3
 */
var Inproc = /** @class */ (function () {
    function Inproc(token, gw, logger) {
        this.registry = callback_registry_1.default();
        this.gw = gw;
        this.gwToken = token;
        this.logger = logger;
        this.connectToken = this.gw.connect(this.gwToken, this.messageHandler.bind(this));
    }
    Object.defineProperty(Inproc.prototype, "isObjectBasedTransport", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Inproc.prototype.sendObject = function (msg) {
        this.logger.debug(JSON.stringify(msg));
        this.gw.send(this.connectToken, msg);
        return Promise.resolve(undefined);
    };
    Inproc.prototype.send = function (msg, product, type) {
        return Promise.reject("not supported");
    };
    Inproc.prototype.onMessage = function (callback) {
        return this.registry.add("onMessage", callback);
    };
    Inproc.prototype.onConnectedChanged = function (callback) {
        callback(true);
    };
    Inproc.prototype.close = function () {
        // DO NOTHING
    };
    Inproc.prototype.open = function () {
        // do nothing
    };
    Inproc.prototype.messageHandler = function (msg) {
        if (this.logger.consoleLevel() === "trace") {
            this.logger.debug(JSON.stringify(msg));
        }
        this.registry.execute("onMessage", msg);
    };
    return Inproc;
}());
exports.default = Inproc;
//# sourceMappingURL=inproc.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(0);
var WebSocket = isNode() ? __webpack_require__(22) : global.WebSocket;
function isNode() {
    // Only Node.JS has a process variable that is of [[Class]] process
    try {
        return Object.prototype.toString.call(global.process) === "[object process]";
    }
    catch (e) {
        return false;
    }
}
var WS = /** @class */ (function () {
    function WS(settings, logger) {
        /**
         * If the flag is true the connection should keep trying to connect.
         * If false the user explicitly closed it and it should not reconnect
         */
        this._running = true;
        this._initied = false;
        this._registry = callback_registry_1.default();
        this._settings = settings;
        this._logger = logger;
    }
    WS.prototype.onMessage = function (callback) {
        return this._registry.add("onMessage", callback);
    };
    // Create a function for sending a message
    WS.prototype.send = function (msg, product, type, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            options = options || {};
            _this.waitForSocketConnection(function () {
                try {
                    _this._ws.send(msg);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            }, reject, options.maxRetries, options.retryInterval);
        });
    };
    WS.prototype.open = function () {
        this._running = true;
    };
    WS.prototype.close = function () {
        this._running = false;
        this._ws.close();
    };
    WS.prototype.onConnectedChanged = function (callback) {
        return this._registry.add("onConnectedChanged", callback);
    };
    WS.prototype.initiateSocket = function () {
        var _this = this;
        this._logger.debug("initiating _ws to " + this._settings.ws + "...");
        this._ws = new WebSocket(this._settings.ws);
        this._ws.onerror = function (err) {
            _this.notifyStatusChanged(false, err);
        };
        this._ws.onclose = function () {
            _this._logger.debug("_ws closed");
            _this.notifyStatusChanged(false);
        };
        // Log on connection
        this._ws.onopen = function () {
            _this._logger.debug("_ws opened");
            _this.notifyStatusChanged(true);
        };
        // Attach handler
        this._ws.onmessage = function (message) {
            _this._registry.execute("onMessage", message.data);
        };
    };
    // Holds callback execution until socket connection is established.
    WS.prototype.waitForSocketConnection = function (callback, failed, retriesLeft, retryInterval) {
        var _this = this;
        if (!callback) {
            callback = function () { };
        }
        if (!failed) {
            failed = function () { };
        }
        if (retryInterval === undefined) {
            retryInterval = this._settings.reconnectInterval;
        }
        if (retriesLeft !== undefined) {
            if (retriesLeft === 0) {
                failed("wait for socket on " + this._settings.ws + " failed - no more retries left");
                return;
            }
            this._logger.debug("will retry " + retriesLeft + " more times (every " + retryInterval + " ms)");
        }
        // check if we're still running
        if (!this._running) {
            failed("wait for socket on " + this._settings.ws + " failed - socket closed by user");
            return;
        }
        if (!this._ws || this._ws.readyState > 1) {
            // > 1 means closing or closed
            this.initiateSocket();
        }
        else if (this._ws.readyState === 1) {
            return callback();
        }
        setTimeout(function () {
            var retries = retriesLeft === undefined ? undefined : retriesLeft - 1;
            _this.waitForSocketConnection(callback, failed, retries, retryInterval);
        }, retryInterval); // wait X milliseconds for the connection...
    };
    WS.prototype.notifyStatusChanged = function (status, reason) {
        this._registry.execute("onConnectedChanged", status, reason);
    };
    return WS;
}());
exports.default = WS;
//# sourceMappingURL=ws.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var connection = {
    protocolVersion: -1,
    send: function (product, type, message, id, options) {
        return Promise.resolve(undefined);
    },
    on: function (product, type, messageHandler) {
        return { type: "1", id: 1 };
    },
    off: function (info) {
    },
    login: function (message) {
        return undefined;
    },
    logout: function () {
    },
    loggedIn: function (callback) {
        return undefined;
    },
    connected: function (callback) {
        return undefined;
    },
    disconnected: function (callback) {
        return undefined;
    },
};
exports.default = connection;
//# sourceMappingURL=dummyConnection.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel = /** @class */ (function () {
    function LogLevel() {
    }
    LogLevel.canPublish = function (level, restriction) {
        var levelIdx = LogLevel.order.indexOf(level);
        var restrictionIdx = LogLevel.order.indexOf(restriction);
        return levelIdx >= restrictionIdx;
    };
    LogLevel.off = "off";
    LogLevel.trace = "trace";
    LogLevel.debug = "debug";
    LogLevel.info = "info";
    LogLevel.warn = "warn";
    LogLevel.error = "error";
    LogLevel.order = [LogLevel.trace, LogLevel.debug, LogLevel.info, LogLevel.warn, LogLevel.error, LogLevel.off];
    return LogLevel;
}());
exports.default = LogLevel;
//# sourceMappingURL=levels.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var levels_1 = __webpack_require__(62);
var LoggerImpl = /** @class */ (function () {
    function LoggerImpl(name, parent, metricSystem) {
        this._subloggers = [];
        this._name = name;
        this._parent = parent;
        if (parent) {
            this._path = parent.path + "." + name;
        }
        else {
            this._path = name;
        }
        this._loggerFullName = "[" + this._path + "]";
        // create metric system
        if (typeof metricSystem !== "undefined") {
            this.metricsLevel("warn", metricSystem.subSystem(name));
        }
    }
    Object.defineProperty(LoggerImpl.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoggerImpl.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    LoggerImpl.prototype.subLogger = function (name) {
        // Check if the sublogger is already created
        var existingSub = this._subloggers.filter(function (subLogger) {
            return subLogger.name === name;
        })[0];
        if (existingSub !== undefined) {
            return existingSub;
        }
        // Check if the name isn't the same as one of the parent properties
        Object.keys(this).forEach(function (key) {
            if (key === name) {
                throw new Error("This sub logger name is not allowed.");
            }
        });
        var sub = new LoggerImpl(name, this);
        // add sublogger to subloggers array
        this._subloggers.push(sub);
        return sub;
    };
    LoggerImpl.prototype.publishLevel = function (level) {
        if (level !== null && level !== undefined) {
            this._publishLevel = level;
        }
        return this._publishLevel || this._parent.publishLevel();
    };
    LoggerImpl.prototype.consoleLevel = function (level) {
        if (level !== null && level !== undefined) {
            this._consoleLevel = level;
        }
        return this._consoleLevel || this._parent.consoleLevel();
    };
    LoggerImpl.prototype.metricsLevel = function (level, metricsSystem) {
        if (level !== null && level !== undefined) {
            this._metricLevel = level;
        }
        if (metricsSystem !== undefined) {
            if (typeof metricsSystem === "object" && typeof metricsSystem.objectMetric === "function") {
                this._metricSystem = metricsSystem;
            }
            else {
                throw new Error("Please specify metric system");
            }
        }
        return this._metricLevel || this._parent.metricsLevel();
    };
    LoggerImpl.prototype.log = function (message, level) {
        this.publishMessage(level || levels_1.default.info, message);
    };
    LoggerImpl.prototype.trace = function (message) {
        this.log(message, levels_1.default.trace);
    };
    LoggerImpl.prototype.debug = function (message) {
        this.log(message, levels_1.default.debug);
    };
    LoggerImpl.prototype.info = function (message) {
        this.log(message, levels_1.default.info);
    };
    LoggerImpl.prototype.warn = function (message) {
        this.log(message, levels_1.default.warn);
    };
    LoggerImpl.prototype.error = function (message) {
        this.log(message, levels_1.default.error);
    };
    LoggerImpl.prototype.toAPIObject = function () {
        var that = this;
        return {
            name: this.name,
            subLogger: this.subLogger.bind(that),
            publishLevel: this.publishLevel.bind(that),
            consoleLevel: this.consoleLevel.bind(that),
            metricsLevel: this.metricsLevel.bind(that),
            log: this.log.bind(that),
            trace: this.trace.bind(that),
            debug: this.debug.bind(that),
            info: this.info.bind(that),
            warn: this.warn.bind(that),
            error: this.error.bind(that),
        };
    };
    LoggerImpl.prototype.publishMessage = function (level, message) {
        // Retrieve logger name and levels
        var loggerName = this._loggerFullName;
        // Add stack trace if the message is an error
        if (level === levels_1.default.error) {
            var e = new Error();
            if (e.stack) {
                message = message + "\n" +
                    (e.stack.split("\n").slice(3).join("\n"));
            }
        }
        // Publish in console
        if (levels_1.default.canPublish(level, this.consoleLevel())) {
            var toPrint = loggerName + ": " + message;
            switch (level) {
                case levels_1.default.trace:
                    // tslint:disable-next-line:no-console
                    console.trace(toPrint);
                    break;
                case levels_1.default.debug:
                    if (console.debug) {
                        // tslint:disable-next-line:no-console
                        console.debug(toPrint);
                    }
                    else {
                        // tslint:disable-next-line:no-console
                        console.log(toPrint);
                    }
                    break;
                case levels_1.default.info:
                    // tslint:disable-next-line:no-console
                    console.info(toPrint);
                    break;
                case levels_1.default.warn:
                    // tslint:disable-next-line:no-console
                    console.warn(toPrint);
                    break;
                case levels_1.default.error:
                    // tslint:disable-next-line:no-console
                    console.error(toPrint);
                    break;
            }
        }
        // Publish in file
        if (levels_1.default.canPublish(level, this.publishLevel())) {
            LoggerImpl.GetConnection().send("log", "LogMessage", {
                instance: LoggerImpl.Instance,
                level: levels_1.default.order.indexOf(level),
                logger: loggerName,
                message: message,
            });
        }
        // Publish in metrics
        if (levels_1.default.canPublish(level, this.metricsLevel())) {
            if (this._metricSystem !== undefined) {
                this._metricSystem.objectMetric("LogMessage", {
                    Level: level,
                    Logger: loggerName,
                    Message: message,
                    Time: new Date(),
                });
                if (level === levels_1.default.error) {
                    this._metricSystem.setState(100, message);
                }
            }
        }
    };
    return LoggerImpl;
}());
exports.default = LoggerImpl;
//# sourceMappingURL=logger.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(63);
exports.default = (function (settings) {
    // Convert instance to string, throw exceptions if it is not full
    var identity = settings.identity;
    if (!identity) {
        throw new Error("identity is missing");
    }
    var identityStr = identity.system + "\\" + identity.service + "\\" + identity.instance;
    logger_1.default.Instance = identityStr;
    logger_1.default.GetConnection = settings.getConnection;
    var mainLogger = new logger_1.default("main");
    mainLogger.publishLevel(settings.publish || "off");
    mainLogger.consoleLevel(settings.console || "info");
    mainLogger.metricsLevel(settings.metrics || "off");
    var apiLogger = mainLogger.toAPIObject();
    return apiLogger;
});
//# sourceMappingURL=main.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var glue_1 = __webpack_require__(12);
if (typeof window !== "undefined") {
    window.GlueCore = glue_1.default;
}
// add default library for ES6 modules
glue_1.default.default = glue_1.default;
module.exports = glue_1.default;
//# sourceMappingURL=main.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function addressMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var system = parent;
    var repo = parent.repo;
    var conflation = definition.conflation;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.ADDRESS;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        conflation: conflation,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = addressMetric;
//# sourceMappingURL=address.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function countMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || 0;
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.COUNT;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    function incrementBy(num) {
        update(_value + num);
    }
    function increment() {
        incrementBy(1);
    }
    function decrement() {
        incrementBy(-1);
    }
    function decrementBy(num) {
        incrementBy(num * -1);
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        conflation: conflation,
        get path() {
            return _path;
        },
        get value() {
            return _value;
        },
        update: update,
        getValueType: getValueType,
        incrementBy: incrementBy,
        increment: increment,
        decrement: decrement,
        decrementBy: decrementBy,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = countMetric;
//# sourceMappingURL=count.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function numberMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _path = parent.path.slice(0);
    var _value = value || 0;
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.NUMBER;
    _path.push(parent.name);
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    function incrementBy(num) {
        update(_value + num);
    }
    function increment() {
        incrementBy(1);
    }
    function decrement() {
        incrementBy(-1);
    }
    function decrementBy(num) {
        incrementBy(num * -1);
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        conflation: conflation,
        get value() {
            return _value;
        },
        type: type,
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
        incrementBy: incrementBy,
        increment: increment,
        decrement: decrement,
        decrementBy: decrementBy,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = numberMetric;
//# sourceMappingURL=number.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metric_types_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(2);
function objectMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.OBJECT;
    function update(newValue) {
        mergeValues(newValue);
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    function mergeValues(values) {
        return Object.keys(_value).forEach(function (k) {
            if (typeof values[k] !== "undefined") {
                _value[k] = values[k];
            }
        });
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        conflation: conflation,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = objectMetric;
//# sourceMappingURL=object.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function rateMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.RATE;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        conflation: conflation,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = rateMetric;
//# sourceMappingURL=rate.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function statisticsMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.STATISTICS;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        conflation: conflation,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = statisticsMetric;
//# sourceMappingURL=statistics.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function stringMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.STRING;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        conflation: conflation,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        type: type,
        update: update,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = stringMetric;
//# sourceMappingURL=string.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function timespanMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.TIMESPAN;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function start() {
        update(true);
    }
    function stop() {
        update(false);
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        conflation: conflation,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        start: start,
        stop: stop,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = timespanMetric;
//# sourceMappingURL=timespan.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var metric_types_1 = __webpack_require__(1);
function timestampMetric(definition, parent, transport, value) {
    helpers_1.default.validate(definition, parent, transport);
    var _transport = transport;
    var _value = value || "";
    var _path = parent.path.slice(0);
    _path.push(parent.name);
    var name = definition.name;
    var description = definition.description;
    var period = definition.period;
    var resolution = definition.resolution;
    var conflation = definition.conflation;
    var system = parent;
    var repo = parent.repo;
    var id = parent.path + "/" + name;
    var type = metric_types_1.default.TIMESTAMP;
    function update(newValue) {
        _value = newValue;
        _transport.updateMetric(me);
        // NOTE: Optionally return the updated metric here.
    }
    function now() {
        update(new Date());
    }
    function getValueType() {
        return undefined;
    }
    var me = {
        name: name,
        description: description,
        period: period,
        resolution: resolution,
        system: system,
        repo: repo,
        id: id,
        type: type,
        conflation: conflation,
        get value() {
            return _value;
        },
        get path() {
            return _path;
        },
        update: update,
        now: now,
        getValueType: getValueType,
    };
    _transport.createMetric(me);
    return me;
}
exports.default = timestampMetric;
//# sourceMappingURL=timestamp.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var serializer_1 = __webpack_require__(76);
function default_1(connection, config) {
    var DEFAULT_HEARTBEAT_INTERVAL = 3000;
    if (!connection || typeof connection !== "object") {
        throw new Error("Connection is required parameter");
    }
    var _connection = connection;
    var heartbeatInterval = config.heartbeatInterval || DEFAULT_HEARTBEAT_INTERVAL;
    var send = function (type, message) {
        _connection.send("metrics", type, message);
    };
    function sendFull(repo) {
        if (!repo.root) {
            return;
        }
        if (repo.root.subSystems.length === 0) {
            return;
        }
        sendFullSystem(repo.root);
    }
    function sendFullSystem(system) {
        createSystem(system);
        system.subSystems.forEach(function (sub) {
            sendFullSystem(sub);
        });
        system.metrics.forEach(function (metric) {
            createMetric(metric);
        });
    }
    function heartbeat(repo) {
        send("HeartbeatMetrics", {
            publishingInterval: heartbeatInterval,
            instance: repo.instance,
        });
    }
    function createSystem(system) {
        if (system.parent !== undefined) {
            send("CreateMetricSystem", {
                id: system.id,
                instance: system.repo.instance,
                definition: {
                    name: system.name,
                    description: system.description,
                    path: system.path,
                },
            });
        }
    }
    function updateSystem(system, state) {
        send("UpdateMetricSystem", {
            id: system.id,
            instance: system.repo.instance,
            state: state,
        });
    }
    function createMetric(metric) {
        send("CreateMetric", serializer_1.default(metric));
    }
    function updateMetric(metric) {
        send("UpdateMetric", serializer_1.default(metric));
    }
    function init(repo) {
        heartbeat(repo);
        _connection.on("metrics", "MetricsSnapshotRequest", function (instanceInfo) {
            if (instanceInfo.Instance !== repo.instance) {
                return;
            }
            sendFull(repo);
        });
        if (typeof window !== "undefined" && typeof window.htmlContainer === "undefined") {
            setInterval(function () {
                heartbeat(repo);
            }, heartbeatInterval);
        }
    }
    var me = {
        createSystem: createSystem,
        updateSystem: updateSystem,
        createMetric: createMetric,
        updateMetric: updateMetric,
        init: init,
    };
    return me;
}
exports.default = default_1;
//# sourceMappingURL=gw1.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metric_types_1 = __webpack_require__(1);
function metricToMessage(metric) {
    var definition = getMetricDefinition(metric.name, metric.value, metric.path, metric.type, metric.description, metric.period, metric.resolution, metric.conflation);
    function getMetricDefinition(name, value, path, type, description, period, resolution, conflation) {
        var _definition = {
            name: name,
            description: description,
            type: type ? type : getTypeFromValue(value),
            path: path,
            resolution: resolution,
            period: period,
            conflation: conflation,
        };
        if (_definition.type === metric_types_1.default.OBJECT) {
            _definition.Composite = Object.keys(value).reduce(function (arr, key) {
                var val = value[key];
                arr.push(getMetricDefinition(key, val, path));
                return arr;
            }, []);
        }
        return _definition;
    }
    function serializeValue(value, _metric) {
        if (value && value.constructor === Date) {
            return {
                value: {
                    type: _valueTypes.indexOf("date"),
                    value: value.valueOf(),
                    isArray: false,
                },
            };
        }
        if (typeof value === "object") {
            return {
                CompositeValue: Object.keys(value).reduce(function (arr, key) {
                    var val = serializeValue(value[key]);
                    val.InnerMetricName = key;
                    arr.push(val);
                    return arr;
                }, []),
            };
        }
        var valueType = _metric ? _metric.getValueType() : undefined;
        valueType = valueType || _valueTypes.indexOf(typeof value);
        return {
            value: {
                type: valueType,
                value: value,
                isArray: false,
            },
        };
    }
    function getTypeFromValue(value) {
        var typeAsString = value.constructor === Date ? "timestamp" : typeof value;
        switch (typeAsString) {
            case "string":
                return metric_types_1.default.STRING;
            case "number":
                return metric_types_1.default.NUMBER;
            case "timestamp":
                return metric_types_1.default.TIMESTAMP;
            case "object":
                return metric_types_1.default.OBJECT;
        }
        return 0;
    }
    var _valueTypes = [
        "boolean",
        "int",
        "number",
        "long",
        "string",
        "date",
        "object",
    ];
    return {
        id: metric.id,
        instance: metric.repo.instance,
        definition: definition,
        value: serializeValue(metric.value, metric),
    };
}
exports.default = metricToMessage;
//# sourceMappingURL=serializer.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var serializer_1 = __webpack_require__(78);
function default_1(connection, config) {
    if (!connection || typeof connection !== "object") {
        throw new Error("Connection is required parameter");
    }
    var joinPromise;
    var session;
    var init = function (repo) {
        var resolveReadyPromise;
        joinPromise = new Promise(function (resolve) {
            resolveReadyPromise = resolve;
        });
        session = connection.domain("metrics", config.logger);
        session.onJoined(function (reconnect) {
            if (!reconnect) {
                resolveReadyPromise();
                resolveReadyPromise = undefined;
            }
            // Creating root state metric
            var rootStateMetric = {
                name: "/State",
                type: "object",
                composite: {
                    Description: {
                        type: "string",
                        description: "",
                    },
                    Value: {
                        type: "number",
                        description: "",
                    },
                },
                description: "System state",
                context: {},
            };
            var defineRootMetricsMsg = {
                type: "define",
                metrics: [rootStateMetric],
            };
            session.send(defineRootMetricsMsg);
            if (reconnect) {
                replayRepo(repo);
            }
        });
        session.join(config.identity);
    };
    var replayRepo = function (repo) {
        replaySystem(repo.root);
    };
    var replaySystem = function (system) {
        // replay system
        createSystem(system);
        // replay all metrics in the system
        system.metrics.forEach(function (m) {
            createMetric(m);
        });
        // replay all sub-systems
        system.subSystems.forEach(function (ss) {
            replaySystem(ss);
        });
    };
    var createSystem = function (system) {
        if (system.parent === undefined) {
            return;
        }
        joinPromise.then(function () {
            var metric = {
                name: serializer_1.normalizeMetricName(system.path.join("/") + "/" + system.name + "/State"),
                type: "object",
                composite: {
                    Description: {
                        type: "string",
                        description: "",
                    },
                    Value: {
                        type: "number",
                        description: "",
                    },
                },
                description: "System state",
                context: {},
            };
            var createMetricsMsg = {
                type: "define",
                metrics: [metric],
            };
            session.send(createMetricsMsg);
        });
    };
    var updateSystem = function (system, state) {
        joinPromise.then(function () {
            var shadowedUpdateMetric = {
                type: "publish",
                values: [{
                        name: serializer_1.normalizeMetricName(system.path.join("/") + "/" + system.name + "/State"),
                        value: {
                            Description: state.description,
                            Value: state.state,
                        },
                        timestamp: Date.now(),
                    }],
            };
            session.send(shadowedUpdateMetric);
            var stateObj = serializer_1.composeMsgForRootStateMetric(system);
            var rootMetric = {
                type: "publish",
                peer_id: connection.peerId,
                values: [{
                        name: "/State",
                        value: {
                            Description: stateObj.description,
                            Value: stateObj.value,
                        },
                        timestamp: Date.now(),
                    }],
            };
            session.send(rootMetric);
        });
    };
    var createMetric = function (metric) {
        joinPromise.then(function () {
            var m = serializer_1.serializeMetric(metric);
            var createMetricsMsg = {
                type: "define",
                metrics: [m],
            };
            session.send(createMetricsMsg);
            if (typeof metric.value !== "undefined") {
                updateMetric(metric);
            }
        });
    };
    var updateMetric = function (metric) {
        joinPromise.then(function () {
            var value = serializer_1.getMetricValueByType(metric);
            var publishMetricsMsg = {
                type: "publish",
                values: [{
                        name: serializer_1.normalizeMetricName(metric.path.join("/") + "/" + metric.name),
                        value: value,
                        timestamp: Date.now(),
                    }],
            };
            session.send(publishMetricsMsg);
        });
    };
    return {
        init: init,
        createSystem: createSystem,
        updateSystem: updateSystem,
        createMetric: createMetric,
        updateMetric: updateMetric,
    };
}
exports.default = default_1;
//# sourceMappingURL=gw3.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metric_types_1 = __webpack_require__(1);
function getMetricTypeByValue(metric) {
    if (metric.value.constructor === Date || metric.type === metric_types_1.default.TIMESPAN || metric.type === metric_types_1.default.TIMESTAMP) {
        return "timestamp";
    }
    else if (typeof metric.value === "number") {
        return "number";
    }
    else if (typeof metric.value === "string" || metric.type === metric_types_1.default.RATE) {
        return "string";
    }
    else if (typeof metric.value === "object") {
        return "object";
    }
}
function getTypeByValue(value) {
    if (value.constructor === Date) {
        return "timestamp";
    }
    else if (typeof value === "number") {
        return "number";
    }
    else if (typeof value === "string") {
        return "string";
    }
    else if (typeof value === "object") {
        return "object";
    }
    else {
        return "string";
    }
}
function serializeMetric(metric) {
    var serializedMetrics = {};
    var type = getMetricTypeByValue(metric);
    if (type === "object") {
        var values = Object.keys(metric.value).reduce(function (memo, key) {
            var innerType = getTypeByValue(metric.value[key]);
            if (innerType === "object") {
                var composite = defineNestedComposite(metric.value[key]);
                memo[key] = {
                    type: "object",
                    description: "",
                    context: {},
                    composite: composite,
                };
            }
            else {
                memo[key] = {
                    type: innerType,
                    description: "",
                    context: {},
                };
            }
            return memo;
        }, {});
        serializedMetrics.composite = values;
    }
    serializedMetrics.name = normalizeMetricName(metric.path.join("/") + "/" + metric.name);
    serializedMetrics.type = type;
    serializedMetrics.description = metric.description;
    serializedMetrics.context = {};
    return serializedMetrics;
}
exports.serializeMetric = serializeMetric;
function defineNestedComposite(values) {
    return Object.keys(values).reduce(function (memo, key) {
        var type = getTypeByValue(values[key]);
        if (type === "object") {
            memo[key] = {
                type: "object",
                description: "",
                context: {},
                composite: defineNestedComposite(values[key]),
            };
        }
        else {
            memo[key] = {
                type: type,
                description: "",
                context: {},
            };
        }
        return memo;
    }, {});
}
function normalizeMetricName(name) {
    if (typeof name !== "undefined" && name.length > 0 && name[0] !== "/") {
        return "/" + name;
    }
    else {
        return name;
    }
}
exports.normalizeMetricName = normalizeMetricName;
function getMetricValueByType(metric) {
    var type = getMetricTypeByValue(metric);
    if (type === "timestamp") {
        return Date.now();
    }
    else {
        return publishNestedComposite(metric.value);
    }
}
exports.getMetricValueByType = getMetricValueByType;
function publishNestedComposite(values) {
    if (typeof values !== "object") {
        return values;
    }
    return Object.keys(values).reduce(function (memo, key) {
        var value = values[key];
        if (typeof value === "object" && value.constructor !== Date) {
            memo[key] = publishNestedComposite(value);
        }
        else if (value.constructor === Date) {
            memo[key] = new Date(value).getTime();
        }
        else if (value.constructor === Boolean) {
            memo[key] = value.toString();
        }
        else {
            memo[key] = value;
        }
        return memo;
    }, {});
}
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function getHighestState(arr) {
    return arr.sort(function (a, b) {
        return b.state - a.state;
    })[0];
}
function aggregateDescription(arr) {
    var msg = "";
    arr.forEach(function (m, idx, a) {
        var path = m.path.join(".");
        if (idx === a.length - 1) {
            msg += path + "." + m.name + ": " + m.description;
        }
        else {
            msg += path + "." + m.name + ": " + m.description + ",";
        }
    });
    if (msg.length > 100) {
        return msg.slice(0, 100) + "...";
    }
    else {
        return msg;
    }
}
function composeMsgForRootStateMetric(system) {
    var aggregatedState = system.root.getAggregateState();
    var merged = flatten(aggregatedState);
    var highestState = getHighestState(merged);
    var aggregateDesc = aggregateDescription(merged);
    return {
        description: aggregateDesc,
        value: highestState.state,
    };
}
exports.composeMsgForRootStateMetric = composeMsgForRootStateMetric;
//# sourceMappingURL=serializer.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gw1_1 = __webpack_require__(75);
var gw3_1 = __webpack_require__(77);
var repository_1 = __webpack_require__(80);
exports.default = (function (settings) {
    var options = {
        connection: settings.connection,
        identity: settings.identity,
        logger: settings.logger,
        heartbeatInterval: settings.heartbeatInterval,
        settings: {},
        clickStream: settings.clickStream,
    };
    if (!options.connection || typeof options.connection !== "object") {
        throw new Error("Connection is required parameter");
    }
    var _protocol;
    if (options.connection.protocolVersion === 3) {
        _protocol = gw3_1.default(options.connection, settings);
    }
    else {
        _protocol = gw1_1.default(options.connection, settings);
    }
    var repo = repository_1.default(options, _protocol);
    var rootSystem = repo.root;
    return rootSystem; // System
});
//# sourceMappingURL=main.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var system_1 = __webpack_require__(81);
function repository(options, protocol) {
    if (!options.identity) {
        throw new Error("Identity missing from metrics configuration");
    }
    if (!options.identity.service || typeof options.identity.service !== "string") {
        throw new Error("Service missing or invalid in metrics identity configuration");
    }
    if (!options.identity.system || typeof options.identity.system !== "string") {
        throw new Error("System missing or invalid in metrics identity configuration");
    }
    if (!options.identity.instance || typeof options.identity.instance !== "string") {
        throw new Error("Instance missing or invalid in metrics identity configuration");
    }
    var identity = options.identity;
    var instance = options.identity.system + "/" + options.identity.service + "/" + options.identity.instance;
    function _initSystemMetrics(rootSystem, useClickStream) {
        // Create some system metrics
        if (typeof navigator !== "undefined") {
            rootSystem.stringMetric("UserAgent", navigator.userAgent);
        }
        if (useClickStream && typeof document !== "undefined") {
            var clickStream_1 = rootSystem.subSystem("ClickStream");
            var documentClickHandler = function (e) {
                if (!e.target) {
                    return;
                }
                var target = e.target;
                clickStream_1.objectMetric("LastBrowserEvent", {
                    type: "click",
                    timestamp: new Date(),
                    target: {
                        className: e.target ? target.className : "",
                        id: target.id,
                        type: "<" + target.tagName.toLowerCase() + ">",
                        href: target.href || "",
                    },
                });
            };
            // Create click stream record
            clickStream_1.objectMetric("Page", {
                title: document.title,
                page: window.location.href,
            });
            if (document.addEventListener) {
                document.addEventListener("click", documentClickHandler);
            }
            else {
                // For IE versions prior to IE9, attachEvent method should be used to register the specified listener
                // to the EventTarget it is called on, for others addEventListener should be used.
                // (<any>document)
                document.attachEvent("onclick", documentClickHandler);
            }
        }
        var startTime = rootSystem.stringMetric("StartTime", (new Date()).toString());
        var urlMetric = rootSystem.stringMetric("StartURL", "");
        var appNameMetric = rootSystem.stringMetric("AppName", "");
        if (typeof window !== "undefined") {
            if (typeof window.location !== "undefined") {
                var startUrl = window.location.href;
                urlMetric.update(startUrl);
            }
            var windowAsAny = window;
            if (typeof windowAsAny.glue42gd !== "undefined") {
                appNameMetric.update(windowAsAny.glue42gd.appName);
            }
        }
    }
    var me = {
        identity: identity,
        instance: instance,
        get root() {
            return _root;
        },
    };
    protocol.init(me);
    var _root = system_1.default("", me, protocol);
    _initSystemMetrics(_root, options.clickStream || options.clickStream === undefined);
    return me;
}
exports.default = repository;
//# sourceMappingURL=repository.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = __webpack_require__(66);
var count_1 = __webpack_require__(67);
var number_1 = __webpack_require__(68);
var object_1 = __webpack_require__(69);
var rate_1 = __webpack_require__(70);
var statistics_1 = __webpack_require__(71);
var string_1 = __webpack_require__(72);
var timespan_1 = __webpack_require__(73);
var timestamp_1 = __webpack_require__(74);
var metric_types_1 = __webpack_require__(1);
function system(name, repo, protocol, parent, description) {
    // Validation
    // if (!name) throw new Error("Name is required. ");
    if (!repo) {
        throw new Error("Repository is required");
    }
    if (!protocol) {
        throw new Error("Transport is required");
    }
    var _transport = protocol;
    var _name = name;
    var _description = description || "";
    var _repo = repo;
    var _parent = parent;
    var _path = _buildPath(parent);
    var _state = {};
    var id = _arrayToString(_path, "/") + name;
    var identity = repo.identity;
    var root = repo.root;
    var _subSystems = [];
    var _metrics = [];
    function subSystem(nameSystem, descriptionSystem) {
        if (!nameSystem || nameSystem.length === 0) {
            throw new Error("name is required");
        }
        var match = _subSystems.filter(function (s) { return s.name === nameSystem; });
        if (match.length > 0) {
            return match[0];
        }
        var _system = system(nameSystem, _repo, _transport, me, descriptionSystem);
        _subSystems.push(_system);
        return _system;
    }
    function setState(state, stateDescription) {
        _state = { state: state, description: stateDescription };
        _transport.updateSystem(me, _state);
    }
    function stringMetric(definition, value) {
        return _getOrCreateMetric.call(me, definition, metric_types_1.default.STRING, value, function (metricDef) { return string_1.default(metricDef, me, _transport, value); });
    }
    function numberMetric(definition, value) {
        return _getOrCreateMetric.call(me, definition, metric_types_1.default.NUMBER, value, function (metricDef) { return number_1.default(metricDef, me, _transport, value); });
    }
    function countMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.COUNT, value, function (metricDef) { return count_1.default(metricDef, me, _transport, value); });
    }
    function addressMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.ADDRESS, value, function (metricDef) { return address_1.default(metricDef, me, _transport, value); });
    }
    function objectMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.OBJECT, value, function (metricDef) { return object_1.default(metricDef, me, _transport, value); });
    }
    function timespanMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.TIMESPAN, value, function (metricDef) { return timespan_1.default(metricDef, me, _transport, value); });
    }
    function timestampMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.TIMESTAMP, value, function (metricDef) { return timestamp_1.default(metricDef, me, _transport, value); });
    }
    function rateMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.RATE, value, function (metricDef) { return rate_1.default(metricDef, me, _transport, value); });
    }
    function statisticsMetric(definition, value) {
        return _getOrCreateMetric.call(this, definition, metric_types_1.default.STATISTICS, value, function (metricDef) { return statistics_1.default(metricDef, me, _transport, value); });
    }
    function _unionToMetricDef(def) {
        var metricDefinition = {};
        // NOTE: Handle undefined
        if (typeof def === "string") {
            metricDefinition.name = def;
        }
        else {
            metricDefinition = def;
        }
        if (metricDefinition.name === undefined) {
            throw new Error("Metric name is required");
        }
        return metricDefinition;
    }
    function _getOrCreateMetric(definition, expectedType, value, createMetric) {
        var metricDefinition = _unionToMetricDef(definition);
        var matching = _metrics.filter(function (shadowedMetric) { return shadowedMetric.name === metricDefinition.name; });
        if (matching.length > 0) {
            var existing = matching[0];
            if (existing.type !== expectedType) {
                // NOTE: Extend the error with the already defined metric?
                throw new Error("A metric named " + metricDefinition.name + " is already defined with different type.");
            }
            if (typeof value !== "undefined") {
                existing.update(value);
            }
            return existing;
        }
        var metric = createMetric(metricDefinition);
        _metrics.push(metric);
        return metric;
    }
    function _buildPath(shadowedSystem) {
        if (!shadowedSystem || !shadowedSystem.parent) {
            return [];
        }
        var path = _buildPath(shadowedSystem.parent);
        path.push(shadowedSystem.name);
        return path;
    }
    function _arrayToString(path, separator) {
        return ((path && path.length > 0) ? path.join(separator) : "");
    }
    function getAggregateState() {
        var aggState = [];
        if (Object.keys(_state).length > 0) {
            aggState.push({
                name: _name,
                path: _path,
                state: _state.state,
                description: _state.description,
            });
        }
        _subSystems.forEach(function (shadowedSubSystem) {
            var result = shadowedSubSystem.getAggregateState();
            if (result.length > 0) {
                aggState.push.apply(aggState, result);
            }
        });
        return aggState;
    }
    var me = {
        get name() {
            return _name;
        },
        get description() {
            return _description;
        },
        get repo() {
            return _repo;
        },
        get parent() {
            return _parent;
        },
        path: _path,
        id: id,
        identity: identity,
        root: root,
        get subSystems() {
            return _subSystems;
        },
        get metrics() {
            return _metrics;
        },
        subSystem: subSystem,
        getState: function () {
            return _state;
        },
        setState: setState,
        stringMetric: stringMetric,
        statisticsMetric: statisticsMetric,
        rateMetric: rateMetric,
        timestampMetric: timestampMetric,
        timespanMetric: timespanMetric,
        objectMetric: objectMetric,
        addressMetric: addressMetric,
        countMetric: countMetric,
        numberMetric: numberMetric,
        getAggregateState: getAggregateState,
    };
    _transport.createSystem(me);
    return me;
}
exports.default = system;
//# sourceMappingURL=system.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    function now() {
        return new Date().getTime();
    }
    var startTime = now();
    var endTime;
    var period;
    function stop() {
        endTime = now();
        period = now() - startTime;
        return period;
    }
    return {
        get startTime() {
            return startTime;
        },
        get endTime() {
            return endTime;
        },
        get period() {
            return period;
        },
        stop: stop
    };
}
exports.default = default_1;
//# sourceMappingURL=timer.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=tick42-glue-core.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (options) {
    // Possible options per lib (this is InputLibConfig type)
    // * false - library is disabled (e.g. config.appManager = false)
    // * true - library is enabled in running in default mode (e.g config.appManager = true).
    //          Exception is if default mode is false - in that case it runs default true mode.
    // * string - start in some mode (e.g. config.appManager = "full")
    // * object - allows further customization (e.g config.appManager = {mode: "full", someSetting: 42})
    //
    // Some libs support different running modes, some do not.
    //
    // Currently defaults are:
    // appManager: disabled
    // layouts: enabled in 'slim' mode
    // activities: enabled in 'trackMyTypeAndInitiatedFromMe' mode
    // windows: enabled (does not support modes)
    // contexts: enabled (does not support modes)
    //
    // InputLibConfig is transformed to LibConfigObject
    /**
     * Transforms InputLibConfig (the config as specified from the user)
     * to LibConfigObject(internal library configuration)
     */
    function getLibConfig(value, defaultMode, trueMode) {
        // if value is false return undefined
        if (typeof value === "boolean" && !value) {
            return undefined;
        }
        // find the mode of the library
        var mode = getModeAsString(value, defaultMode, trueMode);
        // if object we will replace the mode because appManager = {mode: true, setting: 42}
        // should be turned into appManager = {mode: 'slim', setting: 42}
        if (typeof value === "object") {
            value.mode = mode;
            return value;
        }
        return {
            mode: mode,
        };
    }
    /**
     * Finds the mode based for a given library
     * 1. If object we call recursively using object.mode for value
     * 1. If the user hasn't specified anything we use the hard coded defaults
     * 3. If the value is false or it got defaulted to false, we return undefined
     * 4. If the value is true we return trueMode or defaultMode (if trueMode is undefined)
     */
    function getModeAsString(value, defaultMode, trueMode) {
        // 1. if object
        if (typeof value === "object") {
            return getModeAsString(value.mode, defaultMode, trueMode) + "";
        }
        else if (typeof value === "undefined") {
            // 2. if the user does not pass anything
            // 3. if gets defaulted to false, the library should be off
            if (typeof defaultMode === "boolean" && !defaultMode) {
                return undefined;
            }
            else {
                return defaultMode + "";
            }
        }
        else if (typeof value === "boolean") {
            // 4. if the user passes true, use trueMode or defaultMode
            if (value) {
                // if the user passes true, use trueMode or defaultMode
                return ((trueMode === undefined) ? defaultMode : trueMode) + "";
            }
            else {
                // 3. if the user passes false, the library should be off
                return undefined;
            }
        }
        return value + "";
    }
    return {
        outlook: getLibConfig(options.outlook, true),
        excel: getLibConfig(options.excel, true),
        word: getLibConfig(options.word, true),
    };
});
//# sourceMappingURL=config.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowGridMethodName = "T42.ExcelPad.ShowGrid";
exports.ValidateShowGridMethodName = "ValidateShowGrid";
//# sourceMappingURL=const.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(2);
var const_1 = __webpack_require__(34);
var sheet_1 = __webpack_require__(37);
var utils_1 = __webpack_require__(10);
var ExcelImp = /** @class */ (function () {
    function ExcelImp(agm) {
        var _this = this;
        this._registry = callback_registry_1.default();
        this._sheets = {};
        this._isExcelStarted = false;
        this.openSheet = function (sheetData) {
            return new Promise(function (resolve, reject) {
                if (!sheetData) {
                    reject("Can not open a sheet without config");
                    return;
                }
                if (!sheetData.columnConfig || !Array.isArray(sheetData.columnConfig)) {
                    reject("Missing or incorrect type `columnConfig` property");
                    return;
                }
                if (!sheetData.data || !Array.isArray(sheetData.data)) {
                    reject("Missing or incorrect type of `data` property");
                    return;
                }
                var convertedParams = utils_1.convertParams(sheetData.columnConfig, sheetData.data, sheetData.options);
                var successHandler = function (r) {
                    if (utils_1.parseAgmResult(r)) {
                        var sheet = new sheet_1.default(convertedParams.params.cookie, sheetData, _this.invokeShowGridMethod.bind(_this));
                        _this._sheets[convertedParams.params.cookie] = sheet;
                        resolve(sheet.asSheetAPI);
                    }
                };
                var errorHandler = function (err) {
                    reject(err);
                };
                return _this.invokeShowGridMethod(convertedParams.params).then(successHandler).catch(errorHandler);
            });
        };
        this.onAddinStatusChanged = function (callback) {
            return _this._registry.add("onAddinStatusChanged", callback);
        };
        this._agm = agm;
        this.registerAgmMethod();
    }
    Object.defineProperty(ExcelImp.prototype, "all", {
        get: function () {
            var _this = this;
            return Object.keys(this._sheets).map(function (k) {
                return _this._sheets[k].asSheetAPI;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExcelImp.prototype, "addinStatus", {
        get: function () {
            return this._isExcelStarted;
        },
        enumerable: true,
        configurable: true
    });
    ExcelImp.prototype.registerAgmMethod = function () {
        var _this = this;
        this._agm.register({
            name: const_1.ValidateShowGridMethodName,
            accepts: "string cookie, string workbook, string worksheet, string updateType, string dataAsJSON",
        }, function (args, caller) {
            if (args.cookie) {
                var currentSheet = _this._sheets[args.cookie];
                if (currentSheet) {
                    return currentSheet._onUpdate(args);
                }
            }
            return undefined;
        });
        this._agm.methodAdded(function (method) {
            if (method.name === const_1.ShowGridMethodName) {
                _this._isExcelStarted = true;
                _this._registry.execute("onAddinStatusChanged", true);
            }
        });
        this._agm.methodRemoved(function (method) {
            if (method.name === const_1.ShowGridMethodName) {
                _this._isExcelStarted = false;
                _this._registry.execute("onAddinStatusChanged", false);
            }
        });
    };
    ExcelImp.prototype.invokeShowGridMethod = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._isExcelStarted) {
                _this._agm.invoke(const_1.ShowGridMethodName, params)
                    .then(function (response) {
                    resolve(response);
                }).catch(function (e) {
                    reject(e);
                });
            }
            else {
                reject("Microsoft Excel with Tick42 Add-in is not running");
            }
        });
    };
    return ExcelImp;
}());
exports.default = ExcelImp;
//# sourceMappingURL=excel.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var excel_1 = __webpack_require__(35);
exports.default = (function (config) {
    var excel = new excel_1.default(config.agm);
    function ready() {
        return new Promise(function (resolve, reject) {
            resolve(api);
        });
    }
    var api = {
        ready: ready,
        openSheet: excel.openSheet,
        get sheets() {
            return excel.all;
        },
        onAddinStatusChanged: excel.onAddinStatusChanged,
        get addinStatus() {
            return excel.addinStatus;
        },
    };
    return api;
});
//# sourceMappingURL=main.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(10);
var SheetImpl = /** @class */ (function () {
    function SheetImpl(cookie, config, invokeShowGrid) {
        var _this = this;
        this._registry = callback_registry_1.default();
        this.errorCallback = function (errors) {
            _this._validationResponse = {
                isValid: false,
                errorsAsJSON: JSON.stringify(errors),
            };
        };
        this.doneCallback = function () {
            _this._validationResponse = {
                isValid: true,
            };
        };
        this._id = cookie;
        this._name = config.options ? config.options.worksheet : "";
        this._data = config.data;
        this._workbook = config.options ? config.options.workbook : "";
        this._columns = config.columnConfig;
        this._options = config.options;
        this._invokeMethod = invokeShowGrid;
    }
    Object.defineProperty(SheetImpl.prototype, "asSheetAPI", {
        get: function () {
            var _this = this;
            var that = this;
            if (!this._sheet) {
                this._sheet = {
                    name: this._name,
                    workbook: this._workbook,
                    options: this._options,
                    get data() { return that._data; },
                    get columnConfig() { return that._columns; },
                    update: function (data) { return _this.update(data); },
                    onChanged: function (callback) { return _this.onChanged(callback); },
                    changeColumnConfig: function (columnConfig, data) { return _this.changeColumnConfig(columnConfig, data); },
                };
            }
            return this._sheet;
        },
        enumerable: true,
        configurable: true
    });
    SheetImpl.prototype.changeColumnConfig = function (columnConfig, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!columnConfig) {
                reject("Can not change column in the sheet without columnConfig");
                return;
            }
            if (!data) {
                data = _this._data;
            }
            var convertedParams = utils_1.convertParams(columnConfig, data, _this._options, _this._id);
            var successHandler = function () {
                _this._data = data;
                resolve();
            };
            _this._invokeMethod(convertedParams.params)
                .then(successHandler)
                .catch(reject);
        });
    };
    SheetImpl.prototype.update = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!data || !Array.isArray(data)) {
                reject("Can not update sheet with empty or incorrect type `data`");
                return;
            }
            var convertedParams = utils_1.convertParams(_this._columns, data, _this._options, _this._id);
            _this._invokeMethod(convertedParams.params)
                .then(function () {
                _this._data = data;
                resolve();
            })
                .catch(reject);
        });
    };
    SheetImpl.prototype.onChanged = function (callback) {
        return this._registry.add("on-changed", callback);
    };
    SheetImpl.prototype._onUpdate = function (args) {
        this._name = args.worksheet;
        this._workbook = args.workbook;
        var rows;
        try {
            rows = JSON.parse(args.dataAsJSON);
        }
        catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
            return;
        }
        // Merge with current data
        this.mergeData(rows);
        this._registry.execute("on-changed", this._data, this.errorCallback, this.doneCallback);
        return this._validationResponse;
    };
    SheetImpl.prototype.mergeData = function (updatedData) {
        var _this = this;
        var dataAfterMerged = [];
        var isRowMode = this._options.payloadType === "row" /* row */;
        if (isRowMode) {
            // We need to add the old data, because our mode is row, so we will receive only the rows, which are modified, deleted and inserted
            dataAfterMerged = this._data;
        }
        updatedData.forEach(function (row) {
            var beforeActualIndex = row.rowBeforeIndex - 1;
            var afterActualIndex = row.rowAfterIndex - 1;
            // This action is used only in image mode, so we need to copy the unchanged data to the updated index
            if (row.action === "unchanged") {
                dataAfterMerged[afterActualIndex] = _this._data[beforeActualIndex];
            }
            else if (row.action === "deleted") {
                // We need to delete a certain row, only if we are in row mode
                // if we are in image mode, we don't care for deleted rows
                if (isRowMode) {
                    dataAfterMerged.splice(beforeActualIndex, 1);
                }
            }
            else if (row.action === "modified") {
                row.row.forEach(function (updateFieldData, i) {
                    if (updateFieldData === null) {
                        // this means that the data in this field is unchanged
                        return;
                    }
                    var fieldName = _this._columns[i].fieldName;
                    var rowData = _this._data[beforeActualIndex];
                    rowData[fieldName] = updateFieldData;
                    dataAfterMerged[beforeActualIndex] = rowData;
                });
            }
            else if (row.action === "inserted") {
                var insertedObj_1 = {};
                row.row.forEach(function (updateFieldData, i) {
                    var fieldName = _this._columns[i].fieldName;
                    insertedObj_1[fieldName] = updateFieldData || undefined;
                });
                dataAfterMerged.splice(afterActualIndex, 0, insertedObj_1);
            }
        });
        this._data = dataAfterMerged;
    };
    return SheetImpl;
}());
exports.default = SheetImpl;
//# sourceMappingURL=sheet.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var glue4office_1 = __webpack_require__(19);
if (typeof window !== "undefined") {
    window.Glue4Office = glue4office_1.default;
}
// add default library for ES6 modules
glue4office_1.default.default = glue4office_1.default;
module.exports = glue4office_1.default;
//# sourceMappingURL=main.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChunkDataDictionary = /** @class */ (function () {
    function ChunkDataDictionary() {
        this.items = {};
    }
    ChunkDataDictionary.prototype.containsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    ChunkDataDictionary.prototype.add = function (key, value) {
        if (this.containsKey(key)) {
            this.items[key].push(value);
        }
        else {
            this.items[key] = [value];
        }
    };
    ChunkDataDictionary.prototype.remove = function (key) {
        delete this.items[key];
    };
    ChunkDataDictionary.prototype.get = function (key) {
        return this.items[key];
    };
    return ChunkDataDictionary;
}());
exports.ChunkDataDictionary = ChunkDataDictionary;
exports.default = new ChunkDataDictionary();
//# sourceMappingURL=ChunkDataDictionary.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_registry_1 = __webpack_require__(2);
var Manager_1 = __webpack_require__(7);
var createEmail_1 = __webpack_require__(41);
var createLocalEmail_1 = __webpack_require__(42);
var createTask_1 = __webpack_require__(43);
var registerAgmMethods_1 = __webpack_require__(18);
var handleTrackingItems_1 = __webpack_require__(45);
var itemFromJSON_1 = __webpack_require__(46);
var registerEventListeners_1 = __webpack_require__(47);
function default_1(config) {
    var outlook;
    if (!config.agm) {
        throw Error("config.agm is required");
    }
    var callbacks = callback_registry_1.default();
    var agm = config.agm;
    Manager_1.default.init(agm);
    registerAgmMethods_1.registerAgmMethods(agm, callbacks);
    registerEventListeners_1.registerEventListeners(agm, callbacks);
    var onAddinStatusChanged = function (callback) {
        return registerEventListeners_1.registerOnAddinStatusChanged(agm, callback, callbacks);
    };
    var onEmailReceived = function (callback) {
        return registerEventListeners_1.registerOnEmailReceived(agm, callback, callbacks);
    };
    var onTaskCreated = function (callback) {
        return registerEventListeners_1.registerOnTaskCreated(agm, callback, callbacks);
    };
    var onTrackEmail = function (callback) {
        return registerEventListeners_1.registerTrackEmail(agm, callback, callbacks);
    };
    var onUntrackEmail = function (callback) {
        return registerEventListeners_1.registerUntrackEmail(agm, callback, callbacks);
    };
    var onTrackCalendarEvent = function (callback) {
        return registerEventListeners_1.registerTrackItem(agm, callback, callbacks);
    };
    var onUntrackCalendarEvent = function (callback) {
        return registerEventListeners_1.registerUntrackItem(agm, callback, callbacks);
    };
    var onSecureReply = function (callback) {
        return registerEventListeners_1.registerSecureReply(agm, callback, callbacks);
    };
    var onDisplaySecureEmail = function (callback) {
        return registerEventListeners_1.registerDisplaySecureEmail(agm, callback, callbacks);
    };
    var ready = function () { return new Promise(function (resolve) {
        resolve(outlook);
    }); };
    // TODO add action for test purposes
    // const newEmail = (emailParams: EmailParams = {}, options: NewEmailOptions, action?: number): Promise<void> =>
    //     createEmail(agm, emailParams, options, action);
    var newEmail = function (emailParams, options) {
        if (emailParams === void 0) { emailParams = {}; }
        return createEmail_1.createEmail(agm, emailParams, options);
    };
    var trackCalendarEvent = function (event, conversationId) {
        return handleTrackingItems_1.handleTrackingItems(agm, "track", event, conversationId);
    };
    var untrackCalendarEvent = function (event) {
        return handleTrackingItems_1.handleTrackingItems(agm, "untrack", event);
    };
    var createLocalEmail = function (localEmailParams) {
        return createLocalEmail_1.createLocalEmailMethod(agm, localEmailParams);
    };
    var newTask = function (taskParams, options) {
        if (taskParams === void 0) { taskParams = {}; }
        return createTask_1.createTask(agm, taskParams, options);
    };
    var emailFromJSON = function (email) { return itemFromJSON_1.itemFromJSON(email, agm, "email"); };
    var taskFromJSON = function (task) { return itemFromJSON_1.itemFromJSON(task, agm, "task"); };
    var attachmentFromJSON = function (attachment) { return itemFromJSON_1.itemFromJSON(attachment, agm, "attachment"); };
    var showEmail = function (ids) {
        return Manager_1.default.showItemMethod(ids, "showEmail");
    };
    var showTask = function (ids) {
        return Manager_1.default.showItemMethod(ids, "showTask");
    };
    outlook = {
        ready: ready,
        newEmail: newEmail,
        trackCalendarEvent: trackCalendarEvent,
        untrackCalendarEvent: untrackCalendarEvent,
        createLocalEmail: createLocalEmail,
        newTask: newTask,
        emailFromJSON: emailFromJSON,
        taskFromJSON: taskFromJSON,
        attachmentFromJSON: attachmentFromJSON,
        showEmail: showEmail,
        showTask: showTask,
        onAddinStatusChanged: onAddinStatusChanged,
        onEmailReceived: onEmailReceived,
        onTaskCreated: onTaskCreated,
        onTrackEmail: onTrackEmail,
        onUntrackEmail: onUntrackEmail,
        onTrackCalendarEvent: onTrackCalendarEvent,
        onUntrackCalendarEvent: onUntrackCalendarEvent,
        onSecureReply: onSecureReply,
        onDisplaySecureEmail: onDisplaySecureEmail,
        get addinStatus() {
            return registerEventListeners_1.connected;
        },
    };
    return outlook;
}
exports.default = default_1;
//# sourceMappingURL=main.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(0);
var createItem_1 = __webpack_require__(16);
// TODO add action for test purposes
// export const createEmail = (
//  agm: Glue42Core.AGM.API,
//  email?: EmailParams,
//  options?: NewEmailOptions,
//  action?: number):
// Promise<void> =>
exports.createEmail = function (agm, email, options) {
    return new Promise(function (resolve, reject) {
        if (!helpers_1.isOutlookEnabled(agm)) {
            reject("The method \"newEmail\" is not available");
            return;
        }
        // TODO add action for test purposes
        // return createItem(agm, email, "email", options, action)
        return createItem_1.createItem(agm, email, "email", options)
            .then(function () { return resolve(); })
            .catch(reject);
    });
};
//# sourceMappingURL=createEmail.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var EmailImplementation_1 = __webpack_require__(6);
var methodNames_1 = __webpack_require__(1);
var validations_1 = __webpack_require__(3);
var createLocalEmail = function (ids, emailParams) {
    var localEmail = __assign({}, index_1.convertToT42Email(emailParams), { ids: ids });
    Object.keys(localEmail).forEach(function (key) {
        if (!localEmail[key]) {
            delete localEmail[key];
        }
    });
    return localEmail;
};
exports.createLocalEmailMethod = function (agm, localEmailParams) {
    return new Promise(function (resolve, reject) {
        validations_1.validateLocalEmailParameters(agm, localEmailParams);
        var successHandler = function (res, emailParams) {
            var localEmail = new EmailImplementation_1.EmailImpl(createLocalEmail(res.returned.localEmailIds, emailParams), agm);
            resolve(localEmail);
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        if (localEmailParams.location) {
            validations_1.validateLocation(localEmailParams.location);
        }
        return agm.invoke(methodNames_1.CreateLocalEmailMethodName, getParams(localEmailParams))
            .then(function (res) { return successHandler(res, localEmailParams); })
            .catch(function (err) { return errorHandler(err); });
    });
};
var getT42Email = function (localEmailParams) {
    return Object.keys(localEmailParams).reduce(function (obj, key) {
        if (key === "additionalProps") {
            return obj;
        }
        obj[key] = localEmailParams[key];
        return obj;
    }, {});
};
var getLocation = function (location) {
    var defaultFolders = index_1.getOlDefaultFolders();
    if (!location) {
        return { defaultFolderIndex: defaultFolders.$Inbox };
    }
    var emailIds = location.ids;
    if (emailIds && emailIds[0].nativeId && emailIds[0].systemName) {
        return { parentItemIds: emailIds };
    }
    if (typeof location === "string") {
        if (location.indexOf("$") < 0) {
            return { folderPath: location };
        }
        if (typeof defaultFolders[location] === "number") {
            return { defaultFolderIndex: defaultFolders[location] };
        }
    }
    return { defaultFolderIndex: defaultFolders.$Inbox };
};
var getParams = function (localEmailParams) {
    var params = {
        location: getLocation(localEmailParams.location),
        email: index_1.convertToT42Email(getT42Email(localEmailParams)),
    };
    if (localEmailParams.additionalProps) {
        params.additionalProps = localEmailParams.additionalProps;
    }
    return params;
};
//# sourceMappingURL=createLocalEmail.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var createItem_1 = __webpack_require__(16);
exports.createTask = function (agm, task, options) {
    return new Promise(function (resolve, reject) {
        if (!index_1.isOutlookEnabled(agm)) {
            reject("The method \"newTask\" is not available");
            return;
        }
        createItem_1.createItem(agm, task, "task", options)
            .then(function () { return resolve(); })
            .catch(reject);
    });
};
//# sourceMappingURL=createTask.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var methodNames_1 = __webpack_require__(1);
var GetAttachmentDictionary_1 = __webpack_require__(12);
exports.getAttachment = function (agm, emailIds, ids, callback) {
    return new Promise(function (resolve, reject) {
        if (!index_1.isOutlookEnabled(agm)) {
            reject("The method \"getAttachments\" is not available");
            return;
        }
        var cookie = new Date().getTime().toString();
        var successHandler = function () {
            GetAttachmentDictionary_1.default.add(cookie, { callback: callback, resolve: resolve, reject: reject });
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        var getAttachmentOptions = {
            emailIds: emailIds,
            attachmentIds: ids,
            callback: methodNames_1.OutlookGetAttachmentMethodName,
            cookie: cookie,
        };
        return agm.invoke(methodNames_1.CRMGetAttachmentMethodName, getAttachmentOptions)
            .then(function () { return successHandler(); })
            .catch(function (err) { return errorHandler(err); });
    });
};
//# sourceMappingURL=getAttachment.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var methodNames_1 = __webpack_require__(1);
var validations_1 = __webpack_require__(3);
var TrackItemDictionary_1 = __webpack_require__(15);
var combineConversationIds = function (event, conversationId, isTrackEmail) {
    var conversationIds = TrackItemDictionary_1.default.containsIds(event.ids) ? TrackItemDictionary_1.default.get(event.ids) : [];
    if (isTrackEmail) {
        var newConversationIds = conversationId ? conversationId : index_1.generateConversationId();
        conversationIds.push(newConversationIds);
        if (!TrackItemDictionary_1.default.containsIds(event.ids)) {
            TrackItemDictionary_1.default.add(event.ids, conversationIds);
        }
    }
    return conversationIds;
};
exports.handleTrackingItems = function (agm, action, event, conversationId) {
    return new Promise(function (resolve, reject) {
        validations_1.validateCalendarEventParameters(agm, action, event);
        var id = conversationId ? validations_1.validateId(conversationId) : null;
        var isTrackItem = action === "track";
        var conversationIds = combineConversationIds(event, id, isTrackItem);
        var successHandler = function () {
            var response = { event: event, conversationIds: conversationIds };
            resolve(response);
            if (!isTrackItem) {
                TrackItemDictionary_1.default.remove(event.ids);
                var untrackIds = event.ids.filter(function (ids) { return ids.systemName === ("Outlook.ConversationId"); });
                TrackItemDictionary_1.default.add(event.ids, untrackIds);
            }
        };
        var errorHandler = function (err) {
            reject(err.message);
            return;
        };
        var methodName = isTrackItem ? methodNames_1.SyncTrackCalendarItemMethodName : methodNames_1.SyncUntrackCalendarItemMethodName;
        var params = { itemIds: event.ids, conversationIds: conversationIds };
        return agm.invoke(methodName, params)
            .then(function (res) { return successHandler(); })
            .catch(function (err) { return errorHandler(err); });
    });
};
//# sourceMappingURL=handleTrackingItems.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TaskImplementation_1 = __webpack_require__(17);
var EmailImplementation_1 = __webpack_require__(6);
var AttachmentImplementation_1 = __webpack_require__(5);
exports.itemFromJSON = function (item, agm, itemType) {
    if (!item) {
        throw new Error(itemType + " is mandatory");
    }
    if (!item.ids) {
        throw new Error(itemType + " ids property is mandatory");
    }
    if (itemType === "email") {
        return new EmailImplementation_1.EmailImpl(item, agm);
    }
    else if (itemType === "task") {
        return new TaskImplementation_1.TaskImpl(item, agm);
    }
    else {
        return new AttachmentImplementation_1.AttachmentImpl(item, agm);
    }
};
//# sourceMappingURL=itemFromJSON.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var registerAgmMethods_1 = __webpack_require__(18);
var methodNames_1 = __webpack_require__(1);
exports.connected = false;
var onOutlookEnabled = function (agm, callbacks) {
    if (index_1.isOutlookEnabled(agm)) {
        exports.connected = true;
    }
    agm.methodAdded(function (m) {
        if (m.name === methodNames_1.CreateItemMethodName) {
            if (exports.connected === false) {
                exports.connected = true;
                callbacks.execute("onAddinStatusChanged", { connected: exports.connected });
            }
        }
    });
};
var onOutlookDisabled = function (agm, callbacks) {
    agm.methodRemoved(function (m) {
        if (m.name === methodNames_1.CreateItemMethodName) {
            exports.connected = false;
            callbacks.execute("onAddinStatusChanged", { connected: exports.connected });
        }
    });
};
exports.registerEventListeners = function (agm, callbacks) {
    onOutlookEnabled(agm, callbacks);
    onOutlookDisabled(agm, callbacks);
};
exports.registerOnAddinStatusChanged = function (agm, callback, callbacks) {
    callback({ connected: exports.connected });
    return callbacks.add("onAddinStatusChanged", callback);
};
exports.registerOnEmailReceived = function (agm, callback, callbacks) {
    return callbacks.add("onEmailReceived", callback);
};
exports.registerOnTaskCreated = function (agm, callback, callbacks) {
    return callbacks.add("onTaskCreated", callback);
};
var unsubscribeFunction = function (uns, agm, methodName) {
    uns();
    if (agm.methods({ name: methodName }).length > 0) {
        agm.unregister(methodName);
    }
};
exports.registerTrackEmail = function (agm, callback, callbacks) {
    if (agm.methods({ name: methodNames_1.OnTrackEmailMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMTrackEmail(agm, callbacks);
        var uns_1 = callbacks.add("onEmailTracked", callback);
        return function () { return unsubscribeFunction(uns_1, agm, methodNames_1.OnTrackEmailMethodName); };
    }
    else {
        throw Error("Another client has already subscribed for tracking emails");
    }
};
exports.registerUntrackEmail = function (agm, callback, callbacks) {
    if (agm.methods({ name: methodNames_1.OnUntrackEmailMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMUntrackEmail(agm, callbacks);
        var uns_2 = callbacks.add("onEmailUntracked", callback);
        return function () { return unsubscribeFunction(uns_2, agm, methodNames_1.OnUntrackEmailMethodName); };
    }
    else {
        throw Error("Another client has already subscribed for untracking emails");
    }
};
exports.registerTrackItem = function (agm, callback, callbacks) {
    if (agm.methods({ name: methodNames_1.OnTrackItemMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMTrackItem(agm, callbacks);
        var uns_3 = callbacks.add("onItemTracked", callback);
        return function () { return unsubscribeFunction(uns_3, agm, methodNames_1.OnTrackItemMethodName); };
    }
    else {
        throw Error("Another client has already subscribed for tracking calendar events");
    }
};
exports.registerUntrackItem = function (agm, callback, callbacks) {
    if (agm.methods({ name: methodNames_1.OnUntrackItemMethodName }).length === 0) {
        registerAgmMethods_1.registerCRMUntrackItem(agm, callbacks);
        var uns_4 = callbacks.add("onItemUntracked", callback);
        return function () { return unsubscribeFunction(uns_4, agm, methodNames_1.OnUntrackItemMethodName); };
    }
    else {
        throw Error("Another client has already subscribed for untracking calendar events");
    }
};
exports.registerSecureReply = function (agm, callback, callbacks) {
    return callbacks.add("onSecureReply", callback);
};
exports.registerDisplaySecureEmail = function (agm, callback, callbacks) {
    return callbacks.add("onDisplaySecureEmail", callback);
};
//# sourceMappingURL=registerEventListeners.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TaskPriority;
(function (TaskPriority) {
    TaskPriority[TaskPriority["low"] = 0] = "low";
    TaskPriority[TaskPriority["normal"] = 1] = "normal";
    TaskPriority[TaskPriority["high"] = 2] = "high";
})(TaskPriority = exports.TaskPriority || (exports.TaskPriority = {}));
//# sourceMappingURL=types.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = __webpack_require__(8);
var CallbackFactory = __webpack_require__(2);
exports.default = (function (cookie, config, agm) {
    var _registry = CallbackFactory();
    var name = config.name;
    var data = config.data;
    var _html = "";
    var _docx = "";
    var getHtmlPromise;
    function onClose(callback) {
        return _registry.add("on-closed", callback);
    }
    function _close() {
        _registry.execute("on-closed");
    }
    function getHtml(callback) {
        return new Promise(function (resolve, reject) {
            agm.invoke(const_1.ReturnHtmlMethodName, {
                cookie: cookie,
                callbackMethod: const_1.OnReturnHtmlMethodName,
            });
            getHtmlPromise = resolve;
        });
    }
    function onChanged(callback) {
        return _registry.add("on-changed", callback);
    }
    function _combineChunks(newData, cb) {
        // We have all document in one chunk
        if (newData.length === newData.totalLength && newData.lengthDocx === newData.totalLengthDocx) {
            _html = newData.html;
            _docx = newData.docx;
            cb(_html, _docx);
        }
        else {
            // We have multiple chunks
            if (newData.offset === 0) {
                _html = "";
            }
            if (newData.offsetDocx === 0) {
                _docx = "";
            }
            if (newData.html && newData.html.length > 0) {
                _html = _html.substr(0, newData.offset) + newData.html +
                    _html.substr(newData.offset + newData.length);
            }
            if (newData.docx && newData.docx.length > 0) {
                _docx = _docx.substr(0, newData.offsetDocx) + newData.docx +
                    _docx.substr(newData.offsetDocx + newData.lengthDocx);
            }
            var docxTotal = newData.totalLengthDocx || 0;
            if ((newData.totalLength === _html.length) &&
                (docxTotal === 0 || docxTotal === _docx.length)) {
                // Execute when all chunks are received
                cb(_html, _docx);
            }
        }
    }
    function _onHtml(newData) {
        _combineChunks(newData, function (html, docx) {
            getHtmlPromise(html);
        });
    }
    function _onChanged(newData) {
        _combineChunks(newData, function (html, docx) {
            api.data = html;
            _registry.execute("on-changed", api.data, docx);
        });
    }
    var api = {
        name: name,
        data: data,
        getHtml: getHtml,
        onClose: onClose,
        onChanged: onChanged,
    };
    var events = {
        _onChanged: _onChanged,
        _close: _close,
        _onHtml: _onHtml,
    };
    return {
        documentApi: api,
        documentEvents: events,
    };
});
//# sourceMappingURL=document.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(9);
var const_1 = __webpack_require__(8);
var document_1 = __webpack_require__(49);
var utils_1 = __webpack_require__(51);
var CallbackFactory = __webpack_require__(2);
exports.default = (function (config) {
    var agm = config.agm;
    var _registry = CallbackFactory();
    var connected = false;
    var documents = {};
    function openDocument(options) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var internalConfig = utils_1.mapOptions(options);
            var successHandler = function (args) {
                // Create a new document object and resolve the Promise
                internalConfig.cookie = args.returned.sessionId;
                var doc = document_1.default(internalConfig.cookie, options, agm);
                documents[internalConfig.cookie] = doc;
                resolve(doc.documentApi);
            };
            var errorHandler = function (e) {
                // tslint:disable-next-line:no-console
                console.warn(e);
                reject(e);
            };
            var offset = 0;
            var chunks = 0;
            var chunkedData = [];
            while (offset < options.data.length) {
                chunkedData.push(options.data.substr(offset, const_1.ChunkSize));
                offset += const_1.ChunkSize;
            }
            function sendChunks(args) {
                var chunk = chunkedData.splice(0, 1);
                if (chunk.length === 0) {
                    successHandler(args);
                    return;
                }
                internalConfig.sendDocx = true;
                if (options.isDocx) {
                    internalConfig.docx = chunk[0];
                    internalConfig.lengthDocx = chunk[0].length;
                    internalConfig.totalLengthDocx = options.data.length;
                    internalConfig.offsetDocx = chunks * const_1.ChunkSize;
                }
                else {
                    internalConfig.html = chunk[0];
                    internalConfig.length = chunk[0].length;
                    internalConfig.totalLength = options.data.length;
                    internalConfig.offset = chunks * const_1.ChunkSize;
                }
                invokeEditHtmlMethod(internalConfig).then(sendChunks).catch(errorHandler);
                chunks++;
            }
            sendChunks();
        });
    }
    // #region "Internal functions"
    agm.methodAdded(function (method) {
        if (method.name === const_1.EditHtmlMethodName) {
            if (connected === false) {
                connected = true;
                _registry.execute("onStatusChanged", { connected: connected });
            }
        }
    });
    agm.methodRemoved(function (method) {
        if (method.name === const_1.EditHtmlMethodName) {
            connected = false;
            _registry.execute("onStatusChanged", { connected: connected });
        }
    });
    // OnDocumentChanged
    agm.register(const_1.ReceiveHtmlMethodName, function (args, caller) {
        var document = documents[args.cookie];
        if (document) {
            document.documentEvents._onChanged(args);
        }
        return undefined;
    });
    agm.register(const_1.OnReturnHtmlMethodName, function (args, caller) {
        var document = documents[args.cookie];
        if (document) {
            document.documentEvents._onHtml(args);
        }
        return undefined;
    });
    // Closing method
    agm.register({
        name: const_1.CloseMethodName,
        accepts: "String documentName, String cookie",
    }, function (args, caller) {
        // Get cookie and delete the document and execute callback onClosed
        var document = documents[args.cookie];
        if (document) {
            document.documentEvents._close();
        }
        delete documents[args.cookie];
        return undefined;
    });
    function invokeEditHtmlMethod(options) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!connected) {
                reject("Microsoft Word with Tick42 Add-in is not running");
            }
            else {
                agm.invoke(const_1.EditHtmlMethodName, options).then(resolve).catch(reject);
            }
        });
    }
    // #endregion "Internal functions"
    function ready() {
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(api);
        });
    }
    function onAddinStatusChanged(callback) {
        if (agm.methods({ name: const_1.EditHtmlMethodName }).length > 0) {
            connected = true;
        }
        callback({ connected: connected });
        return _registry.add("onStatusChanged", callback);
    }
    var api = {
        get all() {
            return Object.keys(documents).map(function (k) {
                return documents[k].documentApi;
            });
        },
        openDocument: openDocument,
        ready: ready,
        onAddinStatusChanged: onAddinStatusChanged,
        get addinStatus() {
            return connected;
        },
    };
    return api;
});
//# sourceMappingURL=main.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = __webpack_require__(8);
function mapOptions(data) {
    var mappedOptions = {
        displayName: "",
        documentName: data.name,
        templateName: data.templateName,
        onSaved: const_1.ReceiveHtmlMethodName,
        onClosed: const_1.CloseMethodName,
    };
    return mappedOptions;
}
exports.mapOptions = mapOptions;
//# sourceMappingURL=utils.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=glue4office.js.map