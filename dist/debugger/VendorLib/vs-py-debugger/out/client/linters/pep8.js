"use strict";

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

require("../common/extensions");

const types_1 = require("../common/types");

const baseLinter_1 = require("./baseLinter");

const COLUMN_OFF_SET = 1;

class Pep8 extends baseLinter_1.BaseLinter {
  constructor(outputChannel, serviceContainer) {
    super(types_1.Product.pep8, outputChannel, serviceContainer, COLUMN_OFF_SET);
  }

  runLinter(document, cancellation) {
    return __awaiter(this, void 0, void 0, function* () {
      const messages = yield this.run(['--format=%(row)d,%(col)d,%(code).1s,%(code)s:%(text)s', document.uri.fsPath], document, cancellation);
      messages.forEach(msg => {
        msg.severity = this.parseMessagesSeverity(msg.type, this.pythonSettings.linting.pep8CategorySeverity);
      });
      return messages;
    });
  }

}

exports.Pep8 = Pep8;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcDguanMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInJlcXVpcmUiLCJ0eXBlc18xIiwiYmFzZUxpbnRlcl8xIiwiQ09MVU1OX09GRl9TRVQiLCJQZXA4IiwiQmFzZUxpbnRlciIsImNvbnN0cnVjdG9yIiwib3V0cHV0Q2hhbm5lbCIsInNlcnZpY2VDb250YWluZXIiLCJQcm9kdWN0IiwicGVwOCIsInJ1bkxpbnRlciIsImRvY3VtZW50IiwiY2FuY2VsbGF0aW9uIiwibWVzc2FnZXMiLCJydW4iLCJ1cmkiLCJmc1BhdGgiLCJmb3JFYWNoIiwibXNnIiwic2V2ZXJpdHkiLCJwYXJzZU1lc3NhZ2VzU2V2ZXJpdHkiLCJ0eXBlIiwicHl0aG9uU2V0dGluZ3MiLCJsaW50aW5nIiwicGVwOENhdGVnb3J5U2V2ZXJpdHkiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQUlBLFNBQVMsR0FBSSxVQUFRLFNBQUtBLFNBQWQsSUFBNEIsVUFBVUMsT0FBVixFQUFtQkMsVUFBbkIsRUFBK0JDLENBQS9CLEVBQWtDQyxTQUFsQyxFQUE2QztBQUNyRixTQUFPLEtBQUtELENBQUMsS0FBS0EsQ0FBQyxHQUFHRSxPQUFULENBQU4sRUFBeUIsVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDdkQsYUFBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFBRSxVQUFJO0FBQUVDLFFBQUFBLElBQUksQ0FBQ04sU0FBUyxDQUFDTyxJQUFWLENBQWVGLEtBQWYsQ0FBRCxDQUFKO0FBQThCLE9BQXBDLENBQXFDLE9BQU9HLENBQVAsRUFBVTtBQUFFTCxRQUFBQSxNQUFNLENBQUNLLENBQUQsQ0FBTjtBQUFZO0FBQUU7O0FBQzNGLGFBQVNDLFFBQVQsQ0FBa0JKLEtBQWxCLEVBQXlCO0FBQUUsVUFBSTtBQUFFQyxRQUFBQSxJQUFJLENBQUNOLFNBQVMsQ0FBQyxPQUFELENBQVQsQ0FBbUJLLEtBQW5CLENBQUQsQ0FBSjtBQUFrQyxPQUF4QyxDQUF5QyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsUUFBQUEsTUFBTSxDQUFDSyxDQUFELENBQU47QUFBWTtBQUFFOztBQUM5RixhQUFTRixJQUFULENBQWNJLE1BQWQsRUFBc0I7QUFBRUEsTUFBQUEsTUFBTSxDQUFDQyxJQUFQLEdBQWNULE9BQU8sQ0FBQ1EsTUFBTSxDQUFDTCxLQUFSLENBQXJCLEdBQXNDLElBQUlOLENBQUosQ0FBTSxVQUFVRyxPQUFWLEVBQW1CO0FBQUVBLFFBQUFBLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDTCxLQUFSLENBQVA7QUFBd0IsT0FBbkQsRUFBcURPLElBQXJELENBQTBEUixTQUExRCxFQUFxRUssUUFBckUsQ0FBdEM7QUFBdUg7O0FBQy9JSCxJQUFBQSxJQUFJLENBQUMsQ0FBQ04sU0FBUyxHQUFHQSxTQUFTLENBQUNhLEtBQVYsQ0FBZ0JoQixPQUFoQixFQUF5QkMsVUFBVSxJQUFJLEVBQXZDLENBQWIsRUFBeURTLElBQXpELEVBQUQsQ0FBSjtBQUNILEdBTE0sQ0FBUDtBQU1ILENBUEQ7O0FBUUFPLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRVgsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0FZLE9BQU8sQ0FBQyxzQkFBRCxDQUFQOztBQUNBLE1BQU1DLE9BQU8sR0FBR0QsT0FBTyxDQUFDLGlCQUFELENBQXZCOztBQUNBLE1BQU1FLFlBQVksR0FBR0YsT0FBTyxDQUFDLGNBQUQsQ0FBNUI7O0FBQ0EsTUFBTUcsY0FBYyxHQUFHLENBQXZCOztBQUNBLE1BQU1DLElBQU4sU0FBbUJGLFlBQVksQ0FBQ0csVUFBaEMsQ0FBMkM7QUFDdkNDLEVBQUFBLFdBQVcsQ0FBQ0MsYUFBRCxFQUFnQkMsZ0JBQWhCLEVBQWtDO0FBQ3pDLFVBQU1QLE9BQU8sQ0FBQ1EsT0FBUixDQUFnQkMsSUFBdEIsRUFBNEJILGFBQTVCLEVBQTJDQyxnQkFBM0MsRUFBNkRMLGNBQTdEO0FBQ0g7O0FBQ0RRLEVBQUFBLFNBQVMsQ0FBQ0MsUUFBRCxFQUFXQyxZQUFYLEVBQXlCO0FBQzlCLFdBQU9sQyxTQUFTLENBQUMsSUFBRCxFQUFPLEtBQUssQ0FBWixFQUFlLEtBQUssQ0FBcEIsRUFBdUIsYUFBYTtBQUNoRCxZQUFNbUMsUUFBUSxHQUFHLE1BQU0sS0FBS0MsR0FBTCxDQUFTLENBQUMsdURBQUQsRUFBMERILFFBQVEsQ0FBQ0ksR0FBVCxDQUFhQyxNQUF2RSxDQUFULEVBQXlGTCxRQUF6RixFQUFtR0MsWUFBbkcsQ0FBdkI7QUFDQUMsTUFBQUEsUUFBUSxDQUFDSSxPQUFULENBQWlCQyxHQUFHLElBQUk7QUFDcEJBLFFBQUFBLEdBQUcsQ0FBQ0MsUUFBSixHQUFlLEtBQUtDLHFCQUFMLENBQTJCRixHQUFHLENBQUNHLElBQS9CLEVBQXFDLEtBQUtDLGNBQUwsQ0FBb0JDLE9BQXBCLENBQTRCQyxvQkFBakUsQ0FBZjtBQUNILE9BRkQ7QUFHQSxhQUFPWCxRQUFQO0FBQ0gsS0FOZSxDQUFoQjtBQU9IOztBQVpzQzs7QUFjM0NmLE9BQU8sQ0FBQ0ssSUFBUixHQUFlQSxJQUFmIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCIuLi9jb21tb24vZXh0ZW5zaW9uc1wiKTtcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3R5cGVzXCIpO1xuY29uc3QgYmFzZUxpbnRlcl8xID0gcmVxdWlyZShcIi4vYmFzZUxpbnRlclwiKTtcbmNvbnN0IENPTFVNTl9PRkZfU0VUID0gMTtcbmNsYXNzIFBlcDggZXh0ZW5kcyBiYXNlTGludGVyXzEuQmFzZUxpbnRlciB7XG4gICAgY29uc3RydWN0b3Iob3V0cHV0Q2hhbm5lbCwgc2VydmljZUNvbnRhaW5lcikge1xuICAgICAgICBzdXBlcih0eXBlc18xLlByb2R1Y3QucGVwOCwgb3V0cHV0Q2hhbm5lbCwgc2VydmljZUNvbnRhaW5lciwgQ09MVU1OX09GRl9TRVQpO1xuICAgIH1cbiAgICBydW5MaW50ZXIoZG9jdW1lbnQsIGNhbmNlbGxhdGlvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXMgPSB5aWVsZCB0aGlzLnJ1bihbJy0tZm9ybWF0PSUocm93KWQsJShjb2wpZCwlKGNvZGUpLjFzLCUoY29kZSlzOiUodGV4dClzJywgZG9jdW1lbnQudXJpLmZzUGF0aF0sIGRvY3VtZW50LCBjYW5jZWxsYXRpb24pO1xuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xuICAgICAgICAgICAgICAgIG1zZy5zZXZlcml0eSA9IHRoaXMucGFyc2VNZXNzYWdlc1NldmVyaXR5KG1zZy50eXBlLCB0aGlzLnB5dGhvblNldHRpbmdzLmxpbnRpbmcucGVwOENhdGVnb3J5U2V2ZXJpdHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuUGVwOCA9IFBlcDg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZXA4LmpzLm1hcCJdfQ==