require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "updates/" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d6bce142d78f3b79aa41"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		8: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./chunks/" + ({"0":"products","1":"register","2":"login","3":"privacy","4":"about","5":"not-found","6":"lk","7":"contact"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// uncatched error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using System.import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets.json":
/***/ (function(module, exports) {

module.exports = require("./assets.json");

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-1!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./node_modules/normalize.css/normalize.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,4EAA4E;;AAE5E;gFACgF;;AAEhF;;;;GAIG;;AAEH;EACE,kBAAkB,CAAC,OAAO;EAC1B,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;;;;;;EAME,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;OAEO,OAAO;EACZ,eAAe;CAChB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;;GAGG;;AAEH;EACE,gCAAgC;UACxB,wBAAwB,CAAC,OAAO;EACxC,UAAU,CAAC,OAAO;EAClB,kBAAkB,CAAC,OAAO;CAC3B;;AAED;;;GAGG;;AAEH;EACE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,sCAAsC,CAAC,OAAO;CAC/C;;AAED;;;GAGG;;AAEH;EACE,oBAAoB,CAAC,OAAO;EAC5B,2BAA2B,CAAC,OAAO;EACnC,0CAA0C;UAClC,kCAAkC,CAAC,OAAO;CACnD;;AAED;;GAEG;;AAEH;;EAEE,qBAAqB;CACtB;;AAED;;GAEG;;AAEH;;EAEE,oBAAoB;CACrB;;AAED;;;GAGG;;AAEH;;;EAGE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,uBAAuB;EACvB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;CACb;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;;EAEE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;EAKE,wBAAwB,CAAC,OAAO;EAChC,gBAAgB,CAAC,OAAO;EACxB,kBAAkB,CAAC,OAAO;EAC1B,UAAU,CAAC,OAAO;CACnB;;AAED;;;GAGG;;AAEH;QACQ,OAAO;EACb,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;SACS,OAAO;EACd,qBAAqB;CACtB;;AAED;;;;GAIG;;AAEH;;;;EAIE,2BAA2B,CAAC,OAAO;CACpC;;AAED;;GAEG;;AAEH;;;;EAIE,mBAAmB;EACnB,WAAW;CACZ;;AAED;;GAEG;;AAEH;;;;EAIE,+BAA+B;CAChC;;AAED;;GAEG;;AAEH;EACE,+BAA+B;CAChC;;AAED;;;;;GAKG;;AAEH;EACE,+BAA+B;UACvB,uBAAuB,CAAC,OAAO;EACvC,eAAe,CAAC,OAAO;EACvB,eAAe,CAAC,OAAO;EACvB,gBAAgB,CAAC,OAAO;EACxB,WAAW,CAAC,OAAO;EACnB,oBAAoB,CAAC,OAAO;CAC7B;;AAED;;;GAGG;;AAEH;EACE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,+BAA+B;UACvB,uBAAuB,CAAC,OAAO;EACvC,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,qBAAqB,CAAC,OAAO;CAC9B;;AAED;;GAEG;;AAEH;;EAEE,yBAAyB;CAC1B;;AAED;;;GAGG;;AAEH;EACE,2BAA2B,CAAC,OAAO;EACnC,cAAc,CAAC,OAAO;CACvB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;EAEE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,cAAc;CACf","file":"normalize.css","sourcesContent":["/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AccentProducts/AccentProducts.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".AccentProducts-root-2panu {\n  padding: 30px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: stretch;\n      align-items: stretch;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n\n.AccentProducts-item-3VZ8y {\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(24.975% - 22.5px);\n      flex-basis: calc(24.975% - 22.5px);\n  max-width: calc(24.975% - 22.5px);\n  width: calc(24.975% - 22.5px);\n}\n\n.AccentProducts-item-3VZ8y:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.AccentProducts-item-3VZ8y:last-child {\n  margin-right: 0;\n}\n\n.AccentProducts-item-3VZ8y:nth-child(4n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.AccentProducts-product-1v6Sp {\n  overflow: hidden;\n  position: relative;\n  min-height: 620px;\n  background-color: rgb(243, 246, 249);\n}\n\n.AccentProducts-productSmall-2uOqG {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding-left: 40px;\n  max-height: 344px;\n  margin-bottom: 30px;\n  min-height: 344px\n}\n\n.AccentProducts-productSmall-2uOqG:last-child {\n  margin-bottom: 0;\n}\n\n.AccentProducts-productBig-ji7hM {\n  text-align: center;\n  padding-top: 100px;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.AccentProducts-right-2zpAh {\n  -ms-flex-align: end;\n      align-items: flex-end;\n  text-align: right;\n  padding-right: 40px;\n}\n\n.AccentProducts-name-2MPWr, .AccentProducts-price-2WsJ1 {\n  width: 100%;\n  display: block;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n}\n\n.AccentProducts-name-2MPWr {\n  margin-bottom: 20px;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 24px;\n}\n\n.AccentProducts-price-2WsJ1 {\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 30px;\n}\n\n.AccentProducts-price-2WsJ1 span {\n    font-size: 18px;\n    letter-spacing: 0.18px;\n  }\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/AccentProducts/AccentProducts.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,qBAAqB;EACrB,cAAc;EACd,wBAAwB;MACpB,qBAAqB;EACzB,uBAAuB;MACnB,+BAA+B;CACpC;;AAED;EACE,qBAAqB;MACjB,aAAa;EACjB,qBAAqB;MACjB,eAAe;EACnB,gDAAgD;MAC5C,mCAAmC;EACvC,kCAAkC;EAClC,8BAA8B;CAC/B;;AAED;EACE,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;EACE,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;EAClB,qCAAqC;CACtC;;AAED;EACE,qBAAqB;EACrB,cAAc;EACd,2BAA2B;MACvB,uBAAuB;EAC3B,sBAAsB;MAClB,wBAAwB;EAC5B,sBAAsB;MAClB,wBAAwB;EAC5B,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,iBAAiB;CAClB;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,mBAAmB;EACnB,mBAAmB;EACnB,sBAAsB;MAClB,wBAAwB;EAC5B,uBAAuB;MACnB,oBAAoB;CACzB;;AAED;EACE,oBAAoB;MAChB,sBAAsB;EAC1B,kBAAkB;EAClB,oBAAoB;CACrB;;AAED;EACE,YAAY;EACZ,eAAe;EACf,uBAAuB;EACvB,iCAAiC;CAClC;;AAED;EACE,oBAAoB;EACpB,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;EACE,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;IACI,gBAAgB;IAChB,uBAAuB;GACxB","file":"AccentProducts.css","sourcesContent":[".root {\n  padding: 30px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: stretch;\n      align-items: stretch;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n\n.item {\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(24.975% - 22.5px);\n      flex-basis: calc(24.975% - 22.5px);\n  max-width: calc(24.975% - 22.5px);\n  width: calc(24.975% - 22.5px);\n}\n\n.item:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.item:last-child {\n  margin-right: 0;\n}\n\n.item:nth-child(4n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.product {\n  overflow: hidden;\n  position: relative;\n  min-height: 620px;\n  background-color: rgb(243, 246, 249);\n}\n\n.productSmall {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding-left: 40px;\n  max-height: 344px;\n  margin-bottom: 30px;\n  min-height: 344px\n}\n\n.productSmall:last-child {\n  margin-bottom: 0;\n}\n\n.productBig {\n  text-align: center;\n  padding-top: 100px;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.right {\n  -ms-flex-align: end;\n      align-items: flex-end;\n  text-align: right;\n  padding-right: 40px;\n}\n\n.name, .price {\n  width: 100%;\n  display: block;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n}\n\n.name {\n  margin-bottom: 20px;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 24px;\n}\n\n.price {\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 30px;\n}\n\n.price span {\n    font-size: 18px;\n    letter-spacing: 0.18px;\n  }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "AccentProducts-root-2panu",
	"item": "AccentProducts-item-3VZ8y",
	"product": "AccentProducts-product-1v6Sp",
	"productSmall": "AccentProducts-productSmall-2uOqG",
	"productBig": "AccentProducts-productBig-ji7hM",
	"right": "AccentProducts-right-2zpAh",
	"name": "AccentProducts-name-2MPWr",
	"price": "AccentProducts-price-2WsJ1"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AddToCard/AddToCard.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".AddToCard-root-zbRFr {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 101px;\n  height: 101px;\n  background-color: rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  color: #fff;\n  text-align: center;\n  opacity: 0;\n  -webkit-transition: opacity 0.2s linear;\n  -o-transition: opacity 0.2s linear;\n  transition: opacity 0.2s linear;\n}\n\n.AddToCard-icon-1BxHX {\n  display: block;\n  margin-top: 26px;\n}\n\n.AddToCard-label-2EJFs {\n  color: rgb(255, 255, 255);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.14px;\n}\n\n.AddToCard-visible-2y-gj {\n  opacity: 1;\n  cursor: pointer;\n}\n\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/AddToCard/AddToCard.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,yCAAyC;MACrC,qCAAqC;UACjC,iCAAiC;EACzC,aAAa;EACb,cAAc;EACd,qCAAqC;EACrC,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;EACnB,WAAW;EACX,wCAAwC;EACxC,mCAAmC;EACnC,gCAAgC;CACjC;;AAED;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,0BAA0B;EAC1B,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;AAED;EACE,WAAW;EACX,gBAAgB;CACjB","file":"AddToCard.css","sourcesContent":[".root {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 101px;\n  height: 101px;\n  background-color: rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  color: #fff;\n  text-align: center;\n  opacity: 0;\n  -webkit-transition: opacity 0.2s linear;\n  -o-transition: opacity 0.2s linear;\n  transition: opacity 0.2s linear;\n}\n\n.icon {\n  display: block;\n  margin-top: 26px;\n}\n\n.label {\n  color: rgb(255, 255, 255);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.14px;\n}\n\n.visible {\n  opacity: 1;\n  cursor: pointer;\n}\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "AddToCard-root-zbRFr",
	"icon": "AddToCard-icon-1BxHX",
	"label": "AddToCard-label-2EJFs",
	"visible": "AddToCard-visible-2y-gj"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/Banner.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Banner-root-3r1jc {\n  position: relative;\n  background-color: rgb(243, 246, 249);\n}\n\n.Banner-arrow-uv5LH {\n  cursor: pointer;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n          transform: translateY(-50%)\n}\n\n.Banner-arrowRight-1c5RB {\n  right: 40px;\n}\n\n.Banner-arrowLeft-19l2c {\n  left: 40px;\n}\n\n.Banner-dots-12QJT {\n  margin-bottom: 40px;\n  cursor: pointer;\n  margin-right: 10px;\n  display: inline-block;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  border: 2px solid rgb(51, 51, 51)\n}\n\n.Banner-dots-12QJT:lst-child {\n  margin-right: 0;\n}\n\n.Banner-activeDot-1o7FJ {\n  background-color: rgb(51, 51, 51);\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Banner/Banner.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,qCAAqC;CACtC;;AAED;EACE,gBAAgB;EAChB,mBAAmB;EACnB,SAAS;EACT,oCAAoC;MAChC,gCAAgC;UAC5B,2BAA2B;CACpC;;AAED;EACE,YAAY;CACb;;AAED;EACE,WAAW;CACZ;;AAED;EACE,oBAAoB;EACpB,gBAAgB;EAChB,mBAAmB;EACnB,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,iCAAiC;CAClC;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,kCAAkC;CACnC","file":"Banner.css","sourcesContent":[".root {\n  position: relative;\n  background-color: rgb(243, 246, 249);\n}\n\n.arrow {\n  cursor: pointer;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n          transform: translateY(-50%)\n}\n\n.arrowRight {\n  right: 40px;\n}\n\n.arrowLeft {\n  left: 40px;\n}\n\n.dots {\n  margin-bottom: 40px;\n  cursor: pointer;\n  margin-right: 10px;\n  display: inline-block;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  border: 2px solid rgb(51, 51, 51)\n}\n\n.dots:lst-child {\n  margin-right: 0;\n}\n\n.activeDot {\n  background-color: rgb(51, 51, 51);\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Banner-root-3r1jc",
	"arrow": "Banner-arrow-uv5LH",
	"arrowRight": "Banner-arrowRight-1c5RB",
	"arrowLeft": "Banner-arrowLeft-19l2c",
	"dots": "Banner-dots-12QJT",
	"activeDot": "Banner-activeDot-1o7FJ"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/components/Content/Content.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Content-root-LiT7r {\n  margin-left: calc(8.325% + 2.5px) !important;\n  position: relative;\n  min-height: 514px;\n}.Content-root-LiT7r > * {\n  position: absolute;\n  top: 50%;\n  right: auto;\n  bottom: auto;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.Content-title-1eG1Z {\n  margin: 0 0 10px 0;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 32px;\n  font-weight: 500;\n  line-height: 34px;\n}\n\n.Content-priceWrapper-1dUrS {\n  margin-bottom: 16px;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-weight: 600;\n  line-height: 24px;\n}\n\n.Content-price-1S-D9 {\n  font-size: 50px;\n}\n\n.Content-currency-1NrBt {\n  font-size: 35px;\n}\n\n.Content-rating-SX5Y5 {\n  margin-bottom: 51px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Banner/components/Content/Content.css"],"names":[],"mappings":"AAAA;EACE,6CAA6C;EAC7C,mBAAmB;EACnB,kBAAkB;CACnB;EACC,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,aAAa;EACb,UAAU;EACV,yCAAyC;MACrC,qCAAqC;UACjC,iCAAiC;CAC1C;;AAED;EACE,mBAAmB;EACnB,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,iCAAiC;EACjC,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,oBAAoB;CACrB","file":"Content.css","sourcesContent":[".root {\n  margin-left: calc(8.325% + 2.5px) !important;\n  position: relative;\n  min-height: 514px;\n}.root > * {\n  position: absolute;\n  top: 50%;\n  right: auto;\n  bottom: auto;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.title {\n  margin: 0 0 10px 0;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 32px;\n  font-weight: 500;\n  line-height: 34px;\n}\n\n.priceWrapper {\n  margin-bottom: 16px;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-weight: 600;\n  line-height: 24px;\n}\n\n.price {\n  font-size: 50px;\n}\n\n.currency {\n  font-size: 35px;\n}\n\n.rating {\n  margin-bottom: 51px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Content-root-LiT7r",
	"title": "Content-title-1eG1Z",
	"priceWrapper": "Content-priceWrapper-1dUrS",
	"price": "Content-price-1S-D9",
	"currency": "Content-currency-1NrBt",
	"rating": "Content-rating-SX5Y5"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Button/Button.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Button-root-1Z5Y8 {\n  display: inline-block;\n  vertical-align: middle;\n  padding: 16px 36px;\n  color: rgb(255, 255, 255);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.16px;\n  border-radius: 24px;\n  background-color: rgb(51, 51, 51);\n  outline: none;\n  border: none;\n  cursor: pointer;\n}\n\n.Button-black-2n9rU {\n  background-color: black;\n}\n\n.Button-gray-2qGn_ {\n  background-color: rgb(238, 238, 238);\n  color: rgb(0, 0, 0);\n}\n\n.Button-fullWidth-1C0oJ {\n  width: 100%;\n}\n\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Button/Button.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,0BAA0B;EAC1B,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,uBAAuB;EACvB,oBAAoB;EACpB,kCAAkC;EAClC,cAAc;EACd,aAAa;EACb,gBAAgB;CACjB;;AAED;EACE,wBAAwB;CACzB;;AAED;EACE,qCAAqC;EACrC,oBAAoB;CACrB;;AAED;EACE,YAAY;CACb","file":"Button.css","sourcesContent":[".root {\n  display: inline-block;\n  vertical-align: middle;\n  padding: 16px 36px;\n  color: rgb(255, 255, 255);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.16px;\n  border-radius: 24px;\n  background-color: rgb(51, 51, 51);\n  outline: none;\n  border: none;\n  cursor: pointer;\n}\n\n.black {\n  background-color: black;\n}\n\n.gray {\n  background-color: rgb(238, 238, 238);\n  color: rgb(0, 0, 0);\n}\n\n.fullWidth {\n  width: 100%;\n}\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Button-root-1Z5Y8",
	"black": "Button-black-2n9rU",
	"gray": "Button-gray-2qGn_",
	"fullWidth": "Button-fullWidth-1C0oJ"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Card/Card.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Card-root-3DP_V {\n  max-width: 270px;\n  overflow: hidden;\n}\n\n\n.Card-header-1WclK {\n  position: relative;\n}\n\n\n.Card-inner-bcFZ3 {\n  position: relative;\n  height: 382px;\n  background-color: rgb(243, 246, 249);\n}\n\n\n.Card-footer-3fzXP {\n  padding-top: 20px;\n  background-color: #fff;\n}\n\n\n.Card-footerHeader-1hmIv {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0.16px;\n}\n\n\n.Card-brand-2Pc-G {\n  color: rgb(153, 153, 153);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.14px;\n}\n\n\n.Card-like-1pRDE {\n  position: absolute;\n  right: 21px;\n  top: 21px;\n  -webkit-transition: color 0.2s linear;\n  -o-transition: color 0.2s linear;\n  transition: color 0.2s linear;\n  color: rgba(0, 0, 0, 0.5);\n  cursor: pointer\n}\n\n\n.Card-like-1pRDE:hover {\n  color: rgb(0, 0, 0);\n}\n\n\n.Card-disabled-3R6fb .Card-footerHeader-1hmIv {\n  color: rgba(17, 17, 17, 0.2);\n}\n\n\n.Card-disabled-3R6fb .Card-brand-2Pc-G {\n  color: rgba(153, 153, 153, 0.2);\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Card/Card.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,iBAAiB;CAClB;;;AAGD;EACE,mBAAmB;CACpB;;;AAGD;EACE,mBAAmB;EACnB,cAAc;EACd,qCAAqC;CACtC;;;AAGD;EACE,kBAAkB;EAClB,uBAAuB;CACxB;;;AAGD;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,uBAAuB;MACnB,+BAA+B;EACnC,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;;AAGD;EACE,0BAA0B;EAC1B,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;;AAGD;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;EACV,sCAAsC;EACtC,iCAAiC;EACjC,8BAA8B;EAC9B,0BAA0B;EAC1B,eAAe;CAChB;;;AAGD;EACE,oBAAoB;CACrB;;;AAGD;EACE,6BAA6B;CAC9B;;;AAGD;EACE,gCAAgC;CACjC","file":"Card.css","sourcesContent":[".root {\n  max-width: 270px;\n  overflow: hidden;\n}\n\n\n.header {\n  position: relative;\n}\n\n\n.inner {\n  position: relative;\n  height: 382px;\n  background-color: rgb(243, 246, 249);\n}\n\n\n.footer {\n  padding-top: 20px;\n  background-color: #fff;\n}\n\n\n.footerHeader {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0.16px;\n}\n\n\n.brand {\n  color: rgb(153, 153, 153);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.14px;\n}\n\n\n.like {\n  position: absolute;\n  right: 21px;\n  top: 21px;\n  -webkit-transition: color 0.2s linear;\n  -o-transition: color 0.2s linear;\n  transition: color 0.2s linear;\n  color: rgba(0, 0, 0, 0.5);\n  cursor: pointer\n}\n\n\n.like:hover {\n  color: rgb(0, 0, 0);\n}\n\n\n.disabled .footerHeader {\n  color: rgba(17, 17, 17, 0.2);\n}\n\n\n.disabled .brand {\n  color: rgba(153, 153, 153, 0.2);\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Card-root-3DP_V",
	"header": "Card-header-1WclK",
	"inner": "Card-inner-bcFZ3",
	"footer": "Card-footer-3fzXP",
	"footerHeader": "Card-footerHeader-1hmIv",
	"brand": "Card-brand-2Pc-G",
	"like": "Card-like-1pRDE",
	"disabled": "Card-disabled-3R6fb"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardGrid/CardGrid.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".CardGrid-root-4KRfw {\n  width: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.CardGrid-item-k2HYK {\n  width: calc(24.975% - 22.5px);\n  margin-bottom: 40px;\n}\n\n.CardGrid-item-k2HYK:nth-child(1n) {\n  float: left;\n  margin-right: 30px;\n  clear: none;\n}\n\n.CardGrid-item-k2HYK:last-child {\n  margin-right: 0;\n}\n\n.CardGrid-item-k2HYK:nth-child(4n) {\n  margin-right: 0;\n  float: right;\n}\n\n.CardGrid-item-k2HYK:nth-child(4n + 1) {\n  clear: both;\n}\n\n.CardGrid-item-3-30gei .CardGrid-item-k2HYK {\n    width: calc(33.3% - 20px);\n  }\n\n.CardGrid-item-3-30gei .CardGrid-item-k2HYK:nth-child(1n) {\n    float: left;\n    margin-right: 30px;\n    clear: none;\n  }\n\n.CardGrid-item-3-30gei .CardGrid-item-k2HYK:last-child {\n    margin-right: 0;\n  }\n\n.CardGrid-item-3-30gei .CardGrid-item-k2HYK:nth-child(3n) {\n    margin-right: 0;\n    float: right;\n  }\n\n.CardGrid-item-3-30gei .CardGrid-item-k2HYK:nth-child(3n + 1) {\n    clear: both;\n  }\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/CardGrid/CardGrid.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,qBAAqB;EACrB,cAAc;EACd,sBAAsB;MAClB,wBAAwB;EAC5B,qBAAqB;MACjB,4BAA4B;EAChC,oBAAoB;MAChB,gBAAgB;CACrB;;AAED;EACE,8BAA8B;EAC9B,oBAAoB;CACrB;;AAED;EACE,YAAY;EACZ,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,gBAAgB;EAChB,aAAa;CACd;;AAED;EACE,YAAY;CACb;;AAED;IACI,0BAA0B;GAC3B;;AAEH;IACI,YAAY;IACZ,mBAAmB;IACnB,YAAY;GACb;;AAEH;IACI,gBAAgB;GACjB;;AAEH;IACI,gBAAgB;IAChB,aAAa;GACd;;AAEH;IACI,YAAY;GACb","file":"CardGrid.css","sourcesContent":[".root {\n  width: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: start;\n      align-items: flex-start;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.item {\n  width: calc(24.975% - 22.5px);\n  margin-bottom: 40px;\n}\n\n.item:nth-child(1n) {\n  float: left;\n  margin-right: 30px;\n  clear: none;\n}\n\n.item:last-child {\n  margin-right: 0;\n}\n\n.item:nth-child(4n) {\n  margin-right: 0;\n  float: right;\n}\n\n.item:nth-child(4n + 1) {\n  clear: both;\n}\n\n.item-3 .item {\n    width: calc(33.3% - 20px);\n  }\n\n.item-3 .item:nth-child(1n) {\n    float: left;\n    margin-right: 30px;\n    clear: none;\n  }\n\n.item-3 .item:last-child {\n    margin-right: 0;\n  }\n\n.item-3 .item:nth-child(3n) {\n    margin-right: 0;\n    float: right;\n  }\n\n.item-3 .item:nth-child(3n + 1) {\n    clear: both;\n  }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "CardGrid-root-4KRfw",
	"item": "CardGrid-item-k2HYK",
	"item-3": "CardGrid-item-3-30gei"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardLabel/CardLabel.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".CardLabel-root-nk7G1 {\n  position: absolute;\n  background-color: #000;\n  color: rgb(255, 255, 255);\n  font-family: Roboto, sans-serif;\n  font-size: 20px;\n  font-weight: 300;\n  letter-spacing: 0.13px;\n  height: 34px;\n  line-height: 34px;\n  left: -45px;\n  top: 20px;\n  width: 160px;\n  text-align: center;\n  text-transform: capitalize;\n}\n\n.CardLabel-tape-z4Krs, .CardLabel-stock-2ONDI {\n  -webkit-transform: rotate(-45deg);\n      -ms-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n\n.CardLabel-circle-2ZAtq {\n  top: 20px;\n  left: 20px;\n  border-radius: 50%;\n  width: 37px;\n  height: 37px;\n  font-size: 10px;\n  line-height: 37px;\n  -webkit-transform: none;\n      -ms-transform: none;\n          transform: none;\n}\n\n.CardLabel-stock-2ONDI {\n  font-size: 12px;\n}\n\n\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/CardLabel/CardLabel.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,0BAA0B;EAC1B,gCAAgC;EAChC,gBAAgB;EAChB,iBAAiB;EACjB,uBAAuB;EACvB,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,UAAU;EACV,aAAa;EACb,mBAAmB;EACnB,2BAA2B;CAC5B;;AAED;EACE,kCAAkC;MAC9B,8BAA8B;UAC1B,0BAA0B;CACnC;;AAED;EACE,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,wBAAwB;MACpB,oBAAoB;UAChB,gBAAgB;CACzB;;AAED;EACE,gBAAgB;CACjB","file":"CardLabel.css","sourcesContent":[".root {\n  position: absolute;\n  background-color: #000;\n  color: rgb(255, 255, 255);\n  font-family: Roboto, sans-serif;\n  font-size: 20px;\n  font-weight: 300;\n  letter-spacing: 0.13px;\n  height: 34px;\n  line-height: 34px;\n  left: -45px;\n  top: 20px;\n  width: 160px;\n  text-align: center;\n  text-transform: capitalize;\n}\n\n.tape, .stock {\n  -webkit-transform: rotate(-45deg);\n      -ms-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n\n.circle {\n  top: 20px;\n  left: 20px;\n  border-radius: 50%;\n  width: 37px;\n  height: 37px;\n  font-size: 10px;\n  line-height: 37px;\n  -webkit-transform: none;\n      -ms-transform: none;\n          transform: none;\n}\n\n.stock {\n  font-size: 12px;\n}\n\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "CardLabel-root-nk7G1",
	"tape": "CardLabel-tape-z4Krs",
	"stock": "CardLabel-stock-2ONDI",
	"circle": "CardLabel-circle-2ZAtq"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Container/Container.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Container-root-l_-B9 {\n  max-width: 1170px;\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Container/Container.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;CACpB","file":"Container.css","sourcesContent":[".root {\n  max-width: 1170px;\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Container-root-l_-B9"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Footer/Footer.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Footer-root-1UUMy {\n  padding: 30px 0 46px 0;\n  background-color: rgb(35, 35, 35);\n  text-align: center;\n}\n\n.Footer-logo-34Amj {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px;\n}\n\n.Footer-services-qXJlN {\n  margin-bottom: 60px;\n}\n\n.Footer-descr-3q-5_ {\n  margin-bottom: 26px;\n  color: rgb(241, 241, 241);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  text-align: center;\n}\n\n.Footer-socials-2fG-x {\n  margin-bottom: 40px;\n}\n\n.Footer-navigation-3qOQi {\n  margin-bottom: 47px;\n}\n\n.Footer-terms-3gek3 {\n  color: rgb(241, 241, 241);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 24px;\n}\n\n\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Footer/Footer.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;CAC/M;;AAED;EACE,uBAAuB;EACvB,kCAAkC;EAClC,mBAAmB;CACpB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,oBAAoB;EACpB,0BAA0B;EAC1B,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,0BAA0B;EAC1B,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;CACnB","file":"Footer.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.root {\n  padding: 30px 0 46px 0;\n  background-color: rgb(35, 35, 35);\n  text-align: center;\n}\n\n.logo {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px;\n}\n\n.services {\n  margin-bottom: 60px;\n}\n\n.descr {\n  margin-bottom: 26px;\n  color: rgb(241, 241, 241);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  text-align: center;\n}\n\n.socials {\n  margin-bottom: 40px;\n}\n\n.navigation {\n  margin-bottom: 47px;\n}\n\n.terms {\n  color: rgb(241, 241, 241);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 24px;\n}\n\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Footer-root-1UUMy",
	"logo": "Footer-logo-34Amj",
	"services": "Footer-services-qXJlN",
	"descr": "Footer-descr-3q-5_",
	"socials": "Footer-socials-2fG-x",
	"navigation": "Footer-navigation-3qOQi",
	"terms": "Footer-terms-3gek3"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Group/Group.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Group-root-2Ebct {\n  margin-bottom: 20px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Form/Group/Group.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;CACrB","file":"Group.css","sourcesContent":[".root {\n  margin-bottom: 20px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Group-root-2Ebct"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Input/Input.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Input-input-2na58 {\n  display: block;\n  max-width: 100%;\n  width: 100%;\n  height: 50px;\n  border: 1px solid rgb(234, 234, 234);\n  background-color: transparent;\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  letter-spacing: 0.14px;\n  padding: 0 10px 0 10px;\n  outline: none\n}\n\n.Input-input-2na58:focus {\n  outline: none;\n}\n\n.Input-input-2na58::-webkit-input-placeholder {\n  /* Chrome/Opera/Safari */\n  color: rgb(153, 153, 153);\n}\n\n.Input-input-2na58::-moz-placeholder {\n  /* Firefox 19+ */\n  color: rgb(153, 153, 153);\n}\n\n.Input-input-2na58:-ms-input-placeholder {\n  /* IE 10+ */\n  color: rgb(153, 153, 153);\n}\n\n.Input-input-2na58:-moz-placeholder {\n  /* Firefox 18- */\n  color: rgb(153, 153, 153);\n}\n\n.Input-label-1K2tY {\n  color: rgb(85, 85, 85);\n  font-family: Poppins, sans-serif;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 30px;\n  letter-spacing: 0.15px;\n}\n\n.Input-error-SpBb3 {\n  font-size: 12px;\n  color: red;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Form/Input/Input.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,gBAAgB;EAChB,YAAY;EACZ,aAAa;EACb,qCAAqC;EACrC,8BAA8B;EAC9B,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,uBAAuB;EACvB,uBAAuB;EACvB,aAAa;CACd;;AAED;EACE,cAAc;CACf;;AAED;EACE,yBAAyB;EACzB,0BAA0B;CAC3B;;AAED;EACE,iBAAiB;EACjB,0BAA0B;CAC3B;;AAED;EACE,YAAY;EACZ,0BAA0B;CAC3B;;AAED;EACE,iBAAiB;EACjB,0BAA0B;CAC3B;;AAED;EACE,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;AAED;EACE,gBAAgB;EAChB,WAAW;CACZ","file":"Input.css","sourcesContent":[".input {\n  display: block;\n  max-width: 100%;\n  width: 100%;\n  height: 50px;\n  border: 1px solid rgb(234, 234, 234);\n  background-color: transparent;\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  letter-spacing: 0.14px;\n  padding: 0 10px 0 10px;\n  outline: none\n}\n\n.input:focus {\n  outline: none;\n}\n\n.input::-webkit-input-placeholder {\n  /* Chrome/Opera/Safari */\n  color: rgb(153, 153, 153);\n}\n\n.input::-moz-placeholder {\n  /* Firefox 19+ */\n  color: rgb(153, 153, 153);\n}\n\n.input:-ms-input-placeholder {\n  /* IE 10+ */\n  color: rgb(153, 153, 153);\n}\n\n.input:-moz-placeholder {\n  /* Firefox 18- */\n  color: rgb(153, 153, 153);\n}\n\n.label {\n  color: rgb(85, 85, 85);\n  font-family: Poppins, sans-serif;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 30px;\n  letter-spacing: 0.15px;\n}\n\n.error {\n  font-size: 12px;\n  color: red;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"input": "Input-input-2na58",
	"label": "Input-label-1K2tY",
	"error": "Input-error-SpBb3"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Header/Header.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Header-root-O9oW9, .Header-middle-2cC8B {\n  background: #fff;\n}\n\n.Header-top-2AeG3 {\n  background-color: #000;\n  height: 50px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.Header-middle-2cC8B {\n  height: 93px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.Header-row-tZOyY {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: baseline;\n      align-items: baseline;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Header/Header.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;CAC/M;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,uBAAuB;EACvB,aAAa;EACb,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;CACzB;;AAED;EACE,aAAa;EACb,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;CACzB;;AAED;EACE,qBAAqB;EACrB,cAAc;EACd,yBAAyB;MACrB,sBAAsB;EAC1B,uBAAuB;MACnB,+BAA+B;CACpC","file":"Header.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.root, .middle {\n  background: #fff;\n}\n\n.top {\n  background-color: #000;\n  height: 50px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.middle {\n  height: 93px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.row {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: baseline;\n      align-items: baseline;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Header-root-O9oW9",
	"middle": "Header-middle-2cC8B",
	"top": "Header-top-2AeG3",
	"row": "Header-row-tZOyY"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Jumbotron/Jumbotron.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Jumbotron-root-2IXwH {\n  padding: 60px 0 60px 50px;\n  background-color: rgb(242, 242, 242);\n}\n\n.Jumbotron-inner-2AoJt {\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(41.625% - 17.5px);\n      flex-basis: calc(41.625% - 17.5px);\n  max-width: calc(41.625% - 17.5px);\n  width: calc(41.625% - 17.5px);\n}\n\n.Jumbotron-inner-2AoJt:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.Jumbotron-inner-2AoJt:last-child {\n  margin-right: 0;\n}\n\n.Jumbotron-inner-2AoJt:nth-child(12n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.Jumbotron-title-3k946 {\n  color: rgb(51, 51, 51);\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 35px;\n  margin-top: 0;\n  margin-bottom: 23px;\n}\n\n.Jumbotron-title-3k946, .Jumbotron-descr-1RlOE, .Jumbotron-link-3MacZ {\n  font-family: Poppins, sans-serif;\n}\n\n.Jumbotron-descr-1RlOE {\n  margin-bottom: 30px;\n  color: rgb(85, 85, 85);\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 24px;\n}\n\n.Jumbotron-link-3MacZ {\n  display: block;\n  color: rgb(0, 0, 0);\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 24px;\n  margin-bottom: 34px;\n  text-decoration: underline\n}\n\n.Jumbotron-link-3MacZ:hover {\n  text-decoration: none;\n  color: #000;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Jumbotron/Jumbotron.css"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,qCAAqC;CACtC;;AAED;EACE,qBAAqB;MACjB,aAAa;EACjB,qBAAqB;MACjB,eAAe;EACnB,gDAAgD;MAC5C,mCAAmC;EACvC,kCAAkC;EAClC,8BAA8B;CAC/B;;AAED;EACE,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;EACE,uBAAuB;EACvB,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;EACd,oBAAoB;CACrB;;AAED;EACE,iCAAiC;CAClC;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;EACE,eAAe;EACf,oBAAoB;EACpB,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,oBAAoB;EACpB,0BAA0B;CAC3B;;AAED;EACE,sBAAsB;EACtB,YAAY;CACb","file":"Jumbotron.css","sourcesContent":[".root {\n  padding: 60px 0 60px 50px;\n  background-color: rgb(242, 242, 242);\n}\n\n.inner {\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(41.625% - 17.5px);\n      flex-basis: calc(41.625% - 17.5px);\n  max-width: calc(41.625% - 17.5px);\n  width: calc(41.625% - 17.5px);\n}\n\n.inner:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.inner:last-child {\n  margin-right: 0;\n}\n\n.inner:nth-child(12n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.title {\n  color: rgb(51, 51, 51);\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 35px;\n  margin-top: 0;\n  margin-bottom: 23px;\n}\n\n.title, .descr, .link {\n  font-family: Poppins, sans-serif;\n}\n\n.descr {\n  margin-bottom: 30px;\n  color: rgb(85, 85, 85);\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 24px;\n}\n\n.link {\n  display: block;\n  color: rgb(0, 0, 0);\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 24px;\n  margin-bottom: 34px;\n  text-decoration: underline\n}\n\n.link:hover {\n  text-decoration: none;\n  color: #000;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Jumbotron-root-2IXwH",
	"inner": "Jumbotron-inner-2AoJt",
	"title": "Jumbotron-title-3k946",
	"descr": "Jumbotron-descr-1RlOE",
	"link": "Jumbotron-link-3MacZ"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Layout/Layout.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n/*\n * normalize.css is imported in JS file.\n * If you import external CSS file from your internal CSS\n * then it will be inlined and processed with CSS modules.\n */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n\na {\n  text-decoration: none;\n  cursor: pointer\n}\n\na:hover  {\n  color: currentColor;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n* {\n  line-height: 1;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Layout/Layout.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;CAC/M;;AAED;;;;GAIG;;AAEH;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,2DAA2D;EAC3D,mBAAmB,CAAC,WAAW;CAChC;;AAED;EACE,UAAU;CACX;;AAED;EACE,eAAe;CAChB;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;;;;;;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;;;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAAoC;YAC5B,4BAA4B;IACpC,6BAA6B;GAC9B;;EAED;;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;;IAEE,YAAY;GACb;;EAED;;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;;;IAGE,WAAW;IACX,UAAU;GACX;;EAED;;IAEE,wBAAwB;GACzB;CACF;;AAED;EACE,sBAAsB;EACtB,eAAe;CAChB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,iBAAiB;EACjB,WAAW;EACX,UAAU;CACX;;AAED;EACE,eAAe;EACf,+BAA+B;UACvB,uBAAuB;CAChC","file":"Layout.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n/*\n * normalize.css is imported in JS file.\n * If you import external CSS file from your internal CSS\n * then it will be inlined and processed with CSS modules.\n */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n\na {\n  text-decoration: none;\n  cursor: pointer\n}\n\na:hover  {\n  color: currentColor;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n* {\n  line-height: 1;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Logo/Logo.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Logo-root-1RJ-1 {\n  width: 119px;\n  color: rgb(0, 0, 0);\n  font-family: Niconne, cursive;\n  font-size: 40px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0.4px;\n}\n\n.Logo-white-fpi9W {\n  color: #fff;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Logo/Logo.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,oBAAoB;EACpB,8BAA8B;EAC9B,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;EACf,sBAAsB;CACvB;;AAED;EACE,YAAY;CACb","file":"Logo.css","sourcesContent":[".root {\n  width: 119px;\n  color: rgb(0, 0, 0);\n  font-family: Niconne, cursive;\n  font-size: 40px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0.4px;\n}\n\n.white {\n  color: #fff;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Logo-root-1RJ-1",
	"white": "Logo-white-fpi9W"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Navigation/Navigation.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n.Navigation-root-2gcJx {}\n\n.Navigation-link-Ntl35 {\n  display: inline-block;\n  text-decoration: none;\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-size: 18px;\n  line-height: 24px;\n  font-weight: 400;\n  letter-spacing: 0.18px;\n  margin-right: 35px\n}\n\n.Navigation-link-Ntl35:last-child {\n  margin-right: 0;\n}\n\n.Navigation-link-Ntl35:active,\n.Navigation-link-Ntl35:visited,\n.Navigation-link-Ntl35:hover {\n  text-decoration: underline;\n  color: rgb(17, 17, 17);\n}\n\n.Navigation-white-2Qhfn .Navigation-link-Ntl35 {\n  color: rgb(241, 241, 241);\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 24px;\n}\n\n.Navigation-activeLink-3fFw0 {\n  text-decoration: underline;\n}\n\n\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Navigation/Navigation.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH,yBAAQ;;AAER;EACE,sBAAsB;EACtB,sBAAsB;EACtB,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,uBAAuB;EACvB,kBAAkB;CACnB;;AAED;EACE,gBAAgB;CACjB;;AAED;;;EAGE,2BAA2B;EAC3B,uBAAuB;CACxB;;AAED;EACE,0BAA0B;EAC1B,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;EACE,2BAA2B;CAC5B","file":"Navigation.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n.root {}\n\n.link {\n  display: inline-block;\n  text-decoration: none;\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-size: 18px;\n  line-height: 24px;\n  font-weight: 400;\n  letter-spacing: 0.18px;\n  margin-right: 35px\n}\n\n.link:last-child {\n  margin-right: 0;\n}\n\n.link:active,\n.link:visited,\n.link:hover {\n  text-decoration: underline;\n  color: rgb(17, 17, 17);\n}\n\n.white .link {\n  color: rgb(241, 241, 241);\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 24px;\n}\n\n.activeLink {\n  text-decoration: underline;\n}\n\n\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Navigation-root-2gcJx",
	"link": "Navigation-link-Ntl35",
	"white": "Navigation-white-2Qhfn",
	"activeLink": "Navigation-activeLink-3fFw0"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Rating/Rating.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Rating-root-3l1Po {\n  /*display: flex;*/\n\n  /*align-items: center;*/\n\n  /*justify-content: flex-start;*/\n}\n\n\n\n\n.Rating-star-3nDex {\n  color: rgb(51, 51, 51);\n  font-size: 15px;\n  margin-right: 5px\n}\n\n\n\n\n.Rating-star-3nDex:last-child {\n  margin-right: 0;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Rating/Rating.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;;EAElB,wBAAwB;;EAExB,gCAAgC;CACjC;;;;;AAKD;EACE,uBAAuB;EACvB,gBAAgB;EAChB,iBAAiB;CAClB;;;;;AAKD;EACE,gBAAgB;CACjB","file":"Rating.css","sourcesContent":[".root {\n  /*display: flex;*/\n\n  /*align-items: center;*/\n\n  /*justify-content: flex-start;*/\n}\n\n\n\n\n.star {\n  color: rgb(51, 51, 51);\n  font-size: 15px;\n  margin-right: 5px\n}\n\n\n\n\n.star:last-child {\n  margin-right: 0;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Rating-root-3l1Po",
	"star": "Rating-star-3nDex"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ServiceFeatures/ServiceFeatures.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".ServiceFeatures-root-3gAgd {\n  display: -ms-flexbox;\n  display: flex;\n}.ServiceFeatures-root-3gAgd {\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.ServiceFeatures-item-2UOba {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  text-align: center;\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(24.975% - 22.5px);\n      flex-basis: calc(24.975% - 22.5px);\n  max-width: calc(24.975% - 22.5px);\n  width: calc(24.975% - 22.5px);\n  height: 139px;\n  padding-top: 10px;\n  background-color: rgb(255, 255, 255);\n}\n\n.ServiceFeatures-item-2UOba:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.ServiceFeatures-item-2UOba:last-child {\n  margin-right: 0;\n}\n\n.ServiceFeatures-item-2UOba:nth-child(12n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.ServiceFeatures-title-3W9LW {\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0.18px;\n}\n\n.ServiceFeatures-descr-3hGAB {\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 15px;\n  font-weight: 300;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n}\n\n.ServiceFeatures-icon-vKteh {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/ServiceFeatures/ServiceFeatures.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,cAAc;CACf;EACC,sBAAsB;MAClB,wBAAwB;EAC5B,uBAAuB;MACnB,oBAAoB;CACzB;;AAED;EACE,mBAAmB;EACnB,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,sBAAsB;MAClB,wBAAwB;EAC5B,2BAA2B;MACvB,uBAAuB;EAC3B,mBAAmB;EACnB,qBAAqB;MACjB,aAAa;EACjB,qBAAqB;MACjB,eAAe;EACnB,gDAAgD;MAC5C,mCAAmC;EACvC,kCAAkC;EAClC,8BAA8B;EAC9B,cAAc;EACd,kBAAkB;EAClB,qCAAqC;CACtC;;AAED;EACE,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;EACE,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;AAED;EACE,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,WAAW;CACZ","file":"ServiceFeatures.css","sourcesContent":[".root {\n  display: -ms-flexbox;\n  display: flex;\n}.root {\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.item {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  text-align: center;\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(24.975% - 22.5px);\n      flex-basis: calc(24.975% - 22.5px);\n  max-width: calc(24.975% - 22.5px);\n  width: calc(24.975% - 22.5px);\n  height: 139px;\n  padding-top: 10px;\n  background-color: rgb(255, 255, 255);\n}\n\n.item:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.item:last-child {\n  margin-right: 0;\n}\n\n.item:nth-child(12n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.title {\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0.18px;\n}\n\n.descr {\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 15px;\n  font-weight: 300;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n}\n\n.icon {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "ServiceFeatures-root-3gAgd",
	"item": "ServiceFeatures-item-2UOba",
	"title": "ServiceFeatures-title-3W9LW",
	"descr": "ServiceFeatures-descr-3hGAB",
	"icon": "ServiceFeatures-icon-vKteh"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/SocialsList/SocialsList.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".SocialsList-root-2IRYf {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.SocialsList-item-1dG3e {\n  margin-right: 20px;\n}\n\n.SocialsList-icon-36WMn {\n  color: #fff;\n}\n\n.SocialsList-center-1gfcl {\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n\n.SocialsList-circle-1p_LG a {\n  display: inline-block;\n  border: 1px solid white;\n  border-radius: 50%;\n  width: 36px;\n  height: 36px;\n  text-align: center;\n  line-height: 36px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/SocialsList/SocialsList.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,qBAAqB;MACjB,4BAA4B;CACjC;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,YAAY;CACb;;AAED;EACE,sBAAsB;MAClB,wBAAwB;CAC7B;;AAED;EACE,sBAAsB;EACtB,wBAAwB;EACxB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;CACnB","file":"SocialsList.css","sourcesContent":[".root {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.item {\n  margin-right: 20px;\n}\n\n.icon {\n  color: #fff;\n}\n\n.center {\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n\n.circle a {\n  display: inline-block;\n  border: 1px solid white;\n  border-radius: 50%;\n  width: 36px;\n  height: 36px;\n  text-align: center;\n  line-height: 36px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "SocialsList-root-2IRYf",
	"item": "SocialsList-item-1dG3e",
	"icon": "SocialsList-icon-36WMn",
	"center": "SocialsList-center-1gfcl",
	"circle": "SocialsList-circle-1p_LG"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Tabs/Tabs.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Tabs-root-2ct5S {}\n\n.Tabs-list-22jMM {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  margin-bottom: 46px;\n}\n\n.Tabs-tab-SaViI {\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 24px;\n  letter-spacing: 0.16px;\n  cursor: pointer\n}\n\n.Tabs-tab-SaViI:hover {\n  text-decoration: underline;\n}\n\n.Tabs-selected-3qg1L {\n  text-decoration: underline;\n}\n\n.Tabs-panel-Qq_04 {\n  opacity: 0;\n  -webkit-transition: opacity 0.2s linear;\n  -o-transition: opacity 0.2s linear;\n  transition: opacity 0.2s linear;\n}\n\n.Tabs-panelActive-3o4MT {\n  opacity: 1;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Tabs/Tabs.css"],"names":[],"mappings":"AAAA,mBAAQ;;AAER;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,uBAAuB;MACnB,+BAA+B;EACnC,oBAAoB;CACrB;;AAED;EACE,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;EACvB,eAAe;CAChB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,WAAW;EACX,wCAAwC;EACxC,mCAAmC;EACnC,gCAAgC;CACjC;;AAED;EACE,WAAW;CACZ","file":"Tabs.css","sourcesContent":[".root {}\n\n.list {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  margin-bottom: 46px;\n}\n\n.tab {\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 24px;\n  letter-spacing: 0.16px;\n  cursor: pointer\n}\n\n.tab:hover {\n  text-decoration: underline;\n}\n\n.selected {\n  text-decoration: underline;\n}\n\n.panel {\n  opacity: 0;\n  -webkit-transition: opacity 0.2s linear;\n  -o-transition: opacity 0.2s linear;\n  transition: opacity 0.2s linear;\n}\n\n.panelActive {\n  opacity: 1;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Tabs-root-2ct5S",
	"list": "Tabs-list-22jMM",
	"tab": "Tabs-tab-SaViI",
	"selected": "Tabs-selected-3qg1L",
	"panel": "Tabs-panel-Qq_04",
	"panelActive": "Tabs-panelActive-3o4MT"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Title/Title.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.Title-title-3s3DD {\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-weight: 600;\n  letter-spacing: 0.28px;\n}\n\nh1.Title-title-3s3DD {\n  font-size: 92.8px;\n  font-size: 5.8rem;\n  font-weight: 400;\n  line-height: 66px;\n}\n\nh2.Title-title-3s3DD {\n  font-size: 28px;\n  line-height: 24px;\n}\n\n.Title-center-7NXQ0 {\n  text-align: center;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Title/Title.css"],"names":[],"mappings":";AACA;EACE,uBAAuB;EACvB,iCAAiC;EACjC,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,kBAAkB;EAClB,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;EACE,mBAAmB;CACpB","file":"Title.css","sourcesContent":["\n.title {\n  color: rgb(17, 17, 17);\n  font-family: Poppins, sans-serif;\n  font-weight: 600;\n  letter-spacing: 0.28px;\n}\n\nh1.title {\n  font-size: 92.8px;\n  font-size: 5.8rem;\n  font-weight: 400;\n  line-height: 66px;\n}\n\nh2.title {\n  font-size: 28px;\n  line-height: 24px;\n}\n\n.center {\n  text-align: center;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"title": "Title-title-3s3DD",
	"center": "Title-center-7NXQ0"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ToolBar/ToolBar.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".ToolBar-action-3zg3p {\n  cursor: pointer;\n  margin-right: 27px\n}\n\n\n.ToolBar-action-3zg3p:last-child {\n  margin-right: 0;\n}\n\n\n.ToolBar-bag-1T9Wf {\n  position: relative;\n  cursor: pointer;\n}\n\n\n.ToolBar-count-jkgLr {\n  position: absolute;\n  top: -12px;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 18px;\n  right: -9px;\n  width: 18px;\n  height: 18px;\n  background-color: rgb(0, 0, 0);\n  color: rgb(255, 255, 255);\n  font-family: Poppins, sans-serif;\n  font-size: 9px;\n  font-weight: 500;\n  letter-spacing: 0.09px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/ToolBar/ToolBar.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;;AAGD;EACE,gBAAgB;CACjB;;;AAGD;EACE,mBAAmB;EACnB,gBAAgB;CACjB;;;AAGD;EACE,mBAAmB;EACnB,WAAW;EACX,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,+BAA+B;EAC/B,0BAA0B;EAC1B,iCAAiC;EACjC,eAAe;EACf,iBAAiB;EACjB,uBAAuB;CACxB","file":"ToolBar.css","sourcesContent":[".action {\n  cursor: pointer;\n  margin-right: 27px\n}\n\n\n.action:last-child {\n  margin-right: 0;\n}\n\n\n.bag {\n  position: relative;\n  cursor: pointer;\n}\n\n\n.count {\n  position: absolute;\n  top: -12px;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 18px;\n  right: -9px;\n  width: 18px;\n  height: 18px;\n  background-color: rgb(0, 0, 0);\n  color: rgb(255, 255, 255);\n  font-family: Poppins, sans-serif;\n  font-size: 9px;\n  font-weight: 500;\n  letter-spacing: 0.09px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"action": "ToolBar-action-3zg3p",
	"bag": "ToolBar-bag-1T9Wf",
	"count": "ToolBar-count-jkgLr"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/AlreadyFooter/AlreadyFooter.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".AlreadyFooter-already-3C2dC {\n  margin-bottom: 27px;\n}\n\n.AlreadyFooter-already-3C2dC span:nth-child(1) {\n  margin-top: 30px;\n  height: 1px;\n  background-color: rgb(234, 234, 234);\n  display: block;\n}\n\n.AlreadyFooter-already-3C2dC span:nth-child(2) {\n  display: block;\n  text-align: center;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 30px;\n  letter-spacing: 0.14px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/modules/User/components/AlreadyFooter/AlreadyFooter.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;CACrB;;AAED;EACE,iBAAiB;EACjB,YAAY;EACZ,qCAAqC;EACrC,eAAe;CAChB;;AAED;EACE,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB","file":"AlreadyFooter.css","sourcesContent":[".already {\n  margin-bottom: 27px;\n}\n\n.already span:nth-child(1) {\n  margin-top: 30px;\n  height: 1px;\n  background-color: rgb(234, 234, 234);\n  display: block;\n}\n\n.already span:nth-child(2) {\n  display: block;\n  text-align: center;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 30px;\n  letter-spacing: 0.14px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"already": "AlreadyFooter-already-3C2dC"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Login/Login.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Login-footer-3iAIL {\n  margin-bottom: 30px;\n}\n\n.Login-container-2GWu_ {\n  max-width: 570px;\n  margin-left: auto;\n  margin-right: auto;\n  padding-bottom: 130px;\n}\n\n.Login-lead-2fmpT {\n  font-size: 1.25em;\n}\n\n.Login-formGroup-KBmQW {\n  margin-bottom: 15px;\n}\n\n.Login-label-39V5y {\n  display: block;\n  font-weight: 700;\n}\n\n.Login-button-2XWlL {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 20px;\n  cursor: pointer;\n}\n\n.Login-button-2XWlL:hover {\n  background: rgba(54, 50, 119, 0.8);\n  color: white;\n}\n\n.Login-button-2XWlL:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Login-facebook-20150 {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n\n.Login-facebook-20150:hover {\n  background: #2d4373;\n}\n\n.Login-google-1uzy0 {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n\n.Login-google-1uzy0:hover {\n  background: #c23321;\n}\n\n.Login-twitter--NdB- {\n  border-color: #55acee;\n  background: #55acee;\n}\n\n.Login-twitter--NdB-:hover {\n  background: #2795e9;\n}\n\n.Login-icon-2T6qL {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Login-lineThrough-1qWtO {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Login-lineThrough-1qWtO::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Login-lineThrough-1qWtO::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/modules/User/components/Login/Login.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;CAC/M;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;EACnB,sBAAsB;CACvB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAA+B;UACvB,uBAAuB;EAC/B,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,oBAAoB;EACpB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;EACnC,aAAa;CACd;;AAED;EACE,sBAAsB;EACtB,mDAAmD;UAC3C,2CAA2C;CACpD;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Login.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.footer {\n  margin-bottom: 30px;\n}\n\n.container {\n  max-width: 570px;\n  margin-left: auto;\n  margin-right: auto;\n  padding-bottom: 130px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: block;\n  font-weight: 700;\n}\n\n.button {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 20px;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n  color: white;\n}\n\n.button:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"footer": "Login-footer-3iAIL",
	"container": "Login-container-2GWu_",
	"lead": "Login-lead-2fmpT",
	"formGroup": "Login-formGroup-KBmQW",
	"label": "Login-label-39V5y",
	"button": "Login-button-2XWlL",
	"facebook": "Login-facebook-20150 Login-button-2XWlL",
	"google": "Login-google-1uzy0 Login-button-2XWlL",
	"twitter": "Login-twitter--NdB- Login-button-2XWlL",
	"icon": "Login-icon-2T6qL",
	"lineThrough": "Login-lineThrough-1qWtO"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Register/Register.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Register-root-3kv3t {\n  max-width: 570px;\n  padding-bottom: 100px;\n  margin-left: auto;\n  margin-right: auto;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/modules/User/components/Register/Register.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;CACpB","file":"Register.css","sourcesContent":[".root {\n  max-width: 570px;\n  padding-bottom: 100px;\n  margin-left: auto;\n  margin-right: auto;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Register-root-3kv3t"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding: 0 32px;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,sBAAsB;MAClB,wBAAwB;EAC5B,gBAAgB;EAChB,gBAAgB;EAChB,aAAa;EACb,wBAAwB;EACxB,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,UAAU;CACX;;AAED;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,sBAAsB;EACtB,iBAAiB;CAClB","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding: 0 32px;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/home/Home.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Home-root-1avl7 {\n  padding-bottom: 100px;\n}\n\n.Home-header-witsc {\n  margin-bottom: 56px;\n  text-align: center;\n}\n\n.Home-title-2Rav6 {\n  margin: 0;\n  color: rgb(17, 17, 17);\n  font-family: 'Poppins', sans-serif;\n  font-size: 28px;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.28px;\n}\n\n.Home-devider-1afBP {\n  display: inline-block;\n  width: 70px;\n  height: 1px;\n  margin-bottom: 15px;\n  margin-top: 20px;\n  background-color: rgb(17, 17, 17);\n}\n\n.Home-descr-11vug {\n  color: rgb(85, 85, 85);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 24px;\n  letter-spacing: 0.14px;\n}\n\n.Home-tabsHeader-1Jdr9 {\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(83.25% - 5px);\n      flex-basis: calc(83.25% - 5px);\n  max-width: calc(83.25% - 5px);\n  width: calc(83.25% - 5px);\n  margin-left: calc(8.325% + 2.5px) !important;\n}\n\n.Home-tabsHeader-1Jdr9:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.Home-tabsHeader-1Jdr9:last-child {\n  margin-right: 0;\n}\n\n.Home-tabsHeader-1Jdr9:nth-child(12n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.Home-jumbotron-1JFOP {\n  margin-bottom: 77px;\n}\n\n.Home-accentProducts-2Qvsy {\n  margin-bottom: 100px;\n}\n\n.Home-loadMore-1QqaL {\n  margin-top: 77px;\n  text-align: center;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/routes/home/Home.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;CAC/M;;AAED;EACE,sBAAsB;CACvB;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,uBAAuB;EACvB,mCAAmC;EACnC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;AAED;EACE,sBAAsB;EACtB,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,iBAAiB;EACjB,kCAAkC;CACnC;;AAED;EACE,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB;;AAED;EACE,qBAAqB;MACjB,aAAa;EACjB,qBAAqB;MACjB,eAAe;EACnB,4CAA4C;MACxC,+BAA+B;EACnC,8BAA8B;EAC9B,0BAA0B;EAC1B,6CAA6C;CAC9C;;AAED;EACE,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,qBAAqB;CACtB;;AAED;EACE,iBAAiB;EACjB,mBAAmB;CACpB","file":"Home.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.root {\n  padding-bottom: 100px;\n}\n\n.header {\n  margin-bottom: 56px;\n  text-align: center;\n}\n\n.title {\n  margin: 0;\n  color: rgb(17, 17, 17);\n  font-family: 'Poppins', sans-serif;\n  font-size: 28px;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.28px;\n}\n\n.devider {\n  display: inline-block;\n  width: 70px;\n  height: 1px;\n  margin-bottom: 15px;\n  margin-top: 20px;\n  background-color: rgb(17, 17, 17);\n}\n\n.descr {\n  color: rgb(85, 85, 85);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 24px;\n  letter-spacing: 0.14px;\n}\n\n.tabsHeader {\n  -ms-flex-positive: 0;\n      flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: calc(83.25% - 5px);\n      flex-basis: calc(83.25% - 5px);\n  max-width: calc(83.25% - 5px);\n  width: calc(83.25% - 5px);\n  margin-left: calc(8.325% + 2.5px) !important;\n}\n\n.tabsHeader:nth-child(1n) {\n  margin-right: 30px;\n  margin-left: 0;\n}\n\n.tabsHeader:last-child {\n  margin-right: 0;\n}\n\n.tabsHeader:nth-child(12n) {\n  margin-right: 0;\n  margin-left: auto;\n}\n\n.jumbotron {\n  margin-bottom: 77px;\n}\n\n.accentProducts {\n  margin-bottom: 100px;\n}\n\n.loadMore {\n  margin-top: 77px;\n  text-align: center;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Home-root-1avl7",
	"header": "Home-header-witsc",
	"title": "Home-title-2Rav6",
	"devider": "Home-devider-1afBP",
	"descr": "Home-descr-11vug",
	"tabsHeader": "Home-tabsHeader-1Jdr9",
	"jumbotron": "Home-jumbotron-1JFOP",
	"accentProducts": "Home-accentProducts-2Qvsy",
	"loadMore": "Home-loadMore-1QqaL"
};

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/isomorphic-style-loader/lib/insertCss.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-1!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./node_modules/normalize.css/normalize.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-1!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./node_modules/normalize.css/normalize.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-1!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./node_modules/normalize.css/normalize.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./package.json":
/***/ (function(module, exports) {

module.exports = {"name":"web","version":"0.0.0","private":true,"engines":{"node":">=6.5","npm":">=3.10"},"browserslist":[">1%","last 4 versions","Firefox ESR","not ie < 9"],"dependencies":{"@babel/plugin-transform-runtime":"^7.0.0-beta.42","@babel/polyfill":"7.0.0-beta.39","@babel/runtime":"^7.0.0-beta.42","antd":"^3.3.0","babel-plugin-import":"^1.6.7","babel-plugin-transform-runtime":"^6.23.0","bluebird":"^3.5.1","body-parser":"^1.18.2","classnames":"^2.2.5","cookie-parser":"^1.4.3","core-js":"^2.5.3","express":"^4.16.2","express-graphql":"^0.6.11","express-jwt":"^5.3.0","formik":"^0.11.11","graphql":"^0.12.3","history":"^4.7.2","isomorphic-style-loader":"^4.0.0","jsonwebtoken":"^8.1.0","lost":"^8.2.1","node-fetch":"^2.0.0","normalize.css":"^7.0.0","nuka-carousel":"^4.0.0","passport":"^0.4.0","passport-facebook":"^2.1.1","pretty-error":"^2.1.1","prop-types":"^15.6.0","query-string":"^5.0.1","rc-slider":"^8.6.1","react":"^16.2.0","react-dom":"^16.2.0","react-fontawesome":"^1.6.1","react-redux":"^5.0.6","react-select":"^1.2.1","react-svg-loader":"^2.1.0","react-tabs":"^2.2.1","react-text-mask":"^5.2.1","react-treebeard":"^2.1.0","redux":"^3.7.2","redux-devtools-extension":"^2.13.2","redux-logger":"^3.0.6","redux-saga":"^0.16.0","redux-thunk":"^2.2.0","reselect":"^3.0.1","seamless-immutable":"^7.1.3","semantic-ui-react":"^0.78.3","sequelize":"^4.28.6","serialize-javascript":"^1.3.0","source-map-support":"^0.5.0","sqlite3":"^3.1.13","universal-router":"^6.0.0","whatwg-fetch":"^2.0.3","yup":"^0.24.1"},"devDependencies":{"@babel/core":"^7.0.0-beta.42","@babel/node":"7.0.0-beta.39","@babel/plugin-transform-react-constant-elements":"7.0.0-beta.39","@babel/plugin-transform-react-inline-elements":"7.0.0-beta.39","@babel/preset-env":"7.0.0-beta.39","@babel/preset-flow":"7.0.0-beta.39","@babel/preset-react":"7.0.0-beta.39","@babel/preset-stage-2":"7.0.0-beta.39","assets-webpack-plugin":"^3.5.1","autoprefixer":"^7.2.3","babel-core":"^7.0.0-0","babel-eslint":"^8.1.2","babel-jest":"^22.0.4","babel-loader":"8.0.0-beta.0","babel-plugin-transform-react-remove-prop-types":"^0.4.12","browser-sync":"^2.21.0","chokidar":"^2.0.0","css-loader":"^0.28.7","enzyme":"^3.2.0","eslint":"^4.14.0","eslint-config-airbnb":"^16.1.0","eslint-config-prettier":"^2.9.0","eslint-import-resolver-node":"^0.3.1","eslint-loader":"^1.9.0","eslint-plugin-css-modules":"^2.7.5","eslint-plugin-flowtype":"^2.40.1","eslint-plugin-import":"^2.8.0","eslint-plugin-jsx-a11y":"^6.0.3","eslint-plugin-prettier":"^2.4.0","eslint-plugin-react":"^7.5.1","file-loader":"^1.1.6","flow-bin":"^0.65.0","front-matter":"^2.3.0","glob":"^7.1.2","husky":"^0.14.3","identity-obj-proxy":"^3.0.0","jest":"^22.0.4","lint-staged":"^6.0.0","markdown-it":"^8.4.0","mkdirp":"^0.5.1","null-loader":"^0.1.1","opn-cli":"^3.1.0","pixrem":"^4.0.1","pleeease-filters":"^4.0.0","postcss":"^6.0.14","postcss-calc":"^6.0.1","postcss-color-function":"^4.0.1","postcss-custom-media":"^6.0.0","postcss-custom-properties":"^6.2.0","postcss-custom-selectors":"^4.0.1","postcss-flexbugs-fixes":"^3.2.0","postcss-import":"^11.0.0","postcss-loader":"^2.0.9","postcss-media-minmax":"^3.0.0","postcss-nested":"^3.0.0","postcss-nesting":"^4.2.1","postcss-pseudoelements":"^5.0.0","postcss-selector-matches":"^3.0.1","postcss-selector-not":"^3.0.1","prettier":"^1.9.2","raw-loader":"^0.5.1","react-deep-force-update":"^2.1.1","react-dev-utils":"^5.0.0","react-error-overlay":"^4.0.0","react-test-renderer":"^16.2.0","redux-mock-store":"^1.4.0","rimraf":"^2.6.2","stylelint":"^8.4.0","stylelint-config-standard":"^18.0.0","stylelint-order":"^0.8.0","svg-url-loader":"^2.3.1","url-loader":"^0.6.2","webpack":"^3.10.0","webpack-bundle-analyzer":"^2.9.1","webpack-dev-middleware":"^2.0.3","webpack-hot-middleware":"^2.21.0","webpack-node-externals":"^1.6.0"},"scripts":{"lint-js":"eslint --ignore-path .gitignore --ignore-pattern \"!**/.*\" .","lint-css":"stylelint \"src/**/*.{css,less,styl,scss,sass,sss}\"","lint":"yarn run lint-js && yarn run lint-css","fix-js":"yarn run lint-js --fix","fix-css":"yarn run lint-css --fix","fix":"yarn run fix-js && yarn run fix-css","check":"flow check","test":"jest","test-watch":"yarn run test --watch --notify","test-cover":"yarn run test --coverage","coverage":"yarn run test-cover && opn coverage/lcov-report/index.html","clean":"babel-node tools/run clean","copy":"babel-node tools/run copy","bundle":"babel-node tools/run bundle","build":"babel-node tools/run build","build-stats":"yarn run build --release --analyse","deploy":"babel-node tools/run deploy","render":"babel-node tools/run render","serve":"babel-node tools/run runServer","start":"babel-node tools/run start"}}

/***/ }),

/***/ "./src/components/AccentProducts/AccentProducts.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AccentProducts/AccentProducts.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AccentProducts/AccentProducts.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AccentProducts/AccentProducts.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/AccentProducts/AccentProducts.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_CardLabel__ = __webpack_require__("./src/components/CardLabel/CardLabel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css__ = __webpack_require__("./src/components/AccentProducts/AccentProducts.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/AccentProducts/AccentProducts.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var AccentProducts =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AccentProducts, _React$PureComponent);

  function AccentProducts() {
    _classCallCheck(this, AccentProducts);

    return _possibleConstructorReturn(this, (AccentProducts.__proto__ || Object.getPrototypeOf(AccentProducts)).apply(this, arguments));
  }

  _createClass(AccentProducts, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          list = _props.list,
          classes = _props.classes;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.root, classes.root]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      }, list[0].name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      }, "$"), list[0].price)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, list[1].name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, "$"), list[1].price))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productBig]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, list[2].name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      }, "$"), " ", list[2].price))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productBig]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_CardLabel__["a" /* default */], {
        type: "tape",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, "Hot"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, list[3].name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, "$"), list[3].price))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.right]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }, list[4].name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, "$"), list[4].price)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.right]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, list[5].name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, "$"), list[5].price))));
    }
  }]);

  return AccentProducts;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

AccentProducts.defaultProps = {
  classes: {
    root: ''
  },
  list: [{
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a)(AccentProducts));

/***/ }),

/***/ "./src/components/AddToCard/AddToCard.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AddToCard/AddToCard.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AddToCard/AddToCard.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/AddToCard/AddToCard.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/AddToCard/AddToCard.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AddToCard_css__ = __webpack_require__("./src/components/AddToCard/AddToCard.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__AddToCard_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/AddToCard/AddToCard.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var AddToCard = function AddToCard(_ref) {
  var handleClick = _ref.handleClick,
      visible = _ref.visible;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.visible, visible)]),
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
    name: "shopping-cart",
    className: __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.icon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "Add to Cart"));
};

AddToCard.defaultProps = {
  handleClick: function handleClick() {}
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a)(AddToCard));

/***/ }),

/***/ "./src/components/App.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




var ContextType = _extends({
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // Universal HTTP client
  fetch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  pathname: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  query: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  currency: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
}, __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"].childContextTypes);
/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */


var App =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(App, _React$PureComponent);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "getChildContext",
    value: function getChildContext() {
      return this.props.context;
    }
  }, {
    key: "render",
    value: function render() {
      // NOTE: If you need to add or modify header, footer etc. of the app,
      // please do that inside the Layout component.
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children);
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

Object.defineProperty(App, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    context: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape(ContextType).isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
  }
});
Object.defineProperty(App, "childContextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: ContextType
});
/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),

/***/ "./src/components/Banner/Banner.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/Banner.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/Banner.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/Banner.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Banner/Banner.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuka_carousel__ = __webpack_require__("nuka-carousel");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuka_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuka_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Banner_css__ = __webpack_require__("./src/components/Banner/Banner.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Banner_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Banner_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Banner/Banner.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Banner = function Banner(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_nuka_carousel___default.a, {
    cellAlign: "left",
    className: __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.slider,
    renderBottomCenterControls: function renderBottomCenterControls(props) {
      var box = [];

      var _loop = function _loop(i) {
        box.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
          onClick: function onClick() {
            return props.goToSlide(i);
          },
          className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.dots, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.activeDot, i === props.currentSlide)]),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 17
          },
          __self: this
        }));
      };

      for (var i = 0; i < props.slideCount; i++) {
        _loop(i);
      }

      return box;
    },
    renderCenterLeftControls: function renderCenterLeftControls(_ref2) {
      var previousSlide = _ref2.previousSlide;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
        onClick: previousSlide,
        className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrow, __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrowLeft]),
        size: "2x",
        name: "long-arrow-left",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      });
    },
    renderCenterRightControls: function renderCenterRightControls(_ref3) {
      var nextSlide = _ref3.nextSlide;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
        onClick: nextSlide,
        className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrow, __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrowRight]),
        size: "2x",
        name: "long-arrow-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, props.children));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a)(Banner));

/***/ }),

/***/ "./src/components/Banner/components/Content/Content.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/components/Content/Content.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/components/Content/Content.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Banner/components/Content/Content.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Banner/components/Content/Content.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_Button__ = __webpack_require__("./src/components/Button/Button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Rating__ = __webpack_require__("./src/components/Rating/Rating.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Content_css__ = __webpack_require__("./src/components/Banner/components/Content/Content.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Content_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Content_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__("./src/components/Container/Container.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Banner/components/Content/Content.js";







var Content = function Content(_ref) {
  var title = _ref.title,
      price = _ref.price,
      buttonLabel = _ref.buttonLabel;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, title), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.priceWrapper,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.currency,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, "$"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, price)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Rating__["a" /* default */], {
    classes: {
      root: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.rating
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_components_Button__["a" /* default */], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, buttonLabel)));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Content_css___default.a)(Content));

/***/ }),

/***/ "./src/components/Button/Button.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Button/Button.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Button/Button.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Button/Button.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Button/Button.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Button_css__ = __webpack_require__("./src/components/Button/Button.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Button_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Button_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Button/Button.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }








var Button = function Button(_ref) {
  var classes = _ref.classes,
      onClick = _ref.onClick,
      children = _ref.children,
      theme = _ref.theme,
      fullWidth = _ref.fullWidth,
      isLoading = _ref.isLoading,
      rest = _objectWithoutProperties(_ref, ["classes", "onClick", "children", "theme", "fullWidth", "isLoading"]);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", _extends({
    onClick: onClick,
    className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Button_css___default.a.root, [__WEBPACK_IMPORTED_MODULE_5__Button_css___default.a[theme]], _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__Button_css___default.a.fullWidth, fullWidth), classes.root])
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }), isLoading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default.a, {
    pulse: true,
    name: "spinner",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }) : children);
};

Button.defaultProps = {
  classes: {
    root: ''
  },
  theme: '',
  fullWidth: false,
  isLoading: false
};
Button.propTypes = {
  classes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    root: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Button_css___default.a)(Button));

/***/ }),

/***/ "./src/components/Card/Card.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Card/Card.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Card/Card.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Card/Card.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Card/Card.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_CardLabel_CardLabel__ = __webpack_require__("./src/components/CardLabel/CardLabel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_AddToCard__ = __webpack_require__("./src/components/AddToCard/AddToCard.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Card_css__ = __webpack_require__("./src/components/Card/Card.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Card_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Card_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Card/Card.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }










var Card =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Card, _PureComponent);

  function Card() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Card.__proto__ || Object.getPrototypeOf(Card)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        visibleAddTo: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "toggleVisibleAddTo", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.labelType !== 'stock') {
          _this.setState({
            visibleAddTo: !_this.state.visibleAddTo
          });
        }
      }
    }), _temp));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          name = _props.name,
          price = _props.price,
          brand = _props.brand,
          labelType = _props.labelType,
          labelTxt = _props.labelTxt;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.root,
        onMouseEnter: this.toggleVisibleAddTo,
        onMouseLeave: this.toggleVisibleAddTo,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.inner,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_AddToCard__["a" /* default */], {
        visible: this.state.visibleAddTo,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("header", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.header,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_CardLabel_CardLabel__["a" /* default */], {
        type: labelType,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, labelTxt), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default.a, {
        name: "heart",
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.like,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("footer", {
        className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.footer, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.disabled, labelType === 'stock')]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.footerHeader,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, price)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.brand,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }, brand)));
    }
  }]);

  return Card;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

Card.propTypes = {
  price: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  brand: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  labelTxt: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  labelType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Card_css___default.a)(Card));

/***/ }),

/***/ "./src/components/CardGrid/CardGrid.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardGrid/CardGrid.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardGrid/CardGrid.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardGrid/CardGrid.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/CardGrid/CardGrid.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CardGrid_css__ = __webpack_require__("./src/components/CardGrid/CardGrid.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__CardGrid_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Card__ = __webpack_require__("./src/components/Card/Card.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/CardGrid/CardGrid.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var CardGrid = function CardGrid(_ref) {
  var list = _ref.list,
      gridCount = _ref.gridCount;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a[gridCount], true)]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, list.map(function (item) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
      className: __WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a.item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Card__["a" /* default */], _extends({}, item, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    })));
  }));
};

CardGrid.defaultProps = {};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a)(CardGrid));

/***/ }),

/***/ "./src/components/CardLabel/CardLabel.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardLabel/CardLabel.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardLabel/CardLabel.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/CardLabel/CardLabel.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/CardLabel/CardLabel.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icons_stock_svg__ = __webpack_require__("./src/components/CardLabel/icons/stock.svg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icons_stock_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__icons_stock_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CardLabel_css__ = __webpack_require__("./src/components/CardLabel/CardLabel.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__CardLabel_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/CardLabel/CardLabel.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var CardLabel = function CardLabel(_ref) {
  var type = _ref.type,
      txt = _ref.txt,
      children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default.a[type], true)]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, children);
};

CardLabel.defaultProps = {
  txt: 'sale',
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['tape', 'circle'])
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default.a)(CardLabel));

/***/ }),

/***/ "./src/components/CardLabel/icons/stock.svg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(__webpack_require__("@babel/runtime/core-js/object/assign"));

var _react = _interopRequireDefault(__webpack_require__("react"));

var _extends = _assign.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var _default = function _default(_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return _react.default.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: "132",
    height: "120",
    viewBox: "0 0 132 120"
  }, props), _react.default.createElement("defs", null, _react.default.createElement("path", {
    id: "a",
    d: "M720.5 2532.9c.5-1.55 2.58-2.23 4.9-1.77 2.67.53 7.03 7 2.29 8.11-4.21-.75-8.33-2.78-7.18-6.34zm49.31 5.83c.01-1.33 1.82-2.24 4.25-1.52 2.86 3.4-4.26 4.49-4.25 1.52zm-45.39 3.8c-2.07-.75-2.43-2.84-3.59-4.3 1.8.96 2.84 2.53 3.6 4.3zm-62.37 9.38c-4.27-3.94 6.49-3.85 2.29 0zm113.97 0c.46-.85 2.4-.94 3.6-.5 1.99 2.7-4.22 3.57-3.6.5zm-55.52 4.56c-1.23 1.92-1.34 4.7-3.26 6.08.73-2.13 1.07-4.57 2.29-6.33.52-.07.56.24.97.25zm-41.47 19c.23-.9 1.54-.35 1.96 0-.33.72-1.39-.06-1.96 0zm93.07 5.33c-.12-1.36.81-1.9 2.61-1.78-.06 1.23-1.12 1.67-2.61 1.78zm-105.8 1.77c-2.14-.37-3.87-1.05-4.57-2.53 1.89.56 3.57 1.28 4.57 2.53zm78.04 9.63c1.86-.95 5.76-1.57 8.17-1.27-1.7.76-5.44.64-8.17 1.27zm11.76 25.6c-2.3-.16-4.05-.75-5.23-1.78 1.6.7 4.42.45 5.23 1.77zm-98.62 1.26c-.71-.36-1.63-1.4-.98-2.03 1.22-.01.94 1.13.98 2.03zm102.86 8.62c-.53-1.64 1.01-2.98 3.92-2.79 5 2.7-2.8 6.22-3.92 2.79zm-94.7-1.02c-.34-.94.82-.72.66-1.52 1.04-.28.38 1.8-.66 1.52zm82.62-1.01c-.08.45-.56.58-1.3.5v-.75c.68-.11.86.17 1.3.25zm-71.19 8.62c.57-3.2 4.1-4.08 5.55-6.6.39.05.28.47.33.77-2.04 1.88-3.3 4.37-5.88 5.83zm76.42-4.06v1.27c-.78.46-1.9.66-2.94.25-.59-2.04 1.56-2.32 2.94-1.52zm23.18 4.06c.2 1.08-.29 1.63-.98 2.02-1.42.18-1.8-.45-2.28-1.01.08-1.48 1.99-1.8 3.26-1.01zm-37.88 2.02c.1.59-.05.98-.33 1.27-1.02.12-1.45-.22-1.3-1.01.79.1.7-.47 1.63-.26zm-40.16 1.02c.58-.04.68.3 1.3.25-1.55 4.7-2.1 10.19-5.55 13.43.46-1.16.34-2.6.98-4.06.3-.7 1.32-1.27 1.63-2.02 1.02-2.44-.42-6.13 1.64-7.6zm-9.15 1.52c1.65 1.76 2.64 4.03 4.57 5.57-1.5 1.37-4 1.96-4.57 4.06-2.69.83-4.55.6-7.84.25-1.17-.95-2.24-1.97-3.59-2.79-1.93-5.96 4.85-9.24 11.43-7.1zm32.98 4.05c.34 1.36-.44 1.85-1.3 2.28-.96.07-1-.57-1.96-.5-1.47-1.72 1.72-3.18 3.26-1.78zm-27.1 0c1.5.04-.21 1.14 0 1.77-.97-.36.43-.98 0-1.77zm-28.41-60.3c1.83.6 3.28 1.5 4.9 2.27-.22.12-4.1-1.17-4.9-2.28zm-10.78 25.33c.25-.95-1.24-.55-1.3-1.27.04-.8.74-1.11 1.96-1 .29.53 1 .74.98 1.51-1.92.1-.81.22-1.64.76zm86.87 6.08c-2.69-.02-4-1.11-6.2-1.52-.29.46-.73.8-1.31 1.02-2.81-.5-2.8-2.46-6.53-1.78-6.1 1.12.54 7.8.97 11.4.78.5 2.28.44 2.95 1.02-.74 3.9 2.52 6.09 3.26 10.14-2.64-.83-3.72-2.86-4.57-5.07-3.2-2.6-5.6-5.8-10.13-7.35-1.3-1.52-2.23-3.34-5.22-3.55-1.26.68-.79 1.2-.98 2.79-1.93-.27-2.43 1.95-3.26 3.3-1.94.09-3.32.18-4.9 1-.48 1.58 0 3.89-1.96 4.32-2.87.1-2.77-2.08-2.62-4.31-2.74 1.25-.64 6.25-2.93 7.85.3-3.33.45-6.65.97-9.88-1.2-2.03-3.34-3.32-4.9-5.07-3 .96-2.68 4.5-5.87 5.32-.11-2.48 3.83-3.07 2.94-5.32-3.3.92-3.54 5.51-6.53 5.83.2-1.27 1.26-1.9 1.96-2.79-3.22-.08-4.19 2.82-6.2 4.82-2.57 2.53-6.14 4.5-8.17 6.84-1.91.36-3.59.2-5.23-.26-1.36-4.9 4.42-7.63 8.82-10.38 3.05-1.91 6.32-4.22 6.86-7.35-1.17-.77-2.1 1.53-3.27.76.9-1.84 3.96-1.71 3.6-3.8-.48-2.75-4.66-1.63-7.19-1.02-4.38 1.06-9.53 2.5-12.4 2.79.27-.97 1.95-.85 2.93-1.27-1.34-.78-4.98-.97-4.25-2.53 1.12.97.2-.26 2.29-.25.73-.04-.42-.64 0-1.27.76.08 1.35.3 1.96.5-.71-1.57-2.76-.9-4.57-1.26-2.98 2.32-10.46 4.5-15.35 5.32 2.04-1.54 5.45-2.02 8.16-3.04.77-1.6 4.2-3.1 5.56-5.07-.56-1.05-2.58.01-3.27-.5 3.79-1.63 5.55-4.82 9.47-6.34-.9-1.2-.9-1.53-.98-3.3.39-.29 1.15-.28 1.96-.25-4.08-2.57-14.21-.46-16-4.81.38-.04.27-.47.32-.76 2.25-.31 2.51-1.86 4.58-1.27.23.69-1.54-.18-1.3.5 6.18 2.49 17.49 4.61 24.16 1.02-1.96-1.86-6.12-2.01-7.84-4.05 2.2 1.16 5.1 1.77 7.5 2.78.91-1.47-.02-3.69 0-5.32-5.67-4.96-15.09-7.04-18.6-13.68 5.7.05 8.14 4.82 13.71 5.83.12 2.22 1.14 2.85 3.92 4.05 3.36 1.45 9.17 4 11.43.25 2-7.15-3.07-12.73-6.86-19.5-1.45-2.61-3.61-8.42-5.22-11.92-.7-1.5-1.5-4.44 2.6-4.05 5.1.48 3.98 10.47 7.2 12.16 2.27 9.05 8.08 15.35 15.01 20.78 3.98.89 2.67-2.62 2.94-4.56 1.67-.36 1.4.77 2.29 1.01 2.7.6 6.8-3.47 3.27-2.28.26-1.66-2.64-2.98-1.64-5.07 2.8.2 3.03 2.38 3.92 4.06 2.53-.15.5-3.84 2.61-4.31-.23 1.39-.65 1.23-.65 2.53 2.57-1.02 2.25-6.97 6.86-4.05.95 3.87-.67 7.03 1.3 10.64 1.15-.12.8-1.41 1.64-1.77 2.86.25.56 2.6.98 4.05-.76.34-1.86.42-2.62.76-1.2 2.17.6 2.96 1.31 4.31.5.95-.6 2.63 1.3 2.79.5 0-1.28-1.84.33-2.03 1.13-.08 1.2 1.33.66 1.78 4-1.2 5.6-4.27 9.47-5.58 4.42.35 7.16-4.6 10.45-1.27-.1 2.24-2.43 3.3-4.58 4.31-4.34 2.03-6.84 5.88-11.75 7.86-.56 4 3.87 3.7 7.83 3.04-.22 1.18-2.75.56-3.26 1.52.4 1.2 1 .88 2.29.5.6.49-.2.46 0 1.27 2.28.17 3.1-.8 5.55-.5.18.36.5.61.98.76-3.8 5.57 7.06 4.8 6.2 8.36-.7 2.9-9.66.38-9.47 4.56-1.42.16-3.1.13-3.92.76.25.65.8 1.07 1.63 1.27-1.09.91-1.41-.92-2.6-.76-2.22 1.42 1.69 1.9 2.93 2.28.8-.03.07-.84-.33-.76 1.4-.49 2.9 1.12 3.6 2.02zm-66.95-4.81c-1.82-.58-4.52 1.37-6.53 0-1.25.97-1.31 2.27-.65 3.04 2.28-1.1 6.2-.93 7.18-3.04zm-2.6-3.3c-1.17-.05-1.97.18-2.3.76 1.3.16 1.7-.37 2.3-.76zm4.89-3.29c-2.08-1.89-5.95.33-7.51 1.27.24.57.29 1.3.65 1.77 2.02-.46 4.74-.37 5.88-1.52-.57-.14-1.92.3-1.96-.25 1.4-.1 2.37-.53 2.94-1.27zm1.63-3.04c-.6-.55-1.75-.67-2.28-1.27.12-3.58-6.55-4.5-6.2-.25 2.13.28 3.1 1.48 4.24 2.53.64-.93 3.84.11 4.24-1.01zm-8.16 21.54h-.02.02zm-.02 0c-.22.14-3.18 3.05-4.88 2.53 1.2-1.18 2.96-1.91 4.88-2.53zm13.73 4.3c-.68.66-.79 1.76-1.96 2.03.69-.65.8-1.75 1.96-2.02z"
  })), _react.default.createElement("g", {
    clipPath: "url(#clip-4801)",
    transform: "translate(-648 -2531)"
  }, _react.default.createElement("use", {
    fill: "#111",
    xlinkHref: "#a"
  })));
};

exports.default = _default;

/***/ }),

/***/ "./src/components/Container/Container.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Container/Container.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Container/Container.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Container/Container.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Container/Container.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Container_css__ = __webpack_require__("./src/components/Container/Container.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Container_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Container_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Container/Container.js";





var Container = function Container(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Container_css___default.a.root, props.className]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, props.children);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Container_css___default.a)(Container));

/***/ }),

/***/ "./src/components/Footer/Footer.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Footer/Footer.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Footer/Footer.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Footer/Footer.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Footer/Footer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_ServiceFeatures__ = __webpack_require__("./src/components/ServiceFeatures/ServiceFeatures.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Container__ = __webpack_require__("./src/components/Container/Container.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Logo__ = __webpack_require__("./src/components/Logo/Logo.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Navigation__ = __webpack_require__("./src/components/Navigation/Navigation.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_SocialsList__ = __webpack_require__("./src/components/SocialsList/SocialsList.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Footer_css__ = __webpack_require__("./src/components/Footer/Footer.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Footer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Footer_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Footer/Footer.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









var Footer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Container__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_components_ServiceFeatures__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.services
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Logo__["a" /* default */], {
        theme: "white",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.logo
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.descr,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, "A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame."), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_SocialsList__["a" /* default */], {
        type: "circle",
        center: true,
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.socials
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Navigation__["a" /* default */], {
        theme: "white",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.navigation
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.terms,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, "\xA9 2017 Shippon.All rights reserved.")));
    }
  }]);

  return Footer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a)(Footer));

/***/ }),

/***/ "./src/components/Form/Group/Group.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Group/Group.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Group/Group.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Group/Group.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Form/Group/Group.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Group_css__ = __webpack_require__("./src/components/Form/Group/Group.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Group_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Group_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Form/Group/Group.js";






var Group = function Group(_ref) {
  var children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Group_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, children);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Group_css___default.a)(Group));

/***/ }),

/***/ "./src/components/Form/Input/Input.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Input/Input.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Input/Input.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Form/Input/Input.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Form/Input/Input.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_text_mask__ = __webpack_require__("react-text-mask");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_text_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Input_css__ = __webpack_require__("./src/components/Form/Input/Input.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Input_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Input_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Form/Input/Input.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }








var renderErrors = function renderErrors(error) {
  var isArray = Array.isArray(error);

  if (isArray) {
    return error.map(function (err) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__Input_css___default.a.error,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: this
      }, err);
    });
  }

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_5__Input_css___default.a.error,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, error);
};

var Input = function Input(_ref) {
  var label = _ref.label,
      type = _ref.type,
      value = _ref.value,
      handlers = _ref.handlers,
      error = _ref.error,
      mask = _ref.mask,
      rest = _objectWithoutProperties(_ref, ["label", "type", "value", "handlers", "error", "mask"]);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_5__Input_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_5__Input_css___default.a.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, label), error ? renderErrors(error) : null, mask ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_text_mask___default.a, _extends({
    placeholder: rest.placeholder,
    type: type,
    mask: mask,
    value: value,
    className: __WEBPACK_IMPORTED_MODULE_5__Input_css___default.a.input
  }, handlers, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  })) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", _extends({
    type: type,
    value: value,
    className: __WEBPACK_IMPORTED_MODULE_5__Input_css___default.a.input
  }, handlers, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  })));
};

Input.defaultProps = {
  label: '',
  type: 'text',
  error: null,
  mask: null,
  handlers: {}
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Input_css___default.a)(Input));

/***/ }),

/***/ "./src/components/Form/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Input__ = __webpack_require__("./src/components/Form/Input/Input.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__Input__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Group__ = __webpack_require__("./src/components/Form/Group/Group.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Group__["a"]; });



/***/ }),

/***/ "./src/components/Header/Header.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Header/Header.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Header/Header.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Header/Header.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Header/Header.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css__ = __webpack_require__("./src/components/Header/Header.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Header_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SocialsList__ = __webpack_require__("./src/components/SocialsList/SocialsList.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Container__ = __webpack_require__("./src/components/Container/Container.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Logo__ = __webpack_require__("./src/components/Logo/Logo.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Navigation__ = __webpack_require__("./src/components/Navigation/Navigation.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ToolBar__ = __webpack_require__("./src/components/ToolBar/ToolBar.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Header/Header.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.top,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Container__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__SocialsList__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.middle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Container__["a" /* default */], {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.row,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Logo__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Navigation__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__ToolBar__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      }))));
    }
  }]);

  return Header;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Header_css___default.a)(Header));

/***/ }),

/***/ "./src/components/Html.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript__ = __webpack_require__("serialize-javascript");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("./src/config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Html.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/* eslint-disable react/no-danger */

var Html =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Html, _React$Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).apply(this, arguments));
  }

  _createClass(Html, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description,
          styles = _props.styles,
          scripts = _props.scripts,
          app = _props.app,
          children = _props.children;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("html", {
        className: "no-js",
        lang: "en",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("head", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
        charSet: "utf-8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
        httpEquiv: "x-ua-compatible",
        content: "ie=edge",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("title", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, title), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
        name: "description",
        content: description,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }), scripts.map(function (script) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
          key: script,
          rel: "preload",
          href: script,
          as: "script",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          },
          __self: this
        });
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
        rel: "manifest",
        href: "/site.webmanifest",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
        href: "https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,500i,600",
        rel: "stylesheet",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
        href: "https://fonts.googleapis.com/css?family=Niconne:400",
        rel: "stylesheet",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
        href: "https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700",
        rel: "stylesheet",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", {
        rel: "apple-touch-icon",
        href: "/icon.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }), styles.map(function (style) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("style", {
          key: style.id,
          id: style.id,
          dangerouslySetInnerHTML: {
            __html: style.cssText
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        });
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("body", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        id: "app",
        dangerouslySetInnerHTML: {
          __html: children
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: "window.App=".concat(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default()(app))
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }), scripts.map(function (script) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("script", {
          key: script,
          src: script,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 69
          },
          __self: this
        });
      }), __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + "ga('create','".concat(__WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId, "','auto');ga('send','pageview')")
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("script", {
        src: "https://www.google-analytics.com/analytics.js",
        async: true,
        defer: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      })));
    }
  }]);

  return Html;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Html, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    styles: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      cssText: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
    }).isRequired),
    scripts: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired),
    app: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
    // eslint-disable-line
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }
});
Object.defineProperty(Html, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    styles: [],
    scripts: []
  }
});
/* harmony default export */ __webpack_exports__["a"] = (Html);

/***/ }),

/***/ "./src/components/Jumbotron/Jumbotron.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Jumbotron/Jumbotron.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Jumbotron/Jumbotron.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Jumbotron/Jumbotron.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Jumbotron/Jumbotron.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Button__ = __webpack_require__("./src/components/Button/Button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css__ = __webpack_require__("./src/components/Jumbotron/Jumbotron.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Jumbotron_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Jumbotron/Jumbotron.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








var Jumbotron = function Jumbotron(_ref) {
  var title = _ref.title,
      descr = _ref.descr,
      link = _ref.link,
      btn = _ref.btn,
      classes = _ref.classes;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("article", {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.root, classes.root]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, title), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.descr,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, descr), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", _extends({}, link, {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.link,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }), link.txt), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Button__["a" /* default */], _extends({}, btn, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }), btn.label)));
};

Jumbotron.defaultProps = {
  classes: {
    root: ''
  },
  title: 'Explore great apps for Productivity, including office for iPad',
  descr: 'Start editing a phone on your iPad and finish it on your Macbook.Sync a Playlist from your iPhone to your Apple Watch.',
  link: {
    txt: 'Learn More about iPad Mini'
  },
  btn: {
    label: 'Buy Now',
    onClick: function onClick() {}
  }
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a)(Jumbotron));

/***/ }),

/***/ "./src/components/Layout/Layout.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Layout/Layout.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Layout/Layout.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Layout/Layout.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Layout/Layout.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Footer__ = __webpack_require__("./src/components/Footer/Footer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_normalize_css__ = __webpack_require__("./node_modules/normalize.css/normalize.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Layout_css__ = __webpack_require__("./src/components/Layout/Layout.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Layout_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Layout_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Header__ = __webpack_require__("./src/components/Header/Header.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Layout/Layout.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



 // external-global styles must be imported in your JS.





var Layout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Header__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }), this.props.children, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Footer__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }));
    }
  }]);

  return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Layout, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired
  }
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4_normalize_css___default.a, __WEBPACK_IMPORTED_MODULE_5__Layout_css___default.a)(Layout));

/***/ }),

/***/ "./src/components/Link/Link.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__("./src/history.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Link/Link.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }

        if (event.defaultPrevented === true) {
          return;
        }

        event.preventDefault();
        __WEBPACK_IMPORTED_MODULE_2__history__["a" /* default */].push(_this.props.to);
      }
    }), _temp));
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          to = _props.to,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["to", "children"]);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", _extends({
        href: to
      }, props, {
        onClick: this.handleClick,
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([props.className, {// [props.activeClassName]: to === this.context.pathname || to === history.location.pathname,
        }]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }), children);
    }
  }]);

  return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Link, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
    onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
  }
});
Object.defineProperty(Link, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    onClick: null
  }
});
Link.defaultProps = {
  activeClassName: ''
};
Link.contextTypes = {
  pathname: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),

/***/ "./src/components/Logo/Logo.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Logo/Logo.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Logo/Logo.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Logo/Logo.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Logo/Logo.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Logo_css__ = __webpack_require__("./src/components/Logo/Logo.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Logo_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Logo_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Logo/Logo.js";






var Logo = function Logo(_ref) {
  var classes = _ref.classes,
      theme = _ref.theme;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__Logo_css___default.a.root, __WEBPACK_IMPORTED_MODULE_4__Logo_css___default.a[theme], classes.root]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "Shippon");
};

Logo.defaultProps = {
  theme: '',
  classes: {
    root: ''
  }
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Logo_css___default.a)(Logo));

/***/ }),

/***/ "./src/components/Navigation/Navigation.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Navigation/Navigation.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Navigation/Navigation.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Navigation/Navigation.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Navigation/Navigation.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Navigation_css__ = __webpack_require__("./src/components/Navigation/Navigation.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Navigation_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__("./src/components/Link/Link.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Navigation/Navigation.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






var Navigation =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Navigation, _React$PureComponent);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          classes = _props.classes;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.root, __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a[theme], classes.root]),
        role: "navigation",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        __self: this
      }, this.props.list.map(function (item) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
          className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.link,
          to: item.to,
          activeClassName: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.activeLink,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 26
          },
          __self: this
        }, item.txt);
      }));
    }
  }]);

  return Navigation;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

Navigation.defaultProps = {
  theme: '',
  classes: {
    root: ''
  },
  list: [{
    txt: 'Home',
    to: '/'
  }, {
    txt: 'Shop',
    to: '/shop'
  }, {
    txt: 'About',
    to: '/about'
  }, {
    txt: 'Blog',
    to: '/blog'
  }, {
    txt: 'Personal',
    to: '/personal'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a)(Navigation));

/***/ }),

/***/ "./src/components/Rating/Rating.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Rating/Rating.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Rating/Rating.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Rating/Rating.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Rating/Rating.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Rating_css__ = __webpack_require__("./src/components/Rating/Rating.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Rating_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Rating_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Rating/Rating.js";






var Rating = function Rating(_ref) {
  var list = _ref.list,
      classes = _ref.classes;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__Rating_css___default.a.root, classes.root]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, list.map(function (item) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_fontawesome___default.a, {
      className: __WEBPACK_IMPORTED_MODULE_4__Rating_css___default.a.star,
      name: item.name,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: this
    });
  }));
};

Rating.defaultProps = {
  classes: {
    root: ''
  },
  list: [{
    name: 'star'
  }, {
    name: 'star'
  }, {
    name: 'star'
  }, {
    name: 'star'
  }, {
    name: 'star-half-o'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Rating_css___default.a)(Rating));

/***/ }),

/***/ "./src/components/ServiceFeatures/ServiceFeatures.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ServiceFeatures/ServiceFeatures.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ServiceFeatures/ServiceFeatures.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ServiceFeatures/ServiceFeatures.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/ServiceFeatures/ServiceFeatures.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css__ = __webpack_require__("./src/components/ServiceFeatures/ServiceFeatures.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__("./src/components/Container/Container.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icons_plan_svg__ = __webpack_require__("./src/components/ServiceFeatures/icons/plan.svg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/ServiceFeatures/ServiceFeatures.js";








var ServiceFeatures = function ServiceFeatures(_ref) {
  var list = _ref.list,
      classes = _ref.classes;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.root, classes.root]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, list.map(function (item) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
      className: __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
      className: __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.icon,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, item.icon), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
      className: __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.title,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }, item.title), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, item.descr));
  })));
};

ServiceFeatures.defaultProps = {
  classes: {
    root: ''
  },
  list: [{
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    })
  }, {
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    })
  }, {
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      },
      __self: this
    })
  }, {
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    })
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a)(ServiceFeatures));

/***/ }),

/***/ "./src/components/ServiceFeatures/icons/plan.svg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(__webpack_require__("@babel/runtime/core-js/object/assign"));

var _react = _interopRequireDefault(__webpack_require__("react"));

var _extends = _assign.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var _default = function _default(_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return _react.default.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: "53",
    height: "53",
    viewBox: "0 0 53 53"
  }, props), _react.default.createElement("defs", null, _react.default.createElement("path", {
    id: "a",
    d: "M638.04 3739.13l-5.6 2.55c-.36.17-.7.4-.98.67l-9.14 9.15-31.47-3.77a1.87 1.87 0 0 0-1.55.53l-1.75 1.75c-.93.93-.64 2.5.56 3.04l22.55 10.1-6.47 6.48h-11.31c-.5 0-.98.2-1.33.55l-.94.95c-.94.94-.63 2.53.58 3.05l9.54 4.09 4.1 9.54a1.87 1.87 0 0 0 3.04.58l.95-.95c.35-.35.55-.83.55-1.32v-11.31l6.47-6.48 10.11 22.56a1.87 1.87 0 0 0 3.04.56l1.75-1.75c.4-.41.6-.98.53-1.55l-3.78-31.47 9.15-9.15c.28-.28.5-.6.67-.97l2.56-5.6a1.37 1.37 0 0 0-1.83-1.83z"
  })), _react.default.createElement("use", {
    xlinkHref: "#a",
    opacity: ".1",
    transform: "translate(-587 -3739)"
  }));
};

exports.default = _default;

/***/ }),

/***/ "./src/components/SocialsList/SocialsList.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/SocialsList/SocialsList.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/SocialsList/SocialsList.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/SocialsList/SocialsList.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/SocialsList/SocialsList.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SocialsList_css__ = __webpack_require__("./src/components/SocialsList/SocialsList.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__SocialsList_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/SocialsList/SocialsList.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var SocialsList = function SocialsList(_ref) {
  var list = _ref.list,
      classes = _ref.classes,
      center = _ref.center,
      type = _ref.type;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", {
    className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.center, center), classes.root),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, list.map(function (item) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
      className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.item, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a[type], true)]),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: this
    }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
      href: item.href,
      target: "_blank",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default.a, {
      name: item.icon,
      className: __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.icon,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    })));
  }));
};

SocialsList.defaultProps = {
  center: false,
  type: '',
  classes: {
    root: ''
  },
  list: [{
    icon: 'facebook-f'
  }, {
    icon: 'twitter'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a)(SocialsList));

/***/ }),

/***/ "./src/components/Tabs/Tabs.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Tabs/Tabs.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Tabs/Tabs.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Tabs/Tabs.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Tabs/Tabs.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tabs__ = __webpack_require__("react-tabs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_tabs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Tabs_css__ = __webpack_require__("./src/components/Tabs/Tabs.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Tabs_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Tabs/Tabs.js";







var T = function T(_ref) {
  var tabs = _ref.tabs,
      panels = _ref.panels,
      classes = _ref.classes,
      defaultIndex = _ref.defaultIndex;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.root, classes.root]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["Tabs"], {
    defaultIndex: defaultIndex || 0,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["TabList"], {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.list, classes.header]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, tabs.map(function (item) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["Tab"], {
      selectedClassName: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.selected,
      className: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.tab,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    }, item.txt);
  })), panels.map(function (item) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["TabPanel"], {
      className: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.panel,
      selectedClassName: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.panelActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, item.render());
  })));
};

T.defaultProps = {
  defaultIndex: 0,
  classes: {
    root: '',
    header: ''
  },
  tabs: [{
    txt: 'New'
  }, {
    txt: 'Arrivals'
  }, {
    txt: 'Accessories'
  }, {
    txt: 'Essentials'
  }, {
    txt: 'Outdoor'
  }, {
    txt: 'Kitchen'
  }, {
    txt: 'Lighting'
  }],
  panels: [{
    render: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, "panel1");
    }
  }, {
    render: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, "panel2");
    }
  }, {
    render: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, "panel3");
    }
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a)(T));

/***/ }),

/***/ "./src/components/Title/Title.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Title/Title.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Title/Title.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Title/Title.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Title/Title.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Title_css__ = __webpack_require__("./src/components/Title/Title.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Title_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Title_css__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Title = function Title(_ref) {
  var type = _ref.type,
      children = _ref.children,
      classes = _ref.classes,
      center = _ref.center,
      id = _ref.id;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(type, {
    id: id,
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__Title_css___default.a.title, classes.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4__Title_css___default.a.center, center)])
  }, children);
};

Title.propTypes = {
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  center: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  classes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    root: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })
};
Title.defaultProps = {
  children: '',
  id: '',
  type: 'h3',
  center: false,
  classes: {
    root: ''
  }
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Title_css___default.a)(Title));

/***/ }),

/***/ "./src/components/ToolBar/ToolBar.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ToolBar/ToolBar.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ToolBar/ToolBar.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/ToolBar/ToolBar.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/ToolBar/ToolBar.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToolBar_css__ = __webpack_require__("./src/components/ToolBar/ToolBar.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ToolBar_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/ToolBar/ToolBar.js";







var ToolBar = function ToolBar(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
    name: "search",
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.action,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.bag,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.count,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, "2"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
    name: "shopping-bag",
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.action,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a)(ToolBar));

/***/ }),

/***/ "./src/config.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
if (false) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,
  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || "http://localhost:".concat(process.env.PORT || 3000)
  },
  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X

  },
  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'React Starter Kit'
    },
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

/***/ }),

/***/ "./src/constants/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_RUNTIME_VARIABLE; });
/* eslint-disable import/prefer-default-export */
var SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

/***/ }),

/***/ "./src/createFetch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch, baseUrl, cookie) {
  // NOTE: Tweak the default options to suite your application needs
  var defaults = {
    method: 'POST',
    // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _extends({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? {
      Cookie: cookie
    } : null)
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, options) {
        var isGraphQL;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isGraphQL = url.startsWith('/');
                return _context.abrupt("return", isGraphQL || url.startsWith('/api') ? fetch("".concat(baseUrl).concat(url), _extends({}, defaults, options, {
                  headers: _extends({}, defaults.headers, options && options.headers)
                })) : fetch(url, options));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}

/* unused harmony default export */ var _unused_webpack_default_export = (createFetch);

/***/ }),

/***/ "./src/history.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__ = __webpack_require__("history/createBrowserHistory");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
 // Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history

/* harmony default export */ __webpack_exports__["a"] = (false && __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default()());

/***/ }),

/***/ "./src/modules/Api/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hideReporter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__("isomorphic-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/modules/Api/constants.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var handling = function handling(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  var error = new Error();
  error.resp = resp;
  throw error;
};

var parse = function parse(json) {
  return json.json();
};

var api = function api(_ref) {
  var url = _ref.url,
      params = _ref.params;
  return fetch(url, _extends({}, params, {
    body: JSON.stringify(params.body) || null,
    headers: _extends({
      // 'Access-Control-Allow-Headers': 'X-Requested-With',
      'Content-Type': 'application/json'
    }, params.headers)
  })).then(handling).then(parse);
};

var parametred = function parametred(method) {
  return function (_ref2) {
    var url = _ref2.url,
        params = _ref2.params;
    return api({
      url: url,
      params: _extends({}, params, {
        method: method
      })
    });
  };
};

var hideReporter = function hideReporter() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["HIDE_REPORTER"],
    payload: {}
  };
};
/* harmony default export */ __webpack_exports__["a"] = ({
  get: parametred('GET'),
  post: parametred('POST'),
  put: parametred('PUT'),
  delete: parametred('DELETE')
});

/***/ }),

/***/ "./src/modules/Api/constants.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_START", function() { return REQUEST_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_SUCCESS", function() { return REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_FAIL", function() { return REQUEST_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIDE_REPORTER", function() { return HIDE_REPORTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_REPORTER", function() { return SHOW_REPORTER; });
var NAME = 'api';
var REQUEST_START = 'REQUEST_START';
var REQUEST_SUCCESS = 'REQUEST_SUCCESS';
var REQUEST_FAIL = 'REQUEST_FAIL';
var HIDE_REPORTER = "".concat(NAME, "_HIDE_REPORTER");
var SHOW_REPORTER = "".concat(NAME, "_SHOW_REPORTER");

/***/ }),

/***/ "./src/modules/Api/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__("./src/modules/Api/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/modules/Api/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sagas__ = __webpack_require__("./src/modules/Api/sagas.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducer__ = __webpack_require__("./src/modules/Api/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors__ = __webpack_require__("./src/modules/Api/selectors.js");





/* harmony default export */ __webpack_exports__["a"] = ({
  api: __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* default */],
  types: __WEBPACK_IMPORTED_MODULE_1__constants__,
  saga: __WEBPACK_IMPORTED_MODULE_2__sagas__["a" /* default */],
  reducer: __WEBPACK_IMPORTED_MODULE_3__reducer__["a" /* default */],
  selectors: __WEBPACK_IMPORTED_MODULE_4__selectors__["a" /* default */]
});

/***/ }),

/***/ "./src/modules/Api/model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ds */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__("immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);

var ds = new __WEBPACK_IMPORTED_MODULE_0_immutable__["Map"]({
  isError: false,
  status: null,
  message: null
});
/* harmony default export */ __webpack_exports__["a"] = (ds);

/***/ }),

/***/ "./src/modules/Api/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/modules/Api/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__("./src/modules/Api/model.js");



var ApiReporter = function ApiReporter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_1__model__["a" /* default */];
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload,
      type = action.type;
  console.log(type);

  switch (type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["HIDE_REPORTER"]:
      return state.set('isError', false).set('status', null).set('message', null);

    case __WEBPACK_IMPORTED_MODULE_0__constants__["SHOW_REPORTER"]:
      return state.set('isError', true).set('status', payload.status).set('message', payload.message);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ApiReporter);

/***/ }),

/***/ "./src/modules/Api/sagas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = watchFetchRequests;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/modules/Api/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__("./src/modules/Api/actions.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetch),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFetchRequests);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



 // The watcher: watch actions and coordinate worker tasks

function getErrorData(data) {
  return data.json().then(function (data) {
    return data;
  });
}

function fetch(_ref) {
  var url, params, _ref$method, method, _ref$name, name, resp, data;

  return regeneratorRuntime.wrap(function fetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = _ref.url, params = _ref.params, _ref$method = _ref.method, method = _ref$method === void 0 ? 'get' : _ref$method, _ref$name = _ref.name, name = _ref$name === void 0 ? 'NOTHING_TYPE' : _ref$name;
          _context.prev = 1;
          _context.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* default */][method.toLowerCase()], {
            url: url,
            params: params
          });

        case 4:
          resp = _context.sent;
          _context.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_SUCCESS"],
            name: name,
            payload: _extends({}, resp)
          });

        case 7:
          _context.next = 16;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["call"])(getErrorData, _context.t0.resp);

        case 13:
          data = _context.sent;
          _context.next = 16;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_FAIL"],
            name: name,
            payload: {
              statusText: _context.t0.resp.statusText,
              ok: _context.t0.resp.ok,
              status: _context.t0.resp.status,
              data: data
            }
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 9]]);
}

function watchFetchRequests() {
  return regeneratorRuntime.wrap(function watchFetchRequests$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_START"], fetch);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/***/ }),

/***/ "./src/modules/Api/selectors.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getState */
/* unused harmony export getModel */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/modules/Api/constants.js");

var getState = function getState(state) {
  return state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]];
};
var getModel = function getModel(state) {
  return {
    status: state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]].get('status'),
    message: state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]].get('message'),
    show: state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]].get('isError')
  };
};
/* harmony default export */ __webpack_exports__["a"] = ({
  getModel: getModel
});

/***/ }),

/***/ "./src/modules/User/actionTypes.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTER", function() { return REGISTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_ERRORS", function() { return RESET_ERRORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN", function() { return LOGIN; });
var NAME = 'user';
var REGISTER = "".concat(NAME, "_register");
var RESET_ERRORS = "".concat(REGISTER, "_reset_errors");
var LOGIN = "".concat(NAME, "_login");

/***/ }),

/***/ "./src/modules/User/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return resetErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");


var register = function register(_ref) {
  var email = _ref.email,
      password = _ref.password,
      name = _ref.name,
      phone = _ref.phone;
  return {
    type: __WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].types.REQUEST_START,
    name: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["REGISTER"],
    url: 'http://127.0.0.1:8000/user/',
    method: 'post',
    params: {
      body: {
        name: name,
        phone: phone,
        email: email,
        password: password
      }
    }
  };
};
var resetErrors = function resetErrors() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["RESET_ERRORS"],
    payload: {}
  };
};
var login = function login(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;
  return {
    type: __WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].types.REQUEST_START,
    name: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["LOGIN"],
    url: 'http://127.0.0.1:8000/login/',
    method: 'post',
    params: {
      body: {
        email: email,
        password: password
      }
    }
  };
};

/***/ }),

/***/ "./src/modules/User/components/AlreadyFooter/AlreadyFooter.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/AlreadyFooter/AlreadyFooter.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/AlreadyFooter/AlreadyFooter.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/AlreadyFooter/AlreadyFooter.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/modules/User/components/AlreadyFooter/AlreadyFooter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AlreadyFooter_css__ = __webpack_require__("./src/modules/User/components/AlreadyFooter/AlreadyFooter.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AlreadyFooter_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__AlreadyFooter_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Button__ = __webpack_require__("./src/components/Button/Button.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/modules/User/components/AlreadyFooter/AlreadyFooter.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








var AlreadyFooter = function AlreadyFooter(_ref) {
  var classes = _ref.classes,
      buttons = _ref.buttons,
      descr = _ref.descr;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__AlreadyFooter_css___default.a.root, classes.root]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Button__["a" /* default */], _extends({
    type: "submit",
    isLoading: buttons[0].isLoading,
    theme: "black",
    fullWidth: true
  }, buttons[0], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }), buttons[0].txt), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__AlreadyFooter_css___default.a.already,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, descr)), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Button__["a" /* default */], _extends({
    type: "submit",
    theme: "gray",
    fullWidth: true
  }, buttons[1], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }), buttons[1].txt));
};

AlreadyFooter.defaultProps = {
  classes: {
    root: ''
  }
};
AlreadyFooter.propTypes = {
  buttons: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  descr: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__AlreadyFooter_css___default.a)(AlreadyFooter));

/***/ }),

/***/ "./src/modules/User/components/Login/Login.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Login/Login.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Login/Login.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Login/Login.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/modules/User/components/Login/Login.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Login_css__ = __webpack_require__("./src/modules/User/components/Login/Login.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Login_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Login_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Form__ = __webpack_require__("./src/components/Form/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_Title__ = __webpack_require__("./src/components/Title/Title.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions__ = __webpack_require__("./src/modules/User/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__AlreadyFooter__ = __webpack_require__("./src/modules/User/components/AlreadyFooter/AlreadyFooter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_modules_Validator__ = __webpack_require__("./src/modules/Validator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_formik__ = __webpack_require__("formik");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_formik___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_formik__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/modules/User/components/Login/Login.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }















var Login = function Login(_ref) {
  var login = _ref.login,
      serverErrors = _ref.serverErrors,
      isLoading = _ref.isLoading,
      reset = _ref.reset;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_formik__["Formik"], {
    validationSchema: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].object().shape({
      email: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().email('Некорректный email').required('Email обязательное поле'),
      password: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().required('Пароль обязательное поле')
    }),
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: function onSubmit(values, _ref2) {
      var props = _ref2.props,
          setSubmitting = _ref2.setSubmitting,
          setErrors = _ref2.setErrors;
      login({
        email: values.email,
        password: values.password
      });
    },
    render: function render(_ref3) {
      var values = _ref3.values,
          errors = _ref3.errors,
          handleSubmit = _ref3.handleSubmit,
          handleChange = _ref3.handleChange;
      var errs = Object.assign({}, errors, serverErrors);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_components_Title__["a" /* default */], {
        type: "h2",
        center: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form", {
        action: "",
        onSubmit: handleSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "\u0412\u0430\u0448 Email*",
        placeholder: "Email",
        value: values.email,
        error: errs.email,
        onChange: handleChange,
        name: "email",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "\u0412\u0430\u0448 \u041F\u0430\u0440\u043E\u043B\u044C",
        placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C",
        name: "password",
        type: "password",
        error: errs.password,
        value: values.password,
        onChange: handleChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__AlreadyFooter__["a" /* default */], {
        descr: "Don\u2019t Have account yet?",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.footer
        },
        buttons: [{
          txt: 'Login',
          onSubmit: function onSubmit() {
            return login({
              email: values.email,
              password: values.password
            });
          },
          isLoading: isLoading
        }, {
          txt: 'Register Now',
          onClick: function onClick() {}
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.formGroup,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.facebook,
        href: "/login/facebook",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("svg", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.icon,
        width: "30",
        height: "30",
        viewBox: "0 0 30 30",
        xmlns: "http://www.w3.org/2000/svg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        d: "M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, "Log in with Facebook"))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.formGroup,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.google,
        target: "_blank",
        href: "http://127.0.0.1:8000/social/login/google-oauth2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("svg", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.icon,
        width: "30",
        height: "30",
        viewBox: "0 0 30 30",
        xmlns: "http://www.w3.org/2000/svg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, "Log in with Google"))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.formGroup,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.twitter,
        href: "/",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("svg", {
        className: __WEBPACK_IMPORTED_MODULE_5__Login_css___default.a.icon,
        width: "30",
        height: "30",
        viewBox: "0 0 30 30",
        xmlns: "http://www.w3.org/2000/svg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }, "Log in with Twitter"))));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) {
  return {
    isLoading: state[__WEBPACK_IMPORTED_MODULE_9__actionTypes__["NAME"]].login.isLoading,
    serverErrors: _extends({}, state[__WEBPACK_IMPORTED_MODULE_9__actionTypes__["NAME"]].login.errors)
  };
}, {
  login: __WEBPACK_IMPORTED_MODULE_8__actions__["a" /* login */],
  reset: __WEBPACK_IMPORTED_MODULE_8__actions__["c" /* resetErrors */]
})(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Login_css___default.a)(Login)));

/***/ }),

/***/ "./src/modules/User/components/Register/Register.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Register/Register.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Register/Register.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Register/Register.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/modules/User/components/Register/Register.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Register_css__ = __webpack_require__("./src/modules/User/components/Register/Register.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Register_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Register_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Form__ = __webpack_require__("./src/components/Form/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AlreadyFooter__ = __webpack_require__("./src/modules/User/components/AlreadyFooter/AlreadyFooter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_Title__ = __webpack_require__("./src/components/Title/Title.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions__ = __webpack_require__("./src/modules/User/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_modules_Validator__ = __webpack_require__("./src/modules/Validator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_formik__ = __webpack_require__("formik");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_formik___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_formik__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/modules/User/components/Register/Register.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }















var Register = function Register(_ref) {
  var register = _ref.register,
      serverErrors = _ref.serverErrors,
      isLoading = _ref.isLoading,
      reset = _ref.reset;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_formik__["Formik"], {
    validationSchema: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].object().shape({
      email: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().email('Некорректный email').required('Email обязательное поле'),
      phone: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().required('Телефон обязательное поле').phone('Некорректный номер телефона'),
      password: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().required('Пароль обязательное поле').min(8, 'Пароль должен быть минимум из 8 символов'),
      name: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().required('Имя обязательное поле')
    }),
    initialValues: {
      email: '',
      phone: '',
      password: '',
      name: ''
    },
    onSubmit: function onSubmit(values, _ref2) {
      var props = _ref2.props,
          setSubmitting = _ref2.setSubmitting,
          setErrors = _ref2.setErrors;
      register({
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password
      });
    },
    render: function render(_ref3) {
      var values = _ref3.values,
          errors = _ref3.errors,
          handleSubmit = _ref3.handleSubmit,
          handleChange = _ref3.handleChange;
      var errs = Object.assign({}, serverErrors, errors);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Register_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_components_Title__["a" /* default */], {
        type: "h2",
        center: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form", {
        action: "",
        onSubmit: handleSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "\u0412\u0430\u0448\u0435 \u0418\u043C\u044F*",
        placeholder: "\u0412\u0430\u0448\u0435 \u0418\u043C\u044F",
        value: values.name,
        error: errs.name,
        onChange: handleChange,
        name: "name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        name: "email",
        label: "Email*",
        placeholder: "Email",
        type: "text",
        value: values.email,
        onChange: function onChange(props) {
          if (serverErrors.email) {
            reset();
          }

          handleChange(props);
        },
        error: errs.email,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        mask: ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D*",
        guide: true,
        placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
        type: "tel",
        name: "phone",
        error: errs.phone,
        value: values.phone,
        onChange: function onChange(props) {
          if (serverErrors.phone) {
            reset();
          }

          handleChange(props);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "Password*",
        placeholder: "Password",
        name: "password",
        type: "password",
        error: errs.password,
        value: values.password,
        onChange: handleChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__AlreadyFooter__["a" /* default */], {
        descr: "Already have an account?",
        buttons: [{
          txt: 'Register'
        }, {
          txt: 'Login'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      })));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) {
  return {
    isLoading: state[__WEBPACK_IMPORTED_MODULE_10__actionTypes__["NAME"]].register.isLoading,
    serverErrors: _extends({}, state[__WEBPACK_IMPORTED_MODULE_10__actionTypes__["NAME"]].register.errors)
  };
}, {
  register: __WEBPACK_IMPORTED_MODULE_9__actions__["b" /* register */],
  reset: __WEBPACK_IMPORTED_MODULE_9__actions__["c" /* resetErrors */]
})(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Register_css___default.a)(Register)));

/***/ }),

/***/ "./src/modules/User/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Register__ = __webpack_require__("./src/modules/User/components/Register/Register.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Register__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Login__ = __webpack_require__("./src/modules/User/components/Login/Login.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__components_Login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducer__ = __webpack_require__("./src/modules/User/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sagas__ = __webpack_require__("./src/modules/User/sagas.js");





/* harmony default export */ __webpack_exports__["c"] = ({
  reducer: __WEBPACK_IMPORTED_MODULE_2__reducer__,
  types: __WEBPACK_IMPORTED_MODULE_3__actionTypes__,
  saga: __WEBPACK_IMPORTED_MODULE_4__sagas__["a" /* default */]
});

/***/ }),

/***/ "./src/modules/User/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultState", function() { return defaultState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerReducer", function() { return registerReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginReducer", function() { return loginReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_utils__ = __webpack_require__("./src/modules/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");
var _createReducer, _createReducer2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var defaultState = {
  id: null,
  isActive: false,
  email: null,
  register: {
    isLoading: false,
    errors: {
      name: null,
      phone: null,
      email: null,
      password: null
    },
    fields: {
      name: null,
      phone: null,
      email: null,
      password: null
    }
  }
};

var create = function create(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], {}).setIn(['email'], payload.email);
};

var fail = function fail(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], payload.data);
};

var start = function start(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], true).setIn(['register', 'errors'], {});
};

var reset = function reset(state) {
  return state.setIn(['register', 'errors'], {});
};

var loginStart = function loginStart(state) {
  return state.setIn(['login', 'isLoading'], true);
};

var login = function login(state, action) {
  var payload = action.payload;
  return state.setIn(['id'], payload.id).setIn(['email'], payload.email).setIn(['isActive'], true).setIn(['login', 'isLoading'], false);
};

var loginFail = function loginFail(state, action) {
  var payload = action.payload;
  return state.setIn(['login', 'errors'], payload.data.errors).setIn(['login', 'isLoading'], false);
};

var registerReducer = Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["a" /* createReducer */])(defaultState, (_createReducer = {}, _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_FAIL, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(fail, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_SUCCESS, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(create, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_START, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(start, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["RESET_ERRORS"], reset), _createReducer));
var loginState = {
  isLoading: false,
  success: false,
  errors: {
    email: null,
    password: null
  }
};
var loginReducer = Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["a" /* createReducer */])(loginState, (_createReducer2 = {}, _defineProperty(_createReducer2, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_START, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(loginStart, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["LOGIN"])), _defineProperty(_createReducer2, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_SUCCESS, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(login, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["LOGIN"])), _defineProperty(_createReducer2, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_FAIL, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(loginFail, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["LOGIN"])), _createReducer2));

/***/ }),

/***/ "./src/modules/User/sagas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _callee;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__history__ = __webpack_require__("./src/history.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchRegister),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(_callee);




 // The watcher: watch actions and coordinate worker tasks

function watchRegister(action) {
  var payload, name;
  return regeneratorRuntime.wrap(function watchRegister$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = action.payload, name = action.name;

          if (name === __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"] || name === __WEBPACK_IMPORTED_MODULE_1__actionTypes__["LOGIN"]) {
            __WEBPACK_IMPORTED_MODULE_3__history__["a" /* default */].push('/personal');
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_SUCCESS, watchRegister);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/***/ }),

/***/ "./src/modules/Validator/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yup__ = __webpack_require__("yup");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yup__);

__WEBPACK_IMPORTED_MODULE_0_yup___default.a.addMethod(__WEBPACK_IMPORTED_MODULE_0_yup___default.a.string, 'phone', function () {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Некорректный телефон';
  return this.test({
    name: 'phone',
    exclusive: true,
    message: msg,
    test: function test(value) {
      try {
        var isValid = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
        return isValid;
      } catch (e) {
        return false;
      }
    }
  });
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_yup___default.a);

/***/ }),

/***/ "./src/modules/utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return taggedReducer; });
var createReducer = function createReducer(initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};
var taggedReducer = function taggedReducer(reducer, rName) {
  return function (state, action) {
    var name = action.name;
    var isInitializationCall = state === undefined;
    if (name !== rName && !isInitializationCall) return state;
    return reducer(state, action);
  };
};

/***/ }),

/***/ "./src/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("./src/reducers/user.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime__ = __webpack_require__("./src/reducers/runtime.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  user: __WEBPACK_IMPORTED_MODULE_1__user__["a" /* default */],
  runtime: __WEBPACK_IMPORTED_MODULE_2__runtime__["a" /* default */]
}));

/***/ }),

/***/ "./src/reducers/runtime.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runtime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/constants/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


function runtime() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* SET_RUNTIME_VARIABLE */]:
      return _extends({}, state, _defineProperty({}, action.payload.name, action.payload.value));

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/user.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = user;
function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    default:
      return state;
  }
}

/***/ }),

/***/ "./src/rootReducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_User__ = __webpack_require__("./src/modules/User/index.js");


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  user: Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    login: __WEBPACK_IMPORTED_MODULE_1_modules_User__["c" /* default */].reducer.loginReducer,
    register: __WEBPACK_IMPORTED_MODULE_1_modules_User__["c" /* default */].reducer.registerReducer
  })
}));

/***/ }),

/***/ "./src/rootSagas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rootSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_User__ = __webpack_require__("./src/modules/User/index.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);




function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["all"])([__WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].saga(), __WEBPACK_IMPORTED_MODULE_2_modules_User__["c" /* default */].saga()]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/***/ }),

/***/ "./src/router.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router__ = __webpack_require__("universal-router");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_universal_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__("./src/routes/index.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


/* harmony default export */ __webpack_exports__["default"] = (new __WEBPACK_IMPORTED_MODULE_0_universal_router___default.a(__WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */], {
  resolveRoute: function resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      return context.route.load().then(function (action) {
        return action.default(context, params);
      });
    }

    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }

    return undefined;
  }
}));

/***/ }),

/***/ "./src/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/error/ErrorPage.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/error/ErrorPage.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/error/ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes/error/ErrorPage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__ = __webpack_require__("./src/routes/error/ErrorPage.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/routes/error/ErrorPage.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





var ErrorPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ErrorPage, _React$Component);

  function ErrorPage() {
    _classCallCheck(this, ErrorPage);

    return _possibleConstructorReturn(this, (ErrorPage.__proto__ || Object.getPrototypeOf(ErrorPage)).apply(this, arguments));
  }

  _createClass(ErrorPage, [{
    key: "render",
    value: function render() {
      if (true && this.props.error) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          },
          __self: this
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        }, this.props.error.name), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("pre", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          },
          __self: this
        }, this.props.error.stack));
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, "Error"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, "Sorry, a critical error occurred on this page."));
    }
  }]);

  return ErrorPage;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(ErrorPage, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    error: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      stack: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
    })
  }
});
Object.defineProperty(ErrorPage, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    error: null
  }
});

/* harmony default export */ __webpack_exports__["b"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default.a)(ErrorPage));

/***/ }),

/***/ "./src/routes/error/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ErrorPage__ = __webpack_require__("./src/routes/error/ErrorPage.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/routes/error/index.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



function action() {
  return {
    title: 'Demo Error',
    component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__ErrorPage__["b" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    })
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ }),

/***/ "./src/routes/home/Home.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/home/Home.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/home/Home.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/home/Home.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes/home/Home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Banner__ = __webpack_require__("./src/components/Banner/Banner.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__ = __webpack_require__("./src/components/Banner/components/Content/Content.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__("./src/components/Container/Container.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Tabs__ = __webpack_require__("./src/components/Tabs/Tabs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_CardGrid__ = __webpack_require__("./src/components/CardGrid/CardGrid.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_Jumbotron__ = __webpack_require__("./src/components/Jumbotron/Jumbotron.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_AccentProducts__ = __webpack_require__("./src/components/AccentProducts/AccentProducts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_Button__ = __webpack_require__("./src/components/Button/Button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Home_css__ = __webpack_require__("./src/routes/home/Home.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__Home_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/routes/home/Home.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */













var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Banner__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
        title: "Minimal Furniture Chair for Workspace",
        price: "74.28",
        buttonLabel: "Show Now",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
        title: "Minimal Furniture Chair for Workspace",
        price: "74.28",
        buttonLabel: "Show Now",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
        title: "Minimal Furniture Chair for Workspace",
        price: "74.28",
        buttonLabel: "Show Now",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_components_AccentProducts__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.accentProducts
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_components_Jumbotron__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.jumbotron
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("header", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.header,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.title,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, "Trending Products"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.devider,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.descr,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }, "A collection of textile samples lay spread out on the table Samsa was a travelled")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Tabs__["a" /* default */], {
        classes: {
          header: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.tabsHeader,
          root: ''
        },
        panels: [{
          render: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_components_CardGrid__["a" /* default */], {
              list: [{
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: 'Out\nof\nStock',
                labelType: 'stock'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: 'New',
                labelType: 'tape'
              }],
              __source: {
                fileName: _jsxFileName,
                lineNumber: 79
              },
              __self: this
            });
          }
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.loadMore,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_components_Button__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }, "Load More"))));
    }
  }]);

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Home, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    news: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      content: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
    })).isRequired
  }
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_11__Home_css___default.a)(Home));

/***/ }),

/***/ "./src/routes/home/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Home__ = __webpack_require__("./src/routes/home/Home.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__("./src/components/Layout/Layout.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/routes/home/index.js";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




function action(_x) {
  return _action.apply(this, arguments);
}

function _action() {
  _action = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var fetch;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch = _ref.fetch;
            return _context.abrupt("return", {
              title: 'React Starter Kit',
              component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 19
                },
                __self: this
              }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Home__["a" /* default */], {
                news: [],
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 20
                },
                __self: this
              }))
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _action.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ }),

/***/ "./src/routes/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
// The top-level (parent) route
var routes = {
  path: '',
  // Keep in mind, routes are evaluated in order
  children: [// The home route is added to client.js to make sure shared components are
  // added to client.js as well and not repeated in each individual route chunk.
  {
    path: '',
    load: function load() {
      return new Promise(function(resolve) { resolve(__webpack_require__("./src/routes/home/index.js")); });
    }
  }, {
    path: '/shop',
    load: function load() {
      return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, "./src/routes/products/index.js"));
    }
  }, {
    path: '/register',
    load: function load() {
      return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, "./src/routes/register/index.js"));
    }
  }, {
    path: '/login',
    load: function load() {
      return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, "./src/routes/login/index.js"));
    }
  }, {
    path: '/contact',
    load: function load() {
      return __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, "./src/routes/contact/index.js"));
    }
  }, {
    path: '/personal',
    load: function load() {
      return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, "./src/routes/lk/index.js"));
    }
  }, {
    path: '/about',
    load: function load() {
      return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, "./src/routes/about/index.js"));
    }
  }, {
    path: '/privacy',
    load: function load() {
      return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, "./src/routes/privacy/index.js"));
    }
  }, // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    path: '(.*)',
    load: function load() {
      return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, "./src/routes/not-found/index.js"));
    }
  }],
  action: function () {
    var _action = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var next, route;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              next = _ref.next;
              _context.next = 3;
              return next();

            case 3:
              route = _context.sent;
              // Provide default values for title, description etc.
              route.title = "".concat(route.title || 'Untitled Page', " - www.reactstarterkit.com");
              route.description = route.description || '';
              return _context.abrupt("return", route);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function action(_x) {
      return _action.apply(this, arguments);
    };
  }()
}; // The error page is available by permanent url for development mode

if (true) {
  routes.children.unshift({
    path: '/error',
    action: __webpack_require__("./src/routes/error/index.js").default
  });
}

/* harmony default export */ __webpack_exports__["a"] = (routes);

/***/ }),

/***/ "./src/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__("path");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__("cookie-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__("body-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pretty_error__ = __webpack_require__("pretty-error");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_App__ = __webpack_require__("./src/components/App.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Html__ = __webpack_require__("./src/components/Html.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage__ = __webpack_require__("./src/routes/error/ErrorPage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css__ = __webpack_require__("./src/routes/error/ErrorPage.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__createFetch__ = __webpack_require__("./src/createFetch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__router__ = __webpack_require__("./src/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__assets_json__ = __webpack_require__("./assets.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__store_configureStore__ = __webpack_require__("./src/store/configureStore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_seamless_immutable__ = __webpack_require__("seamless-immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_seamless_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_seamless_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_modules_User__ = __webpack_require__("./src/modules/User/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__config__ = __webpack_require__("./src/config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__config__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/server.js";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */














 // eslint-disable-line import/no-unresolved





process.on('unhandledRejection', function (reason, p) {
  console.error('Unhandled Rejection at:', p, 'reason:', reason); // send entire app down. Process manager will restart it

  process.exit(1);
}); //
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
var app = __WEBPACK_IMPORTED_MODULE_1_express___default()(); //
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------

app.set('trust proxy', __WEBPACK_IMPORTED_MODULE_18__config___default.a.trustProxy); //
// Register Node.js middleware
// -----------------------------------------------------------------------------

app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({
  extended: true
}));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());
app.get('*',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var css, insertCss, initialState, store, context, route, data, _data$scripts, html;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            css = new Set(); // Enables critical path CSS rendering
            // https://github.com/kriasoft/isomorphic-style-loader

            insertCss = function insertCss() {
              for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
                styles[_key] = arguments[_key];
              }

              // eslint-disable-next-line no-underscore-dangle
              styles.forEach(function (style) {
                return css.add(style._getCss());
              });
            }; // Universal HTTP client


            initialState = _defineProperty({
              currency: {
                symbol: '$',
                type: 'usd'
              }
            }, __WEBPACK_IMPORTED_MODULE_17_modules_User__["c" /* default */].types.NAME, __WEBPACK_IMPORTED_MODULE_16_seamless_immutable___default()(__WEBPACK_IMPORTED_MODULE_17_modules_User__["c" /* default */].reducer.defaultState));
            store = Object(__WEBPACK_IMPORTED_MODULE_15__store_configureStore__["a" /* default */])(initialState, {}); // Global (context) variables that can be easily accessed from any React component
            // https://facebook.github.io/react/docs/context.html

            context = {
              insertCss: insertCss,
              // The twins below are wild, be careful!
              pathname: req.path,
              query: req.query,
              // You can access redux through react-redux connect
              store: store,
              storeSubscription: null
            };
            _context.next = 8;
            return __WEBPACK_IMPORTED_MODULE_13__router__["default"].resolve(context);

          case 8:
            route = _context.sent;

            if (!route.redirect) {
              _context.next = 12;
              break;
            }

            res.redirect(route.status || 302, route.redirect);
            return _context.abrupt("return");

          case 12:
            data = _extends({}, route);
            data.children = __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_App__["a" /* default */], {
              context: context,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              },
              __self: this
            }, route.component));
            data.styles = [{
              id: 'css',
              cssText: _toConsumableArray(css).join('')
            }];
            data.scripts = [__WEBPACK_IMPORTED_MODULE_14__assets_json___default.a.vendor.js];

            if (route.chunks) {
              (_data$scripts = data.scripts).push.apply(_data$scripts, _toConsumableArray(route.chunks.map(function (chunk) {
                return __WEBPACK_IMPORTED_MODULE_14__assets_json___default.a[chunk].js;
              })));
            }

            data.scripts.push(__WEBPACK_IMPORTED_MODULE_14__assets_json___default.a.client.js);
            data.app = {
              apiUrl: __WEBPACK_IMPORTED_MODULE_18__config___default.a.api.clientUrl,
              state: context.store.getState()
            };
            html = __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_Html__["a" /* default */], _extends({}, data, {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 116
              },
              __self: this
            })));
            res.status(route.status || 200);
            res.send("<!doctype html>".concat(html));
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 24]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //
// Error handling
// -----------------------------------------------------------------------------

var pe = new __WEBPACK_IMPORTED_MODULE_7_pretty_error___default.a();
pe.skipNodeFiles();
pe.skipPackage('express'); // eslint-disable-next-line no-unused-vars

app.use(function (err, req, res, next) {
  console.error(pe.render(err));
  var html = __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_Html__["a" /* default */], {
    title: "Internal Server Error",
    description: err.message,
    styles: [{
      id: 'css',
      cssText: __WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css___default.a._getCss()
    }] // eslint-disable-line no-underscore-dangle
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage__["a" /* ErrorPageWithoutStyle */], {
    error: err,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140
    },
    __self: this
  }))));
  res.status(err.status || 500);
  res.send("<!doctype html>".concat(html));
}); //
// Launch the server
// -----------------------------------------------------------------------------

if (false) {
  app.listen(config.port, function () {
    console.info("The server is running at http://localhost:".concat(config.port, "/"));
  });
} //
// Hot Module Replacement
// -----------------------------------------------------------------------------


if (true) {
  app.hot = module.hot;
  module.hot.accept("./src/router.js", function() { /* harmony import */ __WEBPACK_IMPORTED_MODULE_13__router__ = __webpack_require__("./src/router.js");  });
}

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./src/store/configureStore.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__("redux-thunk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension_developmentOnly__ = __webpack_require__("redux-devtools-extension/developmentOnly");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension_developmentOnly___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension_developmentOnly__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga__ = __webpack_require__("redux-saga");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__createHelpers__ = __webpack_require__("./src/store/createHelpers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logger__ = __webpack_require__("./src/store/logger/logger.server.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rootSagas__ = __webpack_require__("./src/rootSagas.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rootReducer__ = __webpack_require__("./src/rootReducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_seamless_immutable__ = __webpack_require__("seamless-immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_seamless_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_seamless_immutable__);










function configureStore(initialState, helpersConfig) {
  var helpers = Object(__WEBPACK_IMPORTED_MODULE_5__createHelpers__["a" /* default */])(helpersConfig);
  var sagaMiddleware = __WEBPACK_IMPORTED_MODULE_3_redux_saga___default()();
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a.withExtraArgument(helpers), sagaMiddleware];
  var enhancer;

  if (true) {
    middleware.push(Object(__WEBPACK_IMPORTED_MODULE_6__logger__["a" /* default */])()); // https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production

    var composeEnhancers = Object(__WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension_developmentOnly__["composeWithDevTools"])({
      // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
      name: "".concat(__WEBPACK_IMPORTED_MODULE_4__package_json__["name"], "@").concat(__WEBPACK_IMPORTED_MODULE_4__package_json__["version"])
    }); // https://redux.js.org/docs/api/applyMiddleware.html

    enhancer = composeEnhancers(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(void 0, middleware));
  } else {
    enhancer = applyMiddleware.apply(void 0, middleware);
  } // https://redux.js.org/docs/api/createStore.html


  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_8__rootReducer__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9_seamless_immutable___default()(initialState), enhancer); // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)

  if (true) {
    module.hot.accept("./src/reducers/index.js", function () {
      return (// eslint-disable-next-line global-require
        store.replaceReducer(__webpack_require__("./src/reducers/index.js").default)
      );
    });
  }

  sagaMiddleware.run(__WEBPACK_IMPORTED_MODULE_7__rootSagas__["a" /* default */]);
  return store;
}

/***/ }),

/***/ "./src/store/createHelpers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHelpers;
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function createGraphqlRequest(fetch) {
  return (
    /*#__PURE__*/
    function () {
      var _graphqlRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(query, variables) {
        var fetchConfig, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetchConfig = {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: variables
                  }),
                  credentials: 'include'
                };
                _context.next = 3;
                return fetch('/graphql', fetchConfig);

              case 3:
                resp = _context.sent;

                if (!(resp.status !== 200)) {
                  _context.next = 6;
                  break;
                }

                throw new Error(resp.statusText);

              case 6:
                return _context.abrupt("return", resp.json());

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function graphqlRequest(_x, _x2) {
        return _graphqlRequest.apply(this, arguments);
      };
    }()
  );
}

function createHelpers(_ref) {
  var fetch = _ref.fetch,
      history = _ref.history;
  return {
    fetch: fetch,
    history: history,
    graphqlRequest: createGraphqlRequest(fetch)
  };
}

/***/ }),

/***/ "./src/store/logger/logger.server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createLogger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__("util");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);


function inspectObject(object) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_util__["inspect"])(object, {
    colors: true
  });
}

function singleLine(str) {
  return str.replace(/\s+/g, ' ');
}

var actionFormatters = {
  // This is used at feature/apollo branch, but it can help you when implementing Apollo
  APOLLO_QUERY_INIT: function APOLLO_QUERY_INIT(a) {
    return "queryId:".concat(a.queryId, " variables:").concat(inspectObject(a.variables), "\n   ").concat(singleLine(a.queryString));
  },
  APOLLO_QUERY_RESULT: function APOLLO_QUERY_RESULT(a) {
    return "queryId:".concat(a.queryId, "\n   ").concat(singleLine(inspectObject(a.result)));
  },
  APOLLO_QUERY_STOP: function APOLLO_QUERY_STOP(a) {
    return "queryId:".concat(a.queryId);
  }
}; // Server side redux action logger

function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return function (store) {
    return function (next) {
      return function (action) {
        var formattedPayload = '';
        var actionFormatter = actionFormatters[action.type];

        if (typeof actionFormatter === 'function') {
          formattedPayload = actionFormatter(action);
        } else if (action.toString !== Object.prototype.toString) {
          formattedPayload = action.toString();
        } else if (typeof action.payload !== 'undefined') {
          formattedPayload = inspectObject(action.payload);
        } else {
          formattedPayload = inspectObject(action);
        }

        console.log(" * ".concat(action.type, ": ").concat(formattedPayload)); // eslint-disable-line no-console

        return next(action);
      };
    };
  };
}

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("@babel/polyfill");
module.exports = __webpack_require__("./src/server.js");


/***/ }),

/***/ "@babel/polyfill":
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "@babel/runtime/core-js/object/assign":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/assign");

/***/ }),

/***/ "@babel/runtime/helpers/interopRequireDefault":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/helpers/slicedToArray":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "classnames":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "formik":
/***/ (function(module, exports) {

module.exports = require("formik");

/***/ }),

/***/ "history/createBrowserHistory":
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),

/***/ "immutable":
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),

/***/ "isomorphic-fetch":
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "isomorphic-style-loader/lib/withStyles":
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),

/***/ "node-fetch":
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "nuka-carousel":
/***/ (function(module, exports) {

module.exports = require("nuka-carousel");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pretty-error":
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "rc-slider":
/***/ (function(module, exports) {

module.exports = require("rc-slider");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-fontawesome":
/***/ (function(module, exports) {

module.exports = require("react-fontawesome");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-select":
/***/ (function(module, exports) {

module.exports = require("react-select");

/***/ }),

/***/ "react-tabs":
/***/ (function(module, exports) {

module.exports = require("react-tabs");

/***/ }),

/***/ "react-text-mask":
/***/ (function(module, exports) {

module.exports = require("react-text-mask");

/***/ }),

/***/ "react-treebeard":
/***/ (function(module, exports) {

module.exports = require("react-treebeard");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension/developmentOnly":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension/developmentOnly");

/***/ }),

/***/ "redux-saga":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "redux-thunk":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "seamless-immutable":
/***/ (function(module, exports) {

module.exports = require("seamless-immutable");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "universal-router":
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),

/***/ "util":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "yup":
/***/ (function(module, exports) {

module.exports = require("yup");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIGQ2YmNlMTQyZDc4ZjNiNzlhYTQxIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcIi4vYXNzZXRzLmpzb25cIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9BZGRUb0NhcmQvQWRkVG9DYXJkLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Jhbm5lci9jb21wb25lbnRzL0NvbnRlbnQvQ29udGVudC5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkL0NhcmQuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Db250YWluZXIvQ29udGFpbmVyLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9MYXlvdXQvTGF5b3V0LmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTG9nby9Mb2dvLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1NlcnZpY2VGZWF0dXJlcy9TZXJ2aWNlRmVhdHVyZXMuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RhYnMvVGFicy5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvVG9vbEJhci9Ub29sQmFyLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0FscmVhZHlGb290ZXIvQWxyZWFkeUZvb3Rlci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9Mb2dpbi9Mb2dpbi5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9SZWdpc3Rlci9SZWdpc3Rlci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9ob21lL0hvbWUuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3M/OTE4OSIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvcGFja2FnZS5qc29uIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FjY2VudFByb2R1Y3RzL0FjY2VudFByb2R1Y3RzLmNzcz83NmUzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9BY2NlbnRQcm9kdWN0cy9BY2NlbnRQcm9kdWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BZGRUb0NhcmQvQWRkVG9DYXJkLmNzcz9lZmY1IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9BZGRUb0NhcmQvQWRkVG9DYXJkLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3M/YzhlZiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQuY3NzPzUyMGYiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Jhbm5lci9jb21wb25lbnRzL0NvbnRlbnQvQ29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNzcz85NDE2IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhcmQvQ2FyZC5jc3M/MTkxNiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhcmRHcmlkL0NhcmRHcmlkLmNzcz85NjI4IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYXJkTGFiZWwvQ2FyZExhYmVsLmNzcz85NzYxIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkTGFiZWwvQ2FyZExhYmVsLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkTGFiZWwvaWNvbnMvc3RvY2suc3ZnIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzPzA5YjAiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5jc3M/NTcxNSIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0dyb3VwL0dyb3VwLmNzcz8yODU5IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Gb3JtL0dyb3VwL0dyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vSW5wdXQvSW5wdXQuY3NzPzE2NDciLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Zvcm0vSW5wdXQvSW5wdXQuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3M/MzQ5OSIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvSHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9KdW1ib3Ryb24vSnVtYm90cm9uLmNzcz9kNTRkIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9KdW1ib3Ryb24vSnVtYm90cm9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuY3NzPzQ0ODciLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0xpbmsvTGluay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Mb2dvL0xvZ28uY3NzP2E0YTkiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0xvZ28vTG9nby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uY3NzPzU2NTMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SYXRpbmcvUmF0aW5nLmNzcz9hMDFjIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9SYXRpbmcvUmF0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1NlcnZpY2VGZWF0dXJlcy9TZXJ2aWNlRmVhdHVyZXMuY3NzPzZlMzIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1NlcnZpY2VGZWF0dXJlcy9TZXJ2aWNlRmVhdHVyZXMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1NlcnZpY2VGZWF0dXJlcy9pY29ucy9wbGFuLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5jc3M/NzVlMiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvU29jaWFsc0xpc3QvU29jaWFsc0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGFicy9UYWJzLmNzcz80NzRmIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9UYWJzL1RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzPzE5ZDEiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rvb2xCYXIvVG9vbEJhci5jc3M/OGZiMCIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvVG9vbEJhci9Ub29sQmFyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29uZmlnLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29uc3RhbnRzL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY3JlYXRlRmV0Y2guanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9oaXN0b3J5LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9BcGkvYWN0aW9ucy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvQXBpL2NvbnN0YW50cy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvQXBpL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9BcGkvbW9kZWwuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL0FwaS9yZWR1Y2VyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9BcGkvc2FnYXMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL0FwaS9zZWxlY3RvcnMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvYWN0aW9uVHlwZXMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvQWxyZWFkeUZvb3Rlci9BbHJlYWR5Rm9vdGVyLmNzcz9mZWQwIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvQWxyZWFkeUZvb3Rlci9BbHJlYWR5Rm9vdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9Mb2dpbi9Mb2dpbi5jc3M/YTM3ZCIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0xvZ2luL0xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9SZWdpc3Rlci9SZWdpc3Rlci5jc3M/NDhjNiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9Vc2VyL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9Vc2VyL3JlZHVjZXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvc2FnYXMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1ZhbGlkYXRvci9pbmRleC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvdXRpbHMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yZWR1Y2Vycy9pbmRleC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JlZHVjZXJzL3J1bnRpbWUuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yZWR1Y2Vycy91c2VyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm9vdFJlZHVjZXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb290U2FnYXMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuY3NzPzQ3OGYiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLmNzcz82OTVmIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2hvbWUvSG9tZS5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9ob21lL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvc2VydmVyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvc3RvcmUvY29uZmlndXJlU3RvcmUuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9zdG9yZS9jcmVhdGVIZWxwZXJzLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvc3RvcmUvbG9nZ2VyL2xvZ2dlci5zZXJ2ZXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiY2xhc3NuYW1lc1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiZm9ybWlrXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImltbXV0YWJsZVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImlzb21vcnBoaWMtZmV0Y2hcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcIm5vZGUtZmV0Y2hcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJudWthLWNhcm91c2VsXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicGF0aFwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInByZXR0eS1lcnJvclwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyYy1zbGlkZXJcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWFjdFwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWFjdC1mb250YXdlc29tZVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicmVhY3Qtc2VsZWN0XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicmVhY3QtdGFic1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlYWN0LXRleHQtbWFza1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlYWN0LXRyZWViZWFyZFwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlZHV4XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2RldmVsb3BtZW50T25seVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInNlYW1sZXNzLWltbXV0YWJsZVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInNlcmlhbGl6ZS1qYXZhc2NyaXB0XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwidW5pdmVyc2FsLXJvdXRlclwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInV0aWxcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJ5dXBcIiJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJ1cGRhdGVzL1wiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xyXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rLmlkLCBjaHVuay5tb2R1bGVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHRyeSB7XHJcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcInVwZGF0ZXMvXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiKTtcclxuIFx0XHR9IGNhdGNoKGUpIHtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuIFx0XHR9XHJcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cGRhdGUpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkgeyAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xyXG4gXHR9XHJcblxuIFx0XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiZDZiY2UxNDJkNzhmM2I3OWFhNDFcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcclxuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XHJcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xyXG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcclxuIFx0XHRcdGlmKG1lLmhvdC5hY3RpdmUpIHtcclxuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xyXG4gXHRcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA8IDApXHJcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXHJcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuIFx0XHR9O1xyXG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XHJcbiBcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH07XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XHJcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuIFx0XHRcdFx0dGhyb3cgZXJyO1xyXG4gXHRcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xyXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcclxuIFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBmbjtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaG90ID0ge1xyXG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxyXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcclxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXHJcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxyXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxyXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxyXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxyXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXHJcbiBcdFx0fTtcclxuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XHJcbiBcdFx0cmV0dXJuIGhvdDtcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XHJcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcclxuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdERlZmVycmVkO1xyXG4gXHRcclxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXHJcbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XHJcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcclxuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcclxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdHJldHVybiBudWxsO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XHJcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcclxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxyXG4gXHRcdFx0XHR9O1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcclxuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcclxuIFx0XHRcdHJldHVybjtcclxuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcclxuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xyXG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XHJcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XHJcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xyXG4gXHRcdGlmKCFkZWZlcnJlZCkgcmV0dXJuO1xyXG4gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcclxuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXHJcbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cclxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcclxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcclxuIFx0XHRcdH0pLnRoZW4oXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdCk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiBcdFxyXG4gXHRcdHZhciBjYjtcclxuIFx0XHR2YXIgaTtcclxuIFx0XHR2YXIgajtcclxuIFx0XHR2YXIgbW9kdWxlO1xyXG4gXHRcdHZhciBtb2R1bGVJZDtcclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcclxuIFx0XHRcdFx0XHRpZDogaWRcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcclxuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fbWFpbikge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdGlmKCFwYXJlbnQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxyXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXHJcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxyXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XHJcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcclxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbiBcdFxyXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XHJcbiBcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCIpO1xyXG4gXHRcdH07XHJcbiBcdFxyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcclxuIFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuIFx0XHRcdFx0aWYoaG90VXBkYXRlW2lkXSkge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcclxuIFx0XHRcdFx0aWYocmVzdWx0LmNoYWluKSB7XHJcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHN3aXRjaChyZXN1bHQudHlwZSkge1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiIGluIFwiICsgcmVzdWx0LnBhcmVudElkICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGlzcG9zZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGRlZmF1bHQ6XHJcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGFib3J0RXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9BcHBseSkge1xyXG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdFx0XHRcdGZvcihtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihkb0Rpc3Bvc2UpIHtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxyXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xyXG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdHZhciBpZHg7XHJcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXHJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xyXG4gXHRcdFx0XHRpZighY2hpbGQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIGRlcGVuZGVuY3k7XHJcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKG1vZHVsZSkge1xyXG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGZvcihqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcclxuIFx0XHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XHJcbiBcdFxyXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcclxuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0XHRpZihjYikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcclxuIFx0XHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0b3JnaW5hbEVycm9yOiBlcnIsIC8vIFRPRE8gcmVtb3ZlIGluIHdlYnBhY2sgNFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyMjtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQ4OiAwXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSAwKSB7XG4gXHRcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vY2h1bmtzL1wiICsgKHtcIjBcIjpcInByb2R1Y3RzXCIsXCIxXCI6XCJyZWdpc3RlclwiLFwiMlwiOlwibG9naW5cIixcIjNcIjpcInByaXZhY3lcIixcIjRcIjpcImFib3V0XCIsXCI1XCI6XCJub3QtZm91bmRcIixcIjZcIjpcImxrXCIsXCI3XCI6XCJjb250YWN0XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCIpO1xuIFx0XHRcdHZhciBtb3JlTW9kdWxlcyA9IGNodW5rLm1vZHVsZXMsIGNodW5rSWRzID0gY2h1bmsuaWRzO1xuIFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIHVuY2F0Y2hlZCBlcnJvciBoYW5kbGVyIGZvciB3ZWJwYWNrIHJ1bnRpbWVcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHtcbiBcdFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiBcdFx0XHR0aHJvdyBlcnI7IC8vIGNhdGNoIHRoaXMgZXJyb3IgYnkgdXNpbmcgU3lzdGVtLmltcG9ydCgpLmNhdGNoKClcbiBcdFx0fSk7XG4gXHR9O1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ2YmNlMTQyZDc4ZjNiNzlhYTQxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9hc3NldHMuanNvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIi4vYXNzZXRzLmpzb25cIlxuLy8gbW9kdWxlIGlkID0gLi9hc3NldHMuanNvblxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2Ny4wLjAgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluXFxuICogICAgSUUgb24gV2luZG93cyBQaG9uZSBhbmQgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKi9cXG5cXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxubmF2LFxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxuXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxubWFpbiB7IC8qIDEgKi9cXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgbWFyZ2luIGluIElFIDguXFxuICovXFxuXFxuZmlndXJlIHtcXG4gIG1hcmdpbjogMWVtIDQwcHg7XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgZ2FwcyBpbiBsaW5rcyB1bmRlcmxpbmUgaW4gaU9TIDgrIGFuZCBTYWZhcmkgOCsuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tc2tpcDogb2JqZWN0czsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LSBhbmQgRmlyZWZveCAzOS0uXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7XFxuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IHRoZSBkdXBsaWNhdGUgYXBwbGljYXRpb24gb2YgYGJvbGRlcmAgYnkgdGhlIG5leHQgcnVsZSBpbiBTYWZhcmkgNi5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogaW5oZXJpdDtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc3R5bGUgaW4gQW5kcm9pZCA0LjMtLlxcbiAqL1xcblxcbmRmbiB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBiYWNrZ3JvdW5kIGFuZCBjb2xvciBpbiBJRSA5LS5cXG4gKi9cXG5cXG5tYXJrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjA7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICovXFxuXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBpT1MgNC03LlxcbiAqL1xcblxcbmF1ZGlvOm5vdChbY29udHJvbHNdKSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLS5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBIaWRlIHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKi9cXG5cXG5zdmc6bm90KDpyb290KSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMgKG9waW5pb25hdGVkKS5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIFByZXZlbnQgYSBXZWJLaXQgYnVnIHdoZXJlICgyKSBkZXN0cm95cyBuYXRpdmUgYGF1ZGlvYCBhbmQgYHZpZGVvYFxcbiAqICAgIGNvbnRyb2xzIGluIEFuZHJvaWQgNC5cXG4gKiAyLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5odG1sIFt0eXBlPVxcXCJidXR0b25cXFwiXSwgLyogMSAqL1xcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgLyogMSAqL1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLS5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAtLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGFuZCBjYW5jZWwgYnV0dG9ucyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24sXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSwgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscywgLyogMSAqL1xcbm1lbnUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBTY3JpcHRpbmdcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqL1xcblxcbmNhbnZhcyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qIEhpZGRlblxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAtLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsNEVBQTRFOztBQUU1RTtnRkFDZ0Y7O0FBRWhGOzs7O0dBSUc7O0FBRUg7RUFDRSxrQkFBa0IsQ0FBQyxPQUFPO0VBQzFCLDJCQUEyQixDQUFDLE9BQU87RUFDbkMsK0JBQStCLENBQUMsT0FBTztDQUN4Qzs7QUFFRDtnRkFDZ0Y7O0FBRWhGOztHQUVHOztBQUVIO0VBQ0UsVUFBVTtDQUNYOztBQUVEOztHQUVHOztBQUVIOzs7Ozs7RUFNRSxlQUFlO0NBQ2hCOztBQUVEOzs7R0FHRzs7QUFFSDtFQUNFLGVBQWU7RUFDZixpQkFBaUI7Q0FDbEI7O0FBRUQ7Z0ZBQ2dGOztBQUVoRjs7O0dBR0c7O0FBRUg7O09BRU8sT0FBTztFQUNaLGVBQWU7Q0FDaEI7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7OztHQUdHOztBQUVIO0VBQ0UsZ0NBQWdDO1VBQ3hCLHdCQUF3QixDQUFDLE9BQU87RUFDeEMsVUFBVSxDQUFDLE9BQU87RUFDbEIsa0JBQWtCLENBQUMsT0FBTztDQUMzQjs7QUFFRDs7O0dBR0c7O0FBRUg7RUFDRSxrQ0FBa0MsQ0FBQyxPQUFPO0VBQzFDLGVBQWUsQ0FBQyxPQUFPO0NBQ3hCOztBQUVEO2dGQUNnRjs7QUFFaEY7OztHQUdHOztBQUVIO0VBQ0UsOEJBQThCLENBQUMsT0FBTztFQUN0QyxzQ0FBc0MsQ0FBQyxPQUFPO0NBQy9DOztBQUVEOzs7R0FHRzs7QUFFSDtFQUNFLG9CQUFvQixDQUFDLE9BQU87RUFDNUIsMkJBQTJCLENBQUMsT0FBTztFQUNuQywwQ0FBMEM7VUFDbEMsa0NBQWtDLENBQUMsT0FBTztDQUNuRDs7QUFFRDs7R0FFRzs7QUFFSDs7RUFFRSxxQkFBcUI7Q0FDdEI7O0FBRUQ7O0dBRUc7O0FBRUg7O0VBRUUsb0JBQW9CO0NBQ3JCOztBQUVEOzs7R0FHRzs7QUFFSDs7O0VBR0Usa0NBQWtDLENBQUMsT0FBTztFQUMxQyxlQUFlLENBQUMsT0FBTztDQUN4Qjs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLG1CQUFtQjtDQUNwQjs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0NBQ2I7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxlQUFlO0NBQ2hCOztBQUVEOzs7R0FHRzs7QUFFSDs7RUFFRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQix5QkFBeUI7Q0FDMUI7O0FBRUQ7RUFDRSxnQkFBZ0I7Q0FDakI7O0FBRUQ7RUFDRSxZQUFZO0NBQ2I7O0FBRUQ7Z0ZBQ2dGOztBQUVoRjs7R0FFRzs7QUFFSDs7RUFFRSxzQkFBc0I7Q0FDdkI7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxjQUFjO0VBQ2QsVUFBVTtDQUNYOztBQUVEOztHQUVHOztBQUVIO0VBQ0UsbUJBQW1CO0NBQ3BCOztBQUVEOztHQUVHOztBQUVIO0VBQ0UsaUJBQWlCO0NBQ2xCOztBQUVEO2dGQUNnRjs7QUFFaEY7OztHQUdHOztBQUVIOzs7OztFQUtFLHdCQUF3QixDQUFDLE9BQU87RUFDaEMsZ0JBQWdCLENBQUMsT0FBTztFQUN4QixrQkFBa0IsQ0FBQyxPQUFPO0VBQzFCLFVBQVUsQ0FBQyxPQUFPO0NBQ25COztBQUVEOzs7R0FHRzs7QUFFSDtRQUNRLE9BQU87RUFDYixrQkFBa0I7Q0FDbkI7O0FBRUQ7OztHQUdHOztBQUVIO1NBQ1MsT0FBTztFQUNkLHFCQUFxQjtDQUN0Qjs7QUFFRDs7OztHQUlHOztBQUVIOzs7O0VBSUUsMkJBQTJCLENBQUMsT0FBTztDQUNwQzs7QUFFRDs7R0FFRzs7QUFFSDs7OztFQUlFLG1CQUFtQjtFQUNuQixXQUFXO0NBQ1o7O0FBRUQ7O0dBRUc7O0FBRUg7Ozs7RUFJRSwrQkFBK0I7Q0FDaEM7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSwrQkFBK0I7Q0FDaEM7O0FBRUQ7Ozs7O0dBS0c7O0FBRUg7RUFDRSwrQkFBK0I7VUFDdkIsdUJBQXVCLENBQUMsT0FBTztFQUN2QyxlQUFlLENBQUMsT0FBTztFQUN2QixlQUFlLENBQUMsT0FBTztFQUN2QixnQkFBZ0IsQ0FBQyxPQUFPO0VBQ3hCLFdBQVcsQ0FBQyxPQUFPO0VBQ25CLG9CQUFvQixDQUFDLE9BQU87Q0FDN0I7O0FBRUQ7OztHQUdHOztBQUVIO0VBQ0Usc0JBQXNCLENBQUMsT0FBTztFQUM5Qix5QkFBeUIsQ0FBQyxPQUFPO0NBQ2xDOztBQUVEOztHQUVHOztBQUVIO0VBQ0UsZUFBZTtDQUNoQjs7QUFFRDs7O0dBR0c7O0FBRUg7O0VBRUUsK0JBQStCO1VBQ3ZCLHVCQUF1QixDQUFDLE9BQU87RUFDdkMsV0FBVyxDQUFDLE9BQU87Q0FDcEI7O0FBRUQ7O0dBRUc7O0FBRUg7O0VBRUUsYUFBYTtDQUNkOztBQUVEOzs7R0FHRzs7QUFFSDtFQUNFLDhCQUE4QixDQUFDLE9BQU87RUFDdEMscUJBQXFCLENBQUMsT0FBTztDQUM5Qjs7QUFFRDs7R0FFRzs7QUFFSDs7RUFFRSx5QkFBeUI7Q0FDMUI7O0FBRUQ7OztHQUdHOztBQUVIO0VBQ0UsMkJBQTJCLENBQUMsT0FBTztFQUNuQyxjQUFjLENBQUMsT0FBTztDQUN2Qjs7QUFFRDtnRkFDZ0Y7O0FBRWhGOzs7R0FHRzs7QUFFSDs7RUFFRSxlQUFlO0NBQ2hCOztBQUVEOztHQUVHOztBQUVIO0VBQ0UsbUJBQW1CO0NBQ3BCOztBQUVEO2dGQUNnRjs7QUFFaEY7O0dBRUc7O0FBRUg7RUFDRSxzQkFBc0I7Q0FDdkI7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxjQUFjO0NBQ2Y7O0FBRUQ7Z0ZBQ2dGOztBQUVoRjs7R0FFRzs7QUFFSDtFQUNFLGNBQWM7Q0FDZlwiLFwiZmlsZVwiOlwibm9ybWFsaXplLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiEgbm9ybWFsaXplLmNzcyB2Ny4wLjAgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluXFxuICogICAgSUUgb24gV2luZG93cyBQaG9uZSBhbmQgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKi9cXG5cXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxubmF2LFxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxuXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxubWFpbiB7IC8qIDEgKi9cXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgbWFyZ2luIGluIElFIDguXFxuICovXFxuXFxuZmlndXJlIHtcXG4gIG1hcmdpbjogMWVtIDQwcHg7XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgZ2FwcyBpbiBsaW5rcyB1bmRlcmxpbmUgaW4gaU9TIDgrIGFuZCBTYWZhcmkgOCsuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tc2tpcDogb2JqZWN0czsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LSBhbmQgRmlyZWZveCAzOS0uXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7XFxuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IHRoZSBkdXBsaWNhdGUgYXBwbGljYXRpb24gb2YgYGJvbGRlcmAgYnkgdGhlIG5leHQgcnVsZSBpbiBTYWZhcmkgNi5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogaW5oZXJpdDtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc3R5bGUgaW4gQW5kcm9pZCA0LjMtLlxcbiAqL1xcblxcbmRmbiB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBiYWNrZ3JvdW5kIGFuZCBjb2xvciBpbiBJRSA5LS5cXG4gKi9cXG5cXG5tYXJrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjA7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICovXFxuXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBpT1MgNC03LlxcbiAqL1xcblxcbmF1ZGlvOm5vdChbY29udHJvbHNdKSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLS5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBIaWRlIHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKi9cXG5cXG5zdmc6bm90KDpyb290KSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMgKG9waW5pb25hdGVkKS5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIFByZXZlbnQgYSBXZWJLaXQgYnVnIHdoZXJlICgyKSBkZXN0cm95cyBuYXRpdmUgYGF1ZGlvYCBhbmQgYHZpZGVvYFxcbiAqICAgIGNvbnRyb2xzIGluIEFuZHJvaWQgNC5cXG4gKiAyLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5odG1sIFt0eXBlPVxcXCJidXR0b25cXFwiXSwgLyogMSAqL1xcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgLyogMSAqL1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLS5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAtLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGFuZCBjYW5jZWwgYnV0dG9ucyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24sXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSwgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscywgLyogMSAqL1xcbm1lbnUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBTY3JpcHRpbmdcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqL1xcblxcbmNhbnZhcyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qIEhpZGRlblxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAtLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTEhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5BY2NlbnRQcm9kdWN0cy1yb290LTJwYW51IHtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogc3RyZXRjaDtcXG4gICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uQWNjZW50UHJvZHVjdHMtaXRlbS0zVlo4eSB7XFxuICAtbXMtZmxleC1wb3NpdGl2ZTogMDtcXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAtbXMtZmxleC1uZWdhdGl2ZTogMDtcXG4gICAgICBmbGV4LXNocmluazogMDtcXG4gIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgICAgIGZsZXgtYmFzaXM6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICBtYXgtd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICB3aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLWl0ZW0tM1ZaOHk6bnRoLWNoaWxkKDFuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLWl0ZW0tM1ZaOHk6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1pdGVtLTNWWjh5Om50aC1jaGlsZCg0bikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1wcm9kdWN0LTF2NlNwIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiA2MjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDMsIDI0NiwgMjQ5KTtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLXByb2R1Y3RTbWFsbC0ydU9xRyB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgLW1zLWZsZXgtYWxpZ246IHN0YXJ0O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZy1sZWZ0OiA0MHB4O1xcbiAgbWF4LWhlaWdodDogMzQ0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgbWluLWhlaWdodDogMzQ0cHhcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLXByb2R1Y3RTbWFsbC0ydU9xRzpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1wcm9kdWN0QmlnLWppN2hNIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiAxMDBweDtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLXJpZ2h0LTJ6cEFoIHtcXG4gIC1tcy1mbGV4LWFsaWduOiBlbmQ7XFxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBwYWRkaW5nLXJpZ2h0OiA0MHB4O1xcbn1cXG5cXG4uQWNjZW50UHJvZHVjdHMtbmFtZS0yTVBXciwgLkFjY2VudFByb2R1Y3RzLXByaWNlLTJXc0oxIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1uYW1lLTJNUFdyIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1wcmljZS0yV3NKMSB7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1wcmljZS0yV3NKMSBzcGFuIHtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xOHB4O1xcbiAgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0FjY2VudFByb2R1Y3RzL0FjY2VudFByb2R1Y3RzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsY0FBYztFQUNkLHdCQUF3QjtNQUNwQixxQkFBcUI7RUFDekIsdUJBQXVCO01BQ25CLCtCQUErQjtDQUNwQzs7QUFFRDtFQUNFLHFCQUFxQjtNQUNqQixhQUFhO0VBQ2pCLHFCQUFxQjtNQUNqQixlQUFlO0VBQ25CLGdEQUFnRDtNQUM1QyxtQ0FBbUM7RUFDdkMsa0NBQWtDO0VBQ2xDLDhCQUE4QjtDQUMvQjs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLHFDQUFxQztDQUN0Qzs7QUFFRDtFQUNFLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsMkJBQTJCO01BQ3ZCLHVCQUF1QjtFQUMzQixzQkFBc0I7TUFDbEIsd0JBQXdCO0VBQzVCLHNCQUFzQjtNQUNsQix3QkFBd0I7RUFDNUIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0UsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixzQkFBc0I7TUFDbEIsd0JBQXdCO0VBQzVCLHVCQUF1QjtNQUNuQixvQkFBb0I7Q0FDekI7O0FBRUQ7RUFDRSxvQkFBb0I7TUFDaEIsc0JBQXNCO0VBQzFCLGtCQUFrQjtFQUNsQixvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixpQ0FBaUM7Q0FDbEM7O0FBRUQ7RUFDRSxvQkFBb0I7RUFDcEIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtDQUNuQjs7QUFFRDtJQUNJLGdCQUFnQjtJQUNoQix1QkFBdUI7R0FDeEJcIixcImZpbGVcIjpcIkFjY2VudFByb2R1Y3RzLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IHN0cmV0Y2g7XFxuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLml0ZW0ge1xcbiAgLW1zLWZsZXgtcG9zaXRpdmU6IDA7XFxuICAgICAgZmxleC1ncm93OiAwO1xcbiAgLW1zLWZsZXgtbmVnYXRpdmU6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gICAgICBmbGV4LWJhc2lzOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxufVxcblxcbi5pdGVtOm50aC1jaGlsZCgxbikge1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi5pdGVtOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cXG4uaXRlbTpudGgtY2hpbGQoNG4pIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4ucHJvZHVjdCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWluLWhlaWdodDogNjIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzLCAyNDYsIDI0OSk7XFxufVxcblxcbi5wcm9kdWN0U21hbGwge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIC1tcy1mbGV4LWFsaWduOiBzdGFydDtcXG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmctbGVmdDogNDBweDtcXG4gIG1heC1oZWlnaHQ6IDM0NHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIG1pbi1oZWlnaHQ6IDM0NHB4XFxufVxcblxcbi5wcm9kdWN0U21hbGw6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG5cXG4ucHJvZHVjdEJpZyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogMTAwcHg7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5yaWdodCB7XFxuICAtbXMtZmxleC1hbGlnbjogZW5kO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgcGFkZGluZy1yaWdodDogNDBweDtcXG59XFxuXFxuLm5hbWUsIC5wcmljZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4ubmFtZSB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4ucHJpY2Uge1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4ucHJpY2Ugc3BhbiB7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMThweDtcXG4gIH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkFjY2VudFByb2R1Y3RzLXJvb3QtMnBhbnVcIixcblx0XCJpdGVtXCI6IFwiQWNjZW50UHJvZHVjdHMtaXRlbS0zVlo4eVwiLFxuXHRcInByb2R1Y3RcIjogXCJBY2NlbnRQcm9kdWN0cy1wcm9kdWN0LTF2NlNwXCIsXG5cdFwicHJvZHVjdFNtYWxsXCI6IFwiQWNjZW50UHJvZHVjdHMtcHJvZHVjdFNtYWxsLTJ1T3FHXCIsXG5cdFwicHJvZHVjdEJpZ1wiOiBcIkFjY2VudFByb2R1Y3RzLXByb2R1Y3RCaWctamk3aE1cIixcblx0XCJyaWdodFwiOiBcIkFjY2VudFByb2R1Y3RzLXJpZ2h0LTJ6cEFoXCIsXG5cdFwibmFtZVwiOiBcIkFjY2VudFByb2R1Y3RzLW5hbWUtMk1QV3JcIixcblx0XCJwcmljZVwiOiBcIkFjY2VudFByb2R1Y3RzLXByaWNlLTJXc0oxXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0FjY2VudFByb2R1Y3RzL0FjY2VudFByb2R1Y3RzLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0FjY2VudFByb2R1Y3RzL0FjY2VudFByb2R1Y3RzLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkFkZFRvQ2FyZC1yb290LXpiUkZyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgd2lkdGg6IDEwMXB4O1xcbiAgaGVpZ2h0OiAxMDFweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG4gIC1vLXRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbn1cXG5cXG4uQWRkVG9DYXJkLWljb24tMUJ4SFgge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAyNnB4O1xcbn1cXG5cXG4uQWRkVG9DYXJkLWxhYmVsLTJFSkZzIHtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxufVxcblxcbi5BZGRUb0NhcmQtdmlzaWJsZS0yeS1naiB7XFxuICBvcGFjaXR5OiAxO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9BZGRUb0NhcmQvQWRkVG9DYXJkLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsVUFBVTtFQUNWLHlDQUF5QztNQUNyQyxxQ0FBcUM7VUFDakMsaUNBQWlDO0VBQ3pDLGFBQWE7RUFDYixjQUFjO0VBQ2QscUNBQXFDO0VBQ3JDLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCx3Q0FBd0M7RUFDeEMsbUNBQW1DO0VBQ25DLGdDQUFnQztDQUNqQzs7QUFFRDtFQUNFLGVBQWU7RUFDZixpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSwwQkFBMEI7RUFDMUIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtDQUN4Qjs7QUFFRDtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7Q0FDakJcIixcImZpbGVcIjpcIkFkZFRvQ2FyZC5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICB3aWR0aDogMTAxcHg7XFxuICBoZWlnaHQ6IDEwMXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgY29sb3I6ICNmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbiAgLW8tdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxufVxcblxcbi5pY29uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luLXRvcDogMjZweDtcXG59XFxuXFxuLmxhYmVsIHtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxufVxcblxcbi52aXNpYmxlIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiQWRkVG9DYXJkLXJvb3QtemJSRnJcIixcblx0XCJpY29uXCI6IFwiQWRkVG9DYXJkLWljb24tMUJ4SFhcIixcblx0XCJsYWJlbFwiOiBcIkFkZFRvQ2FyZC1sYWJlbC0yRUpGc1wiLFxuXHRcInZpc2libGVcIjogXCJBZGRUb0NhcmQtdmlzaWJsZS0yeS1nalwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9BZGRUb0NhcmQvQWRkVG9DYXJkLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQmFubmVyLXJvb3QtM3IxamMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MywgMjQ2LCAyNDkpO1xcbn1cXG5cXG4uQmFubmVyLWFycm93LXV2NUxIIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpXFxufVxcblxcbi5CYW5uZXItYXJyb3dSaWdodC0xYzVSQiB7XFxuICByaWdodDogNDBweDtcXG59XFxuXFxuLkJhbm5lci1hcnJvd0xlZnQtMTlsMmMge1xcbiAgbGVmdDogNDBweDtcXG59XFxuXFxuLkJhbm5lci1kb3RzLTEyUUpUIHtcXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTFweDtcXG4gIGhlaWdodDogMTFweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKVxcbn1cXG5cXG4uQmFubmVyLWRvdHMtMTJRSlQ6bHN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLkJhbm5lci1hY3RpdmVEb3QtMW83Rkoge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CYW5uZXIvQmFubmVyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQixxQ0FBcUM7Q0FDdEM7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxvQ0FBb0M7TUFDaEMsZ0NBQWdDO1VBQzVCLDJCQUEyQjtDQUNwQzs7QUFFRDtFQUNFLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLFdBQVc7Q0FDWjs7QUFFRDtFQUNFLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixpQ0FBaUM7Q0FDbEM7O0FBRUQ7RUFDRSxnQkFBZ0I7Q0FDakI7O0FBRUQ7RUFDRSxrQ0FBa0M7Q0FDbkNcIixcImZpbGVcIjpcIkJhbm5lci5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MywgMjQ2LCAyNDkpO1xcbn1cXG5cXG4uYXJyb3cge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSlcXG59XFxuXFxuLmFycm93UmlnaHQge1xcbiAgcmlnaHQ6IDQwcHg7XFxufVxcblxcbi5hcnJvd0xlZnQge1xcbiAgbGVmdDogNDBweDtcXG59XFxuXFxuLmRvdHMge1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxMXB4O1xcbiAgaGVpZ2h0OiAxMXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDUxLCA1MSwgNTEpXFxufVxcblxcbi5kb3RzOmxzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5hY3RpdmVEb3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkJhbm5lci1yb290LTNyMWpjXCIsXG5cdFwiYXJyb3dcIjogXCJCYW5uZXItYXJyb3ctdXY1TEhcIixcblx0XCJhcnJvd1JpZ2h0XCI6IFwiQmFubmVyLWFycm93UmlnaHQtMWM1UkJcIixcblx0XCJhcnJvd0xlZnRcIjogXCJCYW5uZXItYXJyb3dMZWZ0LTE5bDJjXCIsXG5cdFwiZG90c1wiOiBcIkJhbm5lci1kb3RzLTEyUUpUXCIsXG5cdFwiYWN0aXZlRG90XCI6IFwiQmFubmVyLWFjdGl2ZURvdC0xbzdGSlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9CYW5uZXIvQmFubmVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0Jhbm5lci9CYW5uZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQ29udGVudC1yb290LUxpVDdyIHtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKDguMzI1JSArIDIuNXB4KSAhaW1wb3J0YW50O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWluLWhlaWdodDogNTE0cHg7XFxufS5Db250ZW50LXJvb3QtTGlUN3IgPiAqIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IGF1dG87XFxuICBib3R0b206IGF1dG87XFxuICBsZWZ0OiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxufVxcblxcbi5Db250ZW50LXRpdGxlLTFlRzFaIHtcXG4gIG1hcmdpbjogMCAwIDEwcHggMDtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMzRweDtcXG59XFxuXFxuLkNvbnRlbnQtcHJpY2VXcmFwcGVyLTFkVXJTIHtcXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5Db250ZW50LXByaWNlLTFTLUQ5IHtcXG4gIGZvbnQtc2l6ZTogNTBweDtcXG59XFxuXFxuLkNvbnRlbnQtY3VycmVuY3ktMU5yQnQge1xcbiAgZm9udC1zaXplOiAzNXB4O1xcbn1cXG5cXG4uQ29udGVudC1yYXRpbmctU1g1WTUge1xcbiAgbWFyZ2luLWJvdHRvbTogNTFweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQmFubmVyL2NvbXBvbmVudHMvQ29udGVudC9Db250ZW50LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLDZDQUE2QztFQUM3QyxtQkFBbUI7RUFDbkIsa0JBQWtCO0NBQ25CO0VBQ0MsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLFVBQVU7RUFDVix5Q0FBeUM7TUFDckMscUNBQXFDO1VBQ2pDLGlDQUFpQztDQUMxQzs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0Usb0JBQW9CO0VBQ3BCLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsaUJBQWlCO0VBQ2pCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLG9CQUFvQjtDQUNyQlwiLFwiZmlsZVwiOlwiQ29udGVudC5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgbWFyZ2luLWxlZnQ6IGNhbGMoOC4zMjUlICsgMi41cHgpICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiA1MTRweDtcXG59LnJvb3QgPiAqIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IGF1dG87XFxuICBib3R0b206IGF1dG87XFxuICBsZWZ0OiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxufVxcblxcbi50aXRsZSB7XFxuICBtYXJnaW46IDAgMCAxMHB4IDA7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDMycHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDM0cHg7XFxufVxcblxcbi5wcmljZVdyYXBwZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLnByaWNlIHtcXG4gIGZvbnQtc2l6ZTogNTBweDtcXG59XFxuXFxuLmN1cnJlbmN5IHtcXG4gIGZvbnQtc2l6ZTogMzVweDtcXG59XFxuXFxuLnJhdGluZyB7XFxuICBtYXJnaW4tYm90dG9tOiA1MXB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkNvbnRlbnQtcm9vdC1MaVQ3clwiLFxuXHRcInRpdGxlXCI6IFwiQ29udGVudC10aXRsZS0xZUcxWlwiLFxuXHRcInByaWNlV3JhcHBlclwiOiBcIkNvbnRlbnQtcHJpY2VXcmFwcGVyLTFkVXJTXCIsXG5cdFwicHJpY2VcIjogXCJDb250ZW50LXByaWNlLTFTLUQ5XCIsXG5cdFwiY3VycmVuY3lcIjogXCJDb250ZW50LWN1cnJlbmN5LTFOckJ0XCIsXG5cdFwicmF0aW5nXCI6IFwiQ29udGVudC1yYXRpbmctU1g1WTVcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQmFubmVyL2NvbXBvbmVudHMvQ29udGVudC9Db250ZW50LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0Jhbm5lci9jb21wb25lbnRzL0NvbnRlbnQvQ29udGVudC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5CdXR0b24tcm9vdC0xWjVZOCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogMTZweCAzNnB4O1xcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE2cHg7XFxuICBib3JkZXItcmFkaXVzOiAyNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLkJ1dHRvbi1ibGFjay0ybjlyVSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLkJ1dHRvbi1ncmF5LTJxR25fIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzgsIDIzOCwgMjM4KTtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxufVxcblxcbi5CdXR0b24tZnVsbFdpZHRoLTFDMG9KIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLDBCQUEwQjtFQUMxQixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsb0JBQW9CO0VBQ3BCLGtDQUFrQztFQUNsQyxjQUFjO0VBQ2QsYUFBYTtFQUNiLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLHdCQUF3QjtDQUN6Qjs7QUFFRDtFQUNFLHFDQUFxQztFQUNyQyxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxZQUFZO0NBQ2JcIixcImZpbGVcIjpcIkJ1dHRvbi5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIHBhZGRpbmc6IDE2cHggMzZweDtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNnB4O1xcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5ibGFjayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLmdyYXkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzOCwgMjM4LCAyMzgpO1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG59XFxuXFxuLmZ1bGxXaWR0aCB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJCdXR0b24tcm9vdC0xWjVZOFwiLFxuXHRcImJsYWNrXCI6IFwiQnV0dG9uLWJsYWNrLTJuOXJVXCIsXG5cdFwiZ3JheVwiOiBcIkJ1dHRvbi1ncmF5LTJxR25fXCIsXG5cdFwiZnVsbFdpZHRoXCI6IFwiQnV0dG9uLWZ1bGxXaWR0aC0xQzBvSlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQ2FyZC1yb290LTNEUF9WIHtcXG4gIG1heC13aWR0aDogMjcwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5cXG4uQ2FyZC1oZWFkZXItMVdjbEsge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG5cXG4uQ2FyZC1pbm5lci1iY0ZaMyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDM4MnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MywgMjQ2LCAyNDkpO1xcbn1cXG5cXG5cXG4uQ2FyZC1mb290ZXItM2Z6WFAge1xcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG5cXG5cXG4uQ2FyZC1mb290ZXJIZWFkZXItMWhtSXYge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBjb2xvcjogcmdiKDE3LCAxNywgMTcpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNnB4O1xcbn1cXG5cXG5cXG4uQ2FyZC1icmFuZC0yUGMtRyB7XFxuICBjb2xvcjogcmdiKDE1MywgMTUzLCAxNTMpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNHB4O1xcbn1cXG5cXG5cXG4uQ2FyZC1saWtlLTFwUkRFIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAyMXB4O1xcbiAgdG9wOiAyMXB4O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciAwLjJzIGxpbmVhcjtcXG4gIC1vLXRyYW5zaXRpb246IGNvbG9yIDAuMnMgbGluZWFyO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBsaW5lYXI7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY3Vyc29yOiBwb2ludGVyXFxufVxcblxcblxcbi5DYXJkLWxpa2UtMXBSREU6aG92ZXIge1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG59XFxuXFxuXFxuLkNhcmQtZGlzYWJsZWQtM1I2ZmIgLkNhcmQtZm9vdGVySGVhZGVyLTFobUl2IHtcXG4gIGNvbG9yOiByZ2JhKDE3LCAxNywgMTcsIDAuMik7XFxufVxcblxcblxcbi5DYXJkLWRpc2FibGVkLTNSNmZiIC5DYXJkLWJyYW5kLTJQYy1HIHtcXG4gIGNvbG9yOiByZ2JhKDE1MywgMTUzLCAxNTMsIDAuMik7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NhcmQvQ2FyZC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsaUJBQWlCO0NBQ2xCOzs7QUFHRDtFQUNFLG1CQUFtQjtDQUNwQjs7O0FBR0Q7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztFQUNkLHFDQUFxQztDQUN0Qzs7O0FBR0Q7RUFDRSxrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOzs7QUFHRDtFQUNFLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsdUJBQXVCO01BQ25CLG9CQUFvQjtFQUN4Qix1QkFBdUI7TUFDbkIsK0JBQStCO0VBQ25DLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOzs7QUFHRDtFQUNFLDBCQUEwQjtFQUMxQixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOzs7QUFHRDtFQUNFLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osVUFBVTtFQUNWLHNDQUFzQztFQUN0QyxpQ0FBaUM7RUFDakMsOEJBQThCO0VBQzlCLDBCQUEwQjtFQUMxQixlQUFlO0NBQ2hCOzs7QUFHRDtFQUNFLG9CQUFvQjtDQUNyQjs7O0FBR0Q7RUFDRSw2QkFBNkI7Q0FDOUI7OztBQUdEO0VBQ0UsZ0NBQWdDO0NBQ2pDXCIsXCJmaWxlXCI6XCJDYXJkLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBtYXgtd2lkdGg6IDI3MHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuXFxuLmhlYWRlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcblxcbi5pbm5lciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDM4MnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MywgMjQ2LCAyNDkpO1xcbn1cXG5cXG5cXG4uZm9vdGVyIHtcXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuXFxuXFxuLmZvb3RlckhlYWRlciB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE2cHg7XFxufVxcblxcblxcbi5icmFuZCB7XFxuICBjb2xvcjogcmdiKDE1MywgMTUzLCAxNTMpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNHB4O1xcbn1cXG5cXG5cXG4ubGlrZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMjFweDtcXG4gIHRvcDogMjFweDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogY29sb3IgMC4ycyBsaW5lYXI7XFxuICAtby10cmFuc2l0aW9uOiBjb2xvciAwLjJzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgbGluZWFyO1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGN1cnNvcjogcG9pbnRlclxcbn1cXG5cXG5cXG4ubGlrZTpob3ZlciB7XFxuICBjb2xvcjogcmdiKDAsIDAsIDApO1xcbn1cXG5cXG5cXG4uZGlzYWJsZWQgLmZvb3RlckhlYWRlciB7XFxuICBjb2xvcjogcmdiYSgxNywgMTcsIDE3LCAwLjIpO1xcbn1cXG5cXG5cXG4uZGlzYWJsZWQgLmJyYW5kIHtcXG4gIGNvbG9yOiByZ2JhKDE1MywgMTUzLCAxNTMsIDAuMik7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiQ2FyZC1yb290LTNEUF9WXCIsXG5cdFwiaGVhZGVyXCI6IFwiQ2FyZC1oZWFkZXItMVdjbEtcIixcblx0XCJpbm5lclwiOiBcIkNhcmQtaW5uZXItYmNGWjNcIixcblx0XCJmb290ZXJcIjogXCJDYXJkLWZvb3Rlci0zZnpYUFwiLFxuXHRcImZvb3RlckhlYWRlclwiOiBcIkNhcmQtZm9vdGVySGVhZGVyLTFobUl2XCIsXG5cdFwiYnJhbmRcIjogXCJDYXJkLWJyYW5kLTJQYy1HXCIsXG5cdFwibGlrZVwiOiBcIkNhcmQtbGlrZS0xcFJERVwiLFxuXHRcImRpc2FibGVkXCI6IFwiQ2FyZC1kaXNhYmxlZC0zUjZmYlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9DYXJkL0NhcmQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkNhcmRHcmlkLXJvb3QtNEtSZncge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogc3RhcnQ7XFxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAtbXMtZmxleC13cmFwOiB3cmFwO1xcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLkNhcmRHcmlkLWl0ZW0tazJIWUsge1xcbiAgd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xcbn1cXG5cXG4uQ2FyZEdyaWQtaXRlbS1rMkhZSzpudGgtY2hpbGQoMW4pIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgY2xlYXI6IG5vbmU7XFxufVxcblxcbi5DYXJkR3JpZC1pdGVtLWsySFlLOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cXG4uQ2FyZEdyaWQtaXRlbS1rMkhZSzpudGgtY2hpbGQoNG4pIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIGZsb2F0OiByaWdodDtcXG59XFxuXFxuLkNhcmRHcmlkLWl0ZW0tazJIWUs6bnRoLWNoaWxkKDRuICsgMSkge1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcblxcbi5DYXJkR3JpZC1pdGVtLTMtMzBnZWkgLkNhcmRHcmlkLWl0ZW0tazJIWUsge1xcbiAgICB3aWR0aDogY2FsYygzMy4zJSAtIDIwcHgpO1xcbiAgfVxcblxcbi5DYXJkR3JpZC1pdGVtLTMtMzBnZWkgLkNhcmRHcmlkLWl0ZW0tazJIWUs6bnRoLWNoaWxkKDFuKSB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICAgIGNsZWFyOiBub25lO1xcbiAgfVxcblxcbi5DYXJkR3JpZC1pdGVtLTMtMzBnZWkgLkNhcmRHcmlkLWl0ZW0tazJIWUs6bGFzdC1jaGlsZCB7XFxuICAgIG1hcmdpbi1yaWdodDogMDtcXG4gIH1cXG5cXG4uQ2FyZEdyaWQtaXRlbS0zLTMwZ2VpIC5DYXJkR3JpZC1pdGVtLWsySFlLOm50aC1jaGlsZCgzbikge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gIH1cXG5cXG4uQ2FyZEdyaWQtaXRlbS0zLTMwZ2VpIC5DYXJkR3JpZC1pdGVtLWsySFlLOm50aC1jaGlsZCgzbiArIDEpIHtcXG4gICAgY2xlYXI6IGJvdGg7XFxuICB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQ2FyZEdyaWQvQ2FyZEdyaWQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2Qsc0JBQXNCO01BQ2xCLHdCQUF3QjtFQUM1QixxQkFBcUI7TUFDakIsNEJBQTRCO0VBQ2hDLG9CQUFvQjtNQUNoQixnQkFBZ0I7Q0FDckI7O0FBRUQ7RUFDRSw4QkFBOEI7RUFDOUIsb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixZQUFZO0NBQ2I7O0FBRUQ7RUFDRSxnQkFBZ0I7Q0FDakI7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtDQUNkOztBQUVEO0VBQ0UsWUFBWTtDQUNiOztBQUVEO0lBQ0ksMEJBQTBCO0dBQzNCOztBQUVIO0lBQ0ksWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixZQUFZO0dBQ2I7O0FBRUg7SUFDSSxnQkFBZ0I7R0FDakI7O0FBRUg7SUFDSSxnQkFBZ0I7SUFDaEIsYUFBYTtHQUNkOztBQUVIO0lBQ0ksWUFBWTtHQUNiXCIsXCJmaWxlXCI6XCJDYXJkR3JpZC5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogc3RhcnQ7XFxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAtbXMtZmxleC13cmFwOiB3cmFwO1xcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLml0ZW0ge1xcbiAgd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xcbn1cXG5cXG4uaXRlbTpudGgtY2hpbGQoMW4pIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgY2xlYXI6IG5vbmU7XFxufVxcblxcbi5pdGVtOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cXG4uaXRlbTpudGgtY2hpbGQoNG4pIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIGZsb2F0OiByaWdodDtcXG59XFxuXFxuLml0ZW06bnRoLWNoaWxkKDRuICsgMSkge1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcblxcbi5pdGVtLTMgLml0ZW0ge1xcbiAgICB3aWR0aDogY2FsYygzMy4zJSAtIDIwcHgpO1xcbiAgfVxcblxcbi5pdGVtLTMgLml0ZW06bnRoLWNoaWxkKDFuKSB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICAgIGNsZWFyOiBub25lO1xcbiAgfVxcblxcbi5pdGVtLTMgLml0ZW06bGFzdC1jaGlsZCB7XFxuICAgIG1hcmdpbi1yaWdodDogMDtcXG4gIH1cXG5cXG4uaXRlbS0zIC5pdGVtOm50aC1jaGlsZCgzbikge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gIH1cXG5cXG4uaXRlbS0zIC5pdGVtOm50aC1jaGlsZCgzbiArIDEpIHtcXG4gICAgY2xlYXI6IGJvdGg7XFxuICB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJDYXJkR3JpZC1yb290LTRLUmZ3XCIsXG5cdFwiaXRlbVwiOiBcIkNhcmRHcmlkLWl0ZW0tazJIWUtcIixcblx0XCJpdGVtLTNcIjogXCJDYXJkR3JpZC1pdGVtLTMtMzBnZWlcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQ2FyZEdyaWQvQ2FyZEdyaWQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQ2FyZEdyaWQvQ2FyZEdyaWQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQ2FyZExhYmVsLXJvb3Qtbms3RzEge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjEzcHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxuICBsaW5lLWhlaWdodDogMzRweDtcXG4gIGxlZnQ6IC00NXB4O1xcbiAgdG9wOiAyMHB4O1xcbiAgd2lkdGg6IDE2MHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcblxcbi5DYXJkTGFiZWwtdGFwZS16NEtycywgLkNhcmRMYWJlbC1zdG9jay0yT05ESSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcblxcbi5DYXJkTGFiZWwtY2lyY2xlLTJaQXRxIHtcXG4gIHRvcDogMjBweDtcXG4gIGxlZnQ6IDIwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogMzdweDtcXG4gIGhlaWdodDogMzdweDtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAzN3B4O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IG5vbmU7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogbm9uZTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4uQ2FyZExhYmVsLXN0b2NrLTJPTkRJIHtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQ2FyZExhYmVsL0NhcmRMYWJlbC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLDBCQUEwQjtFQUMxQixnQ0FBZ0M7RUFDaEMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osVUFBVTtFQUNWLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsMkJBQTJCO0NBQzVCOztBQUVEO0VBQ0Usa0NBQWtDO01BQzlCLDhCQUE4QjtVQUMxQiwwQkFBMEI7Q0FDbkM7O0FBRUQ7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsd0JBQXdCO01BQ3BCLG9CQUFvQjtVQUNoQixnQkFBZ0I7Q0FDekI7O0FBRUQ7RUFDRSxnQkFBZ0I7Q0FDakJcIixcImZpbGVcIjpcIkNhcmRMYWJlbC5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjEzcHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxuICBsaW5lLWhlaWdodDogMzRweDtcXG4gIGxlZnQ6IC00NXB4O1xcbiAgdG9wOiAyMHB4O1xcbiAgd2lkdGg6IDE2MHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcblxcbi50YXBlLCAuc3RvY2sge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbn1cXG5cXG4uY2lyY2xlIHtcXG4gIHRvcDogMjBweDtcXG4gIGxlZnQ6IDIwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogMzdweDtcXG4gIGhlaWdodDogMzdweDtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAzN3B4O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IG5vbmU7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogbm9uZTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4uc3RvY2sge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkNhcmRMYWJlbC1yb290LW5rN0cxXCIsXG5cdFwidGFwZVwiOiBcIkNhcmRMYWJlbC10YXBlLXo0S3JzXCIsXG5cdFwic3RvY2tcIjogXCJDYXJkTGFiZWwtc3RvY2stMk9ORElcIixcblx0XCJjaXJjbGVcIjogXCJDYXJkTGFiZWwtY2lyY2xlLTJaQXRxXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQ2FyZExhYmVsL0NhcmRMYWJlbC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5Db250YWluZXItcm9vdC1sXy1COSB7XFxuICBtYXgtd2lkdGg6IDExNzBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsbUJBQW1CO0NBQ3BCXCIsXCJmaWxlXCI6XCJDb250YWluZXIuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5yb290IHtcXG4gIG1heC13aWR0aDogMTE3MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJDb250YWluZXItcm9vdC1sXy1COVwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Db250YWluZXIvQ29udGFpbmVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLkZvb3Rlci1yb290LTFVVU15IHtcXG4gIHBhZGRpbmc6IDMwcHggMCA0NnB4IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzUsIDM1LCAzNSk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5Gb290ZXItbG9nby0zNEFtaiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuXFxuLkZvb3Rlci1zZXJ2aWNlcy1xWEpsTiB7XFxuICBtYXJnaW4tYm90dG9tOiA2MHB4O1xcbn1cXG5cXG4uRm9vdGVyLWRlc2NyLTNxLTVfIHtcXG4gIG1hcmdpbi1ib3R0b206IDI2cHg7XFxuICBjb2xvcjogcmdiKDI0MSwgMjQxLCAyNDEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5Gb290ZXItc29jaWFscy0yZkcteCB7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xcbn1cXG5cXG4uRm9vdGVyLW5hdmlnYXRpb24tM3FPUWkge1xcbiAgbWFyZ2luLWJvdHRvbTogNDdweDtcXG59XFxuXFxuLkZvb3Rlci10ZXJtcy0zZ2VrMyB7XFxuICBjb2xvcjogcmdiKDI0MSwgMjQxLCAyNDEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7O0dBT0c7O0FBRUg7Ozs7Ozs7R0FPRzs7QUFFSDtFQUNFOztnRkFFOEU7O0VBRTlFOztnRkFFOEU7O0VBRTlFOztnRkFFOEUsRUFBRSxnQ0FBZ0MsRUFBRSwyQkFBMkIsRUFBRSw2QkFBNkIsQ0FBQyxpQ0FBaUM7Q0FDL007O0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsa0NBQWtDO0VBQ2xDLG1CQUFtQjtDQUNwQjs7QUFFRDtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLG9CQUFvQjtFQUNwQiwwQkFBMEI7RUFDMUIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtDQUNwQjs7QUFFRDtFQUNFLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLDBCQUEwQjtFQUMxQixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7Q0FDbkJcIixcImZpbGVcIjpcIkZvb3Rlci5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4vKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbjpyb290IHtcXG4gIC8qXFxuICAgKiBUeXBvZ3JhcGh5XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBMYXlvdXRcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIE1lZGlhIHF1ZXJpZXMgYnJlYWtwb2ludHNcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLyAgLyogRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmUgKi8gIC8qIFNtYWxsIHNjcmVlbiAvIHRhYmxldCAqLyAgLyogTWVkaXVtIHNjcmVlbiAvIGRlc2t0b3AgKi8gLyogTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wICovXFxufVxcblxcbi5yb290IHtcXG4gIHBhZGRpbmc6IDMwcHggMCA0NnB4IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzUsIDM1LCAzNSk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5sb2dvIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4uc2VydmljZXMge1xcbiAgbWFyZ2luLWJvdHRvbTogNjBweDtcXG59XFxuXFxuLmRlc2NyIHtcXG4gIG1hcmdpbi1ib3R0b206IDI2cHg7XFxuICBjb2xvcjogcmdiKDI0MSwgMjQxLCAyNDEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5zb2NpYWxzIHtcXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcblxcbi5uYXZpZ2F0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDQ3cHg7XFxufVxcblxcbi50ZXJtcyB7XFxuICBjb2xvcjogcmdiKDI0MSwgMjQxLCAyNDEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiRm9vdGVyLXJvb3QtMVVVTXlcIixcblx0XCJsb2dvXCI6IFwiRm9vdGVyLWxvZ28tMzRBbWpcIixcblx0XCJzZXJ2aWNlc1wiOiBcIkZvb3Rlci1zZXJ2aWNlcy1xWEpsTlwiLFxuXHRcImRlc2NyXCI6IFwiRm9vdGVyLWRlc2NyLTNxLTVfXCIsXG5cdFwic29jaWFsc1wiOiBcIkZvb3Rlci1zb2NpYWxzLTJmRy14XCIsXG5cdFwibmF2aWdhdGlvblwiOiBcIkZvb3Rlci1uYXZpZ2F0aW9uLTNxT1FpXCIsXG5cdFwidGVybXNcIjogXCJGb290ZXItdGVybXMtM2dlazNcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkdyb3VwLXJvb3QtMkViY3Qge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9ybS9Hcm91cC9Hcm91cC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxvQkFBb0I7Q0FDckJcIixcImZpbGVcIjpcIkdyb3VwLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkdyb3VwLXJvb3QtMkViY3RcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvRm9ybS9Hcm91cC9Hcm91cC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Gb3JtL0dyb3VwL0dyb3VwLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLklucHV0LWlucHV0LTJuYTU4IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjM0LCAyMzQsIDIzNCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxuICBwYWRkaW5nOiAwIDEwcHggMCAxMHB4O1xcbiAgb3V0bGluZTogbm9uZVxcbn1cXG5cXG4uSW5wdXQtaW5wdXQtMm5hNTg6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLklucHV0LWlucHV0LTJuYTU4Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIENocm9tZS9PcGVyYS9TYWZhcmkgKi9cXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxufVxcblxcbi5JbnB1dC1pbnB1dC0ybmE1ODo6LW1vei1wbGFjZWhvbGRlciB7XFxuICAvKiBGaXJlZm94IDE5KyAqL1xcbiAgY29sb3I6IHJnYigxNTMsIDE1MywgMTUzKTtcXG59XFxuXFxuLklucHV0LWlucHV0LTJuYTU4Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAvKiBJRSAxMCsgKi9cXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxufVxcblxcbi5JbnB1dC1pbnB1dC0ybmE1ODotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIEZpcmVmb3ggMTgtICovXFxuICBjb2xvcjogcmdiKDE1MywgMTUzLCAxNTMpO1xcbn1cXG5cXG4uSW5wdXQtbGFiZWwtMUsydFkge1xcbiAgY29sb3I6IHJnYig4NSwgODUsIDg1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTVweDtcXG59XFxuXFxuLklucHV0LWVycm9yLVNwQmIzIHtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGNvbG9yOiByZWQ7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Zvcm0vSW5wdXQvSW5wdXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osYUFBYTtFQUNiLHFDQUFxQztFQUNyQyw4QkFBOEI7RUFDOUIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixhQUFhO0NBQ2Q7O0FBRUQ7RUFDRSxjQUFjO0NBQ2Y7O0FBRUQ7RUFDRSx5QkFBeUI7RUFDekIsMEJBQTBCO0NBQzNCOztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLDBCQUEwQjtDQUMzQjs7QUFFRDtFQUNFLFlBQVk7RUFDWiwwQkFBMEI7Q0FDM0I7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsMEJBQTBCO0NBQzNCOztBQUVEO0VBQ0UsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix1QkFBdUI7Q0FDeEI7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsV0FBVztDQUNaXCIsXCJmaWxlXCI6XCJJbnB1dC5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmlucHV0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjM0LCAyMzQsIDIzNCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxuICBwYWRkaW5nOiAwIDEwcHggMCAxMHB4O1xcbiAgb3V0bGluZTogbm9uZVxcbn1cXG5cXG4uaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIENocm9tZS9PcGVyYS9TYWZhcmkgKi9cXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxufVxcblxcbi5pbnB1dDo6LW1vei1wbGFjZWhvbGRlciB7XFxuICAvKiBGaXJlZm94IDE5KyAqL1xcbiAgY29sb3I6IHJnYigxNTMsIDE1MywgMTUzKTtcXG59XFxuXFxuLmlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAvKiBJRSAxMCsgKi9cXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxufVxcblxcbi5pbnB1dDotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIEZpcmVmb3ggMTgtICovXFxuICBjb2xvcjogcmdiKDE1MywgMTUzLCAxNTMpO1xcbn1cXG5cXG4ubGFiZWwge1xcbiAgY29sb3I6IHJnYig4NSwgODUsIDg1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTVweDtcXG59XFxuXFxuLmVycm9yIHtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGNvbG9yOiByZWQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJpbnB1dFwiOiBcIklucHV0LWlucHV0LTJuYTU4XCIsXG5cdFwibGFiZWxcIjogXCJJbnB1dC1sYWJlbC0xSzJ0WVwiLFxuXHRcImVycm9yXCI6IFwiSW5wdXQtZXJyb3ItU3BCYjNcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvRm9ybS9JbnB1dC9JbnB1dC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4vKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbjpyb290IHtcXG4gIC8qXFxuICAgKiBUeXBvZ3JhcGh5XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBMYXlvdXRcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIE1lZGlhIHF1ZXJpZXMgYnJlYWtwb2ludHNcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLyAgLyogRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmUgKi8gIC8qIFNtYWxsIHNjcmVlbiAvIHRhYmxldCAqLyAgLyogTWVkaXVtIHNjcmVlbiAvIGRlc2t0b3AgKi8gLyogTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wICovXFxufVxcblxcbi5IZWFkZXItcm9vdC1POW9XOSwgLkhlYWRlci1taWRkbGUtMmNDOEIge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuLkhlYWRlci10b3AtMkFlRzMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGhlaWdodDogNTBweDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLkhlYWRlci1taWRkbGUtMmNDOEIge1xcbiAgaGVpZ2h0OiA5M3B4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uSGVhZGVyLXJvdy10Wk95WSB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogYmFzZWxpbmU7XFxuICAgICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7O0dBT0c7O0FBRUg7Ozs7Ozs7R0FPRzs7QUFFSDtFQUNFOztnRkFFOEU7O0VBRTlFOztnRkFFOEU7O0VBRTlFOztnRkFFOEUsRUFBRSxnQ0FBZ0MsRUFBRSwyQkFBMkIsRUFBRSw2QkFBNkIsQ0FBQyxpQ0FBaUM7Q0FDL007O0FBRUQ7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsdUJBQXVCO01BQ25CLG9CQUFvQjtDQUN6Qjs7QUFFRDtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtNQUNuQixvQkFBb0I7Q0FDekI7O0FBRUQ7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLHlCQUF5QjtNQUNyQixzQkFBc0I7RUFDMUIsdUJBQXVCO01BQ25CLCtCQUErQjtDQUNwQ1wiLFwiZmlsZVwiOlwiSGVhZGVyLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLnJvb3QsIC5taWRkbGUge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuLnRvcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubWlkZGxlIHtcXG4gIGhlaWdodDogOTNweDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogYmFzZWxpbmU7XFxuICAgICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiSGVhZGVyLXJvb3QtTzlvVzlcIixcblx0XCJtaWRkbGVcIjogXCJIZWFkZXItbWlkZGxlLTJjQzhCXCIsXG5cdFwidG9wXCI6IFwiSGVhZGVyLXRvcC0yQWVHM1wiLFxuXHRcInJvd1wiOiBcIkhlYWRlci1yb3ctdFpPeVlcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkp1bWJvdHJvbi1yb290LTJJWHdIIHtcXG4gIHBhZGRpbmc6IDYwcHggMCA2MHB4IDUwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQyLCAyNDIsIDI0Mik7XFxufVxcblxcbi5KdW1ib3Ryb24taW5uZXItMkFvSnQge1xcbiAgLW1zLWZsZXgtcG9zaXRpdmU6IDA7XFxuICAgICAgZmxleC1ncm93OiAwO1xcbiAgLW1zLWZsZXgtbmVnYXRpdmU6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogY2FsYyg0MS42MjUlIC0gMTcuNXB4KTtcXG4gICAgICBmbGV4LWJhc2lzOiBjYWxjKDQxLjYyNSUgLSAxNy41cHgpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDQxLjYyNSUgLSAxNy41cHgpO1xcbiAgd2lkdGg6IGNhbGMoNDEuNjI1JSAtIDE3LjVweCk7XFxufVxcblxcbi5KdW1ib3Ryb24taW5uZXItMkFvSnQ6bnRoLWNoaWxkKDFuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLkp1bWJvdHJvbi1pbm5lci0yQW9KdDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLkp1bWJvdHJvbi1pbm5lci0yQW9KdDpudGgtY2hpbGQoMTJuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLkp1bWJvdHJvbi10aXRsZS0zazk0NiB7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDIzcHg7XFxufVxcblxcbi5KdW1ib3Ryb24tdGl0bGUtM2s5NDYsIC5KdW1ib3Ryb24tZGVzY3ItMVJsT0UsIC5KdW1ib3Ryb24tbGluay0zTWFjWiB7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLkp1bWJvdHJvbi1kZXNjci0xUmxPRSB7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgY29sb3I6IHJnYig4NSwgODUsIDg1KTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLkp1bWJvdHJvbi1saW5rLTNNYWNaIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIG1hcmdpbi1ib3R0b206IDM0cHg7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZVxcbn1cXG5cXG4uSnVtYm90cm9uLWxpbmstM01hY1o6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICMwMDA7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsMEJBQTBCO0VBQzFCLHFDQUFxQztDQUN0Qzs7QUFFRDtFQUNFLHFCQUFxQjtNQUNqQixhQUFhO0VBQ2pCLHFCQUFxQjtNQUNqQixlQUFlO0VBQ25CLGdEQUFnRDtNQUM1QyxtQ0FBbUM7RUFDdkMsa0NBQWtDO0VBQ2xDLDhCQUE4QjtDQUMvQjs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2Qsb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0UsaUNBQWlDO0NBQ2xDOztBQUVEO0VBQ0Usb0JBQW9CO0VBQ3BCLHVCQUF1QjtFQUN2QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLGVBQWU7RUFDZixvQkFBb0I7RUFDcEIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLDBCQUEwQjtDQUMzQjs7QUFFRDtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0NBQ2JcIixcImZpbGVcIjpcIkp1bWJvdHJvbi5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgcGFkZGluZzogNjBweCAwIDYwcHggNTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDIsIDI0MiwgMjQyKTtcXG59XFxuXFxuLmlubmVyIHtcXG4gIC1tcy1mbGV4LXBvc2l0aXZlOiAwO1xcbiAgICAgIGZsZXgtZ3JvdzogMDtcXG4gIC1tcy1mbGV4LW5lZ2F0aXZlOiAwO1xcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6IGNhbGMoNDEuNjI1JSAtIDE3LjVweCk7XFxuICAgICAgZmxleC1iYXNpczogY2FsYyg0MS42MjUlIC0gMTcuNXB4KTtcXG4gIG1heC13aWR0aDogY2FsYyg0MS42MjUlIC0gMTcuNXB4KTtcXG4gIHdpZHRoOiBjYWxjKDQxLjYyNSUgLSAxNy41cHgpO1xcbn1cXG5cXG4uaW5uZXI6bnRoLWNoaWxkKDFuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLmlubmVyOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cXG4uaW5uZXI6bnRoLWNoaWxkKDEybikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi50aXRsZSB7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDIzcHg7XFxufVxcblxcbi50aXRsZSwgLmRlc2NyLCAubGluayB7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmRlc2NyIHtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxuICBjb2xvcjogcmdiKDg1LCA4NSwgODUpO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4ubGluayB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAzNHB4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmVcXG59XFxuXFxuLmxpbms6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICMwMDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiSnVtYm90cm9uLXJvb3QtMklYd0hcIixcblx0XCJpbm5lclwiOiBcIkp1bWJvdHJvbi1pbm5lci0yQW9KdFwiLFxuXHRcInRpdGxlXCI6IFwiSnVtYm90cm9uLXRpdGxlLTNrOTQ2XCIsXG5cdFwiZGVzY3JcIjogXCJKdW1ib3Ryb24tZGVzY3ItMVJsT0VcIixcblx0XCJsaW5rXCI6IFwiSnVtYm90cm9uLWxpbmstM01hY1pcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvSnVtYm90cm9uL0p1bWJvdHJvbi5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9KdW1ib3Ryb24vSnVtYm90cm9uLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4vKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbjpyb290IHtcXG4gIC8qXFxuICAgKiBUeXBvZ3JhcGh5XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBMYXlvdXRcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIE1lZGlhIHF1ZXJpZXMgYnJlYWtwb2ludHNcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLyAgLyogRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmUgKi8gIC8qIFNtYWxsIHNjcmVlbiAvIHRhYmxldCAqLyAgLyogTWVkaXVtIHNjcmVlbiAvIGRlc2t0b3AgKi8gLyogTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wICovXFxufVxcblxcbi8qXFxuICogbm9ybWFsaXplLmNzcyBpcyBpbXBvcnRlZCBpbiBKUyBmaWxlLlxcbiAqIElmIHlvdSBpbXBvcnQgZXh0ZXJuYWwgQ1NTIGZpbGUgZnJvbSB5b3VyIGludGVybmFsIENTU1xcbiAqIHRoZW4gaXQgd2lsbCBiZSBpbmxpbmVkIGFuZCBwcm9jZXNzZWQgd2l0aCBDU1MgbW9kdWxlcy5cXG4gKi9cXG5cXG4vKlxcbiAqIEJhc2Ugc3R5bGVzXFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG5odG1sIHtcXG4gIGNvbG9yOiAjMjIyO1xcbiAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiB+MTZweDsgKi9cXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCAnSGVsdmV0aWNhTmV1ZS1MaWdodCcsIHNhbnMtc2VyaWY7XFxuICBsaW5lLWhlaWdodDogMS4zNzU7IC8qIH4yMnB4ICovXFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5hIHtcXG4gIGNvbG9yOiAjMDA3NGMyO1xcbn1cXG5cXG4vKlxcbiAqIFJlbW92ZSB0ZXh0LXNoYWRvdyBpbiBzZWxlY3Rpb24gaGlnaGxpZ2h0OlxcbiAqIGh0dHBzOi8vdHdpdHRlci5jb20vbWlrZXRheWxyL3N0YXR1cy8xMjIyODgwNTMwMVxcbiAqXFxuICogVGhlc2Ugc2VsZWN0aW9uIHJ1bGUgc2V0cyBoYXZlIHRvIGJlIHNlcGFyYXRlLlxcbiAqIEN1c3RvbWl6ZSB0aGUgYmFja2dyb3VuZCBjb2xvciB0byBtYXRjaCB5b3VyIGRlc2lnbi5cXG4gKi9cXG5cXG46Oi1tb3otc2VsZWN0aW9uIHtcXG4gIGJhY2tncm91bmQ6ICNiM2Q0ZmM7XFxuICB0ZXh0LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuOjpzZWxlY3Rpb24ge1xcbiAgYmFja2dyb3VuZDogI2IzZDRmYztcXG4gIHRleHQtc2hhZG93OiBub25lO1xcbn1cXG5cXG4vKlxcbiAqIEEgYmV0dGVyIGxvb2tpbmcgZGVmYXVsdCBob3Jpem9udGFsIHJ1bGVcXG4gKi9cXG5cXG5ociB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogMXB4O1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XFxuICBtYXJnaW46IDFlbSAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLypcXG4gKiBSZW1vdmUgdGhlIGdhcCBiZXR3ZWVuIGF1ZGlvLCBjYW52YXMsIGlmcmFtZXMsXFxuICogaW1hZ2VzLCB2aWRlb3MgYW5kIHRoZSBib3R0b20gb2YgdGhlaXIgY29udGFpbmVyczpcXG4gKiBodHRwczovL2dpdGh1Yi5jb20vaDVicC9odG1sNS1ib2lsZXJwbGF0ZS9pc3N1ZXMvNDQwXFxuICovXFxuXFxuYXVkaW8sXFxuY2FudmFzLFxcbmlmcmFtZSxcXG5pbWcsXFxuc3ZnLFxcbnZpZGVvIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcblxcbi8qXFxuICogUmVtb3ZlIGRlZmF1bHQgZmllbGRzZXQgc3R5bGVzLlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIGJvcmRlcjogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qXFxuICogQWxsb3cgb25seSB2ZXJ0aWNhbCByZXNpemluZyBvZiB0ZXh0YXJlYXMuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcXG59XFxuXFxuLypcXG4gKiBCcm93c2VyIHVwZ3JhZGUgcHJvbXB0XFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4uYnJvd3NlcnVwZ3JhZGUge1xcbiAgbWFyZ2luOiAwLjJlbSAwO1xcbiAgYmFja2dyb3VuZDogI2NjYztcXG4gIGNvbG9yOiAjMDAwO1xcbiAgcGFkZGluZzogMC4yZW0gMDtcXG59XFxuXFxuLypcXG4gKiBQcmludCBzdHlsZXNcXG4gKiBJbmxpbmVkIHRvIGF2b2lkIHRoZSBhZGRpdGlvbmFsIEhUVFAgcmVxdWVzdDpcXG4gKiBodHRwOi8vd3d3LnBocGllZC5jb20vZGVsYXktbG9hZGluZy15b3VyLXByaW50LWNzcy9cXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbkBtZWRpYSBwcmludCB7XFxuICAqLFxcbiAgKjo6YmVmb3JlLFxcbiAgKjo6YWZ0ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50OyAvKiBCbGFjayBwcmludHMgZmFzdGVyOiBodHRwOi8vd3d3LnNhbmJlaWppLmNvbS9hcmNoaXZlcy85NTMgKi9cXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xcbiAgICB0ZXh0LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xcbiAgfVxcblxcbiAgYSxcXG4gIGE6dmlzaXRlZCB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgfVxcblxcbiAgYVtocmVmXTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiAnICgnIGF0dHIoaHJlZikgJyknO1xcbiAgfVxcblxcbiAgYWJiclt0aXRsZV06OmFmdGVyIHtcXG4gICAgY29udGVudDogJyAoJyBhdHRyKHRpdGxlKSAnKSc7XFxuICB9XFxuXFxuICAvKlxcbiAgICogRG9uJ3Qgc2hvdyBsaW5rcyB0aGF0IGFyZSBmcmFnbWVudCBpZGVudGlmaWVycyxcXG4gICAqIG9yIHVzZSB0aGUgYGphdmFzY3JpcHQ6YCBwc2V1ZG8gcHJvdG9jb2xcXG4gICAqL1xcblxcbiAgYVtocmVmXj0nIyddOjphZnRlcixcXG4gIGFbaHJlZl49J2phdmFzY3JpcHQ6J106OmFmdGVyIHtcXG4gICAgY29udGVudDogJyc7XFxuICB9XFxuXFxuICBwcmUsXFxuICBibG9ja3F1b3RlIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzk5OTtcXG4gICAgcGFnZS1icmVhay1pbnNpZGU6IGF2b2lkO1xcbiAgfVxcblxcbiAgLypcXG4gICAqIFByaW50aW5nIFRhYmxlczpcXG4gICAqIGh0dHA6Ly9jc3MtZGlzY3Vzcy5pbmN1dGlvLmNvbS93aWtpL1ByaW50aW5nX1RhYmxlc1xcbiAgICovXFxuXFxuICB0aGVhZCB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLWhlYWRlci1ncm91cDtcXG4gIH1cXG5cXG4gIHRyLFxcbiAgaW1nIHtcXG4gICAgcGFnZS1icmVhay1pbnNpZGU6IGF2b2lkO1xcbiAgfVxcblxcbiAgaW1nIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxuICB9XFxuXFxuICBwLFxcbiAgaDIsXFxuICBoMyB7XFxuICAgIG9ycGhhbnM6IDM7XFxuICAgIHdpZG93czogMztcXG4gIH1cXG5cXG4gIGgyLFxcbiAgaDMge1xcbiAgICBwYWdlLWJyZWFrLWFmdGVyOiBhdm9pZDtcXG4gIH1cXG59XFxuXFxuYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXJcXG59XFxuXFxuYTpob3ZlciAge1xcbiAgY29sb3I6IGN1cnJlbnRDb2xvcjtcXG59XFxuXFxudWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbioge1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7O0dBT0c7O0FBRUg7Ozs7Ozs7R0FPRzs7QUFFSDtFQUNFOztnRkFFOEU7O0VBRTlFOztnRkFFOEU7O0VBRTlFOztnRkFFOEUsRUFBRSxnQ0FBZ0MsRUFBRSwyQkFBMkIsRUFBRSw2QkFBNkIsQ0FBQyxpQ0FBaUM7Q0FDL007O0FBRUQ7Ozs7R0FJRzs7QUFFSDs7Z0ZBRWdGOztBQUVoRjtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZUFBZSxDQUFDLFlBQVk7RUFDNUIsMkRBQTJEO0VBQzNELG1CQUFtQixDQUFDLFdBQVc7Q0FDaEM7O0FBRUQ7RUFDRSxVQUFVO0NBQ1g7O0FBRUQ7RUFDRSxlQUFlO0NBQ2hCOztBQUVEOzs7Ozs7R0FNRzs7QUFFSDtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0NBQ25COztBQUVEOztHQUVHOztBQUVIO0VBQ0UsZUFBZTtFQUNmLFlBQVk7RUFDWixVQUFVO0VBQ1YsMkJBQTJCO0VBQzNCLGNBQWM7RUFDZCxXQUFXO0NBQ1o7O0FBRUQ7Ozs7R0FJRzs7QUFFSDs7Ozs7O0VBTUUsdUJBQXVCO0NBQ3hCOztBQUVEOztHQUVHOztBQUVIO0VBQ0UsVUFBVTtFQUNWLFVBQVU7RUFDVixXQUFXO0NBQ1o7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7O2dGQUVnRjs7QUFFaEY7RUFDRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixpQkFBaUI7Q0FDbEI7O0FBRUQ7Ozs7Z0ZBSWdGOztBQUVoRjtFQUNFOzs7SUFHRSxtQ0FBbUM7SUFDbkMsdUJBQXVCLENBQUMsK0RBQStEO0lBQ3ZGLG9DQUFvQztZQUM1Qiw0QkFBNEI7SUFDcEMsNkJBQTZCO0dBQzlCOztFQUVEOztJQUVFLDJCQUEyQjtHQUM1Qjs7RUFFRDtJQUNFLDZCQUE2QjtHQUM5Qjs7RUFFRDtJQUNFLDhCQUE4QjtHQUMvQjs7RUFFRDs7O0tBR0c7O0VBRUg7O0lBRUUsWUFBWTtHQUNiOztFQUVEOztJQUVFLHVCQUF1QjtJQUN2Qix5QkFBeUI7R0FDMUI7O0VBRUQ7OztLQUdHOztFQUVIO0lBQ0UsNEJBQTRCO0dBQzdCOztFQUVEOztJQUVFLHlCQUF5QjtHQUMxQjs7RUFFRDtJQUNFLDJCQUEyQjtHQUM1Qjs7RUFFRDs7O0lBR0UsV0FBVztJQUNYLFVBQVU7R0FDWDs7RUFFRDs7SUFFRSx3QkFBd0I7R0FDekI7Q0FDRjs7QUFFRDtFQUNFLHNCQUFzQjtFQUN0QixlQUFlO0NBQ2hCOztBQUVEO0VBQ0Usb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxVQUFVO0NBQ1g7O0FBRUQ7RUFDRSxlQUFlO0VBQ2YsK0JBQStCO1VBQ3ZCLHVCQUF1QjtDQUNoQ1wiLFwiZmlsZVwiOlwiTGF5b3V0LmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLypcXG4gKiBub3JtYWxpemUuY3NzIGlzIGltcG9ydGVkIGluIEpTIGZpbGUuXFxuICogSWYgeW91IGltcG9ydCBleHRlcm5hbCBDU1MgZmlsZSBmcm9tIHlvdXIgaW50ZXJuYWwgQ1NTXFxuICogdGhlbiBpdCB3aWxsIGJlIGlubGluZWQgYW5kIHByb2Nlc3NlZCB3aXRoIENTUyBtb2R1bGVzLlxcbiAqL1xcblxcbi8qXFxuICogQmFzZSBzdHlsZXNcXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbmh0bWwge1xcbiAgY29sb3I6ICMyMjI7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgZm9udC1zaXplOiAxZW07IC8qIH4xNnB4OyAqL1xcbiAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsICdIZWx2ZXRpY2FOZXVlLUxpZ2h0Jywgc2Fucy1zZXJpZjtcXG4gIGxpbmUtaGVpZ2h0OiAxLjM3NTsgLyogfjIycHggKi9cXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmEge1xcbiAgY29sb3I6ICMwMDc0YzI7XFxufVxcblxcbi8qXFxuICogUmVtb3ZlIHRleHQtc2hhZG93IGluIHNlbGVjdGlvbiBoaWdobGlnaHQ6XFxuICogaHR0cHM6Ly90d2l0dGVyLmNvbS9taWtldGF5bHIvc3RhdHVzLzEyMjI4ODA1MzAxXFxuICpcXG4gKiBUaGVzZSBzZWxlY3Rpb24gcnVsZSBzZXRzIGhhdmUgdG8gYmUgc2VwYXJhdGUuXFxuICogQ3VzdG9taXplIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIHRvIG1hdGNoIHlvdXIgZGVzaWduLlxcbiAqL1xcblxcbjo6LW1vei1zZWxlY3Rpb24ge1xcbiAgYmFja2dyb3VuZDogI2IzZDRmYztcXG4gIHRleHQtc2hhZG93OiBub25lO1xcbn1cXG5cXG46OnNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiAjYjNkNGZjO1xcbiAgdGV4dC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi8qXFxuICogQSBiZXR0ZXIgbG9va2luZyBkZWZhdWx0IGhvcml6b250YWwgcnVsZVxcbiAqL1xcblxcbmhyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcXG4gIG1hcmdpbjogMWVtIDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKlxcbiAqIFJlbW92ZSB0aGUgZ2FwIGJldHdlZW4gYXVkaW8sIGNhbnZhcywgaWZyYW1lcyxcXG4gKiBpbWFnZXMsIHZpZGVvcyBhbmQgdGhlIGJvdHRvbSBvZiB0aGVpciBjb250YWluZXJzOlxcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9oNWJwL2h0bWw1LWJvaWxlcnBsYXRlL2lzc3Vlcy80NDBcXG4gKi9cXG5cXG5hdWRpbyxcXG5jYW52YXMsXFxuaWZyYW1lLFxcbmltZyxcXG5zdmcsXFxudmlkZW8ge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuXFxuLypcXG4gKiBSZW1vdmUgZGVmYXVsdCBmaWVsZHNldCBzdHlsZXMuXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgYm9yZGVyOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLypcXG4gKiBBbGxvdyBvbmx5IHZlcnRpY2FsIHJlc2l6aW5nIG9mIHRleHRhcmVhcy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICByZXNpemU6IHZlcnRpY2FsO1xcbn1cXG5cXG4vKlxcbiAqIEJyb3dzZXIgdXBncmFkZSBwcm9tcHRcXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbjpnbG9iYWwoLmJyb3dzZXJ1cGdyYWRlKSB7XFxuICBtYXJnaW46IDAuMmVtIDA7XFxuICBiYWNrZ3JvdW5kOiAjY2NjO1xcbiAgY29sb3I6ICMwMDA7XFxuICBwYWRkaW5nOiAwLjJlbSAwO1xcbn1cXG5cXG4vKlxcbiAqIFByaW50IHN0eWxlc1xcbiAqIElubGluZWQgdG8gYXZvaWQgdGhlIGFkZGl0aW9uYWwgSFRUUCByZXF1ZXN0OlxcbiAqIGh0dHA6Ly93d3cucGhwaWVkLmNvbS9kZWxheS1sb2FkaW5nLXlvdXItcHJpbnQtY3NzL1xcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuQG1lZGlhIHByaW50IHtcXG4gICosXFxuICAqOjpiZWZvcmUsXFxuICAqOjphZnRlciB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjMDAwICFpbXBvcnRhbnQ7IC8qIEJsYWNrIHByaW50cyBmYXN0ZXI6IGh0dHA6Ly93d3cuc2FuYmVpamkuY29tL2FyY2hpdmVzLzk1MyAqL1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICAgIHRleHQtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxuXFxuICBhLFxcbiAgYTp2aXNpdGVkIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICB9XFxuXFxuICBhW2hyZWZdOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6ICcgKCcgYXR0cihocmVmKSAnKSc7XFxuICB9XFxuXFxuICBhYmJyW3RpdGxlXTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiAnICgnIGF0dHIodGl0bGUpICcpJztcXG4gIH1cXG5cXG4gIC8qXFxuICAgKiBEb24ndCBzaG93IGxpbmtzIHRoYXQgYXJlIGZyYWdtZW50IGlkZW50aWZpZXJzLFxcbiAgICogb3IgdXNlIHRoZSBgamF2YXNjcmlwdDpgIHBzZXVkbyBwcm90b2NvbFxcbiAgICovXFxuXFxuICBhW2hyZWZePScjJ106OmFmdGVyLFxcbiAgYVtocmVmXj0namF2YXNjcmlwdDonXTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiAnJztcXG4gIH1cXG5cXG4gIHByZSxcXG4gIGJsb2NrcXVvdGUge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xcbiAgICBwYWdlLWJyZWFrLWluc2lkZTogYXZvaWQ7XFxuICB9XFxuXFxuICAvKlxcbiAgICogUHJpbnRpbmcgVGFibGVzOlxcbiAgICogaHR0cDovL2Nzcy1kaXNjdXNzLmluY3V0aW8uY29tL3dpa2kvUHJpbnRpbmdfVGFibGVzXFxuICAgKi9cXG5cXG4gIHRoZWFkIHtcXG4gICAgZGlzcGxheTogdGFibGUtaGVhZGVyLWdyb3VwO1xcbiAgfVxcblxcbiAgdHIsXFxuICBpbWcge1xcbiAgICBwYWdlLWJyZWFrLWluc2lkZTogYXZvaWQ7XFxuICB9XFxuXFxuICBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIH1cXG5cXG4gIHAsXFxuICBoMixcXG4gIGgzIHtcXG4gICAgb3JwaGFuczogMztcXG4gICAgd2lkb3dzOiAzO1xcbiAgfVxcblxcbiAgaDIsXFxuICBoMyB7XFxuICAgIHBhZ2UtYnJlYWstYWZ0ZXI6IGF2b2lkO1xcbiAgfVxcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlclxcbn1cXG5cXG5hOmhvdmVyICB7XFxuICBjb2xvcjogY3VycmVudENvbG9yO1xcbn1cXG5cXG51bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuKiB7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9MYXlvdXQvTGF5b3V0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuTG9nby1yb290LTFSSi0xIHtcXG4gIHdpZHRoOiAxMTlweDtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBmb250LWZhbWlseTogTmljb25uZSwgY3Vyc2l2ZTtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjRweDtcXG59XFxuXFxuLkxvZ28td2hpdGUtZnBpOVcge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0xvZ28vTG9nby5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLDhCQUE4QjtFQUM5QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixzQkFBc0I7Q0FDdkI7O0FBRUQ7RUFDRSxZQUFZO0NBQ2JcIixcImZpbGVcIjpcIkxvZ28uY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5yb290IHtcXG4gIHdpZHRoOiAxMTlweDtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBmb250LWZhbWlseTogTmljb25uZSwgY3Vyc2l2ZTtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjRweDtcXG59XFxuXFxuLndoaXRlIHtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkxvZ28tcm9vdC0xUkotMVwiLFxuXHRcIndoaXRlXCI6IFwiTG9nby13aGl0ZS1mcGk5V1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Mb2dvL0xvZ28uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvTG9nby9Mb2dvLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4uTmF2aWdhdGlvbi1yb290LTJnY0p4IHt9XFxuXFxuLk5hdmlnYXRpb24tbGluay1OdGwzNSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogcmdiKDE3LCAxNywgMTcpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xOHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAzNXB4XFxufVxcblxcbi5OYXZpZ2F0aW9uLWxpbmstTnRsMzU6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5OYXZpZ2F0aW9uLWxpbmstTnRsMzU6YWN0aXZlLFxcbi5OYXZpZ2F0aW9uLWxpbmstTnRsMzU6dmlzaXRlZCxcXG4uTmF2aWdhdGlvbi1saW5rLU50bDM1OmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG59XFxuXFxuLk5hdmlnYXRpb24td2hpdGUtMlFoZm4gLk5hdmlnYXRpb24tbGluay1OdGwzNSB7XFxuICBjb2xvcjogcmdiKDI0MSwgMjQxLCAyNDEpO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uTmF2aWdhdGlvbi1hY3RpdmVMaW5rLTNmRncwIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7O0dBT0c7O0FBRUgseUJBQVE7O0FBRVI7RUFDRSxzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDs7O0VBR0UsMkJBQTJCO0VBQzNCLHVCQUF1QjtDQUN4Qjs7QUFFRDtFQUNFLDBCQUEwQjtFQUMxQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLDJCQUEyQjtDQUM1QlwiLFwiZmlsZVwiOlwiTmF2aWdhdGlvbi5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4ucm9vdCB7fVxcblxcbi5saW5rIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE4cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDM1cHhcXG59XFxuXFxuLmxpbms6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5saW5rOmFjdGl2ZSxcXG4ubGluazp2aXNpdGVkLFxcbi5saW5rOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG59XFxuXFxuLndoaXRlIC5saW5rIHtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyNDEsIDI0MSk7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5hY3RpdmVMaW5rIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIk5hdmlnYXRpb24tcm9vdC0yZ2NKeFwiLFxuXHRcImxpbmtcIjogXCJOYXZpZ2F0aW9uLWxpbmstTnRsMzVcIixcblx0XCJ3aGl0ZVwiOiBcIk5hdmlnYXRpb24td2hpdGUtMlFoZm5cIixcblx0XCJhY3RpdmVMaW5rXCI6IFwiTmF2aWdhdGlvbi1hY3RpdmVMaW5rLTNmRncwXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuUmF0aW5nLXJvb3QtM2wxUG8ge1xcbiAgLypkaXNwbGF5OiBmbGV4OyovXFxuXFxuICAvKmFsaWduLWl0ZW1zOiBjZW50ZXI7Ki9cXG5cXG4gIC8qanVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyovXFxufVxcblxcblxcblxcblxcbi5SYXRpbmctc3Rhci0zbkRleCB7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHhcXG59XFxuXFxuXFxuXFxuXFxuLlJhdGluZy1zdGFyLTNuRGV4Omxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9SYXRpbmcvUmF0aW5nLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFrQjs7RUFFbEIsd0JBQXdCOztFQUV4QixnQ0FBZ0M7Q0FDakM7Ozs7O0FBS0Q7RUFDRSx1QkFBdUI7RUFDdkIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtDQUNsQjs7Ozs7QUFLRDtFQUNFLGdCQUFnQjtDQUNqQlwiLFwiZmlsZVwiOlwiUmF0aW5nLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICAvKmRpc3BsYXk6IGZsZXg7Ki9cXG5cXG4gIC8qYWxpZ24taXRlbXM6IGNlbnRlcjsqL1xcblxcbiAgLypqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7Ki9cXG59XFxuXFxuXFxuXFxuXFxuLnN0YXIge1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIG1hcmdpbi1yaWdodDogNXB4XFxufVxcblxcblxcblxcblxcbi5zdGFyOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIlJhdGluZy1yb290LTNsMVBvXCIsXG5cdFwic3RhclwiOiBcIlJhdGluZy1zdGFyLTNuRGV4XCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1JhdGluZy9SYXRpbmcuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5TZXJ2aWNlRmVhdHVyZXMtcm9vdC0zZ0FnZCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufS5TZXJ2aWNlRmVhdHVyZXMtcm9vdC0zZ0FnZCB7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5TZXJ2aWNlRmVhdHVyZXMtaXRlbS0yVU9iYSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgLW1zLWZsZXgtcG9zaXRpdmU6IDA7XFxuICAgICAgZmxleC1ncm93OiAwO1xcbiAgLW1zLWZsZXgtbmVnYXRpdmU6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gICAgICBmbGV4LWJhc2lzOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICBoZWlnaHQ6IDEzOXB4O1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxufVxcblxcbi5TZXJ2aWNlRmVhdHVyZXMtaXRlbS0yVU9iYTpudGgtY2hpbGQoMW4pIHtcXG4gIG1hcmdpbi1yaWdodDogMzBweDtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG5cXG4uU2VydmljZUZlYXR1cmVzLWl0ZW0tMlVPYmE6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5TZXJ2aWNlRmVhdHVyZXMtaXRlbS0yVU9iYTpudGgtY2hpbGQoMTJuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLlNlcnZpY2VGZWF0dXJlcy10aXRsZS0zVzlMVyB7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xOHB4O1xcbn1cXG5cXG4uU2VydmljZUZlYXR1cmVzLWRlc2NyLTNoR0FCIHtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE1cHg7XFxufVxcblxcbi5TZXJ2aWNlRmVhdHVyZXMtaWNvbi12S3RlaCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDVweDtcXG4gIHJpZ2h0OiA1cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1NlcnZpY2VGZWF0dXJlcy9TZXJ2aWNlRmVhdHVyZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7Q0FDZjtFQUNDLHNCQUFzQjtNQUNsQix3QkFBd0I7RUFDNUIsdUJBQXVCO01BQ25CLG9CQUFvQjtDQUN6Qjs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtNQUNuQixvQkFBb0I7RUFDeEIsc0JBQXNCO01BQ2xCLHdCQUF3QjtFQUM1QiwyQkFBMkI7TUFDdkIsdUJBQXVCO0VBQzNCLG1CQUFtQjtFQUNuQixxQkFBcUI7TUFDakIsYUFBYTtFQUNqQixxQkFBcUI7TUFDakIsZUFBZTtFQUNuQixnREFBZ0Q7TUFDNUMsbUNBQW1DO0VBQ3ZDLGtDQUFrQztFQUNsQyw4QkFBOEI7RUFDOUIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixxQ0FBcUM7Q0FDdEM7O0FBRUQ7RUFDRSxtQkFBbUI7RUFDbkIsZUFBZTtDQUNoQjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtDQUN4Qjs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOztBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxXQUFXO0NBQ1pcIixcImZpbGVcIjpcIlNlcnZpY2VGZWF0dXJlcy5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn0ucm9vdCB7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5pdGVtIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wb3NpdGl2ZTogMDtcXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAtbXMtZmxleC1uZWdhdGl2ZTogMDtcXG4gICAgICBmbGV4LXNocmluazogMDtcXG4gIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgICAgIGZsZXgtYmFzaXM6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICBtYXgtd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICB3aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIGhlaWdodDogMTM5cHg7XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLml0ZW06bnRoLWNoaWxkKDFuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLml0ZW06bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5pdGVtOm50aC1jaGlsZCgxMm4pIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMThweDtcXG59XFxuXFxuLmRlc2NyIHtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE1cHg7XFxufVxcblxcbi5pY29uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNXB4O1xcbiAgcmlnaHQ6IDVweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJTZXJ2aWNlRmVhdHVyZXMtcm9vdC0zZ0FnZFwiLFxuXHRcIml0ZW1cIjogXCJTZXJ2aWNlRmVhdHVyZXMtaXRlbS0yVU9iYVwiLFxuXHRcInRpdGxlXCI6IFwiU2VydmljZUZlYXR1cmVzLXRpdGxlLTNXOUxXXCIsXG5cdFwiZGVzY3JcIjogXCJTZXJ2aWNlRmVhdHVyZXMtZGVzY3ItM2hHQUJcIixcblx0XCJpY29uXCI6IFwiU2VydmljZUZlYXR1cmVzLWljb24tdkt0ZWhcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9TZXJ2aWNlRmVhdHVyZXMvU2VydmljZUZlYXR1cmVzLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLlNvY2lhbHNMaXN0LXJvb3QtMklSWWYge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uU29jaWFsc0xpc3QtaXRlbS0xZEczZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5Tb2NpYWxzTGlzdC1pY29uLTM2V01uIHtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4uU29jaWFsc0xpc3QtY2VudGVyLTFnZmNsIHtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLlNvY2lhbHNMaXN0LWNpcmNsZS0xcF9MRyBhIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgd2lkdGg6IDM2cHg7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMzZweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvU29jaWFsc0xpc3QvU29jaWFsc0xpc3QuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0VBQ3hCLHFCQUFxQjtNQUNqQiw0QkFBNEI7Q0FDakM7O0FBRUQ7RUFDRSxtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxZQUFZO0NBQ2I7O0FBRUQ7RUFDRSxzQkFBc0I7TUFDbEIsd0JBQXdCO0NBQzdCOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0NBQ25CXCIsXCJmaWxlXCI6XCJTb2NpYWxzTGlzdC5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uaXRlbSB7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5pY29uIHtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG5cXG4uY2VudGVyIHtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmNpcmNsZSBhIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgd2lkdGg6IDM2cHg7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMzZweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJTb2NpYWxzTGlzdC1yb290LTJJUllmXCIsXG5cdFwiaXRlbVwiOiBcIlNvY2lhbHNMaXN0LWl0ZW0tMWRHM2VcIixcblx0XCJpY29uXCI6IFwiU29jaWFsc0xpc3QtaWNvbi0zNldNblwiLFxuXHRcImNlbnRlclwiOiBcIlNvY2lhbHNMaXN0LWNlbnRlci0xZ2ZjbFwiLFxuXHRcImNpcmNsZVwiOiBcIlNvY2lhbHNMaXN0LWNpcmNsZS0xcF9MR1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5UYWJzLXJvb3QtMmN0NVMge31cXG5cXG4uVGFicy1saXN0LTIyak1NIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgbWFyZ2luLWJvdHRvbTogNDZweDtcXG59XFxuXFxuLlRhYnMtdGFiLVNhVmlJIHtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE2cHg7XFxuICBjdXJzb3I6IHBvaW50ZXJcXG59XFxuXFxuLlRhYnMtdGFiLVNhVmlJOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4uVGFicy1zZWxlY3RlZC0zcWcxTCB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLlRhYnMtcGFuZWwtUXFfMDQge1xcbiAgb3BhY2l0eTogMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG4gIC1vLXRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbn1cXG5cXG4uVGFicy1wYW5lbEFjdGl2ZS0zbzRNVCB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9UYWJzL1RhYnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLG1CQUFROztBQUVSO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0VBQ3hCLHVCQUF1QjtNQUNuQiwrQkFBK0I7RUFDbkMsb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0UsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsZUFBZTtDQUNoQjs7QUFFRDtFQUNFLDJCQUEyQjtDQUM1Qjs7QUFFRDtFQUNFLDJCQUEyQjtDQUM1Qjs7QUFFRDtFQUNFLFdBQVc7RUFDWCx3Q0FBd0M7RUFDeEMsbUNBQW1DO0VBQ25DLGdDQUFnQztDQUNqQzs7QUFFRDtFQUNFLFdBQVc7Q0FDWlwiLFwiZmlsZVwiOlwiVGFicy5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge31cXG5cXG4ubGlzdCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIG1hcmdpbi1ib3R0b206IDQ2cHg7XFxufVxcblxcbi50YWIge1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTZweDtcXG4gIGN1cnNvcjogcG9pbnRlclxcbn1cXG5cXG4udGFiOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4uc2VsZWN0ZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5wYW5lbCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbiAgLW8tdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxufVxcblxcbi5wYW5lbEFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIlRhYnMtcm9vdC0yY3Q1U1wiLFxuXHRcImxpc3RcIjogXCJUYWJzLWxpc3QtMjJqTU1cIixcblx0XCJ0YWJcIjogXCJUYWJzLXRhYi1TYVZpSVwiLFxuXHRcInNlbGVjdGVkXCI6IFwiVGFicy1zZWxlY3RlZC0zcWcxTFwiLFxuXHRcInBhbmVsXCI6IFwiVGFicy1wYW5lbC1RcV8wNFwiLFxuXHRcInBhbmVsQWN0aXZlXCI6IFwiVGFicy1wYW5lbEFjdGl2ZS0zbzRNVFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9UYWJzL1RhYnMuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvVGFicy9UYWJzLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLlRpdGxlLXRpdGxlLTNzM0REIHtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4yOHB4O1xcbn1cXG5cXG5oMS5UaXRsZS10aXRsZS0zczNERCB7XFxuICBmb250LXNpemU6IDkyLjhweDtcXG4gIGZvbnQtc2l6ZTogNS44cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiA2NnB4O1xcbn1cXG5cXG5oMi5UaXRsZS10aXRsZS0zczNERCB7XFxuICBmb250LXNpemU6IDI4cHg7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLlRpdGxlLWNlbnRlci03TlhRMCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7RUFDRSx1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGlCQUFpQjtFQUNqQix1QkFBdUI7Q0FDeEI7O0FBRUQ7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsbUJBQW1CO0NBQ3BCXCIsXCJmaWxlXCI6XCJUaXRsZS5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiXFxuLnRpdGxlIHtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4yOHB4O1xcbn1cXG5cXG5oMS50aXRsZSB7XFxuICBmb250LXNpemU6IDkyLjhweDtcXG4gIGZvbnQtc2l6ZTogNS44cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiA2NnB4O1xcbn1cXG5cXG5oMi50aXRsZSB7XFxuICBmb250LXNpemU6IDI4cHg7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLmNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJ0aXRsZVwiOiBcIlRpdGxlLXRpdGxlLTNzM0REXCIsXG5cdFwiY2VudGVyXCI6IFwiVGl0bGUtY2VudGVyLTdOWFEwXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLlRvb2xCYXItYWN0aW9uLTN6ZzNwIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogMjdweFxcbn1cXG5cXG5cXG4uVG9vbEJhci1hY3Rpb24tM3pnM3A6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcblxcbi5Ub29sQmFyLWJhZy0xVDlXZiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcblxcbi5Ub29sQmFyLWNvdW50LWprZ0xyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTEycHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDlweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wOXB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Ub29sQmFyL1Rvb2xCYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtDQUNuQjs7O0FBR0Q7RUFDRSxnQkFBZ0I7Q0FDakI7OztBQUdEO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtDQUNqQjs7O0FBR0Q7RUFDRSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixZQUFZO0VBQ1osYUFBYTtFQUNiLCtCQUErQjtFQUMvQiwwQkFBMEI7RUFDMUIsaUNBQWlDO0VBQ2pDLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0NBQ3hCXCIsXCJmaWxlXCI6XCJUb29sQmFyLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuYWN0aW9uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogMjdweFxcbn1cXG5cXG5cXG4uYWN0aW9uOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cXG5cXG4uYmFnIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuXFxuLmNvdW50IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTEycHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDlweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wOXB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiYWN0aW9uXCI6IFwiVG9vbEJhci1hY3Rpb24tM3pnM3BcIixcblx0XCJiYWdcIjogXCJUb29sQmFyLWJhZy0xVDlXZlwiLFxuXHRcImNvdW50XCI6IFwiVG9vbEJhci1jb3VudC1qa2dMclwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Ub29sQmFyL1Rvb2xCYXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvVG9vbEJhci9Ub29sQmFyLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkFscmVhZHlGb290ZXItYWxyZWFkeS0zQzJkQyB7XFxuICBtYXJnaW4tYm90dG9tOiAyN3B4O1xcbn1cXG5cXG4uQWxyZWFkeUZvb3Rlci1hbHJlYWR5LTNDMmRDIHNwYW46bnRoLWNoaWxkKDEpIHtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBoZWlnaHQ6IDFweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzQsIDIzNCwgMjM0KTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uQWxyZWFkeUZvb3Rlci1hbHJlYWR5LTNDMmRDIHNwYW46bnRoLWNoaWxkKDIpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0FscmVhZHlGb290ZXIvQWxyZWFkeUZvb3Rlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLHFDQUFxQztFQUNyQyxlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtDQUN4QlwiLFwiZmlsZVwiOlwiQWxyZWFkeUZvb3Rlci5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmFscmVhZHkge1xcbiAgbWFyZ2luLWJvdHRvbTogMjdweDtcXG59XFxuXFxuLmFscmVhZHkgc3BhbjpudGgtY2hpbGQoMSkge1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIGhlaWdodDogMXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzNCwgMjM0LCAyMzQpO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi5hbHJlYWR5IHNwYW46bnRoLWNoaWxkKDIpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImFscmVhZHlcIjogXCJBbHJlYWR5Rm9vdGVyLWFscmVhZHktM0MyZENcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0FscmVhZHlGb290ZXIvQWxyZWFkeUZvb3Rlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvQWxyZWFkeUZvb3Rlci9BbHJlYWR5Rm9vdGVyLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG46cm9vdCB7XFxuICAvKlxcbiAgICogVHlwb2dyYXBoeVxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8gIC8qIEV4dHJhIHNtYWxsIHNjcmVlbiAvIHBob25lICovICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi8gIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovIC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4uTG9naW4tZm9vdGVyLTNpQUlMIHtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxufVxcblxcbi5Mb2dpbi1jb250YWluZXItMkdXdV8ge1xcbiAgbWF4LXdpZHRoOiA1NzBweDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgcGFkZGluZy1ib3R0b206IDEzMHB4O1xcbn1cXG5cXG4uTG9naW4tbGVhZC0yZm1wVCB7XFxuICBmb250LXNpemU6IDEuMjVlbTtcXG59XFxuXFxuLkxvZ2luLWZvcm1Hcm91cC1LQm1RVyB7XFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbn1cXG5cXG4uTG9naW4tbGFiZWwtMzlWNXkge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uTG9naW4tYnV0dG9uLTJYV2xMIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMTBweCAxNnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvdXRsaW5lOiAwO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzM3MzI3NztcXG4gIGJhY2tncm91bmQ6ICMzNzMyNzc7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjMzMzMzMzM7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uTG9naW4tYnV0dG9uLTJYV2xMOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IHJnYmEoNTQsIDUwLCAxMTksIDAuOCk7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5Mb2dpbi1idXR0b24tMlhXbEw6Zm9jdXMge1xcbiAgYm9yZGVyLWNvbG9yOiAjMDA3NGMyO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgOHB4IHJnYmEoMCwgMTE2LCAxOTQsIDAuNik7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCA4cHggcmdiYSgwLCAxMTYsIDE5NCwgMC42KTtcXG59XFxuXFxuLkxvZ2luLWZhY2Vib29rLTIwMTUwIHtcXG4gIGJvcmRlci1jb2xvcjogIzNiNTk5ODtcXG4gIGJhY2tncm91bmQ6ICMzYjU5OTg7XFxufVxcblxcbi5Mb2dpbi1mYWNlYm9vay0yMDE1MDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiAjMmQ0MzczO1xcbn1cXG5cXG4uTG9naW4tZ29vZ2xlLTF1enkwIHtcXG4gIGJvcmRlci1jb2xvcjogI2RkNGIzOTtcXG4gIGJhY2tncm91bmQ6ICNkZDRiMzk7XFxufVxcblxcbi5Mb2dpbi1nb29nbGUtMXV6eTA6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogI2MyMzMyMTtcXG59XFxuXFxuLkxvZ2luLXR3aXR0ZXItLU5kQi0ge1xcbiAgYm9yZGVyLWNvbG9yOiAjNTVhY2VlO1xcbiAgYmFja2dyb3VuZDogIzU1YWNlZTtcXG59XFxuXFxuLkxvZ2luLXR3aXR0ZXItLU5kQi06aG92ZXIge1xcbiAgYmFja2dyb3VuZDogIzI3OTVlOTtcXG59XFxuXFxuLkxvZ2luLWljb24tMlQ2cUwge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luOiAtMnB4IDEycHggLTJweCAwO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgZmlsbDogY3VycmVudENvbG9yO1xcbn1cXG5cXG4uTG9naW4tbGluZVRocm91Z2gtMXFXdE8ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogMTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgY29sb3I6ICM3NTc1NzU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLkxvZ2luLWxpbmVUaHJvdWdoLTFxV3RPOjpiZWZvcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB6LWluZGV4OiAtMTtcXG4gIG1hcmdpbi10b3A6IC01cHg7XFxuICBtYXJnaW4tbGVmdDogLTIwcHg7XFxuICB3aWR0aDogNDBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBjb250ZW50OiAnJztcXG59XFxuXFxuLkxvZ2luLWxpbmVUaHJvdWdoLTFxV3RPOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDQ5JTtcXG4gIHotaW5kZXg6IC0yO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xcbiAgY29udGVudDogJyc7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9Mb2dpbi9Mb2dpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSDtFQUNFOztnRkFFOEU7O0VBRTlFOztnRkFFOEU7O0VBRTlFOztnRkFFOEUsRUFBRSxnQ0FBZ0MsRUFBRSwyQkFBMkIsRUFBRSw2QkFBNkIsQ0FBQyxpQ0FBaUM7Q0FDL007O0FBRUQ7RUFDRSxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixzQkFBc0I7Q0FDdkI7O0FBRUQ7RUFDRSxrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0UsZUFBZTtFQUNmLCtCQUErQjtVQUN2Qix1QkFBdUI7RUFDL0IsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osV0FBVztFQUNYLDBCQUEwQjtFQUMxQixvQkFBb0I7RUFDcEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtFQUN2QixvQkFBb0I7RUFDcEIsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsbUNBQW1DO0VBQ25DLGFBQWE7Q0FDZDs7QUFFRDtFQUNFLHNCQUFzQjtFQUN0QixtREFBbUQ7VUFDM0MsMkNBQTJDO0NBQ3BEOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLG9CQUFvQjtDQUVyQjs7QUFFRDtFQUNFLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLHNCQUFzQjtFQUN0QixvQkFBb0I7Q0FFckI7O0FBRUQ7RUFDRSxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxzQkFBc0I7RUFDdEIsb0JBQW9CO0NBRXJCOztBQUVEO0VBQ0Usb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGVBQWU7RUFDZixvQkFBb0I7RUFDcEIsWUFBWTtFQUNaLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsZUFBZTtDQUNoQjs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsVUFBVTtFQUNWLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsWUFBWTtFQUNaLGVBQWU7RUFDZixZQUFZO0VBQ1osOEJBQThCO0VBQzlCLFlBQVk7Q0FDYlwiLFwiZmlsZVwiOlwiTG9naW4uY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLmZvb3RlciB7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1heC13aWR0aDogNTcwcHg7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIHBhZGRpbmctYm90dG9tOiAxMzBweDtcXG59XFxuXFxuLmxlYWQge1xcbiAgZm9udC1zaXplOiAxLjI1ZW07XFxufVxcblxcbi5mb3JtR3JvdXAge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG59XFxuXFxuLmxhYmVsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDEwcHggMTZweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMzNzMyNzc7XFxuICBiYWNrZ3JvdW5kOiAjMzczMjc3O1xcbiAgY29sb3I6ICNmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBsaW5lLWhlaWdodDogMS4zMzMzMzMzO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDU0LCA1MCwgMTE5LCAwLjgpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uYnV0dG9uOmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogIzAwNzRjMjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDhweCByZ2JhKDAsIDExNiwgMTk0LCAwLjYpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDAgOHB4IHJnYmEoMCwgMTE2LCAxOTQsIDAuNik7XFxufVxcblxcbi5mYWNlYm9vayB7XFxuICBib3JkZXItY29sb3I6ICMzYjU5OTg7XFxuICBiYWNrZ3JvdW5kOiAjM2I1OTk4O1xcbiAgY29tcG9zZXM6IGJ1dHRvbjtcXG59XFxuXFxuLmZhY2Vib29rOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICMyZDQzNzM7XFxufVxcblxcbi5nb29nbGUge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGQ0YjM5O1xcbiAgYmFja2dyb3VuZDogI2RkNGIzOTtcXG4gIGNvbXBvc2VzOiBidXR0b247XFxufVxcblxcbi5nb29nbGU6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogI2MyMzMyMTtcXG59XFxuXFxuLnR3aXR0ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiAjNTVhY2VlO1xcbiAgYmFja2dyb3VuZDogIzU1YWNlZTtcXG4gIGNvbXBvc2VzOiBidXR0b247XFxufVxcblxcbi50d2l0dGVyOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICMyNzk1ZTk7XFxufVxcblxcbi5pY29uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbjogLTJweCAxMnB4IC0ycHggMDtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIGZpbGw6IGN1cnJlbnRDb2xvcjtcXG59XFxuXFxuLmxpbmVUaHJvdWdoIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDE7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGNvbG9yOiAjNzU3NTc1O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi5saW5lVGhyb3VnaDo6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgei1pbmRleDogLTE7XFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xcbiAgd2lkdGg6IDQwcHg7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgY29udGVudDogJyc7XFxufVxcblxcbi5saW5lVGhyb3VnaDo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA0OSU7XFxuICB6LWluZGV4OiAtMjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcXG4gIGNvbnRlbnQ6ICcnO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiZm9vdGVyXCI6IFwiTG9naW4tZm9vdGVyLTNpQUlMXCIsXG5cdFwiY29udGFpbmVyXCI6IFwiTG9naW4tY29udGFpbmVyLTJHV3VfXCIsXG5cdFwibGVhZFwiOiBcIkxvZ2luLWxlYWQtMmZtcFRcIixcblx0XCJmb3JtR3JvdXBcIjogXCJMb2dpbi1mb3JtR3JvdXAtS0JtUVdcIixcblx0XCJsYWJlbFwiOiBcIkxvZ2luLWxhYmVsLTM5VjV5XCIsXG5cdFwiYnV0dG9uXCI6IFwiTG9naW4tYnV0dG9uLTJYV2xMXCIsXG5cdFwiZmFjZWJvb2tcIjogXCJMb2dpbi1mYWNlYm9vay0yMDE1MCBMb2dpbi1idXR0b24tMlhXbExcIixcblx0XCJnb29nbGVcIjogXCJMb2dpbi1nb29nbGUtMXV6eTAgTG9naW4tYnV0dG9uLTJYV2xMXCIsXG5cdFwidHdpdHRlclwiOiBcIkxvZ2luLXR3aXR0ZXItLU5kQi0gTG9naW4tYnV0dG9uLTJYV2xMXCIsXG5cdFwiaWNvblwiOiBcIkxvZ2luLWljb24tMlQ2cUxcIixcblx0XCJsaW5lVGhyb3VnaFwiOiBcIkxvZ2luLWxpbmVUaHJvdWdoLTFxV3RPXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9Mb2dpbi9Mb2dpbi5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvTG9naW4vTG9naW4uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuUmVnaXN0ZXItcm9vdC0za3YzdCB7XFxuICBtYXgtd2lkdGg6IDU3MHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDEwMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9SZWdpc3Rlci9SZWdpc3Rlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixtQkFBbUI7Q0FDcEJcIixcImZpbGVcIjpcIlJlZ2lzdGVyLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBtYXgtd2lkdGg6IDU3MHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDEwMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiUmVnaXN0ZXItcm9vdC0za3YzdFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvUmVnaXN0ZXIvUmVnaXN0ZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgMzJweDtcXG4gIHBhZGRpbmc6IDAgMnJlbTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICM4ODg7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgY29sb3I6ICM1NTU7XFxufVxcblxcbnByZSB7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSDtFQUNFLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsdUJBQXVCO01BQ25CLG9CQUFvQjtFQUN4QixzQkFBc0I7TUFDbEIsd0JBQXdCO0VBQzVCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsWUFBWTtDQUNiOztBQUVEO0VBQ0UsVUFBVTtDQUNYOztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLHNCQUFzQjtFQUN0QixpQkFBaUI7Q0FDbEJcIixcImZpbGVcIjpcIkVycm9yUGFnZS5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgMzJweDtcXG4gIHBhZGRpbmc6IDAgMnJlbTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICM4ODg7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgY29sb3I6ICM1NTU7XFxufVxcblxcbnByZSB7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4vKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbjpyb290IHtcXG4gIC8qXFxuICAgKiBUeXBvZ3JhcGh5XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBMYXlvdXRcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIE1lZGlhIHF1ZXJpZXMgYnJlYWtwb2ludHNcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLyAgLyogRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmUgKi8gIC8qIFNtYWxsIHNjcmVlbiAvIHRhYmxldCAqLyAgLyogTWVkaXVtIHNjcmVlbiAvIGRlc2t0b3AgKi8gLyogTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wICovXFxufVxcblxcbi5Ib21lLXJvb3QtMWF2bDcge1xcbiAgcGFkZGluZy1ib3R0b206IDEwMHB4O1xcbn1cXG5cXG4uSG9tZS1oZWFkZXItd2l0c2Mge1xcbiAgbWFyZ2luLWJvdHRvbTogNTZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLkhvbWUtdGl0bGUtMlJhdjYge1xcbiAgbWFyZ2luOiAwO1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDI4cHg7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4yOHB4O1xcbn1cXG5cXG4uSG9tZS1kZXZpZGVyLTFhZkJQIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA3MHB4O1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG59XFxuXFxuLkhvbWUtZGVzY3ItMTF2dWcge1xcbiAgY29sb3I6IHJnYig4NSwgODUsIDg1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG59XFxuXFxuLkhvbWUtdGFic0hlYWRlci0xSmRyOSB7XFxuICAtbXMtZmxleC1wb3NpdGl2ZTogMDtcXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAtbXMtZmxleC1uZWdhdGl2ZTogMDtcXG4gICAgICBmbGV4LXNocmluazogMDtcXG4gIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiBjYWxjKDgzLjI1JSAtIDVweCk7XFxuICAgICAgZmxleC1iYXNpczogY2FsYyg4My4yNSUgLSA1cHgpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDgzLjI1JSAtIDVweCk7XFxuICB3aWR0aDogY2FsYyg4My4yNSUgLSA1cHgpO1xcbiAgbWFyZ2luLWxlZnQ6IGNhbGMoOC4zMjUlICsgMi41cHgpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5Ib21lLXRhYnNIZWFkZXItMUpkcjk6bnRoLWNoaWxkKDFuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLkhvbWUtdGFic0hlYWRlci0xSmRyOTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLkhvbWUtdGFic0hlYWRlci0xSmRyOTpudGgtY2hpbGQoMTJuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLkhvbWUtanVtYm90cm9uLTFKRk9QIHtcXG4gIG1hcmdpbi1ib3R0b206IDc3cHg7XFxufVxcblxcbi5Ib21lLWFjY2VudFByb2R1Y3RzLTJRdnN5IHtcXG4gIG1hcmdpbi1ib3R0b206IDEwMHB4O1xcbn1cXG5cXG4uSG9tZS1sb2FkTW9yZS0xUXFhTCB7XFxuICBtYXJnaW4tdG9wOiA3N3B4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2hvbWUvSG9tZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSDs7Ozs7OztHQU9HOztBQUVIO0VBQ0U7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RSxFQUFFLGdDQUFnQyxFQUFFLDJCQUEyQixFQUFFLDZCQUE2QixDQUFDLGlDQUFpQztDQUMvTTs7QUFFRDtFQUNFLHNCQUFzQjtDQUN2Qjs7QUFFRDtFQUNFLG9CQUFvQjtFQUNwQixtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxVQUFVO0VBQ1YsdUJBQXVCO0VBQ3ZCLG1DQUFtQztFQUNuQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix1QkFBdUI7Q0FDeEI7O0FBRUQ7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLGtDQUFrQztDQUNuQzs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOztBQUVEO0VBQ0UscUJBQXFCO01BQ2pCLGFBQWE7RUFDakIscUJBQXFCO01BQ2pCLGVBQWU7RUFDbkIsNENBQTRDO01BQ3hDLCtCQUErQjtFQUNuQyw4QkFBOEI7RUFDOUIsMEJBQTBCO0VBQzFCLDZDQUE2QztDQUM5Qzs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLHFCQUFxQjtDQUN0Qjs7QUFFRDtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7Q0FDcEJcIixcImZpbGVcIjpcIkhvbWUuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG46cm9vdCB7XFxuICAvKlxcbiAgICogVHlwb2dyYXBoeVxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8gIC8qIEV4dHJhIHNtYWxsIHNjcmVlbiAvIHBob25lICovICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi8gIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovIC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4ucm9vdCB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwcHg7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogNTZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIG1hcmdpbjogMDtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyOHB4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMjhweDtcXG59XFxuXFxuLmRldmlkZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDcwcHg7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3LCAxNywgMTcpO1xcbn1cXG5cXG4uZGVzY3Ige1xcbiAgY29sb3I6IHJnYig4NSwgODUsIDg1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG59XFxuXFxuLnRhYnNIZWFkZXIge1xcbiAgLW1zLWZsZXgtcG9zaXRpdmU6IDA7XFxuICAgICAgZmxleC1ncm93OiAwO1xcbiAgLW1zLWZsZXgtbmVnYXRpdmU6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogY2FsYyg4My4yNSUgLSA1cHgpO1xcbiAgICAgIGZsZXgtYmFzaXM6IGNhbGMoODMuMjUlIC0gNXB4KTtcXG4gIG1heC13aWR0aDogY2FsYyg4My4yNSUgLSA1cHgpO1xcbiAgd2lkdGg6IGNhbGMoODMuMjUlIC0gNXB4KTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKDguMzI1JSArIDIuNXB4KSAhaW1wb3J0YW50O1xcbn1cXG5cXG4udGFic0hlYWRlcjpudGgtY2hpbGQoMW4pIHtcXG4gIG1hcmdpbi1yaWdodDogMzBweDtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG5cXG4udGFic0hlYWRlcjpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLnRhYnNIZWFkZXI6bnRoLWNoaWxkKDEybikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi5qdW1ib3Ryb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogNzdweDtcXG59XFxuXFxuLmFjY2VudFByb2R1Y3RzIHtcXG4gIG1hcmdpbi1ib3R0b206IDEwMHB4O1xcbn1cXG5cXG4ubG9hZE1vcmUge1xcbiAgbWFyZ2luLXRvcDogNzdweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJIb21lLXJvb3QtMWF2bDdcIixcblx0XCJoZWFkZXJcIjogXCJIb21lLWhlYWRlci13aXRzY1wiLFxuXHRcInRpdGxlXCI6IFwiSG9tZS10aXRsZS0yUmF2NlwiLFxuXHRcImRldmlkZXJcIjogXCJIb21lLWRldmlkZXItMWFmQlBcIixcblx0XCJkZXNjclwiOiBcIkhvbWUtZGVzY3ItMTF2dWdcIixcblx0XCJ0YWJzSGVhZGVyXCI6IFwiSG9tZS10YWJzSGVhZGVyLTFKZHI5XCIsXG5cdFwianVtYm90cm9uXCI6IFwiSG9tZS1qdW1ib3Ryb24tMUpGT1BcIixcblx0XCJhY2NlbnRQcm9kdWN0c1wiOiBcIkhvbWUtYWNjZW50UHJvZHVjdHMtMlF2c3lcIixcblx0XCJsb2FkTW9yZVwiOiBcIkhvbWUtbG9hZE1vcmUtMVFxYUxcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL3JvdXRlcy9ob21lL0hvbWUuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL3JvdXRlcy9ob21lL0hvbWUuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5Jyk7XG5cbnZhciBfc3RyaW5naWZ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0cmluZ2lmeSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheScpO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2xpY2VkVG9BcnJheTIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIElzb21vcnBoaWMgQ1NTIHN0eWxlIGxvYWRlciBmb3IgV2VicGFja1xuICpcbiAqIENvcHlyaWdodCDCqSAyMDE1LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHByZWZpeCA9ICdzJztcbnZhciBpbnNlcnRlZCA9IHt9O1xuXG4vLyBCYXNlNjQgZW5jb2RpbmcgYW5kIGRlY29kaW5nIC0gVGhlIFwiVW5pY29kZSBQcm9ibGVtXCJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dCYXNlNjQvQmFzZTY0X2VuY29kaW5nX2FuZF9kZWNvZGluZyNUaGVfVW5pY29kZV9Qcm9ibGVtXG5mdW5jdGlvbiBiNjRFbmNvZGVVbmljb2RlKHN0cikge1xuICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9nLCBmdW5jdGlvbiAobWF0Y2gsIHAxKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoJzB4JyArIHAxKTtcbiAgfSkpO1xufVxuXG4vKipcbiAqIFJlbW92ZSBzdHlsZS9saW5rIGVsZW1lbnRzIGZvciBzcGVjaWZpZWQgbm9kZSBJRHNcbiAqIGlmIHRoZXkgYXJlIG5vIGxvbmdlciByZWZlcmVuY2VkIGJ5IFVJIGNvbXBvbmVudHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNzcyhpZHMpIHtcbiAgaWRzLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKC0taW5zZXJ0ZWRbaWRdIDw9IDApIHtcbiAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgaWQpO1xuICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogRXhhbXBsZTpcbiAqICAgLy8gSW5zZXJ0IENTUyBzdHlsZXMgb2JqZWN0IGdlbmVyYXRlZCBieSBgY3NzLWxvYWRlcmAgaW50byBET01cbiAqICAgdmFyIHJlbW92ZUNzcyA9IGluc2VydENzcyhbWzEsICdib2R5IHsgY29sb3I6IHJlZDsgfSddXSk7XG4gKlxuICogICAvLyBSZW1vdmUgaXQgZnJvbSB0aGUgRE9NXG4gKiAgIHJlbW92ZUNzcygpO1xuICovXG5mdW5jdGlvbiBpbnNlcnRDc3Moc3R5bGVzKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWYkcmVwbGFjZSA9IF9yZWYucmVwbGFjZSxcbiAgICAgIHJlcGxhY2UgPSBfcmVmJHJlcGxhY2UgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRyZXBsYWNlLFxuICAgICAgX3JlZiRwcmVwZW5kID0gX3JlZi5wcmVwZW5kLFxuICAgICAgcHJlcGVuZCA9IF9yZWYkcHJlcGVuZCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHByZXBlbmQ7XG5cbiAgdmFyIGlkcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfc3R5bGVzJGkgPSAoMCwgX3NsaWNlZFRvQXJyYXkzLmRlZmF1bHQpKHN0eWxlc1tpXSwgNCksXG4gICAgICAgIG1vZHVsZUlkID0gX3N0eWxlcyRpWzBdLFxuICAgICAgICBjc3MgPSBfc3R5bGVzJGlbMV0sXG4gICAgICAgIG1lZGlhID0gX3N0eWxlcyRpWzJdLFxuICAgICAgICBzb3VyY2VNYXAgPSBfc3R5bGVzJGlbM107XG5cbiAgICB2YXIgaWQgPSBtb2R1bGVJZCArICctJyArIGk7XG5cbiAgICBpZHMucHVzaChpZCk7XG5cbiAgICBpZiAoaW5zZXJ0ZWRbaWRdKSB7XG4gICAgICBpZiAoIXJlcGxhY2UpIHtcbiAgICAgICAgaW5zZXJ0ZWRbaWRdKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluc2VydGVkW2lkXSA9IDE7XG5cbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCArIGlkKTtcbiAgICB2YXIgY3JlYXRlID0gZmFsc2U7XG5cbiAgICBpZiAoIWVsZW0pIHtcbiAgICAgIGNyZWF0ZSA9IHRydWU7XG5cbiAgICAgIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgIGVsZW0uaWQgPSBwcmVmaXggKyBpZDtcblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY3NzVGV4dCA9IGNzcztcbiAgICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBza2lwIElFOSBhbmQgYmVsb3csIHNlZSBodHRwOi8vY2FuaXVzZS5jb20vYXRvYi1idG9hXG4gICAgICBjc3NUZXh0ICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBiNjRFbmNvZGVVbmljb2RlKCgwLCBfc3RyaW5naWZ5Mi5kZWZhdWx0KShzb3VyY2VNYXApKSArICcqLyc7XG4gICAgICBjc3NUZXh0ICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuZmlsZSArICc/JyArIGlkICsgJyovJztcbiAgICB9XG5cbiAgICBpZiAoJ3RleHRDb250ZW50JyBpbiBlbGVtKSB7XG4gICAgICBlbGVtLnRleHRDb250ZW50ID0gY3NzVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgIH1cblxuICAgIGlmIChjcmVhdGUpIHtcbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGVsZW0sIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZW1vdmVDc3MuYmluZChudWxsLCBpZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydENzcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTEhLi4vcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL25vcm1hbGl6ZS5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMSEuLi9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vbm9ybWFsaXplLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0xIS4uL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9ub3JtYWxpemUuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0ge1wibmFtZVwiOlwid2ViXCIsXCJ2ZXJzaW9uXCI6XCIwLjAuMFwiLFwicHJpdmF0ZVwiOnRydWUsXCJlbmdpbmVzXCI6e1wibm9kZVwiOlwiPj02LjVcIixcIm5wbVwiOlwiPj0zLjEwXCJ9LFwiYnJvd3NlcnNsaXN0XCI6W1wiPjElXCIsXCJsYXN0IDQgdmVyc2lvbnNcIixcIkZpcmVmb3ggRVNSXCIsXCJub3QgaWUgPCA5XCJdLFwiZGVwZW5kZW5jaWVzXCI6e1wiQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOlwiXjcuMC4wLWJldGEuNDJcIixcIkBiYWJlbC9wb2x5ZmlsbFwiOlwiNy4wLjAtYmV0YS4zOVwiLFwiQGJhYmVsL3J1bnRpbWVcIjpcIl43LjAuMC1iZXRhLjQyXCIsXCJhbnRkXCI6XCJeMy4zLjBcIixcImJhYmVsLXBsdWdpbi1pbXBvcnRcIjpcIl4xLjYuN1wiLFwiYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1ydW50aW1lXCI6XCJeNi4yMy4wXCIsXCJibHVlYmlyZFwiOlwiXjMuNS4xXCIsXCJib2R5LXBhcnNlclwiOlwiXjEuMTguMlwiLFwiY2xhc3NuYW1lc1wiOlwiXjIuMi41XCIsXCJjb29raWUtcGFyc2VyXCI6XCJeMS40LjNcIixcImNvcmUtanNcIjpcIl4yLjUuM1wiLFwiZXhwcmVzc1wiOlwiXjQuMTYuMlwiLFwiZXhwcmVzcy1ncmFwaHFsXCI6XCJeMC42LjExXCIsXCJleHByZXNzLWp3dFwiOlwiXjUuMy4wXCIsXCJmb3JtaWtcIjpcIl4wLjExLjExXCIsXCJncmFwaHFsXCI6XCJeMC4xMi4zXCIsXCJoaXN0b3J5XCI6XCJeNC43LjJcIixcImlzb21vcnBoaWMtc3R5bGUtbG9hZGVyXCI6XCJeNC4wLjBcIixcImpzb253ZWJ0b2tlblwiOlwiXjguMS4wXCIsXCJsb3N0XCI6XCJeOC4yLjFcIixcIm5vZGUtZmV0Y2hcIjpcIl4yLjAuMFwiLFwibm9ybWFsaXplLmNzc1wiOlwiXjcuMC4wXCIsXCJudWthLWNhcm91c2VsXCI6XCJeNC4wLjBcIixcInBhc3Nwb3J0XCI6XCJeMC40LjBcIixcInBhc3Nwb3J0LWZhY2Vib29rXCI6XCJeMi4xLjFcIixcInByZXR0eS1lcnJvclwiOlwiXjIuMS4xXCIsXCJwcm9wLXR5cGVzXCI6XCJeMTUuNi4wXCIsXCJxdWVyeS1zdHJpbmdcIjpcIl41LjAuMVwiLFwicmMtc2xpZGVyXCI6XCJeOC42LjFcIixcInJlYWN0XCI6XCJeMTYuMi4wXCIsXCJyZWFjdC1kb21cIjpcIl4xNi4yLjBcIixcInJlYWN0LWZvbnRhd2Vzb21lXCI6XCJeMS42LjFcIixcInJlYWN0LXJlZHV4XCI6XCJeNS4wLjZcIixcInJlYWN0LXNlbGVjdFwiOlwiXjEuMi4xXCIsXCJyZWFjdC1zdmctbG9hZGVyXCI6XCJeMi4xLjBcIixcInJlYWN0LXRhYnNcIjpcIl4yLjIuMVwiLFwicmVhY3QtdGV4dC1tYXNrXCI6XCJeNS4yLjFcIixcInJlYWN0LXRyZWViZWFyZFwiOlwiXjIuMS4wXCIsXCJyZWR1eFwiOlwiXjMuNy4yXCIsXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIjpcIl4yLjEzLjJcIixcInJlZHV4LWxvZ2dlclwiOlwiXjMuMC42XCIsXCJyZWR1eC1zYWdhXCI6XCJeMC4xNi4wXCIsXCJyZWR1eC10aHVua1wiOlwiXjIuMi4wXCIsXCJyZXNlbGVjdFwiOlwiXjMuMC4xXCIsXCJzZWFtbGVzcy1pbW11dGFibGVcIjpcIl43LjEuM1wiLFwic2VtYW50aWMtdWktcmVhY3RcIjpcIl4wLjc4LjNcIixcInNlcXVlbGl6ZVwiOlwiXjQuMjguNlwiLFwic2VyaWFsaXplLWphdmFzY3JpcHRcIjpcIl4xLjMuMFwiLFwic291cmNlLW1hcC1zdXBwb3J0XCI6XCJeMC41LjBcIixcInNxbGl0ZTNcIjpcIl4zLjEuMTNcIixcInVuaXZlcnNhbC1yb3V0ZXJcIjpcIl42LjAuMFwiLFwid2hhdHdnLWZldGNoXCI6XCJeMi4wLjNcIixcInl1cFwiOlwiXjAuMjQuMVwifSxcImRldkRlcGVuZGVuY2llc1wiOntcIkBiYWJlbC9jb3JlXCI6XCJeNy4wLjAtYmV0YS40MlwiLFwiQGJhYmVsL25vZGVcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWNvbnN0YW50LWVsZW1lbnRzXCI6XCI3LjAuMC1iZXRhLjM5XCIsXCJAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1pbmxpbmUtZWxlbWVudHNcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wcmVzZXQtZW52XCI6XCI3LjAuMC1iZXRhLjM5XCIsXCJAYmFiZWwvcHJlc2V0LWZsb3dcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wcmVzZXQtcmVhY3RcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wcmVzZXQtc3RhZ2UtMlwiOlwiNy4wLjAtYmV0YS4zOVwiLFwiYXNzZXRzLXdlYnBhY2stcGx1Z2luXCI6XCJeMy41LjFcIixcImF1dG9wcmVmaXhlclwiOlwiXjcuMi4zXCIsXCJiYWJlbC1jb3JlXCI6XCJeNy4wLjAtMFwiLFwiYmFiZWwtZXNsaW50XCI6XCJeOC4xLjJcIixcImJhYmVsLWplc3RcIjpcIl4yMi4wLjRcIixcImJhYmVsLWxvYWRlclwiOlwiOC4wLjAtYmV0YS4wXCIsXCJiYWJlbC1wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LXJlbW92ZS1wcm9wLXR5cGVzXCI6XCJeMC40LjEyXCIsXCJicm93c2VyLXN5bmNcIjpcIl4yLjIxLjBcIixcImNob2tpZGFyXCI6XCJeMi4wLjBcIixcImNzcy1sb2FkZXJcIjpcIl4wLjI4LjdcIixcImVuenltZVwiOlwiXjMuMi4wXCIsXCJlc2xpbnRcIjpcIl40LjE0LjBcIixcImVzbGludC1jb25maWctYWlyYm5iXCI6XCJeMTYuMS4wXCIsXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6XCJeMi45LjBcIixcImVzbGludC1pbXBvcnQtcmVzb2x2ZXItbm9kZVwiOlwiXjAuMy4xXCIsXCJlc2xpbnQtbG9hZGVyXCI6XCJeMS45LjBcIixcImVzbGludC1wbHVnaW4tY3NzLW1vZHVsZXNcIjpcIl4yLjcuNVwiLFwiZXNsaW50LXBsdWdpbi1mbG93dHlwZVwiOlwiXjIuNDAuMVwiLFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjpcIl4yLjguMFwiLFwiZXNsaW50LXBsdWdpbi1qc3gtYTExeVwiOlwiXjYuMC4zXCIsXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6XCJeMi40LjBcIixcImVzbGludC1wbHVnaW4tcmVhY3RcIjpcIl43LjUuMVwiLFwiZmlsZS1sb2FkZXJcIjpcIl4xLjEuNlwiLFwiZmxvdy1iaW5cIjpcIl4wLjY1LjBcIixcImZyb250LW1hdHRlclwiOlwiXjIuMy4wXCIsXCJnbG9iXCI6XCJeNy4xLjJcIixcImh1c2t5XCI6XCJeMC4xNC4zXCIsXCJpZGVudGl0eS1vYmotcHJveHlcIjpcIl4zLjAuMFwiLFwiamVzdFwiOlwiXjIyLjAuNFwiLFwibGludC1zdGFnZWRcIjpcIl42LjAuMFwiLFwibWFya2Rvd24taXRcIjpcIl44LjQuMFwiLFwibWtkaXJwXCI6XCJeMC41LjFcIixcIm51bGwtbG9hZGVyXCI6XCJeMC4xLjFcIixcIm9wbi1jbGlcIjpcIl4zLjEuMFwiLFwicGl4cmVtXCI6XCJeNC4wLjFcIixcInBsZWVlYXNlLWZpbHRlcnNcIjpcIl40LjAuMFwiLFwicG9zdGNzc1wiOlwiXjYuMC4xNFwiLFwicG9zdGNzcy1jYWxjXCI6XCJeNi4wLjFcIixcInBvc3Rjc3MtY29sb3ItZnVuY3Rpb25cIjpcIl40LjAuMVwiLFwicG9zdGNzcy1jdXN0b20tbWVkaWFcIjpcIl42LjAuMFwiLFwicG9zdGNzcy1jdXN0b20tcHJvcGVydGllc1wiOlwiXjYuMi4wXCIsXCJwb3N0Y3NzLWN1c3RvbS1zZWxlY3RvcnNcIjpcIl40LjAuMVwiLFwicG9zdGNzcy1mbGV4YnVncy1maXhlc1wiOlwiXjMuMi4wXCIsXCJwb3N0Y3NzLWltcG9ydFwiOlwiXjExLjAuMFwiLFwicG9zdGNzcy1sb2FkZXJcIjpcIl4yLjAuOVwiLFwicG9zdGNzcy1tZWRpYS1taW5tYXhcIjpcIl4zLjAuMFwiLFwicG9zdGNzcy1uZXN0ZWRcIjpcIl4zLjAuMFwiLFwicG9zdGNzcy1uZXN0aW5nXCI6XCJeNC4yLjFcIixcInBvc3Rjc3MtcHNldWRvZWxlbWVudHNcIjpcIl41LjAuMFwiLFwicG9zdGNzcy1zZWxlY3Rvci1tYXRjaGVzXCI6XCJeMy4wLjFcIixcInBvc3Rjc3Mtc2VsZWN0b3Itbm90XCI6XCJeMy4wLjFcIixcInByZXR0aWVyXCI6XCJeMS45LjJcIixcInJhdy1sb2FkZXJcIjpcIl4wLjUuMVwiLFwicmVhY3QtZGVlcC1mb3JjZS11cGRhdGVcIjpcIl4yLjEuMVwiLFwicmVhY3QtZGV2LXV0aWxzXCI6XCJeNS4wLjBcIixcInJlYWN0LWVycm9yLW92ZXJsYXlcIjpcIl40LjAuMFwiLFwicmVhY3QtdGVzdC1yZW5kZXJlclwiOlwiXjE2LjIuMFwiLFwicmVkdXgtbW9jay1zdG9yZVwiOlwiXjEuNC4wXCIsXCJyaW1yYWZcIjpcIl4yLjYuMlwiLFwic3R5bGVsaW50XCI6XCJeOC40LjBcIixcInN0eWxlbGludC1jb25maWctc3RhbmRhcmRcIjpcIl4xOC4wLjBcIixcInN0eWxlbGludC1vcmRlclwiOlwiXjAuOC4wXCIsXCJzdmctdXJsLWxvYWRlclwiOlwiXjIuMy4xXCIsXCJ1cmwtbG9hZGVyXCI6XCJeMC42LjJcIixcIndlYnBhY2tcIjpcIl4zLjEwLjBcIixcIndlYnBhY2stYnVuZGxlLWFuYWx5emVyXCI6XCJeMi45LjFcIixcIndlYnBhY2stZGV2LW1pZGRsZXdhcmVcIjpcIl4yLjAuM1wiLFwid2VicGFjay1ob3QtbWlkZGxld2FyZVwiOlwiXjIuMjEuMFwiLFwid2VicGFjay1ub2RlLWV4dGVybmFsc1wiOlwiXjEuNi4wXCJ9LFwic2NyaXB0c1wiOntcImxpbnQtanNcIjpcImVzbGludCAtLWlnbm9yZS1wYXRoIC5naXRpZ25vcmUgLS1pZ25vcmUtcGF0dGVybiBcXFwiISoqLy4qXFxcIiAuXCIsXCJsaW50LWNzc1wiOlwic3R5bGVsaW50IFxcXCJzcmMvKiovKi57Y3NzLGxlc3Msc3R5bCxzY3NzLHNhc3Msc3NzfVxcXCJcIixcImxpbnRcIjpcInlhcm4gcnVuIGxpbnQtanMgJiYgeWFybiBydW4gbGludC1jc3NcIixcImZpeC1qc1wiOlwieWFybiBydW4gbGludC1qcyAtLWZpeFwiLFwiZml4LWNzc1wiOlwieWFybiBydW4gbGludC1jc3MgLS1maXhcIixcImZpeFwiOlwieWFybiBydW4gZml4LWpzICYmIHlhcm4gcnVuIGZpeC1jc3NcIixcImNoZWNrXCI6XCJmbG93IGNoZWNrXCIsXCJ0ZXN0XCI6XCJqZXN0XCIsXCJ0ZXN0LXdhdGNoXCI6XCJ5YXJuIHJ1biB0ZXN0IC0td2F0Y2ggLS1ub3RpZnlcIixcInRlc3QtY292ZXJcIjpcInlhcm4gcnVuIHRlc3QgLS1jb3ZlcmFnZVwiLFwiY292ZXJhZ2VcIjpcInlhcm4gcnVuIHRlc3QtY292ZXIgJiYgb3BuIGNvdmVyYWdlL2xjb3YtcmVwb3J0L2luZGV4Lmh0bWxcIixcImNsZWFuXCI6XCJiYWJlbC1ub2RlIHRvb2xzL3J1biBjbGVhblwiLFwiY29weVwiOlwiYmFiZWwtbm9kZSB0b29scy9ydW4gY29weVwiLFwiYnVuZGxlXCI6XCJiYWJlbC1ub2RlIHRvb2xzL3J1biBidW5kbGVcIixcImJ1aWxkXCI6XCJiYWJlbC1ub2RlIHRvb2xzL3J1biBidWlsZFwiLFwiYnVpbGQtc3RhdHNcIjpcInlhcm4gcnVuIGJ1aWxkIC0tcmVsZWFzZSAtLWFuYWx5c2VcIixcImRlcGxveVwiOlwiYmFiZWwtbm9kZSB0b29scy9ydW4gZGVwbG95XCIsXCJyZW5kZXJcIjpcImJhYmVsLW5vZGUgdG9vbHMvcnVuIHJlbmRlclwiLFwic2VydmVcIjpcImJhYmVsLW5vZGUgdG9vbHMvcnVuIHJ1blNlcnZlclwiLFwic3RhcnRcIjpcImJhYmVsLW5vZGUgdG9vbHMvcnVuIHN0YXJ0XCJ9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcGFja2FnZS5qc29uXG4vLyBtb2R1bGUgaWQgPSAuL3BhY2thZ2UuanNvblxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0FjY2VudFByb2R1Y3RzLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BY2NlbnRQcm9kdWN0cy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BY2NlbnRQcm9kdWN0cy5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9BY2NlbnRQcm9kdWN0cy9BY2NlbnRQcm9kdWN0cy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENhcmRMYWJlbCBmcm9tICdjb21wb25lbnRzL0NhcmRMYWJlbCc7XG5pbXBvcnQgcyBmcm9tICcuL0FjY2VudFByb2R1Y3RzLmNzcyc7XG5cbmNsYXNzIEFjY2VudFByb2R1Y3RzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpc3QsIGNsYXNzZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChbcy5yb290LCBjbGFzc2VzLnJvb3RdKX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChbcy5wcm9kdWN0LCBzLnByb2R1Y3RTbWFsbF0pfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5uYW1lfT57bGlzdFswXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5wcmljZX0+XG4gICAgICAgICAgICAgIDxzcGFuPiQ8L3NwYW4+XG4gICAgICAgICAgICAgIHtsaXN0WzBdLnByaWNlfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChbcy5wcm9kdWN0LCBzLnByb2R1Y3RTbWFsbF0pfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5uYW1lfT57bGlzdFsxXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5wcmljZX0+XG4gICAgICAgICAgICAgIDxzcGFuPiQ8L3NwYW4+XG4gICAgICAgICAgICAgIHtsaXN0WzFdLnByaWNlfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MuaXRlbX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KFtzLnByb2R1Y3QsIHMucHJvZHVjdEJpZ10pfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5uYW1lfT57bGlzdFsyXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5wcmljZX0+XG4gICAgICAgICAgICAgIDxzcGFuPiQ8L3NwYW4+IHtsaXN0WzJdLnByaWNlfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MuaXRlbX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KFtzLnByb2R1Y3QsIHMucHJvZHVjdEJpZ10pfT5cbiAgICAgICAgICAgIDxDYXJkTGFiZWxcbiAgICAgICAgICAgICAgdHlwZT1cInRhcGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBIb3RcbiAgICAgICAgICAgIDwvQ2FyZExhYmVsPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLm5hbWV9PntsaXN0WzNdLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLnByaWNlfT5cbiAgICAgICAgICAgICAgPHNwYW4+JDwvc3Bhbj5cbiAgICAgICAgICAgICAge2xpc3RbM10ucHJpY2V9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5pdGVtfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goW3MucHJvZHVjdCwgcy5wcm9kdWN0U21hbGwsIHMucmlnaHRdKX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MubmFtZX0+e2xpc3RbNF0ubmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MucHJpY2V9PlxuICAgICAgICAgICAgICA8c3Bhbj4kPC9zcGFuPlxuICAgICAgICAgICAgICB7bGlzdFs0XS5wcmljZX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goW3MucHJvZHVjdCwgcy5wcm9kdWN0U21hbGwsIHMucmlnaHRdKX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MubmFtZX0+e2xpc3RbNV0ubmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MucHJpY2V9PlxuICAgICAgICAgICAgICA8c3Bhbj4kPC9zcGFuPlxuICAgICAgICAgICAgICB7bGlzdFs1XS5wcmljZX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFjY2VudFByb2R1Y3RzLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICBsaXN0OiBbXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEFjY2VudFByb2R1Y3RzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9BY2NlbnRQcm9kdWN0cy9BY2NlbnRQcm9kdWN0cy5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQWRkVG9DYXJkLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BZGRUb0NhcmQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQWRkVG9DYXJkLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9BZGRUb0NhcmQuY3NzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5cbmNvbnN0IEFkZFRvQ2FyZCA9ICh7IGhhbmRsZUNsaWNrLCB2aXNpYmxlIH0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgcy5yb290LFxuICAgICAge1xuICAgICAgICBbcy52aXNpYmxlXTogdmlzaWJsZSxcbiAgICAgIH0sXG4gICAgXSl9XG4gICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gID5cbiAgICA8Rm9udEF3ZXNvbWUgbmFtZT1cInNob3BwaW5nLWNhcnRcIiBjbGFzc05hbWU9e3MuaWNvbn0gLz5cbiAgICA8c3BhbiBjbGFzc05hbWU9e3MubGFiZWx9PkFkZCB0byBDYXJ0PC9zcGFuPlxuICA8L2Rpdj5cbik7XG5cbkFkZFRvQ2FyZC5kZWZhdWx0UHJvcHMgPSB7XG4gIGhhbmRsZUNsaWNrOiAoKSA9PiB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEFkZFRvQ2FyZCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQWRkVG9DYXJkL0FkZFRvQ2FyZC5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcm92aWRlciBhcyBSZWR1eFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jb25zdCBDb250ZXh0VHlwZSA9IHtcbiAgLy8gRW5hYmxlcyBjcml0aWNhbCBwYXRoIENTUyByZW5kZXJpbmdcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaWFzb2Z0L2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyXG4gIGluc2VydENzczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgLy8gVW5pdmVyc2FsIEhUVFAgY2xpZW50XG4gIGZldGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBwYXRobmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBxdWVyeTogUHJvcFR5cGVzLm9iamVjdCxcbiAgY3VycmVuY3k6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgLy8gSW50ZWdyYXRlIFJlZHV4XG4gIC8vIGh0dHA6Ly9yZWR1eC5qcy5vcmcvZG9jcy9iYXNpY3MvVXNhZ2VXaXRoUmVhY3QuaHRtbFxuICAuLi5SZWR1eFByb3ZpZGVyLmNoaWxkQ29udGV4dFR5cGVzLFxufTtcblxuLyoqXG4gKiBUaGUgdG9wLWxldmVsIFJlYWN0IGNvbXBvbmVudCBzZXR0aW5nIGNvbnRleHQgKGdsb2JhbCkgdmFyaWFibGVzXG4gKiB0aGF0IGNhbiBiZSBhY2Nlc3NlZCBmcm9tIGFsbCB0aGUgY2hpbGQgY29tcG9uZW50cy5cbiAqXG4gKiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2NvbnRleHQuaHRtbFxuICpcbiAqIFVzYWdlIGV4YW1wbGU6XG4gKlxuICogICBjb25zdCBjb250ZXh0ID0ge1xuICogICAgIGhpc3Rvcnk6IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCksXG4gKiAgICAgc3RvcmU6IGNyZWF0ZVN0b3JlKCksXG4gKiAgIH07XG4gKlxuICogICBSZWFjdERPTS5yZW5kZXIoXG4gKiAgICAgPEFwcCBjb250ZXh0PXtjb250ZXh0fT5cbiAqICAgICAgIDxMYXlvdXQ+XG4gKiAgICAgICAgIDxMYW5kaW5nUGFnZSAvPlxuICogICAgICAgPC9MYXlvdXQ+XG4gKiAgICAgPC9BcHA+LFxuICogICAgIGNvbnRhaW5lcixcbiAqICAgKTtcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29udGV4dDogUHJvcFR5cGVzLnNoYXBlKENvbnRleHRUeXBlKS5pc1JlcXVpcmVkLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IENvbnRleHRUeXBlO1xuXG4gIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZXh0O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIE5PVEU6IElmIHlvdSBuZWVkIHRvIGFkZCBvciBtb2RpZnkgaGVhZGVyLCBmb290ZXIgZXRjLiBvZiB0aGUgYXBwLFxuICAgIC8vIHBsZWFzZSBkbyB0aGF0IGluc2lkZSB0aGUgTGF5b3V0IGNvbXBvbmVudC5cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQXBwLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9CYW5uZXIuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0Jhbm5lci5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9CYW5uZXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICdudWthLWNhcm91c2VsJztcbmltcG9ydCBzIGZyb20gJy4vQmFubmVyLmNzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgRm9udEF3ZXNvbWUgZnJvbSAncmVhY3QtZm9udGF3ZXNvbWUnO1xuXG5jb25zdCBCYW5uZXIgPSBwcm9wcyA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgIDxDYXJvdXNlbFxuICAgICAgY2VsbEFsaWduPVwibGVmdFwiXG4gICAgICBjbGFzc05hbWU9e3Muc2xpZGVyfVxuICAgICAgcmVuZGVyQm90dG9tQ2VudGVyQ29udHJvbHM9eyhwcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBib3ggPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb3BzLnNsaWRlQ291bnQ7IGkrKykge1xuICAgICAgICAgIGJveC5wdXNoKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5nb1RvU2xpZGUoaSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgICAgICAgICBzLmRvdHMsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBbcy5hY3RpdmVEb3RdOiBpID09PSBwcm9wcy5jdXJyZW50U2xpZGUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pfSAvPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm94O1xuICAgICAgfX1cbiAgICAgIHJlbmRlckNlbnRlckxlZnRDb250cm9scz17KHtwcmV2aW91c1NsaWRlfSkgPT4gKFxuICAgICAgICA8Rm9udEF3ZXNvbWVcbiAgICAgICAgICBvbkNsaWNrPXtwcmV2aW91c1NsaWRlfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgICAgICAgcy5hcnJvdyxcbiAgICAgICAgICAgIHMuYXJyb3dMZWZ0LFxuICAgICAgICAgIF0pfVxuICAgICAgICAgIHNpemU9XCIyeFwiXG4gICAgICAgICAgbmFtZT1cImxvbmctYXJyb3ctbGVmdFwiXG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgcmVuZGVyQ2VudGVyUmlnaHRDb250cm9scz17KHtuZXh0U2xpZGV9KSA9PiAoXG4gICAgICAgIDxGb250QXdlc29tZVxuICAgICAgICAgIG9uQ2xpY2s9e25leHRTbGlkZX1cbiAgICAgICAgICBjbGFzc05hbWU9e2N4KFtcbiAgICAgICAgICAgIHMuYXJyb3csXG4gICAgICAgICAgICBzLmFycm93UmlnaHQsXG4gICAgICAgICAgXSl9XG4gICAgICAgICAgc2l6ZT1cIjJ4XCJcbiAgICAgICAgICBuYW1lPVwibG9uZy1hcnJvdy1yaWdodFwiXG4gICAgICAgIC8+XG4gICAgICApfVxuICAgID5cbiAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L0Nhcm91c2VsPlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQmFubmVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9CYW5uZXIvQmFubmVyLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Db250ZW50LmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Db250ZW50LmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0NvbnRlbnQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQmFubmVyL2NvbXBvbmVudHMvQ29udGVudC9Db250ZW50LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ2NvbXBvbmVudHMvQnV0dG9uJztcbmltcG9ydCBSYXRpbmcgZnJvbSAnY29tcG9uZW50cy9SYXRpbmcnO1xuaW1wb3J0IHMgZnJvbSAnLi9Db250ZW50LmNzcyc7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ2NvbXBvbmVudHMvQ29udGFpbmVyJztcblxuY29uc3QgQ29udGVudCA9ICh7XG4gIHRpdGxlLFxuICBwcmljZSxcbiAgYnV0dG9uTGFiZWwsXG4gICAgICAgICAgICAgICAgIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDxoMSBjbGFzc05hbWU9e3MudGl0bGV9Pnt0aXRsZX08L2gxPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3MucHJpY2VXcmFwcGVyfT5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmN1cnJlbmN5fT4kPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MucHJpY2V9PntwcmljZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxSYXRpbmcgY2xhc3Nlcz17eyByb290OiBzLnJhdGluZyB9fSAvPlxuICAgICAgPEJ1dHRvbj5cbiAgICAgICAge2J1dHRvbkxhYmVsfVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Db250YWluZXI+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShDb250ZW50KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQuanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0J1dHRvbi5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQnV0dG9uLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0J1dHRvbi5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0J1dHRvbi5jc3MnO1xuXG5jb25zdCBCdXR0b24gPSAoeyBjbGFzc2VzLCBvbkNsaWNrLCBjaGlsZHJlbiwgdGhlbWUsIGZ1bGxXaWR0aCwgaXNMb2FkaW5nLCAuLi5yZXN0IH0pID0+IChcbiAgPGJ1dHRvblxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgY2xhc3NOYW1lPXtjeChbXG4gICAgICBzLnJvb3QsXG4gICAgICAoW3NbdGhlbWVdXTogdHJ1ZSksXG4gICAgICB7XG4gICAgICAgIFtzLmZ1bGxXaWR0aF06IGZ1bGxXaWR0aCxcbiAgICAgIH0sXG4gICAgICBjbGFzc2VzLnJvb3QsXG4gICAgXSl9XG4gICAgey4uLnJlc3R9XG4gID5cbiAgICB7aXNMb2FkaW5nID8gKFxuICAgICAgPEZvbnRBd2Vzb21lXG4gICAgICAgIHB1bHNlXG4gICAgICAgIG5hbWU9XCJzcGlubmVyXCJcbiAgICAgIC8+XG4gICAgKSA6IGNoaWxkcmVuIH1cbiAgPC9idXR0b24+XG4pO1xuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICB0aGVtZTogJycsXG4gIGZ1bGxXaWR0aDogZmFsc2UsXG4gIGlzTG9hZGluZzogZmFsc2UsXG59O1xuXG5CdXR0b24ucHJvcFR5cGVzID0ge1xuICBjbGFzc2VzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJvb3Q6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxufTtcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQnV0dG9uKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0NhcmQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9DYXJkL0NhcmQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIlxuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IEZvbnRBd2Vzb21lIGZyb20gJ3JlYWN0LWZvbnRhd2Vzb21lJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDYXJkTGFiZWwgZnJvbSAnY29tcG9uZW50cy9DYXJkTGFiZWwvQ2FyZExhYmVsJztcbmltcG9ydCBBZGRUb0NhcmQgZnJvbSAnY29tcG9uZW50cy9BZGRUb0NhcmQnO1xuaW1wb3J0IHMgZnJvbSAnLi9DYXJkLmNzcyc7XG5cbmNsYXNzIENhcmQgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgdmlzaWJsZUFkZFRvOiBmYWxzZSxcbiAgfVxuXG4gIHRvZ2dsZVZpc2libGVBZGRUbyA9ICgpID0+IHtcbiAgICBpZih0aGlzLnByb3BzLmxhYmVsVHlwZSAhPT0gJ3N0b2NrJykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZpc2libGVBZGRUbzogIXRoaXMuc3RhdGUudmlzaWJsZUFkZFRvLFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbmFtZSxcbiAgICAgIHByaWNlLFxuICAgICAgYnJhbmQsXG4gICAgICBsYWJlbFR5cGUsXG4gICAgICBsYWJlbFR4dCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17cy5yb290fVxuICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMudG9nZ2xlVmlzaWJsZUFkZFRvfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMudG9nZ2xlVmlzaWJsZUFkZFRvfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5pbm5lcn0+XG4gICAgICAgICAgPEFkZFRvQ2FyZFxuICAgICAgICAgICAgdmlzaWJsZT17dGhpcy5zdGF0ZS52aXNpYmxlQWRkVG99XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT17cy5oZWFkZXJ9PlxuICAgICAgICAgICAgPENhcmRMYWJlbFxuICAgICAgICAgICAgICB0eXBlPXtsYWJlbFR5cGV9PlxuICAgICAgICAgICAgICB7bGFiZWxUeHR9XG4gICAgICAgICAgICA8L0NhcmRMYWJlbD5cbiAgICAgICAgICAgIDxGb250QXdlc29tZVxuICAgICAgICAgICAgICBuYW1lPVwiaGVhcnRcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3MubGlrZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Zm9vdGVyIGNsYXNzTmFtZT17Y3goW1xuICAgICAgICAgIHMuZm9vdGVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFtzLmRpc2FibGVkXTogbGFiZWxUeXBlID09PSAnc3RvY2snLFxuICAgICAgICAgIH1cbiAgICAgICAgXSl9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmZvb3RlckhlYWRlcn0+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIHtuYW1lfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICB7cHJpY2V9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5icmFuZH0+XG4gICAgICAgICAgICB7YnJhbmR9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbkNhcmQucHJvcFR5cGVzID0ge1xuICBwcmljZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGJyYW5kOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGFiZWxUeHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGFiZWxUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQ2FyZCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkR3JpZC5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZEdyaWQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZEdyaWQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQ2FyZEdyaWQvQ2FyZEdyaWQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0NhcmRHcmlkL0NhcmRHcmlkLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vQ2FyZEdyaWQuY3NzJztcbmltcG9ydCBDYXJkIGZyb20gJ2NvbXBvbmVudHMvQ2FyZCc7XG5cbmNvbnN0IENhcmRHcmlkID0gKHsgbGlzdCwgZ3JpZENvdW50IH0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgcy5yb290LFxuICAgICAge1xuICAgICAgICBbc1tncmlkQ291bnRdXTogdHJ1ZSxcbiAgICAgIH1cbiAgICBdKX1cbiAgPlxuICAgIHtsaXN0Lm1hcChpdGVtID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICA8Q2FyZCB7Li4uaXRlbX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICkpfVxuICA8L2Rpdj5cbik7XG5cbkNhcmRHcmlkLmRlZmF1bHRQcm9wcyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKENhcmRHcmlkKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZExhYmVsLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkTGFiZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZExhYmVsLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgU3RvY2sgZnJvbSAnLi9pY29ucy9zdG9jay5zdmcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9DYXJkTGFiZWwuY3NzJztcblxuY29uc3QgQ2FyZExhYmVsID0gKHtcbiAgdHlwZSxcbiAgdHh0LFxuICBjaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtjeChbXG4gICAgcy5yb290LFxuICAgIHtcbiAgICAgIFtzW3R5cGVdXTogdHJ1ZSxcbiAgICB9XG4gIF0pfT5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuQ2FyZExhYmVsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdHh0OiAnc2FsZScsXG4gIHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3RhcGUnLCAnY2lyY2xlJ10pLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShDYXJkTGFiZWwpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuanMiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmV4cG9ydCBkZWZhdWx0ICgoX3JlZikgPT4ge1xuICBsZXQge1xuICAgIHN0eWxlcyA9IHt9XG4gIH0gPSBfcmVmLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgW1wic3R5bGVzXCJdKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBcInN2Z1wiLFxuICAgIF9leHRlbmRzKHsgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgeG1sbnNYbGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsIHdpZHRoOiBcIjEzMlwiLCBoZWlnaHQ6IFwiMTIwXCIsIHZpZXdCb3g6IFwiMCAwIDEzMiAxMjBcIiB9LCBwcm9wcyksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGVmc1wiLFxuICAgICAgbnVsbCxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgaWQ6IFwiYVwiLCBkOiBcIk03MjAuNSAyNTMyLjljLjUtMS41NSAyLjU4LTIuMjMgNC45LTEuNzcgMi42Ny41MyA3LjAzIDcgMi4yOSA4LjExLTQuMjEtLjc1LTguMzMtMi43OC03LjE4LTYuMzR6bTQ5LjMxIDUuODNjLjAxLTEuMzMgMS44Mi0yLjI0IDQuMjUtMS41MiAyLjg2IDMuNC00LjI2IDQuNDktNC4yNSAxLjUyem0tNDUuMzkgMy44Yy0yLjA3LS43NS0yLjQzLTIuODQtMy41OS00LjMgMS44Ljk2IDIuODQgMi41MyAzLjYgNC4zem0tNjIuMzcgOS4zOGMtNC4yNy0zLjk0IDYuNDktMy44NSAyLjI5IDB6bTExMy45NyAwYy40Ni0uODUgMi40LS45NCAzLjYtLjUgMS45OSAyLjctNC4yMiAzLjU3LTMuNi41em0tNTUuNTIgNC41NmMtMS4yMyAxLjkyLTEuMzQgNC43LTMuMjYgNi4wOC43My0yLjEzIDEuMDctNC41NyAyLjI5LTYuMzMuNTItLjA3LjU2LjI0Ljk3LjI1em0tNDEuNDcgMTljLjIzLS45IDEuNTQtLjM1IDEuOTYgMC0uMzMuNzItMS4zOS0uMDYtMS45NiAwem05My4wNyA1LjMzYy0uMTItMS4zNi44MS0xLjkgMi42MS0xLjc4LS4wNiAxLjIzLTEuMTIgMS42Ny0yLjYxIDEuNzh6bS0xMDUuOCAxLjc3Yy0yLjE0LS4zNy0zLjg3LTEuMDUtNC41Ny0yLjUzIDEuODkuNTYgMy41NyAxLjI4IDQuNTcgMi41M3ptNzguMDQgOS42M2MxLjg2LS45NSA1Ljc2LTEuNTcgOC4xNy0xLjI3LTEuNy43Ni01LjQ0LjY0LTguMTcgMS4yN3ptMTEuNzYgMjUuNmMtMi4zLS4xNi00LjA1LS43NS01LjIzLTEuNzggMS42LjcgNC40Mi40NSA1LjIzIDEuNzd6bS05OC42MiAxLjI2Yy0uNzEtLjM2LTEuNjMtMS40LS45OC0yLjAzIDEuMjItLjAxLjk0IDEuMTMuOTggMi4wM3ptMTAyLjg2IDguNjJjLS41My0xLjY0IDEuMDEtMi45OCAzLjkyLTIuNzkgNSAyLjctMi44IDYuMjItMy45MiAyLjc5em0tOTQuNy0xLjAyYy0uMzQtLjk0LjgyLS43Mi42Ni0xLjUyIDEuMDQtLjI4LjM4IDEuOC0uNjYgMS41MnptODIuNjItMS4wMWMtLjA4LjQ1LS41Ni41OC0xLjMuNXYtLjc1Yy42OC0uMTEuODYuMTcgMS4zLjI1em0tNzEuMTkgOC42MmMuNTctMy4yIDQuMS00LjA4IDUuNTUtNi42LjM5LjA1LjI4LjQ3LjMzLjc3LTIuMDQgMS44OC0zLjMgNC4zNy01Ljg4IDUuODN6bTc2LjQyLTQuMDZ2MS4yN2MtLjc4LjQ2LTEuOS42Ni0yLjk0LjI1LS41OS0yLjA0IDEuNTYtMi4zMiAyLjk0LTEuNTJ6bTIzLjE4IDQuMDZjLjIgMS4wOC0uMjkgMS42My0uOTggMi4wMi0xLjQyLjE4LTEuOC0uNDUtMi4yOC0xLjAxLjA4LTEuNDggMS45OS0xLjggMy4yNi0xLjAxem0tMzcuODggMi4wMmMuMS41OS0uMDUuOTgtLjMzIDEuMjctMS4wMi4xMi0xLjQ1LS4yMi0xLjMtMS4wMS43OS4xLjctLjQ3IDEuNjMtLjI2em0tNDAuMTYgMS4wMmMuNTgtLjA0LjY4LjMgMS4zLjI1LTEuNTUgNC43LTIuMSAxMC4xOS01LjU1IDEzLjQzLjQ2LTEuMTYuMzQtMi42Ljk4LTQuMDYuMy0uNyAxLjMyLTEuMjcgMS42My0yLjAyIDEuMDItMi40NC0uNDItNi4xMyAxLjY0LTcuNnptLTkuMTUgMS41MmMxLjY1IDEuNzYgMi42NCA0LjAzIDQuNTcgNS41Ny0xLjUgMS4zNy00IDEuOTYtNC41NyA0LjA2LTIuNjkuODMtNC41NS42LTcuODQuMjUtMS4xNy0uOTUtMi4yNC0xLjk3LTMuNTktMi43OS0xLjkzLTUuOTYgNC44NS05LjI0IDExLjQzLTcuMXptMzIuOTggNC4wNWMuMzQgMS4zNi0uNDQgMS44NS0xLjMgMi4yOC0uOTYuMDctMS0uNTctMS45Ni0uNS0xLjQ3LTEuNzIgMS43Mi0zLjE4IDMuMjYtMS43OHptLTI3LjEgMGMxLjUuMDQtLjIxIDEuMTQgMCAxLjc3LS45Ny0uMzYuNDMtLjk4IDAtMS43N3ptLTI4LjQxLTYwLjNjMS44My42IDMuMjggMS41IDQuOSAyLjI3LS4yMi4xMi00LjEtMS4xNy00LjktMi4yOHptLTEwLjc4IDI1LjMzYy4yNS0uOTUtMS4yNC0uNTUtMS4zLTEuMjcuMDQtLjguNzQtMS4xMSAxLjk2LTEgLjI5LjUzIDEgLjc0Ljk4IDEuNTEtMS45Mi4xLS44MS4yMi0xLjY0Ljc2em04Ni44NyA2LjA4Yy0yLjY5LS4wMi00LTEuMTEtNi4yLTEuNTItLjI5LjQ2LS43My44LTEuMzEgMS4wMi0yLjgxLS41LTIuOC0yLjQ2LTYuNTMtMS43OC02LjEgMS4xMi41NCA3LjguOTcgMTEuNC43OC41IDIuMjguNDQgMi45NSAxLjAyLS43NCAzLjkgMi41MiA2LjA5IDMuMjYgMTAuMTQtMi42NC0uODMtMy43Mi0yLjg2LTQuNTctNS4wNy0zLjItMi42LTUuNi01LjgtMTAuMTMtNy4zNS0xLjMtMS41Mi0yLjIzLTMuMzQtNS4yMi0zLjU1LTEuMjYuNjgtLjc5IDEuMi0uOTggMi43OS0xLjkzLS4yNy0yLjQzIDEuOTUtMy4yNiAzLjMtMS45NC4wOS0zLjMyLjE4LTQuOSAxLS40OCAxLjU4IDAgMy44OS0xLjk2IDQuMzItMi44Ny4xLTIuNzctMi4wOC0yLjYyLTQuMzEtMi43NCAxLjI1LS42NCA2LjI1LTIuOTMgNy44NS4zLTMuMzMuNDUtNi42NS45Ny05Ljg4LTEuMi0yLjAzLTMuMzQtMy4zMi00LjktNS4wNy0zIC45Ni0yLjY4IDQuNS01Ljg3IDUuMzItLjExLTIuNDggMy44My0zLjA3IDIuOTQtNS4zMi0zLjMuOTItMy41NCA1LjUxLTYuNTMgNS44My4yLTEuMjcgMS4yNi0xLjkgMS45Ni0yLjc5LTMuMjItLjA4LTQuMTkgMi44Mi02LjIgNC44Mi0yLjU3IDIuNTMtNi4xNCA0LjUtOC4xNyA2Ljg0LTEuOTEuMzYtMy41OS4yLTUuMjMtLjI2LTEuMzYtNC45IDQuNDItNy42MyA4LjgyLTEwLjM4IDMuMDUtMS45MSA2LjMyLTQuMjIgNi44Ni03LjM1LTEuMTctLjc3LTIuMSAxLjUzLTMuMjcuNzYuOS0xLjg0IDMuOTYtMS43MSAzLjYtMy44LS40OC0yLjc1LTQuNjYtMS42My03LjE5LTEuMDItNC4zOCAxLjA2LTkuNTMgMi41LTEyLjQgMi43OS4yNy0uOTcgMS45NS0uODUgMi45My0xLjI3LTEuMzQtLjc4LTQuOTgtLjk3LTQuMjUtMi41MyAxLjEyLjk3LjItLjI2IDIuMjktLjI1LjczLS4wNC0uNDItLjY0IDAtMS4yNy43Ni4wOCAxLjM1LjMgMS45Ni41LS43MS0xLjU3LTIuNzYtLjktNC41Ny0xLjI2LTIuOTggMi4zMi0xMC40NiA0LjUtMTUuMzUgNS4zMiAyLjA0LTEuNTQgNS40NS0yLjAyIDguMTYtMy4wNC43Ny0xLjYgNC4yLTMuMSA1LjU2LTUuMDctLjU2LTEuMDUtMi41OC4wMS0zLjI3LS41IDMuNzktMS42MyA1LjU1LTQuODIgOS40Ny02LjM0LS45LTEuMi0uOS0xLjUzLS45OC0zLjMuMzktLjI5IDEuMTUtLjI4IDEuOTYtLjI1LTQuMDgtMi41Ny0xNC4yMS0uNDYtMTYtNC44MS4zOC0uMDQuMjctLjQ3LjMyLS43NiAyLjI1LS4zMSAyLjUxLTEuODYgNC41OC0xLjI3LjIzLjY5LTEuNTQtLjE4LTEuMy41IDYuMTggMi40OSAxNy40OSA0LjYxIDI0LjE2IDEuMDItMS45Ni0xLjg2LTYuMTItMi4wMS03Ljg0LTQuMDUgMi4yIDEuMTYgNS4xIDEuNzcgNy41IDIuNzguOTEtMS40Ny0uMDItMy42OSAwLTUuMzItNS42Ny00Ljk2LTE1LjA5LTcuMDQtMTguNi0xMy42OCA1LjcuMDUgOC4xNCA0LjgyIDEzLjcxIDUuODMuMTIgMi4yMiAxLjE0IDIuODUgMy45MiA0LjA1IDMuMzYgMS40NSA5LjE3IDQgMTEuNDMuMjUgMi03LjE1LTMuMDctMTIuNzMtNi44Ni0xOS41LTEuNDUtMi42MS0zLjYxLTguNDItNS4yMi0xMS45Mi0uNy0xLjUtMS41LTQuNDQgMi42LTQuMDUgNS4xLjQ4IDMuOTggMTAuNDcgNy4yIDEyLjE2IDIuMjcgOS4wNSA4LjA4IDE1LjM1IDE1LjAxIDIwLjc4IDMuOTguODkgMi42Ny0yLjYyIDIuOTQtNC41NiAxLjY3LS4zNiAxLjQuNzcgMi4yOSAxLjAxIDIuNy42IDYuOC0zLjQ3IDMuMjctMi4yOC4yNi0xLjY2LTIuNjQtMi45OC0xLjY0LTUuMDcgMi44LjIgMy4wMyAyLjM4IDMuOTIgNC4wNiAyLjUzLS4xNS41LTMuODQgMi42MS00LjMxLS4yMyAxLjM5LS42NSAxLjIzLS42NSAyLjUzIDIuNTctMS4wMiAyLjI1LTYuOTcgNi44Ni00LjA1Ljk1IDMuODctLjY3IDcuMDMgMS4zIDEwLjY0IDEuMTUtLjEyLjgtMS40MSAxLjY0LTEuNzcgMi44Ni4yNS41NiAyLjYuOTggNC4wNS0uNzYuMzQtMS44Ni40Mi0yLjYyLjc2LTEuMiAyLjE3LjYgMi45NiAxLjMxIDQuMzEuNS45NS0uNiAyLjYzIDEuMyAyLjc5LjUgMC0xLjI4LTEuODQuMzMtMi4wMyAxLjEzLS4wOCAxLjIgMS4zMy42NiAxLjc4IDQtMS4yIDUuNi00LjI3IDkuNDctNS41OCA0LjQyLjM1IDcuMTYtNC42IDEwLjQ1LTEuMjctLjEgMi4yNC0yLjQzIDMuMy00LjU4IDQuMzEtNC4zNCAyLjAzLTYuODQgNS44OC0xMS43NSA3Ljg2LS41NiA0IDMuODcgMy43IDcuODMgMy4wNC0uMjIgMS4xOC0yLjc1LjU2LTMuMjYgMS41Mi40IDEuMiAxIC44OCAyLjI5LjUuNi40OS0uMi40NiAwIDEuMjcgMi4yOC4xNyAzLjEtLjggNS41NS0uNS4xOC4zNi41LjYxLjk4Ljc2LTMuOCA1LjU3IDcuMDYgNC44IDYuMiA4LjM2LS43IDIuOS05LjY2LjM4LTkuNDcgNC41Ni0xLjQyLjE2LTMuMS4xMy0zLjkyLjc2LjI1LjY1LjggMS4wNyAxLjYzIDEuMjctMS4wOS45MS0xLjQxLS45Mi0yLjYtLjc2LTIuMjIgMS40MiAxLjY5IDEuOSAyLjkzIDIuMjguOC0uMDMuMDctLjg0LS4zMy0uNzYgMS40LS40OSAyLjkgMS4xMiAzLjYgMi4wMnptLTY2Ljk1LTQuODFjLTEuODItLjU4LTQuNTIgMS4zNy02LjUzIDAtMS4yNS45Ny0xLjMxIDIuMjctLjY1IDMuMDQgMi4yOC0xLjEgNi4yLS45MyA3LjE4LTMuMDR6bS0yLjYtMy4zYy0xLjE3LS4wNS0xLjk3LjE4LTIuMy43NiAxLjMuMTYgMS43LS4zNyAyLjMtLjc2em00Ljg5LTMuMjljLTIuMDgtMS44OS01Ljk1LjMzLTcuNTEgMS4yNy4yNC41Ny4yOSAxLjMuNjUgMS43NyAyLjAyLS40NiA0Ljc0LS4zNyA1Ljg4LTEuNTItLjU3LS4xNC0xLjkyLjMtMS45Ni0uMjUgMS40LS4xIDIuMzctLjUzIDIuOTQtMS4yN3ptMS42My0zLjA0Yy0uNi0uNTUtMS43NS0uNjctMi4yOC0xLjI3LjEyLTMuNTgtNi41NS00LjUtNi4yLS4yNSAyLjEzLjI4IDMuMSAxLjQ4IDQuMjQgMi41My42NC0uOTMgMy44NC4xMSA0LjI0LTEuMDF6bS04LjE2IDIxLjU0aC0uMDIuMDJ6bS0uMDIgMGMtLjIyLjE0LTMuMTggMy4wNS00Ljg4IDIuNTMgMS4yLTEuMTggMi45Ni0xLjkxIDQuODgtMi41M3ptMTMuNzMgNC4zYy0uNjguNjYtLjc5IDEuNzYtMS45NiAyLjAzLjY5LS42NS44LTEuNzUgMS45Ni0yLjAyelwiIH0pXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJnXCIsXG4gICAgICB7IGNsaXBQYXRoOiBcInVybCgjY2xpcC00ODAxKVwiLCB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKC02NDggLTI1MzEpXCIgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1c2VcIiwgeyBmaWxsOiBcIiMxMTFcIiwgeGxpbmtIcmVmOiBcIiNhXCIgfSlcbiAgICApXG4gICk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQ2FyZExhYmVsL2ljb25zL3N0b2NrLnN2ZyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ29udGFpbmVyLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Db250YWluZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ29udGFpbmVyLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vQ29udGFpbmVyLmNzcyc7XG5cbmNvbnN0IENvbnRhaW5lciA9IHByb3BzID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e2N4KFxuICAgIFtcbiAgICAgIHMucm9vdCxcbiAgICAgIHByb3BzLmNsYXNzTmFtZSxcbiAgICBdXG4gICl9PlxuICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKENvbnRhaW5lcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyL0NvbnRhaW5lci5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vRm9vdGVyLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Gb290ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vRm9vdGVyLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBTZXJ2aWNlRmVhdHVyZXMgZnJvbSAnY29tcG9uZW50cy9TZXJ2aWNlRmVhdHVyZXMnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdjb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgTG9nbyBmcm9tICdjb21wb25lbnRzL0xvZ28nO1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnY29tcG9uZW50cy9OYXZpZ2F0aW9uJztcbmltcG9ydCBTb2NpYWxzTGlzdCBmcm9tICdjb21wb25lbnRzL1NvY2lhbHNMaXN0JztcbmltcG9ydCBzIGZyb20gJy4vRm9vdGVyLmNzcyc7XG5cbmNsYXNzIEZvb3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgPFNlcnZpY2VGZWF0dXJlcyBjbGFzc2VzPXt7IHJvb3Q6IHMuc2VydmljZXMgfX0gLz5cbiAgICAgICAgICA8TG9nbyB0aGVtZT1cIndoaXRlXCIgY2xhc3Nlcz17eyByb290OiBzLmxvZ28gfX0gLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9e3MuZGVzY3J9PlxuICAgICAgICAgICAgQSBjb2xsZWN0aW9uIG9mIHRleHRpbGUgc2FtcGxlcyBsYXkgc3ByZWFkIG91dCBvbiB0aGUgdGFibGUgLSBTYW1zYSB3YXMgYSB0cmF2ZWxsaW5nIHNhbGVzbWFuIC0gYW5kIGFib3ZlIGl0XG4gICAgICAgICAgICB0aGVyZSBodW5nIGEgcGljdHVyZSB0aGF0IGhlIGhhZCByZWNlbnRseSBjdXQgb3V0IG9mIGFuIGlsbHVzdHJhdGVkIG1hZ2F6aW5lIGFuZCBob3VzZWQgaW4gYSBuaWNlLCBnaWxkZWRcbiAgICAgICAgICAgIGZyYW1lLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8U29jaWFsc0xpc3RcbiAgICAgICAgICAgIHR5cGU9XCJjaXJjbGVcIlxuICAgICAgICAgICAgY2VudGVyXG4gICAgICAgICAgICBjbGFzc2VzPXt7cm9vdDogcy5zb2NpYWxzfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxOYXZpZ2F0aW9uIHRoZW1lPVwid2hpdGVcIiBjbGFzc2VzPXt7IHJvb3Q6IHMubmF2aWdhdGlvbiB9fSAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17cy50ZXJtc30+XG4gICAgICAgICAgICDCqSAyMDE3IFNoaXBwb24uQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEZvb3Rlcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vR3JvdXAuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0dyb3VwLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0dyb3VwLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9Hcm91cC5jc3MnO1xuXG5jb25zdCBHcm91cCA9ICh7IGNoaWxkcmVuIH0pID0+IDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PntjaGlsZHJlbn08L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoR3JvdXApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0lucHV0LmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9JbnB1dC5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9JbnB1dC5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBNYXNrZWRJbnB1dCBmcm9tICdyZWFjdC10ZXh0LW1hc2snXG5pbXBvcnQgcyBmcm9tICcuL0lucHV0LmNzcyc7XG5cbmNvbnN0IHJlbmRlckVycm9ycyA9IChlcnJvcikgPT4ge1xuICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShlcnJvcik7XG4gIGlmIChpc0FycmF5KSB7XG4gICAgcmV0dXJuIGVycm9yLm1hcChlcnIgPT4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmVycm9yfT57ZXJyfTwvc3Bhbj5cbiAgICApKVxuICB9XG5cbiAgcmV0dXJuICg8c3BhbiBjbGFzc05hbWU9e3MuZXJyb3J9PntlcnJvcn08L3NwYW4+KVxufVxuY29uc3QgSW5wdXQgPSAoeyBsYWJlbCwgdHlwZSwgdmFsdWUsIGhhbmRsZXJzLCBlcnJvciwgbWFzaywgLi4ucmVzdCB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgIDxzcGFuIGNsYXNzTmFtZT17cy5sYWJlbH0+e2xhYmVsfTwvc3Bhbj5cbiAgICB7ZXJyb3IgPyByZW5kZXJFcnJvcnMoZXJyb3IpIDogbnVsbH1cblxuICAgIHttYXNrID8gKFxuICAgICAgPE1hc2tlZElucHV0XG4gICAgICAgIHBsYWNlaG9sZGVyPXtyZXN0LnBsYWNlaG9sZGVyfVxuICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICBtYXNrPXttYXNrfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIGNsYXNzTmFtZT17cy5pbnB1dH1cbiAgICAgICAgey4uLmhhbmRsZXJzfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKSA6IChcbiAgICAgIDxpbnB1dCB0eXBlPXt0eXBlfSB2YWx1ZT17dmFsdWV9IGNsYXNzTmFtZT17cy5pbnB1dH0gey4uLmhhbmRsZXJzfSB7Li4ucmVzdH0gLz5cbiAgICApfVxuICA8L2Rpdj5cbik7XG5cbklucHV0LmRlZmF1bHRQcm9wcyA9IHtcbiAgbGFiZWw6ICcnLFxuICB0eXBlOiAndGV4dCcsXG4gIGVycm9yOiBudWxsLFxuICBtYXNrOiBudWxsLFxuICBoYW5kbGVyczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKElucHV0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnB1dCB9IGZyb20gJy4vSW5wdXQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHcm91cCB9IGZyb20gJy4vR3JvdXAnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0Zvcm0vaW5kZXguanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0hlYWRlci5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vSGVhZGVyLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0hlYWRlci5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0hlYWRlci5jc3MnO1xuaW1wb3J0IFNvY2lhbHNMaXN0IGZyb20gJy4uL1NvY2lhbHNMaXN0JztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vQ29udGFpbmVyJztcbmltcG9ydCBMb2dvIGZyb20gJy4uL0xvZ28nO1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnLi4vTmF2aWdhdGlvbic7XG5pbXBvcnQgVG9vbEJhciBmcm9tICcuLi9Ub29sQmFyJztcblxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cy5yb290fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MudG9wfT5cbiAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgPFNvY2lhbHNMaXN0IC8+XG4gICAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5taWRkbGV9PlxuICAgICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtzLnJvd30+XG4gICAgICAgICAgICA8TG9nbyAvPlxuICAgICAgICAgICAgPE5hdmlnYXRpb24gLz5cbiAgICAgICAgICAgIDxUb29sQmFyIC8+XG4gICAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEhlYWRlcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc2VyaWFsaXplIGZyb20gJ3NlcmlhbGl6ZS1qYXZhc2NyaXB0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZGFuZ2VyICovXG5cbmNsYXNzIEh0bWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzdHlsZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgY3NzVGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICApLFxuICAgIHNjcmlwdHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCksXG4gICAgYXBwOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHN0eWxlczogW10sXG4gICAgc2NyaXB0czogW10sXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBzdHlsZXMsIHNjcmlwdHMsIGFwcCwgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxodG1sIGNsYXNzTmFtZT1cIm5vLWpzXCIgbGFuZz1cImVuXCI+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICAgICAgPG1ldGEgaHR0cEVxdWl2PVwieC11YS1jb21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIiAvPlxuICAgICAgICAgIDx0aXRsZT57dGl0bGV9PC90aXRsZT5cbiAgICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PXtkZXNjcmlwdGlvbn0gLz5cbiAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuICAgICAgICAgIHtzY3JpcHRzLm1hcChzY3JpcHQgPT4gKFxuICAgICAgICAgICAgPGxpbmsga2V5PXtzY3JpcHR9IHJlbD1cInByZWxvYWRcIiBocmVmPXtzY3JpcHR9IGFzPVwic2NyaXB0XCIgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgICA8bGluayByZWw9XCJtYW5pZmVzdFwiIGhyZWY9XCIvc2l0ZS53ZWJtYW5pZmVzdFwiIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIiAvPlxuICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UG9wcGluczozMDAsMzAwaSw0MDAsNDAwaSw1MDAsNTAwaSw2MDBcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU5pY29ubmU6NDAwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwLDMwMGksNDAwLDQwMGksNTAwLDUwMGksNzAwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIGhyZWY9XCIvaWNvbi5wbmdcIiAvPlxuICAgICAgICAgIHtzdHlsZXMubWFwKHN0eWxlID0+IChcbiAgICAgICAgICAgIDxzdHlsZVxuICAgICAgICAgICAgICBrZXk9e3N0eWxlLmlkfVxuICAgICAgICAgICAgICBpZD17c3R5bGUuaWR9XG4gICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3R5bGUuY3NzVGV4dCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICA8ZGl2IGlkPVwiYXBwXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBjaGlsZHJlbiB9fSAvPlxuICAgICAgICAgIDxzY3JpcHRcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYHdpbmRvdy5BcHA9JHtzZXJpYWxpemUoYXBwKX1gIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7c2NyaXB0cy5tYXAoc2NyaXB0ID0+IDxzY3JpcHQga2V5PXtzY3JpcHR9IHNyYz17c2NyaXB0fSAvPil9XG4gICAgICAgICAge2NvbmZpZy5hbmFseXRpY3MuZ29vZ2xlVHJhY2tpbmdJZCAmJiAoXG4gICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICAgICAgX19odG1sOlxuICAgICAgICAgICAgICAgICAgJ3dpbmRvdy5nYT1mdW5jdGlvbigpe2dhLnEucHVzaChhcmd1bWVudHMpfTtnYS5xPVtdO2dhLmw9K25ldyBEYXRlOycgK1xuICAgICAgICAgICAgICAgICAgYGdhKCdjcmVhdGUnLCcke1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuYW5hbHl0aWNzLmdvb2dsZVRyYWNraW5nSWRcbiAgICAgICAgICAgICAgICAgIH0nLCdhdXRvJyk7Z2EoJ3NlbmQnLCdwYWdldmlldycpYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Y29uZmlnLmFuYWx5dGljcy5nb29nbGVUcmFja2luZ0lkICYmIChcbiAgICAgICAgICAgIDxzY3JpcHRcbiAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzXCJcbiAgICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgICAgZGVmZXJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9odG1sPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHRtbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9IdG1sLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9KdW1ib3Ryb24uY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0p1bWJvdHJvbi5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9KdW1ib3Ryb24uY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvSnVtYm90cm9uL0p1bWJvdHJvbi5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvSnVtYm90cm9uL0p1bWJvdHJvbi5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ2NvbXBvbmVudHMvQnV0dG9uJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vSnVtYm90cm9uLmNzcyc7XG5cbmNvbnN0IEp1bWJvdHJvbiA9ICh7IHRpdGxlLCBkZXNjciwgbGluaywgYnRuLCBjbGFzc2VzIH0pID0+IChcbiAgPGFydGljbGUgY2xhc3NOYW1lPXtjeChbXG4gICAgcy5yb290LFxuICAgIGNsYXNzZXMucm9vdCxcbiAgXSl9PlxuICAgIDxkaXYgY2xhc3NOYW1lPXtzLmlubmVyfT5cbiAgICAgIDxoMiBjbGFzc05hbWU9e3MudGl0bGV9Pnt0aXRsZX08L2gyPlxuICAgICAgPHAgY2xhc3NOYW1lPXtzLmRlc2NyfT57ZGVzY3J9PC9wPlxuICAgICAgPGEgey4uLmxpbmt9IGNsYXNzTmFtZT17cy5saW5rfT57bGluay50eHR9PC9hPlxuICAgICAgPEJ1dHRvbiB7Li4uYnRufT57YnRuLmxhYmVsfTwvQnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2FydGljbGU+XG4pO1xuXG5KdW1ib3Ryb24uZGVmYXVsdFByb3BzID0ge1xuICBjbGFzc2VzOiB7IHJvb3Q6ICcnIH0sXG4gIHRpdGxlOiAnRXhwbG9yZSBncmVhdCBhcHBzIGZvciBQcm9kdWN0aXZpdHksIGluY2x1ZGluZyBvZmZpY2UgZm9yIGlQYWQnLFxuICBkZXNjcjpcbiAgICAnU3RhcnQgZWRpdGluZyBhIHBob25lIG9uIHlvdXIgaVBhZCBhbmQgZmluaXNoIGl0IG9uIHlvdXIgTWFjYm9vay5TeW5jIGEgUGxheWxpc3QgZnJvbSB5b3VyIGlQaG9uZSB0byB5b3VyIEFwcGxlIFdhdGNoLicsXG4gIGxpbms6IHtcbiAgICB0eHQ6ICdMZWFybiBNb3JlIGFib3V0IGlQYWQgTWluaScsXG4gIH0sXG4gIGJ0bjoge1xuICAgIGxhYmVsOiAnQnV5IE5vdycsXG4gICAgb25DbGljazogKCkgPT4ge30sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEp1bWJvdHJvbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvSnVtYm90cm9uL0p1bWJvdHJvbi5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTGF5b3V0LmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9MYXlvdXQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTGF5b3V0LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgRm9vdGVyIGZyb20gJ2NvbXBvbmVudHMvRm9vdGVyJztcbi8vIGV4dGVybmFsLWdsb2JhbCBzdHlsZXMgbXVzdCBiZSBpbXBvcnRlZCBpbiB5b3VyIEpTLlxuaW1wb3J0IG5vcm1hbGl6ZUNzcyBmcm9tICdub3JtYWxpemUuY3NzJztcbmltcG9ydCBzIGZyb20gJy4vTGF5b3V0LmNzcyc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL0hlYWRlcic7XG5cbmNsYXNzIExheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SGVhZGVyIC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8Rm9vdGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMobm9ybWFsaXplQ3NzLCBzKShMYXlvdXQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmZ1bmN0aW9uIGlzTGVmdENsaWNrRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmJ1dHRvbiA9PT0gMDtcbn1cblxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiAhIShldmVudC5tZXRhS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KTtcbn1cblxuY2xhc3MgTGluayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdG86IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uQ2xpY2s6IG51bGwsXG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSBldmVudCA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB8fCAhaXNMZWZ0Q2xpY2tFdmVudChldmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGlzdG9yeS5wdXNoKHRoaXMucHJvcHMudG8pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRvLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxhIGhyZWY9e3RvfSB7Li4ucHJvcHN9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IGNsYXNzTmFtZT17Y3goW1xuICAgICAgICBwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIHtcbiAgICAgICAgICAvLyBbcHJvcHMuYWN0aXZlQ2xhc3NOYW1lXTogdG8gPT09IHRoaXMuY29udGV4dC5wYXRobmFtZSB8fCB0byA9PT0gaGlzdG9yeS5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgfVxuICAgICAgXSl9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2E+XG4gICAgKTtcbiAgfVxufVxuXG5MaW5rLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWN0aXZlQ2xhc3NOYW1lOiAnJyxcbn1cblxuTGluay5jb250ZXh0VHlwZXMgPSB7XG4gIHBhdGhuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGluaztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9MaW5rL0xpbmsuanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0xvZ28uY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0xvZ28uY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTG9nby5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9Mb2dvL0xvZ28uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0xvZ28vTG9nby5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vTG9nby5jc3MnO1xuXG5jb25zdCBMb2dvID0gKHtcbiAgY2xhc3NlcyxcbiAgdGhlbWUsXG4gICAgICAgICAgICAgIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e2N4KFtcbiAgICBzLnJvb3QsXG4gICAgc1t0aGVtZV0sXG4gICAgY2xhc3Nlcy5yb290LFxuICBdKX0+XG4gICAgU2hpcHBvblxuICA8L2Rpdj5cbik7XG5cblxuTG9nby5kZWZhdWx0UHJvcHMgPSB7XG4gIHRoZW1lOiAnJyxcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShMb2dvKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0xvZ28vTG9nby5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTmF2aWdhdGlvbi5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTmF2aWdhdGlvbi5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9OYXZpZ2F0aW9uLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL05hdmlnYXRpb24uY3NzJztcbmltcG9ydCBMaW5rIGZyb20gJy4uL0xpbmsnO1xuXG5jbGFzcyBOYXZpZ2F0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRoZW1lLCBjbGFzc2VzIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goW1xuICAgICAgICBzLnJvb3QsXG4gICAgICAgIHNbdGhlbWVdLFxuICAgICAgICBjbGFzc2VzLnJvb3QsXG4gICAgICBdKX0gcm9sZT1cIm5hdmlnYXRpb25cIj5cbiAgICAgICAge3RoaXMucHJvcHMubGlzdC5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPXtzLmxpbmt9IHRvPXtpdGVtLnRvfSBhY3RpdmVDbGFzc05hbWU9e3MuYWN0aXZlTGlua30+XG4gICAgICAgICAgICB7aXRlbS50eHR9XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTmF2aWdhdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIHRoZW1lOiAnJyxcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICBsaXN0OiBbXG4gICAgeyB0eHQ6ICdIb21lJywgdG86ICcvJyB9LFxuICAgIHsgdHh0OiAnU2hvcCcsIHRvOiAnL3Nob3AnIH0sXG4gICAgeyB0eHQ6ICdBYm91dCcsIHRvOiAnL2Fib3V0JyB9LFxuICAgIHsgdHh0OiAnQmxvZycsIHRvOiAnL2Jsb2cnIH0sXG4gICAgeyB0eHQ6ICdQZXJzb25hbCcsIHRvOiAnL3BlcnNvbmFsJyB9LFxuICBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoTmF2aWdhdGlvbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9SYXRpbmcuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1JhdGluZy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9SYXRpbmcuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1JhdGluZy5jc3MnO1xuXG5jb25zdCBSYXRpbmcgPSAoeyBsaXN0LCBjbGFzc2VzIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e2N4KFtcbiAgICBzLnJvb3QsXG4gICAgY2xhc3Nlcy5yb290LFxuICBdKX0+XG4gICAge2xpc3QubWFwKGl0ZW0gPT4gKFxuICAgICAgPEZvbnRBd2Vzb21lIGNsYXNzTmFtZT17cy5zdGFyfSBuYW1lPXtpdGVtLm5hbWV9IC8+XG4gICAgKSl9XG4gIDwvZGl2PlxuKTtcblxuUmF0aW5nLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICBsaXN0OiBbXG4gICAgeyBuYW1lOiAnc3RhcicgfSxcbiAgICB7IG5hbWU6ICdzdGFyJyB9LFxuICAgIHsgbmFtZTogJ3N0YXInIH0sXG4gICAgeyBuYW1lOiAnc3RhcicgfSxcbiAgICB7IG5hbWU6ICdzdGFyLWhhbGYtbycgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoUmF0aW5nKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9SYXRpbmcvUmF0aW5nLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9TZXJ2aWNlRmVhdHVyZXMuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1NlcnZpY2VGZWF0dXJlcy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9TZXJ2aWNlRmVhdHVyZXMuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1NlcnZpY2VGZWF0dXJlcy5jc3MnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdjb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgUGxhbiBmcm9tICcuL2ljb25zL3BsYW4uc3ZnJztcblxuY29uc3QgU2VydmljZUZlYXR1cmVzID0gKHsgbGlzdCwgY2xhc3NlcyB9KSA9PiAoXG4gIDxDb250YWluZXI+XG4gICAgPHVsIGNsYXNzTmFtZT17Y3goW1xuICAgICAgcy5yb290LFxuICAgICAgY2xhc3Nlcy5yb290LFxuICAgIF0pfT5cbiAgICAgIHtsaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmljb259PntpdGVtLmljb259PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLnRpdGxlfT57aXRlbS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICA8cD57aXRlbS5kZXNjcn08L3A+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKVxuICAgICAgfSl9XG4gICAgPC91bD5cbiAgPC9Db250YWluZXI+XG4pO1xuXG5TZXJ2aWNlRmVhdHVyZXMuZGVmYXVsdFByb3BzID0ge1xuICBjbGFzc2VzOiB7IHJvb3Q6ICcnIH0sXG4gIGxpc3Q6IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgXSxcbn07XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFNlcnZpY2VGZWF0dXJlcyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5qcyIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZXhwb3J0IGRlZmF1bHQgKChfcmVmKSA9PiB7XG4gIGxldCB7XG4gICAgc3R5bGVzID0ge31cbiAgfSA9IF9yZWYsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbXCJzdHlsZXNcIl0pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwic3ZnXCIsXG4gICAgX2V4dGVuZHMoeyB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB4bWxuc1hsaW5rOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwgd2lkdGg6IFwiNTNcIiwgaGVpZ2h0OiBcIjUzXCIsIHZpZXdCb3g6IFwiMCAwIDUzIDUzXCIgfSwgcHJvcHMpLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRlZnNcIixcbiAgICAgIG51bGwsXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGlkOiBcImFcIiwgZDogXCJNNjM4LjA0IDM3MzkuMTNsLTUuNiAyLjU1Yy0uMzYuMTctLjcuNC0uOTguNjdsLTkuMTQgOS4xNS0zMS40Ny0zLjc3YTEuODcgMS44NyAwIDAgMC0xLjU1LjUzbC0xLjc1IDEuNzVjLS45My45My0uNjQgMi41LjU2IDMuMDRsMjIuNTUgMTAuMS02LjQ3IDYuNDhoLTExLjMxYy0uNSAwLS45OC4yLTEuMzMuNTVsLS45NC45NWMtLjk0Ljk0LS42MyAyLjUzLjU4IDMuMDVsOS41NCA0LjA5IDQuMSA5LjU0YTEuODcgMS44NyAwIDAgMCAzLjA0LjU4bC45NS0uOTVjLjM1LS4zNS41NS0uODMuNTUtMS4zMnYtMTEuMzFsNi40Ny02LjQ4IDEwLjExIDIyLjU2YTEuODcgMS44NyAwIDAgMCAzLjA0LjU2bDEuNzUtMS43NWMuNC0uNDEuNi0uOTguNTMtMS41NWwtMy43OC0zMS40NyA5LjE1LTkuMTVjLjI4LS4yOC41LS42LjY3LS45N2wyLjU2LTUuNmExLjM3IDEuMzcgMCAwIDAtMS44My0xLjgzelwiIH0pXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidXNlXCIsIHsgeGxpbmtIcmVmOiBcIiNhXCIsIG9wYWNpdHk6IFwiLjFcIiwgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgtNTg3IC0zNzM5KVwiIH0pXG4gICk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL2ljb25zL3BsYW4uc3ZnIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Tb2NpYWxzTGlzdC5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vU29jaWFsc0xpc3QuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vU29jaWFsc0xpc3QuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvU29jaWFsc0xpc3QvU29jaWFsc0xpc3QuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL1NvY2lhbHNMaXN0L1NvY2lhbHNMaXN0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL1NvY2lhbHNMaXN0LmNzcyc7XG5cbmNvbnN0IFNvY2lhbHNMaXN0ID0gKHsgbGlzdCwgY2xhc3NlcywgY2VudGVyLCB0eXBlIH0pID0+IChcbiAgPHVsIGNsYXNzTmFtZT17Y3gocy5yb290LCB7IFtzLmNlbnRlcl06IGNlbnRlciB9LCBjbGFzc2VzLnJvb3QpfT5cbiAgICB7bGlzdC5tYXAoaXRlbSA9PiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjeChbXG4gICAgICAgIHMuaXRlbSxcbiAgICAgICAge1xuICAgICAgICAgIFtzW3R5cGVdXTogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgXSl9PlxuICAgICAgICA8YSBocmVmPXtpdGVtLmhyZWZ9IHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgIDxGb250QXdlc29tZSBuYW1lPXtpdGVtLmljb259IGNsYXNzTmFtZT17cy5pY29ufSAvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICkpfVxuICA8L3VsPlxuKTtcblxuU29jaWFsc0xpc3QuZGVmYXVsdFByb3BzID0ge1xuICBjZW50ZXI6IGZhbHNlLFxuICB0eXBlOiAnJyxcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICBsaXN0OiBbeyBpY29uOiAnZmFjZWJvb2stZicgfSwgeyBpY29uOiAndHdpdHRlcicgfV0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFNvY2lhbHNMaXN0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vVGFicy5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vVGFicy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9UYWJzLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL1RhYnMvVGFicy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvVGFicy9UYWJzLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCB7IFRhYiwgVGFicywgVGFiTGlzdCwgVGFiUGFuZWwgfSBmcm9tICdyZWFjdC10YWJzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vVGFicy5jc3MnO1xuXG5jb25zdCBUID0gKHsgdGFicywgcGFuZWxzLCBjbGFzc2VzLCBkZWZhdWx0SW5kZXggfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17Y3goW3Mucm9vdCwgY2xhc3Nlcy5yb290XSl9PlxuICAgIDxUYWJzIGRlZmF1bHRJbmRleD17ZGVmYXVsdEluZGV4IHx8IDB9PlxuICAgICAgPFRhYkxpc3QgY2xhc3NOYW1lPXtjeChbcy5saXN0LCBjbGFzc2VzLmhlYWRlcl0pfT5cbiAgICAgICAge3RhYnMubWFwKGl0ZW0gPT4gPFRhYiBzZWxlY3RlZENsYXNzTmFtZT17cy5zZWxlY3RlZH0gY2xhc3NOYW1lPXtzLnRhYn0+e2l0ZW0udHh0fTwvVGFiPil9XG4gICAgICA8L1RhYkxpc3Q+XG4gICAgICB7cGFuZWxzLm1hcChpdGVtID0+IChcbiAgICAgICAgPFRhYlBhbmVsIGNsYXNzTmFtZT17cy5wYW5lbH0gc2VsZWN0ZWRDbGFzc05hbWU9e3MucGFuZWxBY3RpdmV9PlxuICAgICAgICAgIHtpdGVtLnJlbmRlcigpfVxuICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgKSl9XG4gICAgPC9UYWJzPlxuICA8L2Rpdj5cbik7XG5cblQuZGVmYXVsdFByb3BzID0ge1xuICBkZWZhdWx0SW5kZXg6IDAsXG4gIGNsYXNzZXM6IHtcbiAgICByb290OiAnJyxcbiAgICBoZWFkZXI6ICcnLFxuICB9LFxuICB0YWJzOiBbXG4gICAgeyB0eHQ6ICdOZXcnIH0sXG4gICAgeyB0eHQ6ICdBcnJpdmFscycgfSxcbiAgICB7IHR4dDogJ0FjY2Vzc29yaWVzJyB9LFxuICAgIHsgdHh0OiAnRXNzZW50aWFscycgfSxcbiAgICB7IHR4dDogJ091dGRvb3InIH0sXG4gICAgeyB0eHQ6ICdLaXRjaGVuJyB9LFxuICAgIHsgdHh0OiAnTGlnaHRpbmcnIH0sXG4gICAgXSxcbiAgcGFuZWxzOiBbXG4gICAgeyByZW5kZXI6ICgpID0+IDxzcGFuPnBhbmVsMTwvc3Bhbj4gfSxcbiAgICB7IHJlbmRlcjogKCkgPT4gPHNwYW4+cGFuZWwyPC9zcGFuPiB9LFxuICAgIHsgcmVuZGVyOiAoKSA9PiA8c3Bhbj5wYW5lbDM8L3NwYW4+IH0sXG4gIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1RhYnMvVGFicy5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vVGl0bGUuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1RpdGxlLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1RpdGxlLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1RpdGxlLmNzcyc7XG5cbmNvbnN0IFRpdGxlID0gKHsgdHlwZSwgY2hpbGRyZW4sIGNsYXNzZXMsIGNlbnRlciwgaWQgfSkgPT5cbiAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICB0eXBlLFxuICAgIHtcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lOiBjeChbXG4gICAgICAgIHMudGl0bGUsXG4gICAgICAgIGNsYXNzZXMucm9vdCxcbiAgICAgICAge1xuICAgICAgICAgIFtzLmNlbnRlcl06IGNlbnRlcixcbiAgICAgICAgfSxcbiAgICAgIF0pLFxuICAgIH0sXG4gICAgY2hpbGRyZW4sXG4gICk7XG5cblRpdGxlLnByb3BUeXBlcyA9IHtcbiAgdHlwZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgY2VudGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NlczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByb290OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSxcbn07XG5cblRpdGxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hpbGRyZW46ICcnLFxuICBpZDogJycsXG4gIHR5cGU6ICdoMycsXG4gIGNlbnRlcjogZmFsc2UsXG4gIGNsYXNzZXM6IHsgcm9vdDogJycgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoVGl0bGUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Ub29sQmFyLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Ub29sQmFyLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1Rvb2xCYXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvVG9vbEJhci9Ub29sQmFyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9Ub29sQmFyL1Rvb2xCYXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1Rvb2xCYXIuY3NzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5cbmNvbnN0IFRvb2xCYXIgPSBwcm9wcyA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgIDxGb250QXdlc29tZVxuICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICBjbGFzc05hbWU9e3MuYWN0aW9ufVxuICAgIC8+XG4gICA8c3BhbiBjbGFzc05hbWU9e3MuYmFnfT5cbiAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmNvdW50fT5cbiAgICAgICAyXG4gICAgIDwvc3Bhbj5cbiAgICAgIDxGb250QXdlc29tZVxuICAgICAgICBuYW1lPVwic2hvcHBpbmctYmFnXCJcbiAgICAgICAgY2xhc3NOYW1lPXtzLmFjdGlvbn1cbiAgICAgIC8+XG4gICA8L3NwYW4+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShUb29sQmFyKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1Rvb2xCYXIvVG9vbEJhci5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuQlJPV1NFUikge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ0RvIG5vdCBpbXBvcnQgYGNvbmZpZy5qc2AgZnJvbSBpbnNpZGUgdGhlIGNsaWVudC1zaWRlIGNvZGUuJyxcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIE5vZGUuanMgYXBwXG4gIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCxcblxuICAvLyBodHRwczovL2V4cHJlc3Nqcy5jb20vZW4vZ3VpZGUvYmVoaW5kLXByb3hpZXMuaHRtbFxuICB0cnVzdFByb3h5OiBwcm9jZXNzLmVudi5UUlVTVF9QUk9YWSB8fCAnbG9vcGJhY2snLFxuXG4gIC8vIEFQSSBHYXRld2F5XG4gIGFwaToge1xuICAgIC8vIEFQSSBVUkwgdG8gYmUgdXNlZCBpbiB0aGUgY2xpZW50LXNpZGUgY29kZVxuICAgIGNsaWVudFVybDogcHJvY2Vzcy5lbnYuQVBJX0NMSUVOVF9VUkwgfHwgJycsXG4gICAgLy8gQVBJIFVSTCB0byBiZSB1c2VkIGluIHRoZSBzZXJ2ZXItc2lkZSBjb2RlXG4gICAgc2VydmVyVXJsOlxuICAgICAgcHJvY2Vzcy5lbnYuQVBJX1NFUlZFUl9VUkwgfHxcbiAgICAgIGBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwfWAsXG4gIH0sXG5cbiAgLy8gRGF0YWJhc2VcbiAgZGF0YWJhc2VVcmw6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCAnc3FsaXRlOmRhdGFiYXNlLnNxbGl0ZScsXG5cbiAgLy8gV2ViIGFuYWx5dGljc1xuICBhbmFseXRpY3M6IHtcbiAgICAvLyBodHRwczovL2FuYWx5dGljcy5nb29nbGUuY29tL1xuICAgIGdvb2dsZVRyYWNraW5nSWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9UUkFDS0lOR19JRCwgLy8gVUEtWFhYWFgtWFxuICB9LFxuXG4gIC8vIEF1dGhlbnRpY2F0aW9uXG4gIGF1dGg6IHtcbiAgICBqd3Q6IHsgc2VjcmV0OiBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdSZWFjdCBTdGFydGVyIEtpdCcgfSxcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vXG4gICAgZmFjZWJvb2s6IHtcbiAgICAgIGlkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19BUFBfSUQgfHwgJzE4NjI0NDU1MTc0NTYzMScsXG4gICAgICBzZWNyZXQ6XG4gICAgICAgIHByb2Nlc3MuZW52LkZBQ0VCT09LX0FQUF9TRUNSRVQgfHwgJ2E5NzBhZTMyNDBhYjRiOWI4YWFlMGY5ZjA2NjFjNmZjJyxcbiAgICB9LFxuXG4gICAgLy8gaHR0cHM6Ly9jbG91ZC5nb29nbGUuY29tL2NvbnNvbGUvcHJvamVjdFxuICAgIGdvb2dsZToge1xuICAgICAgaWQ6XG4gICAgICAgIHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHxcbiAgICAgICAgJzI1MTQxMDczMDU1MC1haGNnMG91NW1nZmhsOGhsdWkxdXJydTdqbjVzMTJrbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUIHx8ICdZOHlSOXlaQWhtOWpROEZLQUw4UUlFY2QnLFxuICAgIH0sXG5cbiAgICAvLyBodHRwczovL2FwcHMudHdpdHRlci5jb20vXG4gICAgdHdpdHRlcjoge1xuICAgICAga2V5OiBwcm9jZXNzLmVudi5UV0lUVEVSX0NPTlNVTUVSX0tFWSB8fCAnSWUyMEFadkxKSTJsUUQ1RHNneGdqYXVucycsXG4gICAgICBzZWNyZXQ6XG4gICAgICAgIHByb2Nlc3MuZW52LlRXSVRURVJfQ09OU1VNRVJfU0VDUkVUIHx8XG4gICAgICAgICdLVFo2Y3hvS25FYWtRQ2VTcFpsYVVDSldHQWxURUJKajB5MkVNa1VCdWpBN3pXU3ZhUScsXG4gICAgfSxcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbmZpZy5qcyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IFNFVF9SVU5USU1FX1ZBUklBQkxFID0gJ1NFVF9SVU5USU1FX1ZBUklBQkxFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29uc3RhbnRzL2luZGV4LmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vKiBAZmxvdyAqL1xuXG5cbnR5cGUgRmV0Y2ggPSAodXJsOiBzdHJpbmcsIG9wdGlvbnM6ID9hbnkpID0+IFByb21pc2U8YW55PjtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGFyb3VuZCB0aGUgSFRNTDUgRmV0Y2ggQVBJIHRoYXQgcHJvdmlkZXNcbiAqIGRlZmF1bHQgYXJndW1lbnRzIHRvIGZldGNoKC4uLikgYW5kIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgYW1vdW50XG4gKiBvZiBib2lsZXJwbGF0ZSBjb2RlIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmV0Y2goXG4gIGZldGNoOiBGZXRjaCxcbiAgYmFzZVVybCxcbiAgY29va2llLFxuKSB7XG4gIC8vIE5PVEU6IFR3ZWFrIHRoZSBkZWZhdWx0IG9wdGlvbnMgdG8gc3VpdGUgeW91ciBhcHBsaWNhdGlvbiBuZWVkc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJywgLy8gaGFuZHkgd2l0aCBHcmFwaFFMIGJhY2tlbmRzXG4gICAgbW9kZTogYmFzZVVybCA/ICdjb3JzJyA6ICdzYW1lLW9yaWdpbicsXG4gICAgY3JlZGVudGlhbHM6IGJhc2VVcmwgPyAnaW5jbHVkZScgOiAnc2FtZS1vcmlnaW4nLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC4uLihjb29raWUgPyB7IENvb2tpZTogY29va2llIH0gOiBudWxsKSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBhc3luYyAodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGlzR3JhcGhRTCA9IHVybC5zdGFydHNXaXRoKCcvJyk7XG5cbiAgICByZXR1cm4gaXNHcmFwaFFMIHx8IHVybC5zdGFydHNXaXRoKCcvYXBpJylcbiAgICAgID8gZmV0Y2goYCR7YmFzZVVybH0ke3VybH1gLCB7XG4gICAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0cy5oZWFkZXJzLFxuICAgICAgICAgICAgLi4uKG9wdGlvbnMgJiYgb3B0aW9ucy5oZWFkZXJzKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgOiBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGZXRjaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY3JlYXRlRmV0Y2guanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVCcm93c2VySGlzdG9yeSBmcm9tICdoaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5JztcblxuLy8gTmF2aWdhdGlvbiBtYW5hZ2VyLCBlLmcuIGhpc3RvcnkucHVzaCgnL2hvbWUnKVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21qYWNrc29uL2hpc3RvcnlcbmV4cG9ydCBkZWZhdWx0IHByb2Nlc3MuZW52LkJST1dTRVIgJiYgY3JlYXRlQnJvd3Nlckhpc3RvcnkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvaGlzdG9yeS5qcyIsImltcG9ydCAnaXNvbW9ycGhpYy1mZXRjaCc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNvbnN0IGhhbmRsaW5nID0gcmVzcCA9PiB7XG4gIGlmIChyZXNwLnN0YXR1cyA+PSAyMDAgJiYgcmVzcC5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gcmVzcDtcbiAgfVxuICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgZXJyb3IucmVzcCA9IHJlc3A7XG4gIHRocm93IGVycm9yO1xufTtcblxuY29uc3QgcGFyc2UgPSBqc29uID0+IGpzb24uanNvbigpO1xuXG5jb25zdCBhcGkgPSAoeyB1cmwsIHBhcmFtcyB9KSA9PiB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAuLi5wYXJhbXMsXG4gICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMuYm9keSkgfHwgbnVsbCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAvLyAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdYLVJlcXVlc3RlZC1XaXRoJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAuLi5wYXJhbXMuaGVhZGVycyxcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKGhhbmRsaW5nKVxuICAgIC50aGVuKHBhcnNlKVxufVxuXG5jb25zdCBwYXJhbWV0cmVkID0gbWV0aG9kID0+ICh7IHVybCwgcGFyYW1zIH0pID0+XG4gIGFwaSh7IHVybCwgcGFyYW1zOiB7IC4uLnBhcmFtcywgbWV0aG9kIH0gfSk7XG5cbmV4cG9ydCBjb25zdCBoaWRlUmVwb3J0ZXIgPSAoKSA9PiAoe1xuICB0eXBlOiB0eXBlcy5ISURFX1JFUE9SVEVSLFxuICBwYXlsb2FkOiB7fSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldDogcGFyYW1ldHJlZCgnR0VUJyksXG4gIHBvc3Q6IHBhcmFtZXRyZWQoJ1BPU1QnKSxcbiAgcHV0OiBwYXJhbWV0cmVkKCdQVVQnKSxcbiAgZGVsZXRlOiBwYXJhbWV0cmVkKCdERUxFVEUnKSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL2FjdGlvbnMuanMiLCJleHBvcnQgY29uc3QgTkFNRSA9ICdhcGknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfU1RBUlQgPSAnUkVRVUVTVF9TVEFSVCc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9TVUNDRVNTID0gJ1JFUVVFU1RfU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9GQUlMID0gJ1JFUVVFU1RfRkFJTCc7XG5leHBvcnQgY29uc3QgSElERV9SRVBPUlRFUiA9IGAke05BTUV9X0hJREVfUkVQT1JURVJgO1xuZXhwb3J0IGNvbnN0IFNIT1dfUkVQT1JURVIgPSBgJHtOQU1FfV9TSE9XX1JFUE9SVEVSYDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9BcGkvY29uc3RhbnRzLmpzIiwiaW1wb3J0IGFwaSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHNhZ2EgZnJvbSAnLi9zYWdhcyc7XG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0IHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHsgYXBpLCB0eXBlcywgc2FnYSwgcmVkdWNlciwgc2VsZWN0b3JzIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL2luZGV4LmpzIiwiaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuZXhwb3J0IGNvbnN0IGRzID0gbmV3IE1hcCh7XG4gIGlzRXJyb3I6IGZhbHNlLFxuICBzdGF0dXM6IG51bGwsXG4gIG1lc3NhZ2U6IG51bGwsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL21vZGVsLmpzIiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGRlZmF1bHRTdGF0ZSBmcm9tICcuL21vZGVsJztcblxuY29uc3QgQXBpUmVwb3J0ZXIgPSAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7IHBheWxvYWQsIHR5cGUgfSA9IGFjdGlvbjtcbiAgY29uc29sZS5sb2codHlwZSk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgdHlwZXMuSElERV9SRVBPUlRFUjpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0KCdpc0Vycm9yJywgZmFsc2UpXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIG51bGwpXG4gICAgICAgIC5zZXQoJ21lc3NhZ2UnLCBudWxsKTtcbiAgICBjYXNlIHR5cGVzLlNIT1dfUkVQT1JURVI6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldCgnaXNFcnJvcicsIHRydWUpXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIHBheWxvYWQuc3RhdHVzKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgcGF5bG9hZC5tZXNzYWdlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcGlSZXBvcnRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9BcGkvcmVkdWNlci5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBhcGkgZnJvbSAnLi9hY3Rpb25zJztcbi8vIFRoZSB3YXRjaGVyOiB3YXRjaCBhY3Rpb25zIGFuZCBjb29yZGluYXRlIHdvcmtlciB0YXNrc1xuZnVuY3Rpb24gZ2V0RXJyb3JEYXRhKGRhdGEpe1xuICByZXR1cm4gZGF0YS5qc29uKCkudGhlbihkYXRhID0+IGRhdGEpO1xufVxuZnVuY3Rpb24qIGZldGNoKHsgdXJsLCBwYXJhbXMsIG1ldGhvZCA9ICdnZXQnLCBuYW1lID0gJ05PVEhJTkdfVFlQRScgfSkge1xuICB0cnkge1xuICAgIC8vIHlpZWxkIHB1dCh7IHR5cGU6IGAke25hbWV9XyR7dHlwZXMuUkVRVUVTVF9TVEFSVH1gLCBuYW1lIH0pO1xuICAgIGNvbnN0IHJlc3AgPSB5aWVsZCBjYWxsKGFwaVttZXRob2QudG9Mb3dlckNhc2UoKV0sIHsgdXJsLCBwYXJhbXMgfSk7XG4gICAgeWllbGQgcHV0KHtcbiAgICAgIHR5cGU6IHR5cGVzLlJFUVVFU1RfU1VDQ0VTUyxcbiAgICAgIG5hbWUsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIC4uLnJlc3AsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxldCBkYXRhID0geWllbGQgY2FsbChnZXRFcnJvckRhdGEsIGVycm9yLnJlc3ApO1xuICAgIHlpZWxkIHB1dCh7XG4gICAgICB0eXBlOiB0eXBlcy5SRVFVRVNUX0ZBSUwsXG4gICAgICBuYW1lLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwLnN0YXR1c1RleHQsXG4gICAgICAgIG9rOiBlcnJvci5yZXNwLm9rLFxuICAgICAgICBzdGF0dXM6IGVycm9yLnJlc3Auc3RhdHVzLFxuICAgICAgICBkYXRhLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogd2F0Y2hGZXRjaFJlcXVlc3RzKCkge1xuICB5aWVsZCB0YWtlRXZlcnkodHlwZXMuUkVRVUVTVF9TVEFSVCwgZmV0Y2gpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL0FwaS9zYWdhcy5qcyIsImltcG9ydCB7IE5BTUUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0ZSA9IHN0YXRlID0+IHN0YXRlW05BTUVdO1xuXG5leHBvcnQgY29uc3QgZ2V0TW9kZWwgPSBzdGF0ZSA9PiAoe1xuICBzdGF0dXM6IHN0YXRlW05BTUVdLmdldCgnc3RhdHVzJyksXG4gIG1lc3NhZ2U6IHN0YXRlW05BTUVdLmdldCgnbWVzc2FnZScpLFxuICBzaG93OiBzdGF0ZVtOQU1FXS5nZXQoJ2lzRXJyb3InKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7IGdldE1vZGVsIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL3NlbGVjdG9ycy5qcyIsImV4cG9ydCBjb25zdCBOQU1FID0gJ3VzZXInO1xuZXhwb3J0IGNvbnN0IFJFR0lTVEVSID0gYCR7TkFNRX1fcmVnaXN0ZXJgO1xuZXhwb3J0IGNvbnN0IFJFU0VUX0VSUk9SUyA9IGAke1JFR0lTVEVSfV9yZXNldF9lcnJvcnNgO1xuZXhwb3J0IGNvbnN0IExPR0lOID0gYCR7TkFNRX1fbG9naW5gO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvYWN0aW9uVHlwZXMuanMiLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXIgPSAoeyBlbWFpbCwgcGFzc3dvcmQsIG5hbWUsIHBob25lIH0pID0+ICh7XG4gIHR5cGU6IEFwaS50eXBlcy5SRVFVRVNUX1NUQVJULFxuICBuYW1lOiB0eXBlcy5SRUdJU1RFUixcbiAgdXJsOiAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL3VzZXIvJyxcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhcmFtczoge1xuICAgIGJvZHk6IHtcbiAgICAgIG5hbWUsXG4gICAgICBwaG9uZSxcbiAgICAgIGVtYWlsLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfVxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCByZXNldEVycm9ycyA9ICgpID0+ICh7XG4gIHR5cGU6IHR5cGVzLlJFU0VUX0VSUk9SUyxcbiAgcGF5bG9hZDoge30sXG59KVxuXG5leHBvcnQgY29uc3QgbG9naW4gPSAoeyBlbWFpbCwgcGFzc3dvcmQgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFwaS50eXBlcy5SRVFVRVNUX1NUQVJULFxuICAgIG5hbWU6IHR5cGVzLkxPR0lOLFxuICAgIHVybDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbi8nLFxuICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgIHBhcmFtczoge1xuICAgICAgYm9keToge1xuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvVXNlci9hY3Rpb25zLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BbHJlYWR5Rm9vdGVyLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BbHJlYWR5Rm9vdGVyLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0FscmVhZHlGb290ZXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0FscmVhZHlGb290ZXIvQWxyZWFkeUZvb3Rlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0FscmVhZHlGb290ZXIvQWxyZWFkeUZvb3Rlci5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL0FscmVhZHlGb290ZXIuY3NzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnY29tcG9uZW50cy9CdXR0b24nO1xuXG5jb25zdCBBbHJlYWR5Rm9vdGVyID0gKHsgY2xhc3NlcywgYnV0dG9ucywgZGVzY3IgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17Y3goW1xuICAgIHMucm9vdCxcbiAgICBjbGFzc2VzLnJvb3QsXG4gIF0pfT5cbiAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgaXNMb2FkaW5nPXtidXR0b25zWzBdLmlzTG9hZGluZ31cbiAgICAgICAgICAgIHRoZW1lPVwiYmxhY2tcIlxuICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICB7Li4uYnV0dG9uc1swXX1cbiAgICA+XG4gICAgICB7YnV0dG9uc1swXS50eHR9XG4gICAgPC9CdXR0b24+XG4gICAgPGRpdiBjbGFzc05hbWU9e3MuYWxyZWFkeX0+XG4gICAgICA8c3BhbiAvPlxuICAgICAgPHNwYW4+e2Rlc2NyfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiB0aGVtZT1cImdyYXlcIiBmdWxsV2lkdGggey4uLmJ1dHRvbnNbMV19PlxuICAgICAge2J1dHRvbnNbMV0udHh0fVxuICAgIDwvQnV0dG9uPlxuICA8L2Rpdj5cbik7XG5cbkFscmVhZHlGb290ZXIuZGVmYXVsdFByb3BzID0ge1xuICBjbGFzc2VzOiB7IHJvb3Q6ICcnIH0sXG59XG5cbkFscmVhZHlGb290ZXIucHJvcFR5cGVzID0ge1xuICBidXR0b25zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgZGVzY3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShBbHJlYWR5Rm9vdGVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvQWxyZWFkeUZvb3Rlci9BbHJlYWR5Rm9vdGVyLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Mb2dpbi5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTG9naW4uY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTG9naW4uY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0xvZ2luL0xvZ2luLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvTG9naW4vTG9naW4uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vTG9naW4uY3NzJztcbmltcG9ydCB7IElucHV0LCBHcm91cCB9IGZyb20gJ2NvbXBvbmVudHMvRm9ybSc7XG5pbXBvcnQgVGl0bGUgZnJvbSAnY29tcG9uZW50cy9UaXRsZSc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vLi4vYWN0aW9uVHlwZXMnO1xuaW1wb3J0IEFscmVhZHlGb290ZXIgZnJvbSAnLi4vQWxyZWFkeUZvb3Rlcic7XG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gJ21vZHVsZXMvVmFsaWRhdG9yJztcbmltcG9ydCB7IEZvcm1payB9IGZyb20gJ2Zvcm1payc7XG5cbmNvbnN0IExvZ2luID0gKHsgbG9naW4sIHNlcnZlckVycm9ycywgaXNMb2FkaW5nLCByZXNldCB9KSA9PiAoXG4gIDxGb3JtaWtcbiAgICB2YWxpZGF0aW9uU2NoZW1hPXtWYWxpZGF0b3Iub2JqZWN0KCkuc2hhcGUoe1xuICAgICAgZW1haWw6IFZhbGlkYXRvci5zdHJpbmcoKVxuICAgICAgICAuZW1haWwoJ9Cd0LXQutC+0YDRgNC10LrRgtC90YvQuSBlbWFpbCcpXG4gICAgICAgIC5yZXF1aXJlZCgnRW1haWwg0L7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1JyksXG4gICAgICBwYXNzd29yZDogVmFsaWRhdG9yLnN0cmluZygpXG4gICAgICAgIC5yZXF1aXJlZCgn0J/QsNGA0L7Qu9GMINC+0LHRj9C30LDRgtC10LvRjNC90L7QtSDQv9C+0LvQtScpLFxuICAgIH0pfVxuICAgIGluaXRpYWxWYWx1ZXM9e3tcbiAgICAgIGVtYWlsOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9fVxuICAgIG9uU3VibWl0PXsoXG4gICAgICB2YWx1ZXMsXG4gICAgICB7XG4gICAgICAgIHByb3BzLFxuICAgICAgICBzZXRTdWJtaXR0aW5nLFxuICAgICAgICBzZXRFcnJvcnMgLyogc2V0VmFsdWVzLCBzZXRTdGF0dXMsIGFuZCBvdGhlciBnb29kaWVzICovLFxuICAgICAgfSxcbiAgICApID0+IHtcbiAgICAgIGxvZ2luKHtcbiAgICAgICAgZW1haWw6IHZhbHVlcy5lbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IHZhbHVlcy5wYXNzd29yZCxcbiAgICAgIH0pXG4gICAgfX1cbiAgICByZW5kZXI9eyh7IHZhbHVlcywgZXJyb3JzLCBoYW5kbGVTdWJtaXQsIGhhbmRsZUNoYW5nZSB9KSA9PiB7XG4gICAgICBjb25zdCBlcnJzID0gT2JqZWN0LmFzc2lnbih7fSwgZXJyb3JzLCBzZXJ2ZXJFcnJvcnMpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5yb290fT5cbiAgICAgICAgICA8VGl0bGUgdHlwZT1cImgyXCIgY2VudGVyPlxuICAgICAgICAgICAg0JDQstGC0L7RgNC40LfQsNGG0LjRj1xuICAgICAgICAgIDwvVGl0bGU+XG4gICAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgICA8R3JvdXA+XG4gICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgIGxhYmVsPVwi0JLQsNGIIEVtYWlsKlwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbWFpbFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlcy5lbWFpbH1cbiAgICAgICAgICAgICAgICBlcnJvcj17ZXJycy5lbWFpbH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICBsYWJlbD1cItCS0LDRiCDQn9Cw0YDQvtC70YxcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi0J/QsNGA0L7Qu9GMXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgZXJyb3I9e2VycnMucGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlcy5wYXNzd29yZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgICAgIDxBbHJlYWR5Rm9vdGVyXG4gICAgICAgICAgICAgIGRlc2NyPVwiRG9u4oCZdCBIYXZlIGFjY291bnQgeWV0P1wiXG4gICAgICAgICAgICAgIGNsYXNzZXM9e3tcbiAgICAgICAgICAgICAgICByb290OiBzLmZvb3RlcixcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYnV0dG9ucz17W1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHR4dDogJ0xvZ2luJyxcbiAgICAgICAgICAgICAgICAgIG9uU3VibWl0OiAoKSA9PiBsb2dpbih7IGVtYWlsOiB2YWx1ZXMuZW1haWwsIHBhc3N3b3JkOiB2YWx1ZXMucGFzc3dvcmQgfSksXG4gICAgICAgICAgICAgICAgICBpc0xvYWRpbmcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7IHR4dDogJ1JlZ2lzdGVyIE5vdycsIG9uQ2xpY2s6ICgpID0+IHt9IH1cbiAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9e3MuZmFjZWJvb2t9IGhyZWY9XCIvbG9naW4vZmFjZWJvb2tcIj5cbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cy5pY29ufVxuICAgICAgICAgICAgICAgIHdpZHRoPVwiMzBcIlxuICAgICAgICAgICAgICAgIGhlaWdodD1cIjMwXCJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwIDMwXCJcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjIgMTZsMS01aC01VjdjMC0xLjU0NC43ODQtMiAzLTJoMlYwaC00Yy00LjA3MiAwLTcgMi40MzUtNyA3djRIN3Y1aDV2MTRoNlYxNmg0elwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDxzcGFuPkxvZyBpbiB3aXRoIEZhY2Vib29rPC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9e3MuZ29vZ2xlfVxuICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vMTI3LjAuMC4xOjgwMDAvc29jaWFsL2xvZ2luL2dvb2dsZS1vYXV0aDJcIj5cbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cy5pY29ufVxuICAgICAgICAgICAgICAgIHdpZHRoPVwiMzBcIlxuICAgICAgICAgICAgICAgIGhlaWdodD1cIjMwXCJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwIDMwXCJcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICBkPXtcbiAgICAgICAgICAgICAgICAgICAgJ00zMCAxM2gtNFY5aC0ydjRoLTR2Mmg0djRoMnYtNGg0bS0xNSAycy0yLTEuMTUtMi0yYzAgMC0uNS0xLjgyOCAxLTMgJyArXG4gICAgICAgICAgICAgICAgICAgICcxLjUzNy0xLjIgMy0zLjAzNSAzLTUgMC0yLjMzNi0xLjA0Ni01LTMtNmgzbDIuMzg3LTFIMTBDNS44MzUgMCAyIDMuMzQ1IDIgN2MwICcgK1xuICAgICAgICAgICAgICAgICAgICAnMy43MzUgMi44NSA2LjU2IDcuMDg2IDYuNTYuMjk1IDAgLjU4LS4wMDYuODYtLjAyNS0uMjczLjUyNi0uNDcgMS4xMi0uNDcgMS43MzUgJyArXG4gICAgICAgICAgICAgICAgICAgICcwIDEuMDM3LjgxNyAyLjA0MiAxLjUyMyAyLjczSDljLTUuMTYgMC05IDIuNTkzLTkgNiAwIDMuMzU1IDQuODcgNiAxMC4wMyA2IDUuODgyICcgK1xuICAgICAgICAgICAgICAgICAgICAnMCA5Ljk3LTMgOS45Ny03IDAtMi42OS0yLjU0NS00LjI2NC01LTZ6bS00LTRjLTIuMzk1IDAtNS41ODctMi44NTctNi02QzQuNTg3ICcgK1xuICAgICAgICAgICAgICAgICAgICAnMy44NTYgNi42MDcuOTMgOSAxYzIuMzk0LjA3IDQuNjAzIDIuOTA4IDUuMDE3IDYuMDUyQzE0LjQzIDEwLjE5NSAxMyAxMyAxMSAnICtcbiAgICAgICAgICAgICAgICAgICAgJzEzem0tMSAxNWMtMy41NjYgMC03LTEuMjktNy00IDAtMi42NTggMy40MzQtNS4wMzggNy01IC44MzIuMDEgMiAwIDIgMCAxIDAgJyArXG4gICAgICAgICAgICAgICAgICAgICcyLjg4Ljg4IDQgMiAxIDEgMSAyLjY3NCAxIDMgMCAzLTEuOTg2IDQtNyA0eidcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPHNwYW4+TG9nIGluIHdpdGggR29vZ2xlPC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmZvcm1Hcm91cH0+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cy50d2l0dGVyfVxuICAgICAgICAgICAgICAgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cy5pY29ufVxuICAgICAgICAgICAgICAgIHdpZHRoPVwiMzBcIlxuICAgICAgICAgICAgICAgIGhlaWdodD1cIjMwXCJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMwIDMwXCJcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICBkPXtcbiAgICAgICAgICAgICAgICAgICAgJ00zMCA2LjcwOGMtMS4xMDUuNDktMi43NTYgMS4xNDMtNCAxLjI5MiAxLjI3My0uNzYyIDIuNTQtMi41NiAnICtcbiAgICAgICAgICAgICAgICAgICAgJzMtNC0uOTcuNTc3LTIuMDg3IDEuMzU1LTMuMjI3IDEuNzczTDI1IDVjLTEuMTItMS4xOTctMi4yMy0yLTQtMi0zLjM5OCAwLTYgJyArXG4gICAgICAgICAgICAgICAgICAgICcyLjYwMi02IDYgMCAuNC4wNDcuNy4xMS45NTZMMTUgMTBDOSAxMCA1LjAzNCA4LjcyNCAyIDVjLS41My45MDgtMSAxLjg3Mi0xICcgK1xuICAgICAgICAgICAgICAgICAgICAnMyAwIDIuMTM2IDEuMzQ4IDMuODk0IDMgNS0xLjAxLS4wMzMtMi4xNy0uNTQyLTMtMSAwIDIuOTggNC4xODYgNi40MzIgNyA3LTEgJyArXG4gICAgICAgICAgICAgICAgICAgICcxLTQuNjIzLjA3NC01IDAgLjc4NCAyLjQ0NyAzLjMxIDMuOTUgNiA0LTIuMTA1IDEuNjQ4LTQuNjQ3IDIuNTEtNy41MyAyLjUxLS41ICcgK1xuICAgICAgICAgICAgICAgICAgICAnMC0uOTg4LS4wMy0xLjQ3LS4wODRDMi43MjMgMjcuMTcgNi41MjMgMjggMTAgMjhjMTEuMzIyIDAgMTctOC44NjcgMTctMTcgJyArXG4gICAgICAgICAgICAgICAgICAgICcwLS4yNjguMDA4LS43MzYgMC0xIDEuMi0uODY4IDIuMTcyLTIuMDU4IDMtMy4yOTJ6J1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8c3Bhbj5Mb2cgaW4gd2l0aCBUd2l0dGVyPC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgaXNMb2FkaW5nOiBzdGF0ZVt0eXBlcy5OQU1FXS5sb2dpbi5pc0xvYWRpbmcsXG4gICAgc2VydmVyRXJyb3JzOiB7XG4gICAgICAuLi5zdGF0ZVt0eXBlcy5OQU1FXS5sb2dpbi5lcnJvcnMsXG4gICAgfVxuICB9KSxcbiAgeyBsb2dpbjogYWN0aW9ucy5sb2dpbiwgcmVzZXQ6IGFjdGlvbnMucmVzZXRFcnJvcnMgfVxuKSh3aXRoU3R5bGVzKHMpKExvZ2luKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL0xvZ2luL0xvZ2luLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9SZWdpc3Rlci5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vUmVnaXN0ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vUmVnaXN0ZXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvUmVnaXN0ZXIvUmVnaXN0ZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vUmVnaXN0ZXIuY3NzJztcbmltcG9ydCB7IElucHV0LCBHcm91cCB9IGZyb20gJ2NvbXBvbmVudHMvRm9ybSc7XG5pbXBvcnQgQWxyZWFkeUZvb290ZXIgZnJvbSAnLi4vQWxyZWFkeUZvb3Rlcic7XG5pbXBvcnQgVGl0bGUgZnJvbSAnY29tcG9uZW50cy9UaXRsZSc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vLi4vYWN0aW9uVHlwZXMnO1xuaW1wb3J0IFZhbGlkYXRvciBmcm9tICdtb2R1bGVzL1ZhbGlkYXRvcic7XG5pbXBvcnQgeyBGb3JtaWsgfSBmcm9tICdmb3JtaWsnO1xuXG5jb25zdCBSZWdpc3RlciA9ICh7IHJlZ2lzdGVyLCBzZXJ2ZXJFcnJvcnMsIGlzTG9hZGluZywgcmVzZXQgfSkgPT4gKFxuICA8Rm9ybWlrXG4gICAgdmFsaWRhdGlvblNjaGVtYT17VmFsaWRhdG9yLm9iamVjdCgpLnNoYXBlKHtcbiAgICAgIGVtYWlsOiBWYWxpZGF0b3Iuc3RyaW5nKClcbiAgICAgICAgLmVtYWlsKCfQndC10LrQvtGA0YDQtdC60YLQvdGL0LkgZW1haWwnKVxuICAgICAgICAucmVxdWlyZWQoJ0VtYWlsINC+0LHRj9C30LDRgtC10LvRjNC90L7QtSDQv9C+0LvQtScpLFxuICAgICAgcGhvbmU6IFZhbGlkYXRvci5zdHJpbmcoKVxuICAgICAgICAucmVxdWlyZWQoJ9Ci0LXQu9C10YTQvtC9INC+0LHRj9C30LDRgtC10LvRjNC90L7QtSDQv9C+0LvQtScpXG4gICAgICAgIC5waG9uZSgn0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INC90L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsCcpLFxuICAgICAgcGFzc3dvcmQ6IFZhbGlkYXRvci5zdHJpbmcoKVxuICAgICAgICAucmVxdWlyZWQoJ9Cf0LDRgNC+0LvRjCDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LUnKVxuICAgICAgICAubWluKDgsICfQn9Cw0YDQvtC70Ywg0LTQvtC70LbQtdC9INCx0YvRgtGMINC80LjQvdC40LzRg9C8INC40LcgOCDRgdC40LzQstC+0LvQvtCyJyksXG4gICAgICBuYW1lOiBWYWxpZGF0b3Iuc3RyaW5nKCkucmVxdWlyZWQoJ9CY0LzRjyDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LUnKSxcbiAgICB9KX1cbiAgICBpbml0aWFsVmFsdWVzPXt7XG4gICAgICBlbWFpbDogJycsXG4gICAgICBwaG9uZTogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBuYW1lOiAnJyxcbiAgICB9fVxuICAgIG9uU3VibWl0PXsoXG4gICAgICB2YWx1ZXMsXG4gICAgICB7XG4gICAgICAgIHByb3BzLFxuICAgICAgICBzZXRTdWJtaXR0aW5nLFxuICAgICAgICBzZXRFcnJvcnMgLyogc2V0VmFsdWVzLCBzZXRTdGF0dXMsIGFuZCBvdGhlciBnb29kaWVzICovLFxuICAgICAgfSxcbiAgICApID0+IHtcbiAgICAgIHJlZ2lzdGVyKHtcbiAgICAgICAgbmFtZTogdmFsdWVzLm5hbWUsXG4gICAgICAgIHBob25lOiB2YWx1ZXMucGhvbmUsXG4gICAgICAgIGVtYWlsOiB2YWx1ZXMuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiB2YWx1ZXMucGFzc3dvcmQsXG4gICAgICB9KTtcbiAgICB9fVxuICAgIHJlbmRlcj17KHsgdmFsdWVzLCBlcnJvcnMsIGhhbmRsZVN1Ym1pdCwgaGFuZGxlQ2hhbmdlIH0pID0+IHtcbiAgICAgIGNvbnN0IGVycnMgPSBPYmplY3QuYXNzaWduKHt9LCBzZXJ2ZXJFcnJvcnMsIGVycm9ycyk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgICAgICAgIDxUaXRsZSB0eXBlPVwiaDJcIiBjZW50ZXI+XG4gICAgICAgICAgICDQoNC10LPQuNGB0YLRgNCw0YbQuNGPXG4gICAgICAgICAgPC9UaXRsZT5cbiAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgICAgICAgIDxHcm91cD5cbiAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgbGFiZWw9XCLQktCw0YjQtSDQmNC80Y8qXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCS0LDRiNC1INCY0LzRj1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlcy5uYW1lfVxuICAgICAgICAgICAgICAgIGVycm9yPXtlcnJzLm5hbWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRW1haWwqXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlcy5lbWFpbH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoc2VydmVyRXJyb3JzLmVtYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2UocHJvcHMpXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBlcnJvcj17ZXJycy5lbWFpbH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8R3JvdXA+XG4gICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgIG1hc2s9e1snKycsICc3JywgJygnLC9bMS05XS8sIC9cXGQvLCAvXFxkLywgJyknLCAnICcsIC9cXGQvLCAvXFxkLywgL1xcZC8sICctJywgL1xcZC8sIC9cXGQvLCAvXFxkLywgL1xcZC9dfVxuICAgICAgICAgICAgICAgIGxhYmVsPVwi0KLQtdC70LXRhNC+0L0qXCJcbiAgICAgICAgICAgICAgICBndWlkZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCi0LXQu9C10YTQvtC9XCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGVsXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicGhvbmVcIlxuICAgICAgICAgICAgICAgIGVycm9yPXtlcnJzLnBob25lfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZXMucGhvbmV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHNlcnZlckVycm9ycy5waG9uZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNldCgpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2UocHJvcHMpXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8R3JvdXA+XG4gICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgIGxhYmVsPVwiUGFzc3dvcmQqXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgZXJyb3I9e2VycnMucGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlcy5wYXNzd29yZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgICAgPEFscmVhZHlGb29vdGVyXG4gICAgICAgICAgICBkZXNjcj1cIkFscmVhZHkgaGF2ZSBhbiBhY2NvdW50P1wiXG4gICAgICAgICAgICBidXR0b25zPXtbXG4gICAgICAgICAgICAgIHsgdHh0OiAnUmVnaXN0ZXInIH0sXG4gICAgICAgICAgICAgIHsgdHh0OiAnTG9naW4nIH1cbiAgICAgICAgICAgIF19XG4gICAgICAgICAgIC8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgKVxuICAgIH19XG4gIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGlzTG9hZGluZzogc3RhdGVbdHlwZXMuTkFNRV0ucmVnaXN0ZXIuaXNMb2FkaW5nLFxuICAgIHNlcnZlckVycm9yczoge1xuICAgICAgLi4uc3RhdGVbdHlwZXMuTkFNRV0ucmVnaXN0ZXIuZXJyb3JzLFxuICAgIH0sXG4gIH0pLFxuICB7IHJlZ2lzdGVyOiBhY3Rpb25zLnJlZ2lzdGVyLCByZXNldDogYWN0aW9ucy5yZXNldEVycm9ycyB9LFxuKSh3aXRoU3R5bGVzKHMpKFJlZ2lzdGVyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBSZWdpc3RlckZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvUmVnaXN0ZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMb2dpbkZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0ICogYXMgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgc2FnYSBmcm9tICcuL3NhZ2FzJztcblxuZXhwb3J0IGRlZmF1bHQgeyByZWR1Y2VyLCB0eXBlcywgc2FnYSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvaW5kZXguanMiLCJpbXBvcnQgeyBjcmVhdGVSZWR1Y2VyLCB0YWdnZWRSZWR1Y2VyIH0gZnJvbSAnbW9kdWxlcy91dGlscyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICBpZDogbnVsbCxcbiAgaXNBY3RpdmU6IGZhbHNlLFxuICBlbWFpbDogbnVsbCxcbiAgcmVnaXN0ZXI6IHtcbiAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgIGVycm9yczoge1xuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIHBob25lOiBudWxsLFxuICAgICAgZW1haWw6IG51bGwsXG4gICAgICBwYXNzd29yZDogbnVsbCxcbiAgICB9LFxuICAgIGZpZWxkczoge1xuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIHBob25lOiBudWxsLFxuICAgICAgZW1haWw6IG51bGwsXG4gICAgICBwYXNzd29yZDogbnVsbCxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgY3JlYXRlID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG5cbiAgcmV0dXJuIHN0YXRlXG4gICAgLnNldEluKFsncmVnaXN0ZXInLCAnaXNMb2FkaW5nJ10sIGZhbHNlKVxuICAgIC5zZXRJbihbJ3JlZ2lzdGVyJywgJ2Vycm9ycyddLCB7fSlcbiAgICAuc2V0SW4oWydlbWFpbCddLCBwYXlsb2FkLmVtYWlsKTtcbn07XG5cbmNvbnN0IGZhaWwgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgcmV0dXJuIHN0YXRlXG4gICAgLnNldEluKFsncmVnaXN0ZXInLCAnaXNMb2FkaW5nJ10sIGZhbHNlKVxuICAgIC5zZXRJbihbJ3JlZ2lzdGVyJywgJ2Vycm9ycyddLCBwYXlsb2FkLmRhdGEpO1xufVxuXG5jb25zdCBzdGFydCA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICByZXR1cm4gc3RhdGVcbiAgICAuc2V0SW4oWydyZWdpc3RlcicsICdpc0xvYWRpbmcnXSwgdHJ1ZSlcbiAgICAuc2V0SW4oWydyZWdpc3RlcicsICdlcnJvcnMnXSwge30pO1xufVxuXG5jb25zdCByZXNldCA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIHN0YXRlXG4gICAgLnNldEluKFsncmVnaXN0ZXInLCAnZXJyb3JzJ10sIHt9KVxufVxuXG5jb25zdCBsb2dpblN0YXJ0ID0gc3RhdGUgPT4ge1xuICByZXR1cm4gc3RhdGUuc2V0SW4oWydsb2dpbicsICdpc0xvYWRpbmcnXSwgdHJ1ZSk7XG59XG5cbmNvbnN0IGxvZ2luID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG4gIHJldHVybiBzdGF0ZVxuICAgIC5zZXRJbihbJ2lkJ10sIHBheWxvYWQuaWQpXG4gICAgLnNldEluKFsnZW1haWwnXSwgcGF5bG9hZC5lbWFpbClcbiAgICAuc2V0SW4oWydpc0FjdGl2ZSddLCB0cnVlKVxuICAgIC5zZXRJbihbJ2xvZ2luJywgJ2lzTG9hZGluZyddLCBmYWxzZSk7XG59XG5cbmNvbnN0IGxvZ2luRmFpbCA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICByZXR1cm4gc3RhdGVcbiAgICAuc2V0SW4oWydsb2dpbicsICdlcnJvcnMnXSwgcGF5bG9hZC5kYXRhLmVycm9ycylcbiAgICAuc2V0SW4oWydsb2dpbicsICdpc0xvYWRpbmcnXSwgZmFsc2UpO1xufVxuXG5cbmV4cG9ydCBjb25zdCByZWdpc3RlclJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKGRlZmF1bHRTdGF0ZSwge1xuICBbQXBpLnR5cGVzLlJFUVVFU1RfRkFJTF06IHRhZ2dlZFJlZHVjZXIoZmFpbCwgdHlwZXMuUkVHSVNURVIpLFxuICBbQXBpLnR5cGVzLlJFUVVFU1RfU1VDQ0VTU106IHRhZ2dlZFJlZHVjZXIoY3JlYXRlLCB0eXBlcy5SRUdJU1RFUiksXG4gIFtBcGkudHlwZXMuUkVRVUVTVF9TVEFSVF06IHRhZ2dlZFJlZHVjZXIoc3RhcnQsIHR5cGVzLlJFR0lTVEVSKSxcbiAgW3R5cGVzLlJFU0VUX0VSUk9SU106IHJlc2V0LFxufSk7XG5cbmNvbnN0IGxvZ2luU3RhdGUgPSB7XG4gIGlzTG9hZGluZzogZmFsc2UsXG4gIHN1Y2Nlc3M6IGZhbHNlLFxuICBlcnJvcnM6IHtcbiAgICBlbWFpbDogbnVsbCxcbiAgICBwYXNzd29yZDogbnVsbCxcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbG9naW5SZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihsb2dpblN0YXRlLCB7XG4gIFtBcGkudHlwZXMuUkVRVUVTVF9TVEFSVF06IHRhZ2dlZFJlZHVjZXIobG9naW5TdGFydCwgdHlwZXMuTE9HSU4pLFxuICBbQXBpLnR5cGVzLlJFUVVFU1RfU1VDQ0VTU106IHRhZ2dlZFJlZHVjZXIobG9naW4sIHR5cGVzLkxPR0lOKSxcbiAgW0FwaS50eXBlcy5SRVFVRVNUX0ZBSUxdOiB0YWdnZWRSZWR1Y2VyKGxvZ2luRmFpbCwgdHlwZXMuTE9HSU4pLFxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9Vc2VyL3JlZHVjZXIuanMiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeSc7XG4vLyBUaGUgd2F0Y2hlcjogd2F0Y2ggYWN0aW9ucyBhbmQgY29vcmRpbmF0ZSB3b3JrZXIgdGFza3NcblxuZnVuY3Rpb24qIHdhdGNoUmVnaXN0ZXIoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcGF5bG9hZCwgbmFtZSB9ID0gYWN0aW9uO1xuICBpZiAobmFtZSA9PT0gdHlwZXMuUkVHSVNURVIgfHwgbmFtZSA9PT0gdHlwZXMuTE9HSU4pIHtcbiAgICBoaXN0b3J5LnB1c2goJy9wZXJzb25hbCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKigpIHtcbiAgeWllbGQgdGFrZUV2ZXJ5KEFwaS50eXBlcy5SRVFVRVNUX1NVQ0NFU1MsIHdhdGNoUmVnaXN0ZXIpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvc2FnYXMuanMiLCJpbXBvcnQgWXVwIGZyb20gJ3l1cCc7XG5cbll1cC5hZGRNZXRob2QoWXVwLnN0cmluZywgJ3Bob25lJywgZnVuY3Rpb24gKG1zZyA9ICfQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQtdC70LXRhNC+0L0nKSB7XG4gIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgIG5hbWU6ICdwaG9uZScsXG4gICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgIG1lc3NhZ2U6IG1zZyxcbiAgICB0ZXN0OiAodmFsdWUpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSAvXigoOHxcXCs3KVtcXC0gXT8pPyhcXCg/XFxkezN9XFwpP1tcXC0gXT8pP1tcXGRcXC0gXXs3LDEwfSQvLnRlc3QodmFsdWUpO1xuICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgWXVwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1ZhbGlkYXRvci9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBjcmVhdGVSZWR1Y2VyID0gKGluaXRpYWxTdGF0ZSwgaGFuZGxlcnMpID0+IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBpZiAoaGFuZGxlcnMuaGFzT3duUHJvcGVydHkoYWN0aW9uLnR5cGUpKSB7XG4gICAgcmV0dXJuIGhhbmRsZXJzW2FjdGlvbi50eXBlXShzdGF0ZSwgYWN0aW9uKTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5cbmV4cG9ydCBjb25zdCB0YWdnZWRSZWR1Y2VyID0gKHJlZHVjZXIsIHJOYW1lKSA9PiAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7IG5hbWUgfSA9IGFjdGlvbjtcbiAgY29uc3QgaXNJbml0aWFsaXphdGlvbkNhbGwgPSBzdGF0ZSA9PT0gdW5kZWZpbmVkO1xuICBpZiAobmFtZSAhPT0gck5hbWUgJiYgIWlzSW5pdGlhbGl6YXRpb25DYWxsKSByZXR1cm4gc3RhdGU7XG4gIHJldHVybiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy91dGlscy5qcyIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XG5pbXBvcnQgcnVudGltZSBmcm9tICcuL3J1bnRpbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICB1c2VyLFxuICBydW50aW1lLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JlZHVjZXJzL2luZGV4LmpzIiwiaW1wb3J0IHsgU0VUX1JVTlRJTUVfVkFSSUFCTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW50aW1lKHN0YXRlID0ge30sIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBTRVRfUlVOVElNRV9WQVJJQUJMRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbYWN0aW9uLnBheWxvYWQubmFtZV06IGFjdGlvbi5wYXlsb2FkLnZhbHVlLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JlZHVjZXJzL3J1bnRpbWUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VyKHN0YXRlID0ge30sIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yZWR1Y2Vycy91c2VyLmpzIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFVzZXIgZnJvbSAnbW9kdWxlcy9Vc2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgdXNlcjogY29tYmluZVJlZHVjZXJzKHtcbiAgICBsb2dpbjogVXNlci5yZWR1Y2VyLmxvZ2luUmVkdWNlcixcbiAgICByZWdpc3RlcjogVXNlci5yZWR1Y2VyLnJlZ2lzdGVyUmVkdWNlcixcbiAgfSksXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm9vdFJlZHVjZXIuanMiLCJpbXBvcnQgeyBhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IEFwaSBmcm9tICdtb2R1bGVzL0FwaSc7XG5pbXBvcnQgVXNlciBmcm9tICdtb2R1bGVzL1VzZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogcm9vdFNhZ2EoKSB7XG4gIHlpZWxkIGFsbChbXG4gICAgQXBpLnNhZ2EoKSxcbiAgICBVc2VyLnNhZ2EoKSxcbiAgXSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm9vdFNhZ2FzLmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgVW5pdmVyc2FsUm91dGVyIGZyb20gJ3VuaXZlcnNhbC1yb3V0ZXInO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBVbml2ZXJzYWxSb3V0ZXIocm91dGVzLCB7XG4gIHJlc29sdmVSb3V0ZShjb250ZXh0LCBwYXJhbXMpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQucm91dGUubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGNvbnRleHQucm91dGVcbiAgICAgICAgLmxvYWQoKVxuICAgICAgICAudGhlbihhY3Rpb24gPT4gYWN0aW9uLmRlZmF1bHQoY29udGV4dCwgcGFyYW1zKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29udGV4dC5yb3V0ZS5hY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LnJvdXRlLmFjdGlvbihjb250ZXh0LCBwYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9LFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlci5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vRXJyb3JQYWdlLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9FcnJvclBhZ2UuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vRXJyb3JQYWdlLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBzIGZyb20gJy4vRXJyb3JQYWdlLmNzcyc7XG5cbmNsYXNzIEVycm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZXJyb3I6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBzdGFjazogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZXJyb3I6IG51bGwsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmIChfX0RFVl9fICYmIHRoaXMucHJvcHMuZXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPnt0aGlzLnByb3BzLmVycm9yLm5hbWV9PC9oMT5cbiAgICAgICAgICA8cHJlPnt0aGlzLnByb3BzLmVycm9yLnN0YWNrfTwvcHJlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5FcnJvcjwvaDE+XG4gICAgICAgIDxwPlNvcnJ5LCBhIGNyaXRpY2FsIGVycm9yIG9jY3VycmVkIG9uIHRoaXMgcGFnZS48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7IEVycm9yUGFnZSBhcyBFcnJvclBhZ2VXaXRob3V0U3R5bGUgfTtcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoRXJyb3JQYWdlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAnLi9FcnJvclBhZ2UnO1xuXG5mdW5jdGlvbiBhY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6ICdEZW1vIEVycm9yJyxcbiAgICBjb21wb25lbnQ6IDxFcnJvclBhZ2UgLz4sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFjdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL2Vycm9yL2luZGV4LmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Ib21lLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Ib21lLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0hvbWUuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JvdXRlcy9ob21lL0hvbWUuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IEJhbm5lciBmcm9tICdjb21wb25lbnRzL0Jhbm5lcic7XG5pbXBvcnQgQ29udGVudCBmcm9tICdjb21wb25lbnRzL0Jhbm5lci9jb21wb25lbnRzL0NvbnRlbnQvQ29udGVudCc7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ2NvbXBvbmVudHMvQ29udGFpbmVyJztcbmltcG9ydCBUYWJzIGZyb20gJ2NvbXBvbmVudHMvVGFicyc7XG5pbXBvcnQgQ2FyZEdyaWQgZnJvbSAnY29tcG9uZW50cy9DYXJkR3JpZCc7XG5pbXBvcnQgSnVtYm90cm9uIGZyb20gJ2NvbXBvbmVudHMvSnVtYm90cm9uJztcbmltcG9ydCBBY2NlbnRQcm9kdWN0cyBmcm9tICdjb21wb25lbnRzL0FjY2VudFByb2R1Y3RzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnY29tcG9uZW50cy9CdXR0b24nO1xuaW1wb3J0IHMgZnJvbSAnLi9Ib21lLmNzcyc7XG5cblxuY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbmV3czogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBsaW5rOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGNvbnRlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB9KSxcbiAgICApLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cy5yb290fT5cbiAgICAgICAgPEJhbm5lcj5cbiAgICAgICAgICA8Q29udGVudFxuICAgICAgICAgICAgdGl0bGU9XCJNaW5pbWFsIEZ1cm5pdHVyZSBDaGFpciBmb3IgV29ya3NwYWNlXCJcbiAgICAgICAgICAgIHByaWNlPVwiNzQuMjhcIlxuICAgICAgICAgICAgYnV0dG9uTGFiZWw9XCJTaG93IE5vd1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q29udGVudFxuICAgICAgICAgICAgdGl0bGU9XCJNaW5pbWFsIEZ1cm5pdHVyZSBDaGFpciBmb3IgV29ya3NwYWNlXCJcbiAgICAgICAgICAgIHByaWNlPVwiNzQuMjhcIlxuICAgICAgICAgICAgYnV0dG9uTGFiZWw9XCJTaG93IE5vd1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q29udGVudFxuICAgICAgICAgICAgdGl0bGU9XCJNaW5pbWFsIEZ1cm5pdHVyZSBDaGFpciBmb3IgV29ya3NwYWNlXCJcbiAgICAgICAgICAgIHByaWNlPVwiNzQuMjhcIlxuICAgICAgICAgICAgYnV0dG9uTGFiZWw9XCJTaG93IE5vd1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9CYW5uZXI+XG4gICAgICAgIDxBY2NlbnRQcm9kdWN0c1xuICAgICAgICAgIGNsYXNzZXM9e3sgcm9vdDogcy5hY2NlbnRQcm9kdWN0cyB9fVxuICAgICAgICAvPlxuICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICA8SnVtYm90cm9uIGNsYXNzZXM9e3tcbiAgICAgICAgICAgcm9vdDogcy5qdW1ib3Ryb24sXG4gICAgICAgICB9fVxuICAgICAgICAgLz5cbiAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtzLmhlYWRlcn0+XG4gICAgICAgICAgIDxoMSBjbGFzc05hbWU9e3MudGl0bGV9PlxuICAgICAgICAgICAgIFRyZW5kaW5nIFByb2R1Y3RzXG4gICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5kZXZpZGVyfSAvPlxuICAgICAgICAgICA8cCBjbGFzc05hbWU9e3MuZGVzY3J9PlxuICAgICAgICAgICAgIEEgY29sbGVjdGlvbiBvZiB0ZXh0aWxlIHNhbXBsZXMgbGF5IHNwcmVhZCBvdXQgb24gdGhlIHRhYmxlIFNhbXNhIHdhcyBhIHRyYXZlbGxlZFxuICAgICAgICAgICA8L3A+XG4gICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgIDxUYWJzXG4gICAgICAgICAgY2xhc3Nlcz17e1xuICAgICAgICAgICAgaGVhZGVyOiBzLnRhYnNIZWFkZXIsXG4gICAgICAgICAgICByb290OiAnJyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHBhbmVscz17W1xuICAgICAgICAgICAgeyByZW5kZXI6ICgpID0+IChcbiAgICAgICAgICAgICAgICA8Q2FyZEdyaWRcbiAgICAgICAgICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnLTIwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJy0yMCUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3RhcGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICctMjAlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnLTIwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJy0yMCUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3RhcGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICdPdXRcXG5vZlxcblN0b2NrJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICdzdG9jaycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJ05ldycsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgXX1cbiAgICAgICAgIC8+XG4gICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5sb2FkTW9yZX0+XG4gICAgICAgICAgIDxCdXR0b24+XG4gICAgICAgICAgICAgTG9hZCBNb3JlXG4gICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgPC9kaXY+XG4gICAgICAgPC9Db250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoSG9tZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy9ob21lL0hvbWUuanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSG9tZSBmcm9tICcuL0hvbWUnO1xuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGFjdGlvbih7IGZldGNoIH0pIHtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiAnUmVhY3QgU3RhcnRlciBLaXQnLFxuICAgIGNvbXBvbmVudDogKFxuICAgICAgPExheW91dD5cbiAgICAgICAgPEhvbWUgbmV3cz17W119IC8+XG4gICAgICA8L0xheW91dD5cbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy9ob21lL2luZGV4LmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuXG4vLyBUaGUgdG9wLWxldmVsIChwYXJlbnQpIHJvdXRlXG5jb25zdCByb3V0ZXMgPSB7XG4gIHBhdGg6ICcnLFxuXG4gIC8vIEtlZXAgaW4gbWluZCwgcm91dGVzIGFyZSBldmFsdWF0ZWQgaW4gb3JkZXJcbiAgY2hpbGRyZW46IFtcbiAgICAvLyBUaGUgaG9tZSByb3V0ZSBpcyBhZGRlZCB0byBjbGllbnQuanMgdG8gbWFrZSBzdXJlIHNoYXJlZCBjb21wb25lbnRzIGFyZVxuICAgIC8vIGFkZGVkIHRvIGNsaWVudC5qcyBhcyB3ZWxsIGFuZCBub3QgcmVwZWF0ZWQgaW4gZWFjaCBpbmRpdmlkdWFsIHJvdXRlIGNodW5rLlxuICAgIHtcbiAgICAgIHBhdGg6ICcnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tNb2RlOiAnZWFnZXInICovICcuL2hvbWUnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvc2hvcCcsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3Byb2R1Y3RzJyAqLyAnLi9wcm9kdWN0cycpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9yZWdpc3RlcicsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3JlZ2lzdGVyJyAqLyAnLi9yZWdpc3RlcicpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9sb2dpbicsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2xvZ2luJyAqLyAnLi9sb2dpbicpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9jb250YWN0JyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnY29udGFjdCcgKi8gJy4vY29udGFjdCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9wZXJzb25hbCcsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2xrJyAqLyAnLi9saycpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9hYm91dCcsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2Fib3V0JyAqLyAnLi9hYm91dCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9wcml2YWN5JyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAncHJpdmFjeScgKi8gJy4vcHJpdmFjeScpLFxuICAgIH0sXG4gICAgLy8gV2lsZGNhcmQgcm91dGVzLCBlLmcuIHsgcGF0aDogJyguKiknLCAuLi4gfSAobXVzdCBnbyBsYXN0KVxuICAgIHtcbiAgICAgIHBhdGg6ICcoLiopJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnbm90LWZvdW5kJyAqLyAnLi9ub3QtZm91bmQnKSxcbiAgICB9LFxuICBdLFxuXG4gIGFzeW5jIGFjdGlvbih7IG5leHQgfSkge1xuICAgIC8vIEV4ZWN1dGUgZWFjaCBjaGlsZCByb3V0ZSB1bnRpbCBvbmUgb2YgdGhlbSByZXR1cm4gdGhlIHJlc3VsdFxuICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgbmV4dCgpO1xuXG4gICAgLy8gUHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgdGl0bGUsIGRlc2NyaXB0aW9uIGV0Yy5cbiAgICByb3V0ZS50aXRsZSA9IGAke3JvdXRlLnRpdGxlIHx8ICdVbnRpdGxlZCBQYWdlJ30gLSB3d3cucmVhY3RzdGFydGVya2l0LmNvbWA7XG4gICAgcm91dGUuZGVzY3JpcHRpb24gPSByb3V0ZS5kZXNjcmlwdGlvbiB8fCAnJztcblxuICAgIHJldHVybiByb3V0ZTtcbiAgfSxcbn07XG5cbi8vIFRoZSBlcnJvciBwYWdlIGlzIGF2YWlsYWJsZSBieSBwZXJtYW5lbnQgdXJsIGZvciBkZXZlbG9wbWVudCBtb2RlXG5pZiAoX19ERVZfXykge1xuICByb3V0ZXMuY2hpbGRyZW4udW5zaGlmdCh7XG4gICAgcGF0aDogJy9lcnJvcicsXG4gICAgYWN0aW9uOiByZXF1aXJlKCcuL2Vycm9yJykuZGVmYXVsdCxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL2luZGV4LmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBub2RlRmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IFByZXR0eUVycm9yIGZyb20gJ3ByZXR0eS1lcnJvcic7XG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9BcHAnO1xuaW1wb3J0IEh0bWwgZnJvbSAnLi9jb21wb25lbnRzL0h0bWwnO1xuaW1wb3J0IHsgRXJyb3JQYWdlV2l0aG91dFN0eWxlIH0gZnJvbSAnLi9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlJztcbmltcG9ydCBlcnJvclBhZ2VTdHlsZSBmcm9tICcuL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuY3NzJztcbmltcG9ydCBjcmVhdGVGZXRjaCBmcm9tICcuL2NyZWF0ZUZldGNoJztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cy5qc29uJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tdW5yZXNvbHZlZFxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUvY29uZmlndXJlU3RvcmUnO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdzZWFtbGVzcy1pbW11dGFibGUnO1xuaW1wb3J0IFVzZXIgZnJvbSAnbW9kdWxlcy9Vc2VyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAocmVhc29uLCBwKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBSZWplY3Rpb24gYXQ6JywgcCwgJ3JlYXNvbjonLCByZWFzb24pO1xuICAvLyBzZW5kIGVudGlyZSBhcHAgZG93bi4gUHJvY2VzcyBtYW5hZ2VyIHdpbGwgcmVzdGFydCBpdFxuICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcblxuLy9cbi8vIFRlbGwgYW55IENTUyB0b29saW5nIChzdWNoIGFzIE1hdGVyaWFsIFVJKSB0byB1c2UgYWxsIHZlbmRvciBwcmVmaXhlcyBpZiB0aGVcbi8vIHVzZXIgYWdlbnQgaXMgbm90IGtub3duLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmdsb2JhbC5uYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yIHx8IHt9O1xuZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQgPSBnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnYWxsJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4vL1xuLy8gSWYgeW91IGFyZSB1c2luZyBwcm94eSBmcm9tIGV4dGVybmFsIG1hY2hpbmUsIHlvdSBjYW4gc2V0IFRSVVNUX1BST1hZIGVudlxuLy8gRGVmYXVsdCBpcyB0byB0cnVzdCBwcm94eSBoZWFkZXJzIG9ubHkgZnJvbSBsb29wYmFjayBpbnRlcmZhY2UuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLnNldCgndHJ1c3QgcHJveHknLCBjb25maWcudHJ1c3RQcm94eSk7XG5cbi8vXG4vLyBSZWdpc3RlciBOb2RlLmpzIG1pZGRsZXdhcmVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKSkpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5hcHAuZ2V0KCcqJywgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY3NzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gRW5hYmxlcyBjcml0aWNhbCBwYXRoIENTUyByZW5kZXJpbmdcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20va3JpYXNvZnQvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXJcbiAgICBjb25zdCBpbnNlcnRDc3MgPSAoLi4uc3R5bGVzKSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbiAgICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IGNzcy5hZGQoc3R5bGUuX2dldENzcygpKSk7XG4gICAgfTtcblxuICAgIC8vIFVuaXZlcnNhbCBIVFRQIGNsaWVudFxuXG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgc3ltYm9sOiAnJCcsXG4gICAgICAgIHR5cGU6ICd1c2QnLFxuICAgICAgfSxcbiAgICAgIFtVc2VyLnR5cGVzLk5BTUVdOiBJbW11dGFibGUoVXNlci5yZWR1Y2VyLmRlZmF1bHRTdGF0ZSksXG4gICAgfTtcblxuICAgIGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoaW5pdGlhbFN0YXRlLCB7fSk7XG5cbiAgICAvLyBHbG9iYWwgKGNvbnRleHQpIHZhcmlhYmxlcyB0aGF0IGNhbiBiZSBlYXNpbHkgYWNjZXNzZWQgZnJvbSBhbnkgUmVhY3QgY29tcG9uZW50XG4gICAgLy8gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9jb250ZXh0Lmh0bWxcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgaW5zZXJ0Q3NzLFxuICAgICAgLy8gVGhlIHR3aW5zIGJlbG93IGFyZSB3aWxkLCBiZSBjYXJlZnVsIVxuICAgICAgcGF0aG5hbWU6IHJlcS5wYXRoLFxuICAgICAgcXVlcnk6IHJlcS5xdWVyeSxcbiAgICAgIC8vIFlvdSBjYW4gYWNjZXNzIHJlZHV4IHRocm91Z2ggcmVhY3QtcmVkdXggY29ubmVjdFxuICAgICAgc3RvcmUsXG4gICAgICBzdG9yZVN1YnNjcmlwdGlvbjogbnVsbCxcbiAgICB9O1xuXG4gICAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXIucmVzb2x2ZShjb250ZXh0KTtcblxuICAgIGlmIChyb3V0ZS5yZWRpcmVjdCkge1xuICAgICAgcmVzLnJlZGlyZWN0KHJvdXRlLnN0YXR1cyB8fCAzMDIsIHJvdXRlLnJlZGlyZWN0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0geyAuLi5yb3V0ZSB9O1xuICAgIGRhdGEuY2hpbGRyZW4gPSBSZWFjdERPTS5yZW5kZXJUb1N0cmluZyhcbiAgICAgIDxBcHAgY29udGV4dD17Y29udGV4dH0+e3JvdXRlLmNvbXBvbmVudH08L0FwcD4sXG4gICAgKTtcbiAgICBkYXRhLnN0eWxlcyA9IFt7IGlkOiAnY3NzJywgY3NzVGV4dDogWy4uLmNzc10uam9pbignJykgfV07XG4gICAgZGF0YS5zY3JpcHRzID0gW2Fzc2V0cy52ZW5kb3IuanNdO1xuICAgIGlmIChyb3V0ZS5jaHVua3MpIHtcbiAgICAgIGRhdGEuc2NyaXB0cy5wdXNoKC4uLnJvdXRlLmNodW5rcy5tYXAoY2h1bmsgPT4gYXNzZXRzW2NodW5rXS5qcykpO1xuICAgIH1cbiAgICBkYXRhLnNjcmlwdHMucHVzaChhc3NldHMuY2xpZW50LmpzKTtcbiAgICBkYXRhLmFwcCA9IHtcbiAgICAgIGFwaVVybDogY29uZmlnLmFwaS5jbGllbnRVcmwsXG4gICAgICBzdGF0ZTogY29udGV4dC5zdG9yZS5nZXRTdGF0ZSgpLFxuICAgIH07XG5cbiAgICBjb25zdCBodG1sID0gUmVhY3RET00ucmVuZGVyVG9TdGF0aWNNYXJrdXAoPEh0bWwgey4uLmRhdGF9IC8+KTtcbiAgICByZXMuc3RhdHVzKHJvdXRlLnN0YXR1cyB8fCAyMDApO1xuICAgIHJlcy5zZW5kKGA8IWRvY3R5cGUgaHRtbD4ke2h0bWx9YCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufSk7XG5cbi8vXG4vLyBFcnJvciBoYW5kbGluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNvbnN0IHBlID0gbmV3IFByZXR0eUVycm9yKCk7XG5wZS5za2lwTm9kZUZpbGVzKCk7XG5wZS5za2lwUGFja2FnZSgnZXhwcmVzcycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmFwcC51c2UoKGVyciwgcmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc29sZS5lcnJvcihwZS5yZW5kZXIoZXJyKSk7XG4gIGNvbnN0IGh0bWwgPSBSZWFjdERPTS5yZW5kZXJUb1N0YXRpY01hcmt1cChcbiAgICA8SHRtbFxuICAgICAgdGl0bGU9XCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIlxuICAgICAgZGVzY3JpcHRpb249e2Vyci5tZXNzYWdlfVxuICAgICAgc3R5bGVzPXtbeyBpZDogJ2NzcycsIGNzc1RleHQ6IGVycm9yUGFnZVN0eWxlLl9nZXRDc3MoKSB9XX0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgID5cbiAgICAgIHtSZWFjdERPTS5yZW5kZXJUb1N0cmluZyg8RXJyb3JQYWdlV2l0aG91dFN0eWxlIGVycm9yPXtlcnJ9IC8+KX1cbiAgICA8L0h0bWw+LFxuICApO1xuICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcbiAgcmVzLnNlbmQoYDwhZG9jdHlwZSBodG1sPiR7aHRtbH1gKTtcbn0pO1xuXG4vL1xuLy8gTGF1bmNoIHRoZSBzZXJ2ZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmlmICghbW9kdWxlLmhvdCkge1xuICBhcHAubGlzdGVuKGNvbmZpZy5wb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5pbmZvKGBUaGUgc2VydmVyIGlzIHJ1bm5pbmcgYXQgaHR0cDovL2xvY2FsaG9zdDoke2NvbmZpZy5wb3J0fS9gKTtcbiAgfSk7XG59XG5cbi8vXG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgYXBwLmhvdCA9IG1vZHVsZS5ob3Q7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KCcuL3JvdXRlcicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3NlcnZlci5qcyIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbi9kZXZlbG9wbWVudE9ubHknO1xuaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHsgbmFtZSwgdmVyc2lvbiB9IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgY3JlYXRlSGVscGVycyBmcm9tICcuL2NyZWF0ZUhlbHBlcnMnO1xuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgc2FnYXMgZnJvbSAnLi4vcm9vdFNhZ2FzJztcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuLi9yb290UmVkdWNlcic7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ3NlYW1sZXNzLWltbXV0YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSwgaGVscGVyc0NvbmZpZykge1xuICBjb25zdCBoZWxwZXJzID0gY3JlYXRlSGVscGVycyhoZWxwZXJzQ29uZmlnKTtcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gW3RodW5rLndpdGhFeHRyYUFyZ3VtZW50KGhlbHBlcnMpLCBzYWdhTWlkZGxld2FyZV07XG5cbiAgbGV0IGVuaGFuY2VyO1xuXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgbWlkZGxld2FyZS5wdXNoKGNyZWF0ZUxvZ2dlcigpKTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96YWxtb3hpc3VzL3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbiMxNC11c2luZy1pbi1wcm9kdWN0aW9uXG4gICAgY29uc3QgY29tcG9zZUVuaGFuY2VycyA9IGNvbXBvc2VXaXRoRGV2VG9vbHMoe1xuICAgICAgLy8gT3B0aW9uczogaHR0cHM6Ly9naXRodWIuY29tL3phbG1veGlzdXMvcmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2Jsb2IvbWFzdGVyL2RvY3MvQVBJL0FyZ3VtZW50cy5tZCNvcHRpb25zXG4gICAgICBuYW1lOiBgJHtuYW1lfUAke3ZlcnNpb259YCxcbiAgICB9KTtcblxuICAgIC8vIGh0dHBzOi8vcmVkdXguanMub3JnL2RvY3MvYXBpL2FwcGx5TWlkZGxld2FyZS5odG1sXG4gICAgZW5oYW5jZXIgPSBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKSk7XG4gIH0gZWxzZSB7XG4gICAgZW5oYW5jZXIgPSBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSk7XG4gIH1cblxuICAvLyBodHRwczovL3JlZHV4LmpzLm9yZy9kb2NzL2FwaS9jcmVhdGVTdG9yZS5odG1sXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocm9vdFJlZHVjZXIsIEltbXV0YWJsZShpbml0aWFsU3RhdGUpLCBlbmhhbmNlcik7XG5cbiAgLy8gSG90IHJlbG9hZCByZWR1Y2VycyAocmVxdWlyZXMgV2VicGFjayBvciBCcm93c2VyaWZ5IEhNUiB0byBiZSBlbmFibGVkKVxuICBpZiAoX19ERVZfXyAmJiBtb2R1bGUuaG90KSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4uL3JlZHVjZXJzJywgKCkgPT5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnbG9iYWwtcmVxdWlyZVxuICAgICAgc3RvcmUucmVwbGFjZVJlZHVjZXIocmVxdWlyZSgnLi4vcmVkdWNlcnMnKS5kZWZhdWx0KSxcbiAgICApO1xuICB9XG4gIHNhZ2FNaWRkbGV3YXJlLnJ1bihzYWdhcyk7XG4gIHJldHVybiBzdG9yZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvc3RvcmUvY29uZmlndXJlU3RvcmUuanMiLCJmdW5jdGlvbiBjcmVhdGVHcmFwaHFsUmVxdWVzdChmZXRjaCkge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gZ3JhcGhxbFJlcXVlc3QocXVlcnksIHZhcmlhYmxlcykge1xuICAgIGNvbnN0IGZldGNoQ29uZmlnID0ge1xuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcXVlcnksIHZhcmlhYmxlcyB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goJy9ncmFwaHFsJywgZmV0Y2hDb25maWcpO1xuICAgIGlmIChyZXNwLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IocmVzcC5zdGF0dXNUZXh0KTtcbiAgICByZXR1cm4gcmVzcC5qc29uKCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUhlbHBlcnMoeyBmZXRjaCwgaGlzdG9yeSB9KSB7XG4gIHJldHVybiB7XG4gICAgZmV0Y2gsXG4gICAgaGlzdG9yeSxcbiAgICBncmFwaHFsUmVxdWVzdDogY3JlYXRlR3JhcGhxbFJlcXVlc3QoZmV0Y2gpLFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9zdG9yZS9jcmVhdGVIZWxwZXJzLmpzIiwiaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gJ3V0aWwnO1xuXG5mdW5jdGlvbiBpbnNwZWN0T2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gaW5zcGVjdChvYmplY3QsIHtcbiAgICBjb2xvcnM6IHRydWUsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVMaW5lKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbn1cblxuY29uc3QgYWN0aW9uRm9ybWF0dGVycyA9IHtcbiAgLy8gVGhpcyBpcyB1c2VkIGF0IGZlYXR1cmUvYXBvbGxvIGJyYW5jaCwgYnV0IGl0IGNhbiBoZWxwIHlvdSB3aGVuIGltcGxlbWVudGluZyBBcG9sbG9cbiAgQVBPTExPX1FVRVJZX0lOSVQ6IGEgPT5cbiAgICBgcXVlcnlJZDoke2EucXVlcnlJZH0gdmFyaWFibGVzOiR7aW5zcGVjdE9iamVjdChcbiAgICAgIGEudmFyaWFibGVzLFxuICAgICl9XFxuICAgJHtzaW5nbGVMaW5lKGEucXVlcnlTdHJpbmcpfWAsXG5cbiAgQVBPTExPX1FVRVJZX1JFU1VMVDogYSA9PlxuICAgIGBxdWVyeUlkOiR7YS5xdWVyeUlkfVxcbiAgICR7c2luZ2xlTGluZShpbnNwZWN0T2JqZWN0KGEucmVzdWx0KSl9YCxcblxuICBBUE9MTE9fUVVFUllfU1RPUDogYSA9PiBgcXVlcnlJZDoke2EucXVlcnlJZH1gLFxufTtcblxuLy8gU2VydmVyIHNpZGUgcmVkdXggYWN0aW9uIGxvZ2dlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTG9nZ2VyKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuIHN0b3JlID0+IG5leHQgPT4gYWN0aW9uID0+IHtcbiAgICBsZXQgZm9ybWF0dGVkUGF5bG9hZCA9ICcnO1xuICAgIGNvbnN0IGFjdGlvbkZvcm1hdHRlciA9IGFjdGlvbkZvcm1hdHRlcnNbYWN0aW9uLnR5cGVdO1xuICAgIGlmICh0eXBlb2YgYWN0aW9uRm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmb3JtYXR0ZWRQYXlsb2FkID0gYWN0aW9uRm9ybWF0dGVyKGFjdGlvbik7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24udG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIHtcbiAgICAgIGZvcm1hdHRlZFBheWxvYWQgPSBhY3Rpb24udG9TdHJpbmcoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24ucGF5bG9hZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGZvcm1hdHRlZFBheWxvYWQgPSBpbnNwZWN0T2JqZWN0KGFjdGlvbi5wYXlsb2FkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybWF0dGVkUGF5bG9hZCA9IGluc3BlY3RPYmplY3QoYWN0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgICogJHthY3Rpb24udHlwZX06ICR7Zm9ybWF0dGVkUGF5bG9hZH1gKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvc3RvcmUvbG9nZ2VyL2xvZ2dlci5zZXJ2ZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYmFiZWwvcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYmFiZWwvcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gQGJhYmVsL3BvbHlmaWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBiYWJlbC9ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiXG4vLyBtb2R1bGUgaWQgPSBAYmFiZWwvcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiXG4vLyBtb2R1bGUgaWQgPSBAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIlxuLy8gbW9kdWxlIGlkID0gYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXlcIlxuLy8gbW9kdWxlIGlkID0gYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXlcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSBib2R5LXBhcnNlclxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY2xhc3NuYW1lc1wiXG4vLyBtb2R1bGUgaWQgPSBjbGFzc25hbWVzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IGNvb2tpZS1wYXJzZXJcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gZXhwcmVzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmb3JtaWtcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmb3JtaWtcIlxuLy8gbW9kdWxlIGlkID0gZm9ybWlrXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhpc3RvcnkvY3JlYXRlQnJvd3Nlckhpc3RvcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5XCJcbi8vIG1vZHVsZSBpZCA9IGhpc3RvcnkvY3JlYXRlQnJvd3Nlckhpc3Rvcnlcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW1tdXRhYmxlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaW1tdXRhYmxlXCJcbi8vIG1vZHVsZSBpZCA9IGltbXV0YWJsZVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpc29tb3JwaGljLWZldGNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaXNvbW9ycGhpYy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSBpc29tb3JwaGljLWZldGNoXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIlxuLy8gbW9kdWxlIGlkID0gaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm5vZGUtZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gbm9kZS1mZXRjaFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJudWthLWNhcm91c2VsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibnVrYS1jYXJvdXNlbFwiXG4vLyBtb2R1bGUgaWQgPSBudWthLWNhcm91c2VsXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IHBhdGhcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJldHR5LWVycm9yXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJldHR5LWVycm9yXCJcbi8vIG1vZHVsZSBpZCA9IHByZXR0eS1lcnJvclxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJvcC10eXBlc1wiXG4vLyBtb2R1bGUgaWQgPSBwcm9wLXR5cGVzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJjLXNsaWRlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJjLXNsaWRlclwiXG4vLyBtb2R1bGUgaWQgPSByYy1zbGlkZXJcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSByZWFjdFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSByZWFjdC1kb20vc2VydmVyXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWZvbnRhd2Vzb21lXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZm9udGF3ZXNvbWVcIlxuLy8gbW9kdWxlIGlkID0gcmVhY3QtZm9udGF3ZXNvbWVcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSByZWFjdC1yZWR1eFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1zZWxlY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1zZWxlY3RcIlxuLy8gbW9kdWxlIGlkID0gcmVhY3Qtc2VsZWN0XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXRhYnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC10YWJzXCJcbi8vIG1vZHVsZSBpZCA9IHJlYWN0LXRhYnNcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtdGV4dC1tYXNrXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtdGV4dC1tYXNrXCJcbi8vIG1vZHVsZSBpZCA9IHJlYWN0LXRleHQtbWFza1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10cmVlYmVhcmRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC10cmVlYmVhcmRcIlxuLy8gbW9kdWxlIGlkID0gcmVhY3QtdHJlZWJlYXJkXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gcmVkdXhcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2RldmVsb3BtZW50T25seVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvbi9kZXZlbG9wbWVudE9ubHlcIlxuLy8gbW9kdWxlIGlkID0gcmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2RldmVsb3BtZW50T25seVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYVwiXG4vLyBtb2R1bGUgaWQgPSByZWR1eC1zYWdhXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2EvZWZmZWN0c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiXG4vLyBtb2R1bGUgaWQgPSByZWR1eC1zYWdhL2VmZmVjdHNcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiXG4vLyBtb2R1bGUgaWQgPSByZWR1eC10aHVua1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZWFtbGVzcy1pbW11dGFibGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZWFtbGVzcy1pbW11dGFibGVcIlxuLy8gbW9kdWxlIGlkID0gc2VhbWxlc3MtaW1tdXRhYmxlXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcmlhbGl6ZS1qYXZhc2NyaXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VyaWFsaXplLWphdmFzY3JpcHRcIlxuLy8gbW9kdWxlIGlkID0gc2VyaWFsaXplLWphdmFzY3JpcHRcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pdmVyc2FsLXJvdXRlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuaXZlcnNhbC1yb3V0ZXJcIlxuLy8gbW9kdWxlIGlkID0gdW5pdmVyc2FsLXJvdXRlclxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidXRpbFwiXG4vLyBtb2R1bGUgaWQgPSB1dGlsXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInl1cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInl1cFwiXG4vLyBtb2R1bGUgaWQgPSB5dXBcbi8vIG1vZHVsZSBjaHVua3MgPSA4Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdHNCQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3QkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7Ozs7QUE3REE7QUFDQTtBQStEQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBUkE7QUFZQTs7Ozs7OztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFNQTtBQVBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVhBO0FBQ0E7QUFjQTtBQUNBO0FBREE7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBaEJBO0FBQ0E7QUFEQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUZBOztBQURBOzs7O0FBTUE7O0FBYUE7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkE7QUFDQTtBQUNBO0FBQUE7QUFXQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFXQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQVBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBOUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBQ0E7QUFnREE7Ozs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWJBO0FBQ0E7QUFtQkE7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFjQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZEE7QUFDQTtBQW9CQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBOzs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBREE7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7Ozs7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTs7OztBQS9EQTtBQUNBO0FBaUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBVEE7QUFDQTtBQWdCQTtBQUVBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBS0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUNBOzs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUNBO0FBVUE7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BOzs7O0FBeEJBO0FBQ0E7QUEwQkE7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWhCQTtBQUNBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7Ozs7Ozs7O0FDOUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBOzs7O0FBbEJBO0FBQ0E7QUFvQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBb0JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVlBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBOzs7O0FBMUVBO0FBQ0E7QUFEQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFYQTs7QUFEQTs7OztBQWVBO0FBQ0E7QUFDQTtBQUZBOztBQThEQTs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVEE7QUFDQTtBQWFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBUkE7QUFjQTs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTs7OztBQWJBO0FBQ0E7QUFEQTs7OztBQUNBO0FBQ0E7QUFEQTs7QUFlQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0E7Ozs7QUF4Q0E7QUFDQTtBQURBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTs7QUFEQTs7OztBQU9BO0FBQ0E7QUFEQTs7QUFvQ0E7QUFDQTtBQURBO0FBSUE7QUFDQTtBQURBO0FBSUE7Ozs7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFJQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFPQTs7OztBQWhCQTtBQUNBO0FBa0JBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQVJBO0FBWUE7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUxBO0FBQ0E7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFQQTtBQVdBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFkQTtBQUNBO0FBa0JBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQWxCQTtBQXlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFLQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVJBO0FBRkE7QUFDQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkE7QUFPQTs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFOQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFsQkE7QUFzQkE7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFGQTtBQUhBO0FBQ0E7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUpBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUxBO0FBUUE7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFWQTtBQUNBO0FBaUJBOzs7Ozs7O0FDMUJBOzs7Ozs7Ozs7QUFTQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBR0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFuQkE7QUEzQkE7Ozs7Ozs7O0FDakJBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7O0FDRkE7Ozs7Ozs7OztBQWVBOzs7Ozs7QUFNQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFBQTtBQVBBO0FBV0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFPQTtBQUhBO0FBQ0E7QUFMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0REE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBR0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQVdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTs7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFaQTtBQWNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7OztBQTBCQTtBQUNBOzs7QUFsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFKQTtBQUdBO0FBSEE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFMQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBWUE7QUFaQTtBQUFBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUhBO0FBQ0E7QUFkQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBeUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQU1BO0FBQUE7QUFBQTs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFMQTtBQUFBO0FBZUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQUxBO0FBWUE7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBakJBO0FBQ0E7QUFzQkE7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUdBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQVhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUEzSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFDQTtBQStJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFNQTtBQUFBO0FBQUE7Ozs7Ozs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUdBO0FBR0E7QUFHQTtBQVZBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBWkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBZEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV0E7QUE3R0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFDQTtBQWlIQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFNQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDdklBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFSQTtBQUpBO0FBQ0E7QUFvQkE7QUFBQTtBQUdBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFHQTtBQUNBO0FBRUE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRkE7Ozs7O0FBTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBYUE7QUFFQTs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFMQTtBQVFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBOzs7Ozs7Ozs7Ozs7OztBQ0pBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFQQTtBQVNBOzs7Ozs7OztBQ1pBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7Ozs7OztBQ0xBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7QUFMQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQVhBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7Ozs7QUE3QkE7QUFDQTtBQURBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7O0FBREE7Ozs7QUFTQTtBQUNBO0FBREE7O0FBdUJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDL0NBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUE1Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFBQTtBQU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQStEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BOzs7O0FBdkhBO0FBQ0E7QUFEQTs7OztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUZBOztBQXlIQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFZQTs7Ozs7Ozs7OztBQ3pCQTs7Ozs7Ozs7O0FBU0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBTUE7QUE5Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQThDQTtBQTlDQTtBQUFBO0FBQ0E7QUFEQTtBQWdEQTtBQUVBO0FBQ0E7QUFDQTtBQXBEQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQTBEQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQWRBO0FBcUJBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQXpCQTtBQUFBO0FBQ0E7QUFEQTtBQW1DQTtBQUNBO0FBcENBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFxQ0E7QUF0Q0E7QUFDQTtBQURBO0FBMENBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUEzREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBNkRBO0FBQ0E7QUE5REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBa0VBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUZBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUEE7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQVVBO0FBQ0E7QUFYQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBY0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQVZBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQWZBO0FBQUE7QUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9