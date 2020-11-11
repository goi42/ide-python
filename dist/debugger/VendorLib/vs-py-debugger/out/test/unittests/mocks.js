"use strict";

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = require("events");

const inversify_1 = require("inversify");

const async_1 = require("../../client/common/utils/async");

const constants_1 = require("../../client/unittests/common/constants");

const baseTestManager_1 = require("../../client/unittests/common/managers/baseTestManager");

let MockDebugLauncher = class MockDebugLauncher {
  constructor() {
    this._launched = async_1.createDeferred();
  }

  get launched() {
    return this._launched.promise;
  }

  get debuggerPromise() {
    // tslint:disable-next-line:no-non-null-assertion
    return this._promise;
  }

  get cancellationToken() {
    if (this._token === undefined) {
      throw Error('debugger not launched');
    }

    return this._token;
  }

  getLaunchOptions(resource) {
    return __awaiter(this, void 0, void 0, function* () {
      return {
        port: 0,
        host: 'localhost'
      };
    });
  }

  launchDebugger(options) {
    return __awaiter(this, void 0, void 0, function* () {
      this._launched.resolve(true); // tslint:disable-next-line:no-non-null-assertion


      this._token = options.token;
      this._promise = async_1.createDeferred(); // tslint:disable-next-line:no-non-null-assertion

      options.token.onCancellationRequested(() => {
        if (this._promise) {
          this._promise.reject('Mock-User Cancelled');
        }
      });
      return this._promise.promise;
    });
  }

  dispose() {
    this._promise = undefined;
  }

};
MockDebugLauncher = __decorate([inversify_1.injectable()], MockDebugLauncher);
exports.MockDebugLauncher = MockDebugLauncher;
let MockTestManagerWithRunningTests = class MockTestManagerWithRunningTests extends baseTestManager_1.BaseTestManager {
  constructor(testProvider, product, workspaceFolder, rootDirectory, serviceContainer) {
    super(testProvider, product, workspaceFolder, rootDirectory, serviceContainer); // tslint:disable-next-line:no-any

    this.runnerDeferred = async_1.createDeferred();
    this.enabled = true; // tslint:disable-next-line:no-any

    this.discoveryDeferred = async_1.createDeferred();
  }

  getDiscoveryOptions(ignoreCache) {
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {};
  } // tslint:disable-next-line:no-any


  runTestImpl(tests, testsToRun, runFailedTests, debug) {
    return __awaiter(this, void 0, void 0, function* () {
      // tslint:disable-next-line:no-non-null-assertion
      this.testRunnerCancellationToken.onCancellationRequested(() => {
        this.runnerDeferred.reject(constants_1.CANCELLATION_REASON);
      });
      return this.runnerDeferred.promise;
    });
  }

  discoverTestsImpl(ignoreCache, debug) {
    return __awaiter(this, void 0, void 0, function* () {
      // tslint:disable-next-line:no-non-null-assertion
      this.testDiscoveryCancellationToken.onCancellationRequested(() => {
        this.discoveryDeferred.reject(constants_1.CANCELLATION_REASON);
      });
      return this.discoveryDeferred.promise;
    });
  }

};
MockTestManagerWithRunningTests = __decorate([inversify_1.injectable()], MockTestManagerWithRunningTests);
exports.MockTestManagerWithRunningTests = MockTestManagerWithRunningTests;
let MockDiscoveryService = class MockDiscoveryService {
  constructor(discoverPromise) {
    this.discoverPromise = discoverPromise;
  }

  discoverTests(options) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.discoverPromise;
    });
  }

};
MockDiscoveryService = __decorate([inversify_1.injectable()], MockDiscoveryService);
exports.MockDiscoveryService = MockDiscoveryService; // tslint:disable-next-line:max-classes-per-file

