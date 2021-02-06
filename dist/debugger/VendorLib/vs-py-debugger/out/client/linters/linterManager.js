// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

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

const types_1 = require("../common/application/types");

const types_2 = require("../common/types");

const types_3 = require("../ioc/types");

const bandit_1 = require("./bandit");

const flake8_1 = require("./flake8");

const linterInfo_1 = require("./linterInfo");

const mypy_1 = require("./mypy");

const pep8_1 = require("./pep8");

const prospector_1 = require("./prospector");

const pydocstyle_1 = require("./pydocstyle");

const pylama_1 = require("./pylama");

const pylint_1 = require("./pylint");

const types_4 = require("./types");

class DisabledLinter {
  constructor(configService) {
    this.configService = configService;
  }

  get info() {
    return new linterInfo_1.LinterInfo(types_2.Product.pylint, 'pylint', this.configService);
  }

  lint(document, cancellation) {
    return __awaiter(this, void 0, void 0, function* () {
      return [];
    });
  }

}

let LinterManager = class LinterManager {
  constructor(serviceContainer, workspaceService) {
    this.serviceContainer = serviceContainer;
    this.workspaceService = workspaceService;
    this.checkedForInstalledLinters = new Set();
    this.configService = serviceContainer.get(types_2.IConfigurationService);
    this.linters = [new linterInfo_1.LinterInfo(types_2.Product.bandit, 'bandit', this.configService), new linterInfo_1.LinterInfo(types_2.Product.flake8, 'flake8', this.configService), new linterInfo_1.PylintLinterInfo(this.configService, this.workspaceService, ['.pylintrc', 'pylintrc']), new linterInfo_1.LinterInfo(types_2.Product.mypy, 'mypy', this.configService), new linterInfo_1.LinterInfo(types_2.Product.pep8, 'pep8', this.configService), new linterInfo_1.LinterInfo(types_2.Product.prospector, 'prospector', this.configService), new linterInfo_1.LinterInfo(types_2.Product.pydocstyle, 'pydocstyle', this.configService), new linterInfo_1.LinterInfo(types_2.Product.pylama, 'pylama', this.configService)];
  }

  getAllLinterInfos() {
    return this.linters;
  }

  getLinterInfo(product) {
    const x = this.linters.findIndex((value, index, obj) => value.product === product);

    if (x >= 0) {
      return this.linters[x];
    }

    throw new Error('Invalid linter');
  }

  isLintingEnabled(silent, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const settings = this.configService.getSettings(resource);
      const activeLintersPresent = yield this.getActiveLinters(silent, resource);
      return settings.linting.enabled && activeLintersPresent.length > 0;
    });
  }

  enableLintingAsync(enable, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.configService.updateSetting('linting.enabled', enable, resource);
    });
  }

  getActiveLinters(silent, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!silent) {
        yield this.enableUnconfiguredLinters(resource);
      }

      return this.linters.filter(x => x.isEnabled(resource));
    });
  }

  setActiveLintersAsync(products, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      // ensure we only allow valid linters to be set, otherwise leave things alone.
      // filter out any invalid products:
      const validProducts = products.filter(product => {
        const foundIndex = this.linters.findIndex(validLinter => validLinter.product === product);
        return foundIndex !== -1;
      }); // if we have valid linter product(s), enable only those

      if (validProducts.length > 0) {
        const active = yield this.getActiveLinters(true, resource);

        for (const x of active) {
          yield x.enableAsync(false, resource);
        }

        if (products.length > 0) {
          const toActivate = this.linters.filter(x => products.findIndex(p => x.product === p) >= 0);

          for (const x of toActivate) {
            yield x.enableAsync(true, resource);
          }

          yield this.enableLintingAsync(true, resource);
        }
      }
    });
  }

  createLinter(product, outputChannel, serviceContainer, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!(yield this.isLintingEnabled(true, resource))) {
        return new DisabledLinter(this.configService);
      }

      const error = 'Linter manager: Unknown linter';

      switch (product) {
        case types_2.Product.bandit:
          return new bandit_1.Bandit(outputChannel, serviceContainer);

        case types_2.Product.flake8:
          return new flake8_1.Flake8(outputChannel, serviceContainer);

        case types_2.Product.pylint:
          return new pylint_1.Pylint(outputChannel, serviceContainer);

        case types_2.Product.mypy:
          return new mypy_1.MyPy(outputChannel, serviceContainer);

        case types_2.Product.prospector:
          return new prospector_1.Prospector(outputChannel, serviceContainer);

        case types_2.Product.pylama:
          return new pylama_1.PyLama(outputChannel, serviceContainer);

        case types_2.Product.pydocstyle:
          return new pydocstyle_1.PyDocStyle(outputChannel, serviceContainer);

        case types_2.Product.pep8:
          return new pep8_1.Pep8(outputChannel, serviceContainer);

        default:
          serviceContainer.get(types_2.ILogger).logError(error);
          break;
      }

      throw new Error(error);
    });
  }

  enableUnconfiguredLinters(resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const settings = this.configService.getSettings(resource);

      if (!settings.linting.pylintEnabled || !settings.linting.enabled) {
        return;
      } // If we've already checked during this session for the same workspace and Python path, then don't bother again.


      const workspaceKey = `${this.workspaceService.getWorkspaceFolderIdentifier(resource)}${settings.pythonPath}`;

      if (this.checkedForInstalledLinters.has(workspaceKey)) {
        return;
      }

      this.checkedForInstalledLinters.add(workspaceKey); // only check & ask the user if they'd like to enable pylint

      const pylintInfo = this.linters.find(linter => linter.id === 'pylint');
      const activator = this.serviceContainer.get(types_4.IAvailableLinterActivator);
      yield activator.promptIfLinterAvailable(pylintInfo, resource);
    });
  }

};
LinterManager = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_3.IServiceContainer)), __param(1, inversify_1.inject(types_1.IWorkspaceService))], LinterManager);
exports.LinterManager = LinterManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbnRlck1hbmFnZXIuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInR5cGVzXzEiLCJ0eXBlc18yIiwidHlwZXNfMyIsImJhbmRpdF8xIiwiZmxha2U4XzEiLCJsaW50ZXJJbmZvXzEiLCJteXB5XzEiLCJwZXA4XzEiLCJwcm9zcGVjdG9yXzEiLCJweWRvY3N0eWxlXzEiLCJweWxhbWFfMSIsInB5bGludF8xIiwidHlwZXNfNCIsIkRpc2FibGVkTGludGVyIiwiY29uc3RydWN0b3IiLCJjb25maWdTZXJ2aWNlIiwiaW5mbyIsIkxpbnRlckluZm8iLCJQcm9kdWN0IiwicHlsaW50IiwibGludCIsImRvY3VtZW50IiwiY2FuY2VsbGF0aW9uIiwiTGludGVyTWFuYWdlciIsInNlcnZpY2VDb250YWluZXIiLCJ3b3Jrc3BhY2VTZXJ2aWNlIiwiY2hlY2tlZEZvckluc3RhbGxlZExpbnRlcnMiLCJTZXQiLCJnZXQiLCJJQ29uZmlndXJhdGlvblNlcnZpY2UiLCJsaW50ZXJzIiwiYmFuZGl0IiwiZmxha2U4IiwiUHlsaW50TGludGVySW5mbyIsIm15cHkiLCJwZXA4IiwicHJvc3BlY3RvciIsInB5ZG9jc3R5bGUiLCJweWxhbWEiLCJnZXRBbGxMaW50ZXJJbmZvcyIsImdldExpbnRlckluZm8iLCJwcm9kdWN0IiwieCIsImZpbmRJbmRleCIsImluZGV4Iiwib2JqIiwiRXJyb3IiLCJpc0xpbnRpbmdFbmFibGVkIiwic2lsZW50IiwicmVzb3VyY2UiLCJzZXR0aW5ncyIsImdldFNldHRpbmdzIiwiYWN0aXZlTGludGVyc1ByZXNlbnQiLCJnZXRBY3RpdmVMaW50ZXJzIiwibGludGluZyIsImVuYWJsZWQiLCJlbmFibGVMaW50aW5nQXN5bmMiLCJlbmFibGUiLCJ1cGRhdGVTZXR0aW5nIiwiZW5hYmxlVW5jb25maWd1cmVkTGludGVycyIsImZpbHRlciIsImlzRW5hYmxlZCIsInNldEFjdGl2ZUxpbnRlcnNBc3luYyIsInByb2R1Y3RzIiwidmFsaWRQcm9kdWN0cyIsImZvdW5kSW5kZXgiLCJ2YWxpZExpbnRlciIsImFjdGl2ZSIsImVuYWJsZUFzeW5jIiwidG9BY3RpdmF0ZSIsInAiLCJjcmVhdGVMaW50ZXIiLCJvdXRwdXRDaGFubmVsIiwiZXJyb3IiLCJCYW5kaXQiLCJGbGFrZTgiLCJQeWxpbnQiLCJNeVB5IiwiUHJvc3BlY3RvciIsIlB5TGFtYSIsIlB5RG9jU3R5bGUiLCJQZXA4IiwiSUxvZ2dlciIsImxvZ0Vycm9yIiwicHlsaW50RW5hYmxlZCIsIndvcmtzcGFjZUtleSIsImdldFdvcmtzcGFjZUZvbGRlcklkZW50aWZpZXIiLCJweXRob25QYXRoIiwiaGFzIiwiYWRkIiwicHlsaW50SW5mbyIsImZpbmQiLCJsaW50ZXIiLCJpZCIsImFjdGl2YXRvciIsIklBdmFpbGFibGVMaW50ZXJBY3RpdmF0b3IiLCJwcm9tcHRJZkxpbnRlckF2YWlsYWJsZSIsImluamVjdGFibGUiLCJpbmplY3QiLCJJU2VydmljZUNvbnRhaW5lciIsIklXb3Jrc3BhY2VTZXJ2aWNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2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LE9BSitDLENBS2hEOzs7QUFDQSxZQUFNOEIsWUFBWSxHQUFJLEdBQUUsS0FBSzVELGdCQUFMLENBQXNCNkQsNEJBQXRCLENBQW1EckMsUUFBbkQsQ0FBNkQsR0FBRUMsUUFBUSxDQUFDcUMsVUFBVyxFQUEzRzs7QUFDQSxVQUFJLEtBQUs3RCwwQkFBTCxDQUFnQzhELEdBQWhDLENBQW9DSCxZQUFwQyxDQUFKLEVBQXVEO0FBQ25EO0FBQ0g7O0FBQ0QsV0FBSzNELDBCQUFMLENBQWdDK0QsR0FBaEMsQ0FBb0NKLFlBQXBDLEVBVmdELENBV2hEOztBQUNBLFlBQU1LLFVBQVUsR0FBRyxLQUFLNUQsT0FBTCxDQUFhNkQsSUFBYixDQUFrQkMsTUFBTSxJQUFJQSxNQUFNLENBQUNDLEVBQVAsS0FBYyxRQUExQyxDQUFuQjtBQUNBLFlBQU1DLFNBQVMsR0FBRyxLQUFLdEUsZ0JBQUwsQ0FBc0JJLEdBQXRCLENBQTBCaEIsT0FBTyxDQUFDbUYseUJBQWxDLENBQWxCO0FBQ0EsWUFBTUQsU0FBUyxDQUFDRSx1QkFBVixDQUFrQ04sVUFBbEMsRUFBOEN6QyxRQUE5QyxDQUFOO0FBQ0gsS0FmZSxDQUFoQjtBQWdCSDs7QUF0SG1DLENBQXhDO0FBd0hBMUIsYUFBYSxHQUFHL0QsVUFBVSxDQUFDLENBQ3ZCc0MsV0FBVyxDQUFDbUcsVUFBWixFQUR1QixFQUV2QnpILE9BQU8sQ0FBQyxDQUFELEVBQUlzQixXQUFXLENBQUNvRyxNQUFaLENBQW1CaEcsT0FBTyxDQUFDaUcsaUJBQTNCLENBQUosQ0FGZ0IsRUFHdkIzSCxPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDb0csTUFBWixDQUFtQmxHLE9BQU8sQ0FBQ29HLGlCQUEzQixDQUFKLENBSGdCLENBQUQsRUFJdkI3RSxhQUp1QixDQUExQjtBQUtBMUIsT0FBTyxDQUFDMEIsYUFBUixHQUF3QkEsYUFBeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0JztcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbW1vbi9hcHBsaWNhdGlvbi90eXBlc1wiKTtcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vY29tbW9uL3R5cGVzXCIpO1xuY29uc3QgdHlwZXNfMyA9IHJlcXVpcmUoXCIuLi9pb2MvdHlwZXNcIik7XG5jb25zdCBiYW5kaXRfMSA9IHJlcXVpcmUoXCIuL2JhbmRpdFwiKTtcbmNvbnN0IGZsYWtlOF8xID0gcmVxdWlyZShcIi4vZmxha2U4XCIpO1xuY29uc3QgbGludGVySW5mb18xID0gcmVxdWlyZShcIi4vbGludGVySW5mb1wiKTtcbmNvbnN0IG15cHlfMSA9IHJlcXVpcmUoXCIuL215cHlcIik7XG5jb25zdCBwZXA4XzEgPSByZXF1aXJlKFwiLi9wZXA4XCIpO1xuY29uc3QgcHJvc3BlY3Rvcl8xID0gcmVxdWlyZShcIi4vcHJvc3BlY3RvclwiKTtcbmNvbnN0IHB5ZG9jc3R5bGVfMSA9IHJlcXVpcmUoXCIuL3B5ZG9jc3R5bGVcIik7XG5jb25zdCBweWxhbWFfMSA9IHJlcXVpcmUoXCIuL3B5bGFtYVwiKTtcbmNvbnN0IHB5bGludF8xID0gcmVxdWlyZShcIi4vcHlsaW50XCIpO1xuY29uc3QgdHlwZXNfNCA9IHJlcXVpcmUoXCIuL3R5cGVzXCIpO1xuY2xhc3MgRGlzYWJsZWRMaW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ1NlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlID0gY29uZmlnU2VydmljZTtcbiAgICB9XG4gICAgZ2V0IGluZm8oKSB7XG4gICAgICAgIHJldHVybiBuZXcgbGludGVySW5mb18xLkxpbnRlckluZm8odHlwZXNfMi5Qcm9kdWN0LnB5bGludCwgJ3B5bGludCcsIHRoaXMuY29uZmlnU2VydmljZSk7XG4gICAgfVxuICAgIGxpbnQoZG9jdW1lbnQsIGNhbmNlbGxhdGlvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5sZXQgTGludGVyTWFuYWdlciA9IGNsYXNzIExpbnRlck1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VDb250YWluZXIsIHdvcmtzcGFjZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ29udGFpbmVyID0gc2VydmljZUNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlID0gd29ya3NwYWNlU2VydmljZTtcbiAgICAgICAgdGhpcy5jaGVja2VkRm9ySW5zdGFsbGVkTGludGVycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5jb25maWdTZXJ2aWNlID0gc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JQ29uZmlndXJhdGlvblNlcnZpY2UpO1xuICAgICAgICB0aGlzLmxpbnRlcnMgPSBbXG4gICAgICAgICAgICBuZXcgbGludGVySW5mb18xLkxpbnRlckluZm8odHlwZXNfMi5Qcm9kdWN0LmJhbmRpdCwgJ2JhbmRpdCcsIHRoaXMuY29uZmlnU2VydmljZSksXG4gICAgICAgICAgICBuZXcgbGludGVySW5mb18xLkxpbnRlckluZm8odHlwZXNfMi5Qcm9kdWN0LmZsYWtlOCwgJ2ZsYWtlOCcsIHRoaXMuY29uZmlnU2VydmljZSksXG4gICAgICAgICAgICBuZXcgbGludGVySW5mb18xLlB5bGludExpbnRlckluZm8odGhpcy5jb25maWdTZXJ2aWNlLCB0aGlzLndvcmtzcGFjZVNlcnZpY2UsIFsnLnB5bGludHJjJywgJ3B5bGludHJjJ10pLFxuICAgICAgICAgICAgbmV3IGxpbnRlckluZm9fMS5MaW50ZXJJbmZvKHR5cGVzXzIuUHJvZHVjdC5teXB5LCAnbXlweScsIHRoaXMuY29uZmlnU2VydmljZSksXG4gICAgICAgICAgICBuZXcgbGludGVySW5mb18xLkxpbnRlckluZm8odHlwZXNfMi5Qcm9kdWN0LnBlcDgsICdwZXA4JywgdGhpcy5jb25maWdTZXJ2aWNlKSxcbiAgICAgICAgICAgIG5ldyBsaW50ZXJJbmZvXzEuTGludGVySW5mbyh0eXBlc18yLlByb2R1Y3QucHJvc3BlY3RvciwgJ3Byb3NwZWN0b3InLCB0aGlzLmNvbmZpZ1NlcnZpY2UpLFxuICAgICAgICAgICAgbmV3IGxpbnRlckluZm9fMS5MaW50ZXJJbmZvKHR5cGVzXzIuUHJvZHVjdC5weWRvY3N0eWxlLCAncHlkb2NzdHlsZScsIHRoaXMuY29uZmlnU2VydmljZSksXG4gICAgICAgICAgICBuZXcgbGludGVySW5mb18xLkxpbnRlckluZm8odHlwZXNfMi5Qcm9kdWN0LnB5bGFtYSwgJ3B5bGFtYScsIHRoaXMuY29uZmlnU2VydmljZSlcbiAgICAgICAgXTtcbiAgICB9XG4gICAgZ2V0QWxsTGludGVySW5mb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpbnRlcnM7XG4gICAgfVxuICAgIGdldExpbnRlckluZm8ocHJvZHVjdCkge1xuICAgICAgICBjb25zdCB4ID0gdGhpcy5saW50ZXJzLmZpbmRJbmRleCgodmFsdWUsIGluZGV4LCBvYmopID0+IHZhbHVlLnByb2R1Y3QgPT09IHByb2R1Y3QpO1xuICAgICAgICBpZiAoeCA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saW50ZXJzW3hdO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsaW50ZXInKTtcbiAgICB9XG4gICAgaXNMaW50aW5nRW5hYmxlZChzaWxlbnQsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuY29uZmlnU2VydmljZS5nZXRTZXR0aW5ncyhyZXNvdXJjZSk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVMaW50ZXJzUHJlc2VudCA9IHlpZWxkIHRoaXMuZ2V0QWN0aXZlTGludGVycyhzaWxlbnQsIHJlc291cmNlKTtcbiAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncy5saW50aW5nLmVuYWJsZWQgJiYgYWN0aXZlTGludGVyc1ByZXNlbnQubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVuYWJsZUxpbnRpbmdBc3luYyhlbmFibGUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCB0aGlzLmNvbmZpZ1NlcnZpY2UudXBkYXRlU2V0dGluZygnbGludGluZy5lbmFibGVkJywgZW5hYmxlLCByZXNvdXJjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRBY3RpdmVMaW50ZXJzKHNpbGVudCwgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5lbmFibGVVbmNvbmZpZ3VyZWRMaW50ZXJzKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpbnRlcnMuZmlsdGVyKHggPT4geC5pc0VuYWJsZWQocmVzb3VyY2UpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFjdGl2ZUxpbnRlcnNBc3luYyhwcm9kdWN0cywgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIGVuc3VyZSB3ZSBvbmx5IGFsbG93IHZhbGlkIGxpbnRlcnMgdG8gYmUgc2V0LCBvdGhlcndpc2UgbGVhdmUgdGhpbmdzIGFsb25lLlxuICAgICAgICAgICAgLy8gZmlsdGVyIG91dCBhbnkgaW52YWxpZCBwcm9kdWN0czpcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUHJvZHVjdHMgPSBwcm9kdWN0cy5maWx0ZXIocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IHRoaXMubGludGVycy5maW5kSW5kZXgodmFsaWRMaW50ZXIgPT4gdmFsaWRMaW50ZXIucHJvZHVjdCA9PT0gcHJvZHVjdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kSW5kZXggIT09IC0xO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIHZhbGlkIGxpbnRlciBwcm9kdWN0KHMpLCBlbmFibGUgb25seSB0aG9zZVxuICAgICAgICAgICAgaWYgKHZhbGlkUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHlpZWxkIHRoaXMuZ2V0QWN0aXZlTGludGVycyh0cnVlLCByZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB4IG9mIGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCB4LmVuYWJsZUFzeW5jKGZhbHNlLCByZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvQWN0aXZhdGUgPSB0aGlzLmxpbnRlcnMuZmlsdGVyKHggPT4gcHJvZHVjdHMuZmluZEluZGV4KHAgPT4geC5wcm9kdWN0ID09PSBwKSA+PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB4IG9mIHRvQWN0aXZhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHguZW5hYmxlQXN5bmModHJ1ZSwgcmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuZW5hYmxlTGludGluZ0FzeW5jKHRydWUsIHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjcmVhdGVMaW50ZXIocHJvZHVjdCwgb3V0cHV0Q2hhbm5lbCwgc2VydmljZUNvbnRhaW5lciwgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghKHlpZWxkIHRoaXMuaXNMaW50aW5nRW5hYmxlZCh0cnVlLCByZXNvdXJjZSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEaXNhYmxlZExpbnRlcih0aGlzLmNvbmZpZ1NlcnZpY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSAnTGludGVyIG1hbmFnZXI6IFVua25vd24gbGludGVyJztcbiAgICAgICAgICAgIHN3aXRjaCAocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXNfMi5Qcm9kdWN0LmJhbmRpdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBiYW5kaXRfMS5CYW5kaXQob3V0cHV0Q2hhbm5lbCwgc2VydmljZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlc18yLlByb2R1Y3QuZmxha2U4OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGZsYWtlOF8xLkZsYWtlOChvdXRwdXRDaGFubmVsLCBzZXJ2aWNlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzXzIuUHJvZHVjdC5weWxpbnQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgcHlsaW50XzEuUHlsaW50KG91dHB1dENoYW5uZWwsIHNlcnZpY2VDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXNfMi5Qcm9kdWN0Lm15cHk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbXlweV8xLk15UHkob3V0cHV0Q2hhbm5lbCwgc2VydmljZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlc18yLlByb2R1Y3QucHJvc3BlY3RvcjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBwcm9zcGVjdG9yXzEuUHJvc3BlY3RvcihvdXRwdXRDaGFubmVsLCBzZXJ2aWNlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzXzIuUHJvZHVjdC5weWxhbWE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgcHlsYW1hXzEuUHlMYW1hKG91dHB1dENoYW5uZWwsIHNlcnZpY2VDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXNfMi5Qcm9kdWN0LnB5ZG9jc3R5bGU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgcHlkb2NzdHlsZV8xLlB5RG9jU3R5bGUob3V0cHV0Q2hhbm5lbCwgc2VydmljZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlc18yLlByb2R1Y3QucGVwODpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBwZXA4XzEuUGVwOChvdXRwdXRDaGFubmVsLCBzZXJ2aWNlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklMb2dnZXIpLmxvZ0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZW5hYmxlVW5jb25maWd1cmVkTGludGVycyhyZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0U2V0dGluZ3MocmVzb3VyY2UpO1xuICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5saW50aW5nLnB5bGludEVuYWJsZWQgfHwgIXNldHRpbmdzLmxpbnRpbmcuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgY2hlY2tlZCBkdXJpbmcgdGhpcyBzZXNzaW9uIGZvciB0aGUgc2FtZSB3b3Jrc3BhY2UgYW5kIFB5dGhvbiBwYXRoLCB0aGVuIGRvbid0IGJvdGhlciBhZ2Fpbi5cbiAgICAgICAgICAgIGNvbnN0IHdvcmtzcGFjZUtleSA9IGAke3RoaXMud29ya3NwYWNlU2VydmljZS5nZXRXb3Jrc3BhY2VGb2xkZXJJZGVudGlmaWVyKHJlc291cmNlKX0ke3NldHRpbmdzLnB5dGhvblBhdGh9YDtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWRGb3JJbnN0YWxsZWRMaW50ZXJzLmhhcyh3b3Jrc3BhY2VLZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGVja2VkRm9ySW5zdGFsbGVkTGludGVycy5hZGQod29ya3NwYWNlS2V5KTtcbiAgICAgICAgICAgIC8vIG9ubHkgY2hlY2sgJiBhc2sgdGhlIHVzZXIgaWYgdGhleSdkIGxpa2UgdG8gZW5hYmxlIHB5bGludFxuICAgICAgICAgICAgY29uc3QgcHlsaW50SW5mbyA9IHRoaXMubGludGVycy5maW5kKGxpbnRlciA9PiBsaW50ZXIuaWQgPT09ICdweWxpbnQnKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2YXRvciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfNC5JQXZhaWxhYmxlTGludGVyQWN0aXZhdG9yKTtcbiAgICAgICAgICAgIHlpZWxkIGFjdGl2YXRvci5wcm9tcHRJZkxpbnRlckF2YWlsYWJsZShweWxpbnRJbmZvLCByZXNvdXJjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5MaW50ZXJNYW5hZ2VyID0gX19kZWNvcmF0ZShbXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzMuSVNlcnZpY2VDb250YWluZXIpKSxcbiAgICBfX3BhcmFtKDEsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklXb3Jrc3BhY2VTZXJ2aWNlKSlcbl0sIExpbnRlck1hbmFnZXIpO1xuZXhwb3J0cy5MaW50ZXJNYW5hZ2VyID0gTGludGVyTWFuYWdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbnRlck1hbmFnZXIuanMubWFwIl19