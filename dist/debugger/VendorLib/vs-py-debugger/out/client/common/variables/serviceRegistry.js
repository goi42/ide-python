"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

const environment_1 = require("./environment");

const environmentVariablesProvider_1 = require("./environmentVariablesProvider");

const types_1 = require("./types");

function registerTypes(serviceManager) {
  serviceManager.addSingleton(types_1.IEnvironmentVariablesService, environment_1.EnvironmentVariablesService);
  serviceManager.addSingleton(types_1.IEnvironmentVariablesProvider, environmentVariablesProvider_1.EnvironmentVariablesProvider);
}

exports.registerTypes = registerTypes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VSZWdpc3RyeS5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImVudmlyb25tZW50XzEiLCJyZXF1aXJlIiwiZW52aXJvbm1lbnRWYXJpYWJsZXNQcm92aWRlcl8xIiwidHlwZXNfMSIsInJlZ2lzdGVyVHlwZXMiLCJzZXJ2aWNlTWFuYWdlciIsImFkZFNpbmdsZXRvbiIsIklFbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2UiLCJFbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2UiLCJJRW52aXJvbm1lbnRWYXJpYWJsZXNQcm92aWRlciIsIkVudmlyb25tZW50VmFyaWFibGVzUHJvdmlkZXIiXSwibWFwcGluZ3MiOiJBQUFBLGEsQ0FDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLGFBQWEsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBN0I7O0FBQ0EsTUFBTUMsOEJBQThCLEdBQUdELE9BQU8sQ0FBQyxnQ0FBRCxDQUE5Qzs7QUFDQSxNQUFNRSxPQUFPLEdBQUdGLE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLFNBQVNHLGFBQVQsQ0FBdUJDLGNBQXZCLEVBQXVDO0FBQ25DQSxFQUFBQSxjQUFjLENBQUNDLFlBQWYsQ0FBNEJILE9BQU8sQ0FBQ0ksNEJBQXBDLEVBQWtFUCxhQUFhLENBQUNRLDJCQUFoRjtBQUNBSCxFQUFBQSxjQUFjLENBQUNDLFlBQWYsQ0FBNEJILE9BQU8sQ0FBQ00sNkJBQXBDLEVBQW1FUCw4QkFBOEIsQ0FBQ1EsNEJBQWxHO0FBQ0g7O0FBQ0RaLE9BQU8sQ0FBQ00sYUFBUixHQUF3QkEsYUFBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBlbnZpcm9ubWVudF8xID0gcmVxdWlyZShcIi4vZW52aXJvbm1lbnRcIik7XHJcbmNvbnN0IGVudmlyb25tZW50VmFyaWFibGVzUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL2Vudmlyb25tZW50VmFyaWFibGVzUHJvdmlkZXJcIik7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuZnVuY3Rpb24gcmVnaXN0ZXJUeXBlcyhzZXJ2aWNlTWFuYWdlcikge1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzEuSUVudmlyb25tZW50VmFyaWFibGVzU2VydmljZSwgZW52aXJvbm1lbnRfMS5FbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2UpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzEuSUVudmlyb25tZW50VmFyaWFibGVzUHJvdmlkZXIsIGVudmlyb25tZW50VmFyaWFibGVzUHJvdmlkZXJfMS5FbnZpcm9ubWVudFZhcmlhYmxlc1Byb3ZpZGVyKTtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyVHlwZXMgPSByZWdpc3RlclR5cGVzO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlUmVnaXN0cnkuanMubWFwIl19