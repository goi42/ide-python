/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Path = require("path");

const Types = require("../utils/sysTypes");
/* tslint:disable:rule1 no-any no-unnecessary-callback-wrapper jsdoc-format no-for-in prefer-const no-increment-decrement */


class AbstractSystemVariables {
  // tslint:disable-next-line:no-any
  resolve(value) {
    if (Types.isString(value)) {
      return this.__resolveString(value);
    } else if (Types.isArray(value)) {
      return this.__resolveArray(value);
    } else if (Types.isObject(value)) {
      return this.__resolveLiteral(value);
    }

    return value;
  } // tslint:disable-next-line:no-any


  resolveAny(value) {
    if (Types.isString(value)) {
      return this.__resolveString(value);
    } else if (Types.isArray(value)) {
      return this.__resolveAnyArray(value);
    } else if (Types.isObject(value)) {
      return this.__resolveAnyLiteral(value);
    }

    return value;
  }

  __resolveString(value) {
    const regexp = /\$\{(.*?)\}/g;
    return value.replace(regexp, (match, name) => {
      // tslint:disable-next-line:no-any
      const newValue = this[name];

      if (Types.isString(newValue)) {
        return newValue;
      } else {
        return match && (match.indexOf('env.') > 0 || match.indexOf('env:') > 0) ? '' : match;
      }
    });
  }

  __resolveLiteral(values) {
    const result = Object.create(null);
    Object.keys(values).forEach(key => {
      const value = values[key]; // tslint:disable-next-line:no-any

      result[key] = this.resolve(value);
    });
    return result;
  } // tslint:disable-next-line:no-any


  __resolveAnyLiteral(values) {
    const result = Object.create(null);
    Object.keys(values).forEach(key => {
      const value = values[key]; // tslint:disable-next-line:no-any

      result[key] = this.resolveAny(value);
    });
    return result;
  }

  __resolveArray(value) {
    return value.map(s => this.__resolveString(s));
  } // tslint:disable-next-line:no-any


  __resolveAnyArray(value) {
    return value.map(s => this.resolveAny(s));
  }

}

exports.AbstractSystemVariables = AbstractSystemVariables;

class SystemVariables extends AbstractSystemVariables {
  constructor(workspaceFolder) {
    super();
    this._workspaceFolder = typeof workspaceFolder === 'string' ? workspaceFolder : __dirname;
    this._workspaceFolderName = Path.basename(this._workspaceFolder);
    Object.keys(process.env).forEach(key => {
      this[`env:${key}`] = this[`env.${key}`] = process.env[key];
    });
  }

  get cwd() {
    return this.workspaceFolder;
  }

  get workspaceRoot() {
    return this._workspaceFolder;
  }

  get workspaceFolder() {
    return this._workspaceFolder;
  }

  get workspaceRootFolderName() {
    return this._workspaceFolderName;
  }

  get workspaceFolderBasename() {
    return this._workspaceFolderName;
  }

}

