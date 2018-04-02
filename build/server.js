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
/******/ 	var hotCurrentHash = "25d50752e6071eb824c8"; // eslint-disable-line no-unused-vars
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
/******/ 		7: 0
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
/******/ 			var chunk = require("./chunks/" + ({"0":"products","1":"register","2":"privacy","3":"about","4":"not-found","5":"lk","6":"contact"}[chunkId]||chunkId) + ".js");
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

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/modules/User/components/Register/Register.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Register-root-3kv3t {\n  max-width: 570px;\n  padding-bottom: 100px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.Register-already--LFy3 {\n  margin-bottom: 27px;\n}\n\n.Register-already--LFy3 span:nth-child(1) {\n  margin-top: 30px;\n  height: 1px;\n  background-color: rgb(234, 234, 234);\n  display: block;\n}\n\n.Register-already--LFy3 span:nth-child(2) {\n  display: block;\n  text-align: center;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 30px;\n  letter-spacing: 0.14px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/modules/User/components/Register/Register.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,iBAAiB;EACjB,YAAY;EACZ,qCAAqC;EACrC,eAAe;CAChB;;AAED;EACE,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;CACxB","file":"Register.css","sourcesContent":[".root {\n  max-width: 570px;\n  padding-bottom: 100px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.already {\n  margin-bottom: 27px;\n}\n\n.already span:nth-child(1) {\n  margin-top: 30px;\n  height: 1px;\n  background-color: rgb(234, 234, 234);\n  display: block;\n}\n\n.already span:nth-child(2) {\n  display: block;\n  text-align: center;\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 30px;\n  letter-spacing: 0.14px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Register-root-3kv3t",
	"already": "Register-already--LFy3"
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

module.exports = {"name":"web","version":"0.0.0","private":true,"engines":{"node":">=6.5","npm":">=3.10"},"browserslist":[">1%","last 4 versions","Firefox ESR","not ie < 9"],"dependencies":{"@babel/plugin-transform-runtime":"^7.0.0-beta.42","@babel/polyfill":"7.0.0-beta.39","@babel/runtime":"^7.0.0-beta.42","antd":"^3.3.0","babel-plugin-import":"^1.6.7","babel-plugin-transform-runtime":"^6.23.0","bluebird":"^3.5.1","body-parser":"^1.18.2","classnames":"^2.2.5","cookie-parser":"^1.4.3","core-js":"^2.5.3","express":"^4.16.2","express-graphql":"^0.6.11","express-jwt":"^5.3.0","formik":"^0.11.11","graphql":"^0.12.3","history":"^4.7.2","isomorphic-style-loader":"^4.0.0","jsonwebtoken":"^8.1.0","lost":"^8.2.1","node-fetch":"^2.0.0","normalize.css":"^7.0.0","nuka-carousel":"^4.0.0","passport":"^0.4.0","passport-facebook":"^2.1.1","pretty-error":"^2.1.1","prop-types":"^15.6.0","query-string":"^5.0.1","rc-slider":"^8.6.1","react":"^16.2.0","react-dom":"^16.2.0","react-fontawesome":"^1.6.1","react-redux":"^5.0.6","react-select":"^1.2.1","react-svg-loader":"^2.1.0","react-tabs":"^2.2.1","react-treebeard":"^2.1.0","redux":"^3.7.2","redux-devtools-extension":"^2.13.2","redux-logger":"^3.0.6","redux-saga":"^0.16.0","redux-thunk":"^2.2.0","reselect":"^3.0.1","seamless-immutable":"^7.1.3","semantic-ui-react":"^0.78.3","sequelize":"^4.28.6","serialize-javascript":"^1.3.0","source-map-support":"^0.5.0","sqlite3":"^3.1.13","universal-router":"^6.0.0","whatwg-fetch":"^2.0.3","yup":"^0.24.1"},"devDependencies":{"@babel/core":"^7.0.0-beta.42","@babel/node":"7.0.0-beta.39","@babel/plugin-transform-react-constant-elements":"7.0.0-beta.39","@babel/plugin-transform-react-inline-elements":"7.0.0-beta.39","@babel/preset-env":"7.0.0-beta.39","@babel/preset-flow":"7.0.0-beta.39","@babel/preset-react":"7.0.0-beta.39","@babel/preset-stage-2":"7.0.0-beta.39","assets-webpack-plugin":"^3.5.1","autoprefixer":"^7.2.3","babel-core":"^7.0.0-0","babel-eslint":"^8.1.2","babel-jest":"^22.0.4","babel-loader":"8.0.0-beta.0","babel-plugin-transform-react-remove-prop-types":"^0.4.12","browser-sync":"^2.21.0","chokidar":"^2.0.0","css-loader":"^0.28.7","enzyme":"^3.2.0","eslint":"^4.14.0","eslint-config-airbnb":"^16.1.0","eslint-config-prettier":"^2.9.0","eslint-import-resolver-node":"^0.3.1","eslint-loader":"^1.9.0","eslint-plugin-css-modules":"^2.7.5","eslint-plugin-flowtype":"^2.40.1","eslint-plugin-import":"^2.8.0","eslint-plugin-jsx-a11y":"^6.0.3","eslint-plugin-prettier":"^2.4.0","eslint-plugin-react":"^7.5.1","file-loader":"^1.1.6","flow-bin":"^0.65.0","front-matter":"^2.3.0","glob":"^7.1.2","husky":"^0.14.3","identity-obj-proxy":"^3.0.0","jest":"^22.0.4","lint-staged":"^6.0.0","markdown-it":"^8.4.0","mkdirp":"^0.5.1","null-loader":"^0.1.1","opn-cli":"^3.1.0","pixrem":"^4.0.1","pleeease-filters":"^4.0.0","postcss":"^6.0.14","postcss-calc":"^6.0.1","postcss-color-function":"^4.0.1","postcss-custom-media":"^6.0.0","postcss-custom-properties":"^6.2.0","postcss-custom-selectors":"^4.0.1","postcss-flexbugs-fixes":"^3.2.0","postcss-import":"^11.0.0","postcss-loader":"^2.0.9","postcss-media-minmax":"^3.0.0","postcss-nested":"^3.0.0","postcss-nesting":"^4.2.1","postcss-pseudoelements":"^5.0.0","postcss-selector-matches":"^3.0.1","postcss-selector-not":"^3.0.1","prettier":"^1.9.2","raw-loader":"^0.5.1","react-deep-force-update":"^2.1.1","react-dev-utils":"^5.0.0","react-error-overlay":"^4.0.0","react-test-renderer":"^16.2.0","redux-mock-store":"^1.4.0","rimraf":"^2.6.2","stylelint":"^8.4.0","stylelint-config-standard":"^18.0.0","stylelint-order":"^0.8.0","svg-url-loader":"^2.3.1","url-loader":"^0.6.2","webpack":"^3.10.0","webpack-bundle-analyzer":"^2.9.1","webpack-dev-middleware":"^2.0.3","webpack-hot-middleware":"^2.21.0","webpack-node-externals":"^1.6.0"},"scripts":{"lint-js":"eslint --ignore-path .gitignore --ignore-pattern \"!**/.*\" .","lint-css":"stylelint \"src/**/*.{css,less,styl,scss,sass,sss}\"","lint":"yarn run lint-js && yarn run lint-css","fix-js":"yarn run lint-js --fix","fix-css":"yarn run lint-css --fix","fix":"yarn run fix-js && yarn run fix-css","check":"flow check","test":"jest","test-watch":"yarn run test --watch --notify","test-cover":"yarn run test --coverage","coverage":"yarn run test-cover && opn coverage/lcov-report/index.html","clean":"babel-node tools/run clean","copy":"babel-node tools/run copy","bundle":"babel-node tools/run bundle","build":"babel-node tools/run build","build-stats":"yarn run build --release --analyse","deploy":"babel-node tools/run deploy","render":"babel-node tools/run render","serve":"babel-node tools/run runServer","start":"babel-node tools/run start"}}

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Input_css__ = __webpack_require__("./src/components/Form/Input/Input.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Input_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Input_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Form/Input/Input.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }







var renderErrors = function renderErrors(error) {
  var isArray = Array.isArray(error);

  if (isArray) {
    return error.map(function (err) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.error,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: this
      }, err);
    });
  }

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.error,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
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
      rest = _objectWithoutProperties(_ref, ["label", "type", "value", "handlers", "error"]);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, label), error ? renderErrors(error) : null, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", _extends({
    type: type,
    value: value,
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.input
  }, handlers, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  })));
};

Input.defaultProps = {
  label: '',
  type: 'text',
  error: null,
  handlers: {}
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Input_css___default.a)(Input));

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
var NAME = 'user';
var REGISTER = "".concat(NAME, "_register");

/***/ }),

/***/ "./src/modules/User/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return register; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_Title__ = __webpack_require__("./src/components/Title/Title.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_Button__ = __webpack_require__("./src/components/Button/Button.js");
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
      isLoading = _ref.isLoading;
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
      setTimeout(function () {
        return setSubmitting(false);
      }, 1000);
    },
    render: function render(_ref3) {
      var values = _ref3.values,
          errors = _ref3.errors,
          handleSubmit = _ref3.handleSubmit,
          handleChange = _ref3.handleChange;
      var errs = Object.assign({}, serverErrors, errors);
      console.log(isLoading);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Register_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_components_Title__["a" /* default */], {
        type: "h2",
        center: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form", {
        action: "",
        onSubmit: handleSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
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
          lineNumber: 61
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        name: "email",
        label: "Email*",
        placeholder: "Email",
        type: "text",
        value: values.email,
        onChange: handleChange,
        error: errs.email,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D*",
        placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
        type: "tel",
        name: "phone",
        error: errs.phone,
        value: values.phone,
        onChange: handleChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
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
          lineNumber: 93
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_components_Button__["a" /* default */], {
        type: "submit",
        isLoading: isLoading,
        theme: "black",
        fullWidth: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }, "Register"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Register_css___default.a.already,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, "Already have an account?")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_components_Button__["a" /* default */], {
        type: "submit",
        theme: "gray",
        fullWidth: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, "Login")));
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
  register: __WEBPACK_IMPORTED_MODULE_9__actions__["a" /* register */]
})(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Register_css___default.a)(Register)));

/***/ }),

/***/ "./src/modules/User/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Register__ = __webpack_require__("./src/modules/User/components/Register/Register.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Register__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__("./src/modules/User/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sagas__ = __webpack_require__("./src/modules/User/sagas.js");




/* harmony default export */ __webpack_exports__["b"] = ({
  reducer: __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* default */],
  types: __WEBPACK_IMPORTED_MODULE_2__actionTypes__,
  saga: __WEBPACK_IMPORTED_MODULE_3__sagas__["a" /* default */]
});

/***/ }),

/***/ "./src/modules/User/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultState */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_utils__ = __webpack_require__("./src/modules/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");
var _createReducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var defaultState = {
  id: null,
  isActive: false,
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
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], {});
};

var fail = function fail(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], payload.data);
};

