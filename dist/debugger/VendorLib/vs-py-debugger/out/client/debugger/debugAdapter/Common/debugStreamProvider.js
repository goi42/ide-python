"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
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

const inversify_1 = require("inversify");

const net_1 = require("net");

const constants_1 = require("../../../common/constants");

const types_1 = require("../../../common/types");

const types_2 = require("../../../ioc/types");

let DebugStreamProvider = class DebugStreamProvider {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
  }

  get useDebugSocketStream() {
    return this.getDebugPort() > 0;
  }

  getInputAndOutputStreams() {
    return __awaiter(this, void 0, void 0, function* () {
      const debugPort = this.getDebugPort();
      let debugSocket;

      if (debugPort > 0) {
        // This section is what allows VS Code extension developers to attach to the current debugger.
        // Used in scenarios where extension developers would like to debug the debugger.
        debugSocket = new Promise(resolve => {
          // start as a server, and print to console in VS Code debugger for extension developer.
          // Do not print this out when running unit tests.
          if (!constants_1.isTestExecution()) {
            console.error(`waiting for debug protocol on port ${debugPort}`);
          }

          net_1.createServer(socket => {
            if (!constants_1.isTestExecution()) {
              console.error('>> accepted connection from client');
            }

            resolve(socket);
          }).listen(debugPort);
        });
      }

      const currentProcess = this.serviceContainer.get(types_1.ICurrentProcess);
      const input = debugSocket ? yield debugSocket : currentProcess.stdin;
      const output = debugSocket ? yield debugSocket : currentProcess.stdout;
      return {
        input,
        output
      };
    });
  }

  getDebugPort() {
    const currentProcess = this.serviceContainer.get(types_1.ICurrentProcess);
    let debugPort = 0;
    const args = currentProcess.argv.slice(2);
    args.forEach((val, index, array) => {
      const portMatch = /^--server=(\d{4,5})$/.exec(val);

      if (portMatch) {
        debugPort = parseInt(portMatch[1], 10);
      }
    });
    return debugPort;
  }

};
DebugStreamProvider = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_2.IServiceContainer))], DebugStreamProvider);
exports.DebugStreamProvider = DebugStreamProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlYnVnU3RyZWFtUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsIm5ldF8xIiwiY29uc3RhbnRzXzEiLCJ0eXBlc18xIiwidHlwZXNfMiIsIkRlYnVnU3RyZWFtUHJvdmlkZXIiLCJjb25zdHJ1Y3RvciIsInNlcnZpY2VDb250YWluZXIiLCJ1c2VEZWJ1Z1NvY2tldFN0cmVhbSIsImdldERlYnVnUG9ydCIsImdldElucHV0QW5kT3V0cHV0U3RyZWFtcyIsImRlYnVnUG9ydCIsImRlYnVnU29ja2V0IiwiaXNUZXN0RXhlY3V0aW9uIiwiY29uc29sZSIsImVycm9yIiwiY3JlYXRlU2VydmVyIiwic29ja2V0IiwibGlzdGVuIiwiY3VycmVudFByb2Nlc3MiLCJnZXQiLCJJQ3VycmVudFByb2Nlc3MiLCJpbnB1dCIsInN0ZGluIiwib3V0cHV0Iiwic3Rkb3V0IiwiYXJncyIsImFyZ3YiLCJzbGljZSIsImZvckVhY2giLCJ2YWwiLCJpbmRleCIsImFycmF5IiwicG9ydE1hdGNoIiwiZXhlYyIsInBhcnNlSW50IiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklTZXJ2aWNlQ29udGFp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QjtBQUNBLFVBQU1lLElBQUksR0FBR1AsY0FBYyxDQUFDUSxJQUFmLENBQW9CQyxLQUFwQixDQUEwQixDQUExQixDQUFiO0FBQ0FGLElBQUFBLElBQUksQ0FBQ0csT0FBTCxDQUFhLENBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFhQyxLQUFiLEtBQXVCO0FBQ2hDLFlBQU1DLFNBQVMsR0FBRyx1QkFBdUJDLElBQXZCLENBQTRCSixHQUE1QixDQUFsQjs7QUFDQSxVQUFJRyxTQUFKLEVBQWU7QUFDWHRCLFFBQUFBLFNBQVMsR0FBR3dCLFFBQVEsQ0FBQ0YsU0FBUyxDQUFDLENBQUQsQ0FBVixFQUFlLEVBQWYsQ0FBcEI7QUFDSDtBQUNKLEtBTEQ7QUFNQSxXQUFPdEIsU0FBUDtBQUNIOztBQTdDK0MsQ0FBcEQ7QUErQ0FOLG1CQUFtQixHQUFHNUMsVUFBVSxDQUFDLENBQzdCc0MsV0FBVyxDQUFDcUMsVUFBWixFQUQ2QixFQUU3QjNELE9BQU8sQ0FBQyxDQUFELEVBQUlzQixXQUFXLENBQUNzQyxNQUFaLENBQW1CakMsT0FBTyxDQUFDa0MsaUJBQTNCLENBQUosQ0FGc0IsQ0FBRCxFQUc3QmpDLG1CQUg2QixDQUFoQztBQUlBUCxPQUFPLENBQUNPLG1CQUFSLEdBQThCQSxtQkFBOUIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IG5ldF8xID0gcmVxdWlyZShcIm5ldFwiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi9jb25zdGFudHNcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi90eXBlc1wiKTtcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vLi4vaW9jL3R5cGVzXCIpO1xubGV0IERlYnVnU3RyZWFtUHJvdmlkZXIgPSBjbGFzcyBEZWJ1Z1N0cmVhbVByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRhaW5lciA9IHNlcnZpY2VDb250YWluZXI7XG4gICAgfVxuICAgIGdldCB1c2VEZWJ1Z1NvY2tldFN0cmVhbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVidWdQb3J0KCkgPiAwO1xuICAgIH1cbiAgICBnZXRJbnB1dEFuZE91dHB1dFN0cmVhbXMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBkZWJ1Z1BvcnQgPSB0aGlzLmdldERlYnVnUG9ydCgpO1xuICAgICAgICAgICAgbGV0IGRlYnVnU29ja2V0O1xuICAgICAgICAgICAgaWYgKGRlYnVnUG9ydCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHNlY3Rpb24gaXMgd2hhdCBhbGxvd3MgVlMgQ29kZSBleHRlbnNpb24gZGV2ZWxvcGVycyB0byBhdHRhY2ggdG8gdGhlIGN1cnJlbnQgZGVidWdnZXIuXG4gICAgICAgICAgICAgICAgLy8gVXNlZCBpbiBzY2VuYXJpb3Mgd2hlcmUgZXh0ZW5zaW9uIGRldmVsb3BlcnMgd291bGQgbGlrZSB0byBkZWJ1ZyB0aGUgZGVidWdnZXIuXG4gICAgICAgICAgICAgICAgZGVidWdTb2NrZXQgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQgYXMgYSBzZXJ2ZXIsIGFuZCBwcmludCB0byBjb25zb2xlIGluIFZTIENvZGUgZGVidWdnZXIgZm9yIGV4dGVuc2lvbiBkZXZlbG9wZXIuXG4gICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCBwcmludCB0aGlzIG91dCB3aGVuIHJ1bm5pbmcgdW5pdCB0ZXN0cy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25zdGFudHNfMS5pc1Rlc3RFeGVjdXRpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgd2FpdGluZyBmb3IgZGVidWcgcHJvdG9jb2wgb24gcG9ydCAke2RlYnVnUG9ydH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXRfMS5jcmVhdGVTZXJ2ZXIoKHNvY2tldCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25zdGFudHNfMS5pc1Rlc3RFeGVjdXRpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJz4+IGFjY2VwdGVkIGNvbm5lY3Rpb24gZnJvbSBjbGllbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc29ja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfSkubGlzdGVuKGRlYnVnUG9ydCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UHJvY2VzcyA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMS5JQ3VycmVudFByb2Nlc3MpO1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkZWJ1Z1NvY2tldCA/IHlpZWxkIGRlYnVnU29ja2V0IDogY3VycmVudFByb2Nlc3Muc3RkaW47XG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSBkZWJ1Z1NvY2tldCA/IHlpZWxkIGRlYnVnU29ja2V0IDogY3VycmVudFByb2Nlc3Muc3Rkb3V0O1xuICAgICAgICAgICAgcmV0dXJuIHsgaW5wdXQsIG91dHB1dCB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0RGVidWdQb3J0KCkge1xuICAgICAgICBjb25zdCBjdXJyZW50UHJvY2VzcyA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMS5JQ3VycmVudFByb2Nlc3MpO1xuICAgICAgICBsZXQgZGVidWdQb3J0ID0gMDtcbiAgICAgICAgY29uc3QgYXJncyA9IGN1cnJlbnRQcm9jZXNzLmFyZ3Yuc2xpY2UoMik7XG4gICAgICAgIGFyZ3MuZm9yRWFjaCgodmFsLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvcnRNYXRjaCA9IC9eLS1zZXJ2ZXI9KFxcZHs0LDV9KSQvLmV4ZWModmFsKTtcbiAgICAgICAgICAgIGlmIChwb3J0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z1BvcnQgPSBwYXJzZUludChwb3J0TWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWJ1Z1BvcnQ7XG4gICAgfVxufTtcbkRlYnVnU3RyZWFtUHJvdmlkZXIgPSBfX2RlY29yYXRlKFtcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMi5JU2VydmljZUNvbnRhaW5lcikpXG5dLCBEZWJ1Z1N0cmVhbVByb3ZpZGVyKTtcbmV4cG9ydHMuRGVidWdTdHJlYW1Qcm92aWRlciA9IERlYnVnU3RyZWFtUHJvdmlkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWJ1Z1N0cmVhbVByb3ZpZGVyLmpzLm1hcCJdfQ==