let MockUnitTestSocketServer = class MockUnitTestSocketServer extends events_1.EventEmitter {
  // tslint:disable-next-line:max-classes-per-file
  constructor() {
    super(...arguments);
    this.results = [];
  }

  reset() {
    this.removeAllListeners();
  }

  addResults(results) {
    this.results.push(...results);
  }

  start(options = {
    port: 0,
    host: 'localhost'
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      this.results.forEach(result => {
        this.emit('result', result);
      });
      this.results = [];
      return typeof options.port === 'number' ? options.port : 0;
    });
  } // tslint:disable-next-line:no-empty


  stop() {} // tslint:disable-next-line:no-empty


  dispose() {}

};
MockUnitTestSocketServer = __decorate([inversify_1.injectable()], MockUnitTestSocketServer);
exports.MockUnitTestSocketServer = MockUnitTestSocketServer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2tzLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJleHBvcnRzIiwiZXZlbnRzXzEiLCJyZXF1aXJlIiwiaW52ZXJzaWZ5XzEiLCJhc3luY18xIiwiY29uc3RhbnRzXzEiLCJiYXNlVGVzdE1hbmFnZXJfMSIsIk1vY2tEZWJ1Z0xhdW5jaGVyIiwiY29uc3RydWN0b3IiLCJfbGF1bmNoZWQiLCJjcmVhdGVEZWZlcnJlZCIsImxhdW5jaGVkIiwicHJvbWlzZSIsImRlYnVnZ2VyUHJvbWlzZSIsIl9wcm9taXNlIiwiY2FuY2VsbGF0aW9uVG9rZW4iLCJfdG9rZW4iLCJ1bmRlZmluZWQiLCJFcnJvciIsImdldExhdW5jaE9wdGlvbnMiLCJyZXNvdXJjZSIsInBvcnQiLCJob3N0IiwibGF1bmNoRGVidWdnZXIiLCJvcHRpb25zIiwidG9rZW4iLCJvbkNhbmNlbGxhdGlvblJlcXVlc3RlZCIsImRpc3Bvc2UiLCJpbmplY3RhYmxlIiwiTW9ja1Rlc3RNYW5hZ2VyV2l0aFJ1bm5pbmdUZXN0cyIsIkJhc2VUZXN0TWFuYWdlciIsInRlc3RQcm92aWRlciIsInByb2R1Y3QiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJyb290RGlyZWN0b3J5Iiwic2VydmljZUNvbnRhaW5lciIsInJ1bm5lckRlZmVycmVkIiwiZW5hYmxlZCIsImRpc2NvdmVyeURlZmVycmVkIiwiZ2V0RGlzY292ZXJ5T3B0aW9ucyIsImlnbm9yZUNhY2hlIiwicnVuVGVzdEltcGwiLCJ0ZXN0cyIsInRlc3RzVG9SdW4iLCJydW5GYWlsZWRUZXN0cyIsImRlYnVnIiwidGVzdFJ1bm5lckNhbmNlbGxhdGlvblRva2VuIiwiQ0FOQ0VMTEFUSU9OX1JFQVNPTiIsImRpc2NvdmVyVGVzdHNJbXBsIiwidGVzdERpc2NvdmVyeUNhbmNlbGxhdGlvblRva2VuIiwiTW9ja0Rpc2NvdmVyeVNlcnZpY2UiLCJkaXNjb3ZlclByb21pc2UiLCJkaXNjb3ZlclRlc3RzIiwiTW9ja1VuaXRUZXN0U29ja2V0U2VydmVyIiwiRXZlbnRFbWl0dGVyIiwicmVzdWx0cyIsInJlc2V0IiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiYWRkUmVzdWx0cyIsInB1c2giLCJzdGFydCIsImZvckVhY2giLCJlbWl0Iiwic3RvcCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxNQUEySE8sQ0FBM0g7QUFDQSxNQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0IsT0FBT0EsT0FBTyxDQUFDQyxRQUFmLEtBQTRCLFVBQS9ELEVBQTJFTCxDQUFDLEdBQUdJLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQlosVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDQyxHQUFyQyxFQUEwQ0MsSUFBMUMsQ0FB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RUFFbEN5Qix3QkFGa0MsQ0FBckM7QUFHQXJELE9BQU8sQ0FBQ3FELHdCQUFSLEdBQW1DQSx3QkFBbkMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvY29tbW9uL3V0aWxzL2FzeW5jXCIpO1xyXG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvdW5pdHRlc3RzL2NvbW1vbi9jb25zdGFudHNcIik7XHJcbmNvbnN0IGJhc2VUZXN0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4uLy4uL2NsaWVudC91bml0dGVzdHMvY29tbW9uL21hbmFnZXJzL2Jhc2VUZXN0TWFuYWdlclwiKTtcclxubGV0IE1vY2tEZWJ1Z0xhdW5jaGVyID0gY2xhc3MgTW9ja0RlYnVnTGF1bmNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF1bmNoZWQgPSBhc3luY18xLmNyZWF0ZURlZmVycmVkKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgbGF1bmNoZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdW5jaGVkLnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVidWdnZXJQcm9taXNlKCkge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGdldCBjYW5jZWxsYXRpb25Ub2tlbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fdG9rZW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignZGVidWdnZXIgbm90IGxhdW5jaGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlbjtcclxuICAgIH1cclxuICAgIGdldExhdW5jaE9wdGlvbnMocmVzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBwb3J0OiAwLCBob3N0OiAnbG9jYWxob3N0JyB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGF1bmNoRGVidWdnZXIob3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhdW5jaGVkLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgICAgdGhpcy5fdG9rZW4gPSBvcHRpb25zLnRva2VuO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gYXN5bmNfMS5jcmVhdGVEZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIG9wdGlvbnMudG9rZW4ub25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb21pc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlLnJlamVjdCgnTW9jay1Vc2VyIENhbmNlbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UucHJvbWlzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxufTtcclxuTW9ja0RlYnVnTGF1bmNoZXIgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKVxyXG5dLCBNb2NrRGVidWdMYXVuY2hlcik7XHJcbmV4cG9ydHMuTW9ja0RlYnVnTGF1bmNoZXIgPSBNb2NrRGVidWdMYXVuY2hlcjtcclxubGV0IE1vY2tUZXN0TWFuYWdlcldpdGhSdW5uaW5nVGVzdHMgPSBjbGFzcyBNb2NrVGVzdE1hbmFnZXJXaXRoUnVubmluZ1Rlc3RzIGV4dGVuZHMgYmFzZVRlc3RNYW5hZ2VyXzEuQmFzZVRlc3RNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHRlc3RQcm92aWRlciwgcHJvZHVjdCwgd29ya3NwYWNlRm9sZGVyLCByb290RGlyZWN0b3J5LCBzZXJ2aWNlQ29udGFpbmVyKSB7XHJcbiAgICAgICAgc3VwZXIodGVzdFByb3ZpZGVyLCBwcm9kdWN0LCB3b3Jrc3BhY2VGb2xkZXIsIHJvb3REaXJlY3RvcnksIHNlcnZpY2VDb250YWluZXIpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcclxuICAgICAgICB0aGlzLnJ1bm5lckRlZmVycmVkID0gYXN5bmNfMS5jcmVhdGVEZWZlcnJlZCgpO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgICAgIHRoaXMuZGlzY292ZXJ5RGVmZXJyZWQgPSBhc3luY18xLmNyZWF0ZURlZmVycmVkKCk7XHJcbiAgICB9XHJcbiAgICBnZXREaXNjb3ZlcnlPcHRpb25zKGlnbm9yZUNhY2hlKSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW9iamVjdC1saXRlcmFsLXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgcnVuVGVzdEltcGwodGVzdHMsIHRlc3RzVG9SdW4sIHJ1bkZhaWxlZFRlc3RzLCBkZWJ1Zykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgICAgdGhpcy50ZXN0UnVubmVyQ2FuY2VsbGF0aW9uVG9rZW4ub25DYW5jZWxsYXRpb25SZXF1ZXN0ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uZXJEZWZlcnJlZC5yZWplY3QoY29uc3RhbnRzXzEuQ0FOQ0VMTEFUSU9OX1JFQVNPTik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5uZXJEZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGlzY292ZXJUZXN0c0ltcGwoaWdub3JlQ2FjaGUsIGRlYnVnKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgICB0aGlzLnRlc3REaXNjb3ZlcnlDYW5jZWxsYXRpb25Ub2tlbi5vbkNhbmNlbGxhdGlvblJlcXVlc3RlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2NvdmVyeURlZmVycmVkLnJlamVjdChjb25zdGFudHNfMS5DQU5DRUxMQVRJT05fUkVBU09OKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyeURlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbk1vY2tUZXN0TWFuYWdlcldpdGhSdW5uaW5nVGVzdHMgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKVxyXG5dLCBNb2NrVGVzdE1hbmFnZXJXaXRoUnVubmluZ1Rlc3RzKTtcclxuZXhwb3J0cy5Nb2NrVGVzdE1hbmFnZXJXaXRoUnVubmluZ1Rlc3RzID0gTW9ja1Rlc3RNYW5hZ2VyV2l0aFJ1bm5pbmdUZXN0cztcclxubGV0IE1vY2tEaXNjb3ZlcnlTZXJ2aWNlID0gY2xhc3MgTW9ja0Rpc2NvdmVyeVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoZGlzY292ZXJQcm9taXNlKSB7XHJcbiAgICAgICAgdGhpcy5kaXNjb3ZlclByb21pc2UgPSBkaXNjb3ZlclByb21pc2U7XHJcbiAgICB9XHJcbiAgICBkaXNjb3ZlclRlc3RzKG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNjb3ZlclByb21pc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbk1vY2tEaXNjb3ZlcnlTZXJ2aWNlID0gX19kZWNvcmF0ZShbXHJcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKClcclxuXSwgTW9ja0Rpc2NvdmVyeVNlcnZpY2UpO1xyXG5leHBvcnRzLk1vY2tEaXNjb3ZlcnlTZXJ2aWNlID0gTW9ja0Rpc2NvdmVyeVNlcnZpY2U7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxyXG5sZXQgTW9ja1VuaXRUZXN0U29ja2V0U2VydmVyID0gY2xhc3MgTW9ja1VuaXRUZXN0U29ja2V0U2VydmVyIGV4dGVuZHMgZXZlbnRzXzEuRXZlbnRFbWl0dGVyIHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcclxuICAgICAgICB0aGlzLnJlc3VsdHMgPSBbXTtcclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgICBhZGRSZXN1bHRzKHJlc3VsdHMpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdHMucHVzaCguLi5yZXN1bHRzKTtcclxuICAgIH1cclxuICAgIHN0YXJ0KG9wdGlvbnMgPSB7IHBvcnQ6IDAsIGhvc3Q6ICdsb2NhbGhvc3QnIH0pIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdyZXN1bHQnLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb3B0aW9ucy5wb3J0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMucG9ydCA6IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgIHN0b3AoKSB7IH1cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxyXG4gICAgZGlzcG9zZSgpIHsgfVxyXG59O1xyXG5Nb2NrVW5pdFRlc3RTb2NrZXRTZXJ2ZXIgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKVxyXG5dLCBNb2NrVW5pdFRlc3RTb2NrZXRTZXJ2ZXIpO1xyXG5leHBvcnRzLk1vY2tVbml0VGVzdFNvY2tldFNlcnZlciA9IE1vY2tVbml0VGVzdFNvY2tldFNlcnZlcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9ja3MuanMubWFwIl19