"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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

const vscode_1 = require("vscode");

const async_1 = require("../common/utils/async");

const stopWatch_1 = require("../common/utils/stopWatch");

const telemetry_1 = require("../telemetry");

const constants_1 = require("../telemetry/constants"); // Draw the line at Language Server analysis 'timing out'
// and becoming a failure-case at 1 minute:


const ANALYSIS_TIMEOUT_MS = 60000;

class ProgressReporting {
  constructor(languageClient) {
    this.languageClient = languageClient;
    this.languageClient.onNotification('python/setStatusBarMessage', m => {
      if (this.statusBarMessage) {
        this.statusBarMessage.dispose();
      }

      this.statusBarMessage = vscode_1.window.setStatusBarMessage(m);
    });
    this.languageClient.onNotification('python/beginProgress', _ => __awaiter(this, void 0, void 0, function* () {
      if (this.progressDeferred) {
        return;
      }

      this.progressDeferred = async_1.createDeferred();
      this.progressTimer = new stopWatch_1.StopWatch();
      this.progressTimeout = setTimeout(this.handleTimeout.bind(this), ANALYSIS_TIMEOUT_MS);
      vscode_1.window.withProgress({
        location: vscode_1.ProgressLocation.Window,
        title: ''
      }, progress => {
        this.progress = progress;
        return this.progressDeferred.promise;
      });
    }));
    this.languageClient.onNotification('python/reportProgress', m => {
      if (!this.progress) {
        return;
      }

      this.progress.report({
        message: m
      });
    });
    this.languageClient.onNotification('python/endProgress', _ => {
      if (this.progressDeferred) {
        this.progressDeferred.resolve();
        this.progressDeferred = undefined;
        this.progress = undefined;
        this.completeAnalysisTracking(true);
      }
    });
  }

  dispose() {
    if (this.statusBarMessage) {
      this.statusBarMessage.dispose();
    }
  }

  completeAnalysisTracking(success) {
    if (this.progressTimer) {
      telemetry_1.sendTelemetryEvent(constants_1.PYTHON_LANGUAGE_SERVER_ANALYSISTIME, this.progressTimer.elapsedTime, {
        success
      });
    }

    this.progressTimer = undefined;
    this.progressTimeout = undefined;
  } // tslint:disable-next-line:no-any


  handleTimeout(_args) {
    this.completeAnalysisTracking(false);
  }

}