var start = function start(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], true).setIn(['register', 'errors'], {});
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["a" /* createReducer */])(defaultState, (_createReducer = {}, _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_FAIL, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(fail, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_SUCCESS, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(create, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_START, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(start, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _createReducer)));

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

          if (name === __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"]) {
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
  user: __WEBPACK_IMPORTED_MODULE_1_modules_User__["b" /* default */].reducer
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
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["all"])([__WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].saga(), __WEBPACK_IMPORTED_MODULE_2_modules_User__["b" /* default */].saga()]);

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
    path: '/contact',
    load: function load() {
      return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, "./src/routes/contact/index.js"));
    }
  }, {
    path: '/personal',
    load: function load() {
      return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, "./src/routes/lk/index.js"));
    }
  }, {
    path: '/about',
    load: function load() {
      return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, "./src/routes/about/index.js"));
    }
  }, {
    path: '/privacy',
    load: function load() {
      return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, "./src/routes/privacy/index.js"));
    }
  }, // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    path: '(.*)',
    load: function load() {
      return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, "./src/routes/not-found/index.js"));
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
            }, __WEBPACK_IMPORTED_MODULE_17_modules_User__["b" /* default */].types.NAME, __WEBPACK_IMPORTED_MODULE_16_seamless_immutable___default()(__WEBPACK_IMPORTED_MODULE_17_modules_User__["b" /* default */].reducer.defaultState));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIDI1ZDUwNzUyZTYwNzFlYjgyNGM4IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcIi4vYXNzZXRzLmpzb25cIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9BZGRUb0NhcmQvQWRkVG9DYXJkLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Jhbm5lci9jb21wb25lbnRzL0NvbnRlbnQvQ29udGVudC5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkL0NhcmQuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Db250YWluZXIvQ29udGFpbmVyLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9MYXlvdXQvTGF5b3V0LmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTG9nby9Mb2dvLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1NlcnZpY2VGZWF0dXJlcy9TZXJ2aWNlRmVhdHVyZXMuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RhYnMvVGFicy5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvVG9vbEJhci9Ub29sQmFyLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2hvbWUvSG9tZS5jc3MiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcz85MTg5IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9wYWNrYWdlLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzPzc2ZTMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0FjY2VudFByb2R1Y3RzL0FjY2VudFByb2R1Y3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzP2VmZjUiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CYW5uZXIvQmFubmVyLmNzcz9jOGVmIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CYW5uZXIvQmFubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Jhbm5lci9jb21wb25lbnRzL0NvbnRlbnQvQ29udGVudC5jc3M/NTIwZiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQmFubmVyL2NvbXBvbmVudHMvQ29udGVudC9Db250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uY3NzPzk0MTYiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmNzcz8xOTE2IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkL0NhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FyZEdyaWQvQ2FyZEdyaWQuY3NzPzk2MjgiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NhcmRHcmlkL0NhcmRHcmlkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzPzk3NjEiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9pY29ucy9zdG9jay5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyL0NvbnRhaW5lci5jc3M/MDliMCIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmNzcz81NzE1IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzPzI4NTkiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9JbnB1dC9JbnB1dC5jc3M/MTY0NyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9ybS9JbnB1dC9JbnB1dC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzcz8zNDk5IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9IdG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uY3NzP2Q1NGQiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGF5b3V0L0xheW91dC5jc3M/NDQ4NyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTGF5b3V0L0xheW91dC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTGluay9MaW5rLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xvZ28vTG9nby5jc3M/YTRhOSIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTG9nby9Mb2dvLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5jc3M/NTY1MyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1JhdGluZy9SYXRpbmcuY3NzP2EwMWMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1JhdGluZy9SYXRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5jc3M/NmUzMiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL2ljb25zL3BsYW4uc3ZnIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1NvY2lhbHNMaXN0L1NvY2lhbHNMaXN0LmNzcz83NWUyIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UYWJzL1RhYnMuY3NzPzQ3NGYiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RhYnMvVGFicy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3M/MTlkMSIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVG9vbEJhci9Ub29sQmFyLmNzcz84ZmIwIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Ub29sQmFyL1Rvb2xCYXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb25maWcuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb25zdGFudHMvaW5kZXguanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jcmVhdGVGZXRjaC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2hpc3RvcnkuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL0FwaS9hY3Rpb25zLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9BcGkvY29uc3RhbnRzLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9BcGkvaW5kZXguanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL0FwaS9tb2RlbC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvQXBpL3JlZHVjZXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL0FwaS9zYWdhcy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvQXBpL3NlbGVjdG9ycy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9hY3Rpb25UeXBlcy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9hY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9SZWdpc3Rlci9SZWdpc3Rlci5jc3M/NDhjNiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9Vc2VyL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9Vc2VyL3JlZHVjZXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvc2FnYXMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1ZhbGlkYXRvci9pbmRleC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvdXRpbHMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yZWR1Y2Vycy9pbmRleC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JlZHVjZXJzL3J1bnRpbWUuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yZWR1Y2Vycy91c2VyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm9vdFJlZHVjZXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb290U2FnYXMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuY3NzPzQ3OGYiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLmNzcz82OTVmIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2hvbWUvSG9tZS5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9ob21lL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvcm91dGVzL2luZGV4LmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvc2VydmVyLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvc3RvcmUvY29uZmlndXJlU3RvcmUuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9zdG9yZS9jcmVhdGVIZWxwZXJzLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvc3RvcmUvbG9nZ2VyL2xvZ2dlci5zZXJ2ZXIuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiY2xhc3NuYW1lc1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiZm9ybWlrXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwiaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImltbXV0YWJsZVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcImlzb21vcnBoaWMtZmV0Y2hcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcIm5vZGUtZmV0Y2hcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJudWthLWNhcm91c2VsXCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicGF0aFwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInByZXR0eS1lcnJvclwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyYy1zbGlkZXJcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWFjdFwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWFjdC1mb250YXdlc29tZVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicmVhY3Qtc2VsZWN0XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicmVhY3QtdGFic1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlYWN0LXRyZWViZWFyZFwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlZHV4XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2RldmVsb3BtZW50T25seVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInNlYW1sZXNzLWltbXV0YWJsZVwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInNlcmlhbGl6ZS1qYXZhc2NyaXB0XCIiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L2V4dGVybmFsIFwidW5pdmVyc2FsLXJvdXRlclwiIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9leHRlcm5hbCBcInV0aWxcIiIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvZXh0ZXJuYWwgXCJ5dXBcIiJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJ1cGRhdGVzL1wiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xyXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rLmlkLCBjaHVuay5tb2R1bGVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHRyeSB7XHJcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcInVwZGF0ZXMvXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiKTtcclxuIFx0XHR9IGNhdGNoKGUpIHtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuIFx0XHR9XHJcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cGRhdGUpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkgeyAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xyXG4gXHR9XHJcblxuIFx0XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMjVkNTA3NTJlNjA3MWViODI0YzhcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcclxuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XHJcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xyXG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcclxuIFx0XHRcdGlmKG1lLmhvdC5hY3RpdmUpIHtcclxuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xyXG4gXHRcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA8IDApXHJcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXHJcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuIFx0XHR9O1xyXG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XHJcbiBcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH07XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XHJcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuIFx0XHRcdFx0dGhyb3cgZXJyO1xyXG4gXHRcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xyXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcclxuIFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBmbjtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaG90ID0ge1xyXG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxyXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcclxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXHJcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxyXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxyXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxyXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxyXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXHJcbiBcdFx0fTtcclxuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XHJcbiBcdFx0cmV0dXJuIGhvdDtcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XHJcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcclxuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdERlZmVycmVkO1xyXG4gXHRcclxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXHJcbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XHJcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcclxuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcclxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdHJldHVybiBudWxsO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XHJcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcclxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxyXG4gXHRcdFx0XHR9O1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcclxuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcclxuIFx0XHRcdHJldHVybjtcclxuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcclxuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xyXG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XHJcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XHJcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xyXG4gXHRcdGlmKCFkZWZlcnJlZCkgcmV0dXJuO1xyXG4gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcclxuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXHJcbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cclxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcclxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcclxuIFx0XHRcdH0pLnRoZW4oXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdCk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiBcdFxyXG4gXHRcdHZhciBjYjtcclxuIFx0XHR2YXIgaTtcclxuIFx0XHR2YXIgajtcclxuIFx0XHR2YXIgbW9kdWxlO1xyXG4gXHRcdHZhciBtb2R1bGVJZDtcclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcclxuIFx0XHRcdFx0XHRpZDogaWRcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcclxuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fbWFpbikge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdGlmKCFwYXJlbnQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxyXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXHJcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxyXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XHJcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcclxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbiBcdFxyXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XHJcbiBcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCIpO1xyXG4gXHRcdH07XHJcbiBcdFxyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcclxuIFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuIFx0XHRcdFx0aWYoaG90VXBkYXRlW2lkXSkge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcclxuIFx0XHRcdFx0aWYocmVzdWx0LmNoYWluKSB7XHJcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHN3aXRjaChyZXN1bHQudHlwZSkge1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiIGluIFwiICsgcmVzdWx0LnBhcmVudElkICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGlzcG9zZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGRlZmF1bHQ6XHJcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGFib3J0RXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9BcHBseSkge1xyXG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdFx0XHRcdGZvcihtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihkb0Rpc3Bvc2UpIHtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxyXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xyXG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdHZhciBpZHg7XHJcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXHJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xyXG4gXHRcdFx0XHRpZighY2hpbGQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIGRlcGVuZGVuY3k7XHJcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKG1vZHVsZSkge1xyXG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGZvcihqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcclxuIFx0XHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XHJcbiBcdFxyXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcclxuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0XHRpZihjYikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcclxuIFx0XHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0b3JnaW5hbEVycm9yOiBlcnIsIC8vIFRPRE8gcmVtb3ZlIGluIHdlYnBhY2sgNFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyMjtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQ3OiAwXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSAwKSB7XG4gXHRcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vY2h1bmtzL1wiICsgKHtcIjBcIjpcInByb2R1Y3RzXCIsXCIxXCI6XCJyZWdpc3RlclwiLFwiMlwiOlwicHJpdmFjeVwiLFwiM1wiOlwiYWJvdXRcIixcIjRcIjpcIm5vdC1mb3VuZFwiLFwiNVwiOlwibGtcIixcIjZcIjpcImNvbnRhY3RcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIik7XG4gXHRcdFx0dmFyIG1vcmVNb2R1bGVzID0gY2h1bmsubW9kdWxlcywgY2h1bmtJZHMgPSBjaHVuay5pZHM7XG4gXHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjaHVua0lkcy5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gdW5jYXRjaGVkIGVycm9yIGhhbmRsZXIgZm9yIHdlYnBhY2sgcnVudGltZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikge1xuIFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuIFx0XHRcdHRocm93IGVycjsgLy8gY2F0Y2ggdGhpcyBlcnJvciBieSB1c2luZyBTeXN0ZW0uaW1wb3J0KCkuY2F0Y2goKVxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjVkNTA3NTJlNjA3MWViODI0YzgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2Fzc2V0cy5qc29uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiLi9hc3NldHMuanNvblwiXG4vLyBtb2R1bGUgaWQgPSAuL2Fzc2V0cy5qc29uXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qISBub3JtYWxpemUuY3NzIHY3LjAuMCB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW5cXG4gKiAgICBJRSBvbiBXaW5kb3dzIFBob25lIGFuZCBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzIChvcGluaW9uYXRlZCkuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqL1xcblxcbmFydGljbGUsXFxuYXNpZGUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5uYXYsXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRS5cXG4gKi9cXG5cXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5tYWluIHsgLyogMSAqL1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBtYXJnaW4gaW4gSUUgOC5cXG4gKi9cXG5cXG5maWd1cmUge1xcbiAgbWFyZ2luOiAxZW0gNDBweDtcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSBnYXBzIGluIGxpbmtzIHVuZGVybGluZSBpbiBpT1MgOCsgYW5kIFNhZmFyaSA4Ky5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1za2lwOiBvYmplY3RzOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctIGFuZCBGaXJlZm94IDM5LS5cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDtcXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgdGhlIGR1cGxpY2F0ZSBhcHBsaWNhdGlvbiBvZiBgYm9sZGVyYCBieSB0aGUgbmV4dCBydWxlIGluIFNhZmFyaSA2LlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzdHlsZSBpbiBBbmRyb2lkIDQuMy0uXFxuICovXFxuXFxuZGZuIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGJhY2tncm91bmQgYW5kIGNvbG9yIGluIElFIDktLlxcbiAqL1xcblxcbm1hcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKi9cXG5cXG5hdWRpbyxcXG52aWRlbyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGlPUyA0LTcuXFxuICovXFxuXFxuYXVkaW86bm90KFtjb250cm9sc10pIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAtLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEhpZGUgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqL1xcblxcbnN2Zzpub3QoOnJvb3QpIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gUHJldmVudCBhIFdlYktpdCBidWcgd2hlcmUgKDIpIGRlc3Ryb3lzIG5hdGl2ZSBgYXVkaW9gIGFuZCBgdmlkZW9gXFxuICogICAgY29udHJvbHMgaW4gQW5kcm9pZCA0LlxcbiAqIDIuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmh0bWwgW3R5cGU9XFxcImJ1dHRvblxcXCJdLCAvKiAxICovXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyAvKiAxICovXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRS5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAtLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC0uXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzLCAvKiAxICovXFxubWVudSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIFNjcmlwdGluZ1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICovXFxuXFxuY2FudmFzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyogSGlkZGVuXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC0uXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSw0RUFBNEU7O0FBRTVFO2dGQUNnRjs7QUFFaEY7Ozs7R0FJRzs7QUFFSDtFQUNFLGtCQUFrQixDQUFDLE9BQU87RUFDMUIsMkJBQTJCLENBQUMsT0FBTztFQUNuQywrQkFBK0IsQ0FBQyxPQUFPO0NBQ3hDOztBQUVEO2dGQUNnRjs7QUFFaEY7O0dBRUc7O0FBRUg7RUFDRSxVQUFVO0NBQ1g7O0FBRUQ7O0dBRUc7O0FBRUg7Ozs7OztFQU1FLGVBQWU7Q0FDaEI7O0FBRUQ7OztHQUdHOztBQUVIO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtDQUNsQjs7QUFFRDtnRkFDZ0Y7O0FBRWhGOzs7R0FHRzs7QUFFSDs7T0FFTyxPQUFPO0VBQ1osZUFBZTtDQUNoQjs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLGlCQUFpQjtDQUNsQjs7QUFFRDs7O0dBR0c7O0FBRUg7RUFDRSxnQ0FBZ0M7VUFDeEIsd0JBQXdCLENBQUMsT0FBTztFQUN4QyxVQUFVLENBQUMsT0FBTztFQUNsQixrQkFBa0IsQ0FBQyxPQUFPO0NBQzNCOztBQUVEOzs7R0FHRzs7QUFFSDtFQUNFLGtDQUFrQyxDQUFDLE9BQU87RUFDMUMsZUFBZSxDQUFDLE9BQU87Q0FDeEI7O0FBRUQ7Z0ZBQ2dGOztBQUVoRjs7O0dBR0c7O0FBRUg7RUFDRSw4QkFBOEIsQ0FBQyxPQUFPO0VBQ3RDLHNDQUFzQyxDQUFDLE9BQU87Q0FDL0M7O0FBRUQ7OztHQUdHOztBQUVIO0VBQ0Usb0JBQW9CLENBQUMsT0FBTztFQUM1QiwyQkFBMkIsQ0FBQyxPQUFPO0VBQ25DLDBDQUEwQztVQUNsQyxrQ0FBa0MsQ0FBQyxPQUFPO0NBQ25EOztBQUVEOztHQUVHOztBQUVIOztFQUVFLHFCQUFxQjtDQUN0Qjs7QUFFRDs7R0FFRzs7QUFFSDs7RUFFRSxvQkFBb0I7Q0FDckI7O0FBRUQ7OztHQUdHOztBQUVIOzs7RUFHRSxrQ0FBa0MsQ0FBQyxPQUFPO0VBQzFDLGVBQWUsQ0FBQyxPQUFPO0NBQ3hCOztBQUVEOztHQUVHOztBQUVIO0VBQ0UsbUJBQW1CO0NBQ3BCOztBQUVEOztHQUVHOztBQUVIO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7Q0FDYjs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLGVBQWU7Q0FDaEI7O0FBRUQ7OztHQUdHOztBQUVIOztFQUVFLGVBQWU7RUFDZixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLHlCQUF5QjtDQUMxQjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLFlBQVk7Q0FDYjs7QUFFRDtnRkFDZ0Y7O0FBRWhGOztHQUVHOztBQUVIOztFQUVFLHNCQUFzQjtDQUN2Qjs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLGNBQWM7RUFDZCxVQUFVO0NBQ1g7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxtQkFBbUI7Q0FDcEI7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7Z0ZBQ2dGOztBQUVoRjs7O0dBR0c7O0FBRUg7Ozs7O0VBS0Usd0JBQXdCLENBQUMsT0FBTztFQUNoQyxnQkFBZ0IsQ0FBQyxPQUFPO0VBQ3hCLGtCQUFrQixDQUFDLE9BQU87RUFDMUIsVUFBVSxDQUFDLE9BQU87Q0FDbkI7O0FBRUQ7OztHQUdHOztBQUVIO1FBQ1EsT0FBTztFQUNiLGtCQUFrQjtDQUNuQjs7QUFFRDs7O0dBR0c7O0FBRUg7U0FDUyxPQUFPO0VBQ2QscUJBQXFCO0NBQ3RCOztBQUVEOzs7O0dBSUc7O0FBRUg7Ozs7RUFJRSwyQkFBMkIsQ0FBQyxPQUFPO0NBQ3BDOztBQUVEOztHQUVHOztBQUVIOzs7O0VBSUUsbUJBQW1CO0VBQ25CLFdBQVc7Q0FDWjs7QUFFRDs7R0FFRzs7QUFFSDs7OztFQUlFLCtCQUErQjtDQUNoQzs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLCtCQUErQjtDQUNoQzs7QUFFRDs7Ozs7R0FLRzs7QUFFSDtFQUNFLCtCQUErQjtVQUN2Qix1QkFBdUIsQ0FBQyxPQUFPO0VBQ3ZDLGVBQWUsQ0FBQyxPQUFPO0VBQ3ZCLGVBQWUsQ0FBQyxPQUFPO0VBQ3ZCLGdCQUFnQixDQUFDLE9BQU87RUFDeEIsV0FBVyxDQUFDLE9BQU87RUFDbkIsb0JBQW9CLENBQUMsT0FBTztDQUM3Qjs7QUFFRDs7O0dBR0c7O0FBRUg7RUFDRSxzQkFBc0IsQ0FBQyxPQUFPO0VBQzlCLHlCQUF5QixDQUFDLE9BQU87Q0FDbEM7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxlQUFlO0NBQ2hCOztBQUVEOzs7R0FHRzs7QUFFSDs7RUFFRSwrQkFBK0I7VUFDdkIsdUJBQXVCLENBQUMsT0FBTztFQUN2QyxXQUFXLENBQUMsT0FBTztDQUNwQjs7QUFFRDs7R0FFRzs7QUFFSDs7RUFFRSxhQUFhO0NBQ2Q7O0FBRUQ7OztHQUdHOztBQUVIO0VBQ0UsOEJBQThCLENBQUMsT0FBTztFQUN0QyxxQkFBcUIsQ0FBQyxPQUFPO0NBQzlCOztBQUVEOztHQUVHOztBQUVIOztFQUVFLHlCQUF5QjtDQUMxQjs7QUFFRDs7O0dBR0c7O0FBRUg7RUFDRSwyQkFBMkIsQ0FBQyxPQUFPO0VBQ25DLGNBQWMsQ0FBQyxPQUFPO0NBQ3ZCOztBQUVEO2dGQUNnRjs7QUFFaEY7OztHQUdHOztBQUVIOztFQUVFLGVBQWU7Q0FDaEI7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxtQkFBbUI7Q0FDcEI7O0FBRUQ7Z0ZBQ2dGOztBQUVoRjs7R0FFRzs7QUFFSDtFQUNFLHNCQUFzQjtDQUN2Qjs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLGNBQWM7Q0FDZjs7QUFFRDtnRkFDZ0Y7O0FBRWhGOztHQUVHOztBQUVIO0VBQ0UsY0FBYztDQUNmXCIsXCJmaWxlXCI6XCJub3JtYWxpemUuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY3LjAuMCB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW5cXG4gKiAgICBJRSBvbiBXaW5kb3dzIFBob25lIGFuZCBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzIChvcGluaW9uYXRlZCkuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqL1xcblxcbmFydGljbGUsXFxuYXNpZGUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5uYXYsXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRS5cXG4gKi9cXG5cXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5tYWluIHsgLyogMSAqL1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBtYXJnaW4gaW4gSUUgOC5cXG4gKi9cXG5cXG5maWd1cmUge1xcbiAgbWFyZ2luOiAxZW0gNDBweDtcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSBnYXBzIGluIGxpbmtzIHVuZGVybGluZSBpbiBpT1MgOCsgYW5kIFNhZmFyaSA4Ky5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1za2lwOiBvYmplY3RzOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctIGFuZCBGaXJlZm94IDM5LS5cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDtcXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgdGhlIGR1cGxpY2F0ZSBhcHBsaWNhdGlvbiBvZiBgYm9sZGVyYCBieSB0aGUgbmV4dCBydWxlIGluIFNhZmFyaSA2LlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzdHlsZSBpbiBBbmRyb2lkIDQuMy0uXFxuICovXFxuXFxuZGZuIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGJhY2tncm91bmQgYW5kIGNvbG9yIGluIElFIDktLlxcbiAqL1xcblxcbm1hcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKi9cXG5cXG5hdWRpbyxcXG52aWRlbyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGlPUyA0LTcuXFxuICovXFxuXFxuYXVkaW86bm90KFtjb250cm9sc10pIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAtLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEhpZGUgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqL1xcblxcbnN2Zzpub3QoOnJvb3QpIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gUHJldmVudCBhIFdlYktpdCBidWcgd2hlcmUgKDIpIGRlc3Ryb3lzIG5hdGl2ZSBgYXVkaW9gIGFuZCBgdmlkZW9gXFxuICogICAgY29udHJvbHMgaW4gQW5kcm9pZCA0LlxcbiAqIDIuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmh0bWwgW3R5cGU9XFxcImJ1dHRvblxcXCJdLCAvKiAxICovXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyAvKiAxICovXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRS5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAtLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC0uXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzLCAvKiAxICovXFxubWVudSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIFNjcmlwdGluZ1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICovXFxuXFxuY2FudmFzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyogSGlkZGVuXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC0uXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0xIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkFjY2VudFByb2R1Y3RzLXJvb3QtMnBhbnUge1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBzdHJldGNoO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbiAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1pdGVtLTNWWjh5IHtcXG4gIC1tcy1mbGV4LXBvc2l0aXZlOiAwO1xcbiAgICAgIGZsZXgtZ3JvdzogMDtcXG4gIC1tcy1mbGV4LW5lZ2F0aXZlOiAwO1xcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICAgICAgZmxleC1iYXNpczogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIG1heC13aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIHdpZHRoOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbn1cXG5cXG4uQWNjZW50UHJvZHVjdHMtaXRlbS0zVlo4eTpudGgtY2hpbGQoMW4pIHtcXG4gIG1hcmdpbi1yaWdodDogMzBweDtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG5cXG4uQWNjZW50UHJvZHVjdHMtaXRlbS0zVlo4eTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLWl0ZW0tM1ZaOHk6bnRoLWNoaWxkKDRuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLXByb2R1Y3QtMXY2U3Age1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDYyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MywgMjQ2LCAyNDkpO1xcbn1cXG5cXG4uQWNjZW50UHJvZHVjdHMtcHJvZHVjdFNtYWxsLTJ1T3FHIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtbXMtZmxleC1hbGlnbjogc3RhcnQ7XFxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nLWxlZnQ6IDQwcHg7XFxuICBtYXgtaGVpZ2h0OiAzNDRweDtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxuICBtaW4taGVpZ2h0OiAzNDRweFxcbn1cXG5cXG4uQWNjZW50UHJvZHVjdHMtcHJvZHVjdFNtYWxsLTJ1T3FHOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLXByb2R1Y3RCaWctamk3aE0ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZy10b3A6IDEwMHB4O1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uQWNjZW50UHJvZHVjdHMtcmlnaHQtMnpwQWgge1xcbiAgLW1zLWZsZXgtYWxpZ246IGVuZDtcXG4gICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIHBhZGRpbmctcmlnaHQ6IDQwcHg7XFxufVxcblxcbi5BY2NlbnRQcm9kdWN0cy1uYW1lLTJNUFdyLCAuQWNjZW50UHJvZHVjdHMtcHJpY2UtMldzSjEge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLW5hbWUtMk1QV3Ige1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLXByaWNlLTJXc0oxIHtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMzBweDtcXG59XFxuXFxuLkFjY2VudFByb2R1Y3RzLXByaWNlLTJXc0oxIHNwYW4ge1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjE4cHg7XFxuICB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2Qsd0JBQXdCO01BQ3BCLHFCQUFxQjtFQUN6Qix1QkFBdUI7TUFDbkIsK0JBQStCO0NBQ3BDOztBQUVEO0VBQ0UscUJBQXFCO01BQ2pCLGFBQWE7RUFDakIscUJBQXFCO01BQ2pCLGVBQWU7RUFDbkIsZ0RBQWdEO01BQzVDLG1DQUFtQztFQUN2QyxrQ0FBa0M7RUFDbEMsOEJBQThCO0NBQy9COztBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLGVBQWU7Q0FDaEI7O0FBRUQ7RUFDRSxnQkFBZ0I7Q0FDakI7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIscUNBQXFDO0NBQ3RDOztBQUVEO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCwyQkFBMkI7TUFDdkIsdUJBQXVCO0VBQzNCLHNCQUFzQjtNQUNsQix3QkFBd0I7RUFDNUIsc0JBQXNCO01BQ2xCLHdCQUF3QjtFQUM1QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLG9CQUFvQjtFQUNwQixpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHNCQUFzQjtNQUNsQix3QkFBd0I7RUFDNUIsdUJBQXVCO01BQ25CLG9CQUFvQjtDQUN6Qjs7QUFFRDtFQUNFLG9CQUFvQjtNQUNoQixzQkFBc0I7RUFDMUIsa0JBQWtCO0VBQ2xCLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGlDQUFpQztDQUNsQzs7QUFFRDtFQUNFLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0NBQ25COztBQUVEO0lBQ0ksZ0JBQWdCO0lBQ2hCLHVCQUF1QjtHQUN4QlwiLFwiZmlsZVwiOlwiQWNjZW50UHJvZHVjdHMuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5yb290IHtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogc3RyZXRjaDtcXG4gICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uaXRlbSB7XFxuICAtbXMtZmxleC1wb3NpdGl2ZTogMDtcXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAtbXMtZmxleC1uZWdhdGl2ZTogMDtcXG4gICAgICBmbGV4LXNocmluazogMDtcXG4gIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgICAgIGZsZXgtYmFzaXM6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICBtYXgtd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICB3aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG59XFxuXFxuLml0ZW06bnRoLWNoaWxkKDFuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLml0ZW06bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5pdGVtOm50aC1jaGlsZCg0bikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi5wcm9kdWN0IHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiA2MjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDMsIDI0NiwgMjQ5KTtcXG59XFxuXFxuLnByb2R1Y3RTbWFsbCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgLW1zLWZsZXgtYWxpZ246IHN0YXJ0O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZy1sZWZ0OiA0MHB4O1xcbiAgbWF4LWhlaWdodDogMzQ0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgbWluLWhlaWdodDogMzQ0cHhcXG59XFxuXFxuLnByb2R1Y3RTbWFsbDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcblxcbi5wcm9kdWN0QmlnIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiAxMDBweDtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnJpZ2h0IHtcXG4gIC1tcy1mbGV4LWFsaWduOiBlbmQ7XFxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBwYWRkaW5nLXJpZ2h0OiA0MHB4O1xcbn1cXG5cXG4ubmFtZSwgLnByaWNlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5uYW1lIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5wcmljZSB7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5wcmljZSBzcGFuIHtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xOHB4O1xcbiAgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiQWNjZW50UHJvZHVjdHMtcm9vdC0ycGFudVwiLFxuXHRcIml0ZW1cIjogXCJBY2NlbnRQcm9kdWN0cy1pdGVtLTNWWjh5XCIsXG5cdFwicHJvZHVjdFwiOiBcIkFjY2VudFByb2R1Y3RzLXByb2R1Y3QtMXY2U3BcIixcblx0XCJwcm9kdWN0U21hbGxcIjogXCJBY2NlbnRQcm9kdWN0cy1wcm9kdWN0U21hbGwtMnVPcUdcIixcblx0XCJwcm9kdWN0QmlnXCI6IFwiQWNjZW50UHJvZHVjdHMtcHJvZHVjdEJpZy1qaTdoTVwiLFxuXHRcInJpZ2h0XCI6IFwiQWNjZW50UHJvZHVjdHMtcmlnaHQtMnpwQWhcIixcblx0XCJuYW1lXCI6IFwiQWNjZW50UHJvZHVjdHMtbmFtZS0yTVBXclwiLFxuXHRcInByaWNlXCI6IFwiQWNjZW50UHJvZHVjdHMtcHJpY2UtMldzSjFcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQWRkVG9DYXJkLXJvb3QtemJSRnIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICB3aWR0aDogMTAxcHg7XFxuICBoZWlnaHQ6IDEwMXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgY29sb3I6ICNmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbiAgLW8tdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxufVxcblxcbi5BZGRUb0NhcmQtaWNvbi0xQnhIWCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi10b3A6IDI2cHg7XFxufVxcblxcbi5BZGRUb0NhcmQtbGFiZWwtMkVKRnMge1xcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG59XFxuXFxuLkFkZFRvQ2FyZC12aXNpYmxlLTJ5LWdqIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxVQUFVO0VBQ1YseUNBQXlDO01BQ3JDLHFDQUFxQztVQUNqQyxpQ0FBaUM7RUFDekMsYUFBYTtFQUNiLGNBQWM7RUFDZCxxQ0FBcUM7RUFDckMsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLHdDQUF3QztFQUN4QyxtQ0FBbUM7RUFDbkMsZ0NBQWdDO0NBQ2pDOztBQUVEO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtDQUNsQjs7QUFFRDtFQUNFLDBCQUEwQjtFQUMxQixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOztBQUVEO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtDQUNqQlwiLFwiZmlsZVwiOlwiQWRkVG9DYXJkLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIHdpZHRoOiAxMDFweDtcXG4gIGhlaWdodDogMTAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxuICAtby10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG59XFxuXFxuLmljb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAyNnB4O1xcbn1cXG5cXG4ubGFiZWwge1xcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG59XFxuXFxuLnZpc2libGUge1xcbiAgb3BhY2l0eTogMTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJBZGRUb0NhcmQtcm9vdC16YlJGclwiLFxuXHRcImljb25cIjogXCJBZGRUb0NhcmQtaWNvbi0xQnhIWFwiLFxuXHRcImxhYmVsXCI6IFwiQWRkVG9DYXJkLWxhYmVsLTJFSkZzXCIsXG5cdFwidmlzaWJsZVwiOiBcIkFkZFRvQ2FyZC12aXNpYmxlLTJ5LWdqXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQWRkVG9DYXJkL0FkZFRvQ2FyZC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5CYW5uZXItcm9vdC0zcjFqYyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzLCAyNDYsIDI0OSk7XFxufVxcblxcbi5CYW5uZXItYXJyb3ctdXY1TEgge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSlcXG59XFxuXFxuLkJhbm5lci1hcnJvd1JpZ2h0LTFjNVJCIHtcXG4gIHJpZ2h0OiA0MHB4O1xcbn1cXG5cXG4uQmFubmVyLWFycm93TGVmdC0xOWwyYyB7XFxuICBsZWZ0OiA0MHB4O1xcbn1cXG5cXG4uQmFubmVyLWRvdHMtMTJRSlQge1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxMXB4O1xcbiAgaGVpZ2h0OiAxMXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDUxLCA1MSwgNTEpXFxufVxcblxcbi5CYW5uZXItZG90cy0xMlFKVDpsc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cXG4uQmFubmVyLWFjdGl2ZURvdC0xbzdGSiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0Jhbm5lci9CYW5uZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLHFDQUFxQztDQUN0Qzs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsU0FBUztFQUNULG9DQUFvQztNQUNoQyxnQ0FBZ0M7VUFDNUIsMkJBQTJCO0NBQ3BDOztBQUVEO0VBQ0UsWUFBWTtDQUNiOztBQUVEO0VBQ0UsV0FBVztDQUNaOztBQUVEO0VBQ0Usb0JBQW9CO0VBQ3BCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGlDQUFpQztDQUNsQzs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGtDQUFrQztDQUNuQ1wiLFwiZmlsZVwiOlwiQmFubmVyLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzLCAyNDYsIDI0OSk7XFxufVxcblxcbi5hcnJvdyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKVxcbn1cXG5cXG4uYXJyb3dSaWdodCB7XFxuICByaWdodDogNDBweDtcXG59XFxuXFxuLmFycm93TGVmdCB7XFxuICBsZWZ0OiA0MHB4O1xcbn1cXG5cXG4uZG90cyB7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDExcHg7XFxuICBoZWlnaHQ6IDExcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoNTEsIDUxLCA1MSlcXG59XFxuXFxuLmRvdHM6bHN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLmFjdGl2ZURvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiQmFubmVyLXJvb3QtM3IxamNcIixcblx0XCJhcnJvd1wiOiBcIkJhbm5lci1hcnJvdy11djVMSFwiLFxuXHRcImFycm93UmlnaHRcIjogXCJCYW5uZXItYXJyb3dSaWdodC0xYzVSQlwiLFxuXHRcImFycm93TGVmdFwiOiBcIkJhbm5lci1hcnJvd0xlZnQtMTlsMmNcIixcblx0XCJkb3RzXCI6IFwiQmFubmVyLWRvdHMtMTJRSlRcIixcblx0XCJhY3RpdmVEb3RcIjogXCJCYW5uZXItYWN0aXZlRG90LTFvN0ZKXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0Jhbm5lci9CYW5uZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5Db250ZW50LXJvb3QtTGlUN3Ige1xcbiAgbWFyZ2luLWxlZnQ6IGNhbGMoOC4zMjUlICsgMi41cHgpICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiA1MTRweDtcXG59LkNvbnRlbnQtcm9vdC1MaVQ3ciA+ICoge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICByaWdodDogYXV0bztcXG4gIGJvdHRvbTogYXV0bztcXG4gIGxlZnQ6IDUwJTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuLkNvbnRlbnQtdGl0bGUtMWVHMVoge1xcbiAgbWFyZ2luOiAwIDAgMTBweCAwO1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xcbn1cXG5cXG4uQ29udGVudC1wcmljZVdyYXBwZXItMWRVclMge1xcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLkNvbnRlbnQtcHJpY2UtMVMtRDkge1xcbiAgZm9udC1zaXplOiA1MHB4O1xcbn1cXG5cXG4uQ29udGVudC1jdXJyZW5jeS0xTnJCdCB7XFxuICBmb250LXNpemU6IDM1cHg7XFxufVxcblxcbi5Db250ZW50LXJhdGluZy1TWDVZNSB7XFxuICBtYXJnaW4tYm90dG9tOiA1MXB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsNkNBQTZDO0VBQzdDLG1CQUFtQjtFQUNuQixrQkFBa0I7Q0FDbkI7RUFDQyxtQkFBbUI7RUFDbkIsU0FBUztFQUNULFlBQVk7RUFDWixhQUFhO0VBQ2IsVUFBVTtFQUNWLHlDQUF5QztNQUNyQyxxQ0FBcUM7VUFDakMsaUNBQWlDO0NBQzFDOztBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSxvQkFBb0I7RUFDcEIsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxpQkFBaUI7RUFDakIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0Usb0JBQW9CO0NBQ3JCXCIsXCJmaWxlXCI6XCJDb250ZW50LmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBtYXJnaW4tbGVmdDogY2FsYyg4LjMyNSUgKyAyLjVweCkgIWltcG9ydGFudDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDUxNHB4O1xcbn0ucm9vdCA+ICoge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICByaWdodDogYXV0bztcXG4gIGJvdHRvbTogYXV0bztcXG4gIGxlZnQ6IDUwJTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIG1hcmdpbjogMCAwIDEwcHggMDtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMzRweDtcXG59XFxuXFxuLnByaWNlV3JhcHBlciB7XFxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4ucHJpY2Uge1xcbiAgZm9udC1zaXplOiA1MHB4O1xcbn1cXG5cXG4uY3VycmVuY3kge1xcbiAgZm9udC1zaXplOiAzNXB4O1xcbn1cXG5cXG4ucmF0aW5nIHtcXG4gIG1hcmdpbi1ib3R0b206IDUxcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiQ29udGVudC1yb290LUxpVDdyXCIsXG5cdFwidGl0bGVcIjogXCJDb250ZW50LXRpdGxlLTFlRzFaXCIsXG5cdFwicHJpY2VXcmFwcGVyXCI6IFwiQ29udGVudC1wcmljZVdyYXBwZXItMWRVclNcIixcblx0XCJwcmljZVwiOiBcIkNvbnRlbnQtcHJpY2UtMVMtRDlcIixcblx0XCJjdXJyZW5jeVwiOiBcIkNvbnRlbnQtY3VycmVuY3ktMU5yQnRcIixcblx0XCJyYXRpbmdcIjogXCJDb250ZW50LXJhdGluZy1TWDVZNVwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQmFubmVyL2NvbXBvbmVudHMvQ29udGVudC9Db250ZW50LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkJ1dHRvbi1yb290LTFaNVk4IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBwYWRkaW5nOiAxNnB4IDM2cHg7XFxuICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTZweDtcXG4gIGJvcmRlci1yYWRpdXM6IDI0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uQnV0dG9uLWJsYWNrLTJuOXJVIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uQnV0dG9uLWdyYXktMnFHbl8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzOCwgMjM4LCAyMzgpO1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG59XFxuXFxuLkJ1dHRvbi1mdWxsV2lkdGgtMUMwb0oge1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixvQkFBb0I7RUFDcEIsa0NBQWtDO0VBQ2xDLGNBQWM7RUFDZCxhQUFhO0VBQ2IsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0Usd0JBQXdCO0NBQ3pCOztBQUVEO0VBQ0UscUNBQXFDO0VBQ3JDLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLFlBQVk7Q0FDYlwiLFwiZmlsZVwiOlwiQnV0dG9uLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogMTZweCAzNnB4O1xcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE2cHg7XFxuICBib3JkZXItcmFkaXVzOiAyNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uZ3JheSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM4LCAyMzgsIDIzOCk7XFxuICBjb2xvcjogcmdiKDAsIDAsIDApO1xcbn1cXG5cXG4uZnVsbFdpZHRoIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkJ1dHRvbi1yb290LTFaNVk4XCIsXG5cdFwiYmxhY2tcIjogXCJCdXR0b24tYmxhY2stMm45clVcIixcblx0XCJncmF5XCI6IFwiQnV0dG9uLWdyYXktMnFHbl9cIixcblx0XCJmdWxsV2lkdGhcIjogXCJCdXR0b24tZnVsbFdpZHRoLTFDMG9KXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQnV0dG9uL0J1dHRvbi5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5DYXJkLXJvb3QtM0RQX1Yge1xcbiAgbWF4LXdpZHRoOiAyNzBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcblxcbi5DYXJkLWhlYWRlci0xV2NsSyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcblxcbi5DYXJkLWlubmVyLWJjRlozIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMzgycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzLCAyNDYsIDI0OSk7XFxufVxcblxcblxcbi5DYXJkLWZvb3Rlci0zZnpYUCB7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcblxcblxcbi5DYXJkLWZvb3RlckhlYWRlci0xaG1JdiB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE2cHg7XFxufVxcblxcblxcbi5DYXJkLWJyYW5kLTJQYy1HIHtcXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxufVxcblxcblxcbi5DYXJkLWxpa2UtMXBSREUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDIxcHg7XFxuICB0b3A6IDIxcHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIDAuMnMgbGluZWFyO1xcbiAgLW8tdHJhbnNpdGlvbjogY29sb3IgMC4ycyBsaW5lYXI7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGxpbmVhcjtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBjdXJzb3I6IHBvaW50ZXJcXG59XFxuXFxuXFxuLkNhcmQtbGlrZS0xcFJERTpob3ZlciB7XFxuICBjb2xvcjogcmdiKDAsIDAsIDApO1xcbn1cXG5cXG5cXG4uQ2FyZC1kaXNhYmxlZC0zUjZmYiAuQ2FyZC1mb290ZXJIZWFkZXItMWhtSXYge1xcbiAgY29sb3I6IHJnYmEoMTcsIDE3LCAxNywgMC4yKTtcXG59XFxuXFxuXFxuLkNhcmQtZGlzYWJsZWQtM1I2ZmIgLkNhcmQtYnJhbmQtMlBjLUcge1xcbiAgY29sb3I6IHJnYmEoMTUzLCAxNTMsIDE1MywgMC4yKTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7Q0FDbEI7OztBQUdEO0VBQ0UsbUJBQW1CO0NBQ3BCOzs7QUFHRDtFQUNFLG1CQUFtQjtFQUNuQixjQUFjO0VBQ2QscUNBQXFDO0NBQ3RDOzs7QUFHRDtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7Q0FDeEI7OztBQUdEO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0VBQ3hCLHVCQUF1QjtNQUNuQiwrQkFBK0I7RUFDbkMsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix1QkFBdUI7Q0FDeEI7OztBQUdEO0VBQ0UsMEJBQTBCO0VBQzFCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix1QkFBdUI7Q0FDeEI7OztBQUdEO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixVQUFVO0VBQ1Ysc0NBQXNDO0VBQ3RDLGlDQUFpQztFQUNqQyw4QkFBOEI7RUFDOUIsMEJBQTBCO0VBQzFCLGVBQWU7Q0FDaEI7OztBQUdEO0VBQ0Usb0JBQW9CO0NBQ3JCOzs7QUFHRDtFQUNFLDZCQUE2QjtDQUM5Qjs7O0FBR0Q7RUFDRSxnQ0FBZ0M7Q0FDakNcIixcImZpbGVcIjpcIkNhcmQuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5yb290IHtcXG4gIG1heC13aWR0aDogMjcwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5cXG4uaGVhZGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuXFxuLmlubmVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMzgycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzLCAyNDYsIDI0OSk7XFxufVxcblxcblxcbi5mb290ZXIge1xcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG5cXG5cXG4uZm9vdGVySGVhZGVyIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTZweDtcXG59XFxuXFxuXFxuLmJyYW5kIHtcXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxufVxcblxcblxcbi5saWtlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAyMXB4O1xcbiAgdG9wOiAyMXB4O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciAwLjJzIGxpbmVhcjtcXG4gIC1vLXRyYW5zaXRpb246IGNvbG9yIDAuMnMgbGluZWFyO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBsaW5lYXI7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY3Vyc29yOiBwb2ludGVyXFxufVxcblxcblxcbi5saWtlOmhvdmVyIHtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxufVxcblxcblxcbi5kaXNhYmxlZCAuZm9vdGVySGVhZGVyIHtcXG4gIGNvbG9yOiByZ2JhKDE3LCAxNywgMTcsIDAuMik7XFxufVxcblxcblxcbi5kaXNhYmxlZCAuYnJhbmQge1xcbiAgY29sb3I6IHJnYmEoMTUzLCAxNTMsIDE1MywgMC4yKTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJDYXJkLXJvb3QtM0RQX1ZcIixcblx0XCJoZWFkZXJcIjogXCJDYXJkLWhlYWRlci0xV2NsS1wiLFxuXHRcImlubmVyXCI6IFwiQ2FyZC1pbm5lci1iY0ZaM1wiLFxuXHRcImZvb3RlclwiOiBcIkNhcmQtZm9vdGVyLTNmelhQXCIsXG5cdFwiZm9vdGVySGVhZGVyXCI6IFwiQ2FyZC1mb290ZXJIZWFkZXItMWhtSXZcIixcblx0XCJicmFuZFwiOiBcIkNhcmQtYnJhbmQtMlBjLUdcIixcblx0XCJsaWtlXCI6IFwiQ2FyZC1saWtlLTFwUkRFXCIsXG5cdFwiZGlzYWJsZWRcIjogXCJDYXJkLWRpc2FibGVkLTNSNmZiXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0NhcmQvQ2FyZC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9DYXJkL0NhcmQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQ2FyZEdyaWQtcm9vdC00S1JmdyB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBzdGFydDtcXG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIC1tcy1mbGV4LXBhY2s6IHN0YXJ0O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIC1tcy1mbGV4LXdyYXA6IHdyYXA7XFxuICAgICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4uQ2FyZEdyaWQtaXRlbS1rMkhZSyB7XFxuICB3aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcblxcbi5DYXJkR3JpZC1pdGVtLWsySFlLOm50aC1jaGlsZCgxbikge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBjbGVhcjogbm9uZTtcXG59XFxuXFxuLkNhcmRHcmlkLWl0ZW0tazJIWUs6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5DYXJkR3JpZC1pdGVtLWsySFlLOm50aC1jaGlsZCg0bikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG5cXG4uQ2FyZEdyaWQtaXRlbS1rMkhZSzpudGgtY2hpbGQoNG4gKyAxKSB7XFxuICBjbGVhcjogYm90aDtcXG59XFxuXFxuLkNhcmRHcmlkLWl0ZW0tMy0zMGdlaSAuQ2FyZEdyaWQtaXRlbS1rMkhZSyB7XFxuICAgIHdpZHRoOiBjYWxjKDMzLjMlIC0gMjBweCk7XFxuICB9XFxuXFxuLkNhcmRHcmlkLWl0ZW0tMy0zMGdlaSAuQ2FyZEdyaWQtaXRlbS1rMkhZSzpudGgtY2hpbGQoMW4pIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbi1yaWdodDogMzBweDtcXG4gICAgY2xlYXI6IG5vbmU7XFxuICB9XFxuXFxuLkNhcmRHcmlkLWl0ZW0tMy0zMGdlaSAuQ2FyZEdyaWQtaXRlbS1rMkhZSzpsYXN0LWNoaWxkIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgfVxcblxcbi5DYXJkR3JpZC1pdGVtLTMtMzBnZWkgLkNhcmRHcmlkLWl0ZW0tazJIWUs6bnRoLWNoaWxkKDNuKSB7XFxuICAgIG1hcmdpbi1yaWdodDogMDtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgfVxcblxcbi5DYXJkR3JpZC1pdGVtLTMtMzBnZWkgLkNhcmRHcmlkLWl0ZW0tazJIWUs6bnRoLWNoaWxkKDNuICsgMSkge1xcbiAgICBjbGVhcjogYm90aDtcXG4gIH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCxzQkFBc0I7TUFDbEIsd0JBQXdCO0VBQzVCLHFCQUFxQjtNQUNqQiw0QkFBNEI7RUFDaEMsb0JBQW9CO01BQ2hCLGdCQUFnQjtDQUNyQjs7QUFFRDtFQUNFLDhCQUE4QjtFQUM5QixvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0NBQ2Q7O0FBRUQ7RUFDRSxZQUFZO0NBQ2I7O0FBRUQ7SUFDSSwwQkFBMEI7R0FDM0I7O0FBRUg7SUFDSSxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFlBQVk7R0FDYjs7QUFFSDtJQUNJLGdCQUFnQjtHQUNqQjs7QUFFSDtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0dBQ2Q7O0FBRUg7SUFDSSxZQUFZO0dBQ2JcIixcImZpbGVcIjpcIkNhcmRHcmlkLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBzdGFydDtcXG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIC1tcy1mbGV4LXBhY2s6IHN0YXJ0O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIC1tcy1mbGV4LXdyYXA6IHdyYXA7XFxuICAgICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4uaXRlbSB7XFxuICB3aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcblxcbi5pdGVtOm50aC1jaGlsZCgxbikge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBjbGVhcjogbm9uZTtcXG59XFxuXFxuLml0ZW06bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5pdGVtOm50aC1jaGlsZCg0bikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG5cXG4uaXRlbTpudGgtY2hpbGQoNG4gKyAxKSB7XFxuICBjbGVhcjogYm90aDtcXG59XFxuXFxuLml0ZW0tMyAuaXRlbSB7XFxuICAgIHdpZHRoOiBjYWxjKDMzLjMlIC0gMjBweCk7XFxuICB9XFxuXFxuLml0ZW0tMyAuaXRlbTpudGgtY2hpbGQoMW4pIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbi1yaWdodDogMzBweDtcXG4gICAgY2xlYXI6IG5vbmU7XFxuICB9XFxuXFxuLml0ZW0tMyAuaXRlbTpsYXN0LWNoaWxkIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgfVxcblxcbi5pdGVtLTMgLml0ZW06bnRoLWNoaWxkKDNuKSB7XFxuICAgIG1hcmdpbi1yaWdodDogMDtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgfVxcblxcbi5pdGVtLTMgLml0ZW06bnRoLWNoaWxkKDNuICsgMSkge1xcbiAgICBjbGVhcjogYm90aDtcXG4gIH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkNhcmRHcmlkLXJvb3QtNEtSZndcIixcblx0XCJpdGVtXCI6IFwiQ2FyZEdyaWQtaXRlbS1rMkhZS1wiLFxuXHRcIml0ZW0tM1wiOiBcIkNhcmRHcmlkLWl0ZW0tMy0zMGdlaVwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5DYXJkTGFiZWwtcm9vdC1uazdHMSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTNweDtcXG4gIGhlaWdodDogMzRweDtcXG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xcbiAgbGVmdDogLTQ1cHg7XFxuICB0b3A6IDIwcHg7XFxuICB3aWR0aDogMTYwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG59XFxuXFxuLkNhcmRMYWJlbC10YXBlLXo0S3JzLCAuQ2FyZExhYmVsLXN0b2NrLTJPTkRJIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXG59XFxuXFxuLkNhcmRMYWJlbC1jaXJjbGUtMlpBdHEge1xcbiAgdG9wOiAyMHB4O1xcbiAgbGVmdDogMjBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHdpZHRoOiAzN3B4O1xcbiAgaGVpZ2h0OiAzN3B4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDM3cHg7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgICAtbXMtdHJhbnNmb3JtOiBub25lO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi5DYXJkTGFiZWwtc3RvY2stMk9OREkge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9DYXJkTGFiZWwvQ2FyZExhYmVsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsMEJBQTBCO0VBQzFCLGdDQUFnQztFQUNoQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixVQUFVO0VBQ1YsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiwyQkFBMkI7Q0FDNUI7O0FBRUQ7RUFDRSxrQ0FBa0M7TUFDOUIsOEJBQThCO1VBQzFCLDBCQUEwQjtDQUNuQzs7QUFFRDtFQUNFLFVBQVU7RUFDVixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQix3QkFBd0I7TUFDcEIsb0JBQW9CO1VBQ2hCLGdCQUFnQjtDQUN6Qjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQlwiLFwiZmlsZVwiOlwiQ2FyZExhYmVsLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTNweDtcXG4gIGhlaWdodDogMzRweDtcXG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xcbiAgbGVmdDogLTQ1cHg7XFxuICB0b3A6IDIwcHg7XFxuICB3aWR0aDogMTYwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG59XFxuXFxuLnRhcGUsIC5zdG9jayB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcblxcbi5jaXJjbGUge1xcbiAgdG9wOiAyMHB4O1xcbiAgbGVmdDogMjBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHdpZHRoOiAzN3B4O1xcbiAgaGVpZ2h0OiAzN3B4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDM3cHg7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgICAtbXMtdHJhbnNmb3JtOiBub25lO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi5zdG9jayB7XFxuICBmb250LXNpemU6IDEycHg7XFxufVxcblxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiQ2FyZExhYmVsLXJvb3Qtbms3RzFcIixcblx0XCJ0YXBlXCI6IFwiQ2FyZExhYmVsLXRhcGUtejRLcnNcIixcblx0XCJzdG9ja1wiOiBcIkNhcmRMYWJlbC1zdG9jay0yT05ESVwiLFxuXHRcImNpcmNsZVwiOiBcIkNhcmRMYWJlbC1jaXJjbGUtMlpBdHFcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQ2FyZExhYmVsL0NhcmRMYWJlbC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9DYXJkTGFiZWwvQ2FyZExhYmVsLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkNvbnRhaW5lci1yb290LWxfLUI5IHtcXG4gIG1heC13aWR0aDogMTE3MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyL0NvbnRhaW5lci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixtQkFBbUI7Q0FDcEJcIixcImZpbGVcIjpcIkNvbnRhaW5lci5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgbWF4LXdpZHRoOiAxMTcwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkNvbnRhaW5lci1yb290LWxfLUI5XCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyL0NvbnRhaW5lci5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG46cm9vdCB7XFxuICAvKlxcbiAgICogVHlwb2dyYXBoeVxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8gIC8qIEV4dHJhIHNtYWxsIHNjcmVlbiAvIHBob25lICovICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi8gIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovIC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4uRm9vdGVyLXJvb3QtMVVVTXkge1xcbiAgcGFkZGluZzogMzBweCAwIDQ2cHggMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzNSwgMzUsIDM1KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLkZvb3Rlci1sb2dvLTM0QW1qIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4uRm9vdGVyLXNlcnZpY2VzLXFYSmxOIHtcXG4gIG1hcmdpbi1ib3R0b206IDYwcHg7XFxufVxcblxcbi5Gb290ZXItZGVzY3ItM3EtNV8ge1xcbiAgbWFyZ2luLWJvdHRvbTogMjZweDtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyNDEsIDI0MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLkZvb3Rlci1zb2NpYWxzLTJmRy14IHtcXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcblxcbi5Gb290ZXItbmF2aWdhdGlvbi0zcU9RaSB7XFxuICBtYXJnaW4tYm90dG9tOiA0N3B4O1xcbn1cXG5cXG4uRm9vdGVyLXRlcm1zLTNnZWszIHtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyNDEsIDI0MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSDs7Ozs7OztHQU9HOztBQUVIO0VBQ0U7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RSxFQUFFLGdDQUFnQyxFQUFFLDJCQUEyQixFQUFFLDZCQUE2QixDQUFDLGlDQUFpQztDQUMvTTs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixrQ0FBa0M7RUFDbEMsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0Usb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0Usb0JBQW9CO0VBQ3BCLDBCQUEwQjtFQUMxQixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0Usb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0Usb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0UsMEJBQTBCO0VBQzFCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtDQUNuQlwiLFwiZmlsZVwiOlwiRm9vdGVyLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLnJvb3Qge1xcbiAgcGFkZGluZzogMzBweCAwIDQ2cHggMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzNSwgMzUsIDM1KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmxvZ28ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcblxcbi5zZXJ2aWNlcyB7XFxuICBtYXJnaW4tYm90dG9tOiA2MHB4O1xcbn1cXG5cXG4uZGVzY3Ige1xcbiAgbWFyZ2luLWJvdHRvbTogMjZweDtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyNDEsIDI0MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnNvY2lhbHMge1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcXG59XFxuXFxuLm5hdmlnYXRpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogNDdweDtcXG59XFxuXFxuLnRlcm1zIHtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyNDEsIDI0MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJGb290ZXItcm9vdC0xVVVNeVwiLFxuXHRcImxvZ29cIjogXCJGb290ZXItbG9nby0zNEFtalwiLFxuXHRcInNlcnZpY2VzXCI6IFwiRm9vdGVyLXNlcnZpY2VzLXFYSmxOXCIsXG5cdFwiZGVzY3JcIjogXCJGb290ZXItZGVzY3ItM3EtNV9cIixcblx0XCJzb2NpYWxzXCI6IFwiRm9vdGVyLXNvY2lhbHMtMmZHLXhcIixcblx0XCJuYXZpZ2F0aW9uXCI6IFwiRm9vdGVyLW5hdmlnYXRpb24tM3FPUWlcIixcblx0XCJ0ZXJtc1wiOiBcIkZvb3Rlci10ZXJtcy0zZ2VrM1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuR3JvdXAtcm9vdC0yRWJjdCB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Gb3JtL0dyb3VwL0dyb3VwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG9CQUFvQjtDQUNyQlwiLFwiZmlsZVwiOlwiR3JvdXAuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5yb290IHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiR3JvdXAtcm9vdC0yRWJjdFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Gb3JtL0dyb3VwL0dyb3VwLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuSW5wdXQtaW5wdXQtMm5hNTgge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMzQsIDIzNCwgMjM0KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG4gIHBhZGRpbmc6IDAgMTBweCAwIDEwcHg7XFxuICBvdXRsaW5lOiBub25lXFxufVxcblxcbi5JbnB1dC1pbnB1dC0ybmE1ODpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4uSW5wdXQtaW5wdXQtMm5hNTg6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogQ2hyb21lL09wZXJhL1NhZmFyaSAqL1xcbiAgY29sb3I6IHJnYigxNTMsIDE1MywgMTUzKTtcXG59XFxuXFxuLklucHV0LWlucHV0LTJuYTU4OjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIEZpcmVmb3ggMTkrICovXFxuICBjb2xvcjogcmdiKDE1MywgMTUzLCAxNTMpO1xcbn1cXG5cXG4uSW5wdXQtaW5wdXQtMm5hNTg6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIElFIDEwKyAqL1xcbiAgY29sb3I6IHJnYigxNTMsIDE1MywgMTUzKTtcXG59XFxuXFxuLklucHV0LWlucHV0LTJuYTU4Oi1tb3otcGxhY2Vob2xkZXIge1xcbiAgLyogRmlyZWZveCAxOC0gKi9cXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxufVxcblxcbi5JbnB1dC1sYWJlbC0xSzJ0WSB7XFxuICBjb2xvcjogcmdiKDg1LCA4NSwgODUpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNXB4O1xcbn1cXG5cXG4uSW5wdXQtZXJyb3ItU3BCYjMge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgY29sb3I6IHJlZDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvRm9ybS9JbnB1dC9JbnB1dC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixhQUFhO0VBQ2IscUNBQXFDO0VBQ3JDLDhCQUE4QjtFQUM5QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsdUJBQXVCO0VBQ3ZCLGFBQWE7Q0FDZDs7QUFFRDtFQUNFLGNBQWM7Q0FDZjs7QUFFRDtFQUNFLHlCQUF5QjtFQUN6QiwwQkFBMEI7Q0FDM0I7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsMEJBQTBCO0NBQzNCOztBQUVEO0VBQ0UsWUFBWTtFQUNaLDBCQUEwQjtDQUMzQjs7QUFFRDtFQUNFLGlCQUFpQjtFQUNqQiwwQkFBMEI7Q0FDM0I7O0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtDQUN4Qjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0NBQ1pcIixcImZpbGVcIjpcIklucHV0LmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuaW5wdXQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMzQsIDIzNCwgMjM0KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG4gIHBhZGRpbmc6IDAgMTBweCAwIDEwcHg7XFxuICBvdXRsaW5lOiBub25lXFxufVxcblxcbi5pbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4uaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogQ2hyb21lL09wZXJhL1NhZmFyaSAqL1xcbiAgY29sb3I6IHJnYigxNTMsIDE1MywgMTUzKTtcXG59XFxuXFxuLmlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIEZpcmVmb3ggMTkrICovXFxuICBjb2xvcjogcmdiKDE1MywgMTUzLCAxNTMpO1xcbn1cXG5cXG4uaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIElFIDEwKyAqL1xcbiAgY29sb3I6IHJnYigxNTMsIDE1MywgMTUzKTtcXG59XFxuXFxuLmlucHV0Oi1tb3otcGxhY2Vob2xkZXIge1xcbiAgLyogRmlyZWZveCAxOC0gKi9cXG4gIGNvbG9yOiByZ2IoMTUzLCAxNTMsIDE1Myk7XFxufVxcblxcbi5sYWJlbCB7XFxuICBjb2xvcjogcmdiKDg1LCA4NSwgODUpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNXB4O1xcbn1cXG5cXG4uZXJyb3Ige1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgY29sb3I6IHJlZDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImlucHV0XCI6IFwiSW5wdXQtaW5wdXQtMm5hNThcIixcblx0XCJsYWJlbFwiOiBcIklucHV0LWxhYmVsLTFLMnRZXCIsXG5cdFwiZXJyb3JcIjogXCJJbnB1dC1lcnJvci1TcEJiM1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0Zvcm0vSW5wdXQvSW5wdXQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLkhlYWRlci1yb290LU85b1c5LCAuSGVhZGVyLW1pZGRsZS0yY0M4QiB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4uSGVhZGVyLXRvcC0yQWVHMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uSGVhZGVyLW1pZGRsZS0yY0M4QiB7XFxuICBoZWlnaHQ6IDkzcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5IZWFkZXItcm93LXRaT3lZIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBiYXNlbGluZTtcXG4gICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSDs7Ozs7OztHQU9HOztBQUVIO0VBQ0U7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RSxFQUFFLGdDQUFnQyxFQUFFLDJCQUEyQixFQUFFLDZCQUE2QixDQUFDLGlDQUFpQztDQUMvTTs7QUFFRDtFQUNFLGlCQUFpQjtDQUNsQjs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0NBQ3pCOztBQUVEO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsdUJBQXVCO01BQ25CLG9CQUFvQjtDQUN6Qjs7QUFFRDtFQUNFLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QseUJBQXlCO01BQ3JCLHNCQUFzQjtFQUMxQix1QkFBdUI7TUFDbkIsK0JBQStCO0NBQ3BDXCIsXCJmaWxlXCI6XCJIZWFkZXIuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG46cm9vdCB7XFxuICAvKlxcbiAgICogVHlwb2dyYXBoeVxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8gIC8qIEV4dHJhIHNtYWxsIHNjcmVlbiAvIHBob25lICovICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi8gIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovIC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4ucm9vdCwgLm1pZGRsZSB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4udG9wIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5taWRkbGUge1xcbiAgaGVpZ2h0OiA5M3B4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucm93IHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBiYXNlbGluZTtcXG4gICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJIZWFkZXItcm9vdC1POW9XOVwiLFxuXHRcIm1pZGRsZVwiOiBcIkhlYWRlci1taWRkbGUtMmNDOEJcIixcblx0XCJ0b3BcIjogXCJIZWFkZXItdG9wLTJBZUczXCIsXG5cdFwicm93XCI6IFwiSGVhZGVyLXJvdy10Wk95WVwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuSnVtYm90cm9uLXJvb3QtMklYd0gge1xcbiAgcGFkZGluZzogNjBweCAwIDYwcHggNTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDIsIDI0MiwgMjQyKTtcXG59XFxuXFxuLkp1bWJvdHJvbi1pbm5lci0yQW9KdCB7XFxuICAtbXMtZmxleC1wb3NpdGl2ZTogMDtcXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAtbXMtZmxleC1uZWdhdGl2ZTogMDtcXG4gICAgICBmbGV4LXNocmluazogMDtcXG4gIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiBjYWxjKDQxLjYyNSUgLSAxNy41cHgpO1xcbiAgICAgIGZsZXgtYmFzaXM6IGNhbGMoNDEuNjI1JSAtIDE3LjVweCk7XFxuICBtYXgtd2lkdGg6IGNhbGMoNDEuNjI1JSAtIDE3LjVweCk7XFxuICB3aWR0aDogY2FsYyg0MS42MjUlIC0gMTcuNXB4KTtcXG59XFxuXFxuLkp1bWJvdHJvbi1pbm5lci0yQW9KdDpudGgtY2hpbGQoMW4pIHtcXG4gIG1hcmdpbi1yaWdodDogMzBweDtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG5cXG4uSnVtYm90cm9uLWlubmVyLTJBb0p0Omxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbn1cXG5cXG4uSnVtYm90cm9uLWlubmVyLTJBb0p0Om50aC1jaGlsZCgxMm4pIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uSnVtYm90cm9uLXRpdGxlLTNrOTQ2IHtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMjNweDtcXG59XFxuXFxuLkp1bWJvdHJvbi10aXRsZS0zazk0NiwgLkp1bWJvdHJvbi1kZXNjci0xUmxPRSwgLkp1bWJvdHJvbi1saW5rLTNNYWNaIHtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uSnVtYm90cm9uLWRlc2NyLTFSbE9FIHtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxuICBjb2xvcjogcmdiKDg1LCA4NSwgODUpO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uSnVtYm90cm9uLWxpbmstM01hY1oge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjb2xvcjogcmdiKDAsIDAsIDApO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMzRweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lXFxufVxcblxcbi5KdW1ib3Ryb24tbGluay0zTWFjWjpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvSnVtYm90cm9uL0p1bWJvdHJvbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSwwQkFBMEI7RUFDMUIscUNBQXFDO0NBQ3RDOztBQUVEO0VBQ0UscUJBQXFCO01BQ2pCLGFBQWE7RUFDakIscUJBQXFCO01BQ2pCLGVBQWU7RUFDbkIsZ0RBQWdEO01BQzVDLG1DQUFtQztFQUN2QyxrQ0FBa0M7RUFDbEMsOEJBQThCO0NBQy9COztBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLGVBQWU7Q0FDaEI7O0FBRUQ7RUFDRSxnQkFBZ0I7Q0FDakI7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxpQ0FBaUM7Q0FDbEM7O0FBRUQ7RUFDRSxvQkFBb0I7RUFDcEIsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsMEJBQTBCO0NBQzNCOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7Q0FDYlwiLFwiZmlsZVwiOlwiSnVtYm90cm9uLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBwYWRkaW5nOiA2MHB4IDAgNjBweCA1MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MiwgMjQyLCAyNDIpO1xcbn1cXG5cXG4uaW5uZXIge1xcbiAgLW1zLWZsZXgtcG9zaXRpdmU6IDA7XFxuICAgICAgZmxleC1ncm93OiAwO1xcbiAgLW1zLWZsZXgtbmVnYXRpdmU6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogY2FsYyg0MS42MjUlIC0gMTcuNXB4KTtcXG4gICAgICBmbGV4LWJhc2lzOiBjYWxjKDQxLjYyNSUgLSAxNy41cHgpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDQxLjYyNSUgLSAxNy41cHgpO1xcbiAgd2lkdGg6IGNhbGMoNDEuNjI1JSAtIDE3LjVweCk7XFxufVxcblxcbi5pbm5lcjpudGgtY2hpbGQoMW4pIHtcXG4gIG1hcmdpbi1yaWdodDogMzBweDtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG5cXG4uaW5uZXI6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5pbm5lcjpudGgtY2hpbGQoMTJuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMjNweDtcXG59XFxuXFxuLnRpdGxlLCAuZGVzY3IsIC5saW5rIHtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uZGVzY3Ige1xcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIGNvbG9yOiByZ2IoODUsIDg1LCA4NSk7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5saW5rIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIG1hcmdpbi1ib3R0b206IDM0cHg7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZVxcbn1cXG5cXG4ubGluazpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJKdW1ib3Ryb24tcm9vdC0ySVh3SFwiLFxuXHRcImlubmVyXCI6IFwiSnVtYm90cm9uLWlubmVyLTJBb0p0XCIsXG5cdFwidGl0bGVcIjogXCJKdW1ib3Ryb24tdGl0bGUtM2s5NDZcIixcblx0XCJkZXNjclwiOiBcIkp1bWJvdHJvbi1kZXNjci0xUmxPRVwiLFxuXHRcImxpbmtcIjogXCJKdW1ib3Ryb24tbGluay0zTWFjWlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9KdW1ib3Ryb24vSnVtYm90cm9uLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLypcXG4gKiBub3JtYWxpemUuY3NzIGlzIGltcG9ydGVkIGluIEpTIGZpbGUuXFxuICogSWYgeW91IGltcG9ydCBleHRlcm5hbCBDU1MgZmlsZSBmcm9tIHlvdXIgaW50ZXJuYWwgQ1NTXFxuICogdGhlbiBpdCB3aWxsIGJlIGlubGluZWQgYW5kIHByb2Nlc3NlZCB3aXRoIENTUyBtb2R1bGVzLlxcbiAqL1xcblxcbi8qXFxuICogQmFzZSBzdHlsZXNcXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbmh0bWwge1xcbiAgY29sb3I6ICMyMjI7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgZm9udC1zaXplOiAxZW07IC8qIH4xNnB4OyAqL1xcbiAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsICdIZWx2ZXRpY2FOZXVlLUxpZ2h0Jywgc2Fucy1zZXJpZjtcXG4gIGxpbmUtaGVpZ2h0OiAxLjM3NTsgLyogfjIycHggKi9cXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmEge1xcbiAgY29sb3I6ICMwMDc0YzI7XFxufVxcblxcbi8qXFxuICogUmVtb3ZlIHRleHQtc2hhZG93IGluIHNlbGVjdGlvbiBoaWdobGlnaHQ6XFxuICogaHR0cHM6Ly90d2l0dGVyLmNvbS9taWtldGF5bHIvc3RhdHVzLzEyMjI4ODA1MzAxXFxuICpcXG4gKiBUaGVzZSBzZWxlY3Rpb24gcnVsZSBzZXRzIGhhdmUgdG8gYmUgc2VwYXJhdGUuXFxuICogQ3VzdG9taXplIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIHRvIG1hdGNoIHlvdXIgZGVzaWduLlxcbiAqL1xcblxcbjo6LW1vei1zZWxlY3Rpb24ge1xcbiAgYmFja2dyb3VuZDogI2IzZDRmYztcXG4gIHRleHQtc2hhZG93OiBub25lO1xcbn1cXG5cXG46OnNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiAjYjNkNGZjO1xcbiAgdGV4dC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi8qXFxuICogQSBiZXR0ZXIgbG9va2luZyBkZWZhdWx0IGhvcml6b250YWwgcnVsZVxcbiAqL1xcblxcbmhyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcXG4gIG1hcmdpbjogMWVtIDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKlxcbiAqIFJlbW92ZSB0aGUgZ2FwIGJldHdlZW4gYXVkaW8sIGNhbnZhcywgaWZyYW1lcyxcXG4gKiBpbWFnZXMsIHZpZGVvcyBhbmQgdGhlIGJvdHRvbSBvZiB0aGVpciBjb250YWluZXJzOlxcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9oNWJwL2h0bWw1LWJvaWxlcnBsYXRlL2lzc3Vlcy80NDBcXG4gKi9cXG5cXG5hdWRpbyxcXG5jYW52YXMsXFxuaWZyYW1lLFxcbmltZyxcXG5zdmcsXFxudmlkZW8ge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuXFxuLypcXG4gKiBSZW1vdmUgZGVmYXVsdCBmaWVsZHNldCBzdHlsZXMuXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgYm9yZGVyOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLypcXG4gKiBBbGxvdyBvbmx5IHZlcnRpY2FsIHJlc2l6aW5nIG9mIHRleHRhcmVhcy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICByZXNpemU6IHZlcnRpY2FsO1xcbn1cXG5cXG4vKlxcbiAqIEJyb3dzZXIgdXBncmFkZSBwcm9tcHRcXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi5icm93c2VydXBncmFkZSB7XFxuICBtYXJnaW46IDAuMmVtIDA7XFxuICBiYWNrZ3JvdW5kOiAjY2NjO1xcbiAgY29sb3I6ICMwMDA7XFxuICBwYWRkaW5nOiAwLjJlbSAwO1xcbn1cXG5cXG4vKlxcbiAqIFByaW50IHN0eWxlc1xcbiAqIElubGluZWQgdG8gYXZvaWQgdGhlIGFkZGl0aW9uYWwgSFRUUCByZXF1ZXN0OlxcbiAqIGh0dHA6Ly93d3cucGhwaWVkLmNvbS9kZWxheS1sb2FkaW5nLXlvdXItcHJpbnQtY3NzL1xcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuQG1lZGlhIHByaW50IHtcXG4gICosXFxuICAqOjpiZWZvcmUsXFxuICAqOjphZnRlciB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjMDAwICFpbXBvcnRhbnQ7IC8qIEJsYWNrIHByaW50cyBmYXN0ZXI6IGh0dHA6Ly93d3cuc2FuYmVpamkuY29tL2FyY2hpdmVzLzk1MyAqL1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICAgIHRleHQtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxuXFxuICBhLFxcbiAgYTp2aXNpdGVkIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICB9XFxuXFxuICBhW2hyZWZdOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6ICcgKCcgYXR0cihocmVmKSAnKSc7XFxuICB9XFxuXFxuICBhYmJyW3RpdGxlXTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiAnICgnIGF0dHIodGl0bGUpICcpJztcXG4gIH1cXG5cXG4gIC8qXFxuICAgKiBEb24ndCBzaG93IGxpbmtzIHRoYXQgYXJlIGZyYWdtZW50IGlkZW50aWZpZXJzLFxcbiAgICogb3IgdXNlIHRoZSBgamF2YXNjcmlwdDpgIHBzZXVkbyBwcm90b2NvbFxcbiAgICovXFxuXFxuICBhW2hyZWZePScjJ106OmFmdGVyLFxcbiAgYVtocmVmXj0namF2YXNjcmlwdDonXTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiAnJztcXG4gIH1cXG5cXG4gIHByZSxcXG4gIGJsb2NrcXVvdGUge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xcbiAgICBwYWdlLWJyZWFrLWluc2lkZTogYXZvaWQ7XFxuICB9XFxuXFxuICAvKlxcbiAgICogUHJpbnRpbmcgVGFibGVzOlxcbiAgICogaHR0cDovL2Nzcy1kaXNjdXNzLmluY3V0aW8uY29tL3dpa2kvUHJpbnRpbmdfVGFibGVzXFxuICAgKi9cXG5cXG4gIHRoZWFkIHtcXG4gICAgZGlzcGxheTogdGFibGUtaGVhZGVyLWdyb3VwO1xcbiAgfVxcblxcbiAgdHIsXFxuICBpbWcge1xcbiAgICBwYWdlLWJyZWFrLWluc2lkZTogYXZvaWQ7XFxuICB9XFxuXFxuICBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIH1cXG5cXG4gIHAsXFxuICBoMixcXG4gIGgzIHtcXG4gICAgb3JwaGFuczogMztcXG4gICAgd2lkb3dzOiAzO1xcbiAgfVxcblxcbiAgaDIsXFxuICBoMyB7XFxuICAgIHBhZ2UtYnJlYWstYWZ0ZXI6IGF2b2lkO1xcbiAgfVxcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlclxcbn1cXG5cXG5hOmhvdmVyICB7XFxuICBjb2xvcjogY3VycmVudENvbG9yO1xcbn1cXG5cXG51bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuKiB7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTGF5b3V0L0xheW91dC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSDs7Ozs7OztHQU9HOztBQUVIO0VBQ0U7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RTs7RUFFOUU7O2dGQUU4RSxFQUFFLGdDQUFnQyxFQUFFLDJCQUEyQixFQUFFLDZCQUE2QixDQUFDLGlDQUFpQztDQUMvTTs7QUFFRDs7OztHQUlHOztBQUVIOztnRkFFZ0Y7O0FBRWhGO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixlQUFlLENBQUMsWUFBWTtFQUM1QiwyREFBMkQ7RUFDM0QsbUJBQW1CLENBQUMsV0FBVztDQUNoQzs7QUFFRDtFQUNFLFVBQVU7Q0FDWDs7QUFFRDtFQUNFLGVBQWU7Q0FDaEI7O0FBRUQ7Ozs7OztHQU1HOztBQUVIO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7Q0FDbkI7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLFVBQVU7RUFDViwyQkFBMkI7RUFDM0IsY0FBYztFQUNkLFdBQVc7Q0FDWjs7QUFFRDs7OztHQUlHOztBQUVIOzs7Ozs7RUFNRSx1QkFBdUI7Q0FDeEI7O0FBRUQ7O0dBRUc7O0FBRUg7RUFDRSxVQUFVO0VBQ1YsVUFBVTtFQUNWLFdBQVc7Q0FDWjs7QUFFRDs7R0FFRzs7QUFFSDtFQUNFLGlCQUFpQjtDQUNsQjs7QUFFRDs7Z0ZBRWdGOztBQUVoRjtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGlCQUFpQjtDQUNsQjs7QUFFRDs7OztnRkFJZ0Y7O0FBRWhGO0VBQ0U7OztJQUdFLG1DQUFtQztJQUNuQyx1QkFBdUIsQ0FBQywrREFBK0Q7SUFDdkYsb0NBQW9DO1lBQzVCLDRCQUE0QjtJQUNwQyw2QkFBNkI7R0FDOUI7O0VBRUQ7O0lBRUUsMkJBQTJCO0dBQzVCOztFQUVEO0lBQ0UsNkJBQTZCO0dBQzlCOztFQUVEO0lBQ0UsOEJBQThCO0dBQy9COztFQUVEOzs7S0FHRzs7RUFFSDs7SUFFRSxZQUFZO0dBQ2I7O0VBRUQ7O0lBRUUsdUJBQXVCO0lBQ3ZCLHlCQUF5QjtHQUMxQjs7RUFFRDs7O0tBR0c7O0VBRUg7SUFDRSw0QkFBNEI7R0FDN0I7O0VBRUQ7O0lBRUUseUJBQXlCO0dBQzFCOztFQUVEO0lBQ0UsMkJBQTJCO0dBQzVCOztFQUVEOzs7SUFHRSxXQUFXO0lBQ1gsVUFBVTtHQUNYOztFQUVEOztJQUVFLHdCQUF3QjtHQUN6QjtDQUNGOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLGVBQWU7Q0FDaEI7O0FBRUQ7RUFDRSxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztFQUNYLFVBQVU7Q0FDWDs7QUFFRDtFQUNFLGVBQWU7RUFDZiwrQkFBK0I7VUFDdkIsdUJBQXVCO0NBQ2hDXCIsXCJmaWxlXCI6XCJMYXlvdXQuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG46cm9vdCB7XFxuICAvKlxcbiAgICogVHlwb2dyYXBoeVxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8gIC8qIEV4dHJhIHNtYWxsIHNjcmVlbiAvIHBob25lICovICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi8gIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovIC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4vKlxcbiAqIG5vcm1hbGl6ZS5jc3MgaXMgaW1wb3J0ZWQgaW4gSlMgZmlsZS5cXG4gKiBJZiB5b3UgaW1wb3J0IGV4dGVybmFsIENTUyBmaWxlIGZyb20geW91ciBpbnRlcm5hbCBDU1NcXG4gKiB0aGVuIGl0IHdpbGwgYmUgaW5saW5lZCBhbmQgcHJvY2Vzc2VkIHdpdGggQ1NTIG1vZHVsZXMuXFxuICovXFxuXFxuLypcXG4gKiBCYXNlIHN0eWxlc1xcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuaHRtbCB7XFxuICBjb2xvcjogIzIyMjtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBmb250LXNpemU6IDFlbTsgLyogfjE2cHg7ICovXFxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgJ0hlbHZldGljYU5ldWUtTGlnaHQnLCBzYW5zLXNlcmlmO1xcbiAgbGluZS1oZWlnaHQ6IDEuMzc1OyAvKiB+MjJweCAqL1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYSB7XFxuICBjb2xvcjogIzAwNzRjMjtcXG59XFxuXFxuLypcXG4gKiBSZW1vdmUgdGV4dC1zaGFkb3cgaW4gc2VsZWN0aW9uIGhpZ2hsaWdodDpcXG4gKiBodHRwczovL3R3aXR0ZXIuY29tL21pa2V0YXlsci9zdGF0dXMvMTIyMjg4MDUzMDFcXG4gKlxcbiAqIFRoZXNlIHNlbGVjdGlvbiBydWxlIHNldHMgaGF2ZSB0byBiZSBzZXBhcmF0ZS5cXG4gKiBDdXN0b21pemUgdGhlIGJhY2tncm91bmQgY29sb3IgdG8gbWF0Y2ggeW91ciBkZXNpZ24uXFxuICovXFxuXFxuOjotbW96LXNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiAjYjNkNGZjO1xcbiAgdGV4dC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbjo6c2VsZWN0aW9uIHtcXG4gIGJhY2tncm91bmQ6ICNiM2Q0ZmM7XFxuICB0ZXh0LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuLypcXG4gKiBBIGJldHRlciBsb29raW5nIGRlZmF1bHQgaG9yaXpvbnRhbCBydWxlXFxuICovXFxuXFxuaHIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDFweDtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xcbiAgbWFyZ2luOiAxZW0gMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qXFxuICogUmVtb3ZlIHRoZSBnYXAgYmV0d2VlbiBhdWRpbywgY2FudmFzLCBpZnJhbWVzLFxcbiAqIGltYWdlcywgdmlkZW9zIGFuZCB0aGUgYm90dG9tIG9mIHRoZWlyIGNvbnRhaW5lcnM6XFxuICogaHR0cHM6Ly9naXRodWIuY29tL2g1YnAvaHRtbDUtYm9pbGVycGxhdGUvaXNzdWVzLzQ0MFxcbiAqL1xcblxcbmF1ZGlvLFxcbmNhbnZhcyxcXG5pZnJhbWUsXFxuaW1nLFxcbnN2ZyxcXG52aWRlbyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG5cXG4vKlxcbiAqIFJlbW92ZSBkZWZhdWx0IGZpZWxkc2V0IHN0eWxlcy5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBib3JkZXI6IDA7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKlxcbiAqIEFsbG93IG9ubHkgdmVydGljYWwgcmVzaXppbmcgb2YgdGV4dGFyZWFzLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIHJlc2l6ZTogdmVydGljYWw7XFxufVxcblxcbi8qXFxuICogQnJvd3NlciB1cGdyYWRlIHByb21wdFxcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuOmdsb2JhbCguYnJvd3NlcnVwZ3JhZGUpIHtcXG4gIG1hcmdpbjogMC4yZW0gMDtcXG4gIGJhY2tncm91bmQ6ICNjY2M7XFxuICBjb2xvcjogIzAwMDtcXG4gIHBhZGRpbmc6IDAuMmVtIDA7XFxufVxcblxcbi8qXFxuICogUHJpbnQgc3R5bGVzXFxuICogSW5saW5lZCB0byBhdm9pZCB0aGUgYWRkaXRpb25hbCBIVFRQIHJlcXVlc3Q6XFxuICogaHR0cDovL3d3dy5waHBpZWQuY29tL2RlbGF5LWxvYWRpbmcteW91ci1wcmludC1jc3MvXFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG5AbWVkaWEgcHJpbnQge1xcbiAgKixcXG4gICo6OmJlZm9yZSxcXG4gICo6OmFmdGVyIHtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG4gICAgY29sb3I6ICMwMDAgIWltcG9ydGFudDsgLyogQmxhY2sgcHJpbnRzIGZhc3RlcjogaHR0cDovL3d3dy5zYW5iZWlqaS5jb20vYXJjaGl2ZXMvOTUzICovXFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXG4gICAgdGV4dC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG5cXG4gIGEsXFxuICBhOnZpc2l0ZWQge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIH1cXG5cXG4gIGFbaHJlZl06OmFmdGVyIHtcXG4gICAgY29udGVudDogJyAoJyBhdHRyKGhyZWYpICcpJztcXG4gIH1cXG5cXG4gIGFiYnJbdGl0bGVdOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6ICcgKCcgYXR0cih0aXRsZSkgJyknO1xcbiAgfVxcblxcbiAgLypcXG4gICAqIERvbid0IHNob3cgbGlua3MgdGhhdCBhcmUgZnJhZ21lbnQgaWRlbnRpZmllcnMsXFxuICAgKiBvciB1c2UgdGhlIGBqYXZhc2NyaXB0OmAgcHNldWRvIHByb3RvY29sXFxuICAgKi9cXG5cXG4gIGFbaHJlZl49JyMnXTo6YWZ0ZXIsXFxuICBhW2hyZWZePSdqYXZhc2NyaXB0OiddOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgfVxcblxcbiAgcHJlLFxcbiAgYmxvY2txdW90ZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XFxuICAgIHBhZ2UtYnJlYWstaW5zaWRlOiBhdm9pZDtcXG4gIH1cXG5cXG4gIC8qXFxuICAgKiBQcmludGluZyBUYWJsZXM6XFxuICAgKiBodHRwOi8vY3NzLWRpc2N1c3MuaW5jdXRpby5jb20vd2lraS9QcmludGluZ19UYWJsZXNcXG4gICAqL1xcblxcbiAgdGhlYWQge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1oZWFkZXItZ3JvdXA7XFxuICB9XFxuXFxuICB0cixcXG4gIGltZyB7XFxuICAgIHBhZ2UtYnJlYWstaW5zaWRlOiBhdm9pZDtcXG4gIH1cXG5cXG4gIGltZyB7XFxuICAgIG1heC13aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAgfVxcblxcbiAgcCxcXG4gIGgyLFxcbiAgaDMge1xcbiAgICBvcnBoYW5zOiAzO1xcbiAgICB3aWRvd3M6IDM7XFxuICB9XFxuXFxuICBoMixcXG4gIGgzIHtcXG4gICAgcGFnZS1icmVhay1hZnRlcjogYXZvaWQ7XFxuICB9XFxufVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyXFxufVxcblxcbmE6aG92ZXIgIHtcXG4gIGNvbG9yOiBjdXJyZW50Q29sb3I7XFxufVxcblxcbnVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4qIHtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0xheW91dC9MYXlvdXQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvTGF5b3V0L0xheW91dC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5Mb2dvLXJvb3QtMVJKLTEge1xcbiAgd2lkdGg6IDExOXB4O1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGZvbnQtZmFtaWx5OiBOaWNvbm5lLCBjdXJzaXZlO1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNHB4O1xcbn1cXG5cXG4uTG9nby13aGl0ZS1mcGk5VyB7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvTG9nby9Mb2dvLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIsOEJBQThCO0VBQzlCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLHNCQUFzQjtDQUN2Qjs7QUFFRDtFQUNFLFlBQVk7Q0FDYlwiLFwiZmlsZVwiOlwiTG9nby5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgd2lkdGg6IDExOXB4O1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGZvbnQtZmFtaWx5OiBOaWNvbm5lLCBjdXJzaXZlO1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNHB4O1xcbn1cXG5cXG4ud2hpdGUge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiTG9nby1yb290LTFSSi0xXCIsXG5cdFwid2hpdGVcIjogXCJMb2dvLXdoaXRlLWZwaTlXXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL0xvZ28vTG9nby5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Mb2dvL0xvZ28uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi5OYXZpZ2F0aW9uLXJvb3QtMmdjSngge31cXG5cXG4uTmF2aWdhdGlvbi1saW5rLU50bDM1IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE4cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDM1cHhcXG59XFxuXFxuLk5hdmlnYXRpb24tbGluay1OdGwzNTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLk5hdmlnYXRpb24tbGluay1OdGwzNTphY3RpdmUsXFxuLk5hdmlnYXRpb24tbGluay1OdGwzNTp2aXNpdGVkLFxcbi5OYXZpZ2F0aW9uLWxpbmstTnRsMzU6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICBjb2xvcjogcmdiKDE3LCAxNywgMTcpO1xcbn1cXG5cXG4uTmF2aWdhdGlvbi13aGl0ZS0yUWhmbiAuTmF2aWdhdGlvbi1saW5rLU50bDM1IHtcXG4gIGNvbG9yOiByZ2IoMjQxLCAyNDEsIDI0MSk7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5OYXZpZ2F0aW9uLWFjdGl2ZUxpbmstM2ZGdzAge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSCx5QkFBUTs7QUFFUjtFQUNFLHNCQUFzQjtFQUN0QixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEOzs7RUFHRSwyQkFBMkI7RUFDM0IsdUJBQXVCO0NBQ3hCOztBQUVEO0VBQ0UsMEJBQTBCO0VBQzFCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsMkJBQTJCO0NBQzVCXCIsXCJmaWxlXCI6XCJOYXZpZ2F0aW9uLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi5yb290IHt9XFxuXFxuLmxpbmsge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMThweDtcXG4gIG1hcmdpbi1yaWdodDogMzVweFxcbn1cXG5cXG4ubGluazpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLmxpbms6YWN0aXZlLFxcbi5saW5rOnZpc2l0ZWQsXFxuLmxpbms6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICBjb2xvcjogcmdiKDE3LCAxNywgMTcpO1xcbn1cXG5cXG4ud2hpdGUgLmxpbmsge1xcbiAgY29sb3I6IHJnYigyNDEsIDI0MSwgMjQxKTtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLmFjdGl2ZUxpbmsge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiTmF2aWdhdGlvbi1yb290LTJnY0p4XCIsXG5cdFwibGlua1wiOiBcIk5hdmlnYXRpb24tbGluay1OdGwzNVwiLFxuXHRcIndoaXRlXCI6IFwiTmF2aWdhdGlvbi13aGl0ZS0yUWhmblwiLFxuXHRcImFjdGl2ZUxpbmtcIjogXCJOYXZpZ2F0aW9uLWFjdGl2ZUxpbmstM2ZGdzBcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5SYXRpbmctcm9vdC0zbDFQbyB7XFxuICAvKmRpc3BsYXk6IGZsZXg7Ki9cXG5cXG4gIC8qYWxpZ24taXRlbXM6IGNlbnRlcjsqL1xcblxcbiAgLypqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7Ki9cXG59XFxuXFxuXFxuXFxuXFxuLlJhdGluZy1zdGFyLTNuRGV4IHtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDVweFxcbn1cXG5cXG5cXG5cXG5cXG4uUmF0aW5nLXN0YXItM25EZXg6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1JhdGluZy9SYXRpbmcuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCOztFQUVsQix3QkFBd0I7O0VBRXhCLGdDQUFnQztDQUNqQzs7Ozs7QUFLRDtFQUNFLHVCQUF1QjtFQUN2QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0NBQ2xCOzs7OztBQUtEO0VBQ0UsZ0JBQWdCO0NBQ2pCXCIsXCJmaWxlXCI6XCJSYXRpbmcuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5yb290IHtcXG4gIC8qZGlzcGxheTogZmxleDsqL1xcblxcbiAgLyphbGlnbi1pdGVtczogY2VudGVyOyovXFxuXFxuICAvKmp1c3RpZnktY29udGVudDogZmxleC1zdGFydDsqL1xcbn1cXG5cXG5cXG5cXG5cXG4uc3RhciB7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHhcXG59XFxuXFxuXFxuXFxuXFxuLnN0YXI6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiUmF0aW5nLXJvb3QtM2wxUG9cIixcblx0XCJzdGFyXCI6IFwiUmF0aW5nLXN0YXItM25EZXhcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9SYXRpbmcvUmF0aW5nLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLlNlcnZpY2VGZWF0dXJlcy1yb290LTNnQWdkIHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG59LlNlcnZpY2VGZWF0dXJlcy1yb290LTNnQWdkIHtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLlNlcnZpY2VGZWF0dXJlcy1pdGVtLTJVT2JhIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wb3NpdGl2ZTogMDtcXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAtbXMtZmxleC1uZWdhdGl2ZTogMDtcXG4gICAgICBmbGV4LXNocmluazogMDtcXG4gIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgICAgIGZsZXgtYmFzaXM6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICBtYXgtd2lkdGg6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICB3aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIGhlaWdodDogMTM5cHg7XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLlNlcnZpY2VGZWF0dXJlcy1pdGVtLTJVT2JhOm50aC1jaGlsZCgxbikge1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi5TZXJ2aWNlRmVhdHVyZXMtaXRlbS0yVU9iYTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLlNlcnZpY2VGZWF0dXJlcy1pdGVtLTJVT2JhOm50aC1jaGlsZCgxMm4pIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uU2VydmljZUZlYXR1cmVzLXRpdGxlLTNXOUxXIHtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE4cHg7XFxufVxcblxcbi5TZXJ2aWNlRmVhdHVyZXMtZGVzY3ItM2hHQUIge1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTVweDtcXG59XFxuXFxuLlNlcnZpY2VGZWF0dXJlcy1pY29uLXZLdGVoIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNXB4O1xcbiAgcmlnaHQ6IDVweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztDQUNmO0VBQ0Msc0JBQXNCO01BQ2xCLHdCQUF3QjtFQUM1Qix1QkFBdUI7TUFDbkIsb0JBQW9CO0NBQ3pCOztBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsdUJBQXVCO01BQ25CLG9CQUFvQjtFQUN4QixzQkFBc0I7TUFDbEIsd0JBQXdCO0VBQzVCLDJCQUEyQjtNQUN2Qix1QkFBdUI7RUFDM0IsbUJBQW1CO0VBQ25CLHFCQUFxQjtNQUNqQixhQUFhO0VBQ2pCLHFCQUFxQjtNQUNqQixlQUFlO0VBQ25CLGdEQUFnRDtNQUM1QyxtQ0FBbUM7RUFDdkMsa0NBQWtDO0VBQ2xDLDhCQUE4QjtFQUM5QixjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHFDQUFxQztDQUN0Qzs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOztBQUVEO0VBQ0UsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix1QkFBdUI7Q0FDeEI7O0FBRUQ7RUFDRSxtQkFBbUI7RUFDbkIsU0FBUztFQUNULFdBQVc7Q0FDWlwiLFwiZmlsZVwiOlwiU2VydmljZUZlYXR1cmVzLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufS5yb290IHtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLml0ZW0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBvc2l0aXZlOiAwO1xcbiAgICAgIGZsZXgtZ3JvdzogMDtcXG4gIC1tcy1mbGV4LW5lZ2F0aXZlOiAwO1xcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6IGNhbGMoMjQuOTc1JSAtIDIyLjVweCk7XFxuICAgICAgZmxleC1iYXNpczogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIG1heC13aWR0aDogY2FsYygyNC45NzUlIC0gMjIuNXB4KTtcXG4gIHdpZHRoOiBjYWxjKDI0Ljk3NSUgLSAyMi41cHgpO1xcbiAgaGVpZ2h0OiAxMzlweDtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbn1cXG5cXG4uaXRlbTpudGgtY2hpbGQoMW4pIHtcXG4gIG1hcmdpbi1yaWdodDogMzBweDtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG5cXG4uaXRlbTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuLml0ZW06bnRoLWNoaWxkKDEybikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi50aXRsZSB7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xOHB4O1xcbn1cXG5cXG4uZGVzY3Ige1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTVweDtcXG59XFxuXFxuLmljb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1cHg7XFxuICByaWdodDogNXB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIlNlcnZpY2VGZWF0dXJlcy1yb290LTNnQWdkXCIsXG5cdFwiaXRlbVwiOiBcIlNlcnZpY2VGZWF0dXJlcy1pdGVtLTJVT2JhXCIsXG5cdFwidGl0bGVcIjogXCJTZXJ2aWNlRmVhdHVyZXMtdGl0bGUtM1c5TFdcIixcblx0XCJkZXNjclwiOiBcIlNlcnZpY2VGZWF0dXJlcy1kZXNjci0zaEdBQlwiLFxuXHRcImljb25cIjogXCJTZXJ2aWNlRmVhdHVyZXMtaWNvbi12S3RlaFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9TZXJ2aWNlRmVhdHVyZXMvU2VydmljZUZlYXR1cmVzLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1NlcnZpY2VGZWF0dXJlcy9TZXJ2aWNlRmVhdHVyZXMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuU29jaWFsc0xpc3Qtcm9vdC0ySVJZZiB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5Tb2NpYWxzTGlzdC1pdGVtLTFkRzNlIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuXFxuLlNvY2lhbHNMaXN0LWljb24tMzZXTW4ge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5Tb2NpYWxzTGlzdC1jZW50ZXItMWdmY2wge1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uU29jaWFsc0xpc3QtY2lyY2xlLTFwX0xHIGEge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogMzZweDtcXG4gIGhlaWdodDogMzZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiAzNnB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtNQUNuQixvQkFBb0I7RUFDeEIscUJBQXFCO01BQ2pCLDRCQUE0QjtDQUNqQzs7QUFFRDtFQUNFLG1CQUFtQjtDQUNwQjs7QUFFRDtFQUNFLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLHNCQUFzQjtNQUNsQix3QkFBd0I7Q0FDN0I7O0FBRUQ7RUFDRSxzQkFBc0I7RUFDdEIsd0JBQXdCO0VBQ3hCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7Q0FDbkJcIixcImZpbGVcIjpcIlNvY2lhbHNMaXN0LmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5pdGVtIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuXFxuLmljb24ge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcblxcbi5jZW50ZXIge1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uY2lyY2xlIGEge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogMzZweDtcXG4gIGhlaWdodDogMzZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiAzNnB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIlNvY2lhbHNMaXN0LXJvb3QtMklSWWZcIixcblx0XCJpdGVtXCI6IFwiU29jaWFsc0xpc3QtaXRlbS0xZEczZVwiLFxuXHRcImljb25cIjogXCJTb2NpYWxzTGlzdC1pY29uLTM2V01uXCIsXG5cdFwiY2VudGVyXCI6IFwiU29jaWFsc0xpc3QtY2VudGVyLTFnZmNsXCIsXG5cdFwiY2lyY2xlXCI6IFwiU29jaWFsc0xpc3QtY2lyY2xlLTFwX0xHXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1NvY2lhbHNMaXN0L1NvY2lhbHNMaXN0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1NvY2lhbHNMaXN0L1NvY2lhbHNMaXN0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLlRhYnMtcm9vdC0yY3Q1UyB7fVxcblxcbi5UYWJzLWxpc3QtMjJqTU0ge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBtYXJnaW4tYm90dG9tOiA0NnB4O1xcbn1cXG5cXG4uVGFicy10YWItU2FWaUkge1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTZweDtcXG4gIGN1cnNvcjogcG9pbnRlclxcbn1cXG5cXG4uVGFicy10YWItU2FWaUk6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5UYWJzLXNlbGVjdGVkLTNxZzFMIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4uVGFicy1wYW5lbC1RcV8wNCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbiAgLW8tdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxufVxcblxcbi5UYWJzLXBhbmVsQWN0aXZlLTNvNE1UIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1RhYnMvVGFicy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsbUJBQVE7O0FBRVI7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtNQUNuQixvQkFBb0I7RUFDeEIsdUJBQXVCO01BQ25CLCtCQUErQjtFQUNuQyxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsMkJBQTJCO0NBQzVCOztBQUVEO0VBQ0UsMkJBQTJCO0NBQzVCOztBQUVEO0VBQ0UsV0FBVztFQUNYLHdDQUF3QztFQUN4QyxtQ0FBbUM7RUFDbkMsZ0NBQWdDO0NBQ2pDOztBQUVEO0VBQ0UsV0FBVztDQUNaXCIsXCJmaWxlXCI6XCJUYWJzLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7fVxcblxcbi5saXN0IHtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgbWFyZ2luLWJvdHRvbTogNDZweDtcXG59XFxuXFxuLnRhYiB7XFxuICBjb2xvcjogcmdiKDE3LCAxNywgMTcpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNnB4O1xcbiAgY3Vyc29yOiBwb2ludGVyXFxufVxcblxcbi50YWI6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5zZWxlY3RlZCB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLnBhbmVsIHtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBsaW5lYXI7XFxuICAtby10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgbGluZWFyO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGxpbmVhcjtcXG59XFxuXFxuLnBhbmVsQWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiVGFicy1yb290LTJjdDVTXCIsXG5cdFwibGlzdFwiOiBcIlRhYnMtbGlzdC0yMmpNTVwiLFxuXHRcInRhYlwiOiBcIlRhYnMtdGFiLVNhVmlJXCIsXG5cdFwic2VsZWN0ZWRcIjogXCJUYWJzLXNlbGVjdGVkLTNxZzFMXCIsXG5cdFwicGFuZWxcIjogXCJUYWJzLXBhbmVsLVFxXzA0XCIsXG5cdFwicGFuZWxBY3RpdmVcIjogXCJUYWJzLXBhbmVsQWN0aXZlLTNvNE1UXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1RhYnMvVGFicy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9UYWJzL1RhYnMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uVGl0bGUtdGl0bGUtM3MzREQge1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI4cHg7XFxufVxcblxcbmgxLlRpdGxlLXRpdGxlLTNzM0REIHtcXG4gIGZvbnQtc2l6ZTogOTIuOHB4O1xcbiAgZm9udC1zaXplOiA1LjhyZW07XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDY2cHg7XFxufVxcblxcbmgyLlRpdGxlLXRpdGxlLTNzM0REIHtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uVGl0bGUtY2VudGVyLTdOWFEwIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFDQTtFQUNFLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsaUJBQWlCO0VBQ2pCLHVCQUF1QjtDQUN4Qjs7QUFFRDtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtDQUNuQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSxtQkFBbUI7Q0FDcEJcIixcImZpbGVcIjpcIlRpdGxlLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJcXG4udGl0bGUge1xcbiAgY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI4cHg7XFxufVxcblxcbmgxLnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogOTIuOHB4O1xcbiAgZm9udC1zaXplOiA1LjhyZW07XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDY2cHg7XFxufVxcblxcbmgyLnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInRpdGxlXCI6IFwiVGl0bGUtdGl0bGUtM3MzRERcIixcblx0XCJjZW50ZXJcIjogXCJUaXRsZS1jZW50ZXItN05YUTBcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuVG9vbEJhci1hY3Rpb24tM3pnM3Age1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgbWFyZ2luLXJpZ2h0OiAyN3B4XFxufVxcblxcblxcbi5Ub29sQmFyLWFjdGlvbi0zemczcDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG59XFxuXFxuXFxuLlRvb2xCYXItYmFnLTFUOVdmIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuXFxuLlRvb2xCYXItY291bnQtamtnTHIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAtMTJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB3aWR0aDogMThweDtcXG4gIGhlaWdodDogMThweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjA5cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL1Rvb2xCYXIvVG9vbEJhci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0NBQ25COzs7QUFHRDtFQUNFLGdCQUFnQjtDQUNqQjs7O0FBR0Q7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0NBQ2pCOzs7QUFHRDtFQUNFLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IsK0JBQStCO0VBQy9CLDBCQUEwQjtFQUMxQixpQ0FBaUM7RUFDakMsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQix1QkFBdUI7Q0FDeEJcIixcImZpbGVcIjpcIlRvb2xCYXIuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5hY3Rpb24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgbWFyZ2luLXJpZ2h0OiAyN3B4XFxufVxcblxcblxcbi5hY3Rpb246bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcblxcbi5iYWcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5cXG4uY291bnQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAtMTJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB3aWR0aDogMThweDtcXG4gIGhlaWdodDogMThweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjA5cHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJhY3Rpb25cIjogXCJUb29sQmFyLWFjdGlvbi0zemczcFwiLFxuXHRcImJhZ1wiOiBcIlRvb2xCYXItYmFnLTFUOVdmXCIsXG5cdFwiY291bnRcIjogXCJUb29sQmFyLWNvdW50LWprZ0xyXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9jb21wb25lbnRzL1Rvb2xCYXIvVG9vbEJhci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9Ub29sQmFyL1Rvb2xCYXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuUmVnaXN0ZXItcm9vdC0za3YzdCB7XFxuICBtYXgtd2lkdGg6IDU3MHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDEwMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblxcbi5SZWdpc3Rlci1hbHJlYWR5LS1MRnkzIHtcXG4gIG1hcmdpbi1ib3R0b206IDI3cHg7XFxufVxcblxcbi5SZWdpc3Rlci1hbHJlYWR5LS1MRnkzIHNwYW46bnRoLWNoaWxkKDEpIHtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBoZWlnaHQ6IDFweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzQsIDIzNCwgMjM0KTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uUmVnaXN0ZXItYWxyZWFkeS0tTEZ5MyBzcGFuOm50aC1jaGlsZCgyKSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMzBweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9SZWdpc3Rlci9SZWdpc3Rlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLHFDQUFxQztFQUNyQyxlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtDQUN4QlwiLFwiZmlsZVwiOlwiUmVnaXN0ZXIuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5yb290IHtcXG4gIG1heC13aWR0aDogNTcwcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwcHg7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXFxuLmFscmVhZHkge1xcbiAgbWFyZ2luLWJvdHRvbTogMjdweDtcXG59XFxuXFxuLmFscmVhZHkgc3BhbjpudGgtY2hpbGQoMSkge1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIGhlaWdodDogMXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzNCwgMjM0LCAyMzQpO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi5hbHJlYWR5IHNwYW46bnRoLWNoaWxkKDIpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6IHJnYig1MSwgNTEsIDUxKTtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJSZWdpc3Rlci1yb290LTNrdjN0XCIsXG5cdFwiYWxyZWFkeVwiOiBcIlJlZ2lzdGVyLWFscmVhZHktLUxGeTNcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9tb2R1bGVzL1VzZXIvY29tcG9uZW50cy9SZWdpc3Rlci9SZWdpc3Rlci5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuaHRtbCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwIDMycHg7XFxuICBwYWRkaW5nOiAwIDJyZW07XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjODg4O1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjNTU1O1xcbn1cXG5cXG5wcmUge1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7O0dBT0c7O0FBRUg7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtNQUNuQixvQkFBb0I7RUFDeEIsc0JBQXNCO01BQ2xCLHdCQUF3QjtFQUM1QixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYix3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLFVBQVU7Q0FDWDs7QUFFRDtFQUNFLGlCQUFpQjtFQUNqQixZQUFZO0NBQ2I7O0FBRUQ7RUFDRSxzQkFBc0I7RUFDdEIsaUJBQWlCO0NBQ2xCXCIsXCJmaWxlXCI6XCJFcnJvclBhZ2UuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuaHRtbCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwIDMycHg7XFxuICBwYWRkaW5nOiAwIDJyZW07XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjODg4O1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjNTU1O1xcbn1cXG5cXG5wcmUge1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG46cm9vdCB7XFxuICAvKlxcbiAgICogVHlwb2dyYXBoeVxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTGF5b3V0XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC8qXFxuICAgKiBNZWRpYSBxdWVyaWVzIGJyZWFrcG9pbnRzXFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8gIC8qIEV4dHJhIHNtYWxsIHNjcmVlbiAvIHBob25lICovICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi8gIC8qIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wICovIC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4uSG9tZS1yb290LTFhdmw3IHtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDBweDtcXG59XFxuXFxuLkhvbWUtaGVhZGVyLXdpdHNjIHtcXG4gIG1hcmdpbi1ib3R0b206IDU2cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5Ib21lLXRpdGxlLTJSYXY2IHtcXG4gIG1hcmdpbjogMDtcXG4gIGNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyOHB4O1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMjhweDtcXG59XFxuXFxuLkhvbWUtZGV2aWRlci0xYWZCUCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogNzBweDtcXG4gIGhlaWdodDogMXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTcsIDE3LCAxNyk7XFxufVxcblxcbi5Ib21lLWRlc2NyLTExdnVnIHtcXG4gIGNvbG9yOiByZ2IoODUsIDg1LCA4NSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxufVxcblxcbi5Ib21lLXRhYnNIZWFkZXItMUpkcjkge1xcbiAgLW1zLWZsZXgtcG9zaXRpdmU6IDA7XFxuICAgICAgZmxleC1ncm93OiAwO1xcbiAgLW1zLWZsZXgtbmVnYXRpdmU6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogY2FsYyg4My4yNSUgLSA1cHgpO1xcbiAgICAgIGZsZXgtYmFzaXM6IGNhbGMoODMuMjUlIC0gNXB4KTtcXG4gIG1heC13aWR0aDogY2FsYyg4My4yNSUgLSA1cHgpO1xcbiAgd2lkdGg6IGNhbGMoODMuMjUlIC0gNXB4KTtcXG4gIG1hcmdpbi1sZWZ0OiBjYWxjKDguMzI1JSArIDIuNXB4KSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uSG9tZS10YWJzSGVhZGVyLTFKZHI5Om50aC1jaGlsZCgxbikge1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcblxcbi5Ib21lLXRhYnNIZWFkZXItMUpkcjk6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi5Ib21lLXRhYnNIZWFkZXItMUpkcjk6bnRoLWNoaWxkKDEybikge1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi5Ib21lLWp1bWJvdHJvbi0xSkZPUCB7XFxuICBtYXJnaW4tYm90dG9tOiA3N3B4O1xcbn1cXG5cXG4uSG9tZS1hY2NlbnRQcm9kdWN0cy0yUXZzeSB7XFxuICBtYXJnaW4tYm90dG9tOiAxMDBweDtcXG59XFxuXFxuLkhvbWUtbG9hZE1vcmUtMVFxYUwge1xcbiAgbWFyZ2luLXRvcDogNzdweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9ob21lL0hvbWUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7O0dBT0c7O0FBRUg7Ozs7Ozs7R0FPRzs7QUFFSDtFQUNFOztnRkFFOEU7O0VBRTlFOztnRkFFOEU7O0VBRTlFOztnRkFFOEUsRUFBRSxnQ0FBZ0MsRUFBRSwyQkFBMkIsRUFBRSw2QkFBNkIsQ0FBQyxpQ0FBaUM7Q0FDL007O0FBRUQ7RUFDRSxzQkFBc0I7Q0FDdkI7O0FBRUQ7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0UsVUFBVTtFQUNWLHVCQUF1QjtFQUN2QixtQ0FBbUM7RUFDbkMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0NBQ3hCOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixrQ0FBa0M7Q0FDbkM7O0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtDQUN4Qjs7QUFFRDtFQUNFLHFCQUFxQjtNQUNqQixhQUFhO0VBQ2pCLHFCQUFxQjtNQUNqQixlQUFlO0VBQ25CLDRDQUE0QztNQUN4QywrQkFBK0I7RUFDbkMsOEJBQThCO0VBQzlCLDBCQUEwQjtFQUMxQiw2Q0FBNkM7Q0FDOUM7O0FBRUQ7RUFDRSxtQkFBbUI7RUFDbkIsZUFBZTtDQUNoQjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7Q0FDbkI7O0FBRUQ7RUFDRSxvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxxQkFBcUI7Q0FDdEI7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0NBQ3BCXCIsXCJmaWxlXCI6XCJIb21lLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuOnJvb3Qge1xcbiAgLypcXG4gICAqIFR5cG9ncmFwaHlcXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovICAvKiBFeHRyYSBzbWFsbCBzY3JlZW4gLyBwaG9uZSAqLyAgLyogU21hbGwgc2NyZWVuIC8gdGFibGV0ICovICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqLyAvKiBMYXJnZSBzY3JlZW4gLyB3aWRlIGRlc2t0b3AgKi9cXG59XFxuXFxuLnJvb3Qge1xcbiAgcGFkZGluZy1ib3R0b206IDEwMHB4O1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDU2cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZSB7XFxuICBtYXJnaW46IDA7XFxuICBjb2xvcjogcmdiKDE3LCAxNywgMTcpO1xcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI4cHg7XFxufVxcblxcbi5kZXZpZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA3MHB4O1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNywgMTcsIDE3KTtcXG59XFxuXFxuLmRlc2NyIHtcXG4gIGNvbG9yOiByZ2IoODUsIDg1LCA4NSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjE0cHg7XFxufVxcblxcbi50YWJzSGVhZGVyIHtcXG4gIC1tcy1mbGV4LXBvc2l0aXZlOiAwO1xcbiAgICAgIGZsZXgtZ3JvdzogMDtcXG4gIC1tcy1mbGV4LW5lZ2F0aXZlOiAwO1xcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6IGNhbGMoODMuMjUlIC0gNXB4KTtcXG4gICAgICBmbGV4LWJhc2lzOiBjYWxjKDgzLjI1JSAtIDVweCk7XFxuICBtYXgtd2lkdGg6IGNhbGMoODMuMjUlIC0gNXB4KTtcXG4gIHdpZHRoOiBjYWxjKDgzLjI1JSAtIDVweCk7XFxuICBtYXJnaW4tbGVmdDogY2FsYyg4LjMyNSUgKyAyLjVweCkgIWltcG9ydGFudDtcXG59XFxuXFxuLnRhYnNIZWFkZXI6bnRoLWNoaWxkKDFuKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuXFxuLnRhYnNIZWFkZXI6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcblxcbi50YWJzSGVhZGVyOm50aC1jaGlsZCgxMm4pIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uanVtYm90cm9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDc3cHg7XFxufVxcblxcbi5hY2NlbnRQcm9kdWN0cyB7XFxuICBtYXJnaW4tYm90dG9tOiAxMDBweDtcXG59XFxuXFxuLmxvYWRNb3JlIHtcXG4gIG1hcmdpbi10b3A6IDc3cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiSG9tZS1yb290LTFhdmw3XCIsXG5cdFwiaGVhZGVyXCI6IFwiSG9tZS1oZWFkZXItd2l0c2NcIixcblx0XCJ0aXRsZVwiOiBcIkhvbWUtdGl0bGUtMlJhdjZcIixcblx0XCJkZXZpZGVyXCI6IFwiSG9tZS1kZXZpZGVyLTFhZkJQXCIsXG5cdFwiZGVzY3JcIjogXCJIb21lLWRlc2NyLTExdnVnXCIsXG5cdFwidGFic0hlYWRlclwiOiBcIkhvbWUtdGFic0hlYWRlci0xSmRyOVwiLFxuXHRcImp1bWJvdHJvblwiOiBcIkhvbWUtanVtYm90cm9uLTFKRk9QXCIsXG5cdFwiYWNjZW50UHJvZHVjdHNcIjogXCJIb21lLWFjY2VudFByb2R1Y3RzLTJRdnN5XCIsXG5cdFwibG9hZE1vcmVcIjogXCJIb21lLWxvYWRNb3JlLTFRcWFMXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeScpO1xuXG52YXIgX3N0cmluZ2lmeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHJpbmdpZnkpO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXknKTtcblxudmFyIF9zbGljZWRUb0FycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NsaWNlZFRvQXJyYXkyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBJc29tb3JwaGljIENTUyBzdHlsZSBsb2FkZXIgZm9yIFdlYnBhY2tcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNS1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBwcmVmaXggPSAncyc7XG52YXIgaW5zZXJ0ZWQgPSB7fTtcblxuLy8gQmFzZTY0IGVuY29kaW5nIGFuZCBkZWNvZGluZyAtIFRoZSBcIlVuaWNvZGUgUHJvYmxlbVwiXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93QmFzZTY0L0Jhc2U2NF9lbmNvZGluZ19hbmRfZGVjb2RpbmcjVGhlX1VuaWNvZGVfUHJvYmxlbVxuZnVuY3Rpb24gYjY0RW5jb2RlVW5pY29kZShzdHIpIHtcbiAgcmV0dXJuIGJ0b2EoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvJShbMC05QS1GXXsyfSkvZywgZnVuY3Rpb24gKG1hdGNoLCBwMSkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKCcweCcgKyBwMSk7XG4gIH0pKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgc3R5bGUvbGluayBlbGVtZW50cyBmb3Igc3BlY2lmaWVkIG5vZGUgSURzXG4gKiBpZiB0aGV5IGFyZSBubyBsb25nZXIgcmVmZXJlbmNlZCBieSBVSSBjb21wb25lbnRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVDc3MoaWRzKSB7XG4gIGlkcy5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgIGlmICgtLWluc2VydGVkW2lkXSA8PSAwKSB7XG4gICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCArIGlkKTtcbiAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEV4YW1wbGU6XG4gKiAgIC8vIEluc2VydCBDU1Mgc3R5bGVzIG9iamVjdCBnZW5lcmF0ZWQgYnkgYGNzcy1sb2FkZXJgIGludG8gRE9NXG4gKiAgIHZhciByZW1vdmVDc3MgPSBpbnNlcnRDc3MoW1sxLCAnYm9keSB7IGNvbG9yOiByZWQ7IH0nXV0pO1xuICpcbiAqICAgLy8gUmVtb3ZlIGl0IGZyb20gdGhlIERPTVxuICogICByZW1vdmVDc3MoKTtcbiAqL1xuZnVuY3Rpb24gaW5zZXJ0Q3NzKHN0eWxlcykge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG4gICAgICBfcmVmJHJlcGxhY2UgPSBfcmVmLnJlcGxhY2UsXG4gICAgICByZXBsYWNlID0gX3JlZiRyZXBsYWNlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkcmVwbGFjZSxcbiAgICAgIF9yZWYkcHJlcGVuZCA9IF9yZWYucHJlcGVuZCxcbiAgICAgIHByZXBlbmQgPSBfcmVmJHByZXBlbmQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRwcmVwZW5kO1xuXG4gIHZhciBpZHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX3N0eWxlcyRpID0gKDAsIF9zbGljZWRUb0FycmF5My5kZWZhdWx0KShzdHlsZXNbaV0sIDQpLFxuICAgICAgICBtb2R1bGVJZCA9IF9zdHlsZXMkaVswXSxcbiAgICAgICAgY3NzID0gX3N0eWxlcyRpWzFdLFxuICAgICAgICBtZWRpYSA9IF9zdHlsZXMkaVsyXSxcbiAgICAgICAgc291cmNlTWFwID0gX3N0eWxlcyRpWzNdO1xuXG4gICAgdmFyIGlkID0gbW9kdWxlSWQgKyAnLScgKyBpO1xuXG4gICAgaWRzLnB1c2goaWQpO1xuXG4gICAgaWYgKGluc2VydGVkW2lkXSkge1xuICAgICAgaWYgKCFyZXBsYWNlKSB7XG4gICAgICAgIGluc2VydGVkW2lkXSsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbnNlcnRlZFtpZF0gPSAxO1xuXG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXggKyBpZCk7XG4gICAgdmFyIGNyZWF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKCFlbGVtKSB7XG4gICAgICBjcmVhdGUgPSB0cnVlO1xuXG4gICAgICBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICBlbGVtLmlkID0gcHJlZml4ICsgaWQ7XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNzc1RleHQgPSBjc3M7XG4gICAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gc2tpcCBJRTkgYW5kIGJlbG93LCBzZWUgaHR0cDovL2Nhbml1c2UuY29tL2F0b2ItYnRvYVxuICAgICAgY3NzVGV4dCArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYjY0RW5jb2RlVW5pY29kZSgoMCwgX3N0cmluZ2lmeTIuZGVmYXVsdCkoc291cmNlTWFwKSkgKyAnKi8nO1xuICAgICAgY3NzVGV4dCArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLmZpbGUgKyAnPycgKyBpZCArICcqLyc7XG4gICAgfVxuXG4gICAgaWYgKCd0ZXh0Q29udGVudCcgaW4gZWxlbSkge1xuICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB9XG5cbiAgICBpZiAoY3JlYXRlKSB7XG4gICAgICBpZiAocHJlcGVuZCkge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShlbGVtLCBkb2N1bWVudC5oZWFkLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVtb3ZlQ3NzLmJpbmQobnVsbCwgaWRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRDc3M7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0xIS4uL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9ub3JtYWxpemUuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTEhLi4vcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL25vcm1hbGl6ZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMSEuLi9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vbm9ybWFsaXplLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHtcIm5hbWVcIjpcIndlYlwiLFwidmVyc2lvblwiOlwiMC4wLjBcIixcInByaXZhdGVcIjp0cnVlLFwiZW5naW5lc1wiOntcIm5vZGVcIjpcIj49Ni41XCIsXCJucG1cIjpcIj49My4xMFwifSxcImJyb3dzZXJzbGlzdFwiOltcIj4xJVwiLFwibGFzdCA0IHZlcnNpb25zXCIsXCJGaXJlZm94IEVTUlwiLFwibm90IGllIDwgOVwiXSxcImRlcGVuZGVuY2llc1wiOntcIkBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJ1bnRpbWVcIjpcIl43LjAuMC1iZXRhLjQyXCIsXCJAYmFiZWwvcG9seWZpbGxcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9ydW50aW1lXCI6XCJeNy4wLjAtYmV0YS40MlwiLFwiYW50ZFwiOlwiXjMuMy4wXCIsXCJiYWJlbC1wbHVnaW4taW1wb3J0XCI6XCJeMS42LjdcIixcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOlwiXjYuMjMuMFwiLFwiYmx1ZWJpcmRcIjpcIl4zLjUuMVwiLFwiYm9keS1wYXJzZXJcIjpcIl4xLjE4LjJcIixcImNsYXNzbmFtZXNcIjpcIl4yLjIuNVwiLFwiY29va2llLXBhcnNlclwiOlwiXjEuNC4zXCIsXCJjb3JlLWpzXCI6XCJeMi41LjNcIixcImV4cHJlc3NcIjpcIl40LjE2LjJcIixcImV4cHJlc3MtZ3JhcGhxbFwiOlwiXjAuNi4xMVwiLFwiZXhwcmVzcy1qd3RcIjpcIl41LjMuMFwiLFwiZm9ybWlrXCI6XCJeMC4xMS4xMVwiLFwiZ3JhcGhxbFwiOlwiXjAuMTIuM1wiLFwiaGlzdG9yeVwiOlwiXjQuNy4yXCIsXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlclwiOlwiXjQuMC4wXCIsXCJqc29ud2VidG9rZW5cIjpcIl44LjEuMFwiLFwibG9zdFwiOlwiXjguMi4xXCIsXCJub2RlLWZldGNoXCI6XCJeMi4wLjBcIixcIm5vcm1hbGl6ZS5jc3NcIjpcIl43LjAuMFwiLFwibnVrYS1jYXJvdXNlbFwiOlwiXjQuMC4wXCIsXCJwYXNzcG9ydFwiOlwiXjAuNC4wXCIsXCJwYXNzcG9ydC1mYWNlYm9va1wiOlwiXjIuMS4xXCIsXCJwcmV0dHktZXJyb3JcIjpcIl4yLjEuMVwiLFwicHJvcC10eXBlc1wiOlwiXjE1LjYuMFwiLFwicXVlcnktc3RyaW5nXCI6XCJeNS4wLjFcIixcInJjLXNsaWRlclwiOlwiXjguNi4xXCIsXCJyZWFjdFwiOlwiXjE2LjIuMFwiLFwicmVhY3QtZG9tXCI6XCJeMTYuMi4wXCIsXCJyZWFjdC1mb250YXdlc29tZVwiOlwiXjEuNi4xXCIsXCJyZWFjdC1yZWR1eFwiOlwiXjUuMC42XCIsXCJyZWFjdC1zZWxlY3RcIjpcIl4xLjIuMVwiLFwicmVhY3Qtc3ZnLWxvYWRlclwiOlwiXjIuMS4wXCIsXCJyZWFjdC10YWJzXCI6XCJeMi4yLjFcIixcInJlYWN0LXRyZWViZWFyZFwiOlwiXjIuMS4wXCIsXCJyZWR1eFwiOlwiXjMuNy4yXCIsXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIjpcIl4yLjEzLjJcIixcInJlZHV4LWxvZ2dlclwiOlwiXjMuMC42XCIsXCJyZWR1eC1zYWdhXCI6XCJeMC4xNi4wXCIsXCJyZWR1eC10aHVua1wiOlwiXjIuMi4wXCIsXCJyZXNlbGVjdFwiOlwiXjMuMC4xXCIsXCJzZWFtbGVzcy1pbW11dGFibGVcIjpcIl43LjEuM1wiLFwic2VtYW50aWMtdWktcmVhY3RcIjpcIl4wLjc4LjNcIixcInNlcXVlbGl6ZVwiOlwiXjQuMjguNlwiLFwic2VyaWFsaXplLWphdmFzY3JpcHRcIjpcIl4xLjMuMFwiLFwic291cmNlLW1hcC1zdXBwb3J0XCI6XCJeMC41LjBcIixcInNxbGl0ZTNcIjpcIl4zLjEuMTNcIixcInVuaXZlcnNhbC1yb3V0ZXJcIjpcIl42LjAuMFwiLFwid2hhdHdnLWZldGNoXCI6XCJeMi4wLjNcIixcInl1cFwiOlwiXjAuMjQuMVwifSxcImRldkRlcGVuZGVuY2llc1wiOntcIkBiYWJlbC9jb3JlXCI6XCJeNy4wLjAtYmV0YS40MlwiLFwiQGJhYmVsL25vZGVcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWNvbnN0YW50LWVsZW1lbnRzXCI6XCI3LjAuMC1iZXRhLjM5XCIsXCJAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1pbmxpbmUtZWxlbWVudHNcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wcmVzZXQtZW52XCI6XCI3LjAuMC1iZXRhLjM5XCIsXCJAYmFiZWwvcHJlc2V0LWZsb3dcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wcmVzZXQtcmVhY3RcIjpcIjcuMC4wLWJldGEuMzlcIixcIkBiYWJlbC9wcmVzZXQtc3RhZ2UtMlwiOlwiNy4wLjAtYmV0YS4zOVwiLFwiYXNzZXRzLXdlYnBhY2stcGx1Z2luXCI6XCJeMy41LjFcIixcImF1dG9wcmVmaXhlclwiOlwiXjcuMi4zXCIsXCJiYWJlbC1jb3JlXCI6XCJeNy4wLjAtMFwiLFwiYmFiZWwtZXNsaW50XCI6XCJeOC4xLjJcIixcImJhYmVsLWplc3RcIjpcIl4yMi4wLjRcIixcImJhYmVsLWxvYWRlclwiOlwiOC4wLjAtYmV0YS4wXCIsXCJiYWJlbC1wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LXJlbW92ZS1wcm9wLXR5cGVzXCI6XCJeMC40LjEyXCIsXCJicm93c2VyLXN5bmNcIjpcIl4yLjIxLjBcIixcImNob2tpZGFyXCI6XCJeMi4wLjBcIixcImNzcy1sb2FkZXJcIjpcIl4wLjI4LjdcIixcImVuenltZVwiOlwiXjMuMi4wXCIsXCJlc2xpbnRcIjpcIl40LjE0LjBcIixcImVzbGludC1jb25maWctYWlyYm5iXCI6XCJeMTYuMS4wXCIsXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6XCJeMi45LjBcIixcImVzbGludC1pbXBvcnQtcmVzb2x2ZXItbm9kZVwiOlwiXjAuMy4xXCIsXCJlc2xpbnQtbG9hZGVyXCI6XCJeMS45LjBcIixcImVzbGludC1wbHVnaW4tY3NzLW1vZHVsZXNcIjpcIl4yLjcuNVwiLFwiZXNsaW50LXBsdWdpbi1mbG93dHlwZVwiOlwiXjIuNDAuMVwiLFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjpcIl4yLjguMFwiLFwiZXNsaW50LXBsdWdpbi1qc3gtYTExeVwiOlwiXjYuMC4zXCIsXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6XCJeMi40LjBcIixcImVzbGludC1wbHVnaW4tcmVhY3RcIjpcIl43LjUuMVwiLFwiZmlsZS1sb2FkZXJcIjpcIl4xLjEuNlwiLFwiZmxvdy1iaW5cIjpcIl4wLjY1LjBcIixcImZyb250LW1hdHRlclwiOlwiXjIuMy4wXCIsXCJnbG9iXCI6XCJeNy4xLjJcIixcImh1c2t5XCI6XCJeMC4xNC4zXCIsXCJpZGVudGl0eS1vYmotcHJveHlcIjpcIl4zLjAuMFwiLFwiamVzdFwiOlwiXjIyLjAuNFwiLFwibGludC1zdGFnZWRcIjpcIl42LjAuMFwiLFwibWFya2Rvd24taXRcIjpcIl44LjQuMFwiLFwibWtkaXJwXCI6XCJeMC41LjFcIixcIm51bGwtbG9hZGVyXCI6XCJeMC4xLjFcIixcIm9wbi1jbGlcIjpcIl4zLjEuMFwiLFwicGl4cmVtXCI6XCJeNC4wLjFcIixcInBsZWVlYXNlLWZpbHRlcnNcIjpcIl40LjAuMFwiLFwicG9zdGNzc1wiOlwiXjYuMC4xNFwiLFwicG9zdGNzcy1jYWxjXCI6XCJeNi4wLjFcIixcInBvc3Rjc3MtY29sb3ItZnVuY3Rpb25cIjpcIl40LjAuMVwiLFwicG9zdGNzcy1jdXN0b20tbWVkaWFcIjpcIl42LjAuMFwiLFwicG9zdGNzcy1jdXN0b20tcHJvcGVydGllc1wiOlwiXjYuMi4wXCIsXCJwb3N0Y3NzLWN1c3RvbS1zZWxlY3RvcnNcIjpcIl40LjAuMVwiLFwicG9zdGNzcy1mbGV4YnVncy1maXhlc1wiOlwiXjMuMi4wXCIsXCJwb3N0Y3NzLWltcG9ydFwiOlwiXjExLjAuMFwiLFwicG9zdGNzcy1sb2FkZXJcIjpcIl4yLjAuOVwiLFwicG9zdGNzcy1tZWRpYS1taW5tYXhcIjpcIl4zLjAuMFwiLFwicG9zdGNzcy1uZXN0ZWRcIjpcIl4zLjAuMFwiLFwicG9zdGNzcy1uZXN0aW5nXCI6XCJeNC4yLjFcIixcInBvc3Rjc3MtcHNldWRvZWxlbWVudHNcIjpcIl41LjAuMFwiLFwicG9zdGNzcy1zZWxlY3Rvci1tYXRjaGVzXCI6XCJeMy4wLjFcIixcInBvc3Rjc3Mtc2VsZWN0b3Itbm90XCI6XCJeMy4wLjFcIixcInByZXR0aWVyXCI6XCJeMS45LjJcIixcInJhdy1sb2FkZXJcIjpcIl4wLjUuMVwiLFwicmVhY3QtZGVlcC1mb3JjZS11cGRhdGVcIjpcIl4yLjEuMVwiLFwicmVhY3QtZGV2LXV0aWxzXCI6XCJeNS4wLjBcIixcInJlYWN0LWVycm9yLW92ZXJsYXlcIjpcIl40LjAuMFwiLFwicmVhY3QtdGVzdC1yZW5kZXJlclwiOlwiXjE2LjIuMFwiLFwicmVkdXgtbW9jay1zdG9yZVwiOlwiXjEuNC4wXCIsXCJyaW1yYWZcIjpcIl4yLjYuMlwiLFwic3R5bGVsaW50XCI6XCJeOC40LjBcIixcInN0eWxlbGludC1jb25maWctc3RhbmRhcmRcIjpcIl4xOC4wLjBcIixcInN0eWxlbGludC1vcmRlclwiOlwiXjAuOC4wXCIsXCJzdmctdXJsLWxvYWRlclwiOlwiXjIuMy4xXCIsXCJ1cmwtbG9hZGVyXCI6XCJeMC42LjJcIixcIndlYnBhY2tcIjpcIl4zLjEwLjBcIixcIndlYnBhY2stYnVuZGxlLWFuYWx5emVyXCI6XCJeMi45LjFcIixcIndlYnBhY2stZGV2LW1pZGRsZXdhcmVcIjpcIl4yLjAuM1wiLFwid2VicGFjay1ob3QtbWlkZGxld2FyZVwiOlwiXjIuMjEuMFwiLFwid2VicGFjay1ub2RlLWV4dGVybmFsc1wiOlwiXjEuNi4wXCJ9LFwic2NyaXB0c1wiOntcImxpbnQtanNcIjpcImVzbGludCAtLWlnbm9yZS1wYXRoIC5naXRpZ25vcmUgLS1pZ25vcmUtcGF0dGVybiBcXFwiISoqLy4qXFxcIiAuXCIsXCJsaW50LWNzc1wiOlwic3R5bGVsaW50IFxcXCJzcmMvKiovKi57Y3NzLGxlc3Msc3R5bCxzY3NzLHNhc3Msc3NzfVxcXCJcIixcImxpbnRcIjpcInlhcm4gcnVuIGxpbnQtanMgJiYgeWFybiBydW4gbGludC1jc3NcIixcImZpeC1qc1wiOlwieWFybiBydW4gbGludC1qcyAtLWZpeFwiLFwiZml4LWNzc1wiOlwieWFybiBydW4gbGludC1jc3MgLS1maXhcIixcImZpeFwiOlwieWFybiBydW4gZml4LWpzICYmIHlhcm4gcnVuIGZpeC1jc3NcIixcImNoZWNrXCI6XCJmbG93IGNoZWNrXCIsXCJ0ZXN0XCI6XCJqZXN0XCIsXCJ0ZXN0LXdhdGNoXCI6XCJ5YXJuIHJ1biB0ZXN0IC0td2F0Y2ggLS1ub3RpZnlcIixcInRlc3QtY292ZXJcIjpcInlhcm4gcnVuIHRlc3QgLS1jb3ZlcmFnZVwiLFwiY292ZXJhZ2VcIjpcInlhcm4gcnVuIHRlc3QtY292ZXIgJiYgb3BuIGNvdmVyYWdlL2xjb3YtcmVwb3J0L2luZGV4Lmh0bWxcIixcImNsZWFuXCI6XCJiYWJlbC1ub2RlIHRvb2xzL3J1biBjbGVhblwiLFwiY29weVwiOlwiYmFiZWwtbm9kZSB0b29scy9ydW4gY29weVwiLFwiYnVuZGxlXCI6XCJiYWJlbC1ub2RlIHRvb2xzL3J1biBidW5kbGVcIixcImJ1aWxkXCI6XCJiYWJlbC1ub2RlIHRvb2xzL3J1biBidWlsZFwiLFwiYnVpbGQtc3RhdHNcIjpcInlhcm4gcnVuIGJ1aWxkIC0tcmVsZWFzZSAtLWFuYWx5c2VcIixcImRlcGxveVwiOlwiYmFiZWwtbm9kZSB0b29scy9ydW4gZGVwbG95XCIsXCJyZW5kZXJcIjpcImJhYmVsLW5vZGUgdG9vbHMvcnVuIHJlbmRlclwiLFwic2VydmVcIjpcImJhYmVsLW5vZGUgdG9vbHMvcnVuIHJ1blNlcnZlclwiLFwic3RhcnRcIjpcImJhYmVsLW5vZGUgdG9vbHMvcnVuIHN0YXJ0XCJ9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcGFja2FnZS5qc29uXG4vLyBtb2R1bGUgaWQgPSAuL3BhY2thZ2UuanNvblxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0FjY2VudFByb2R1Y3RzLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BY2NlbnRQcm9kdWN0cy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BY2NlbnRQcm9kdWN0cy5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9BY2NlbnRQcm9kdWN0cy9BY2NlbnRQcm9kdWN0cy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMvQWNjZW50UHJvZHVjdHMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IENhcmRMYWJlbCBmcm9tICdjb21wb25lbnRzL0NhcmRMYWJlbCc7XG5pbXBvcnQgcyBmcm9tICcuL0FjY2VudFByb2R1Y3RzLmNzcyc7XG5cbmNsYXNzIEFjY2VudFByb2R1Y3RzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpc3QsIGNsYXNzZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChbcy5yb290LCBjbGFzc2VzLnJvb3RdKX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChbcy5wcm9kdWN0LCBzLnByb2R1Y3RTbWFsbF0pfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5uYW1lfT57bGlzdFswXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5wcmljZX0+XG4gICAgICAgICAgICAgIDxzcGFuPiQ8L3NwYW4+XG4gICAgICAgICAgICAgIHtsaXN0WzBdLnByaWNlfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeChbcy5wcm9kdWN0LCBzLnByb2R1Y3RTbWFsbF0pfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5uYW1lfT57bGlzdFsxXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5wcmljZX0+XG4gICAgICAgICAgICAgIDxzcGFuPiQ8L3NwYW4+XG4gICAgICAgICAgICAgIHtsaXN0WzFdLnByaWNlfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MuaXRlbX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KFtzLnByb2R1Y3QsIHMucHJvZHVjdEJpZ10pfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5uYW1lfT57bGlzdFsyXS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy5wcmljZX0+XG4gICAgICAgICAgICAgIDxzcGFuPiQ8L3NwYW4+IHtsaXN0WzJdLnByaWNlfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MuaXRlbX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KFtzLnByb2R1Y3QsIHMucHJvZHVjdEJpZ10pfT5cbiAgICAgICAgICAgIDxDYXJkTGFiZWxcbiAgICAgICAgICAgICAgdHlwZT1cInRhcGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBIb3RcbiAgICAgICAgICAgIDwvQ2FyZExhYmVsPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLm5hbWV9PntsaXN0WzNdLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLnByaWNlfT5cbiAgICAgICAgICAgICAgPHNwYW4+JDwvc3Bhbj5cbiAgICAgICAgICAgICAge2xpc3RbM10ucHJpY2V9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5pdGVtfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goW3MucHJvZHVjdCwgcy5wcm9kdWN0U21hbGwsIHMucmlnaHRdKX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MubmFtZX0+e2xpc3RbNF0ubmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MucHJpY2V9PlxuICAgICAgICAgICAgICA8c3Bhbj4kPC9zcGFuPlxuICAgICAgICAgICAgICB7bGlzdFs0XS5wcmljZX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goW3MucHJvZHVjdCwgcy5wcm9kdWN0U21hbGwsIHMucmlnaHRdKX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MubmFtZX0+e2xpc3RbNV0ubmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MucHJpY2V9PlxuICAgICAgICAgICAgICA8c3Bhbj4kPC9zcGFuPlxuICAgICAgICAgICAgICB7bGlzdFs1XS5wcmljZX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFjY2VudFByb2R1Y3RzLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICBsaXN0OiBbXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gICAgeyBuYW1lOiAnRXhjbyA0IDhmdCBNYXR0ZSBCbGFjaycsIHByaWNlOiAnMjQuMDAnIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEFjY2VudFByb2R1Y3RzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9BY2NlbnRQcm9kdWN0cy9BY2NlbnRQcm9kdWN0cy5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQWRkVG9DYXJkLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9BZGRUb0NhcmQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQWRkVG9DYXJkLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0FkZFRvQ2FyZC9BZGRUb0NhcmQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9BZGRUb0NhcmQuY3NzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5cbmNvbnN0IEFkZFRvQ2FyZCA9ICh7IGhhbmRsZUNsaWNrLCB2aXNpYmxlIH0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgcy5yb290LFxuICAgICAge1xuICAgICAgICBbcy52aXNpYmxlXTogdmlzaWJsZSxcbiAgICAgIH0sXG4gICAgXSl9XG4gICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gID5cbiAgICA8Rm9udEF3ZXNvbWUgbmFtZT1cInNob3BwaW5nLWNhcnRcIiBjbGFzc05hbWU9e3MuaWNvbn0gLz5cbiAgICA8c3BhbiBjbGFzc05hbWU9e3MubGFiZWx9PkFkZCB0byBDYXJ0PC9zcGFuPlxuICA8L2Rpdj5cbik7XG5cbkFkZFRvQ2FyZC5kZWZhdWx0UHJvcHMgPSB7XG4gIGhhbmRsZUNsaWNrOiAoKSA9PiB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEFkZFRvQ2FyZCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQWRkVG9DYXJkL0FkZFRvQ2FyZC5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcm92aWRlciBhcyBSZWR1eFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jb25zdCBDb250ZXh0VHlwZSA9IHtcbiAgLy8gRW5hYmxlcyBjcml0aWNhbCBwYXRoIENTUyByZW5kZXJpbmdcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaWFzb2Z0L2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyXG4gIGluc2VydENzczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgLy8gVW5pdmVyc2FsIEhUVFAgY2xpZW50XG4gIGZldGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBwYXRobmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBxdWVyeTogUHJvcFR5cGVzLm9iamVjdCxcbiAgY3VycmVuY3k6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgLy8gSW50ZWdyYXRlIFJlZHV4XG4gIC8vIGh0dHA6Ly9yZWR1eC5qcy5vcmcvZG9jcy9iYXNpY3MvVXNhZ2VXaXRoUmVhY3QuaHRtbFxuICAuLi5SZWR1eFByb3ZpZGVyLmNoaWxkQ29udGV4dFR5cGVzLFxufTtcblxuLyoqXG4gKiBUaGUgdG9wLWxldmVsIFJlYWN0IGNvbXBvbmVudCBzZXR0aW5nIGNvbnRleHQgKGdsb2JhbCkgdmFyaWFibGVzXG4gKiB0aGF0IGNhbiBiZSBhY2Nlc3NlZCBmcm9tIGFsbCB0aGUgY2hpbGQgY29tcG9uZW50cy5cbiAqXG4gKiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2NvbnRleHQuaHRtbFxuICpcbiAqIFVzYWdlIGV4YW1wbGU6XG4gKlxuICogICBjb25zdCBjb250ZXh0ID0ge1xuICogICAgIGhpc3Rvcnk6IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCksXG4gKiAgICAgc3RvcmU6IGNyZWF0ZVN0b3JlKCksXG4gKiAgIH07XG4gKlxuICogICBSZWFjdERPTS5yZW5kZXIoXG4gKiAgICAgPEFwcCBjb250ZXh0PXtjb250ZXh0fT5cbiAqICAgICAgIDxMYXlvdXQ+XG4gKiAgICAgICAgIDxMYW5kaW5nUGFnZSAvPlxuICogICAgICAgPC9MYXlvdXQ+XG4gKiAgICAgPC9BcHA+LFxuICogICAgIGNvbnRhaW5lcixcbiAqICAgKTtcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29udGV4dDogUHJvcFR5cGVzLnNoYXBlKENvbnRleHRUeXBlKS5pc1JlcXVpcmVkLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IENvbnRleHRUeXBlO1xuXG4gIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZXh0O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIE5PVEU6IElmIHlvdSBuZWVkIHRvIGFkZCBvciBtb2RpZnkgaGVhZGVyLCBmb290ZXIgZXRjLiBvZiB0aGUgYXBwLFxuICAgIC8vIHBsZWFzZSBkbyB0aGF0IGluc2lkZSB0aGUgTGF5b3V0IGNvbXBvbmVudC5cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQXBwLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9CYW5uZXIuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0Jhbm5lci5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9CYW5uZXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvQmFubmVyL0Jhbm5lci5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBDYXJvdXNlbCBmcm9tICdudWthLWNhcm91c2VsJztcbmltcG9ydCBzIGZyb20gJy4vQmFubmVyLmNzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgRm9udEF3ZXNvbWUgZnJvbSAncmVhY3QtZm9udGF3ZXNvbWUnO1xuXG5jb25zdCBCYW5uZXIgPSBwcm9wcyA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgIDxDYXJvdXNlbFxuICAgICAgY2VsbEFsaWduPVwibGVmdFwiXG4gICAgICBjbGFzc05hbWU9e3Muc2xpZGVyfVxuICAgICAgcmVuZGVyQm90dG9tQ2VudGVyQ29udHJvbHM9eyhwcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBib3ggPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb3BzLnNsaWRlQ291bnQ7IGkrKykge1xuICAgICAgICAgIGJveC5wdXNoKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwcm9wcy5nb1RvU2xpZGUoaSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgICAgICAgICBzLmRvdHMsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBbcy5hY3RpdmVEb3RdOiBpID09PSBwcm9wcy5jdXJyZW50U2xpZGUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pfSAvPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm94O1xuICAgICAgfX1cbiAgICAgIHJlbmRlckNlbnRlckxlZnRDb250cm9scz17KHtwcmV2aW91c1NsaWRlfSkgPT4gKFxuICAgICAgICA8Rm9udEF3ZXNvbWVcbiAgICAgICAgICBvbkNsaWNrPXtwcmV2aW91c1NsaWRlfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgICAgICAgcy5hcnJvdyxcbiAgICAgICAgICAgIHMuYXJyb3dMZWZ0LFxuICAgICAgICAgIF0pfVxuICAgICAgICAgIHNpemU9XCIyeFwiXG4gICAgICAgICAgbmFtZT1cImxvbmctYXJyb3ctbGVmdFwiXG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgcmVuZGVyQ2VudGVyUmlnaHRDb250cm9scz17KHtuZXh0U2xpZGV9KSA9PiAoXG4gICAgICAgIDxGb250QXdlc29tZVxuICAgICAgICAgIG9uQ2xpY2s9e25leHRTbGlkZX1cbiAgICAgICAgICBjbGFzc05hbWU9e2N4KFtcbiAgICAgICAgICAgIHMuYXJyb3csXG4gICAgICAgICAgICBzLmFycm93UmlnaHQsXG4gICAgICAgICAgXSl9XG4gICAgICAgICAgc2l6ZT1cIjJ4XCJcbiAgICAgICAgICBuYW1lPVwibG9uZy1hcnJvdy1yaWdodFwiXG4gICAgICAgIC8+XG4gICAgICApfVxuICAgID5cbiAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L0Nhcm91c2VsPlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQmFubmVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9CYW5uZXIvQmFubmVyLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Db250ZW50LmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Db250ZW50LmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0NvbnRlbnQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQmFubmVyL2NvbXBvbmVudHMvQ29udGVudC9Db250ZW50LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ2NvbXBvbmVudHMvQnV0dG9uJztcbmltcG9ydCBSYXRpbmcgZnJvbSAnY29tcG9uZW50cy9SYXRpbmcnO1xuaW1wb3J0IHMgZnJvbSAnLi9Db250ZW50LmNzcyc7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ2NvbXBvbmVudHMvQ29udGFpbmVyJztcblxuY29uc3QgQ29udGVudCA9ICh7XG4gIHRpdGxlLFxuICBwcmljZSxcbiAgYnV0dG9uTGFiZWwsXG4gICAgICAgICAgICAgICAgIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDxoMSBjbGFzc05hbWU9e3MudGl0bGV9Pnt0aXRsZX08L2gxPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3MucHJpY2VXcmFwcGVyfT5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmN1cnJlbmN5fT4kPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MucHJpY2V9PntwcmljZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxSYXRpbmcgY2xhc3Nlcz17eyByb290OiBzLnJhdGluZyB9fSAvPlxuICAgICAgPEJ1dHRvbj5cbiAgICAgICAge2J1dHRvbkxhYmVsfVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Db250YWluZXI+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShDb250ZW50KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQuanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0J1dHRvbi5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQnV0dG9uLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0J1dHRvbi5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0J1dHRvbi5jc3MnO1xuXG5jb25zdCBCdXR0b24gPSAoeyBjbGFzc2VzLCBvbkNsaWNrLCBjaGlsZHJlbiwgdGhlbWUsIGZ1bGxXaWR0aCwgaXNMb2FkaW5nLCAuLi5yZXN0IH0pID0+IChcbiAgPGJ1dHRvblxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgY2xhc3NOYW1lPXtjeChbXG4gICAgICBzLnJvb3QsXG4gICAgICAoW3NbdGhlbWVdXTogdHJ1ZSksXG4gICAgICB7XG4gICAgICAgIFtzLmZ1bGxXaWR0aF06IGZ1bGxXaWR0aCxcbiAgICAgIH0sXG4gICAgICBjbGFzc2VzLnJvb3QsXG4gICAgXSl9XG4gICAgey4uLnJlc3R9XG4gID5cbiAgICB7aXNMb2FkaW5nID8gKFxuICAgICAgPEZvbnRBd2Vzb21lXG4gICAgICAgIHB1bHNlXG4gICAgICAgIG5hbWU9XCJzcGlubmVyXCJcbiAgICAgIC8+XG4gICAgKSA6IGNoaWxkcmVuIH1cbiAgPC9idXR0b24+XG4pO1xuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICB0aGVtZTogJycsXG4gIGZ1bGxXaWR0aDogZmFsc2UsXG4gIGlzTG9hZGluZzogZmFsc2UsXG59O1xuXG5CdXR0b24ucHJvcFR5cGVzID0ge1xuICBjbGFzc2VzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJvb3Q6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxufTtcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQnV0dG9uKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0NhcmQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9DYXJkL0NhcmQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIlxuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IEZvbnRBd2Vzb21lIGZyb20gJ3JlYWN0LWZvbnRhd2Vzb21lJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBDYXJkTGFiZWwgZnJvbSAnY29tcG9uZW50cy9DYXJkTGFiZWwvQ2FyZExhYmVsJztcbmltcG9ydCBBZGRUb0NhcmQgZnJvbSAnY29tcG9uZW50cy9BZGRUb0NhcmQnO1xuaW1wb3J0IHMgZnJvbSAnLi9DYXJkLmNzcyc7XG5cbmNsYXNzIENhcmQgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgdmlzaWJsZUFkZFRvOiBmYWxzZSxcbiAgfVxuXG4gIHRvZ2dsZVZpc2libGVBZGRUbyA9ICgpID0+IHtcbiAgICBpZih0aGlzLnByb3BzLmxhYmVsVHlwZSAhPT0gJ3N0b2NrJykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZpc2libGVBZGRUbzogIXRoaXMuc3RhdGUudmlzaWJsZUFkZFRvLFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbmFtZSxcbiAgICAgIHByaWNlLFxuICAgICAgYnJhbmQsXG4gICAgICBsYWJlbFR5cGUsXG4gICAgICBsYWJlbFR4dCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17cy5yb290fVxuICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMudG9nZ2xlVmlzaWJsZUFkZFRvfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMudG9nZ2xlVmlzaWJsZUFkZFRvfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5pbm5lcn0+XG4gICAgICAgICAgPEFkZFRvQ2FyZFxuICAgICAgICAgICAgdmlzaWJsZT17dGhpcy5zdGF0ZS52aXNpYmxlQWRkVG99XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT17cy5oZWFkZXJ9PlxuICAgICAgICAgICAgPENhcmRMYWJlbFxuICAgICAgICAgICAgICB0eXBlPXtsYWJlbFR5cGV9PlxuICAgICAgICAgICAgICB7bGFiZWxUeHR9XG4gICAgICAgICAgICA8L0NhcmRMYWJlbD5cbiAgICAgICAgICAgIDxGb250QXdlc29tZVxuICAgICAgICAgICAgICBuYW1lPVwiaGVhcnRcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3MubGlrZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Zm9vdGVyIGNsYXNzTmFtZT17Y3goW1xuICAgICAgICAgIHMuZm9vdGVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFtzLmRpc2FibGVkXTogbGFiZWxUeXBlID09PSAnc3RvY2snLFxuICAgICAgICAgIH1cbiAgICAgICAgXSl9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmZvb3RlckhlYWRlcn0+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIHtuYW1lfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICB7cHJpY2V9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5icmFuZH0+XG4gICAgICAgICAgICB7YnJhbmR9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbkNhcmQucHJvcFR5cGVzID0ge1xuICBwcmljZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGJyYW5kOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGFiZWxUeHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGFiZWxUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQ2FyZCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkR3JpZC5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZEdyaWQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZEdyaWQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQ2FyZEdyaWQvQ2FyZEdyaWQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0NhcmRHcmlkL0NhcmRHcmlkLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vQ2FyZEdyaWQuY3NzJztcbmltcG9ydCBDYXJkIGZyb20gJ2NvbXBvbmVudHMvQ2FyZCc7XG5cbmNvbnN0IENhcmRHcmlkID0gKHsgbGlzdCwgZ3JpZENvdW50IH0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17Y3goW1xuICAgICAgcy5yb290LFxuICAgICAge1xuICAgICAgICBbc1tncmlkQ291bnRdXTogdHJ1ZSxcbiAgICAgIH1cbiAgICBdKX1cbiAgPlxuICAgIHtsaXN0Lm1hcChpdGVtID0+IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICA8Q2FyZCB7Li4uaXRlbX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICkpfVxuICA8L2Rpdj5cbik7XG5cbkNhcmRHcmlkLmRlZmF1bHRQcm9wcyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKENhcmRHcmlkKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9DYXJkR3JpZC9DYXJkR3JpZC5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZExhYmVsLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9DYXJkTGFiZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ2FyZExhYmVsLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgU3RvY2sgZnJvbSAnLi9pY29ucy9zdG9jay5zdmcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9DYXJkTGFiZWwuY3NzJztcblxuY29uc3QgQ2FyZExhYmVsID0gKHtcbiAgdHlwZSxcbiAgdHh0LFxuICBjaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtjeChbXG4gICAgcy5yb290LFxuICAgIHtcbiAgICAgIFtzW3R5cGVdXTogdHJ1ZSxcbiAgICB9XG4gIF0pfT5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuQ2FyZExhYmVsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdHh0OiAnc2FsZScsXG4gIHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3RhcGUnLCAnY2lyY2xlJ10pLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShDYXJkTGFiZWwpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0NhcmRMYWJlbC9DYXJkTGFiZWwuanMiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmV4cG9ydCBkZWZhdWx0ICgoX3JlZikgPT4ge1xuICBsZXQge1xuICAgIHN0eWxlcyA9IHt9XG4gIH0gPSBfcmVmLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgW1wic3R5bGVzXCJdKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBcInN2Z1wiLFxuICAgIF9leHRlbmRzKHsgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgeG1sbnNYbGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsIHdpZHRoOiBcIjEzMlwiLCBoZWlnaHQ6IFwiMTIwXCIsIHZpZXdCb3g6IFwiMCAwIDEzMiAxMjBcIiB9LCBwcm9wcyksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIFwiZGVmc1wiLFxuICAgICAgbnVsbCxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgaWQ6IFwiYVwiLCBkOiBcIk03MjAuNSAyNTMyLjljLjUtMS41NSAyLjU4LTIuMjMgNC45LTEuNzcgMi42Ny41MyA3LjAzIDcgMi4yOSA4LjExLTQuMjEtLjc1LTguMzMtMi43OC03LjE4LTYuMzR6bTQ5LjMxIDUuODNjLjAxLTEuMzMgMS44Mi0yLjI0IDQuMjUtMS41MiAyLjg2IDMuNC00LjI2IDQuNDktNC4yNSAxLjUyem0tNDUuMzkgMy44Yy0yLjA3LS43NS0yLjQzLTIuODQtMy41OS00LjMgMS44Ljk2IDIuODQgMi41MyAzLjYgNC4zem0tNjIuMzcgOS4zOGMtNC4yNy0zLjk0IDYuNDktMy44NSAyLjI5IDB6bTExMy45NyAwYy40Ni0uODUgMi40LS45NCAzLjYtLjUgMS45OSAyLjctNC4yMiAzLjU3LTMuNi41em0tNTUuNTIgNC41NmMtMS4yMyAxLjkyLTEuMzQgNC43LTMuMjYgNi4wOC43My0yLjEzIDEuMDctNC41NyAyLjI5LTYuMzMuNTItLjA3LjU2LjI0Ljk3LjI1em0tNDEuNDcgMTljLjIzLS45IDEuNTQtLjM1IDEuOTYgMC0uMzMuNzItMS4zOS0uMDYtMS45NiAwem05My4wNyA1LjMzYy0uMTItMS4zNi44MS0xLjkgMi42MS0xLjc4LS4wNiAxLjIzLTEuMTIgMS42Ny0yLjYxIDEuNzh6bS0xMDUuOCAxLjc3Yy0yLjE0LS4zNy0zLjg3LTEuMDUtNC41Ny0yLjUzIDEuODkuNTYgMy41NyAxLjI4IDQuNTcgMi41M3ptNzguMDQgOS42M2MxLjg2LS45NSA1Ljc2LTEuNTcgOC4xNy0xLjI3LTEuNy43Ni01LjQ0LjY0LTguMTcgMS4yN3ptMTEuNzYgMjUuNmMtMi4zLS4xNi00LjA1LS43NS01LjIzLTEuNzggMS42LjcgNC40Mi40NSA1LjIzIDEuNzd6bS05OC42MiAxLjI2Yy0uNzEtLjM2LTEuNjMtMS40LS45OC0yLjAzIDEuMjItLjAxLjk0IDEuMTMuOTggMi4wM3ptMTAyLjg2IDguNjJjLS41My0xLjY0IDEuMDEtMi45OCAzLjkyLTIuNzkgNSAyLjctMi44IDYuMjItMy45MiAyLjc5em0tOTQuNy0xLjAyYy0uMzQtLjk0LjgyLS43Mi42Ni0xLjUyIDEuMDQtLjI4LjM4IDEuOC0uNjYgMS41MnptODIuNjItMS4wMWMtLjA4LjQ1LS41Ni41OC0xLjMuNXYtLjc1Yy42OC0uMTEuODYuMTcgMS4zLjI1em0tNzEuMTkgOC42MmMuNTctMy4yIDQuMS00LjA4IDUuNTUtNi42LjM5LjA1LjI4LjQ3LjMzLjc3LTIuMDQgMS44OC0zLjMgNC4zNy01Ljg4IDUuODN6bTc2LjQyLTQuMDZ2MS4yN2MtLjc4LjQ2LTEuOS42Ni0yLjk0LjI1LS41OS0yLjA0IDEuNTYtMi4zMiAyLjk0LTEuNTJ6bTIzLjE4IDQuMDZjLjIgMS4wOC0uMjkgMS42My0uOTggMi4wMi0xLjQyLjE4LTEuOC0uNDUtMi4yOC0xLjAxLjA4LTEuNDggMS45OS0xLjggMy4yNi0xLjAxem0tMzcuODggMi4wMmMuMS41OS0uMDUuOTgtLjMzIDEuMjctMS4wMi4xMi0xLjQ1LS4yMi0xLjMtMS4wMS43OS4xLjctLjQ3IDEuNjMtLjI2em0tNDAuMTYgMS4wMmMuNTgtLjA0LjY4LjMgMS4zLjI1LTEuNTUgNC43LTIuMSAxMC4xOS01LjU1IDEzLjQzLjQ2LTEuMTYuMzQtMi42Ljk4LTQuMDYuMy0uNyAxLjMyLTEuMjcgMS42My0yLjAyIDEuMDItMi40NC0uNDItNi4xMyAxLjY0LTcuNnptLTkuMTUgMS41MmMxLjY1IDEuNzYgMi42NCA0LjAzIDQuNTcgNS41Ny0xLjUgMS4zNy00IDEuOTYtNC41NyA0LjA2LTIuNjkuODMtNC41NS42LTcuODQuMjUtMS4xNy0uOTUtMi4yNC0xLjk3LTMuNTktMi43OS0xLjkzLTUuOTYgNC44NS05LjI0IDExLjQzLTcuMXptMzIuOTggNC4wNWMuMzQgMS4zNi0uNDQgMS44NS0xLjMgMi4yOC0uOTYuMDctMS0uNTctMS45Ni0uNS0xLjQ3LTEuNzIgMS43Mi0zLjE4IDMuMjYtMS43OHptLTI3LjEgMGMxLjUuMDQtLjIxIDEuMTQgMCAxLjc3LS45Ny0uMzYuNDMtLjk4IDAtMS43N3ptLTI4LjQxLTYwLjNjMS44My42IDMuMjggMS41IDQuOSAyLjI3LS4yMi4xMi00LjEtMS4xNy00LjktMi4yOHptLTEwLjc4IDI1LjMzYy4yNS0uOTUtMS4yNC0uNTUtMS4zLTEuMjcuMDQtLjguNzQtMS4xMSAxLjk2LTEgLjI5LjUzIDEgLjc0Ljk4IDEuNTEtMS45Mi4xLS44MS4yMi0xLjY0Ljc2em04Ni44NyA2LjA4Yy0yLjY5LS4wMi00LTEuMTEtNi4yLTEuNTItLjI5LjQ2LS43My44LTEuMzEgMS4wMi0yLjgxLS41LTIuOC0yLjQ2LTYuNTMtMS43OC02LjEgMS4xMi41NCA3LjguOTcgMTEuNC43OC41IDIuMjguNDQgMi45NSAxLjAyLS43NCAzLjkgMi41MiA2LjA5IDMuMjYgMTAuMTQtMi42NC0uODMtMy43Mi0yLjg2LTQuNTctNS4wNy0zLjItMi42LTUuNi01LjgtMTAuMTMtNy4zNS0xLjMtMS41Mi0yLjIzLTMuMzQtNS4yMi0zLjU1LTEuMjYuNjgtLjc5IDEuMi0uOTggMi43OS0xLjkzLS4yNy0yLjQzIDEuOTUtMy4yNiAzLjMtMS45NC4wOS0zLjMyLjE4LTQuOSAxLS40OCAxLjU4IDAgMy44OS0xLjk2IDQuMzItMi44Ny4xLTIuNzctMi4wOC0yLjYyLTQuMzEtMi43NCAxLjI1LS42NCA2LjI1LTIuOTMgNy44NS4zLTMuMzMuNDUtNi42NS45Ny05Ljg4LTEuMi0yLjAzLTMuMzQtMy4zMi00LjktNS4wNy0zIC45Ni0yLjY4IDQuNS01Ljg3IDUuMzItLjExLTIuNDggMy44My0zLjA3IDIuOTQtNS4zMi0zLjMuOTItMy41NCA1LjUxLTYuNTMgNS44My4yLTEuMjcgMS4yNi0xLjkgMS45Ni0yLjc5LTMuMjItLjA4LTQuMTkgMi44Mi02LjIgNC44Mi0yLjU3IDIuNTMtNi4xNCA0LjUtOC4xNyA2Ljg0LTEuOTEuMzYtMy41OS4yLTUuMjMtLjI2LTEuMzYtNC45IDQuNDItNy42MyA4LjgyLTEwLjM4IDMuMDUtMS45MSA2LjMyLTQuMjIgNi44Ni03LjM1LTEuMTctLjc3LTIuMSAxLjUzLTMuMjcuNzYuOS0xLjg0IDMuOTYtMS43MSAzLjYtMy44LS40OC0yLjc1LTQuNjYtMS42My03LjE5LTEuMDItNC4zOCAxLjA2LTkuNTMgMi41LTEyLjQgMi43OS4yNy0uOTcgMS45NS0uODUgMi45My0xLjI3LTEuMzQtLjc4LTQuOTgtLjk3LTQuMjUtMi41MyAxLjEyLjk3LjItLjI2IDIuMjktLjI1LjczLS4wNC0uNDItLjY0IDAtMS4yNy43Ni4wOCAxLjM1LjMgMS45Ni41LS43MS0xLjU3LTIuNzYtLjktNC41Ny0xLjI2LTIuOTggMi4zMi0xMC40NiA0LjUtMTUuMzUgNS4zMiAyLjA0LTEuNTQgNS40NS0yLjAyIDguMTYtMy4wNC43Ny0xLjYgNC4yLTMuMSA1LjU2LTUuMDctLjU2LTEuMDUtMi41OC4wMS0zLjI3LS41IDMuNzktMS42MyA1LjU1LTQuODIgOS40Ny02LjM0LS45LTEuMi0uOS0xLjUzLS45OC0zLjMuMzktLjI5IDEuMTUtLjI4IDEuOTYtLjI1LTQuMDgtMi41Ny0xNC4yMS0uNDYtMTYtNC44MS4zOC0uMDQuMjctLjQ3LjMyLS43NiAyLjI1LS4zMSAyLjUxLTEuODYgNC41OC0xLjI3LjIzLjY5LTEuNTQtLjE4LTEuMy41IDYuMTggMi40OSAxNy40OSA0LjYxIDI0LjE2IDEuMDItMS45Ni0xLjg2LTYuMTItMi4wMS03Ljg0LTQuMDUgMi4yIDEuMTYgNS4xIDEuNzcgNy41IDIuNzguOTEtMS40Ny0uMDItMy42OSAwLTUuMzItNS42Ny00Ljk2LTE1LjA5LTcuMDQtMTguNi0xMy42OCA1LjcuMDUgOC4xNCA0LjgyIDEzLjcxIDUuODMuMTIgMi4yMiAxLjE0IDIuODUgMy45MiA0LjA1IDMuMzYgMS40NSA5LjE3IDQgMTEuNDMuMjUgMi03LjE1LTMuMDctMTIuNzMtNi44Ni0xOS41LTEuNDUtMi42MS0zLjYxLTguNDItNS4yMi0xMS45Mi0uNy0xLjUtMS41LTQuNDQgMi42LTQuMDUgNS4xLjQ4IDMuOTggMTAuNDcgNy4yIDEyLjE2IDIuMjcgOS4wNSA4LjA4IDE1LjM1IDE1LjAxIDIwLjc4IDMuOTguODkgMi42Ny0yLjYyIDIuOTQtNC41NiAxLjY3LS4zNiAxLjQuNzcgMi4yOSAxLjAxIDIuNy42IDYuOC0zLjQ3IDMuMjctMi4yOC4yNi0xLjY2LTIuNjQtMi45OC0xLjY0LTUuMDcgMi44LjIgMy4wMyAyLjM4IDMuOTIgNC4wNiAyLjUzLS4xNS41LTMuODQgMi42MS00LjMxLS4yMyAxLjM5LS42NSAxLjIzLS42NSAyLjUzIDIuNTctMS4wMiAyLjI1LTYuOTcgNi44Ni00LjA1Ljk1IDMuODctLjY3IDcuMDMgMS4zIDEwLjY0IDEuMTUtLjEyLjgtMS40MSAxLjY0LTEuNzcgMi44Ni4yNS41NiAyLjYuOTggNC4wNS0uNzYuMzQtMS44Ni40Mi0yLjYyLjc2LTEuMiAyLjE3LjYgMi45NiAxLjMxIDQuMzEuNS45NS0uNiAyLjYzIDEuMyAyLjc5LjUgMC0xLjI4LTEuODQuMzMtMi4wMyAxLjEzLS4wOCAxLjIgMS4zMy42NiAxLjc4IDQtMS4yIDUuNi00LjI3IDkuNDctNS41OCA0LjQyLjM1IDcuMTYtNC42IDEwLjQ1LTEuMjctLjEgMi4yNC0yLjQzIDMuMy00LjU4IDQuMzEtNC4zNCAyLjAzLTYuODQgNS44OC0xMS43NSA3Ljg2LS41NiA0IDMuODcgMy43IDcuODMgMy4wNC0uMjIgMS4xOC0yLjc1LjU2LTMuMjYgMS41Mi40IDEuMiAxIC44OCAyLjI5LjUuNi40OS0uMi40NiAwIDEuMjcgMi4yOC4xNyAzLjEtLjggNS41NS0uNS4xOC4zNi41LjYxLjk4Ljc2LTMuOCA1LjU3IDcuMDYgNC44IDYuMiA4LjM2LS43IDIuOS05LjY2LjM4LTkuNDcgNC41Ni0xLjQyLjE2LTMuMS4xMy0zLjkyLjc2LjI1LjY1LjggMS4wNyAxLjYzIDEuMjctMS4wOS45MS0xLjQxLS45Mi0yLjYtLjc2LTIuMjIgMS40MiAxLjY5IDEuOSAyLjkzIDIuMjguOC0uMDMuMDctLjg0LS4zMy0uNzYgMS40LS40OSAyLjkgMS4xMiAzLjYgMi4wMnptLTY2Ljk1LTQuODFjLTEuODItLjU4LTQuNTIgMS4zNy02LjUzIDAtMS4yNS45Ny0xLjMxIDIuMjctLjY1IDMuMDQgMi4yOC0xLjEgNi4yLS45MyA3LjE4LTMuMDR6bS0yLjYtMy4zYy0xLjE3LS4wNS0xLjk3LjE4LTIuMy43NiAxLjMuMTYgMS43LS4zNyAyLjMtLjc2em00Ljg5LTMuMjljLTIuMDgtMS44OS01Ljk1LjMzLTcuNTEgMS4yNy4yNC41Ny4yOSAxLjMuNjUgMS43NyAyLjAyLS40NiA0Ljc0LS4zNyA1Ljg4LTEuNTItLjU3LS4xNC0xLjkyLjMtMS45Ni0uMjUgMS40LS4xIDIuMzctLjUzIDIuOTQtMS4yN3ptMS42My0zLjA0Yy0uNi0uNTUtMS43NS0uNjctMi4yOC0xLjI3LjEyLTMuNTgtNi41NS00LjUtNi4yLS4yNSAyLjEzLjI4IDMuMSAxLjQ4IDQuMjQgMi41My42NC0uOTMgMy44NC4xMSA0LjI0LTEuMDF6bS04LjE2IDIxLjU0aC0uMDIuMDJ6bS0uMDIgMGMtLjIyLjE0LTMuMTggMy4wNS00Ljg4IDIuNTMgMS4yLTEuMTggMi45Ni0xLjkxIDQuODgtMi41M3ptMTMuNzMgNC4zYy0uNjguNjYtLjc5IDEuNzYtMS45NiAyLjAzLjY5LS42NS44LTEuNzUgMS45Ni0yLjAyelwiIH0pXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgXCJnXCIsXG4gICAgICB7IGNsaXBQYXRoOiBcInVybCgjY2xpcC00ODAxKVwiLCB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKC02NDggLTI1MzEpXCIgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1c2VcIiwgeyBmaWxsOiBcIiMxMTFcIiwgeGxpbmtIcmVmOiBcIiNhXCIgfSlcbiAgICApXG4gICk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQ2FyZExhYmVsL2ljb25zL3N0b2NrLnN2ZyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ29udGFpbmVyLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Db250YWluZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQ29udGFpbmVyLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci9Db250YWluZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vQ29udGFpbmVyLmNzcyc7XG5cbmNvbnN0IENvbnRhaW5lciA9IHByb3BzID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e2N4KFxuICAgIFtcbiAgICAgIHMucm9vdCxcbiAgICAgIHByb3BzLmNsYXNzTmFtZSxcbiAgICBdXG4gICl9PlxuICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKENvbnRhaW5lcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyL0NvbnRhaW5lci5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vRm9vdGVyLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Gb290ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vRm9vdGVyLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBTZXJ2aWNlRmVhdHVyZXMgZnJvbSAnY29tcG9uZW50cy9TZXJ2aWNlRmVhdHVyZXMnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdjb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgTG9nbyBmcm9tICdjb21wb25lbnRzL0xvZ28nO1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnY29tcG9uZW50cy9OYXZpZ2F0aW9uJztcbmltcG9ydCBTb2NpYWxzTGlzdCBmcm9tICdjb21wb25lbnRzL1NvY2lhbHNMaXN0JztcbmltcG9ydCBzIGZyb20gJy4vRm9vdGVyLmNzcyc7XG5cbmNsYXNzIEZvb3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgPFNlcnZpY2VGZWF0dXJlcyBjbGFzc2VzPXt7IHJvb3Q6IHMuc2VydmljZXMgfX0gLz5cbiAgICAgICAgICA8TG9nbyB0aGVtZT1cIndoaXRlXCIgY2xhc3Nlcz17eyByb290OiBzLmxvZ28gfX0gLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9e3MuZGVzY3J9PlxuICAgICAgICAgICAgQSBjb2xsZWN0aW9uIG9mIHRleHRpbGUgc2FtcGxlcyBsYXkgc3ByZWFkIG91dCBvbiB0aGUgdGFibGUgLSBTYW1zYSB3YXMgYSB0cmF2ZWxsaW5nIHNhbGVzbWFuIC0gYW5kIGFib3ZlIGl0XG4gICAgICAgICAgICB0aGVyZSBodW5nIGEgcGljdHVyZSB0aGF0IGhlIGhhZCByZWNlbnRseSBjdXQgb3V0IG9mIGFuIGlsbHVzdHJhdGVkIG1hZ2F6aW5lIGFuZCBob3VzZWQgaW4gYSBuaWNlLCBnaWxkZWRcbiAgICAgICAgICAgIGZyYW1lLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8U29jaWFsc0xpc3RcbiAgICAgICAgICAgIHR5cGU9XCJjaXJjbGVcIlxuICAgICAgICAgICAgY2VudGVyXG4gICAgICAgICAgICBjbGFzc2VzPXt7cm9vdDogcy5zb2NpYWxzfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxOYXZpZ2F0aW9uIHRoZW1lPVwid2hpdGVcIiBjbGFzc2VzPXt7IHJvb3Q6IHMubmF2aWdhdGlvbiB9fSAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17cy50ZXJtc30+XG4gICAgICAgICAgICDCqSAyMDE3IFNoaXBwb24uQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEZvb3Rlcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vR3JvdXAuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0dyb3VwLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0dyb3VwLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9Hcm91cC5jc3MnO1xuXG5jb25zdCBHcm91cCA9ICh7IGNoaWxkcmVuIH0pID0+IDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PntjaGlsZHJlbn08L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoR3JvdXApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0Zvcm0vR3JvdXAvR3JvdXAuanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0lucHV0LmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9JbnB1dC5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9JbnB1dC5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9Gb3JtL0lucHV0L0lucHV0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vSW5wdXQuY3NzJztcblxuY29uc3QgcmVuZGVyRXJyb3JzID0gKGVycm9yKSA9PiB7XG4gIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGVycm9yKTtcbiAgaWYgKGlzQXJyYXkpIHtcbiAgICByZXR1cm4gZXJyb3IubWFwKGVyciA9PiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e3MuZXJyb3J9PntlcnJ9PC9zcGFuPlxuICAgICkpXG4gIH1cblxuICByZXR1cm4gKDxzcGFuIGNsYXNzTmFtZT17cy5lcnJvcn0+e2Vycm9yfTwvc3Bhbj4pXG59XG5jb25zdCBJbnB1dCA9ICh7IGxhYmVsLCB0eXBlLCB2YWx1ZSwgaGFuZGxlcnMsIGVycm9yLCAuLi5yZXN0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgPHNwYW4gY2xhc3NOYW1lPXtzLmxhYmVsfT57bGFiZWx9PC9zcGFuPlxuICAgIHtlcnJvciA/IHJlbmRlckVycm9ycyhlcnJvcikgOiBudWxsfVxuICAgIDxpbnB1dCB0eXBlPXt0eXBlfSB2YWx1ZT17dmFsdWV9IGNsYXNzTmFtZT17cy5pbnB1dH0gey4uLmhhbmRsZXJzfSB7Li4ucmVzdH0gLz5cbiAgPC9kaXY+XG4pO1xuXG5JbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxhYmVsOiAnJyxcbiAgdHlwZTogJ3RleHQnLFxuICBlcnJvcjogbnVsbCxcbiAgaGFuZGxlcnM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShJbnB1dCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvRm9ybS9JbnB1dC9JbnB1dC5qcyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgSW5wdXQgfSBmcm9tICcuL0lucHV0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgR3JvdXAgfSBmcm9tICcuL0dyb3VwJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9Gb3JtL2luZGV4LmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9IZWFkZXIuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0hlYWRlci5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9IZWFkZXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9IZWFkZXIuY3NzJztcbmltcG9ydCBTb2NpYWxzTGlzdCBmcm9tICcuLi9Tb2NpYWxzTGlzdCc7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4uL0NvbnRhaW5lcic7XG5pbXBvcnQgTG9nbyBmcm9tICcuLi9Mb2dvJztcbmltcG9ydCBOYXZpZ2F0aW9uIGZyb20gJy4uL05hdmlnYXRpb24nO1xuaW1wb3J0IFRvb2xCYXIgZnJvbSAnLi4vVG9vbEJhcic7XG5cbmNsYXNzIEhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnRvcH0+XG4gICAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxTb2NpYWxzTGlzdCAvPlxuICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MubWlkZGxlfT5cbiAgICAgICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17cy5yb3d9PlxuICAgICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICAgIDxOYXZpZ2F0aW9uIC8+XG4gICAgICAgICAgICA8VG9vbEJhciAvPlxuICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShIZWFkZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHNlcmlhbGl6ZSBmcm9tICdzZXJpYWxpemUtamF2YXNjcmlwdCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWRhbmdlciAqL1xuXG5jbGFzcyBIdG1sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc3R5bGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGNzc1RleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgKSxcbiAgICBzY3JpcHRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQpLFxuICAgIGFwcDogUHJvcFR5cGVzLm9iamVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzdHlsZXM6IFtdLFxuICAgIHNjcmlwdHM6IFtdLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgc3R5bGVzLCBzY3JpcHRzLCBhcHAsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8aHRtbCBjbGFzc05hbWU9XCJuby1qc1wiIGxhbmc9XCJlblwiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxuICAgICAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIngtdWEtY29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCIgLz5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD17ZGVzY3JpcHRpb259IC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cbiAgICAgICAgICB7c2NyaXB0cy5tYXAoc2NyaXB0ID0+IChcbiAgICAgICAgICAgIDxsaW5rIGtleT17c2NyaXB0fSByZWw9XCJwcmVsb2FkXCIgaHJlZj17c2NyaXB0fSBhcz1cInNjcmlwdFwiIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL3NpdGUud2VibWFuaWZlc3RcIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCIgLz5cbiAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVBvcHBpbnM6MzAwLDMwMGksNDAwLDQwMGksNTAwLDUwMGksNjAwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1OaWNvbm5lOjQwMFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMCwzMDBpLDQwMCw0MDBpLDUwMCw1MDBpLDcwMFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiL2ljb24ucG5nXCIgLz5cbiAgICAgICAgICB7c3R5bGVzLm1hcChzdHlsZSA9PiAoXG4gICAgICAgICAgICA8c3R5bGVcbiAgICAgICAgICAgICAga2V5PXtzdHlsZS5pZH1cbiAgICAgICAgICAgICAgaWQ9e3N0eWxlLmlkfVxuICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlLmNzc1RleHQgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvaGVhZD5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPGRpdiBpZD1cImFwcFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogY2hpbGRyZW4gfX0gLz5cbiAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGB3aW5kb3cuQXBwPSR7c2VyaWFsaXplKGFwcCl9YCB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NjcmlwdHMubWFwKHNjcmlwdCA9PiA8c2NyaXB0IGtleT17c2NyaXB0fSBzcmM9e3NjcmlwdH0gLz4pfVxuICAgICAgICAgIHtjb25maWcuYW5hbHl0aWNzLmdvb2dsZVRyYWNraW5nSWQgJiYgKFxuICAgICAgICAgICAgPHNjcmlwdFxuICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICAgIF9faHRtbDpcbiAgICAgICAgICAgICAgICAgICd3aW5kb3cuZ2E9ZnVuY3Rpb24oKXtnYS5xLnB1c2goYXJndW1lbnRzKX07Z2EucT1bXTtnYS5sPStuZXcgRGF0ZTsnICtcbiAgICAgICAgICAgICAgICAgIGBnYSgnY3JlYXRlJywnJHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmFuYWx5dGljcy5nb29nbGVUcmFja2luZ0lkXG4gICAgICAgICAgICAgICAgICB9JywnYXV0bycpO2dhKCdzZW5kJywncGFnZXZpZXcnKWAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2NvbmZpZy5hbmFseXRpY3MuZ29vZ2xlVHJhY2tpbmdJZCAmJiAoXG4gICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qc1wiXG4gICAgICAgICAgICAgIGFzeW5jXG4gICAgICAgICAgICAgIGRlZmVyXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvaHRtbD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0bWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvSHRtbC5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vSnVtYm90cm9uLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9KdW1ib3Ryb24uY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vSnVtYm90cm9uLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdjb21wb25lbnRzL0J1dHRvbic7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL0p1bWJvdHJvbi5jc3MnO1xuXG5jb25zdCBKdW1ib3Ryb24gPSAoeyB0aXRsZSwgZGVzY3IsIGxpbmssIGJ0biwgY2xhc3NlcyB9KSA9PiAoXG4gIDxhcnRpY2xlIGNsYXNzTmFtZT17Y3goW1xuICAgIHMucm9vdCxcbiAgICBjbGFzc2VzLnJvb3QsXG4gIF0pfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT17cy5pbm5lcn0+XG4gICAgICA8aDIgY2xhc3NOYW1lPXtzLnRpdGxlfT57dGl0bGV9PC9oMj5cbiAgICAgIDxwIGNsYXNzTmFtZT17cy5kZXNjcn0+e2Rlc2NyfTwvcD5cbiAgICAgIDxhIHsuLi5saW5rfSBjbGFzc05hbWU9e3MubGlua30+e2xpbmsudHh0fTwvYT5cbiAgICAgIDxCdXR0b24gey4uLmJ0bn0+e2J0bi5sYWJlbH08L0J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9hcnRpY2xlPlxuKTtcblxuSnVtYm90cm9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICB0aXRsZTogJ0V4cGxvcmUgZ3JlYXQgYXBwcyBmb3IgUHJvZHVjdGl2aXR5LCBpbmNsdWRpbmcgb2ZmaWNlIGZvciBpUGFkJyxcbiAgZGVzY3I6XG4gICAgJ1N0YXJ0IGVkaXRpbmcgYSBwaG9uZSBvbiB5b3VyIGlQYWQgYW5kIGZpbmlzaCBpdCBvbiB5b3VyIE1hY2Jvb2suU3luYyBhIFBsYXlsaXN0IGZyb20geW91ciBpUGhvbmUgdG8geW91ciBBcHBsZSBXYXRjaC4nLFxuICBsaW5rOiB7XG4gICAgdHh0OiAnTGVhcm4gTW9yZSBhYm91dCBpUGFkIE1pbmknLFxuICB9LFxuICBidG46IHtcbiAgICBsYWJlbDogJ0J1eSBOb3cnLFxuICAgIG9uQ2xpY2s6ICgpID0+IHt9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShKdW1ib3Ryb24pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0p1bWJvdHJvbi9KdW1ib3Ryb24uanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0xheW91dC5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTGF5b3V0LmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0xheW91dC5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9MYXlvdXQvTGF5b3V0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9MYXlvdXQvTGF5b3V0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IEZvb3RlciBmcm9tICdjb21wb25lbnRzL0Zvb3Rlcic7XG4vLyBleHRlcm5hbC1nbG9iYWwgc3R5bGVzIG11c3QgYmUgaW1wb3J0ZWQgaW4geW91ciBKUy5cbmltcG9ydCBub3JtYWxpemVDc3MgZnJvbSAnbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgcyBmcm9tICcuL0xheW91dC5jc3MnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9IZWFkZXInO1xuXG5jbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlYWRlciAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPEZvb3RlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKG5vcm1hbGl6ZUNzcywgcykoTGF5b3V0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9MYXlvdXQvTGF5b3V0LmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBoaXN0b3J5IGZyb20gJy4uLy4uL2hpc3RvcnknO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5mdW5jdGlvbiBpc0xlZnRDbGlja0V2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5idXR0b24gPT09IDA7XG59XG5cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59XG5cbmNsYXNzIExpbmsgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRvOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvbkNsaWNrOiBudWxsLFxuICB9O1xuXG4gIGhhbmRsZUNsaWNrID0gZXZlbnQgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGlzTW9kaWZpZWRFdmVudChldmVudCkgfHwgIWlzTGVmdENsaWNrRXZlbnQoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhpc3RvcnkucHVzaCh0aGlzLnByb3BzLnRvKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0bywgY2hpbGRyZW4sIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8YSBocmVmPXt0b30gey4uLnByb3BzfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSBjbGFzc05hbWU9e2N4KFtcbiAgICAgICAgcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICB7XG4gICAgICAgICAgLy8gW3Byb3BzLmFjdGl2ZUNsYXNzTmFtZV06IHRvID09PSB0aGlzLmNvbnRleHQucGF0aG5hbWUgfHwgdG8gPT09IGhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIH1cbiAgICAgIF0pfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9hPlxuICAgICk7XG4gIH1cbn1cblxuTGluay5kZWZhdWx0UHJvcHMgPSB7XG4gIGFjdGl2ZUNsYXNzTmFtZTogJycsXG59XG5cbkxpbmsuY29udGV4dFR5cGVzID0ge1xuICBwYXRobmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbms7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvTGluay9MaW5rLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Mb2dvLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Mb2dvLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0xvZ28uY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvTG9nby9Mb2dvLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9Mb2dvL0xvZ28uY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL0xvZ28uY3NzJztcblxuY29uc3QgTG9nbyA9ICh7XG4gIGNsYXNzZXMsXG4gIHRoZW1lLFxuICAgICAgICAgICAgICB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtjeChbXG4gICAgcy5yb290LFxuICAgIHNbdGhlbWVdLFxuICAgIGNsYXNzZXMucm9vdCxcbiAgXSl9PlxuICAgIFNoaXBwb25cbiAgPC9kaXY+XG4pO1xuXG5cbkxvZ28uZGVmYXVsdFByb3BzID0ge1xuICB0aGVtZTogJycsXG4gIGNsYXNzZXM6IHsgcm9vdDogJycgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoTG9nbylcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9Mb2dvL0xvZ28uanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL05hdmlnYXRpb24uY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL05hdmlnYXRpb24uY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vTmF2aWdhdGlvbi5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9OYXZpZ2F0aW9uLmNzcyc7XG5pbXBvcnQgTGluayBmcm9tICcuLi9MaW5rJztcblxuY2xhc3MgTmF2aWdhdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0aGVtZSwgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KFtcbiAgICAgICAgcy5yb290LFxuICAgICAgICBzW3RoZW1lXSxcbiAgICAgICAgY2xhc3Nlcy5yb290LFxuICAgICAgXSl9IHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG4gICAgICAgIHt0aGlzLnByb3BzLmxpc3QubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT17cy5saW5rfSB0bz17aXRlbS50b30gYWN0aXZlQ2xhc3NOYW1lPXtzLmFjdGl2ZUxpbmt9PlxuICAgICAgICAgICAge2l0ZW0udHh0fVxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbk5hdmlnYXRpb24uZGVmYXVsdFByb3BzID0ge1xuICB0aGVtZTogJycsXG4gIGNsYXNzZXM6IHsgcm9vdDogJycgfSxcbiAgbGlzdDogW1xuICAgIHsgdHh0OiAnSG9tZScsIHRvOiAnLycgfSxcbiAgICB7IHR4dDogJ1Nob3AnLCB0bzogJy9zaG9wJyB9LFxuICAgIHsgdHh0OiAnQWJvdXQnLCB0bzogJy9hYm91dCcgfSxcbiAgICB7IHR4dDogJ0Jsb2cnLCB0bzogJy9ibG9nJyB9LFxuICBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoTmF2aWdhdGlvbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9SYXRpbmcuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1JhdGluZy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9SYXRpbmcuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvUmF0aW5nL1JhdGluZy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1JhdGluZy5jc3MnO1xuXG5jb25zdCBSYXRpbmcgPSAoeyBsaXN0LCBjbGFzc2VzIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e2N4KFtcbiAgICBzLnJvb3QsXG4gICAgY2xhc3Nlcy5yb290LFxuICBdKX0+XG4gICAge2xpc3QubWFwKGl0ZW0gPT4gKFxuICAgICAgPEZvbnRBd2Vzb21lIGNsYXNzTmFtZT17cy5zdGFyfSBuYW1lPXtpdGVtLm5hbWV9IC8+XG4gICAgKSl9XG4gIDwvZGl2PlxuKTtcblxuUmF0aW5nLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICBsaXN0OiBbXG4gICAgeyBuYW1lOiAnc3RhcicgfSxcbiAgICB7IG5hbWU6ICdzdGFyJyB9LFxuICAgIHsgbmFtZTogJ3N0YXInIH0sXG4gICAgeyBuYW1lOiAnc3RhcicgfSxcbiAgICB7IG5hbWU6ICdzdGFyLWhhbGYtbycgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoUmF0aW5nKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9SYXRpbmcvUmF0aW5nLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9TZXJ2aWNlRmVhdHVyZXMuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1NlcnZpY2VGZWF0dXJlcy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9TZXJ2aWNlRmVhdHVyZXMuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1NlcnZpY2VGZWF0dXJlcy5jc3MnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdjb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgUGxhbiBmcm9tICcuL2ljb25zL3BsYW4uc3ZnJztcblxuY29uc3QgU2VydmljZUZlYXR1cmVzID0gKHsgbGlzdCwgY2xhc3NlcyB9KSA9PiAoXG4gIDxDb250YWluZXI+XG4gICAgPHVsIGNsYXNzTmFtZT17Y3goW1xuICAgICAgcy5yb290LFxuICAgICAgY2xhc3Nlcy5yb290LFxuICAgIF0pfT5cbiAgICAgIHtsaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmljb259PntpdGVtLmljb259PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLnRpdGxlfT57aXRlbS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICA8cD57aXRlbS5kZXNjcn08L3A+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKVxuICAgICAgfSl9XG4gICAgPC91bD5cbiAgPC9Db250YWluZXI+XG4pO1xuXG5TZXJ2aWNlRmVhdHVyZXMuZGVmYXVsdFByb3BzID0ge1xuICBjbGFzc2VzOiB7IHJvb3Q6ICcnIH0sXG4gIGxpc3Q6IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZyZWUgc2hpcHBpbmcnLFxuICAgICAgZGVzY3I6ICdGcmVlIFNoaXBwaW5nIGZvciBhbGwgVVMgT3JkZXInLFxuICAgICAgaWNvbjogPFBsYW4gLz4sXG4gICAgfSxcbiAgXSxcbn07XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFNlcnZpY2VGZWF0dXJlcyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL1NlcnZpY2VGZWF0dXJlcy5qcyIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZXhwb3J0IGRlZmF1bHQgKChfcmVmKSA9PiB7XG4gIGxldCB7XG4gICAgc3R5bGVzID0ge31cbiAgfSA9IF9yZWYsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbXCJzdHlsZXNcIl0pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwic3ZnXCIsXG4gICAgX2V4dGVuZHMoeyB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB4bWxuc1hsaW5rOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwgd2lkdGg6IFwiNTNcIiwgaGVpZ2h0OiBcIjUzXCIsIHZpZXdCb3g6IFwiMCAwIDUzIDUzXCIgfSwgcHJvcHMpLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRlZnNcIixcbiAgICAgIG51bGwsXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGlkOiBcImFcIiwgZDogXCJNNjM4LjA0IDM3MzkuMTNsLTUuNiAyLjU1Yy0uMzYuMTctLjcuNC0uOTguNjdsLTkuMTQgOS4xNS0zMS40Ny0zLjc3YTEuODcgMS44NyAwIDAgMC0xLjU1LjUzbC0xLjc1IDEuNzVjLS45My45My0uNjQgMi41LjU2IDMuMDRsMjIuNTUgMTAuMS02LjQ3IDYuNDhoLTExLjMxYy0uNSAwLS45OC4yLTEuMzMuNTVsLS45NC45NWMtLjk0Ljk0LS42MyAyLjUzLjU4IDMuMDVsOS41NCA0LjA5IDQuMSA5LjU0YTEuODcgMS44NyAwIDAgMCAzLjA0LjU4bC45NS0uOTVjLjM1LS4zNS41NS0uODMuNTUtMS4zMnYtMTEuMzFsNi40Ny02LjQ4IDEwLjExIDIyLjU2YTEuODcgMS44NyAwIDAgMCAzLjA0LjU2bDEuNzUtMS43NWMuNC0uNDEuNi0uOTguNTMtMS41NWwtMy43OC0zMS40NyA5LjE1LTkuMTVjLjI4LS4yOC41LS42LjY3LS45N2wyLjU2LTUuNmExLjM3IDEuMzcgMCAwIDAtMS44My0xLjgzelwiIH0pXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidXNlXCIsIHsgeGxpbmtIcmVmOiBcIiNhXCIsIG9wYWNpdHk6IFwiLjFcIiwgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgtNTg3IC0zNzM5KVwiIH0pXG4gICk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvU2VydmljZUZlYXR1cmVzL2ljb25zL3BsYW4uc3ZnIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Tb2NpYWxzTGlzdC5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vU29jaWFsc0xpc3QuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vU29jaWFsc0xpc3QuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvU29jaWFsc0xpc3QvU29jaWFsc0xpc3QuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL1NvY2lhbHNMaXN0L1NvY2lhbHNMaXN0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL1NvY2lhbHNMaXN0LmNzcyc7XG5cbmNvbnN0IFNvY2lhbHNMaXN0ID0gKHsgbGlzdCwgY2xhc3NlcywgY2VudGVyLCB0eXBlIH0pID0+IChcbiAgPHVsIGNsYXNzTmFtZT17Y3gocy5yb290LCB7IFtzLmNlbnRlcl06IGNlbnRlciB9LCBjbGFzc2VzLnJvb3QpfT5cbiAgICB7bGlzdC5tYXAoaXRlbSA9PiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjeChbXG4gICAgICAgIHMuaXRlbSxcbiAgICAgICAge1xuICAgICAgICAgIFtzW3R5cGVdXTogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgXSl9PlxuICAgICAgICA8YSBocmVmPXtpdGVtLmhyZWZ9IHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgIDxGb250QXdlc29tZSBuYW1lPXtpdGVtLmljb259IGNsYXNzTmFtZT17cy5pY29ufSAvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICkpfVxuICA8L3VsPlxuKTtcblxuU29jaWFsc0xpc3QuZGVmYXVsdFByb3BzID0ge1xuICBjZW50ZXI6IGZhbHNlLFxuICB0eXBlOiAnJyxcbiAgY2xhc3NlczogeyByb290OiAnJyB9LFxuICBsaXN0OiBbeyBpY29uOiAnZmFjZWJvb2stZicgfSwgeyBpY29uOiAndHdpdHRlcicgfV0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFNvY2lhbHNMaXN0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9Tb2NpYWxzTGlzdC9Tb2NpYWxzTGlzdC5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vVGFicy5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vVGFicy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9UYWJzLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL1RhYnMvVGFicy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2NvbXBvbmVudHMvVGFicy9UYWJzLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCB7IFRhYiwgVGFicywgVGFiTGlzdCwgVGFiUGFuZWwgfSBmcm9tICdyZWFjdC10YWJzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vVGFicy5jc3MnO1xuXG5jb25zdCBUID0gKHsgdGFicywgcGFuZWxzLCBjbGFzc2VzLCBkZWZhdWx0SW5kZXggfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17Y3goW3Mucm9vdCwgY2xhc3Nlcy5yb290XSl9PlxuICAgIDxUYWJzIGRlZmF1bHRJbmRleD17ZGVmYXVsdEluZGV4IHx8IDB9PlxuICAgICAgPFRhYkxpc3QgY2xhc3NOYW1lPXtjeChbcy5saXN0LCBjbGFzc2VzLmhlYWRlcl0pfT5cbiAgICAgICAge3RhYnMubWFwKGl0ZW0gPT4gPFRhYiBzZWxlY3RlZENsYXNzTmFtZT17cy5zZWxlY3RlZH0gY2xhc3NOYW1lPXtzLnRhYn0+e2l0ZW0udHh0fTwvVGFiPil9XG4gICAgICA8L1RhYkxpc3Q+XG4gICAgICB7cGFuZWxzLm1hcChpdGVtID0+IChcbiAgICAgICAgPFRhYlBhbmVsIGNsYXNzTmFtZT17cy5wYW5lbH0gc2VsZWN0ZWRDbGFzc05hbWU9e3MucGFuZWxBY3RpdmV9PlxuICAgICAgICAgIHtpdGVtLnJlbmRlcigpfVxuICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgKSl9XG4gICAgPC9UYWJzPlxuICA8L2Rpdj5cbik7XG5cblQuZGVmYXVsdFByb3BzID0ge1xuICBkZWZhdWx0SW5kZXg6IDAsXG4gIGNsYXNzZXM6IHtcbiAgICByb290OiAnJyxcbiAgICBoZWFkZXI6ICcnLFxuICB9LFxuICB0YWJzOiBbXG4gICAgeyB0eHQ6ICdOZXcnIH0sXG4gICAgeyB0eHQ6ICdBcnJpdmFscycgfSxcbiAgICB7IHR4dDogJ0FjY2Vzc29yaWVzJyB9LFxuICAgIHsgdHh0OiAnRXNzZW50aWFscycgfSxcbiAgICB7IHR4dDogJ091dGRvb3InIH0sXG4gICAgeyB0eHQ6ICdLaXRjaGVuJyB9LFxuICAgIHsgdHh0OiAnTGlnaHRpbmcnIH0sXG4gICAgXSxcbiAgcGFuZWxzOiBbXG4gICAgeyByZW5kZXI6ICgpID0+IDxzcGFuPnBhbmVsMTwvc3Bhbj4gfSxcbiAgICB7IHJlbmRlcjogKCkgPT4gPHNwYW4+cGFuZWwyPC9zcGFuPiB9LFxuICAgIHsgcmVuZGVyOiAoKSA9PiA8c3Bhbj5wYW5lbDM8L3NwYW4+IH0sXG4gIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1RhYnMvVGFicy5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vVGl0bGUuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1RpdGxlLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1RpdGxlLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1RpdGxlLmNzcyc7XG5cbmNvbnN0IFRpdGxlID0gKHsgdHlwZSwgY2hpbGRyZW4sIGNsYXNzZXMsIGNlbnRlciwgaWQgfSkgPT5cbiAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICB0eXBlLFxuICAgIHtcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lOiBjeChbXG4gICAgICAgIHMudGl0bGUsXG4gICAgICAgIGNsYXNzZXMucm9vdCxcbiAgICAgICAge1xuICAgICAgICAgIFtzLmNlbnRlcl06IGNlbnRlcixcbiAgICAgICAgfSxcbiAgICAgIF0pLFxuICAgIH0sXG4gICAgY2hpbGRyZW4sXG4gICk7XG5cblRpdGxlLnByb3BUeXBlcyA9IHtcbiAgdHlwZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgY2VudGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2xhc3NlczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByb290OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSxcbn07XG5cblRpdGxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hpbGRyZW46ICcnLFxuICBpZDogJycsXG4gIHR5cGU6ICdoMycsXG4gIGNlbnRlcjogZmFsc2UsXG4gIGNsYXNzZXM6IHsgcm9vdDogJycgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoVGl0bGUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Ub29sQmFyLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Ub29sQmFyLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1Rvb2xCYXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvVG9vbEJhci9Ub29sQmFyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9Ub29sQmFyL1Rvb2xCYXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgcyBmcm9tICcuL1Rvb2xCYXIuY3NzJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5cbmNvbnN0IFRvb2xCYXIgPSBwcm9wcyA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgIDxGb250QXdlc29tZVxuICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICBjbGFzc05hbWU9e3MuYWN0aW9ufVxuICAgIC8+XG4gICA8c3BhbiBjbGFzc05hbWU9e3MuYmFnfT5cbiAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmNvdW50fT5cbiAgICAgICAyXG4gICAgIDwvc3Bhbj5cbiAgICAgIDxGb250QXdlc29tZVxuICAgICAgICBuYW1lPVwic2hvcHBpbmctYmFnXCJcbiAgICAgICAgY2xhc3NOYW1lPXtzLmFjdGlvbn1cbiAgICAgIC8+XG4gICA8L3NwYW4+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShUb29sQmFyKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL1Rvb2xCYXIvVG9vbEJhci5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuQlJPV1NFUikge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ0RvIG5vdCBpbXBvcnQgYGNvbmZpZy5qc2AgZnJvbSBpbnNpZGUgdGhlIGNsaWVudC1zaWRlIGNvZGUuJyxcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIE5vZGUuanMgYXBwXG4gIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCxcblxuICAvLyBodHRwczovL2V4cHJlc3Nqcy5jb20vZW4vZ3VpZGUvYmVoaW5kLXByb3hpZXMuaHRtbFxuICB0cnVzdFByb3h5OiBwcm9jZXNzLmVudi5UUlVTVF9QUk9YWSB8fCAnbG9vcGJhY2snLFxuXG4gIC8vIEFQSSBHYXRld2F5XG4gIGFwaToge1xuICAgIC8vIEFQSSBVUkwgdG8gYmUgdXNlZCBpbiB0aGUgY2xpZW50LXNpZGUgY29kZVxuICAgIGNsaWVudFVybDogcHJvY2Vzcy5lbnYuQVBJX0NMSUVOVF9VUkwgfHwgJycsXG4gICAgLy8gQVBJIFVSTCB0byBiZSB1c2VkIGluIHRoZSBzZXJ2ZXItc2lkZSBjb2RlXG4gICAgc2VydmVyVXJsOlxuICAgICAgcHJvY2Vzcy5lbnYuQVBJX1NFUlZFUl9VUkwgfHxcbiAgICAgIGBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwfWAsXG4gIH0sXG5cbiAgLy8gRGF0YWJhc2VcbiAgZGF0YWJhc2VVcmw6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCAnc3FsaXRlOmRhdGFiYXNlLnNxbGl0ZScsXG5cbiAgLy8gV2ViIGFuYWx5dGljc1xuICBhbmFseXRpY3M6IHtcbiAgICAvLyBodHRwczovL2FuYWx5dGljcy5nb29nbGUuY29tL1xuICAgIGdvb2dsZVRyYWNraW5nSWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9UUkFDS0lOR19JRCwgLy8gVUEtWFhYWFgtWFxuICB9LFxuXG4gIC8vIEF1dGhlbnRpY2F0aW9uXG4gIGF1dGg6IHtcbiAgICBqd3Q6IHsgc2VjcmV0OiBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdSZWFjdCBTdGFydGVyIEtpdCcgfSxcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vXG4gICAgZmFjZWJvb2s6IHtcbiAgICAgIGlkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19BUFBfSUQgfHwgJzE4NjI0NDU1MTc0NTYzMScsXG4gICAgICBzZWNyZXQ6XG4gICAgICAgIHByb2Nlc3MuZW52LkZBQ0VCT09LX0FQUF9TRUNSRVQgfHwgJ2E5NzBhZTMyNDBhYjRiOWI4YWFlMGY5ZjA2NjFjNmZjJyxcbiAgICB9LFxuXG4gICAgLy8gaHR0cHM6Ly9jbG91ZC5nb29nbGUuY29tL2NvbnNvbGUvcHJvamVjdFxuICAgIGdvb2dsZToge1xuICAgICAgaWQ6XG4gICAgICAgIHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHxcbiAgICAgICAgJzI1MTQxMDczMDU1MC1haGNnMG91NW1nZmhsOGhsdWkxdXJydTdqbjVzMTJrbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUIHx8ICdZOHlSOXlaQWhtOWpROEZLQUw4UUlFY2QnLFxuICAgIH0sXG5cbiAgICAvLyBodHRwczovL2FwcHMudHdpdHRlci5jb20vXG4gICAgdHdpdHRlcjoge1xuICAgICAga2V5OiBwcm9jZXNzLmVudi5UV0lUVEVSX0NPTlNVTUVSX0tFWSB8fCAnSWUyMEFadkxKSTJsUUQ1RHNneGdqYXVucycsXG4gICAgICBzZWNyZXQ6XG4gICAgICAgIHByb2Nlc3MuZW52LlRXSVRURVJfQ09OU1VNRVJfU0VDUkVUIHx8XG4gICAgICAgICdLVFo2Y3hvS25FYWtRQ2VTcFpsYVVDSldHQWxURUJKajB5MkVNa1VCdWpBN3pXU3ZhUScsXG4gICAgfSxcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbmZpZy5qcyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IFNFVF9SVU5USU1FX1ZBUklBQkxFID0gJ1NFVF9SVU5USU1FX1ZBUklBQkxFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29uc3RhbnRzL2luZGV4LmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vKiBAZmxvdyAqL1xuXG5cbnR5cGUgRmV0Y2ggPSAodXJsOiBzdHJpbmcsIG9wdGlvbnM6ID9hbnkpID0+IFByb21pc2U8YW55PjtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGFyb3VuZCB0aGUgSFRNTDUgRmV0Y2ggQVBJIHRoYXQgcHJvdmlkZXNcbiAqIGRlZmF1bHQgYXJndW1lbnRzIHRvIGZldGNoKC4uLikgYW5kIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgYW1vdW50XG4gKiBvZiBib2lsZXJwbGF0ZSBjb2RlIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmV0Y2goXG4gIGZldGNoOiBGZXRjaCxcbiAgYmFzZVVybCxcbiAgY29va2llLFxuKSB7XG4gIC8vIE5PVEU6IFR3ZWFrIHRoZSBkZWZhdWx0IG9wdGlvbnMgdG8gc3VpdGUgeW91ciBhcHBsaWNhdGlvbiBuZWVkc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJywgLy8gaGFuZHkgd2l0aCBHcmFwaFFMIGJhY2tlbmRzXG4gICAgbW9kZTogYmFzZVVybCA/ICdjb3JzJyA6ICdzYW1lLW9yaWdpbicsXG4gICAgY3JlZGVudGlhbHM6IGJhc2VVcmwgPyAnaW5jbHVkZScgOiAnc2FtZS1vcmlnaW4nLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC4uLihjb29raWUgPyB7IENvb2tpZTogY29va2llIH0gOiBudWxsKSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBhc3luYyAodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGlzR3JhcGhRTCA9IHVybC5zdGFydHNXaXRoKCcvJyk7XG5cbiAgICByZXR1cm4gaXNHcmFwaFFMIHx8IHVybC5zdGFydHNXaXRoKCcvYXBpJylcbiAgICAgID8gZmV0Y2goYCR7YmFzZVVybH0ke3VybH1gLCB7XG4gICAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0cy5oZWFkZXJzLFxuICAgICAgICAgICAgLi4uKG9wdGlvbnMgJiYgb3B0aW9ucy5oZWFkZXJzKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgOiBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGZXRjaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY3JlYXRlRmV0Y2guanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVCcm93c2VySGlzdG9yeSBmcm9tICdoaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5JztcblxuLy8gTmF2aWdhdGlvbiBtYW5hZ2VyLCBlLmcuIGhpc3RvcnkucHVzaCgnL2hvbWUnKVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21qYWNrc29uL2hpc3RvcnlcbmV4cG9ydCBkZWZhdWx0IHByb2Nlc3MuZW52LkJST1dTRVIgJiYgY3JlYXRlQnJvd3Nlckhpc3RvcnkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvaGlzdG9yeS5qcyIsImltcG9ydCAnaXNvbW9ycGhpYy1mZXRjaCc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNvbnN0IGhhbmRsaW5nID0gcmVzcCA9PiB7XG4gIGlmIChyZXNwLnN0YXR1cyA+PSAyMDAgJiYgcmVzcC5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gcmVzcDtcbiAgfVxuICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgZXJyb3IucmVzcCA9IHJlc3A7XG4gIHRocm93IGVycm9yO1xufTtcblxuY29uc3QgcGFyc2UgPSBqc29uID0+IGpzb24uanNvbigpO1xuXG5jb25zdCBhcGkgPSAoeyB1cmwsIHBhcmFtcyB9KSA9PiB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAuLi5wYXJhbXMsXG4gICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMuYm9keSkgfHwgbnVsbCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAvLyAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdYLVJlcXVlc3RlZC1XaXRoJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAuLi5wYXJhbXMuaGVhZGVycyxcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKGhhbmRsaW5nKVxuICAgIC50aGVuKHBhcnNlKVxufVxuXG5jb25zdCBwYXJhbWV0cmVkID0gbWV0aG9kID0+ICh7IHVybCwgcGFyYW1zIH0pID0+XG4gIGFwaSh7IHVybCwgcGFyYW1zOiB7IC4uLnBhcmFtcywgbWV0aG9kIH0gfSk7XG5cbmV4cG9ydCBjb25zdCBoaWRlUmVwb3J0ZXIgPSAoKSA9PiAoe1xuICB0eXBlOiB0eXBlcy5ISURFX1JFUE9SVEVSLFxuICBwYXlsb2FkOiB7fSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldDogcGFyYW1ldHJlZCgnR0VUJyksXG4gIHBvc3Q6IHBhcmFtZXRyZWQoJ1BPU1QnKSxcbiAgcHV0OiBwYXJhbWV0cmVkKCdQVVQnKSxcbiAgZGVsZXRlOiBwYXJhbWV0cmVkKCdERUxFVEUnKSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL2FjdGlvbnMuanMiLCJleHBvcnQgY29uc3QgTkFNRSA9ICdhcGknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfU1RBUlQgPSAnUkVRVUVTVF9TVEFSVCc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9TVUNDRVNTID0gJ1JFUVVFU1RfU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9GQUlMID0gJ1JFUVVFU1RfRkFJTCc7XG5leHBvcnQgY29uc3QgSElERV9SRVBPUlRFUiA9IGAke05BTUV9X0hJREVfUkVQT1JURVJgO1xuZXhwb3J0IGNvbnN0IFNIT1dfUkVQT1JURVIgPSBgJHtOQU1FfV9TSE9XX1JFUE9SVEVSYDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9BcGkvY29uc3RhbnRzLmpzIiwiaW1wb3J0IGFwaSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHNhZ2EgZnJvbSAnLi9zYWdhcyc7XG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0IHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHsgYXBpLCB0eXBlcywgc2FnYSwgcmVkdWNlciwgc2VsZWN0b3JzIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL2luZGV4LmpzIiwiaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuZXhwb3J0IGNvbnN0IGRzID0gbmV3IE1hcCh7XG4gIGlzRXJyb3I6IGZhbHNlLFxuICBzdGF0dXM6IG51bGwsXG4gIG1lc3NhZ2U6IG51bGwsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL21vZGVsLmpzIiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGRlZmF1bHRTdGF0ZSBmcm9tICcuL21vZGVsJztcblxuY29uc3QgQXBpUmVwb3J0ZXIgPSAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7IHBheWxvYWQsIHR5cGUgfSA9IGFjdGlvbjtcbiAgY29uc29sZS5sb2codHlwZSk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgdHlwZXMuSElERV9SRVBPUlRFUjpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0KCdpc0Vycm9yJywgZmFsc2UpXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIG51bGwpXG4gICAgICAgIC5zZXQoJ21lc3NhZ2UnLCBudWxsKTtcbiAgICBjYXNlIHR5cGVzLlNIT1dfUkVQT1JURVI6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldCgnaXNFcnJvcicsIHRydWUpXG4gICAgICAgIC5zZXQoJ3N0YXR1cycsIHBheWxvYWQuc3RhdHVzKVxuICAgICAgICAuc2V0KCdtZXNzYWdlJywgcGF5bG9hZC5tZXNzYWdlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcGlSZXBvcnRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9BcGkvcmVkdWNlci5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBhcGkgZnJvbSAnLi9hY3Rpb25zJztcbi8vIFRoZSB3YXRjaGVyOiB3YXRjaCBhY3Rpb25zIGFuZCBjb29yZGluYXRlIHdvcmtlciB0YXNrc1xuZnVuY3Rpb24gZ2V0RXJyb3JEYXRhKGRhdGEpe1xuICByZXR1cm4gZGF0YS5qc29uKCkudGhlbihkYXRhID0+IGRhdGEpO1xufVxuZnVuY3Rpb24qIGZldGNoKHsgdXJsLCBwYXJhbXMsIG1ldGhvZCA9ICdnZXQnLCBuYW1lID0gJ05PVEhJTkdfVFlQRScgfSkge1xuICB0cnkge1xuICAgIC8vIHlpZWxkIHB1dCh7IHR5cGU6IGAke25hbWV9XyR7dHlwZXMuUkVRVUVTVF9TVEFSVH1gLCBuYW1lIH0pO1xuICAgIGNvbnN0IHJlc3AgPSB5aWVsZCBjYWxsKGFwaVttZXRob2QudG9Mb3dlckNhc2UoKV0sIHsgdXJsLCBwYXJhbXMgfSk7XG4gICAgeWllbGQgcHV0KHtcbiAgICAgIHR5cGU6IHR5cGVzLlJFUVVFU1RfU1VDQ0VTUyxcbiAgICAgIG5hbWUsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIC4uLnJlc3AsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxldCBkYXRhID0geWllbGQgY2FsbChnZXRFcnJvckRhdGEsIGVycm9yLnJlc3ApO1xuICAgIHlpZWxkIHB1dCh7XG4gICAgICB0eXBlOiB0eXBlcy5SRVFVRVNUX0ZBSUwsXG4gICAgICBuYW1lLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwLnN0YXR1c1RleHQsXG4gICAgICAgIG9rOiBlcnJvci5yZXNwLm9rLFxuICAgICAgICBzdGF0dXM6IGVycm9yLnJlc3Auc3RhdHVzLFxuICAgICAgICBkYXRhLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogd2F0Y2hGZXRjaFJlcXVlc3RzKCkge1xuICB5aWVsZCB0YWtlRXZlcnkodHlwZXMuUkVRVUVTVF9TVEFSVCwgZmV0Y2gpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL0FwaS9zYWdhcy5qcyIsImltcG9ydCB7IE5BTUUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0ZSA9IHN0YXRlID0+IHN0YXRlW05BTUVdO1xuXG5leHBvcnQgY29uc3QgZ2V0TW9kZWwgPSBzdGF0ZSA9PiAoe1xuICBzdGF0dXM6IHN0YXRlW05BTUVdLmdldCgnc3RhdHVzJyksXG4gIG1lc3NhZ2U6IHN0YXRlW05BTUVdLmdldCgnbWVzc2FnZScpLFxuICBzaG93OiBzdGF0ZVtOQU1FXS5nZXQoJ2lzRXJyb3InKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7IGdldE1vZGVsIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL3NlbGVjdG9ycy5qcyIsImV4cG9ydCBjb25zdCBOQU1FID0gJ3VzZXInO1xuZXhwb3J0IGNvbnN0IFJFR0lTVEVSID0gYCR7TkFNRX1fcmVnaXN0ZXJgO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvYWN0aW9uVHlwZXMuanMiLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXIgPSAoeyBlbWFpbCwgcGFzc3dvcmQsIG5hbWUsIHBob25lIH0pID0+ICh7XG4gIHR5cGU6IEFwaS50eXBlcy5SRVFVRVNUX1NUQVJULFxuICBuYW1lOiB0eXBlcy5SRUdJU1RFUixcbiAgdXJsOiAnaHR0cDovLzEyNy4wLjAuMTo4MDAwL3VzZXIvJyxcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhcmFtczoge1xuICAgIGJvZHk6IHtcbiAgICAgIG5hbWUsXG4gICAgICBwaG9uZSxcbiAgICAgIGVtYWlsLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfVxuICB9LFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvVXNlci9hY3Rpb25zLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9SZWdpc3Rlci5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vUmVnaXN0ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vUmVnaXN0ZXIuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvbW9kdWxlcy9Vc2VyL2NvbXBvbmVudHMvUmVnaXN0ZXIvUmVnaXN0ZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzIGZyb20gJy4vUmVnaXN0ZXIuY3NzJztcbmltcG9ydCB7IElucHV0LCBHcm91cCB9IGZyb20gJ2NvbXBvbmVudHMvRm9ybSc7XG5pbXBvcnQgVGl0bGUgZnJvbSAnY29tcG9uZW50cy9UaXRsZSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ2NvbXBvbmVudHMvQnV0dG9uJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi8uLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gJ21vZHVsZXMvVmFsaWRhdG9yJztcbmltcG9ydCB7IEZvcm1payB9IGZyb20gJ2Zvcm1payc7XG5cbmNvbnN0IFJlZ2lzdGVyID0gKHsgcmVnaXN0ZXIsIHNlcnZlckVycm9ycywgaXNMb2FkaW5nIH0pID0+IChcbiAgPEZvcm1pa1xuICAgIHZhbGlkYXRpb25TY2hlbWE9e1ZhbGlkYXRvci5vYmplY3QoKS5zaGFwZSh7XG4gICAgICBlbWFpbDogVmFsaWRhdG9yLnN0cmluZygpXG4gICAgICAgIC5lbWFpbCgn0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5IGVtYWlsJylcbiAgICAgICAgLnJlcXVpcmVkKCdFbWFpbCDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LUnKSxcbiAgICAgIHBob25lOiBWYWxpZGF0b3Iuc3RyaW5nKClcbiAgICAgICAgLnJlcXVpcmVkKCfQotC10LvQtdGE0L7QvSDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LUnKVxuICAgICAgICAucGhvbmUoJ9Cd0LXQutC+0YDRgNC10LrRgtC90YvQuSDQvdC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAnKSxcbiAgICAgIHBhc3N3b3JkOiBWYWxpZGF0b3Iuc3RyaW5nKClcbiAgICAgICAgLnJlcXVpcmVkKCfQn9Cw0YDQvtC70Ywg0L7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1JylcbiAgICAgICAgLm1pbig4LCAn0J/QsNGA0L7Qu9GMINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQvNC40L3QuNC80YPQvCDQuNC3IDgg0YHQuNC80LLQvtC70L7QsicpLFxuICAgICAgbmFtZTogVmFsaWRhdG9yLnN0cmluZygpLnJlcXVpcmVkKCfQmNC80Y8g0L7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1JyksXG4gICAgfSl9XG4gICAgaW5pdGlhbFZhbHVlcz17e1xuICAgICAgZW1haWw6ICcnLFxuICAgICAgcGhvbmU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgbmFtZTogJycsXG4gICAgfX1cbiAgICBvblN1Ym1pdD17KFxuICAgICAgdmFsdWVzLFxuICAgICAge1xuICAgICAgICBwcm9wcyxcbiAgICAgICAgc2V0U3VibWl0dGluZyxcbiAgICAgICAgc2V0RXJyb3JzIC8qIHNldFZhbHVlcywgc2V0U3RhdHVzLCBhbmQgb3RoZXIgZ29vZGllcyAqLyxcbiAgICAgIH0sXG4gICAgKSA9PiB7XG4gICAgICByZWdpc3Rlcih7XG4gICAgICAgIG5hbWU6IHZhbHVlcy5uYW1lLFxuICAgICAgICBwaG9uZTogdmFsdWVzLnBob25lLFxuICAgICAgICBlbWFpbDogdmFsdWVzLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogdmFsdWVzLnBhc3N3b3JkLFxuICAgICAgfSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN1Ym1pdHRpbmcoZmFsc2UpLCAxMDAwKTtcbiAgICB9fVxuICAgIHJlbmRlcj17KHsgdmFsdWVzLCBlcnJvcnMsIGhhbmRsZVN1Ym1pdCwgaGFuZGxlQ2hhbmdlIH0pID0+IHtcbiAgICAgIGNvbnN0IGVycnMgPSBPYmplY3QuYXNzaWduKHt9LCBzZXJ2ZXJFcnJvcnMsIGVycm9ycyk7XG4gICAgICBjb25zb2xlLmxvZyhpc0xvYWRpbmcpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICAgICAgPFRpdGxlIHR5cGU9XCJoMlwiIGNlbnRlcj5cbiAgICAgICAgICAgINCg0LXQs9C40YHRgtGA0LDRhtC40Y9cbiAgICAgICAgICA8L1RpdGxlPlxuICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIlwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICBsYWJlbD1cItCS0LDRiNC1INCY0LzRjypcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi0JLQsNGI0LUg0JjQvNGPXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWVzLm5hbWV9XG4gICAgICAgICAgICAgICAgZXJyb3I9e2VycnMubmFtZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8R3JvdXA+XG4gICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJFbWFpbCpcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWVzLmVtYWlsfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgZXJyb3I9e2VycnMuZW1haWx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICBsYWJlbD1cItCi0LXQu9C10YTQvtC9KlwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLQotC10LvQtdGE0L7QvVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInRlbFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInBob25lXCJcbiAgICAgICAgICAgICAgICBlcnJvcj17ZXJycy5waG9uZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWVzLnBob25lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlBhc3N3b3JkKlwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIGVycm9yPXtlcnJzLnBhc3N3b3JkfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZXMucGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgICAgICAgdGhlbWU9XCJibGFja1wiXG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBSZWdpc3RlclxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5hbHJlYWR5fT5cbiAgICAgICAgICAgICAgPHNwYW4vPlxuICAgICAgICAgICAgICA8c3Bhbj5BbHJlYWR5IGhhdmUgYW4gYWNjb3VudD88L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiIHRoZW1lPVwiZ3JheVwiIGZ1bGxXaWR0aD5cbiAgICAgICAgICAgICAgTG9naW5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIClcbiAgICB9fVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBpc0xvYWRpbmc6IHN0YXRlW3R5cGVzLk5BTUVdLnJlZ2lzdGVyLmlzTG9hZGluZyxcbiAgICBzZXJ2ZXJFcnJvcnM6IHtcbiAgICAgIC4uLnN0YXRlW3R5cGVzLk5BTUVdLnJlZ2lzdGVyLmVycm9ycyxcbiAgICB9LFxuICB9KSxcbiAgeyByZWdpc3RlcjogYWN0aW9ucy5yZWdpc3RlciB9LFxuKSh3aXRoU3R5bGVzKHMpKFJlZ2lzdGVyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvVXNlci9jb21wb25lbnRzL1JlZ2lzdGVyL1JlZ2lzdGVyLmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBSZWdpc3RlckZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvUmVnaXN0ZXInO1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2VyJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHNhZ2EgZnJvbSAnLi9zYWdhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHsgcmVkdWNlciwgdHlwZXMsIHNhZ2EgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9Vc2VyL2luZGV4LmpzIiwiaW1wb3J0IHsgY3JlYXRlUmVkdWNlciwgdGFnZ2VkUmVkdWNlciB9IGZyb20gJ21vZHVsZXMvdXRpbHMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgQXBpIGZyb20gJ21vZHVsZXMvQXBpJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgaWQ6IG51bGwsXG4gIGlzQWN0aXZlOiBmYWxzZSxcbiAgcmVnaXN0ZXI6IHtcbiAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgIGVycm9yczoge1xuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIHBob25lOiBudWxsLFxuICAgICAgZW1haWw6IG51bGwsXG4gICAgICBwYXNzd29yZDogbnVsbCxcbiAgICB9LFxuICAgIGZpZWxkczoge1xuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIHBob25lOiBudWxsLFxuICAgICAgZW1haWw6IG51bGwsXG4gICAgICBwYXNzd29yZDogbnVsbCxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgY3JlYXRlID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG4gIHJldHVybiBzdGF0ZVxuICAgIC5zZXRJbihbJ3JlZ2lzdGVyJywgJ2lzTG9hZGluZyddLCBmYWxzZSlcbiAgICAuc2V0SW4oWydyZWdpc3RlcicsICdlcnJvcnMnXSwge30pO1xufTtcblxuY29uc3QgZmFpbCA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICByZXR1cm4gc3RhdGVcbiAgICAuc2V0SW4oWydyZWdpc3RlcicsICdpc0xvYWRpbmcnXSwgZmFsc2UpXG4gICAgLnNldEluKFsncmVnaXN0ZXInLCAnZXJyb3JzJ10sIHBheWxvYWQuZGF0YSk7XG59XG5cbmNvbnN0IHN0YXJ0ID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG4gIHJldHVybiBzdGF0ZVxuICAgIC5zZXRJbihbJ3JlZ2lzdGVyJywgJ2lzTG9hZGluZyddLCB0cnVlKVxuICAgIC5zZXRJbihbJ3JlZ2lzdGVyJywgJ2Vycm9ycyddLCB7fSk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUmVkdWNlcihkZWZhdWx0U3RhdGUsIHtcbiAgW0FwaS50eXBlcy5SRVFVRVNUX0ZBSUxdOiB0YWdnZWRSZWR1Y2VyKGZhaWwsIHR5cGVzLlJFR0lTVEVSKSxcbiAgW0FwaS50eXBlcy5SRVFVRVNUX1NVQ0NFU1NdOiB0YWdnZWRSZWR1Y2VyKGNyZWF0ZSwgdHlwZXMuUkVHSVNURVIpLFxuICBbQXBpLnR5cGVzLlJFUVVFU1RfU1RBUlRdOiB0YWdnZWRSZWR1Y2VyKHN0YXJ0LCB0eXBlcy5SRUdJU1RFUiksXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9Vc2VyL3JlZHVjZXIuanMiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeSc7XG4vLyBUaGUgd2F0Y2hlcjogd2F0Y2ggYWN0aW9ucyBhbmQgY29vcmRpbmF0ZSB3b3JrZXIgdGFza3NcblxuZnVuY3Rpb24qIHdhdGNoUmVnaXN0ZXIoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcGF5bG9hZCwgbmFtZSB9ID0gYWN0aW9uO1xuICBpZiAobmFtZSA9PT0gdHlwZXMuUkVHSVNURVIpIHtcbiAgICBoaXN0b3J5LnB1c2goJy9wZXJzb25hbCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKigpIHtcbiAgeWllbGQgdGFrZUV2ZXJ5KEFwaS50eXBlcy5SRVFVRVNUX1NVQ0NFU1MsIHdhdGNoUmVnaXN0ZXIpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvc2FnYXMuanMiLCJpbXBvcnQgWXVwIGZyb20gJ3l1cCc7XG5cbll1cC5hZGRNZXRob2QoWXVwLnN0cmluZywgJ3Bob25lJywgZnVuY3Rpb24gKG1zZyA9ICfQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQtdC70LXRhNC+0L0nKSB7XG4gIHJldHVybiB0aGlzLnRlc3Qoe1xuICAgIG5hbWU6ICdwaG9uZScsXG4gICAgZXhjbHVzaXZlOiB0cnVlLFxuICAgIG1lc3NhZ2U6IG1zZyxcbiAgICB0ZXN0OiAodmFsdWUpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSAvXigoOHxcXCs3KVtcXC0gXT8pPyhcXCg/XFxkezN9XFwpP1tcXC0gXT8pP1tcXGRcXC0gXXs3LDEwfSQvLnRlc3QodmFsdWUpO1xuICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgWXVwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1ZhbGlkYXRvci9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBjcmVhdGVSZWR1Y2VyID0gKGluaXRpYWxTdGF0ZSwgaGFuZGxlcnMpID0+IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBpZiAoaGFuZGxlcnMuaGFzT3duUHJvcGVydHkoYWN0aW9uLnR5cGUpKSB7XG4gICAgcmV0dXJuIGhhbmRsZXJzW2FjdGlvbi50eXBlXShzdGF0ZSwgYWN0aW9uKTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5cbmV4cG9ydCBjb25zdCB0YWdnZWRSZWR1Y2VyID0gKHJlZHVjZXIsIHJOYW1lKSA9PiAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7IG5hbWUgfSA9IGFjdGlvbjtcbiAgY29uc3QgaXNJbml0aWFsaXphdGlvbkNhbGwgPSBzdGF0ZSA9PT0gdW5kZWZpbmVkO1xuICBpZiAobmFtZSAhPT0gck5hbWUgJiYgIWlzSW5pdGlhbGl6YXRpb25DYWxsKSByZXR1cm4gc3RhdGU7XG4gIHJldHVybiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy91dGlscy5qcyIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XG5pbXBvcnQgcnVudGltZSBmcm9tICcuL3J1bnRpbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICB1c2VyLFxuICBydW50aW1lLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JlZHVjZXJzL2luZGV4LmpzIiwiaW1wb3J0IHsgU0VUX1JVTlRJTUVfVkFSSUFCTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW50aW1lKHN0YXRlID0ge30sIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBTRVRfUlVOVElNRV9WQVJJQUJMRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbYWN0aW9uLnBheWxvYWQubmFtZV06IGFjdGlvbi5wYXlsb2FkLnZhbHVlLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JlZHVjZXJzL3J1bnRpbWUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VyKHN0YXRlID0ge30sIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yZWR1Y2Vycy91c2VyLmpzIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFVzZXIgZnJvbSAnbW9kdWxlcy9Vc2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgdXNlcjogVXNlci5yZWR1Y2VyLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3Jvb3RSZWR1Y2VyLmpzIiwiaW1wb3J0IHsgYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuaW1wb3J0IFVzZXIgZnJvbSAnbW9kdWxlcy9Vc2VyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qIHJvb3RTYWdhKCkge1xuICB5aWVsZCBhbGwoW1xuICAgIEFwaS5zYWdhKCksXG4gICAgVXNlci5zYWdhKCksXG4gIF0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3Jvb3RTYWdhcy5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFVuaXZlcnNhbFJvdXRlciBmcm9tICd1bml2ZXJzYWwtcm91dGVyJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgVW5pdmVyc2FsUm91dGVyKHJvdXRlcywge1xuICByZXNvbHZlUm91dGUoY29udGV4dCwgcGFyYW1zKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0LnJvdXRlLmxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LnJvdXRlXG4gICAgICAgIC5sb2FkKClcbiAgICAgICAgLnRoZW4oYWN0aW9uID0+IGFjdGlvbi5kZWZhdWx0KGNvbnRleHQsIHBhcmFtcykpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbnRleHQucm91dGUuYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY29udGV4dC5yb3V0ZS5hY3Rpb24oY29udGV4dCwgcGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSxcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yb3V0ZXIuanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0Vycm9yUGFnZS5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vRXJyb3JQYWdlLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0Vycm9yUGFnZS5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0Vycm9yUGFnZS5jc3MnO1xuXG5jbGFzcyBFcnJvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGVycm9yOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgc3RhY2s6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGVycm9yOiBudWxsLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoX19ERVZfXyAmJiB0aGlzLnByb3BzLmVycm9yKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT57dGhpcy5wcm9wcy5lcnJvci5uYW1lfTwvaDE+XG4gICAgICAgICAgPHByZT57dGhpcy5wcm9wcy5lcnJvci5zdGFja308L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+RXJyb3I8L2gxPlxuICAgICAgICA8cD5Tb3JyeSwgYSBjcml0aWNhbCBlcnJvciBvY2N1cnJlZCBvbiB0aGlzIHBhZ2UuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFcnJvclBhZ2UgYXMgRXJyb3JQYWdlV2l0aG91dFN0eWxlIH07XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEVycm9yUGFnZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJy4vRXJyb3JQYWdlJztcblxuZnVuY3Rpb24gYWN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiAnRGVtbyBFcnJvcicsXG4gICAgY29tcG9uZW50OiA8RXJyb3JQYWdlIC8+LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy9lcnJvci9pbmRleC5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vSG9tZS5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vSG9tZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Ib21lLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvcm91dGVzL2hvbWUvSG9tZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBCYW5uZXIgZnJvbSAnY29tcG9uZW50cy9CYW5uZXInO1xuaW1wb3J0IENvbnRlbnQgZnJvbSAnY29tcG9uZW50cy9CYW5uZXIvY29tcG9uZW50cy9Db250ZW50L0NvbnRlbnQnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdjb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgVGFicyBmcm9tICdjb21wb25lbnRzL1RhYnMnO1xuaW1wb3J0IENhcmRHcmlkIGZyb20gJ2NvbXBvbmVudHMvQ2FyZEdyaWQnO1xuaW1wb3J0IEp1bWJvdHJvbiBmcm9tICdjb21wb25lbnRzL0p1bWJvdHJvbic7XG5pbXBvcnQgQWNjZW50UHJvZHVjdHMgZnJvbSAnY29tcG9uZW50cy9BY2NlbnRQcm9kdWN0cyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ2NvbXBvbmVudHMvQnV0dG9uJztcbmltcG9ydCBzIGZyb20gJy4vSG9tZS5jc3MnO1xuXG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG5ld3M6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgbGluazogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjb250ZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgfSksXG4gICAgKS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICAgIDxCYW5uZXI+XG4gICAgICAgICAgPENvbnRlbnRcbiAgICAgICAgICAgIHRpdGxlPVwiTWluaW1hbCBGdXJuaXR1cmUgQ2hhaXIgZm9yIFdvcmtzcGFjZVwiXG4gICAgICAgICAgICBwcmljZT1cIjc0LjI4XCJcbiAgICAgICAgICAgIGJ1dHRvbkxhYmVsPVwiU2hvdyBOb3dcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENvbnRlbnRcbiAgICAgICAgICAgIHRpdGxlPVwiTWluaW1hbCBGdXJuaXR1cmUgQ2hhaXIgZm9yIFdvcmtzcGFjZVwiXG4gICAgICAgICAgICBwcmljZT1cIjc0LjI4XCJcbiAgICAgICAgICAgIGJ1dHRvbkxhYmVsPVwiU2hvdyBOb3dcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENvbnRlbnRcbiAgICAgICAgICAgIHRpdGxlPVwiTWluaW1hbCBGdXJuaXR1cmUgQ2hhaXIgZm9yIFdvcmtzcGFjZVwiXG4gICAgICAgICAgICBwcmljZT1cIjc0LjI4XCJcbiAgICAgICAgICAgIGJ1dHRvbkxhYmVsPVwiU2hvdyBOb3dcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQmFubmVyPlxuICAgICAgICA8QWNjZW50UHJvZHVjdHNcbiAgICAgICAgICBjbGFzc2VzPXt7IHJvb3Q6IHMuYWNjZW50UHJvZHVjdHMgfX1cbiAgICAgICAgLz5cbiAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgPEp1bWJvdHJvbiBjbGFzc2VzPXt7XG4gICAgICAgICAgIHJvb3Q6IHMuanVtYm90cm9uLFxuICAgICAgICAgfX1cbiAgICAgICAgIC8+XG4gICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT17cy5oZWFkZXJ9PlxuICAgICAgICAgICA8aDEgY2xhc3NOYW1lPXtzLnRpdGxlfT5cbiAgICAgICAgICAgICBUcmVuZGluZyBQcm9kdWN0c1xuICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3MuZGV2aWRlcn0gLz5cbiAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzLmRlc2NyfT5cbiAgICAgICAgICAgICBBIGNvbGxlY3Rpb24gb2YgdGV4dGlsZSBzYW1wbGVzIGxheSBzcHJlYWQgb3V0IG9uIHRoZSB0YWJsZSBTYW1zYSB3YXMgYSB0cmF2ZWxsZWRcbiAgICAgICAgICAgPC9wPlxuICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICA8VGFic1xuICAgICAgICAgIGNsYXNzZXM9e3tcbiAgICAgICAgICAgIGhlYWRlcjogcy50YWJzSGVhZGVyLFxuICAgICAgICAgICAgcm9vdDogJycsXG4gICAgICAgICAgfX1cbiAgICAgICAgICBwYW5lbHM9e1tcbiAgICAgICAgICAgIHsgcmVuZGVyOiAoKSA9PiAoXG4gICAgICAgICAgICAgICAgPENhcmRHcmlkXG4gICAgICAgICAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJy0yMCUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3RhcGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICctMjAlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnLTIwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJy0yMCUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3RhcGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICctMjAlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnT3V0XFxub2ZcXG5TdG9jaycsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAnc3RvY2snLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICdOZXcnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3RhcGUnLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgfVxuICAgICAgICAgIF19XG4gICAgICAgICAvPlxuICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MubG9hZE1vcmV9PlxuICAgICAgICAgICA8QnV0dG9uPlxuICAgICAgICAgICAgIExvYWQgTW9yZVxuICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEhvbWUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yb3V0ZXMvaG9tZS9Ib21lLmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9Ib21lJztcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9MYXlvdXQnO1xuXG5hc3luYyBmdW5jdGlvbiBhY3Rpb24oeyBmZXRjaCB9KSB7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogJ1JlYWN0IFN0YXJ0ZXIgS2l0JyxcbiAgICBjb21wb25lbnQ6IChcbiAgICAgIDxMYXlvdXQ+XG4gICAgICAgIDxIb21lIG5ld3M9e1tdfSAvPlxuICAgICAgPC9MYXlvdXQ+XG4gICAgKSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWN0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yb3V0ZXMvaG9tZS9pbmRleC5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgZ2xvYmFsLXJlcXVpcmUgKi9cblxuLy8gVGhlIHRvcC1sZXZlbCAocGFyZW50KSByb3V0ZVxuY29uc3Qgcm91dGVzID0ge1xuICBwYXRoOiAnJyxcblxuICAvLyBLZWVwIGluIG1pbmQsIHJvdXRlcyBhcmUgZXZhbHVhdGVkIGluIG9yZGVyXG4gIGNoaWxkcmVuOiBbXG4gICAgLy8gVGhlIGhvbWUgcm91dGUgaXMgYWRkZWQgdG8gY2xpZW50LmpzIHRvIG1ha2Ugc3VyZSBzaGFyZWQgY29tcG9uZW50cyBhcmVcbiAgICAvLyBhZGRlZCB0byBjbGllbnQuanMgYXMgd2VsbCBhbmQgbm90IHJlcGVhdGVkIGluIGVhY2ggaW5kaXZpZHVhbCByb3V0ZSBjaHVuay5cbiAgICB7XG4gICAgICBwYXRoOiAnJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrTW9kZTogJ2VhZ2VyJyAqLyAnLi9ob21lJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL3Nob3AnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdwcm9kdWN0cycgKi8gJy4vcHJvZHVjdHMnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvcmVnaXN0ZXInLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdyZWdpc3RlcicgKi8gJy4vcmVnaXN0ZXInKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvY29udGFjdCcsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2NvbnRhY3QnICovICcuL2NvbnRhY3QnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvcGVyc29uYWwnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdsaycgKi8gJy4vbGsnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvYWJvdXQnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdhYm91dCcgKi8gJy4vYWJvdXQnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvcHJpdmFjeScsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3ByaXZhY3knICovICcuL3ByaXZhY3knKSxcbiAgICB9LFxuICAgIC8vIFdpbGRjYXJkIHJvdXRlcywgZS5nLiB7IHBhdGg6ICcoLiopJywgLi4uIH0gKG11c3QgZ28gbGFzdClcbiAgICB7XG4gICAgICBwYXRoOiAnKC4qKScsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ25vdC1mb3VuZCcgKi8gJy4vbm90LWZvdW5kJyksXG4gICAgfSxcbiAgXSxcblxuICBhc3luYyBhY3Rpb24oeyBuZXh0IH0pIHtcbiAgICAvLyBFeGVjdXRlIGVhY2ggY2hpbGQgcm91dGUgdW50aWwgb25lIG9mIHRoZW0gcmV0dXJuIHRoZSByZXN1bHRcbiAgICBjb25zdCByb3V0ZSA9IGF3YWl0IG5leHQoKTtcblxuICAgIC8vIFByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIHRpdGxlLCBkZXNjcmlwdGlvbiBldGMuXG4gICAgcm91dGUudGl0bGUgPSBgJHtyb3V0ZS50aXRsZSB8fCAnVW50aXRsZWQgUGFnZSd9IC0gd3d3LnJlYWN0c3RhcnRlcmtpdC5jb21gO1xuICAgIHJvdXRlLmRlc2NyaXB0aW9uID0gcm91dGUuZGVzY3JpcHRpb24gfHwgJyc7XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH0sXG59O1xuXG4vLyBUaGUgZXJyb3IgcGFnZSBpcyBhdmFpbGFibGUgYnkgcGVybWFuZW50IHVybCBmb3IgZGV2ZWxvcG1lbnQgbW9kZVxuaWYgKF9fREVWX18pIHtcbiAgcm91dGVzLmNoaWxkcmVuLnVuc2hpZnQoe1xuICAgIHBhdGg6ICcvZXJyb3InLFxuICAgIGFjdGlvbjogcmVxdWlyZSgnLi9lcnJvcicpLmRlZmF1bHQsXG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy9pbmRleC5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgbm9kZUZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCBQcmV0dHlFcnJvciBmcm9tICdwcmV0dHktZXJyb3InO1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJztcbmltcG9ydCBIdG1sIGZyb20gJy4vY29tcG9uZW50cy9IdG1sJztcbmltcG9ydCB7IEVycm9yUGFnZVdpdGhvdXRTdHlsZSB9IGZyb20gJy4vcm91dGVzL2Vycm9yL0Vycm9yUGFnZSc7XG5pbXBvcnQgZXJyb3JQYWdlU3R5bGUgZnJvbSAnLi9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmNzcyc7XG5pbXBvcnQgY3JlYXRlRmV0Y2ggZnJvbSAnLi9jcmVhdGVGZXRjaCc7XG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcm91dGVyJztcbmltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldHMuanNvbic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLXVucmVzb2x2ZWRcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuL3N0b3JlL2NvbmZpZ3VyZVN0b3JlJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnc2VhbWxlc3MtaW1tdXRhYmxlJztcbmltcG9ydCBVc2VyIGZyb20gJ21vZHVsZXMvVXNlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKHJlYXNvbiwgcCkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgUmVqZWN0aW9uIGF0OicsIHAsICdyZWFzb246JywgcmVhc29uKTtcbiAgLy8gc2VuZCBlbnRpcmUgYXBwIGRvd24uIFByb2Nlc3MgbWFuYWdlciB3aWxsIHJlc3RhcnQgaXRcbiAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG5cbi8vXG4vLyBUZWxsIGFueSBDU1MgdG9vbGluZyAoc3VjaCBhcyBNYXRlcmlhbCBVSSkgdG8gdXNlIGFsbCB2ZW5kb3IgcHJlZml4ZXMgaWYgdGhlXG4vLyB1c2VyIGFnZW50IGlzIG5vdCBrbm93bi5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5nbG9iYWwubmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvciB8fCB7fTtcbmdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50ID0gZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQgfHwgJ2FsbCc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuLy9cbi8vIElmIHlvdSBhcmUgdXNpbmcgcHJveHkgZnJvbSBleHRlcm5hbCBtYWNoaW5lLCB5b3UgY2FuIHNldCBUUlVTVF9QUk9YWSBlbnZcbi8vIERlZmF1bHQgaXMgdG8gdHJ1c3QgcHJveHkgaGVhZGVycyBvbmx5IGZyb20gbG9vcGJhY2sgaW50ZXJmYWNlLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmFwcC5zZXQoJ3RydXN0IHByb3h5JywgY29uZmlnLnRydXN0UHJveHkpO1xuXG4vL1xuLy8gUmVnaXN0ZXIgTm9kZS5qcyBtaWRkbGV3YXJlXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJykpKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuYXBwLmdldCgnKicsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNzcyA9IG5ldyBTZXQoKTtcblxuICAgIC8vIEVuYWJsZXMgY3JpdGljYWwgcGF0aCBDU1MgcmVuZGVyaW5nXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaWFzb2Z0L2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyXG4gICAgY29uc3QgaW5zZXJ0Q3NzID0gKC4uLnN0eWxlcykgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlXG4gICAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiBjc3MuYWRkKHN0eWxlLl9nZXRDc3MoKSkpO1xuICAgIH07XG5cbiAgICAvLyBVbml2ZXJzYWwgSFRUUCBjbGllbnRcblxuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgIHN5bWJvbDogJyQnLFxuICAgICAgICB0eXBlOiAndXNkJyxcbiAgICAgIH0sXG4gICAgICBbVXNlci50eXBlcy5OQU1FXTogSW1tdXRhYmxlKFVzZXIucmVkdWNlci5kZWZhdWx0U3RhdGUpLFxuICAgIH07XG5cbiAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSwge30pO1xuXG4gICAgLy8gR2xvYmFsIChjb250ZXh0KSB2YXJpYWJsZXMgdGhhdCBjYW4gYmUgZWFzaWx5IGFjY2Vzc2VkIGZyb20gYW55IFJlYWN0IGNvbXBvbmVudFxuICAgIC8vIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvY29udGV4dC5odG1sXG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgIGluc2VydENzcyxcbiAgICAgIC8vIFRoZSB0d2lucyBiZWxvdyBhcmUgd2lsZCwgYmUgY2FyZWZ1bCFcbiAgICAgIHBhdGhuYW1lOiByZXEucGF0aCxcbiAgICAgIHF1ZXJ5OiByZXEucXVlcnksXG4gICAgICAvLyBZb3UgY2FuIGFjY2VzcyByZWR1eCB0aHJvdWdoIHJlYWN0LXJlZHV4IGNvbm5lY3RcbiAgICAgIHN0b3JlLFxuICAgICAgc3RvcmVTdWJzY3JpcHRpb246IG51bGwsXG4gICAgfTtcblxuICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVyLnJlc29sdmUoY29udGV4dCk7XG5cbiAgICBpZiAocm91dGUucmVkaXJlY3QpIHtcbiAgICAgIHJlcy5yZWRpcmVjdChyb3V0ZS5zdGF0dXMgfHwgMzAyLCByb3V0ZS5yZWRpcmVjdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHsgLi4ucm91dGUgfTtcbiAgICBkYXRhLmNoaWxkcmVuID0gUmVhY3RET00ucmVuZGVyVG9TdHJpbmcoXG4gICAgICA8QXBwIGNvbnRleHQ9e2NvbnRleHR9Pntyb3V0ZS5jb21wb25lbnR9PC9BcHA+LFxuICAgICk7XG4gICAgZGF0YS5zdHlsZXMgPSBbeyBpZDogJ2NzcycsIGNzc1RleHQ6IFsuLi5jc3NdLmpvaW4oJycpIH1dO1xuICAgIGRhdGEuc2NyaXB0cyA9IFthc3NldHMudmVuZG9yLmpzXTtcbiAgICBpZiAocm91dGUuY2h1bmtzKSB7XG4gICAgICBkYXRhLnNjcmlwdHMucHVzaCguLi5yb3V0ZS5jaHVua3MubWFwKGNodW5rID0+IGFzc2V0c1tjaHVua10uanMpKTtcbiAgICB9XG4gICAgZGF0YS5zY3JpcHRzLnB1c2goYXNzZXRzLmNsaWVudC5qcyk7XG4gICAgZGF0YS5hcHAgPSB7XG4gICAgICBhcGlVcmw6IGNvbmZpZy5hcGkuY2xpZW50VXJsLFxuICAgICAgc3RhdGU6IGNvbnRleHQuc3RvcmUuZ2V0U3RhdGUoKSxcbiAgICB9O1xuXG4gICAgY29uc3QgaHRtbCA9IFJlYWN0RE9NLnJlbmRlclRvU3RhdGljTWFya3VwKDxIdG1sIHsuLi5kYXRhfSAvPik7XG4gICAgcmVzLnN0YXR1cyhyb3V0ZS5zdGF0dXMgfHwgMjAwKTtcbiAgICByZXMuc2VuZChgPCFkb2N0eXBlIGh0bWw+JHtodG1sfWApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBuZXh0KGVycik7XG4gIH1cbn0pO1xuXG4vL1xuLy8gRXJyb3IgaGFuZGxpbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5jb25zdCBwZSA9IG5ldyBQcmV0dHlFcnJvcigpO1xucGUuc2tpcE5vZGVGaWxlcygpO1xucGUuc2tpcFBhY2thZ2UoJ2V4cHJlc3MnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5hcHAudXNlKChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IocGUucmVuZGVyKGVycikpO1xuICBjb25zdCBodG1sID0gUmVhY3RET00ucmVuZGVyVG9TdGF0aWNNYXJrdXAoXG4gICAgPEh0bWxcbiAgICAgIHRpdGxlPVwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCJcbiAgICAgIGRlc2NyaXB0aW9uPXtlcnIubWVzc2FnZX1cbiAgICAgIHN0eWxlcz17W3sgaWQ6ICdjc3MnLCBjc3NUZXh0OiBlcnJvclBhZ2VTdHlsZS5fZ2V0Q3NzKCkgfV19IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbiAgICA+XG4gICAgICB7UmVhY3RET00ucmVuZGVyVG9TdHJpbmcoPEVycm9yUGFnZVdpdGhvdXRTdHlsZSBlcnJvcj17ZXJyfSAvPil9XG4gICAgPC9IdG1sPixcbiAgKTtcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gIHJlcy5zZW5kKGA8IWRvY3R5cGUgaHRtbD4ke2h0bWx9YCk7XG59KTtcblxuLy9cbi8vIExhdW5jaCB0aGUgc2VydmVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pZiAoIW1vZHVsZS5ob3QpIHtcbiAgYXBwLmxpc3Rlbihjb25maWcucG9ydCwgKCkgPT4ge1xuICAgIGNvbnNvbGUuaW5mbyhgVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtjb25maWcucG9ydH0vYCk7XG4gIH0pO1xufVxuXG4vL1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmlmIChtb2R1bGUuaG90KSB7XG4gIGFwcC5ob3QgPSBtb2R1bGUuaG90O1xuICBtb2R1bGUuaG90LmFjY2VwdCgnLi9yb3V0ZXInKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9zZXJ2ZXIuanMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IGNvbXBvc2VXaXRoRGV2VG9vbHMgfSBmcm9tICdyZWR1eC1kZXZ0b29scy1leHRlbnNpb24vZGV2ZWxvcG1lbnRPbmx5JztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IG5hbWUsIHZlcnNpb24gfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IGNyZWF0ZUhlbHBlcnMgZnJvbSAnLi9jcmVhdGVIZWxwZXJzJztcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHNhZ2FzIGZyb20gJy4uL3Jvb3RTYWdhcyc7XG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi4vcm9vdFJlZHVjZXInO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdzZWFtbGVzcy1pbW11dGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShpbml0aWFsU3RhdGUsIGhlbHBlcnNDb25maWcpIHtcbiAgY29uc3QgaGVscGVycyA9IGNyZWF0ZUhlbHBlcnMoaGVscGVyc0NvbmZpZyk7XG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgbWlkZGxld2FyZSA9IFt0aHVuay53aXRoRXh0cmFBcmd1bWVudChoZWxwZXJzKSwgc2FnYU1pZGRsZXdhcmVdO1xuXG4gIGxldCBlbmhhbmNlcjtcblxuICBpZiAoX19ERVZfXykge1xuICAgIG1pZGRsZXdhcmUucHVzaChjcmVhdGVMb2dnZXIoKSk7XG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemFsbW94aXN1cy9yZWR1eC1kZXZ0b29scy1leHRlbnNpb24jMTQtdXNpbmctaW4tcHJvZHVjdGlvblxuICAgIGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSBjb21wb3NlV2l0aERldlRvb2xzKHtcbiAgICAgIC8vIE9wdGlvbnM6IGh0dHBzOi8vZ2l0aHViLmNvbS96YWxtb3hpc3VzL3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbi9ibG9iL21hc3Rlci9kb2NzL0FQSS9Bcmd1bWVudHMubWQjb3B0aW9uc1xuICAgICAgbmFtZTogYCR7bmFtZX1AJHt2ZXJzaW9ufWAsXG4gICAgfSk7XG5cbiAgICAvLyBodHRwczovL3JlZHV4LmpzLm9yZy9kb2NzL2FwaS9hcHBseU1pZGRsZXdhcmUuaHRtbFxuICAgIGVuaGFuY2VyID0gY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSkpO1xuICB9IGVsc2Uge1xuICAgIGVuaGFuY2VyID0gYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9yZWR1eC5qcy5vcmcvZG9jcy9hcGkvY3JlYXRlU3RvcmUuaHRtbFxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBJbW11dGFibGUoaW5pdGlhbFN0YXRlKSwgZW5oYW5jZXIpO1xuXG4gIC8vIEhvdCByZWxvYWQgcmVkdWNlcnMgKHJlcXVpcmVzIFdlYnBhY2sgb3IgQnJvd3NlcmlmeSBITVIgdG8gYmUgZW5hYmxlZClcbiAgaWYgKF9fREVWX18gJiYgbW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCcuLi9yZWR1Y2VycycsICgpID0+XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2xvYmFsLXJlcXVpcmVcbiAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKHJlcXVpcmUoJy4uL3JlZHVjZXJzJykuZGVmYXVsdCksXG4gICAgKTtcbiAgfVxuICBzYWdhTWlkZGxld2FyZS5ydW4oc2FnYXMpO1xuICByZXR1cm4gc3RvcmU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3N0b3JlL2NvbmZpZ3VyZVN0b3JlLmpzIiwiZnVuY3Rpb24gY3JlYXRlR3JhcGhxbFJlcXVlc3QoZmV0Y2gpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGdyYXBocWxSZXF1ZXN0KHF1ZXJ5LCB2YXJpYWJsZXMpIHtcbiAgICBjb25zdCBmZXRjaENvbmZpZyA9IHtcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHF1ZXJ5LCB2YXJpYWJsZXMgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKCcvZ3JhcGhxbCcsIGZldGNoQ29uZmlnKTtcbiAgICBpZiAocmVzcC5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKHJlc3Auc3RhdHVzVGV4dCk7XG4gICAgcmV0dXJuIHJlc3AuanNvbigpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVIZWxwZXJzKHsgZmV0Y2gsIGhpc3RvcnkgfSkge1xuICByZXR1cm4ge1xuICAgIGZldGNoLFxuICAgIGhpc3RvcnksXG4gICAgZ3JhcGhxbFJlcXVlc3Q6IGNyZWF0ZUdyYXBocWxSZXF1ZXN0KGZldGNoKSxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvc3RvcmUvY3JlYXRlSGVscGVycy5qcyIsImltcG9ydCB7IGluc3BlY3QgfSBmcm9tICd1dGlsJztcblxuZnVuY3Rpb24gaW5zcGVjdE9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuIGluc3BlY3Qob2JqZWN0LCB7XG4gICAgY29sb3JzOiB0cnVlLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2luZ2xlTGluZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG59XG5cbmNvbnN0IGFjdGlvbkZvcm1hdHRlcnMgPSB7XG4gIC8vIFRoaXMgaXMgdXNlZCBhdCBmZWF0dXJlL2Fwb2xsbyBicmFuY2gsIGJ1dCBpdCBjYW4gaGVscCB5b3Ugd2hlbiBpbXBsZW1lbnRpbmcgQXBvbGxvXG4gIEFQT0xMT19RVUVSWV9JTklUOiBhID0+XG4gICAgYHF1ZXJ5SWQ6JHthLnF1ZXJ5SWR9IHZhcmlhYmxlczoke2luc3BlY3RPYmplY3QoXG4gICAgICBhLnZhcmlhYmxlcyxcbiAgICApfVxcbiAgICR7c2luZ2xlTGluZShhLnF1ZXJ5U3RyaW5nKX1gLFxuXG4gIEFQT0xMT19RVUVSWV9SRVNVTFQ6IGEgPT5cbiAgICBgcXVlcnlJZDoke2EucXVlcnlJZH1cXG4gICAke3NpbmdsZUxpbmUoaW5zcGVjdE9iamVjdChhLnJlc3VsdCkpfWAsXG5cbiAgQVBPTExPX1FVRVJZX1NUT1A6IGEgPT4gYHF1ZXJ5SWQ6JHthLnF1ZXJ5SWR9YCxcbn07XG5cbi8vIFNlcnZlciBzaWRlIHJlZHV4IGFjdGlvbiBsb2dnZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcigpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiBzdG9yZSA9PiBuZXh0ID0+IGFjdGlvbiA9PiB7XG4gICAgbGV0IGZvcm1hdHRlZFBheWxvYWQgPSAnJztcbiAgICBjb25zdCBhY3Rpb25Gb3JtYXR0ZXIgPSBhY3Rpb25Gb3JtYXR0ZXJzW2FjdGlvbi50eXBlXTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm9ybWF0dGVkUGF5bG9hZCA9IGFjdGlvbkZvcm1hdHRlcihhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uLnRvU3RyaW5nICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSB7XG4gICAgICBmb3JtYXR0ZWRQYXlsb2FkID0gYWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uLnBheWxvYWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBmb3JtYXR0ZWRQYXlsb2FkID0gaW5zcGVjdE9iamVjdChhY3Rpb24ucGF5bG9hZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1hdHRlZFBheWxvYWQgPSBpbnNwZWN0T2JqZWN0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYCAqICR7YWN0aW9uLnR5cGV9OiAke2Zvcm1hdHRlZFBheWxvYWR9YCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3N0b3JlL2xvZ2dlci9sb2dnZXIuc2VydmVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IEBiYWJlbC9wb2x5ZmlsbFxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYmFiZWwvcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIlxuLy8gbW9kdWxlIGlkID0gQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIlxuLy8gbW9kdWxlIGlkID0gQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XCJcbi8vIG1vZHVsZSBpZCA9IGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCJcbi8vIG1vZHVsZSBpZCA9IGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gYm9keS1wYXJzZXJcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3NuYW1lc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNsYXNzbmFtZXNcIlxuLy8gbW9kdWxlIGlkID0gY2xhc3NuYW1lc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSBjb29raWUtcGFyc2VyXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IGV4cHJlc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZm9ybWlrXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZm9ybWlrXCJcbi8vIG1vZHVsZSBpZCA9IGZvcm1pa1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeVwiXG4vLyBtb2R1bGUgaWQgPSBoaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5XG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltbXV0YWJsZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImltbXV0YWJsZVwiXG4vLyBtb2R1bGUgaWQgPSBpbW11dGFibGVcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaXNvbW9ycGhpYy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImlzb21vcnBoaWMtZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gaXNvbW9ycGhpYy1mZXRjaFxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImlzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzXCJcbi8vIG1vZHVsZSBpZCA9IGlzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJub2RlLWZldGNoXCJcbi8vIG1vZHVsZSBpZCA9IG5vZGUtZmV0Y2hcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibnVrYS1jYXJvdXNlbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm51a2EtY2Fyb3VzZWxcIlxuLy8gbW9kdWxlIGlkID0gbnVrYS1jYXJvdXNlbFxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSBwYXRoXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByZXR0eS1lcnJvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInByZXR0eS1lcnJvclwiXG4vLyBtb2R1bGUgaWQgPSBwcmV0dHktZXJyb3Jcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInByb3AtdHlwZXNcIlxuLy8gbW9kdWxlIGlkID0gcHJvcC10eXBlc1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYy1zbGlkZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyYy1zbGlkZXJcIlxuLy8gbW9kdWxlIGlkID0gcmMtc2xpZGVyXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gcmVhY3Rcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gcmVhY3QtZG9tL3NlcnZlclxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1mb250YXdlc29tZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWZvbnRhd2Vzb21lXCJcbi8vIG1vZHVsZSBpZCA9IHJlYWN0LWZvbnRhd2Vzb21lXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gcmVhY3QtcmVkdXhcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtc2VsZWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3Qtc2VsZWN0XCJcbi8vIG1vZHVsZSBpZCA9IHJlYWN0LXNlbGVjdFxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10YWJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtdGFic1wiXG4vLyBtb2R1bGUgaWQgPSByZWFjdC10YWJzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXRyZWViZWFyZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXRyZWViZWFyZFwiXG4vLyBtb2R1bGUgaWQgPSByZWFjdC10cmVlYmVhcmRcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSByZWR1eFxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb24vZGV2ZWxvcG1lbnRPbmx5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2RldmVsb3BtZW50T25seVwiXG4vLyBtb2R1bGUgaWQgPSByZWR1eC1kZXZ0b29scy1leHRlbnNpb24vZGV2ZWxvcG1lbnRPbmx5XG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCJcbi8vIG1vZHVsZSBpZCA9IHJlZHV4LXNhZ2Fcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCJcbi8vIG1vZHVsZSBpZCA9IHJlZHV4LXNhZ2EvZWZmZWN0c1xuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXRodW5rXCJcbi8vIG1vZHVsZSBpZCA9IHJlZHV4LXRodW5rXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlYW1sZXNzLWltbXV0YWJsZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlYW1sZXNzLWltbXV0YWJsZVwiXG4vLyBtb2R1bGUgaWQgPSBzZWFtbGVzcy1pbW11dGFibGVcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VyaWFsaXplLWphdmFzY3JpcHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiXG4vLyBtb2R1bGUgaWQgPSBzZXJpYWxpemUtamF2YXNjcmlwdFxuLy8gbW9kdWxlIGNodW5rcyA9IDciLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtcm91dGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLXJvdXRlclwiXG4vLyBtb2R1bGUgaWQgPSB1bml2ZXJzYWwtcm91dGVyXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1dGlsXCJcbi8vIG1vZHVsZSBpZCA9IHV0aWxcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieXVwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwieXVwXCJcbi8vIG1vZHVsZSBpZCA9IHl1cFxuLy8gbW9kdWxlIGNodW5rcyA9IDciXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0c0JBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdCQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTs7OztBQTdEQTtBQUNBO0FBK0RBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFSQTtBQVlBOzs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQU1BO0FBUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWEE7QUFDQTtBQWNBO0FBQ0E7QUFEQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7Ozs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFoQkE7QUFDQTtBQURBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBRkE7O0FBREE7Ozs7QUFNQTs7QUFhQTs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTtBQUNBO0FBQ0E7QUFBQTtBQVdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQVdBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUE5QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFDQTtBQWdEQTs7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYkE7QUFDQTtBQW1CQTs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWNBO0FBQ0E7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFkQTtBQUNBO0FBb0JBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBS0E7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFEQTs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTs7Ozs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BOzs7O0FBL0RBO0FBQ0E7QUFpRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVNBOzs7Ozs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFUQTtBQUNBO0FBZ0JBO0FBRUE7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBRkE7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFLQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQ0E7QUFVQTs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUE7Ozs7QUF4QkE7QUFDQTtBQTBCQTs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BOzs7Ozs7OztBQy9CQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTs7OztBQWxCQTtBQUNBO0FBb0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQVFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBREE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTs7OztBQTFFQTtBQUNBO0FBREE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBWEE7O0FBREE7Ozs7QUFlQTtBQUNBO0FBQ0E7QUFGQTs7QUE4REE7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVRBO0FBQ0E7QUFhQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQVJBO0FBY0E7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7Ozs7QUFiQTtBQUNBO0FBREE7Ozs7QUFDQTtBQUNBO0FBREE7O0FBZUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBOzs7O0FBeENBO0FBQ0E7QUFEQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7O0FBREE7Ozs7QUFPQTtBQUNBO0FBREE7O0FBb0NBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFEQTtBQUlBOzs7Ozs7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkE7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBSUE7QUFKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBT0E7Ozs7QUFoQkE7QUFDQTtBQWtCQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFQQTtBQVdBOzs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFMQTtBQUNBO0FBVUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBUEE7QUFXQTs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBZEE7QUFDQTtBQWtCQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFsQkE7QUF5QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBS0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFSQTtBQUZBO0FBQ0E7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBT0E7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBTkE7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBbEJBO0FBc0JBOzs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBRkE7QUFIQTtBQUNBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFKQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQVFBOzs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVkE7QUFDQTtBQWlCQTs7Ozs7OztBQzFCQTs7Ozs7Ozs7O0FBU0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUdBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBbkJBO0FBM0JBOzs7Ozs7OztBQ2pCQTtBQUFBO0FBRUE7Ozs7Ozs7Ozs7OztBQ0ZBOzs7Ozs7Ozs7QUFlQTs7Ozs7O0FBTUE7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQUE7QUFQQTtBQVdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBT0E7QUFIQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFjQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdERBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUdBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFXQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7Ozs7Ozs7O0FDcENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0xBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBOzs7QUEwQkE7QUFDQTs7O0FBbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBSkE7QUFHQTtBQUhBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVlBO0FBWkE7QUFBQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFIQTtBQUNBO0FBZEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQXlCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDakNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFNQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7QUNEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBTEE7QUFBQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBR0E7QUFHQTtBQUdBO0FBVkE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7QUExR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFDQTtBQThHQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFNQTtBQUFBOzs7Ozs7OztBQ3BJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVJBO0FBSEE7QUFDQTtBQW1CQTtBQUFBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUdBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTs7Ozs7QUFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNiQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWEE7QUFhQTtBQUVBOzs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUxBO0FBUUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQVBBO0FBU0E7Ozs7Ozs7O0FDWkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7Ozs7Ozs7O0FDTEE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFEQTs7Ozs7Ozs7Ozs7Ozs7O0FDQ0E7QUFDQTtBQUxBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNKQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBWEE7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTs7OztBQTdCQTtBQUNBO0FBREE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFEQTs7QUFEQTs7OztBQVNBO0FBQ0E7QUFEQTs7QUF1QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUlBO0FBQ0E7QUFDQTs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7OztBQVdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQTVDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7Ozs7QUF2SEE7QUFDQTtBQURBOzs7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7O0FBeUhBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pKQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQVlBOzs7Ozs7Ozs7O0FDekJBOzs7Ozs7Ozs7QUFTQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQU1BO0FBMUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQ0E7QUExQ0E7QUFBQTtBQUNBO0FBREE7QUE0Q0E7QUFFQTtBQUNBO0FBQ0E7QUFoREE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFzREE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFkQTtBQXFCQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUF6QkE7QUFBQTtBQUNBO0FBREE7QUFtQ0E7QUFDQTtBQXBDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBcUNBO0FBdENBO0FBQ0E7QUFEQTtBQTBDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBM0RBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQTZEQTtBQUNBO0FBOURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQWtFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFGQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVBBO0FBREE7QUFBQTtBQUNBO0FBREE7QUFVQTtBQUNBO0FBWEE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFWQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFmQTtBQUFBO0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=