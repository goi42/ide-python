"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

const types_1 = require("../../common/types");

class BaseErrorHandler {
  constructor(product, outputChannel, serviceContainer) {
    this.product = product;
    this.outputChannel = outputChannel;
    this.serviceContainer = serviceContainer;
    this.logger = this.serviceContainer.get(types_1.ILogger);
    this.installer = this.serviceContainer.get(types_1.IInstaller);
  }

  get nextHandler() {
    return this.handler;
  }

  setNextHandler(handler) {
    this.handler = handler;
  }

}

exports.BaseErrorHandler = BaseErrorHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VFcnJvckhhbmRsZXIuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ0eXBlc18xIiwicmVxdWlyZSIsIkJhc2VFcnJvckhhbmRsZXIiLCJjb25zdHJ1Y3RvciIsInByb2R1Y3QiLCJvdXRwdXRDaGFubmVsIiwic2VydmljZUNvbnRhaW5lciIsImxvZ2dlciIsImdldCIsIklMb2dnZXIiLCJpbnN0YWxsZXIiLCJJSW5zdGFsbGVyIiwibmV4dEhhbmRsZXIiLCJoYW5kbGVyIiwic2V0TmV4dEhhbmRsZXIiXSwibWFwcGluZ3MiOiJBQUFBLGEsQ0FDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLE9BQU8sR0FBR0MsT0FBTyxDQUFDLG9CQUFELENBQXZCOztBQUNBLE1BQU1DLGdCQUFOLENBQXVCO0FBQ25CQyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVUMsYUFBVixFQUF5QkMsZ0JBQXpCLEVBQTJDO0FBQ2xELFNBQUtGLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFLRCxnQkFBTCxDQUFzQkUsR0FBdEIsQ0FBMEJSLE9BQU8sQ0FBQ1MsT0FBbEMsQ0FBZDtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBS0osZ0JBQUwsQ0FBc0JFLEdBQXRCLENBQTBCUixPQUFPLENBQUNXLFVBQWxDLENBQWpCO0FBQ0g7O0FBQ0QsTUFBSUMsV0FBSixHQUFrQjtBQUNkLFdBQU8sS0FBS0MsT0FBWjtBQUNIOztBQUNEQyxFQUFBQSxjQUFjLENBQUNELE9BQUQsRUFBVTtBQUNwQixTQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDSDs7QUFia0I7O0FBZXZCZixPQUFPLENBQUNJLGdCQUFSLEdBQTJCQSxnQkFBM0IiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vdHlwZXNcIik7XG5jbGFzcyBCYXNlRXJyb3JIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9kdWN0LCBvdXRwdXRDaGFubmVsLCBzZXJ2aWNlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMucHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgICAgIHRoaXMub3V0cHV0Q2hhbm5lbCA9IG91dHB1dENoYW5uZWw7XG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRhaW5lciA9IHNlcnZpY2VDb250YWluZXI7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklMb2dnZXIpO1xuICAgICAgICB0aGlzLmluc3RhbGxlciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMS5JSW5zdGFsbGVyKTtcbiAgICB9XG4gICAgZ2V0IG5leHRIYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVyO1xuICAgIH1cbiAgICBzZXROZXh0SGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgfVxufVxuZXhwb3J0cy5CYXNlRXJyb3JIYW5kbGVyID0gQmFzZUVycm9ySGFuZGxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2VFcnJvckhhbmRsZXIuanMubWFwIl19