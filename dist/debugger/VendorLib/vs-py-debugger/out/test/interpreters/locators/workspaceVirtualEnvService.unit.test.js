// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

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
}); // tslint:disable:no-any max-classes-per-file max-func-body-length

const chai_1 = require("chai");

const ts_mockito_1 = require("ts-mockito");

const interpreterWatcherBuilder_1 = require("../../../client/interpreter/locators/services/interpreterWatcherBuilder");

const workspaceVirtualEnvService_1 = require("../../../client/interpreter/locators/services/workspaceVirtualEnvService");

const container_1 = require("../../../client/ioc/container");

suite('Interpreters - Workspace VirtualEnv Service', () => {
  test('Get list of watchers', () => __awaiter(void 0, void 0, void 0, function* () {
    const serviceContainer = ts_mockito_1.mock(container_1.ServiceContainer);
    const builder = ts_mockito_1.mock(interpreterWatcherBuilder_1.InterpreterWatcherBuilder);
    const locator = new class extends workspaceVirtualEnvService_1.WorkspaceVirtualEnvService {
      // tslint:disable-next-line:no-unnecessary-override
      getInterpreterWatchers(resource) {
        const _super = name => super[name];

        return __awaiter(this, void 0, void 0, function* () {
          return _super("getInterpreterWatchers").call(this, resource);
        });
      }

    }(undefined, ts_mockito_1.instance(serviceContainer), ts_mockito_1.instance(builder));
    const watchers = 1;
    ts_mockito_1.when(builder.getWorkspaceVirtualEnvInterpreterWatcher(ts_mockito_1.anything())).thenResolve(watchers);
    const items = yield locator.getInterpreterWatchers(undefined);
    chai_1.expect(items).to.deep.equal([watchers]);
    ts_mockito_1.verify(builder.getWorkspaceVirtualEnvInterpreterWatcher(ts_mockito_1.anything())).once();
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtzcGFjZVZpcnR1YWxFbnZTZXJ2aWNlLnVuaXQudGVzdC5qcyJdLCJuYW1lcyI6WyJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwiY2hhaV8xIiwicmVxdWlyZSIsInRzX21vY2tpdG9fMSIsImludGVycHJldGVyV2F0Y2hlckJ1aWxkZXJfMSIsIndvcmtzcGFjZVZpcnR1YWxFbnZTZXJ2aWNlXzEiLCJjb250YWluZXJfMSIsInN1aXRlIiwidGVzdCIsInNlcnZpY2VDb250YWluZXIiLCJtb2NrIiwiU2VydmljZUNvbnRhaW5lciIsImJ1aWxkZXIiLCJJbnRlcnByZXRlcldhdGNoZXJCdWlsZGVyIiwibG9jYXRvciIsIldvcmtzcGFjZVZpcnR1YWxFbnZTZXJ2aWNlIiwiZ2V0SW50ZXJwcmV0ZXJXYXRjaGVycyIsInJlc291cmNlIiwiX3N1cGVyIiwibmFtZSIsImNhbGwiLCJ1bmRlZmluZWQiLCJpbnN0YW5jZSIsIndhdGNoZXJzIiwid2hlbiIsImdldFdvcmtzcGFjZVZpcnR1YWxFbnZJbnRlcnByZXRlcldhdGNoZXIiLCJhbnl0aGluZyIsInRoZW5SZXNvbHZlIiwiaXRlbXMiLCJleHBlY3QiLCJ0byIsImRlZXAiLCJlcXVhbCIsInZlcmlmeSIsIm9uY2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQSxTQUFTLEdBQUksVUFBUSxTQUFLQSxTQUFkLElBQTRCLFVBQVVDLE9BQVYsRUFBbUJDLFVBQW5CLEVBQStCQyxDQUEvQixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFDckYsU0FBTyxLQUFLRCxDQUFDLEtBQUtBLENBQUMs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WUFBWSxDQUFDbUIsUUFBYixDQUFzQlYsT0FBdEIsQ0FSdEMsQ0FBaEI7QUFTQSxVQUFNVyxRQUFRLEdBQUcsQ0FBakI7QUFDQXBCLElBQUFBLFlBQVksQ0FBQ3FCLElBQWIsQ0FBa0JaLE9BQU8sQ0FBQ2Esd0NBQVIsQ0FBaUR0QixZQUFZLENBQUN1QixRQUFiLEVBQWpELENBQWxCLEVBQTZGQyxXQUE3RixDQUF5R0osUUFBekc7QUFDQSxVQUFNSyxLQUFLLEdBQUcsTUFBTWQsT0FBTyxDQUFDRSxzQkFBUixDQUErQkssU0FBL0IsQ0FBcEI7QUFDQXBCLElBQUFBLE1BQU0sQ0FBQzRCLE1BQVAsQ0FBY0QsS0FBZCxFQUFxQkUsRUFBckIsQ0FBd0JDLElBQXhCLENBQTZCQyxLQUE3QixDQUFtQyxDQUFDVCxRQUFELENBQW5DO0FBQ0FwQixJQUFBQSxZQUFZLENBQUM4QixNQUFiLENBQW9CckIsT0FBTyxDQUFDYSx3Q0FBUixDQUFpRHRCLFlBQVksQ0FBQ3VCLFFBQWIsRUFBakQsQ0FBcEIsRUFBK0ZRLElBQS9GO0FBQ0gsR0FqQjJDLENBQXhDLENBQUo7QUFrQkgsQ0FuQkksQ0FBTCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgbWF4LWNsYXNzZXMtcGVyLWZpbGUgbWF4LWZ1bmMtYm9keS1sZW5ndGhcclxuY29uc3QgY2hhaV8xID0gcmVxdWlyZShcImNoYWlcIik7XHJcbmNvbnN0IHRzX21vY2tpdG9fMSA9IHJlcXVpcmUoXCJ0cy1tb2NraXRvXCIpO1xyXG5jb25zdCBpbnRlcnByZXRlcldhdGNoZXJCdWlsZGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L2ludGVycHJldGVyL2xvY2F0b3JzL3NlcnZpY2VzL2ludGVycHJldGVyV2F0Y2hlckJ1aWxkZXJcIik7XHJcbmNvbnN0IHdvcmtzcGFjZVZpcnR1YWxFbnZTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L2ludGVycHJldGVyL2xvY2F0b3JzL3NlcnZpY2VzL3dvcmtzcGFjZVZpcnR1YWxFbnZTZXJ2aWNlXCIpO1xyXG5jb25zdCBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jbGllbnQvaW9jL2NvbnRhaW5lclwiKTtcclxuc3VpdGUoJ0ludGVycHJldGVycyAtIFdvcmtzcGFjZSBWaXJ0dWFsRW52IFNlcnZpY2UnLCAoKSA9PiB7XHJcbiAgICB0ZXN0KCdHZXQgbGlzdCBvZiB3YXRjaGVycycsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlQ29udGFpbmVyID0gdHNfbW9ja2l0b18xLm1vY2soY29udGFpbmVyXzEuU2VydmljZUNvbnRhaW5lcik7XHJcbiAgICAgICAgY29uc3QgYnVpbGRlciA9IHRzX21vY2tpdG9fMS5tb2NrKGludGVycHJldGVyV2F0Y2hlckJ1aWxkZXJfMS5JbnRlcnByZXRlcldhdGNoZXJCdWlsZGVyKTtcclxuICAgICAgICBjb25zdCBsb2NhdG9yID0gbmV3IGNsYXNzIGV4dGVuZHMgd29ya3NwYWNlVmlydHVhbEVudlNlcnZpY2VfMS5Xb3Jrc3BhY2VWaXJ0dWFsRW52U2VydmljZSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bm5lY2Vzc2FyeS1vdmVycmlkZVxyXG4gICAgICAgICAgICBnZXRJbnRlcnByZXRlcldhdGNoZXJzKHJlc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfc3VwZXIgPSBuYW1lID0+IHN1cGVyW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyKFwiZ2V0SW50ZXJwcmV0ZXJXYXRjaGVyc1wiKS5jYWxsKHRoaXMsIHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSh1bmRlZmluZWQsIHRzX21vY2tpdG9fMS5pbnN0YW5jZShzZXJ2aWNlQ29udGFpbmVyKSwgdHNfbW9ja2l0b18xLmluc3RhbmNlKGJ1aWxkZXIpKTtcclxuICAgICAgICBjb25zdCB3YXRjaGVycyA9IDE7XHJcbiAgICAgICAgdHNfbW9ja2l0b18xLndoZW4oYnVpbGRlci5nZXRXb3Jrc3BhY2VWaXJ0dWFsRW52SW50ZXJwcmV0ZXJXYXRjaGVyKHRzX21vY2tpdG9fMS5hbnl0aGluZygpKSkudGhlblJlc29sdmUod2F0Y2hlcnMpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0geWllbGQgbG9jYXRvci5nZXRJbnRlcnByZXRlcldhdGNoZXJzKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChpdGVtcykudG8uZGVlcC5lcXVhbChbd2F0Y2hlcnNdKTtcclxuICAgICAgICB0c19tb2NraXRvXzEudmVyaWZ5KGJ1aWxkZXIuZ2V0V29ya3NwYWNlVmlydHVhbEVudkludGVycHJldGVyV2F0Y2hlcih0c19tb2NraXRvXzEuYW55dGhpbmcoKSkpLm9uY2UoKTtcclxuICAgIH0pKTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdvcmtzcGFjZVZpcnR1YWxFbnZTZXJ2aWNlLnVuaXQudGVzdC5qcy5tYXAiXX0=