exports.ProgressReporting = ProgressReporting;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2c2NvZGVfMSIsInJlcXVpcmUiLCJhc3luY18xIiwic3RvcFdhdGNoXzEiLCJ0ZWxlbWV0cnlfMSIsImNvbnN0YW50c18xIiwiQU5BTFlTSVNfVElNRU9VVF9NUyIsIlByb2dyZXNzUmVwb3J0aW5nIiwiY29uc3RydWN0b3IiLCJsYW5ndWFnZUNsaWVudCIsIm9uTm90aWZpY2F0aW9uIiwibSIsInN0YXR1c0Jhck1lc3NhZ2UiLCJkaXNwb3NlIiwid2luZG93Iiwic2V0U3RhdHVzQmFyTWVzc2FnZSIsIl8iLCJwcm9ncmVzc0RlZmVycmVkIiwiY3JlYXRlRGVmZXJyZWQiLCJwcm9ncmVzc1RpbWVyIiwiU3RvcFdhdGNoIiwicHJvZ3Jlc3NUaW1lb3V0Iiwic2V0VGltZW91dCIsImhhbmRsZVRpbWVvdXQiLCJiaW5kIiwid2l0aFByb2dyZXNzIiwibG9jYXRpb24iLCJQcm9ncmVzc0xvY2F0aW9uIiwiV2luZG93IiwidGl0bGUiLCJwcm9ncmVzcyIsInByb21pc2UiLCJyZXBvcnQiLCJtZXNzYWdlIiwidW5kZWZpbmVkIiwiY29tcGxldGVBbmFseXNpc1RyYWNraW5nIiwic3VjY2VzcyIsInNlbmRUZWxlbWV0cnlFdmVudCIsIlBZVEhPTl9MQU5HVUFHRV9TRVJWRVJfQU5BTFlTSVNUSU1FIiwiZWxhcHNlZFRpbWUiLCJfYXJncyJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsU0FBUyxHQUFJLFVBQVEsU0FBS0EsU0FBZCxJQUE0QixV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O0FBQzlCLFFBQUksS0FBS2pCLGFBQVQsRUFBd0I7QUFDcEJmLE1BQUFBLFdBQVcsQ0FBQ2lDLGtCQUFaLENBQStCaEMsV0FBVyxDQUFDaUMsbUNBQTNDLEVBQWdGLEtBQUtuQixhQUFMLENBQW1Cb0IsV0FBbkcsRUFBZ0g7QUFBRUgsUUFBQUE7QUFBRixPQUFoSDtBQUNIOztBQUNELFNBQUtqQixhQUFMLEdBQXFCZSxTQUFyQjtBQUNBLFNBQUtiLGVBQUwsR0FBdUJhLFNBQXZCO0FBQ0gsR0FsRG1CLENBbURwQjs7O0FBQ0FYLEVBQUFBLGFBQWEsQ0FBQ2lCLEtBQUQsRUFBUTtBQUNqQixTQUFLTCx3QkFBTCxDQUE4QixLQUE5QjtBQUNIOztBQXREbUI7O0FBd0R4QnBDLE9BQU8sQ0FBQ1EsaUJBQVIsR0FBNEJBLGlCQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcbmNvbnN0IGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxzL2FzeW5jXCIpO1xuY29uc3Qgc3RvcFdhdGNoXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxzL3N0b3BXYXRjaFwiKTtcbmNvbnN0IHRlbGVtZXRyeV8xID0gcmVxdWlyZShcIi4uL3RlbGVtZXRyeVwiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL3RlbGVtZXRyeS9jb25zdGFudHNcIik7XG4vLyBEcmF3IHRoZSBsaW5lIGF0IExhbmd1YWdlIFNlcnZlciBhbmFseXNpcyAndGltaW5nIG91dCdcbi8vIGFuZCBiZWNvbWluZyBhIGZhaWx1cmUtY2FzZSBhdCAxIG1pbnV0ZTpcbmNvbnN0IEFOQUxZU0lTX1RJTUVPVVRfTVMgPSA2MDAwMDtcbmNsYXNzIFByb2dyZXNzUmVwb3J0aW5nIHtcbiAgICBjb25zdHJ1Y3RvcihsYW5ndWFnZUNsaWVudCkge1xuICAgICAgICB0aGlzLmxhbmd1YWdlQ2xpZW50ID0gbGFuZ3VhZ2VDbGllbnQ7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2VDbGllbnQub25Ob3RpZmljYXRpb24oJ3B5dGhvbi9zZXRTdGF0dXNCYXJNZXNzYWdlJywgKG0pID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1c0Jhck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0Jhck1lc3NhZ2UuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXJNZXNzYWdlID0gdnNjb2RlXzEud2luZG93LnNldFN0YXR1c0Jhck1lc3NhZ2UobSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlQ2xpZW50Lm9uTm90aWZpY2F0aW9uKCdweXRob24vYmVnaW5Qcm9ncmVzcycsIChfKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0RlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0RlZmVycmVkID0gYXN5bmNfMS5jcmVhdGVEZWZlcnJlZCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1RpbWVyID0gbmV3IHN0b3BXYXRjaF8xLlN0b3BXYXRjaCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1RpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuaGFuZGxlVGltZW91dC5iaW5kKHRoaXMpLCBBTkFMWVNJU19USU1FT1VUX01TKTtcbiAgICAgICAgICAgIHZzY29kZV8xLndpbmRvdy53aXRoUHJvZ3Jlc3Moe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB2c2NvZGVfMS5Qcm9ncmVzc0xvY2F0aW9uLldpbmRvdyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJydcbiAgICAgICAgICAgIH0sIHByb2dyZXNzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZUNsaWVudC5vbk5vdGlmaWNhdGlvbigncHl0aG9uL3JlcG9ydFByb2dyZXNzJywgKG0pID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucmVwb3J0KHsgbWVzc2FnZTogbSB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2VDbGllbnQub25Ob3RpZmljYXRpb24oJ3B5dGhvbi9lbmRQcm9ncmVzcycsIF8gPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NEZWZlcnJlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0RlZmVycmVkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUFuYWx5c2lzVHJhY2tpbmcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXNCYXJNZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1c0Jhck1lc3NhZ2UuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBsZXRlQW5hbHlzaXNUcmFja2luZyhzdWNjZXNzKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzVGltZXIpIHtcbiAgICAgICAgICAgIHRlbGVtZXRyeV8xLnNlbmRUZWxlbWV0cnlFdmVudChjb25zdGFudHNfMS5QWVRIT05fTEFOR1VBR0VfU0VSVkVSX0FOQUxZU0lTVElNRSwgdGhpcy5wcm9ncmVzc1RpbWVyLmVsYXBzZWRUaW1lLCB7IHN1Y2Nlc3MgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9ncmVzc1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnByb2dyZXNzVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIGhhbmRsZVRpbWVvdXQoX2FyZ3MpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZUFuYWx5c2lzVHJhY2tpbmcoZmFsc2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuUHJvZ3Jlc3NSZXBvcnRpbmcgPSBQcm9ncmVzc1JlcG9ydGluZztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb2dyZXNzLmpzLm1hcCJdfQ==