exports.SystemVariables = SystemVariables;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVZhcmlhYmxlcy5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIlBhdGgiLCJyZXF1aXJlIiwiVHlwZXMiLCJBYnN0cmFjdFN5c3RlbVZhcmlhYmxlcyIsInJlc29sdmUiLCJpc1N0cmluZyIsIl9fcmVzb2x2ZVN0cmluZyIsImlzQXJyYXkiLCJfX3Jlc29sdmVBcnJheSIsImlzT2JqZWN0IiwiX19yZXNvbHZlTGl0ZXJhbCIsInJlc29sdmVBbnkiLCJfX3Jlc29sdmVBbnlBcnJheSIsIl9fcmVzb2x2ZUFueUxpdGVyYWwiLCJyZWdleHAiLCJyZXBsYWNlIiwibWF0Y2giLCJuYW1lIiwibmV3VmFsdWUiLCJpbmRleE9mIiwidmFsdWVzIiwicmVzdWx0IiwiY3JlYXRlIiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJtYXAiLCJzIiwiU3lzdGVtVmFyaWFibGVzIiwiY29uc3RydWN0b3IiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJfd29ya3NwYWNlRm9sZGVyIiwiX19kaXJuYW1lIiwiX3dvcmtzcGFjZUZvbGRlck5hbWUiLCJiYXNlbmFtZSIsInByb2Nlc3MiLCJlbnYiLCJjd2QiLCJ3b3Jrc3BhY2VSb290Iiwid29ya3NwYWNlUm9vdEZvbGRlck5hbWUiLCJ3b3Jrc3BhY2VGb2xkZXJCYXNlbmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLE1BQU1DLEtBQUssR0FBR0QsT0FBTyxDQUFDLG1CQUFELENBQXJCO0FBQ0E7OztBQUNBLE1BQU1FLHVCQUFOLENBQThCO0FBQzFCO0FBQ0FDLEVBQUFBLE9BQU8sQ0FBQ0wsS0FBRCxF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QUE4QjtBQUMxQixXQUFPLEtBQUtQLG9CQUFaO0FBQ0g7O0FBdkJpRDs7QUF5QnREbkMsT0FBTyxDQUFDOEIsZUFBUixHQUEwQkEsZUFBMUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IFR5cGVzID0gcmVxdWlyZShcIi4uL3V0aWxzL3N5c1R5cGVzXCIpO1xuLyogdHNsaW50OmRpc2FibGU6cnVsZTEgbm8tYW55IG5vLXVubmVjZXNzYXJ5LWNhbGxiYWNrLXdyYXBwZXIganNkb2MtZm9ybWF0IG5vLWZvci1pbiBwcmVmZXItY29uc3Qgbm8taW5jcmVtZW50LWRlY3JlbWVudCAqL1xuY2xhc3MgQWJzdHJhY3RTeXN0ZW1WYXJpYWJsZXMge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICByZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcmVzb2x2ZVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVHlwZXMuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcmVzb2x2ZUFycmF5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChUeXBlcy5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcmVzb2x2ZUxpdGVyYWwodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHJlc29sdmVBbnkodmFsdWUpIHtcbiAgICAgICAgaWYgKFR5cGVzLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZXNvbHZlU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChUeXBlcy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZXNvbHZlQW55QXJyYXkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFR5cGVzLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZXNvbHZlQW55TGl0ZXJhbCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBfX3Jlc29sdmVTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVnZXhwID0gL1xcJFxceyguKj8pXFx9L2c7XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlZ2V4cCwgKG1hdGNoLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXNbbmFtZV07XG4gICAgICAgICAgICBpZiAoVHlwZXMuaXNTdHJpbmcobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoICYmIChtYXRjaC5pbmRleE9mKCdlbnYuJykgPiAwIHx8IG1hdGNoLmluZGV4T2YoJ2VudjonKSA+IDApID8gJycgOiBtYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9fcmVzb2x2ZUxpdGVyYWwodmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNba2V5XTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBfX3Jlc29sdmVBbnlMaXRlcmFsKHZhbHVlcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2tleV07XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXMucmVzb2x2ZUFueSh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBfX3Jlc29sdmVBcnJheSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubWFwKHMgPT4gdGhpcy5fX3Jlc29sdmVTdHJpbmcocykpO1xuICAgIH1cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgX19yZXNvbHZlQW55QXJyYXkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm1hcChzID0+IHRoaXMucmVzb2x2ZUFueShzKSk7XG4gICAgfVxufVxuZXhwb3J0cy5BYnN0cmFjdFN5c3RlbVZhcmlhYmxlcyA9IEFic3RyYWN0U3lzdGVtVmFyaWFibGVzO1xuY2xhc3MgU3lzdGVtVmFyaWFibGVzIGV4dGVuZHMgQWJzdHJhY3RTeXN0ZW1WYXJpYWJsZXMge1xuICAgIGNvbnN0cnVjdG9yKHdvcmtzcGFjZUZvbGRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl93b3Jrc3BhY2VGb2xkZXIgPSB0eXBlb2Ygd29ya3NwYWNlRm9sZGVyID09PSAnc3RyaW5nJyA/IHdvcmtzcGFjZUZvbGRlciA6IF9fZGlybmFtZTtcbiAgICAgICAgdGhpcy5fd29ya3NwYWNlRm9sZGVyTmFtZSA9IFBhdGguYmFzZW5hbWUodGhpcy5fd29ya3NwYWNlRm9sZGVyKTtcbiAgICAgICAgT2JqZWN0LmtleXMocHJvY2Vzcy5lbnYpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHRoaXNbYGVudjoke2tleX1gXSA9IHRoaXNbYGVudi4ke2tleX1gXSA9IHByb2Nlc3MuZW52W2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgY3dkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53b3Jrc3BhY2VGb2xkZXI7XG4gICAgfVxuICAgIGdldCB3b3Jrc3BhY2VSb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ya3NwYWNlRm9sZGVyO1xuICAgIH1cbiAgICBnZXQgd29ya3NwYWNlRm9sZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ya3NwYWNlRm9sZGVyO1xuICAgIH1cbiAgICBnZXQgd29ya3NwYWNlUm9vdEZvbGRlck5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93b3Jrc3BhY2VGb2xkZXJOYW1lO1xuICAgIH1cbiAgICBnZXQgd29ya3NwYWNlRm9sZGVyQmFzZW5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93b3Jrc3BhY2VGb2xkZXJOYW1lO1xuICAgIH1cbn1cbmV4cG9ydHMuU3lzdGVtVmFyaWFibGVzID0gU3lzdGVtVmFyaWFibGVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3lzdGVtVmFyaWFibGVzLmpzLm1hcCJdfQ==